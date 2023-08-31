import { get } from 'svelte/store';
import { AXIOS_INSTANCE } from '@/js/axios-utils';
import Logger from '@/js/Logger';
import { BROWSER_DEVICE } from '@/js/browser-utils';
import {
  spotifyAccessToken,
  spotifyUserId,
  playerPlaybackState,
  playerCurrentTrack,
  playerShuffle,
  playerRepeat,
  clearWritableLocalStorage,
  spotifyDeviceId,
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

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  PLAYER_NAME = `${import.meta.env.VITE_SPOTIFY_DEVICE_NAME}.${BROWSER_DEVICE}`;
  DEFAULT_VOLUME = 0.2;

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

  async synchronize(state) {
    let track = null;
    let playbackState = null;

    if (state) {
      LOGGER.log('SPOTIFY NOTIFICATION', state);
      const playerState = this.getPlayerState(state);

      track = SpotifyTrackAdapter.adapt(playerState);
      playbackState = SpotifyPlaybackStateAdapter.adapt(playerState);
    }

    this.#synchronizeTrack(track);
    this.#synchronizePlaybackState(playbackState);
  }

  /**
   * @param {any} state
   * @returns {import('./spotify').SpotifyPlayerState}
   */
  getPlayerState(state) {
    return new SpotifyPlayerState(state);
  }

  /**
   * @returns {Promise<import('./spotify').SpotifyPlaybackState>}
   */
  async getPlaybackState() {
    const data = await this.#get('/me/player');
    const playbackState = new SpotifyPlaybackState(data);
    LOGGER.log('getPlaybackState()', playbackState);
    return playbackState;
  }

  /** @param {string} deviceId */
  async transfertPlayback(deviceId) {
    this.#put('/me/player', {
      device_ids: [deviceId],
      play: true,
    });
  }

  /**
   * @returns {Promise<import('./spotify').SpotifyDevice[]>}
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
    }

    const uri = get(playerCurrentTrack)?.album?.uri;

    await this.#put(
      `/me/player/play?device_id=${deviceId}`,
      JSON.stringify({
        // FIXME context_uri or uris ?
        // context_uri: uri,
        uris: [uri],
      }),
    );
    LOGGER.log('play()', uri);
  }

  async pause() {
    const deviceId = get(spotifyDeviceId);
    await this.#put(`/me/player/pause?device_id=${deviceId}`);
  }

  async previous() {
    await this.#post(`/me/player/previous`);
    // TODO play
  }

  async next() {
    await this.#post(`/me/player/next`);
    this.synchronize();
    // TODO play
  }

  async shuffle() {
    const shuffleState = get(playerShuffle);
    await this.#put(`/me/player/shuffle?state=${!shuffleState}`);
    playerShuffle.set(!shuffleState);
  }

  async repeat() {
    let state = get(playerRepeat);
    state =
      state === SpotifyRepeatState.OFF
        ? SpotifyRepeatState.CONTEXT
        : state === SpotifyRepeatState.CONTEXT
        ? SpotifyRepeatState.TRACK
        : SpotifyRepeatState.OFF;
    await this.#put(`/me/player/repeat?state=${state}`);
    playerRepeat.set(state);
  }

  /**
   * @param {string} userId
   * @returns {Promise<import('./spotify').SpotifyPlaylist[]>}
   */
  async getMyPlaylists(userId) {
    const data = await this.#get(`/users/${userId}/playlists`);
    return new SpotifyPlaylistCursor(data)?.items;
  }

  /**
   * @returns {Promise<import('./spotify').SpotifySong[]>}
   */
  async getRecentlyPlayedSongs() {
    const data = await this.#get(`/me/player/recently-played`);
    return new SpotifySongsCursor(data)?.items;
  }

  /**
   * @returns {Promise<import('./spotify').SpotifySong>}
   */
  async getLastSong() {
    const songs = await this.getRecentlyPlayedSongs();
    return songs?.[0];
  }

  /**
   * @returns {Promise<import('./spotify').SpotifyQueue>}
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
   * @returns {Promise<import('./spotify').SpotifyTrack>}
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
   * @param {null | import('./spotify').SpotifyPlaybackState} state
   */
  async #synchronizePlaybackState(state = null) {
    const playbackState = state ? state : await this.getPlaybackState();

    playerPlaybackState.set(playbackState);
    playerShuffle.set(playbackState?.shuffle_state);
    playerRepeat.set(playbackState?.repeat_state);

    LOGGER.log('last state loaded ✅', playbackState);
  }

  /**
   * @param {import('./spotify').SpotifyTrack} foundTrack
   */
  async #synchronizeTrack(foundTrack = null) {
    const track = foundTrack ? foundTrack : await this.#searchLastTrack();

    if (track) {
      playerCurrentTrack.set(track);
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
