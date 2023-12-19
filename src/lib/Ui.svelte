<script>
  import { getTranslateXY } from '@js/browser-utils';
  import { getTimestamp } from '@js/date-utils';
  import Logger from '@js/Logger';

  /** @type {import('@js/internal').View[]} */
  export let VIEWS = [];

  const _DEBUG = false;
  const LOGGER = Logger.getNewInstance('Ui.js');
  const TOUCH_AREA_WIDTH = 70;
  const SLIDE_STYLE = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';

  /** @type {HTMLElement} */
  let SLIDER;
  let CHILDREN_BIND = {};
  let timestamp = getTimestamp();
  let currentSlidePosition = 1; // not 0 because of "SIDE MENU"
  let initialX = 0;
  let x = 0;
  let prevSlideTranslateX = 0;
  let nextSlideTranslateX = 0;
  $: SLIDE_WIDTH = SLIDER ? SLIDER.clientWidth : 0;
  $: TOTAL_SLIDES = VIEWS.length;
  $: MINIMUM_SWIPE_X = SLIDE_WIDTH / 3;
  // FIXME
  // $: SIDE_MENU_WIDTH = SLIDE_WIDTH - 20;
  $: currentView = VIEWS[currentSlidePosition];
  $: prevView = VIEWS[currentSlidePosition - 1];
  $: nextView = VIEWS[currentSlidePosition + 1];
  $: currentSlide = currentView ? CHILDREN_BIND[currentView.id] : null;
  $: prevSlide = prevView ? CHILDREN_BIND[prevView.id] : null;
  $: nextSlide = nextView ? CHILDREN_BIND[nextView.id] : null;
  $: deltaX = x - initialX;
  $: isPrev = deltaX > 0;
  $: isNext = !isPrev;
  $: isTouchedOnEdge = initialX <= TOUCH_AREA_WIDTH || initialX + TOUCH_AREA_WIDTH >= SLIDE_WIDTH;
  $: isViewsObjectSyncWithDomRepresentationHack =
    VIEWS.length === Object.keys(CHILDREN_BIND).length;
  $: isSideMenuSlide = currentSlidePosition === 0;
  $: isAfterSideMenuSlide = currentSlidePosition === 1;
  $: canSwipe = Math.abs(deltaX) >= MINIMUM_SWIPE_X;
  $: canGoPrev = currentSlidePosition > 0;
  $: canGoNext = currentSlidePosition + 1 < TOTAL_SLIDES;

  $: if (SLIDER && VIEWS && SLIDE_WIDTH > 0) {
    if (isViewsObjectSyncWithDomRepresentationHack) {
      translateSlide();
    }
  }

  function translateSlide() {
    VIEWS.forEach(({ id }, i) => {
      let translateX;
      if (i < currentSlidePosition) {
        translateX = -SLIDE_WIDTH;
      } else if (i > currentSlidePosition) {
        translateX = SLIDE_WIDTH;
      } else {
        translateX = 0;
      }

      const SLIDE = CHILDREN_BIND[id];
      if (SLIDE) {
        // @ts-ignore
        SLIDE.style.transform = `translateX(${translateX}px)`;
      }
    });
  }

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialX = touch.pageX;
    x = initialX;
    prevSlideTranslateX = getTranslateXY(prevSlide).translateX;
    nextSlideTranslateX = getTranslateXY(nextSlide).translateX;
  }

  function move(e) {
    if (!isTouchedOnEdge) {
      return;
    }

    const touch = [...e.changedTouches].at(0);
    x = touch.pageX;

    if (isPrev && canGoPrev) {
      currentSlide.style.transform = `translateX(${deltaX}px)`;

      let prevTranslateX = prevSlideTranslateX + deltaX;
      if (!isAfterSideMenuSlide) {
        prevTranslateX /= 10;
      }
      prevSlide.style.transform = `translateX(${prevTranslateX}px)`;
    } else if (isNext && canGoNext && nextSlide) {
      nextSlide.style.transform = `translateX(${nextSlideTranslateX + deltaX}px)`;

      let nextTranslateX = deltaX;
      if (!isSideMenuSlide) {
        nextTranslateX /= 4;
      }
      currentSlide.style.transform = `translateX(${nextTranslateX}px)`;
    }
  }

  function end() {
    if (!isTouchedOnEdge) {
      return;
    }

    if (isPrev) {
      slidePrev();
    } else {
      slideNext();
    }
  }

  function slidePrev() {
    currentSlide.style.transition = SLIDE_STYLE;

    if (canSwipe && canGoPrev) {
      currentSlide.style.transform = `translateX(${SLIDE_WIDTH}px)`;
      prevSlide.style.transition = SLIDE_STYLE;
      prevSlide.style.transform = `translateX(${0}px)`;

      currentSlidePosition--;
    } else if (prevSlide) {
      currentSlide.style.transform = `translateX(${0}px)`;
    }
  }

  function slideNext() {
    if (canSwipe && canGoNext) {
      nextSlide.style.transition = SLIDE_STYLE;
      nextSlide.style.transform = `translateX(${0}px)`;
      currentSlide.style.transition = SLIDE_STYLE;
      currentSlide.style.transform = `translateX(${-SLIDE_WIDTH}px)`;

      currentSlidePosition++;
    } else if (nextSlide) {
      nextSlide.style.transition = SLIDE_STYLE;
      nextSlide.style.transform = `translateX(${SLIDE_WIDTH}px)`;
    }
  }

  function removeTransition() {
    if (currentSlide) {
      currentSlide.style.transition = '';
    }

    if (prevSlide) {
      prevSlide.style.transition = '';
    }

    if (nextSlide) {
      nextSlide.style.transition = '';
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
    <div>isPrev:{isPrev}</div>
    <div>isNext:{isNext}</div>
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

isSideMenuSlide:{isSideMenuSlide}
{#key timestamp}
  <ul
    bind:this={SLIDER}
    on:touchstart={start}
    on:touchend={end}
    on:touchmove={move}
    on:transitionend={removeTransition}
  >
    {#each VIEWS as { id, component, props }, i}
      <li {id} class:side-menu={i === 0} bind:this={CHILDREN_BIND[id]}>
        <svelte:component this={component} {...props} />
      </li>
    {/each}
  </ul>
{/key}

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
  }

  .side-menu {
    background-color: deeppink;
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
