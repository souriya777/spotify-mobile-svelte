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
  $: image = $gridMode ? imageCover : imageMini;
</script>

<!-- {$gridMode}{JSON.stringify(image)} -->
<div class:bubble class:gridMode={$gridMode} aria-label={alt}>
  {#if images.length > 0}
    <div class="img-container">
      <div class="img" style={`background-image: url('${image?.url}')`}></div>
    </div>
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
  .img-container,
  .empty-img {
    width: var(--size-img-mini);
    height: var(--size-img-mini);
    overflow: hidden;
  }

  .gridMode .img-container,
  .gridMode .empty-img {
    width: var(--size-img-cover);
    height: var(--size-img-cover);
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

  .bubble {
    border-radius: 50%;
  }
</style>
