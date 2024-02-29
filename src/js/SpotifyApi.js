import axios from 'axios';
import { get } from 'svelte/store';
import { AXIOS_INSTANCE } from '@js/axios-utils';
import Logger from '@js/Logger';
import { BROWSER_DEVICE } from '@js/browser-utils';
import { getUrlParam } from '@js/souriya-utils';
import {
  accessToken,
  userId,
  player,
  trackName,
  albumName,
  imageMiniUrl,
  imageCoverUrl,
  artists,
  shuffleState,
  repeatState,
  playing,
  progressMs,
  durationMs,
  apiTimestamp,
  devices,
  deviceId,
  volumePercent,
  realTimeProgressMs,
  userPictureUrl,
  userDisplayName,
  trackUri,
  unavailableContextUri,
  authorizationOk,
} from '@js/store';
import SpotifyUser from '@js/SpotifyUser';
import SpotifyRepeatState from '@js/SpotifyRepeatState';
import SpotifyPlaybackState from '@js/SpotifyPlaybackState';
import SpotifyQueue from '@js/SpotifyQueue';
import SpotifyTrack from '@js/SpotifyTrack';
import QueueEmptyError from '@js/QueueEmptyError';
import API_STATUS from '@js/API_STATUS';
import SpotifyDeviceList from '@js/SpotifyDeviceList';
import SpotifyPlayerState from '@js/SpotifyPlayerState';
import SpotifyPlaybackStateAdapter from '@js/SpotifyPlaybackStateAdapter';
import SpotifyTrackAdapter from '@js/SpotifyTrackAdapter';
import { areTimestampsSeparateBy } from '@js/time-utils';
import PlaybackNotAvailableOrActiveError from '@js/PlaybackNotAvailableOrActiveError';
import CursorFactory from '@js/CursorFactory';
import SpotifyPlaylistExtended from '@js/SpotifyPlaylistExtended';
import SpotifyPlaylist from '@js/SpotifyPlaylist';
import SpotifySearch from '@js/SpotifySearch';
import { isArrayEmpty } from '@js/souriya-utils';
import { isNotEmpty } from '@js/string-utils';
import SpotifySavedAlbum from '@js/SpotifySavedAlbum';
import {
  sortListByName,
  sortListByAddedAt,
  sortImagesBySizeAsc,
  sortPlayListByCreator,
  sortListByNameReverse,
  sortPlayListByCreatorReverse,
  sortAlbumtByCreatorReverse,
  sortAlbumtByCreator,
  findArtistLikedTracks,
  findArtistLikedReleases,
} from '@js/spotify-utils';
import SpotifyAlbum from '@js/SpotifyAlbum';
import SpotifyArtist from '@js/SpotifyArtist';
import DISCOGRAPHY_TYPE from '@js/DISCOGRAPHY_TYPE';
import SpotifyDiscography from '@js/SpotifyDiscography';
import SpotifyDiscographyType from '@js/SpotifyDiscographyType';
import DISCOGRAPHY_TYPE_MAPPING from '@js/DISCOGRAPHY_TYPE_MAPPING';

