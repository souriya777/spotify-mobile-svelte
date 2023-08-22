<script>
  import { spotifyAuthorizeWaiting, spotifyAccessToken } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('SpotifyAuthorization.js');

  $: if (!$spotifyAuthorizeWaiting) {
    LOGGER.log('try to authorize...');
    spotifyAuthorizeWaiting.set(true);
    SpotifyApi.authorize();
  }

  $: {
    const codeParam = new URL(window.location.href).searchParams.get('code');
    if (codeParam && !$spotifyAccessToken) {
      LOGGER.log('try to get tokens...');
      SpotifyApi.getToken();
    }
  }
</script>
