<script>
  import { slidePrevAndRemoveForMe, scrollTop } from '@js/store';
  import { onTap } from '@js/event-utils';
  import { TERTIARY_COLOR } from '@/js/palette-utils';
  import Svg from '@lib/svg/Svg.svelte';

  export let scrollTopBegin;
  export let scrollTopEnd;
  export let floating = false;

  const TRANSLATE_X_MIN = 0;
  const TRANSLATE_X_MAX = 25;
  const OPACITY_MIN = 0;
  const OPACITY_MAX = 0.4;

  /** @type {HTMLElement} */
  let BACK_HTML;
  let x = TRANSLATE_X_MAX;
  let opacity = OPACITY_MAX;

  $: canAnimate = $scrollTop >= scrollTopBegin && $scrollTop <= scrollTopEnd;
  $: isScrollUnder = $scrollTop < scrollTopBegin;
  $: backgroundStyle = floating ? `background-color: rgba(${TERTIARY_COLOR}, ${opacity})` : '';
  $: transformStyle = `transform: translateX(${x}%);`;
  $: style = `${transformStyle}%);${backgroundStyle}`;

  $: if (BACK_HTML && floating) {
    if (canAnimate) {
      const scrollTopFactor = ($scrollTop - scrollTopBegin) / (scrollTopEnd - scrollTopBegin);
      x = TRANSLATE_X_MAX - scrollTopFactor * TRANSLATE_X_MAX;
      opacity = OPACITY_MAX - scrollTopFactor * OPACITY_MAX;
    } else if (isScrollUnder) {
      x = TRANSLATE_X_MAX;
      opacity = OPACITY_MAX;
    } else {
      x = TRANSLATE_X_MIN;
      opacity = OPACITY_MIN;
    }
  }
</script>

<div
  class="detail-header-back-button"
  class:floating
  {style}
  bind:this={BACK_HTML}
  use:onTap={() => $slidePrevAndRemoveForMe?.()}
>
  <Svg name="back" size={16} />
</div>

<style>
  .detail-header-back-button {
    position: relative;
    display: flex;
    align-items: center;
    margin-inline-start: var(--padding-inline-view-content);
  }

  .floating {
    padding: 0.8rem;
    border-radius: 50%;
  }
</style>