/**
 * @typedef {import('@js/spotify').SpotifyDevice} SpotifyDevice
 * @typedef {import('@js/spotify').SpotifySong} SpotifySong
 * @typedef {import('@js/spotify').SpotifyAlbumTrack} SpotifyAlbumTrack
 * @typedef {import('@js/spotify').SpotifyAlbumItemCursor} SpotifyAlbumItemCursor
 */

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  PLAYER_NAME = `${import.meta.env.VITE_PLAYER_NAME_PREFIX}${BROWSER_DEVICE}`;
  TRANSFERT_PLAYBACK_TIMEOUT_MS = Number(`${import.meta.env.VITE_TRANSFERT_PLAYBACK_TIMEOUT_MS}`);
  PREVIOUS_SONG_DELAY_MS = Number(`${import.meta.env.VITE_PREVIOUS_SONG_DELAY_MS}`);

  goToAuthorizeUrl() {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      SpotifyApi.#CLIENT_ID
    }&scope=${encodeURIComponent(SpotifyApi.#SCOPES)}&redirect_uri=${encodeURIComponent(
      SpotifyApi.#REDIRECT_URI,
    )}`;
  }

  // TODO => use refresh token only ?
  refreshToken() {
    accessToken.set(null);
    authorizationOk.set(false);
    window.location.href = '/';
  }

  forceAuthorization() {
    localStorage.clear();
    window.location.href = '/';
  }

  async initAccessToken() {
    const authorizationCode = getUrlParam('code');

    const data = new URLSearchParams({
      code: authorizationCode,
      redirect_uri: SpotifyApi.#REDIRECT_URI,
      grant_type: 'authorization_code',
      client_id: SpotifyApi.#CLIENT_ID,
      client_secret: SpotifyApi.#CLIENT_SECRET,
    }).toString();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${window.btoa(`${SpotifyApi.#CLIENT_ID}:${SpotifyApi.#CLIENT_SECRET}`)}`,
    };

    try {
      const resp = await AXIOS_INSTANCE().post('https://accounts.spotify.com/api/token', data, {
        headers,
      });

      accessToken.set(resp?.data.access_token);
      window.history.pushState({}, 'token ok', '/');

      LOGGER.log('token ✅');
    } catch (err) {
      LOGGER.error('', err.toJSON());
    }
  }

  disconnect() {
    get(player).disconnect();
    LOGGER.log(`disconnect ${get(deviceId)}`);
  }

  /** @returns {Promise<SpotifyUser>} */
  async me() {
    const user = await this.getUser();
    userId.set(user?.id);
    userDisplayName.set(user?.display_name);
    const url = sortImagesBySizeAsc(user?.images)?.at(0)?.url;
    if (url) {
      userPictureUrl.set(url);
    }
    return user;
  }

  /**
   * @param {string} spotifyUserId
   * @returns {Promise<SpotifyUser>}
   */
  async getUser(spotifyUserId = null) {
    const id = !spotifyUserId ? '/me' : `/users/${spotifyUserId}`;
    const data = await this.#get(id);
    return new SpotifyUser(data);
  }

  /** @param {null | SpotifyPlayerState} playerState */
  async synchronize(playerState = null) {
    // FIXME seems that synchronization is disrupted if we accept
    // an unique notification in perdiod of time
    // if (playerState && !this.#isPlayerNotificationValid(playerState?.timestamp)) {
    //   // uncomment to debug
    //   LOGGER.log('🟡 ---> spotify notification is TOO CLOSE...', playerState);
    //   return;
    // }

    if (this.#isPlayerNotificationValid(playerState?.timestamp)) {
      // logged here to be not polluated
      LOGGER.log('---> notification', playerState);

      // SYNC DEVICES
      /* 
      Hack with a timeout, because when we've just 
      auto-transfert the playback (eg. after a 204), our devices is not instantanely active.
      I do this hack, because it's simpler
    */
      setTimeout(() => {
        this.getAvailableDevice().then((availableDevices) => devices.set(availableDevices));
      }, this.TRANSFERT_PLAYBACK_TIMEOUT_MS);
    }

    // TIMESTAMP
    apiTimestamp.set(playerState?.timestamp);

    // SYNC PLAYBACK & TRACK
    let playbackState = null;
    let track = null;

    if (playerState) {
      const spotifyPlayerState = this.extractPlayerStateFrom(playerState);
      playbackState = SpotifyPlaybackStateAdapter.adapt(spotifyPlayerState);
      track = SpotifyTrackAdapter.adaptPlayerState(spotifyPlayerState);
    } else {
      try {
        playbackState = await this.getPlaybackState();
        track = playbackState?.item ? playbackState.item : await this.#determineLastSong();
      } catch (err) {
        if (err instanceof PlaybackNotAvailableOrActiveError) {
          LOGGER.log('wait for "notification" from spotify :)');
          return;
        }
      }
    }

    this.#writeStorePlaybackInfos(playbackState);
    this.#writeStoreTrackInfos(track);
  }

  /** @returns {Promise<SpotifyPlaybackState>} */
  async getPlaybackState() {
    const data = await this.#get('/me/player');
    return new SpotifyPlaybackState(data);
  }

  /** @param {string} deviceId */
  async transfertPlayback(deviceId) {
    this.#put('/me/player', {
      device_ids: [deviceId],
      play: true,
    });
  }

  /** @returns {Promise<SpotifyDevice[]>} */
  async getAvailableDevice() {
    const data = await this.#get('/me/player/devices');
    const deviceList = new SpotifyDeviceList(data);
    return deviceList?.devices;
  }

  async play() {
    // FIXME sometimes we have error
    // [spotify-player.js]: Failed to perform playback: Cannot perform operation; no list was loaded.
    get(player).resume();
    playing.set(true);
    LOGGER.log('play');
  }

  /** @param {string} uri */
  async playTrack(uri) {
    this.#put(`/me/player/play`, { uris: [uri] });
    trackUri.set(uri);
    playing.set(true);
    LOGGER.log('playTrack', uri);
  }

  /**
   * @param {string} currentTrackUri
   * @param {string} contextUri
   * @param {number} indexPosition
   */
  async playTrackWithContext(currentTrackUri, contextUri, indexPosition) {
    try {
      await this.#put(`/me/player/play`, {
        context_uri: contextUri,
        offset: {
          position: indexPosition,
        },
      });

      trackUri.set(currentTrackUri);
      playing.set(true);
      LOGGER.log('playTrackWithContext', currentTrackUri, contextUri, indexPosition);
    } catch (err) {
      const status = err?.response?.status;
      if (status === API_STATUS.FORBIDDEN) {
        // add context uri in forbidden list
        unavailableContextUri.update((list) => {
          if (!list?.find((uri) => uri === contextUri)) {
            return [...list, contextUri];
          }
          return list;
        });
      }
    }
  }

  pause() {
    // FIXME sometimes we have error
    // [spotify-player.js]: Failed to perform playback: Cannot perform operation; no list was loaded.
    get(player).pause();
    LOGGER.log('pause');
  }

  resume() {
    this.#put(`/me/player/play`);
    LOGGER.log('resume');
  }

  previous() {
    if (get(realTimeProgressMs) < this.PREVIOUS_SONG_DELAY_MS) {
      get(player).previousTrack();
      LOGGER.log('prev');
    } else {
      this.seekPosition(0);
      LOGGER.log('prev -> restart to 0');
    }
  }

  next() {
    get(player).nextTrack();
    LOGGER.log('next');
  }

  /** @param {number} positionMs */
  seekPosition(positionMs) {
    const position = Math.trunc(positionMs);
    this.#put(`/me/player/seek?position_ms=${position}`);
    progressMs.set(positionMs);
  }

  shuffle() {
    this.#put(`/me/player/shuffle?state=${!get(shuffleState)}`);
    LOGGER.log('shuffle', `${!get(shuffleState)}`);
  }

  repeat() {
    const currentRepeatState = get(repeatState);

    const newRepeatState =
      currentRepeatState === SpotifyRepeatState.OFF
        ? SpotifyRepeatState.CONTEXT
        : currentRepeatState === SpotifyRepeatState.CONTEXT
          ? SpotifyRepeatState.TRACK
          : SpotifyRepeatState.OFF;

    this.#put(`/me/player/repeat?state=${newRepeatState}`);

    LOGGER.log('repeat', newRepeatState);
  }

  /**
   * @param {string} userId
   * @returns {Promise<SpotifyPlaylist[]>}
   */
  async getPlaylistsSortedBySpotify(userId) {
    return await this.#getAllPlaylists(userId);
  }

  /**
   * @param {string} userId
   * @param {boolean} reverse
   * @returns {Promise<SpotifyPlaylist[]>}
   */
  async getPlaylistsSortedAlphabetically(userId, reverse = false) {
    const playlists = await this.#getAllPlaylists(userId);
    const sortFn = reverse ? sortListByNameReverse : sortListByName;
    return playlists?.sort(sortFn);
  }

  /**
   * @param {string} userId
   * @param {boolean} reverse
   * @returns {Promise<SpotifyPlaylist[]>}
   */
  async getPlaylistsSortedByCreator(userId, reverse = false) {
    const playlists = await this.#getAllPlaylists(userId);
    const sortFn = reverse ? sortPlayListByCreatorReverse : sortPlayListByCreator;
    return playlists?.sort(sortFn);
  }

  /**
   * @param {string} userId
   * @returns {Promise<SpotifyPlaylist[]>}
   */
  async getPlaylistsSortedAddedAtFIXME(userId) {
    const playlists = await this.#getAllPlaylists(userId);

    const playlistExtendedPromises = playlists.map(async (playlist) => {
      return this.extendPlaylistWithAddeAt(playlist);
    });

    const playlistsWithDate = await Promise.all(playlistExtendedPromises);
    return playlistsWithDate?.sort(sortListByAddedAt);
  }

  /**
   * @param {SpotifyPlaylist} playlist
   * @returns {Promise<SpotifyPlaylist>}
   */
  async extendPlaylistWithAddeAt(playlist) {
    const result = new SpotifyPlaylist({ ...playlist });

    const data = await this.#get(`/playlists/${playlist.id}/tracks?fields=items%28added_at%29`);

    const items = new SpotifyPlaylistExtended(data)?.items?.sort(sortListByAddedAt);

    const added_at = items?.[0]?.['added_at'];

    if (added_at) {
      result.added_at = new Date(added_at);
    }

    return result;
  }

  /** @returns {Promise<SpotifyTrack[]>} */
  async getLikedTracks() {
    /** @type {SpotifySong[]} */
    const tracks = await this.#iterateOverCursor(`/me/tracks?limit=50`, 'SpotifySongCursor');
    return tracks?.sort(sortListByAddedAt).map((song) => song?.track);
  }

  /**
   * @param {string} artistId
   * @param {SpotifyTrack[]} likedTracks
   */
  async getILiked(artistId = '', likedTracks = []) {
    // FIXME perf : move elsewhere ? instead use $myLibAlbums
    const artistLikedTracks = findArtistLikedTracks(artistId, likedTracks) ?? [];
    const myAlbums = await this.getMySavedAlbumsSortedRecentlyPlayed();
    const likedReleases = findArtistLikedReleases(artistId, myAlbums);

    console.log('artistLikedTracks', artistLikedTracks);
    console.log('likedReleases', likedReleases);

    return;
  }

  /**
   * @param {string} playlistId
   * @returns {Promise<SpotifyPlaylist>}
   */
  async getPlaylistDetails(playlistId) {
    const result = await this.#get(`/playlists/${playlistId}`);
    return new SpotifyPlaylist(result);
  }

  /**
   * @param {string} playlistId
   * @returns {Promise<SpotifyTrack[]>}
   */
  async getPlaylistTracks(playlistId) {
    /** @type {SpotifySong[]} */
    const songs = await this.#iterateOverCursor(
      `/playlists/${playlistId}/tracks?limit=50`,
      'SpotifySongCursor',
    );
    return songs?.map((song) => song?.track);
  }

  /**
   * @param {string} albumId
   * @returns {Promise<SpotifyAlbum>}
   */
  async getAlbum(albumId) {
    const album = await this.#get(`/albums/${albumId}`);
    return new SpotifyAlbum(album);
  }

  /**
   * @param {string} albumId
   * @returns {Promise<SpotifyAlbumTrack[]>}
   */
  async getAlbumTracks(albumId) {
    /** @type {SpotifyAlbumTrack[]} */
    const tracks = await this.#iterateOverCursor(
      `/albums/${albumId}/tracks`,
      'SpotifyAlbumTrackCursor',
    );
    return tracks;
  }

  /** @return {Promise<SpotifySavedAlbum[]>} */
  async getMySavedAlbumsSortedRecentlyPlayed() {
    /** @type {SpotifyAlbumItemCursor[]} */
    const albums = await this.#iterateOverCursor(`/me/albums?limit=50`, 'SpotifyAlbumCursor');
    return albums?.map((item) => new SpotifySavedAlbum(item));
  }

  /** @return {Promise<SpotifySavedAlbum[]>} */
  async getMySavedAlbumsSortedRecentlyAdded() {
    /** @type {SpotifySavedAlbum[]} */
    const albums = await this.getMySavedAlbumsSortedRecentlyPlayed();
    return albums?.sort(sortListByAddedAt);
  }

  /**
   * @param {boolean} reverse
   * @returns {Promise<SpotifySavedAlbum[]>}
   */
  async getAlbumsSortedAlphabetically(reverse = false) {
    /** @type {SpotifySavedAlbum[]} */
    const albums = await this.getMySavedAlbumsSortedRecentlyPlayed();
    const sortFn = reverse ? sortListByNameReverse : sortListByName;
    return albums?.sort(sortFn);
  }

  /**
   * @param {boolean} reverse
   * @returns {Promise<SpotifySavedAlbum[]>}
   */
  async getAlbumsSortedByCreator(reverse = false) {
    /** @type {SpotifySavedAlbum[]} */
    const albums = await this.getMySavedAlbumsSortedRecentlyPlayed();
    const sortFn = reverse ? sortAlbumtByCreatorReverse : sortAlbumtByCreator;
    return albums?.sort(sortFn);
  }

  /** @return {Promise<SpotifyArtist[]>} */
  async getMyFollowedArtists() {
    /** @type {SpotifyArtist[]} */
    const artists = await this.#iterateOverCursor(
      `/me/following?type=artist&limit=50`,
      'SpotifyArtistCursor',
    );
    return artists;
  }

  /**
   * @param {string} artistId
   * @returns {Promise<boolean>}
   */
  async checkIfIFollowArtist(artistId) {
    /** @type {boolean[]} */
    const data = await this.#get(`/me/following/contains?type=artist&ids=${artistId}`);
    return data?.[0];
  }

  /** @param {string} artistId  */
  async followArtist(artistId) {
    this.#put(`/me/following?type=artist&ids=${artistId}`, {
      ids: [artistId],
    });
  }

  /** @param {string} artistId  */
  async unfollowArtist(artistId) {
    this.#delete(`/me/following?type=artist&ids=${artistId}`, {
      ids: [artistId],
    });
  }

  /**
   * @param {boolean} reverse
   * @returns {Promise<SpotifyArtist[]>}
   */
  async getMyFollowedArtistsSortedAlphabetically(reverse = false) {
    const artists = await this.getMyFollowedArtists();
    const sortFn = reverse ? sortListByNameReverse : sortListByName;
    return artists?.sort(sortFn);
  }

  /**
   * @param {string} artistId
   * @returns {Promise<SpotifyArtist>}
   */
  async getArtist(artistId) {
    const data = await this.#get(`/artists/${artistId}`);
    return new SpotifyArtist(data);
  }

  /**
   * @param {string} artistId
   * @param {string} type
   * @returns {Promise<SpotifyDiscographyType>}
   */
  async getDiscographyItem(artistId, type = DISCOGRAPHY_TYPE.ALBUM) {
    return this.#iterateOverCursor(
      `/artists/${artistId}/albums?include_groups=${type}&limit=50`,
      'SpotifyAlbumCursor',
    ).then((data) => {
      if (!data) {
        return null;
      }
      const sortedData = [...data]?.sort((a, b) => b?.release_date - a?.release_date);
      return new SpotifyDiscographyType(type, sortedData);
    });
  }

  /**
   * @param {string} artistId
   * @returns {Promise<SpotifyDiscography>}
   */
  async getArtistDiscography(artistId) {
    const PROMISES = Object.values(DISCOGRAPHY_TYPE).map(async (type) => {
      return await this.getDiscographyItem(artistId, type);
    });
    const data = await Promise.all(PROMISES);

    const discography = new SpotifyDiscography();

    data?.forEach((dataItem) => {
      if (dataItem) {
        const { type, items } = dataItem;
        discography[DISCOGRAPHY_TYPE_MAPPING[type]] = items?.map((item) => new SpotifyAlbum(item));
      }
    });

    return discography;
  }

  /**
   * @param {SpotifyDiscography} discography
   * @returns {Promise<SpotifyAlbum>}
   */
  async getArtistLatestRelease(discography) {
    if (!discography) {
      return;
    }

    const { albums, singles, compilations } = discography;
    const album = albums?.at(0);
    const single = singles?.at(0);
    const compilation = compilations?.at(0);

    let result = album;

    if (single?.release_date > result.release_date) {
      result = single;
    }

    if (compilation?.release_date > result.release_date) {
      result = compilation;
    }

    return result;
  }

  /**
   * @param {string} artistId
   * @param {string} market
   * @returns {Promise<SpotifyTrack[]>}
   */
  async getArtistTopTracks(artistId, market = 'FR') {
    /** @type {SpotifySearch} */
    const data = await this.#get(`/artists/${artistId}/top-tracks?market=${market}`);
    return data?.tracks
      ?.map((item) => new SpotifyTrack(item))
      ?.sort((a, b) => b.popularity - a.popularity);
  }

  /**
   * @param {SpotifyAlbum} latestRelease
   * @param {SpotifyTrack[]} topTracks
   * @returns {Promise<SpotifyAlbum[]>}
   */
  async getArtistTopReleases(latestRelease, topTracks = []) {
    // latest release is alwayse the first
    const result = [latestRelease];
    const uniqueUris = new Set([latestRelease?.uri]);

    topTracks.forEach((track) => {
      const album = track?.album;

      if (!uniqueUris.has(album?.uri)) {
        uniqueUris.add(album?.uri);
        result.push(album);
      }
    });

    return result;
  }

  /**
   * @param {string} artistId
   * @returns {Promise<SpotifyAlbum[]>}
   */
  async getArtistAppearsOn(artistId) {
    const discography = await this.getDiscographyItem(artistId, 'appears_on');
    return discography?.items?.map((item) => new SpotifyAlbum(item));
  }

  /**
   * @param {string} artistId
   * @returns {Promise<SpotifyArtist[]>}
   */
  async getArtistRelatedArtists(artistId) {
    /** @type {SpotifySearch} */
    const data = await this.#get(`/artists/${artistId}/related-artists`);
    return data?.artists?.map((item) => new SpotifyArtist(item));
  }

  /**
   * @param {string[]} artistsIds
   * @returns {Promise<SpotifyArtist[]>}
   */
  async getSeveralArtists(artistsIds) {
    if (!artistsIds || artistsIds.length === 0) {
      return;
    }

    /** @type {SpotifySearch} */
    const search = await this.#get(`/artists?ids=${artistsIds.join(',')}`);

    const artists = search?.artists?.map((artist) => new SpotifyArtist(artist));
    return artists;
  }

  /** @returns {Promise<SpotifySong[]>} */
  async getRecentlyPlayedSongs() {
    const recently = await this.#iterateOverCursor(
      `/me/player/recently-played?limit=50`,
      'SpotifySongCursor',
    );
    return recently;
  }

  /** @returns {Promise<(SpotifyPlaylist | SpotifyAlbum | SpotifyArtist)[]>} */
  async getMyLibRecentlyPlayed() {
    const SONGS = await this.getRecentlyPlayedSongs();

    // const PROMISES = [];
    const MY_LIB_MINIMAL = [];
    const ALREADY_FETCHED_ALBUMS = new Map();
    const playlistIds = new Set();
    const albumsIds = new Set();
    const artistsIds = new Set();

    const extractItemsToFetchFromSongs = ({ track, context }) => {
      const type = context?.type;
      const id = context?.uri?.split(':')?.at(-1);
      const albumId = track?.album?.id;

      if ((!type || type === 'album') && !albumsIds.has(albumId)) {
        albumsIds.add(albumId);
        MY_LIB_MINIMAL.push({
          type: 'album',
          id: albumId,
        });
        ALREADY_FETCHED_ALBUMS.set(
          albumId,
          new SpotifyAlbum({
            id: albumId,
            uri: track?.album?.uri,
            name: track?.name,
            artists: track?.album?.artists,
            images: track?.album?.images,
          }),
        );
      } else if (type === 'playlist' && !playlistIds.has(id)) {
        playlistIds.add(id);
        MY_LIB_MINIMAL.push({
          type,
          id,
        });
      } else if (type === 'artist' && !artistsIds.has(id)) {
        artistsIds.add(id);
        MY_LIB_MINIMAL.push({
          type,
          id,
        });
      }
    };

    SONGS?.forEach(extractItemsToFetchFromSongs);

    const PROMISES = [
      // put all PLAYLISTS PROMISES
      ...Array.from(playlistIds.keys()).map((id) => this.getPlaylistDetails(id)),
      // put all ARTISTS PROMISES
      this.getSeveralArtists(Array.from(artistsIds.keys())),
    ];

    try {
      const fetchedPlaylistOrArtist = await Promise.all(PROMISES);

      const MY_LIB_FULL = await Promise.all(
        MY_LIB_MINIMAL?.map((item) => {
          const type = item?.type;
          const id = item?.id;

          if ('album' === type) {
            return ALREADY_FETCHED_ALBUMS.get(id);
          } else if ('playlist' === type) {
            return fetchedPlaylistOrArtist.find((item) => item.id === id);
          } else if ('artist' === type) {
            // fetched artists are in the end because we put ARTISTS PROMISES at the end
            const fetchedArtist = fetchedPlaylistOrArtist.at(-1);
            return fetchedArtist?.find((item) => item.id === id);
          }
        }),
      );

      return MY_LIB_FULL;
    } catch (err) {
      LOGGER.error(err);
    }
  }

  /**
   * @param {boolean} reverse
   *  @returns {Promise<(SpotifyPlaylist | SpotifyAlbum | SpotifyArtist)[]>}
   */
  async getMyLibRecentlyPlayedSortedAlphabetically(reverse = false) {
    const recentlyPlayed = await this.getMyLibRecentlyPlayed();
    const sortFn = reverse ? sortListByNameReverse : sortListByName;
    return recentlyPlayed?.sort(sortFn);
  }

  /**
   * @returns {Promise<SpotifyQueue>}
   * @throws QueueEmptyError
   */
  async getQueue() {
    const data = await this.#get('/me/player/queue');
    const queue = new SpotifyQueue(data);

    if (queue.isEmpty()) {
      throw new QueueEmptyError('queue is empty');
    }

    return queue;
  }

  /**
   * @returns {Promise<SpotifyTrack>}
   * @throws QueueEmptyError
   */
  async getQueueLastSong() {
    let track = null;

    try {
      const queue = await this.getQueue();
      track = new SpotifyTrack(queue.currently_playing);
    } catch (err) {
      LOGGER.error(err?.message);
      throw err;
    }

    return track;
  }

  /**
   * @param {SpotifyPlayerState} playerStateApi
   * @returns {SpotifyPlayerState}
   */
  extractPlayerStateFrom(playerStateApi) {
    return new SpotifyPlayerState(playerStateApi);
  }

  async setVolume(volume) {
    let newVolumePercent = Number(volume);

    if (newVolumePercent < 0) {
      newVolumePercent = 0;
    } else if (newVolumePercent > 100) {
      newVolumePercent = 100;
    }

    this.#put(`/me/player/volume?volume_percent=${newVolumePercent}`);

    volumePercent.set(newVolumePercent);
  }

  /**
   * @param {string} playlistId
   * @param {string} newName
   */
  async updatePlaylistName(playlistId, newName) {
    this.#put(`/playlists/${playlistId}`, { name: newName });
  }

  /**
   * @param {string} userId
   * @param {string} name
   */
  async createPlaylist(userId, name) {
    this.#post(`/users/${userId}/playlists`, { name });
  }

  /**
   * FIXME 405 Method Not Allowed
   * Spotify API does not private endpoint to
   * remove playlist
   * @param {string} playlistId
   * @deprecated
   */
  async deletePlaylist(playlistId) {
    this.#delete(`/playlists/${playlistId}`);
  }

  /**
   * @param {string} query
   * @param {number} offset
   * @param {number} limit
   * @param {SpotifySearch} existingSpotifySearch
   * @returns {Promise<SpotifySearch>}
   */
  async search(query, offset = 0, limit = 20, existingSpotifySearch = null) {
    if (!isNotEmpty(query)) {
      return;
    }

    const q = encodeURIComponent(query);
    const url = `/search?q=${q}&type=album%2Cplaylist%2Ctrack%2Cartist&offset=${offset}&limit=${limit}`;
    const data = await this.#get(url);
    LOGGER.log(`search "${q}"`);

    if (!existingSpotifySearch) {
      return new SpotifySearch(data);
    }

    const mergeResults = (existingItems, newItems) => [
      ...existingItems.filter(
        (item) => !new Set(newItems.map((newItem) => newItem?.uri)).has(item?.uri),
      ),
      ...newItems,
    ];

    const result = new SpotifySearch({
      tracks: {
        items: mergeResults(existingSpotifySearch?.tracks ?? [], data?.tracks?.items ?? []),
      },
      artists: {
        items: mergeResults(existingSpotifySearch?.artists ?? [], data?.artists?.items ?? []),
      },
      albums: {
        items: mergeResults(existingSpotifySearch?.albums ?? [], data?.albums?.items ?? []),
      },
      playlists: {
        items: mergeResults(existingSpotifySearch?.playlists ?? [], data?.playlists?.items ?? []),
      },
    });

    return result;
  }

  /** @param {string} trackId */
  async likeTrack(trackId) {
    this.#put('/me/tracks', {
      ids: [trackId],
    });
  }

  /** @param {string} trackId */
  async unlikeTrack(trackId) {
    this.#delete('/me/tracks', {
      ids: [trackId],
    });
  }

  /**
   * @param {string} songUri
   * @param {string} playlistId
   */
  async addSongToPlaylist(songUri, playlistId) {
    this.#post(`/playlists/${playlistId}/tracks`, {
      uris: [songUri],
    });
  }

  /**
   * @param {string} songUri
   * @param {string[]} playlistIds
   */
  async addSongToMultiplePlaylists(songUri, playlistIds = []) {
    playlistIds.forEach((id) => this.addSongToPlaylist(songUri, id));
  }

  /**
   * @param {string} playlistId
   * @param {SpotifyTrack[]} tracks
   * @param {number} songIndex
   * @param {number} newIndex
   * @returns {Promise<SpotifyTrack[]>}
   */
  async moveTrackInPlaylist(playlistId, tracks, songIndex, newIndex) {
    if (isArrayEmpty(tracks)) {
      return [];
    }

    const cloneItems = [...tracks];

    if (songIndex > 0 || songIndex < cloneItems.length - 1) {
      const songToMove = cloneItems[songIndex];
      // Remove the song from its current position
      cloneItems.splice(songIndex, 1);
      // Insert the song in the new position
      cloneItems.splice(newIndex, 0, songToMove);

      // call API
      this.#put(`/playlists/${playlistId}/tracks`, {
        range_start: songIndex,
        insert_before: newIndex,
      });
    }

    return [...cloneItems];
  }

  static #CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  static #CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  static #REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  static #SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;
  static #API_NOTIFICATION_DELAY_MS = Number(`${import.meta.env.VITE_API_NOTIFICATION_DELAY_MS}`);
  static #API_URL = 'https://api.spotify.com/v1';

  /**
   * @param {string} userId
   * @returns {Promise<SpotifyPlaylist[]>}
   */
  async #getAllPlaylists(userId) {
    return this.#iterateOverCursor(`/users/${userId}/playlists?limit=50`, 'SpotifyPlaylistCursor');
  }

  async #determineLastSong() {
    let track = null;

    try {
      // if song in queue, load it...
      track = await this.getQueueLastSong();

      if (!track) {
        throw new QueueEmptyError();
      }
    } catch (err) {
      if (err instanceof QueueEmptyError) {
        LOGGER.error(err.message);
        // ... otherwise take it from recently-played
        const songs = await this.getRecentlyPlayedSongs();
        track = songs?.[0]?.track;
      }
    }

    return track;
  }

  /**
   * @param {number} timestamp
   * @returns {boolean}
   */
  #isPlayerNotificationValid(timestamp) {
    const existingTimestamp = get(apiTimestamp);
    return areTimestampsSeparateBy(
      existingTimestamp,
      timestamp,
      SpotifyApi.#API_NOTIFICATION_DELAY_MS,
    );
  }

  /** @param {SpotifyPlaybackState} playbackState */
  #writeStorePlaybackInfos(playbackState) {
    shuffleState.set(playbackState?.shuffle_state);
    repeatState.set(playbackState?.repeat_state);
    playing.set(playbackState?.is_playing);
    progressMs.set(playbackState?.progress_ms);
  }

  /** @param {SpotifyTrack} track */
  #writeStoreTrackInfos(track) {
    trackUri.set(track?.uri);
    trackName.set(track?.name);
    durationMs.set(track?.duration_ms);
    albumName.set(track?.album?.name);
    artists.set(track?.artists);
    const sorted = sortImagesBySizeAsc(track?.album?.images);
    if (sorted) {
      imageMiniUrl.set(sorted.at(0).url);
      imageCoverUrl.set(sorted.at(1).url);
    }
  }

  async #iterateOverCursor(endpoint, cursorType, accumulator = []) {
    const data = await this.#get(endpoint);
    const cursor = CursorFactory.createCursor(cursorType, data);

    if (cursor?.items) {
      accumulator = [...accumulator, ...cursor.items];
    }

    while (cursor?.next) {
      const endpoint = /(?<=api.spotify.com\/v1).*/g.exec(cursor.next)?.[0];
      return this.#iterateOverCursor(endpoint, cursorType, accumulator);
    }

    return accumulator;
  }

  #url(endpoint) {
    return `${SpotifyApi.#API_URL}${endpoint}`;
  }

  /**
   * @param {string} endpoint
   * @returns {Promise<object>}
   */
  async #get(endpoint) {
    try {
      const response = await AXIOS_INSTANCE().get(this.#url(endpoint));
      return await this.#axiosResponse(response, 'GET', endpoint);
    } catch (err) {
      console.log(get(accessToken), AXIOS_INSTANCE().defaults.headers.common.Authorization, err);
      // this.#axiosError(err);
    }
  }

  /**
   * @param {string} endpoint
   * @param {object} data
   * @param {object} headers
   */
  async #post(endpoint, data, headers) {
    try {
      let response;

      if (headers) {
        response = await AXIOS_INSTANCE().post(this.#url(endpoint), data, headers);
      } else {
        response = await AXIOS_INSTANCE().post(this.#url(endpoint), data);
      }

      return await this.#axiosResponse(response, 'POST', endpoint);
    } catch (err) {
      this.#axiosError(err);
    }
  }

  /**
   * @param {string} endpoint
   * @param {object} data
   */
  async #put(endpoint, data) {
    try {
      const response = await AXIOS_INSTANCE().put(this.#url(endpoint), data);
      return await this.#axiosResponse(response, 'PUT', endpoint);
    } catch (err) {
      console.log('#put', err);
      this.#axiosError(err);
      throw err;
    }
  }

  /**
   * @param {string} endpoint
   * @param {object} data
   */
  async #delete(endpoint, data) {
    try {
      AXIOS_INSTANCE()
        .delete(this.#url(endpoint), { data })
        .then((response) => this.#axiosResponse(response, 'DELETE', endpoint));
    } catch (err) {
      this.#axiosError(err);
    }
  }

  /**
   * @param {import('axios').AxiosResponse} response
   * @param {string} method
   * @param {string} endpoint
   * @returns {Promise<import('axios').AxiosResponse>}
   */
  async #axiosResponse(response, method, endpoint) {
    const data = response?.data;
    const status = response?.status;
    LOGGER.log(method, endpoint, data, status);

    if (
      endpoint === '/me/player' &&
      method === 'GET' &&
      API_STATUS.PLAYBACK_NOT_AVAILABLE_OR_ACTIVE === status
    ) {
      const err = `Spotify returns 204 -> playback not available or active (${get(deviceId)}`;
      LOGGER.error(err);
      this.transfertPlayback(get(deviceId));
      throw new PlaybackNotAvailableOrActiveError(err);
    }
    /**
      GET /me/following?type=artist behaves almost the same
      way as SpotifySongCursor or SpotifyPlaylistCursor, except
      that an "artists" properties wrapped {... items, next...}
    */
    // https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
    else if (/\/me\/following\?type=artist/gi.test(endpoint)) {
      return data?.artists;
    }

    return data;
  }

  /** @param {Error} err */
  async #axiosError(err) {
    let status = null;

    if (axios.isAxiosError(err)) {
      const errorJSON = err?.toJSON();
      // @ts-ignore
      status = errorJSON?.status;
      LOGGER.error('🌱', JSON.stringify(errorJSON), status);
    }

    if (API_STATUS.UNAUTHORIZED === status) {
      LOGGER.error('Spotify returns 401 -> UNAUTHORIZED');
      // FIXME
      // this.forceAuthorization();
      this.initAccessToken();
    } else if (API_STATUS.BAD_REQUEST === status) {
      LOGGER.error('SOURIYA... DO SOMETHING PLEASE 🕯️');
    } else if (API_STATUS.FORBIDDEN === status) {
      LOGGER.error('Spotify returns 403 -> FORBIDDEN');
    }
  }
}

export default new SpotifyApi();
