<script>
  import { scrollTop } from '@js/store';
  import ImgUrlColorSolver from '@lib/ImgUrlColorSolver.svelte';

  /** @type {import('@js/spotify').SpotifyImage}*/
  export let image;
  export let alt;
  export let canAnimate = false;

  /** @type {HTMLElement} */
  let DETAIL_COVER_HTML;
  /** @type {HTMLElement} */
  let IMG_HTML;
  let scale;
  let opacity;

  $: IMG_HEIGHT = IMG_HTML?.clientHeight ?? 0;
  $: style = `
    scale: ${scale};
    opacity: ${opacity};
  `;

  $: if (DETAIL_COVER_HTML && canAnimate) {
    scale = 1 - ($scrollTop / IMG_HEIGHT) * 0.33;
    scale = scale.toFixed(2);
    opacity = 1 - ($scrollTop / IMG_HEIGHT) * 1.25;
    opacity = opacity.toFixed(2);
  }
</script>

<ImgUrlColorSolver imageUrl={image?.url} isPlayingRgb={false} />

<div class="detail-cover" {style} bind:this={DETAIL_COVER_HTML}>
  <img src={image?.url} {alt} bind:this={IMG_HTML} />
</div>

<style>
  .detail-cover {
    transform-origin: top center;
    height: var(--size-detail-cover);
  }

  img {
    height: 100%;
    filter: var(--shadow-cover);
  }
</style>
