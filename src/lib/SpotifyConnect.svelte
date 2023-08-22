<script>
  import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_DEVICE_ID, PLAYER } from '@/js/store';
  import { appendScriptToBody } from '@/js/souriya-utils';
  import SpotifyApi from '@/js/SpotifyApi';

  appendScriptToBody('https://sdk.scdn.co/spotify-player.js');

  console.log('[souriya 😎][SpotifyConnect] try connecting player...', SpotifyApi.playerName);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const SPOTIFY_PLAYER = new window.Spotify.Player({
      name: SpotifyApi.playerName,
      getOAuthToken: (cb) => {
        cb($SPOTIFY_ACCESS_TOKEN);
      },
      volume: 0.7,
    });

    SPOTIFY_PLAYER.addListener('ready', ({ device_id }) => {
      console.log('[souriya 😎][SpotifyConnect] device ready !', device_id);
      SPOTIFY_DEVICE_ID.set(device_id);
    });

    SPOTIFY_PLAYER.addListener('not_ready', ({ device_id }) => {
      console.log('[souriya 😎][SpotifyConnect] device ID has gone offline', device_id);
    });

    // FIXME useful ?
    // SPOTIFY_PLAYER.on('initialization_error', ({ message }) => {
    //   console.error('Failed to initialize', message);
    // });

    // SPOTIFY_PLAYER.on('authentication_error', ({ message }) => {
    //   console.error('Failed to authenticate', message);
    // });

    // SPOTIFY_PLAYER.on('account_error', ({ message }) => {
    //   console.error('Failed to validate Spotify account', message);
    // });

    // SPOTIFY_PLAYER.on('playback_error', ({ message }) => {
    //   console.error('Failed to perform playback', message);
    // });

    SPOTIFY_PLAYER.connect();
    PLAYER.set(SPOTIFY_PLAYER);

    console.log('[souriya 😎][SpotifyConnect] player OK !', SPOTIFY_PLAYER);

    // trick : if ACCESS_TOKEN is "invalid", Spotify API returns 401 => so we can "force" ACCESS_TOKEN's regeneration ;)
    SpotifyApi.play();
  };
</script>
