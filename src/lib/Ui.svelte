<script>
  import { getTranslateXY } from '@js/browser-utils';
  import { getTimestamp } from '@js/date-utils';
  import Logger from '@js/Logger';
  import Nav from '@lib/Nav.svelte';
  import Player from '@lib/Player.svelte';

  /** @type {import('@js/internal').View[]} */
  export let VIEWS = [];

  const _DEBUG = false;
  const LOGGER = Logger.getNewInstance('Ui.js');
  const TOUCH_AREA_WIDTH = 70;
  const SLIDE_STYLE = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';

  /** @type {HTMLElement} */
  let SLIDER;
  /** @type {HTMLElement} */
  let FIXED;
  let SLIDES_BIND = {};
  let timestamp = getTimestamp();
  let currentSlidePosition = 1; // not 0 because of "SIDE MENU"
  let initialX = 0;
  let x = 0;
  let prevSlideTranslateX = 0;
  let nextSlideTranslateX = 0;
  $: SLIDE_WIDTH = SLIDER ? SLIDER.clientWidth : 0;
  $: TOTAL_SLIDES = VIEWS.length;
  $: MINIMUM_SWIPE_X = SLIDE_WIDTH / 3;
  $: CURRENT_ID = VIEWS[currentSlidePosition]?.id;
  $: PREV_ID = VIEWS[currentSlidePosition - 1]?.id;
  $: NEXT_ID = VIEWS[currentSlidePosition + 1]?.id;
  $: CURRENT_SLIDE = SLIDES_BIND[CURRENT_ID];
  $: PREV_SLIDE = SLIDES_BIND[PREV_ID];
  $: NEXT_SLIDE = SLIDES_BIND[NEXT_ID];
  $: deltaX = x - initialX;
  $: isPrevSwipe = deltaX > 0;
  $: isNextSwipe = !isPrevSwipe;
  $: isTouchedOnEdge = initialX <= TOUCH_AREA_WIDTH || initialX + TOUCH_AREA_WIDTH >= SLIDE_WIDTH;
  $: isViewsSyncWithDOM = VIEWS.length === Object.keys(SLIDES_BIND).length;
  $: isSideMenuSlide = currentSlidePosition === 0;
  $: isHomeSlide = currentSlidePosition === 1;
  $: canSwipe = Math.abs(deltaX) >= MINIMUM_SWIPE_X;
  $: canGoPrev = currentSlidePosition > 0;
  $: canGoNext = currentSlidePosition + 1 < TOTAL_SLIDES;

  $: if (SLIDER && SLIDE_WIDTH > 0 && isViewsSyncWithDOM) {
    translateSlide();
  }

  function translateSlide() {
    VIEWS.forEach(({ id }, i) => {
      const SLIDE = SLIDES_BIND[id];
      if (!SLIDE) {
        return;
      }

      if (i < currentSlidePosition) {
        translate(SLIDE, -SLIDE_WIDTH);
      } else if (i > currentSlidePosition) {
        translate(SLIDE, SLIDE_WIDTH);
      } else {
        translate(SLIDE, 0);
      }
    });
  }

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialX = touch.pageX;
    x = initialX;
    prevSlideTranslateX = getTranslateXY(PREV_SLIDE).translateX;
    nextSlideTranslateX = getTranslateXY(NEXT_SLIDE).translateX;
  }

  function move(e) {
    if (!isTouchedOnEdge) {
      return;
    }

    const touch = [...e.changedTouches].at(0);
    x = touch.pageX;

    if (isPrevSwipe && canGoPrev) {
      let translateX = prevSlideTranslateX + deltaX;

      translate(CURRENT_SLIDE, deltaX);

      if (isHomeSlide) {
        translate(PREV_SLIDE, translateX);
        translate(FIXED, deltaX);
      } else {
        translate(PREV_SLIDE, translateX / 10);
      }
    } else if (isNextSwipe && canGoNext && NEXT_SLIDE) {
      let translateX = nextSlideTranslateX + deltaX;

      translate(NEXT_SLIDE, translateX);

      if (isSideMenuSlide) {
        translate(FIXED, translateX);
        translate(CURRENT_SLIDE, deltaX);
      } else {
        translate(CURRENT_SLIDE, deltaX / 4);
      }
    }
  }

  function end() {
    if (!isTouchedOnEdge) {
      return;
    }

    if (isPrevSwipe) {
      slidePrev();
    } else {
      slideNext();
    }
  }

  function slidePrev() {
    CURRENT_SLIDE.style.transition = SLIDE_STYLE;
    PREV_SLIDE.style.transition = SLIDE_STYLE;
    FIXED.style.transition = SLIDE_STYLE;

    if (canSwipe && canGoPrev) {
      translate(CURRENT_SLIDE, SLIDE_WIDTH);
      translate(PREV_SLIDE, 0);

      if (isHomeSlide) {
        translate(FIXED, SLIDE_WIDTH);
      }

      currentSlidePosition--;
    } else if (PREV_SLIDE) {
      translate(CURRENT_SLIDE, 0);
      translate(PREV_SLIDE, -SLIDE_WIDTH);

      if (isHomeSlide) {
        translate(FIXED, 0);
      }
    }
  }

  function slideNext() {
    CURRENT_SLIDE.style.transition = SLIDE_STYLE;
    NEXT_SLIDE.style.transition = SLIDE_STYLE;

    if (canSwipe && canGoNext) {
      translate(CURRENT_SLIDE, -SLIDE_WIDTH);
      translate(NEXT_SLIDE, 0);

      if (isSideMenuSlide) {
        FIXED.style.transition = SLIDE_STYLE;
        translate(FIXED, 0);
      }

      currentSlidePosition++;
    } else if (NEXT_SLIDE) {
      translate(CURRENT_SLIDE, 0);
      translate(NEXT_SLIDE, SLIDE_WIDTH);

      if (isSideMenuSlide) {
        FIXED.style.transition = SLIDE_STYLE;
        translate(FIXED, SLIDE_WIDTH);
      }
    }
  }

  function translate(HTML_ELEMENT, width) {
    HTML_ELEMENT.style.transform = `translateX(${width}px)`;
  }

  function removeTransition() {
    if (CURRENT_SLIDE) {
      CURRENT_SLIDE.style.transition = '';
    }

    if (PREV_SLIDE) {
      PREV_SLIDE.style.transition = '';
    }

    if (NEXT_SLIDE) {
      NEXT_SLIDE.style.transition = '';
    }

    if (FIXED) {
      FIXED.style.transition = '';
    }
  }
