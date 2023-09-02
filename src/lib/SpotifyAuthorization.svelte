<script>
  import { authorizationWaiting, accessToken } from '@/js/store/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('SpotifyAuthorization.js');

  $: if (!$authorizationWaiting) {
    LOGGER.log('try to authorize...');
    authorizationWaiting.set(true);
    SpotifyApi.authorize();
  }

  $: {
    const codeParam = new URL(window.location.href).searchParams.get('code');
    if (codeParam && !$accessToken) {
      LOGGER.log('try to get tokens...');
      SpotifyApi.getToken();
    }
  }
</script>
