import { get } from 'svelte/store';
import { AXIOS_INSTANCE } from '@/js/axios-utils';
import Logger from '@/js/Logger';
import { BROWSER_DEVICE } from '@/js/browser-utils';
import {
  spotifyAccessToken,
  spotifyUserId,
  isPlaying,
  playerCurrentTrack,
  playerShuffle,
  playerRepeat,
  clearWritableLocalStorage,
  spotifyDeviceId,
} from '@/js/store';
import SpotifyUser from '@/js/SpotifyUser';
import SpotifyPlaylistCursor from '@/js/SpotifyPlaylistCursor';
import SpotifySongsCursor from '@/js/SpotifySongsCursor';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';
import SpotifyPlaybackState from '@/js/SpotifyPlaybackState';

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  PLAYER_NAME = `${import.meta.env.VITE_SPOTIFY_DEVICE_NAME}.${BROWSER_DEVICE}`;
  DEFAULT_VOLUME = 0.1;

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

  /**
   * @returns {Promise<import('./spotify').SpotifyPlaybackState>}
   */
  async getPlaybackState() {
    const data = await this.#get('/me/player');
    return new SpotifyPlaybackState(data);
  }

  /**
   * @returns {Promise<import('./spotify').SpotifyTrackObject>}
   */
  async getCurrentTrack() {
    const playbackState = await this.getPlaybackState();
    const currentTrack = playbackState.item;
    playerCurrentTrack.set(currentTrack);
    LOGGER.log('current-track', currentTrack);
    return currentTrack;
  }

  async play() {
    const deviceId = get(spotifyDeviceId);
    if (!deviceId) {
      LOGGER.log('device_id is not yet initialize!', deviceId);
    }

    // const URI = 'spotify:track:6ZFbXIJkuI1dVNWvzJzown';
    const URI = 'spotify:playlist:17eOVmN640LTnMK3fsGWVF';

    await this.#put(
      `/me/player/play?device_id=${deviceId}`,
      JSON.stringify({
        context_uri: URI,
      }),
    );
    isPlaying.set(true);
  }

  async pause() {
    const deviceId = get(spotifyDeviceId);
    await this.#put(`/me/player/pause?device_id=${deviceId}`);
    isPlaying.set(false);
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
    const data = await this.getRecentlyPlayedSongs();
    LOGGER.log('last-song', data?.[0]);
    return data?.[0];
  }

  #CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  #CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  #REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  #SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  #url(endpoint) {
    return `https://api.spotify.com/v1${endpoint}`;
  }

  #axios(endpoint, options) {
    return AXIOS_INSTANCE(options)
      .then((response) => {
        LOGGER.log(endpoint, response?.data);
        return response?.data;
      })
      .catch((err) => {
        const errorJSON = err.toJSON();
        LOGGER.error('🌱', err.toJSON());
        if (401 === errorJSON?.status) {
          LOGGER.log('Spotify returns 401 -> refresh access');
          this.forceSpotifyAuthorization();
        }
      });
  }

  async #get(endpoint) {
    return this.#axios(endpoint, {
      method: 'GET',
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
