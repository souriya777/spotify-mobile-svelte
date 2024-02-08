<script>
  import { addView, addAndSlideNextForMe } from '@js/store';
  import ImageMini from '@lib/ImageMini.svelte';

  export let title;
  export let owner;
  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images;
  export let imageAlt;
  export let createViewFn;

  function goDetail() {
    const view = createViewFn();
    addView(view);
    $addAndSlideNextForMe?.();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class="list-item" on:click={goDetail}>
  <ImageMini {images} alt={imageAlt} />
  <div class="text">
    <div class="name font-list__title">{title}</div>
    <div class="owner font-list__owner">{owner}</div>
  </div>
</li>

<style>
  .list-item {
    display: flex;
    padding-block: 1rem;
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
