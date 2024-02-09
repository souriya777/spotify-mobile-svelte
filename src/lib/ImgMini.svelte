<script>
  import { sortImagesBySizeAsc } from '@js/spotify-utils';
  import NoteSvg from '@lib/svg/NoteSvg.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let alt;
  export let bubble = false;

  $: image = sortImagesBySizeAsc(images)?.at(0);
</script>

{#if images.length > 0}
  <div class="img-container" class:bubble aria-label={alt}>
    <div class="img" style={`background-image: url('${image?.url}')`}></div>
  </div>
{:else}
  <div class="empty-img" class:bubble aria-label={alt}>
    {#if $$slots['empty-img']}
      <slot name="empty-img" />
    {:else}
      <NoteSvg />
    {/if}
  </div>
{/if}

<style>
  .img-container,
  .empty-img {
    width: 6.4rem;
    height: 6.4rem;
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

  .bubble {
    border-radius: 50%;
  }
</style>
