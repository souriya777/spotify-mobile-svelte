<script>
  import View from '@lib/views/View.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import SpotifyApi from '@js/SpotifyApi';
</script>

<View>
  side-menu
  <Showcase />
  <button on:click={SpotifyApi.forceAuthorization}>🗑️ FORCE</button>
</View>
