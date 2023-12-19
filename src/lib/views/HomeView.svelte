<script>
  import View from '@lib/views/View.svelte';
  import Header from '@lib/Header.svelte';

  export let id;

  console.log(id);
</script>

<View>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  main
</View>
