<script>
  import { spotifyAuthorizeWaiting, spotifyAccessToken } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';

  $: if (!$spotifyAuthorizeWaiting) {
    console.log('[souriya 😎][SpotifyAuthorization]: try to authorize...');
    spotifyAuthorizeWaiting.set(true);
    SpotifyApi.authorize();
  }

  $: {
    const codeParam = new URL(window.location.href).searchParams.get('code');
    if (codeParam && !$spotifyAccessToken) {
      console.log('[souriya 😎][SpotifyAuthorization]: try to get tokens...');
      SpotifyApi.getToken();
    }
  }
</script>
