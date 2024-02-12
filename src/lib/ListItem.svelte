<script>
  import { addView, addAndSlideNextForMe } from '@js/store';
  import ImgMini from '@lib/ImgMini.svelte';
  import DefaultArtistSvg from '@lib/svg/DefaultArtistSvg.svelte';

  export let title;
  export let owner = '';
  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let imageAlt = '';
  export let createViewFn;
  export let isListArtist = false;

  function goDetail() {
    const view = createViewFn();
    addView(view);
    $addAndSlideNextForMe?.();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class="list-item" class:isListArtist on:click={goDetail}>
  <div class="img">
    {#if isListArtist}
      <ImgMini {images} alt={imageAlt} bubble={true}>
        <svelte:fragment slot="empty-img">
          <DefaultArtistSvg />
        </svelte:fragment>
      </ImgMini>
    {:else}
      <ImgMini {images} alt={imageAlt} />
    {/if}
  </div>

  <div class="text">
    <div class="name one-row font-list__title">{title}</div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="owner one-row font-list__owner">{@html owner}</div>
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
