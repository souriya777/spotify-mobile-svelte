<script>
  export let title = '';
  export let titleReachedHeader = false;
  export let scrollTopTitle = 0;

  const TITLE_HEIGHT_PX = 16;
  const TITLE_HEIGHT_CALCULATED_PX = TITLE_HEIGHT_PX * 2;
  const MAX_TRANSLATE_Y_PERCENT = 75;

  const OPACITY_COEF = 1 / TITLE_HEIGHT_CALCULATED_PX;
  const TRANSLATE_COEF = MAX_TRANSLATE_Y_PERCENT / TITLE_HEIGHT_CALCULATED_PX;

  /** @type {HTMLElement} */
  let TITLE_HTML;
  let y;
  let opacity;

  $: if (TITLE_HTML && titleReachedHeader) {
    y = MAX_TRANSLATE_Y_PERCENT - scrollTopTitle * TRANSLATE_COEF;
    y = Math.max(Math.trunc(y), 0);

    opacity = scrollTopTitle * OPACITY_COEF;
    opacity = Math.min(parseFloat(opacity.toFixed(2)), 1);
  }

  $: if (!titleReachedHeader) {
    opacity = 0;
  }

  $: style = `
    transform: translateY(${y}%);
    opacity: ${opacity};
  `;
</script>

<div class="font-bold" {style} bind:this={TITLE_HTML}>
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
