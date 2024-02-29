<script>
  import { createEventDispatcher } from 'svelte';
  import { scrollTop } from '@js/store';
  import { sortImagesBySizeAsc } from '@js/spotify-utils';
  import ImgUrlColorSolver from '@lib/ImgUrlColorSolver.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]}*/
  export let images = [];
  export let alt;
  export let canAnimate = false;

  const dispatch = createEventDispatcher();

  /** @type {HTMLElement} */
  let DETAIL_COVER_HTML;
  /** @type {HTMLElement} */
  let IMG_HTML;
  let imgHeight;
  let scale;
  let opacity;

  $: sorted = sortImagesBySizeAsc(images);
  $: imageMini = sorted?.at(0);
  $: imageCover = sorted?.at(1) ?? imageMini;
  $: style = `
    scale: ${scale};
    opacity: ${opacity};
  `;

  $: if (DETAIL_COVER_HTML && canAnimate) {
    scale = 1 - ($scrollTop / imgHeight) * 0.33;
    scale = scale.toFixed(2);
    opacity = 1 - ($scrollTop / imgHeight) * 1.25;
    opacity = opacity.toFixed(2);
  }

  function setHeight() {
    imgHeight = IMG_HTML?.clientHeight;
    dispatch('imgHeight', imgHeight);
  }
</script>

<ImgUrlColorSolver imageUrl={imageCover?.url} isPlayingRgb={false} />

<div class="detail-cover" {style} bind:this={DETAIL_COVER_HTML}>
  <img src={imageCover?.url} {alt} bind:this={IMG_HTML} on:load={setHeight} />
</div>

<style>
  .detail-cover {
    transform-origin: top center;
    height: 16rem;
  }

  img {
    height: 100%;
    filter: var(--shadow-cover);
  }
</style>
