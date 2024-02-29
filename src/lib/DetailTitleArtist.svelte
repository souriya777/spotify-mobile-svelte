<script>
  import { createEventDispatcher, afterUpdate } from 'svelte';

  export let title = '';
  export let backgroundColorRgb;

  const FONT_SIZE_ONE_ROW_PX = 50;
  const FONT_SIZE_TWO_ROWS_PX = 42;
  const FONT_SIZE_MIN_PX = 30;
  const MAX_CHAR_ONE_ROW = 16;
  const MAX_CHAR_TWO_ROWS = MAX_CHAR_ONE_ROW * 2;

  const dispatch = createEventDispatcher();

  /** @type {HTMLElement} */
  let ELEMENT_HTML;

  $: artistFontSizePx = calculateFontSize(title);
  $: style = `
    --color-gradient-artist-1: rgba(${backgroundColorRgb}, .66);
    --color-gradient-artist-2: rgba(${backgroundColorRgb}, .22);
    --color-gradient-artist-3: rgba(${backgroundColorRgb}, .1);
    --font-size-artist: ${artistFontSizePx}px;
  `;

  function calculateFontSize(text) {
    if (!text) {
      return FONT_SIZE_ONE_ROW_PX;
    }

    return text.length <= MAX_CHAR_ONE_ROW
      ? FONT_SIZE_ONE_ROW_PX
      : text.length <= MAX_CHAR_TWO_ROWS
        ? FONT_SIZE_TWO_ROWS_PX
        : FONT_SIZE_MIN_PX;
  }

  afterUpdate(() => {
    if (ELEMENT_HTML?.clientHeight) {
      dispatch('title-artist-height', ELEMENT_HTML.clientHeight);
    }
  });
</script>

<div class="artist__title font-black" {style} bind:this={ELEMENT_HTML}>
  {title}
</div>

<style>
  .artist__title {
    border: 1px dashed deeppink;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 1.4rem 1.6rem 1.4rem;
    transform: translateY(-100%);
    background: linear-gradient(
      to top,
      var(--color-gradient-artist-1) 0%,
      var(--color-gradient-artist-2) 80%,
      var(--color-gradient-artist-3) 100%
    );
    font-size: var(--font-size-artist);
    line-height: 1;
    box-shadow: 0 -2rem 2.4rem 0 var(--color-gradient-artist-3);
  }
</style>
