<script>
  import View from '@lib/views/View.svelte';
  import Header from '@lib/Header.svelte';
  import Debug from '@lib/Debug.svelte';
</script>

<View>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <Debug />
</View>
