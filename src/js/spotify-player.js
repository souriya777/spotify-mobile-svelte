import { deviceId, player } from '@/js/store';
import { appendScriptToBody } from '@/js/souriya-utils';
import SpotifyApi from '@/js/SpotifyApi';
import Logger from '@/js/Logger';

const LOGGER = Logger.getNewInstance('spotify-player.js');

/** @param {string} accessToken */
function createPlayer(accessToken) {
  appendScriptToBody('https://sdk.scdn.co/spotify-player.js');

  // @ts-ignore
  window.onSpotifyWebPlaybackSDKReady = () => {
    // @ts-ignore
    const SPOTIFY_PLAYER = new window.Spotify.Player({
      name: SpotifyApi.PLAYER_NAME,
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume: Number(import.meta.env.VITE_PLAYER_VOLUME),
    });

    SPOTIFY_PLAYER.addListener('ready', ({ device_id }) => {
      deviceId.set(device_id);
      player.set(SPOTIFY_PLAYER);

      LOGGER.log('device & player ready ✅', device_id, SPOTIFY_PLAYER?._options?.name);
    });

    SPOTIFY_PLAYER.addListener('not_ready', ({ device_id }) => {
      LOGGER.log('device ID has gone offline', device_id);
    });

    SPOTIFY_PLAYER.addListener('player_state_changed', (state) => {
      SpotifyApi.synchronize(state);
    });

    SPOTIFY_PLAYER.on('initialization_error', ({ message }) => {
      LOGGER.error('Failed to initialize:', message);
    });

    SPOTIFY_PLAYER.on('authentication_error', ({ message }) => {
      LOGGER.error('Failed to authenticate:', message);
      SpotifyApi.forceAuthorization();
    });

    SPOTIFY_PLAYER.on('account_error', ({ message }) => {
      LOGGER.error('Failed to validate Spotify account:', message);
    });

    SPOTIFY_PLAYER.on('playback_error', ({ message }) => {
      LOGGER.error('Failed to perform playback:', message);
    });

    LOGGER.log('try to CONNECT player...');
    SPOTIFY_PLAYER.connect();
  };
}

export { createPlayer };
