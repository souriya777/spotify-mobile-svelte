<script>
  import { screenHeight } from '@js/store';

  export const openBottomPanelForMe = () => (opened = true);
  export const closeBottomPanelForMe = () => (opened = false);
  export let callbackAfterClose = () => {};
  export let blur = false;
  export let bounce = false;

  /** @type {HTMLElement} */
  let PANEL_HTML;
  let opened = false;
  let initialY = 0;
  let y = 0;
  let prevTranslateY = 0;

  $: deltaY = y - initialY;
  $: translateY = prevTranslateY + deltaY;
  $: isBottomSwipe = deltaY > 0;
  $: PANEL_HEIGHT = $screenHeight ?? 0;
  $: MINIMUM_SWIPE_Y = PANEL_HEIGHT / 3;
  $: canSwipe = Math.abs(deltaY) >= MINIMUM_SWIPE_Y;

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialY = touch.pageY;
    y = touch.pageY;
  }

  function move(e) {
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
      PANEL_HTML.style.transition = `transform var(--transition-bottom-panel)`;
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
</script>

<div
  class="bottom-panel"
  class:opened
  class:blur
  class:bounce
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
  <slot />
</div>

<style>
  .bottom-panel {
    height: 0;
    transition: height var(--transition-bottom-panel);
  }

  .opened {
    height: 100dvh;
    transition: height var(--transition-bottom-panel);
  }

  .blur::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    z-index: var(--z-index-near);
  }

  .opened.bounce {
    transition: height 0.3s cubic-bezier(0.16, 0.81, 0.25, 1.15);
  }
</style>
