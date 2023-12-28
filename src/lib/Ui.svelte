<script>
  import { createEventDispatcher } from 'svelte';
  import { getTranslateXY } from '@js/browser-utils';
  import Logger from '@js/Logger';
  import { HOME_SLIDE_POSITION, canRemoveView, getView } from '@js/view-utils';
  import { currentSlidePosition, uiTimestamp } from '@js/store';
  import { getTimestamp } from '@js/date-utils';

  /** @type {import('@js/internal').View[]} */
  export let VIEWS = [];
  export const slidePrevForMe = () => {
    if (!canRemoveView($currentSlidePosition)) {
      return;
    }

    slidePrev(true);

    setTimeout(() => {
      removeSlide(true);
    }, SLIDE_TIMEOUT_MS);
  };

  const _DEBUG = false;
  const LOGGER = Logger.getNewInstance('Ui.js');
  const dispatch = createEventDispatcher();
  const TOUCH_AREA_WIDTH = 70;
  const SLIDE_TIMEOUT_MS = 300;
  const SLIDE_STYLE = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';

  /** @type {HTMLElement} */
  let SLIDER;
  /** @type {HTMLElement} */
  let FIXED;
  let SLIDES_BIND = {};
  let initialX = 0;
  let x = 0;
  let prevSlideTranslateX = 0;
  let nextSlideTranslateX = 0;
  let isScrolled = false;
  let canRemoveLast = false;
  let sliderAlreadyInitialized = false;
  let timestamp = getTimestamp();
  $: SLIDE_WIDTH = SLIDER ? SLIDER.clientWidth : 0;
  $: TOTAL_SLIDES = VIEWS.length;
  $: MINIMUM_SWIPE_X = SLIDE_WIDTH / 3;
  $: CURRENT_ID = VIEWS[$currentSlidePosition]?.id;
  $: PREV_ID = VIEWS[$currentSlidePosition - 1]?.id;
  $: NEXT_ID = VIEWS[$currentSlidePosition + 1]?.id;
  $: CURRENT_SLIDE = SLIDES_BIND[CURRENT_ID];
  $: PREV_SLIDE = SLIDES_BIND[PREV_ID];
  $: NEXT_SLIDE = SLIDES_BIND[NEXT_ID];
  $: deltaX = x - initialX;
  $: isPrevSwipe = deltaX > 0;
  $: isNextSwipe = !isPrevSwipe;
  $: isTouchedOnEdge = initialX <= TOUCH_AREA_WIDTH || initialX + TOUCH_AREA_WIDTH >= SLIDE_WIDTH;
  $: isViewsSyncWithDOM = VIEWS.length === Object.keys(SLIDES_BIND).length;
  $: isSideMenuSlide = $currentSlidePosition === 0;
  $: isHomeSlide = $currentSlidePosition === HOME_SLIDE_POSITION;
  $: canSwipe = Math.abs(deltaX) >= MINIMUM_SWIPE_X;
  $: canGoPrev = $currentSlidePosition > 0;
  $: canGoNext = $currentSlidePosition + 1 < TOTAL_SLIDES;

  $: if (!isViewsSyncWithDOM) {
    cleanNullDomBinding();
  }

  $: if (SLIDER && SLIDE_WIDTH > 0 && isViewsSyncWithDOM) {
    if (!sliderAlreadyInitialized) {
      translateSlide();
    }
    sliderAlreadyInitialized = true;
  }

  $: if ($uiTimestamp && SLIDES_BIND) {
    //   // 🚨🚨🚨 DON'T REMOVE THIS COMMENT: we make a SVELTE DEPENDENCE with isViewsSyncWithDOM, whatever value it is (true or false)
    LOGGER.log('isViewsSyncWithDOM', isViewsSyncWithDOM);

    if (!isViewsSyncWithDOM) {
      cleanNullDomBinding();
    }

    translateSlide();
    setTimeout(() => {
      slideNext(true);
    }, SLIDE_TIMEOUT_MS);
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
    isScrolled = true;

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
    isScrolled = false;

    if (!isTouchedOnEdge) {
      return;
    }

    if (isPrevSwipe) {
      slidePrev();
    } else {
      slideNext();
    }
  }

  function slidePrev(forceSwipe = false) {
    CURRENT_SLIDE.style.transition = SLIDE_STYLE;
    PREV_SLIDE.style.transition = SLIDE_STYLE;
    FIXED.style.transition = SLIDE_STYLE;
    canRemoveLast = false;

    if ((canSwipe || forceSwipe) && canGoPrev) {
      translate(CURRENT_SLIDE, SLIDE_WIDTH);
      translate(PREV_SLIDE, 0);

      if (isHomeSlide) {
        translate(FIXED, SLIDE_WIDTH);
      }

      canRemoveLast = true;
      $currentSlidePosition--;
    } else if (PREV_SLIDE) {
      translate(CURRENT_SLIDE, 0);
      translate(PREV_SLIDE, -SLIDE_WIDTH);

      if (isHomeSlide) {
        translate(FIXED, 0);
      }
    }
  }

  function slideNext(forceSwipe = false) {
    CURRENT_SLIDE.style.transition = SLIDE_STYLE;

    if ((canSwipe || forceSwipe) && canGoNext) {
      NEXT_SLIDE.style.transition = SLIDE_STYLE;

      translate(CURRENT_SLIDE, -SLIDE_WIDTH);
      translate(NEXT_SLIDE, 0);

      if (isSideMenuSlide) {
        FIXED.style.transition = SLIDE_STYLE;
        translate(FIXED, 0);
      }

      $currentSlidePosition++;
    } else if (NEXT_SLIDE) {
      NEXT_SLIDE.style.transition = SLIDE_STYLE;
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

  function translateSlide() {
    VIEWS.forEach(({ id }, i) => {
      const SLIDE = SLIDES_BIND[id];
      if (!SLIDE) {
        return;
      }

      if (i < $currentSlidePosition) {
        translate(SLIDE, -SLIDE_WIDTH);
      } else if (i > $currentSlidePosition) {
        translate(SLIDE, SLIDE_WIDTH);
      } else {
        translate(SLIDE, 0);
      }
    });
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

    removeSlide();
  }

  function removeSlide(force = false) {
    if (canRemoveLast && (isPrevSwipe || force) && $currentSlidePosition >= HOME_SLIDE_POSITION) {
      dispatch('removeSlide');
      canRemoveLast = false;
    }
  }

  function cleanNullDomBinding() {
    if (!SLIDES_BIND) {
      return;
    }

    Object.entries(SLIDES_BIND).forEach(([key, value]) => {
      if (!value) {
        delete SLIDES_BIND[key];
      }
    });
  }
</script>

{#if _DEBUG}
  <div class="indicator" class:debug-red={canGoPrev || canGoNext} class:debug-green={canSwipe}>
    <!-- <div>SLIDE_WIDTH:{SLIDE_WIDTH}</div> -->
    <!-- <div>initialX:{initialX}</div>
    <div>x:{x}</div>
    <div>deltaX:{deltaX}</div>
    <div>nextSlideTranslateX:{nextSlideTranslateX}</div> -->
    <!--<div>isTouchedOnEdge:{isTouchedOnEdge}</div>
    <div>canSwipe:{canSwipe}</div>
    <div>isPrevSwipe:{isPrevSwipe}</div>
    <div>isNextSwipe:{isNextSwipe}</div>
    <div>canGoPrev:{canGoPrev}</div>
    <div>canGoNext:{canGoNext}</div>-->
    <div>SLIDES_BIND:{JSON.stringify(Object.keys(SLIDES_BIND))}</div>
    <!-- <div>canRemoveLast:{canRemoveLast}</div> -->
    <div>isViewsSyncWithDOM:{isViewsSyncWithDOM}</div>
    <div>$currentSlidePosition:{$currentSlidePosition}</div>
  </div>
{/if}

<svelte:window
  on:resize={() => {
    timestamp = getTimestamp();
    LOGGER.log('trigger resize', timestamp);
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
    {#each VIEWS as { id, viewName, props }, i}
      <li {id} class:side-menu={i === 0} bind:this={SLIDES_BIND[id]} class:isScrolled>
        <svelte:component this={getView(viewName)} {...props} />
      </li>
    {/each}
  </ul>
{/key}
<div class="fixed" bind:this={FIXED}>
  <slot name="fixed" />
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

  .isScrolled {
    overflow: hidden;
  }

  .fixed {
    position: fixed;
    bottom: 0;
    z-index: 1;
    background-color: var(--color-primary-highlight);
    width: 100%;
  }

  .side-menu {
    background-color: var(--color-primary-highlight);
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