</script>

{#if _DEBUG}
  <div class="indicator" class:debug-red={canGoPrev || canGoNext} class:debug-green={canSwipe}>
    <!-- <div>SLIDE_WIDTH:{SLIDE_WIDTH}</div> -->
    <div>initialX:{initialX}</div>
    <div>x:{x}</div>
    <div>deltaX:{deltaX}</div>
    <div>nextSlideTranslateX:{nextSlideTranslateX}</div>
    <!-- <div>isTouchedOnEdge:{isTouchedOnEdge}</div>
    <div>canSwipe:{canSwipe}</div>
    <div>isPrevSwipe:{isPrevSwipe}</div>
    <div>isNextSwipe:{isNextSwipe}</div>
    <div>canGoPrev:{canGoPrev}</div>
    <div>canGoNext:{canGoNext}</div>
    <div>currentSlidePosition:{currentSlidePosition}</div> -->
  </div>
{/if}

<svelte:window
  on:resize={() => {
    LOGGER.log('trigger resize');
    timestamp = getTimestamp();
  }}
/>

{#key timestamp}
  <ul
    bind:this={SLIDER}
    on:touchstart={start}
    on:touchend={end}
    on:touchmove={move}
    on:transitionend={removeTransition}
  >
    {#each VIEWS as { id, component, props }, i}
      <li {id} class:side-menu={i === 0} bind:this={SLIDES_BIND[id]}>
        <svelte:component this={component} {...props} />
      </li>
    {/each}
  </ul>
{/key}
<div class="fixed" bind:this={FIXED}>
  <Player />
  <Nav />
</div>

<style>
  ul {
    position: relative;
    height: 100%;
    width: 100%;
  }

  li {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--color-primary);
  }

  .fixed {
    position: fixed;
    bottom: 0;
    z-index: 1;
    background-color: blanchedalmond;
    color: black;
    width: 100%;
  }

  .side-menu {
    background-color: hotpink;
    width: 90%;
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
