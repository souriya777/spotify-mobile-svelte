import { get } from 'svelte/store';
import { AXIOS_INSTANCE } from '@/js/axios-utils';
import Logger from '@/js/Logger';
import { BROWSER_DEVICE } from '@/js/browser-utils';
import {
  spotifyAccessToken,
  spotifyUserId,
  player,
  spotifyDeviceId,
  trackUri,
  trackName,
  albumName,
  imageUrl,
  artists,
  shuffleState,
  repeatState,
  isPlaying,
  progressMs,
  progressMsTick,
  durationMs,
  apiTimestamp,
  devices,
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
import { areTimestampsSeparateBy, millisToMinuteSecond } from '@/js/time-utils';
import { clearWritableLocalStorage } from '@/js/store-utils';

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  PLAYER_NAME = `${import.meta.env.VITE_SPOTIFY_DEVICE_NAME}.${BROWSER_DEVICE}`;
  DEFAULT_VOLUME = 0.2;
  TIMESTAMP_MIN_GAP_MS = Number(`${import.meta.env.VITE_SPOTIFY_TIMESTAMP_MIN_GAP_MS}`);

  authorize() {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      this.#CLIENT_ID
    }&scope=${encodeURIComponent(this.#SCOPES)}&redirect_uri=${encodeURIComponent(
      this.#REDIRECT_URI,
    )}`;
  }

  forceSpotifyAuthorization() {
    clearWritableLocalStorage();
    window.location.href = '/';
  }

  async getToken() {
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
      const resp = await AXIOS_INSTANCE.post('https://accounts.spotify.com/api/token', data, {
        headers,
      });

      spotifyAccessToken.set(resp?.data.access_token);
      LOGGER.log('token ✅', resp?.data.access_token);
    } catch (err) {
      LOGGER.error('', err.toJSON());
    }
  }

  /**
   * @returns {Promise<SpotifyUser>}
   */
  async me() {
    const data = await this.#get('/me');
    const user = new SpotifyUser(data);
    spotifyUserId.set(user?.id);
    return user;
  }

  /** @param {null | import('@/js/spotify').SpotifyPlayerState} state */
  async synchronize(state = null) {
    let track = null;
    let playbackState = null;

    if (state) {
      if (this.#isSpotifyNotificationValid(state?.timestamp)) {
        LOGGER.log('SPOTIFY NOTIFICATION', state);
        const playerState = this.getPlayerState(state);

        track = SpotifyTrackAdapter.adapt(playerState);
        playbackState = SpotifyPlaybackStateAdapter.adapt(playerState);

        this.#synchronizeTrack(track);
        this.#synchronizePlaybackState(playbackState);
      } else {
        LOGGER.log('SPOTIFY NOTIFICATION is too close...');
      }
    } else {
      this.#synchronizeTrack(track);
      this.#synchronizePlaybackState(playbackState);
    }
  }

  /**
   * @param {import('@/js/spotify').SpotifyPlayerState} state
   * @returns {import('@/js/spotify').SpotifyPlayerState}
   */
  getPlayerState(state) {
    return new SpotifyPlayerState(state);
  }

  /**
   * @returns {Promise<import('@/js/spotify').SpotifyPlaybackState>}
   */
  async getPlaybackState() {
    const data = await this.#get('/me/player');
    const playbackState = new SpotifyPlaybackState(data);
    LOGGER.log('getPlaybackState()', playbackState);
    this.#writeStorePlaybackInfos(playbackState);
    return playbackState;
  }

  /** @param {string} deviceId */
  async transfertPlayback(deviceId) {
    this.#put('/me/player', {
      device_ids: [deviceId],
      play: true,
    });
    isPlaying.set(true);
  }

  /**
   * @returns {Promise<import('@/js/spotify').SpotifyDevice[]>}
   */
  async getAvailableDevice() {
    const data = await this.#get('/me/player/devices');
    const deviceList = new SpotifyDeviceList(data);
    if (deviceList?.devices) {
      devices.set(deviceList?.devices);
    }
    return deviceList?.devices;
  }

  async play() {
    const deviceId = get(spotifyDeviceId);
    if (!deviceId) {
      LOGGER.log('device_id is not yet initialize!', deviceId);
      return;
    }

    const uri = get(trackUri);
    const position_ms = get(progressMsTick);

    await this.#put(
      `/me/player/play?device_id=${deviceId}`,
      JSON.stringify({
        // FIXME context_uri or uris ?
        // context_uri: uri,
        uris: [uri],
        position_ms,
      }),
    );

    isPlaying.set(true);

    LOGGER.log('play', position_ms, uri);
  }

  async pause() {
    const deviceId = get(spotifyDeviceId);
    await this.#put(`/me/player/pause?device_id=${deviceId}`);
    isPlaying.set(false);
  }

  async previous() {
    await this.#post(`/me/player/previous`);
    // TODO play
  }

  async next() {
    // TODO extract track_window next_tracks
    // TODO play with uri & position ?
    // await this.#post(`/me/player/next`);
  }

  /** @param {number} positionMs */
  async seekPosition(positionMs) {
    const p = get(player);
    p.seek(positionMs).then(() => {
      LOGGER.log('changed position!', positionMs, millisToMinuteSecond(positionMs));
    });
  }

  async shuffle() {
    await this.#put(`/me/player/shuffle?state=${!get(shuffleState)}`);

    shuffleState.update((n) => !n);
  }

  async repeat() {
    const currentRepeatState = get(repeatState);

    const newRepeatState =
      currentRepeatState === SpotifyRepeatState.OFF
        ? SpotifyRepeatState.CONTEXT
        : currentRepeatState === SpotifyRepeatState.CONTEXT
        ? SpotifyRepeatState.TRACK
        : SpotifyRepeatState.OFF;

    await this.#put(`/me/player/repeat?state=${newRepeatState}`);

    repeatState.set(newRepeatState);
  }

  /**
   * @param {string} userId
   * @returns {Promise<import('@/js/spotify').SpotifyPlaylist[]>}
   */
  async getMyPlaylists(userId) {
    const data = await this.#get(`/users/${userId}/playlists`);
    return new SpotifyPlaylistCursor(data)?.items;
  }

  /**
   * @returns {Promise<import('@/js/spotify').SpotifySong[]>}
   */
  async getRecentlyPlayedSongs() {
    const data = await this.#get(`/me/player/recently-played`);
    return new SpotifySongsCursor(data)?.items;
  }

  /**
   * @returns {Promise<import('@/js/spotify').SpotifySong>}
   */
  async getLastSong() {
    const songs = await this.getRecentlyPlayedSongs();
    return songs?.[0];
  }

  /**
   * @returns {Promise<import('@/js/spotify').SpotifyQueue>}
   * @throws QueueEmptyError
   */
  async getQueue() {
    const data = await this.#get('/me/player/queue');
    const queue = new SpotifyQueue(data);
    LOGGER.log('getQueue()', queue);

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
    let queueSong = null;

    try {
      const queue = await this.getQueue();
      queueSong = new SpotifyTrack(queue.currently_playing);
      LOGGER.log('getQueueLastSong()', queueSong);
    } catch (err) {
      LOGGER.error(err?.message);
      throw err;
    }

    return queueSong;
  }

  #CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  #CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  #REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  #SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  /**
   * @param {null | import('@/js/spotify').SpotifyPlaybackState} state
   */
  async #synchronizePlaybackState(state = null) {
    const playbackState = state ? state : await this.getPlaybackState();

    // FIXME rewrite
    this.#writeStorePlaybackInfos(playbackState);
    LOGGER.log('last state loaded ✅', playbackState);
  }

  /**
   * @param {import('@/js/spotify').SpotifyTrack} foundTrack
   */
  async #synchronizeTrack(foundTrack = null) {
    const track = foundTrack ? foundTrack : await this.#searchLastTrack();

    if (track) {
      this.#writeStoreTrackInfos(track);
      LOGGER.log('last track loaded ✅', track);
    }
  }

  async #searchLastTrack() {
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
        const song = await this.getLastSong();
        track = song?.track;
      }
    }

    return track;
  }

  /**
   * @param {number} timestamp
   * @returns {boolean}
   */
  #isSpotifyNotificationValid(timestamp) {
    const existingTimestamp = get(apiTimestamp);

    // update timestamp
    apiTimestamp.set(timestamp);

    return areTimestampsSeparateBy(existingTimestamp, timestamp, this.TIMESTAMP_MIN_GAP_MS);
  }

  /** @param {import('@/js/spotify').SpotifyPlaybackState} playbackState */
  #writeStorePlaybackInfos(playbackState) {
    shuffleState.set(playbackState?.shuffle_state);
    repeatState.set(playbackState?.repeat_state);
    isPlaying.set(playbackState?.is_playing);
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
        return data;
      })
      .catch((err) => {
        const errorJSON = err.toJSON();
        const status = errorJSON?.status;
        // LOGGER.error('🌱', err.toJSON(), status);
        if (SpotifyStatus.UNAUTHORIZED === status) {
          LOGGER.error('Spotify returns 401 -> refresh access');
          this.forceSpotifyAuthorization();
        } else if (SpotifyStatus.BAD_REQUEST === status) {
          LOGGER.error('Spotify returns 400 -> bad request', err);
          this.forceSpotifyAuthorization();
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
