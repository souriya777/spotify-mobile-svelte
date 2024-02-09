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
  <img src={image?.url} {alt} class:bubble />
{:else}
  <div class="empty-img" aria-label={alt}>
    <NoteSvg />
  </div>
{/if}

<style>
  img {
    max-width: unset;
  }

  img,
  .empty-img {
    height: 6.4rem;
    width: 6.4rem;
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
