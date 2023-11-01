<script>
  import CollectionImageSolver from '@/lib/CollectionImageSolver.svelte';

  /** @type {import('@/js/spotify').SpotifyImage[]} */
  export let images;
  export let title;
  export let author = null;
</script>

<div class="preview-summary">
  <slot name="move" />

  <CollectionImageSolver {images} />

  <span class="text">
    {title}
    {#if author}
      <small>{author}</small>
    {/if}
  </span>
</div>

<style>
  .preview-summary {
    display: flex;
  }

  .text {
    display: flex;
    flex-direction: column;
  }
</style>
