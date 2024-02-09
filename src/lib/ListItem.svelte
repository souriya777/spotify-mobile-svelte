<script>
  import { addView, addAndSlideNextForMe } from '@js/store';
  import ImgMini from '@lib/ImgMini.svelte';

  export let title;
  export let owner = '';
  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let imageAlt = '';
  export let createViewFn;
  export let isListArtist = false;
  export let isLikeItem = false;

  $: if (title === 'Korean Ballad (발라드)/Sad Songs') {
    console.log('🔵', title, images?.sort((a, b) => a.width - b.width)?.at(0));
  }

  function goDetail() {
    const view = createViewFn();
    addView(view);
    $addAndSlideNextForMe?.();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class="list-item" on:click={goDetail}>
  {#if isLikeItem}
    <img src="/liked-songs-64.png" alt="liked songs" />
  {:else}
    <div class="img" class:isListArtist>
      <ImgMini {images} alt={imageAlt} bubble={isListArtist} />
    </div>
  {/if}

  <div class="text">
    <div class="name one-row font-list__title">{title}</div>
    <div class="owner one-row font-list__owner">{owner}</div>
  </div>
</li>

<style>
  .list-item {
    display: flex;
    padding-block-end: var(--padding-inline-library);
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline-start: 1rem;
  }

  .owner {
    color: var(--color-tertiary);
  }
</style>
