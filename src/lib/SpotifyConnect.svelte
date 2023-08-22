<script>
  import { spotifyAccessToken, spotifyDeviceId, player } from '@/js/store';
  import { appendScriptToBody } from '@/js/souriya-utils';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('SpotifyConnect.svelte');

  appendScriptToBody('https://sdk.scdn.co/spotify-player.js');

  LOGGER.log('try connecting player...', SpotifyApi.playerName);

  // @ts-ignore
  window.onSpotifyWebPlaybackSDKReady = () => {
    // @ts-ignore
    const SPOTIFY_PLAYER = new window.Spotify.Player({
      name: SpotifyApi.playerName,
      getOAuthToken: (cb) => {
        cb($spotifyAccessToken);
      },
      volume: 0.7,
    });

    SPOTIFY_PLAYER.addListener('ready', ({ device_id }) => {
      LOGGER.log('device ready !', device_id);
      spotifyDeviceId.set(device_id);
    });

    SPOTIFY_PLAYER.addListener('not_ready', ({ device_id }) => {
      LOGGER.log('device ID has gone offline', device_id);
    });

    // FIXME useful ?
    // SPOTIFY_PLAYER.on('initialization_error', ({ message }) => {
    //   LOGGER.error('Failed to initialize', message);
    // });

    // SPOTIFY_PLAYER.on('authentication_error', ({ message }) => {
    //   LOGGER.error('Failed to authenticate', message);
    // });

    // SPOTIFY_PLAYER.on('account_error', ({ message }) => {
    //   LOGGER.error('Failed to validate Spotify account', message);
    // });

    // SPOTIFY_PLAYER.on('playback_error', ({ message }) => {
    //   LOGGER.error('Failed to perform playback', message);
    // });

    SPOTIFY_PLAYER.connect();
    player.set(SPOTIFY_PLAYER);

    LOGGER.log('player OK !', SPOTIFY_PLAYER);

    // trick : if ACCESS_TOKEN is "invalid", Spotify API returns 401 => so we can "force" ACCESS_TOKEN's regeneration ;)
    SpotifyApi.play();
  };
</script>
