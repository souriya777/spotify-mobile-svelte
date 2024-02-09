<script>
  import ImageSolverSAVE from '@lib/ImageSolverSAVE.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let title;
  export let author = null;
  export let isArtist = false;
</script>

<div class="preview-summary">
  <slot name="move" />

  <ImageSolverSAVE {images} alt={title} {isArtist} />

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
