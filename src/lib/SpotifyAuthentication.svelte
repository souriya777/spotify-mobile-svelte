<script>
  import { authorizationOk, accessToken } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';
  import { createPlayer } from '@/js/spotify-player';

  const LOGGER = Logger.getNewInstance('SpotifyAuthorization.svelte');

  const codeParam = new URL(window.location.href).searchParams.get('code');

  // 1/ if client has a token, check it
  // if it's ok, we initialize the player
  $: if ($accessToken) {
    LOGGER.log('test IF token is valid');

    // trick : if ACCESS_TOKEN is "invalid", Spotify API returns 401 => so we can "force" ACCESS_TOKEN's regeneration ;)
    SpotifyApi.me().then(() => createPlayer($accessToken));
  }

  // 1/ authorize
  $: if (!$accessToken && !$authorizationOk) {
    LOGGER.log('authorize...');
    authorizationOk.set(true);
    SpotifyApi.goToAuthorizeUrl();
  }

  // 2/ get token
  $: if (!$accessToken && codeParam) {
    LOGGER.log('get token...');
    SpotifyApi.initAccessToken();
  }
</script>
