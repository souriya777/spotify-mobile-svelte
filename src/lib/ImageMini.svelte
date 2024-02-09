<script>
  import NoteSvg from '@lib/svg/NoteSvg.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let alt;
  export let bubble = false;

  $: image = images?.sort((a, b) => b.width - a.width)?.at(0);
</script>

{#if images.length > 0}
  <img src={image?.url} {alt} height={image?.height} width={image?.width} class:bubble />
{:else}
  <div class="empty-img" aria-label={alt}>
    <NoteSvg />
  </div>
{/if}

<style>
  img,
  .empty-img {
    height: 6.2rem;
    width: 6.2rem;
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
