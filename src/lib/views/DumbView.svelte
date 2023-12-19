<script>
  import View from '@lib/views/View.svelte';

  export let title;
</script>

<View id="dumb-view">
  DUMB
  <h1>
    {title}
  </h1>
</View>
