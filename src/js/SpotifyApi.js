import { AXIOS_INSTANCE } from '@/js/axios-utils';
import Logger from '@/js/Logger';
import { BROWSER_DEVICE } from '@/js/browser-utils';
import { spotifyAccessToken, isPlaying, clearWritableLocalStorage } from '@/js/store';

const LOGGER = Logger.getNewInstance('SpotifyApi.js');

class SpotifyApi {
  #CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  #CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  #REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  #SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  constructor() {
    this.playerName = `${BROWSER_DEVICE}.${import.meta.env.VITE_SPOTIFY_DEVICE_NAME}`;
  }

  authorize() {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      this.#CLIENT_ID
    }&scope=${encodeURIComponent(this.#SCOPES)}&redirect_uri=${encodeURIComponent(
      this.#REDIRECT_URI,
    )}`;
  }

  async getToken() {
    const authorizationCode = new URL(window.location.href).searchParams.get('code');

    const spotifyData = {
      code: authorizationCode,
      redirect_uri: this.#REDIRECT_URI,
      grant_type: 'authorization_code',
      client_id: this.#CLIENT_ID,
      client_secret: this.#CLIENT_SECRET,
    };

    const options = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${window.btoa(`${this.#CLIENT_ID}:${this.#CLIENT_SECRET}`)}`,
      },
      data: new URLSearchParams(spotifyData).toString(),
    };

    const data = await AXIOS_INSTANCE(options)
      .then((response) => response?.data)
      .catch((error) => {
        LOGGER.error('', error.toJSON());
      });

    spotifyAccessToken.set(data.access_token);
    LOGGER.log('token OK !', data.access_token);
  }

  forceSpotifyAuthorization() {
    clearWritableLocalStorage();
    window.location.href = '/';
  }

  play(deviceId) {
    const TRACK_URI = 'spotify:album:7oWx4auBp2kCb54VkRCCUq';

    AXIOS_INSTANCE({
      method: 'PUT',
      data: JSON.stringify({
        context_uri: TRACK_URI,
      }),
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    })
      .then((response) => {
        LOGGER.log('PLAY', response?.data);
        isPlaying.set(true);
      })
      .catch((error) => {
        const errorJSON = error.toJSON();
        LOGGER.error('🌱', error.toJSON());
        if (401 === errorJSON?.status) {
          LOGGER.log('Spotify returns 401 -> refresh access');
          this.forceSpotifyAuthorization();
        }
      });
  }

  pause(deviceId) {
    return AXIOS_INSTANCE({
      method: 'PUT',
      url: `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
    })
      .then((response) => {
        LOGGER.log('PAUSE', response?.data);
        isPlaying.set(false);
      })
      .catch((error) => {
        LOGGER.error('🌱', error.toJSON());
      });
  }

  getRecentlyPlayedSongs() {
    return AXIOS_INSTANCE({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/player/recently-played
      `,
    })
      .then((response) => {
        LOGGER.log('me/player/recently-played', response?.data);
        isPlaying.set(false);
        return response?.data;
      })
      .catch((error) => {
        LOGGER.error('🌱', error.toJSON());
      });
  }

  getLastSong() {
    this.getRecentlyPlayedSongs().then((arr) => LOGGER.log('', arr?.[0]));
  }
}

export default new SpotifyApi();
