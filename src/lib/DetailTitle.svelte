<script>
  import { scrollTop } from '@js/store';

  export let title = '';
  export let canAnimate = false;
  export let coverHeight = 0;

  const TITLE_HEIGHT_PX = 16;
  const TITLE_HEIGHT_CALCULATED_PX = TITLE_HEIGHT_PX * 2;
  const MAX_TRANSLATE_Y_PERCENT = 75;

  const OPACITY_COEF = 1 / TITLE_HEIGHT_CALCULATED_PX;
  const TRANSLATE_COEF = MAX_TRANSLATE_Y_PERCENT / TITLE_HEIGHT_CALCULATED_PX;

  /** @type {HTMLElement} */
  let TITLE_HTML;
  let opacity;
  let translateY;

  $: if (TITLE_HTML && canAnimate) {
    const scrollY = $scrollTop - coverHeight;

    opacity = scrollY * OPACITY_COEF;
    opacity = Math.min(parseFloat(opacity.toFixed(2)), 1);

    translateY = MAX_TRANSLATE_Y_PERCENT - scrollY * TRANSLATE_COEF;
    translateY = Math.max(Math.trunc(translateY), 0);
  }

  $: if (!canAnimate) {
    opacity = 0;
  }

  $: style = `
    opacity: ${opacity};
    transform: translate3d(-5%, ${translateY}%, 0);
  `;
</script>

<div class="font-collection-detail-header" {style} bind:this={TITLE_HTML}>
  {title}
</div>

<style>
  div {
    max-width: 20ch;
    margin-inline: auto;
    margin-block-start: 0.4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
