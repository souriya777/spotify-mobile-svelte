import { get } from 'svelte/store';
import { AXIOS_INSTANCE } from '@/js/axios-utils';
import Logger from '@/js/Logger';
import { BROWSER_DEVICE } from '@/js/browser-utils';
import {
  spotifyAccessToken,
  spotifyUserId,
  isPlaying,
  clearWritableLocalStorage,
} from '@/js/store';

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  PLAYER_NAME = null;

  constructor() {
    this.PLAYER_NAME = `${import.meta.env.VITE_SPOTIFY_DEVICE_NAME}.${BROWSER_DEVICE}`;
  }

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

  async me() {
    const data = await this.#get('me');
    const userId = data?.id;
    if (userId) {
      spotifyUserId.set(userId);
    }
  }

  async play(deviceId) {
    if (!deviceId) {
      LOGGER.log('device_id is not yet initialize!', deviceId);
    }

    // const URI = 'spotify:track:6ZFbXIJkuI1dVNWvzJzown';
    const URI = 'spotify:playlist:17eOVmN640LTnMK3fsGWVF';

    await this.#put(
      `me/player/play?device_id=${deviceId}`,
      JSON.stringify({
        context_uri: URI,
      }),
    );
    isPlaying.set(true);
  }

  async pause(deviceId) {
    await this.#put(`me/player/pause?device_id=${deviceId}`);
    isPlaying.set(false);
  }

  async getMyPlaylists() {
    return await this.#get(`users/${get(spotifyUserId)}/playlists`);
  }

  async getRecentlyPlayedSongs() {
    return await this.#get(`me/player/recently-played`);
  }

  async getLastSong() {
    const data = await this.getRecentlyPlayedSongs();
    LOGGER.log('last-song', data?.items?.[0]);
    return data?.items?.[0];
  }

  #CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  #CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  #REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  #SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  #url(endpoint) {
    return `https://api.spotify.com/v1/${endpoint}`;
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
