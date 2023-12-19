<script>
  import View from '@lib/views/View.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import Header from '@lib/Header.svelte';
</script>

<View>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  side-menu
  <Showcase />
</View>
