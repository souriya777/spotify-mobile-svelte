<script>
  export let totalSlides = 0;

  const DEBUG = false;
  const TOUCH_AREA_WIDTH = 70;

  /** @type {HTMLElement} */
  let DRAGGER;
  /** @type {HTMLElement} */
  let SLIDER;

  let initialTouchPosition = 0;
  let touchPosition = 0;
  let translateX = 0;
  $: SLIDE_WIDTH = DRAGGER ? DRAGGER.clientWidth : 0;
  $: TOTAL_WIDTH = SLIDE_WIDTH * totalSlides;
  $: MINIMUM_SWIPE = SLIDE_WIDTH / 3;
  $: difference = touchPosition - initialTouchPosition;
  $: virtualTranslateX = translateX + difference;
  $: isTouchedOnEdge =
    initialTouchPosition <= TOUCH_AREA_WIDTH ||
    initialTouchPosition + TOUCH_AREA_WIDTH >= SLIDE_WIDTH;
  $: canSwipe = Math.abs(difference) >= MINIMUM_SWIPE;
  $: canGoPrev = virtualTranslateX <= 0;
  $: canGoNext = Math.abs(virtualTranslateX - SLIDE_WIDTH) < TOTAL_WIDTH;

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialTouchPosition = touch.pageX;
    touchPosition = initialTouchPosition;
  }

  function move(e) {
    const touch = [...e.changedTouches].at(0);
    touchPosition = touch.pageX;

    if (isTouchedOnEdge && canGoPrev && canGoNext) {
      SLIDER.style.transform = `translateX(${virtualTranslateX}px)`;
    }
  }

  function end() {
    slide();
  }

  function slide() {
    if (!isTouchedOnEdge) {
      return;
    }

    if (Math.abs(difference) > MINIMUM_SWIPE) {
      if (difference > 0 && canGoPrev) {
        translateX += SLIDE_WIDTH;
      } else if (difference < 0 && canGoNext) {
        translateX -= SLIDE_WIDTH;
      }
    }

    SLIDER.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';
    SLIDER.style.transform = `translateX(${translateX}px)`;
  }

  function removeTransition() {
    SLIDER.style.transition = '';
  }
</script>

<div
  bind:this={DRAGGER}
  class="mobile-dragger"
  on:touchstart={start}
  on:touchend={end}
  on:touchmove={move}
  on:transitionend={removeTransition}
  style="--total-slides:{totalSlides}"
>
  {#if DEBUG}
    <div class="indicator" class:debug-red={canGoPrev || canGoNext} class:debug-green={canSwipe}>
      <div>SLIDE_WIDTH:{SLIDE_WIDTH}</div>
      <div>initialTouchPosition:{initialTouchPosition}</div>
      <div>touchPosition:{touchPosition}</div>
      <div>difference:{difference}</div>
      <div>translateX:{translateX}</div>
      <div>virtualTranslateX:{virtualTranslateX}</div>
      <div>total:{TOTAL_WIDTH}</div>
      <div>isTouchedOnEdge:{isTouchedOnEdge}</div>
    </div>
  {/if}

  <div bind:this={SLIDER} class="slider">
    <slot name="views" />
  </div>
</div>

<style>
  .mobile-dragger {
    position: relative;
    height: 100%;
  }

  .slider {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--total-slides), 100%);
    height: 100%;
  }

  .debug-red {
    background-color: red;
    color: white;
  }

  .debug-green {
    background-color: rgb(25, 141, 25);
    color: white;
  }
</style>
