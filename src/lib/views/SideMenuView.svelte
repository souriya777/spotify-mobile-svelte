<script>
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import SpotifyApi from '@js/SpotifyApi';
</script>

<ViewRoot>
  side-menu
  <Showcase />
  <button on:click={SpotifyApi.forceAuthorization}>🗑️ FORCE</button>
</ViewRoot>
