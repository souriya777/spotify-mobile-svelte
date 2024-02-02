<script>
  import View from '@lib/views/View.svelte';
  import ViewHeader from './ViewHeader.svelte';

  console.log('my lib');
</script>

<View>
  <svelte:fragment slot="header">
    <div class="view-bar">
      <ViewHeader title="Your library" />
      <div>icon search</div>
      <div>icon plus</div>

      <div class="filter-bar">reprendre l'ancienne</div>

      TODO shadow bottom
    </div>
  </svelte:fragment>

  <div>
    <div>sort</div>
    <div>list / grid</div>
  </div>

  <ul>
    <li>playlist item</li>
  </ul>
</View>

<style>
  li {
    display: flex;
  }
</style>
