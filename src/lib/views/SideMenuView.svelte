<script>
  import View from '@lib/views/View.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import Header from '@lib/Header.svelte';
  import SpotifyApi from '@js/SpotifyApi';
</script>

<View>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  side-menu
  <Showcase />
  <button on:click={SpotifyApi.forceAuthorization}>🗑️ FORCE</button>
</View>
