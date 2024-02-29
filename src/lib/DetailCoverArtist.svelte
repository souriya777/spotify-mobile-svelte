<script>
  import { createEventDispatcher } from 'svelte';
  import { scrollTop } from '@js/store';
  import { sortImagesBySizeAsc } from '@js/spotify-utils';
  import ImgUrlColorSolver from '@lib/ImgUrlColorSolver.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]}*/
  export let images = [];
  export let alt;
  export let backgroundColorRgb;

  const dispatch = createEventDispatcher();
  const IMAGE_MAX_HEIGHT_PERCENT = 142;
  const IMAGE_MAX_WIDTH_PERCENT = 142;
  const SCALE_MAX = 1.2;
  const SCALE_MIN = 1.14;
  const OPACITY_MIN = 0;

  /** @type {HTMLElement} */
  let DETAIL_COVER_HTML;
  /** @type {HTMLElement} */
  let IMG_HTML;
  let imgHeight;
  let scale = SCALE_MAX;
  let opacity = OPACITY_MIN;
  let imgHeightPercent = IMAGE_MAX_HEIGHT_PERCENT;
  let imgWidthPercent = IMAGE_MAX_WIDTH_PERCENT;

  $: sorted = sortImagesBySizeAsc(images);
  $: imageMini = sorted?.at(0);
  $: imageCover = sorted?.at(-1) ?? imageMini;
  $: style = `
    --img-height: ${imgHeightPercent}%;
    --img-width: ${imgWidthPercent}%;
    --img-scale: ${scale};
    --foreground-layer: rgba(${backgroundColorRgb}, ${opacity});
  `;

  $: if (IMG_HTML) {
    const relativeScale = (1 - ($scrollTop / imgHeight) * 0.1) * SCALE_MAX;
    scale = Math.max(relativeScale, SCALE_MIN);
    opacity = ($scrollTop / imgHeight) * 1.7;
  }

  function setHeight() {
    imgHeight = IMG_HTML?.clientHeight;
    dispatch('imgHeight', imgHeight);
  }
</script>

<ImgUrlColorSolver imageUrl={imageCover?.url} isPlayingRgb={false} />
<div class="detail-cover-artist" {style} bind:this={DETAIL_COVER_HTML}>
  <img src={imageCover?.url} {alt} bind:this={IMG_HTML} on:load={setHeight} />
</div>

<style>
  .detail-cover-artist {
    display: flex;
    justify-content: center;
    height: 36dvh;
    overflow: hidden;
  }

  .detail-cover-artist::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: var(--foreground-layer);
  }

  img {
    max-width: unset;
    width: 100%;
    object-fit: cover;
    transform: scale(var(--img-scale));
  }
</style>
