<script>
  import { accessToken, deviceId, player } from '@/js/store/store';
  import { navigate } from 'svelte-routing';
  import { appendScriptToBody } from '@/js/souriya-utils';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('SpotifyPlayerConnect.svelte');

  appendScriptToBody('https://sdk.scdn.co/spotify-player.js');

  // @ts-ignore
  window.onSpotifyWebPlaybackSDKReady = () => {
    // @ts-ignore
    const SPOTIFY_PLAYER = new window.Spotify.Player({
      name: SpotifyApi.PLAYER_NAME,
      getOAuthToken: (cb) => {
        cb($accessToken);
      },
      volume: SpotifyApi.DEFAULT_VOLUME,
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
      LOGGER.error('Failed to initialize', message);
    });

    SPOTIFY_PLAYER.on('authentication_error', ({ message }) => {
      LOGGER.error('Failed to authenticate', message);
      navigate('/login');
    });

    SPOTIFY_PLAYER.on('account_error', ({ message }) => {
      LOGGER.error('Failed to validate Spotify account', message);
    });

    SPOTIFY_PLAYER.on('playback_error', ({ message }) => {
      LOGGER.error('Failed to perform playback', message);
    });

    LOGGER.log('try to CONNECT player...');
    SPOTIFY_PLAYER.connect();
  };
</script>
