<script>
  import { gridMode } from '@js/store';
  import { sortImagesBySizeAsc } from '@js/spotify-utils';
  import NoteSvg from '@lib/svg/NoteSvg.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let alt;
  export let bubble = false;

  $: sorted = sortImagesBySizeAsc(images);
  $: imageMini = sorted?.at(0);
  $: imageCover = sorted?.at(1) ?? imageMini;
  // the quality of "imageMini" (64x64) seems to be not beautiful on my iphone...
  // $: image = $gridMode ? imageCover : imageMini;
  $: image = imageCover;
</script>

<div class="img-mini" class:bubble aria-label={alt}>
  {#if images.length > 0}
    {#if $gridMode && !bubble}
      <img src={image?.url} {alt} />
    {:else}
      <div class="img-container">
        <div class="img" style={`background-image: url('${image?.url}')`}></div>
      </div>
    {/if}
  {:else}
    <div class="empty-img">
      {#if $$slots['empty-img']}
        <slot name="empty-img" />
      {:else}
        <NoteSvg />
      {/if}
    </div>
  {/if}
</div>

<style>
  .img-mini {
    height: 100%;
  }

  .img-container,
  .empty-img {
    width: var(--size-img-mini);
    height: var(--size-img-mini);
    overflow: hidden;
  }

  .img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .empty-img {
    display: grid;
    place-content: center;
    background-color: var(--color-primary-highlight);
  }

  .bubble .img-container {
    border-radius: 50%;
  }
</style>
