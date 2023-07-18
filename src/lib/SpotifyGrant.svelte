<script>
  import { onMount } from 'svelte';
  import { SPOTIFY_GRANT_WAITING } from '@/js/store';
  import { authorize, getToken } from '@/js/spotify-utils';

  onMount(() => {
    if (!$SPOTIFY_GRANT_WAITING) {
      SPOTIFY_GRANT_WAITING.set(true);
      authorize();
    }

    const codeParam = new URL(window.location).searchParams.get('code');
    if (codeParam) {
      getToken();
    }
  });
</script>
