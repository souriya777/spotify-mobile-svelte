<script>
  import DetailHeaderBar from '@lib/DetailHeaderBar.svelte';

  export let title;
  export let scrollY;
  export let scrollTopTitle;
  export let backgroundColorRgb;
  export let titleReachedHeader;
</script>

<div class="detail-header">
  <DetailHeaderBar {title} {scrollY} {scrollTopTitle} {titleReachedHeader} {backgroundColorRgb} />
</div>

<style>
  .detail-header {
    position: sticky;
    top: 0;
    height: var(--height-detail-header);
    z-index: var(--z-index-nearest);
  }
</style>
