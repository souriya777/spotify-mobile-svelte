import axios from 'axios';
import { get } from 'svelte/store';
import { AXIOS_INSTANCE } from '@/js/axios-utils';
import Logger from '@/js/Logger';
import { BROWSER_DEVICE } from '@/js/browser-utils';
import {
  accessToken,
  userId,
  player,
  trackUri,
  trackName,
  albumName,
  imageUrl,
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
} from '@/js/store';
import SpotifyUser from '@/js/SpotifyUser';
import SpotifyPlaylistCursor from '@/js/SpotifyPlaylistCursor';
import SpotifySongsCursor from '@/js/SpotifySongsCursor';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';
import SpotifyPlaybackState from '@/js/SpotifyPlaybackState';
import SpotifyQueue from '@/js/SpotifyQueue';
import SpotifyTrack from '@/js/SpotifyTrack';
import QueueEmptyError from '@/js/QueueEmptyError';
import SpotifyStatus from '@/js/SpotifyStatus';
import SpotifyDeviceList from '@/js/SpotifyDeviceList';
import SpotifyPlayerState from '@/js/SpotifyPlayerState';
import SpotifyPlaybackStateAdapter from '@/js/SpotifyPlaybackStateAdapter';
import SpotifyTrackAdapter from '@/js/SpotifyTrackAdapter';
import { areTimestampsSeparateBy } from '@/js/time-utils';
import PlaybackNotAvailableOrActiveError from '@/js/PlaybackNotAvailableOrActiveError';
import SpotifyAlbumCursor from '@/js/SpotifyAlbumCursor';

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  PLAYER_NAME = `${import.meta.env.VITE_PLAYER_NAME_PREFIX}${BROWSER_DEVICE}`;
  TRANSFERT_PLAYBACK_TIMEOUT_MS = Number(`${import.meta.env.VITE_TRANSFERT_PLAYBACK_TIMEOUT_MS}`);
  PREVIOUS_SONG_DELAY_MS = Number(`${import.meta.env.VITE_PREVIOUS_SONG_DELAY_MS}`);

  goToAuthorizeUrl() {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      this.#CLIENT_ID
    }&scope=${encodeURIComponent(this.#SCOPES)}&redirect_uri=${encodeURIComponent(
      this.#REDIRECT_URI,
    )}`;
  }

  forceAuthorization() {
    localStorage.clear();
    window.location.href = '/';
  }

  async initAccessToken() {
    const authorizationCode = new URL(window.location.href).searchParams.get('code');

    const data = new URLSearchParams({
      code: authorizationCode,
      redirect_uri: this.#REDIRECT_URI,
      grant_type: 'authorization_code',
      client_id: this.#CLIENT_ID,
      client_secret: this.#CLIENT_SECRET,
    }).toString();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${window.btoa(`${this.#CLIENT_ID}:${this.#CLIENT_SECRET}`)}`,
    };

    try {
      const resp = await AXIOS_INSTANCE({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers,
        data,
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
    const data = await this.#get('/me');
    const user = new SpotifyUser(data);
    userId.set(user?.id);
    return user;
  }

  /** @param {null | import('@/js/spotify').SpotifyPlayerState} playerState */
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
      track = SpotifyTrackAdapter.adapt(spotifyPlayerState);
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

  /** @returns {Promise<import('@/js/spotify').SpotifyPlaybackState>} */
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

  /** @returns {Promise<import('@/js/spotify').SpotifyDevice[]>} */
  async getAvailableDevice() {
    const data = await this.#get('/me/player/devices');
    const deviceList = new SpotifyDeviceList(data);
    return deviceList?.devices;
  }

  async play() {
    get(player).resume();
    LOGGER.log('play');
  }

  pause() {
    get(player).pause();
    LOGGER.log('pause');
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
   * @returns {Promise<import('@/js/spotify').SpotifyPlaylist[]>}
   */
  async getPlaylists(userId) {
    const data = await this.#get(`/users/${userId}/playlists`);
    return new SpotifyPlaylistCursor(data)?.items;
  }

  /** @return {Promise<import('@/js/spotify').SpotifyAlbum[]>} */
  async getMyAlbums() {
    const data = await this.#get('/me/albums');
    return new SpotifyAlbumCursor(data)?.items?.map((item) => item?.album);
  }

  /** @returns {Promise<import('@/js/spotify').SpotifySong[]>} */
  async getRecentlyPlayedSongs() {
    const data = await this.#get(`/me/player/recently-played`);
    return new SpotifySongsCursor(data)?.items;
  }

  /**
   * @returns {Promise<import('@/js/spotify').SpotifyQueue>}
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
   * @returns {Promise<import('@/js/spotify').SpotifyTrack>}
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
   * @param {import('@/js/spotify').SpotifyPlayerState} playerStateApi
   * @returns {import('@/js/spotify').SpotifyPlayerState}
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

  #CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  #CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  #REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  #SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;
  #API_NOTIFICATION_DELAY_MS = Number(`${import.meta.env.VITE_API_NOTIFICATION_DELAY_MS}`);

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
    return areTimestampsSeparateBy(existingTimestamp, timestamp, this.#API_NOTIFICATION_DELAY_MS);
  }

  /** @param {import('@/js/spotify').SpotifyPlaybackState} playbackState */
  #writeStorePlaybackInfos(playbackState) {
    shuffleState.set(playbackState?.shuffle_state);
    repeatState.set(playbackState?.repeat_state);
    playing.set(playbackState?.is_playing);
    progressMs.set(playbackState?.progress_ms);
  }

  /** @param {import('@/js/spotify').SpotifyTrack} track */
  #writeStoreTrackInfos(track) {
    trackUri.set(track?.uri);
    trackName.set(track?.name);
    durationMs.set(track?.duration_ms);
    albumName.set(track?.album?.name);
    artists.set(track?.artists);
    imageUrl.set(track?.album?.images?.[0]?.url);
  }

  #url(endpoint) {
    return `https://api.spotify.com/v1${endpoint}`;
  }

  /**
   * @param {string} endpoint
   * @param {object} options
   * @returns { Promise<{object}> } data
   */
  #axios(endpoint, options) {
    return AXIOS_INSTANCE(options)
      .then((response) => {
        const data = response?.data;
        const status = response?.status;
        LOGGER.log(options?.method, endpoint, data, status);

        if (
          endpoint === '/me/player' &&
          SpotifyStatus.PLAYBACK_NOT_AVAILABLE_OR_ACTIVE === status
        ) {
          LOGGER.error('Spotify returns 204 -> playback not available or active');
          this.transfertPlayback(get(deviceId));
          throw new PlaybackNotAvailableOrActiveError(
            'Spotify returns 204 -> playback not available or active',
          );
        }

        return data;
      })
      .catch((err) => {
        let status = null;

        if (axios.isAxiosError(err)) {
          const errorJSON = err?.toJSON();
          // @ts-ignore
          status = errorJSON?.status;
          LOGGER.error('🌱', errorJSON.toString(), status);
        }

        if (SpotifyStatus.UNAUTHORIZED === status) {
          LOGGER.error('Spotify returns 401 -> UNAUTHORIZED');
          this.forceAuthorization();
        } else if (SpotifyStatus.BAD_REQUEST === status) {
          LOGGER.error('SOURIYA... DO SOMETHING PLEASE 🕯️');

          // FIXME is it mandatory here ?
          // this.forceAuthorization();
        }

        throw err;
      });
  }

  async #get(endpoint) {
    return this.#axios(endpoint, {
      method: 'GET',
      url: this.#url(endpoint),
    });
  }

  async #post(endpoint) {
    return this.#axios(endpoint, {
      method: 'POST',
      url: this.#url(endpoint),
    });
  }

  async #put(endpoint, data) {
    return this.#axios(endpoint, {
      method: 'PUT',
      data,
      url: this.#url(endpoint),
    });
  }
}

export default new SpotifyApi();
