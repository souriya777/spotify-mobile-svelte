<script>
  import { SPOTIFY_AUTHORIZE_WAITING, SPOTIFY_ACCESS_TOKEN } from '@/js/store';
  import { authorize, getToken } from '@/js/spotify-utils';

  $: if (!$SPOTIFY_AUTHORIZE_WAITING) {
    console.log('[souriya 😎][SpotifyAuthorization]: try to authorize...');
    SPOTIFY_AUTHORIZE_WAITING.set(true);
    authorize();
  }

  $: {
    const codeParam = new URL(window.location.href).searchParams.get('code');
    if (codeParam && !$SPOTIFY_ACCESS_TOKEN) {
      console.log('[souriya 😎][SpotifyAuthorization]: try to get tokens...');
      getToken();
    }
  }
</script>
