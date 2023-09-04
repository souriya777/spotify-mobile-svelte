<script>
  import { authorizationOk, accessToken } from '@/js/store/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('SpotifyAuthorization.svelte');

  const codeParam = new URL(window.location.href).searchParams.get('code');

  $: if (window.location.href.search(/\/login/)) {
    console.log('TODO loging');

    // TODO implement routing
    // TODO changer window pushState to routing solution
    // TODO can I catch 400 'Failed to authenticate Authentication failed' in order to switch to "default" routing

    // TODO do I use refresh_token ?
  }

  // 1/ if client has a token, check it
  $: if ($accessToken) {
    LOGGER.log('test IF token is valid');

    // trick : if ACCESS_TOKEN is "invalid", Spotify API returns 401 => so we can "force" ACCESS_TOKEN's regeneration ;)
    SpotifyApi.me();
  }

  // 1/ authorize
  $: if (!$accessToken && !$authorizationOk) {
    LOGGER.log('authorize...');
    authorizationOk.set(true);
    SpotifyApi.authorize();
  }

  // 2/ get token
  $: if (!$accessToken && codeParam) {
    LOGGER.log('get token...');
    SpotifyApi.getToken();
  }
</script>
