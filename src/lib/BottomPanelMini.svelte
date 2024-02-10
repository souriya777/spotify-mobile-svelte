<script>
  import { screenHeight } from '@js/store';

  export const openForMe = () => (opened = true);
  export const closeForMe = () => (opened = false);
  export let callbackAfterClose = () => {};

  /** @type {HTMLElement} */
  let PANEL_HTML;
  /** @type {HTMLElement} */
  let CONTENT_HTML;
  let opened = false;
  let initialY = 0;
  let y = 0;
  let prevTranslateY = 0;
  let isTouchOnContent = false;

  $: CONTENT_HEIGHT = CONTENT_HTML?.clientHeight ?? 0;
  $: PANEL_HEIGHT = $screenHeight ?? 0;
  $: MINIMUM_SWIPE_Y = CONTENT_HEIGHT / 3;
  $: deltaY = y - initialY;
  $: translateY = prevTranslateY + deltaY;
  $: isBottomSwipe = deltaY > 0;
  $: canSwipe = Math.abs(deltaY) >= MINIMUM_SWIPE_Y;

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialY = touch.pageY;
    y = touch.pageY;
    isTouchOnContent = initialY >= CONTENT_HTML?.offsetTop;
  }

  function move(e) {
    if (!isTouchOnContent) {
      return;
    }

    const touch = [...e.changedTouches].at(0);
    y = touch.pageY;

    if (isBottomSwipe) {
      const limitedTranslateY = limitBottom(translateY);
      translate(PANEL_HTML, limitedTranslateY);
    }
  }

  function end() {
    if (!isBottomSwipe) {
      return;
    }

    if (canSwipe) {
      opened = false;
      callbackAfterClose();
    } else {
      translateY = 0;
      PANEL_HTML.style.transition = `transform var(--transition-bottom-panel-mini)`;
      translate(PANEL_HTML, translateY);
      prevTranslateY = translateY;
    }
  }

  /**
   * @param HTML_ELEMENT {HTMLElement}
   * @param width {number | string}
   */
  function translate(HTML_ELEMENT, width) {
    const translateY = typeof width === 'number' ? `${width}px` : width;
    HTML_ELEMENT.style.transform = `translate3d(0, ${translateY}, 0)`;
  }

  function limitBottom(y) {
    return y > PANEL_HEIGHT ? PANEL_HEIGHT : y;
  }

  function transitionend() {
    if (PANEL_HTML) {
      PANEL_HTML.style.transform = '';
      PANEL_HTML.style.transition = '';
    }
  }

  function clickOutside() {
    callbackAfterClose();
  }
</script>

<div
  class="bottom-panel-mini"
  class:opened
  bind:this={PANEL_HTML}
  on:touchstart={start}
  on:touchend={end}
  on:touchmove={move}
  on:transitionend={transitionend}
>
  <!-- TO DEBUG -->
  <!-- <code>
    y:{y}
    PANEL_HEIGHT:{PANEL_HEIGHT}
    translateY:{translateY}
    prevTranslateY:{prevTranslateY}
  </code> -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="listen-click-outside" on:click={clickOutside}></div>
  <div class="content" bind:this={CONTENT_HTML}>
    <slot />
  </div>
</div>

<style>
  .bottom-panel-mini {
    height: 0;
    display: grid;
    grid-template-rows: 1fr 29.8rem;
    transition: height var(--transition-bottom-panel-mini);
  }

  .opened {
    height: 100dvh;
  }
</style>
