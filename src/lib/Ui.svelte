<script>
  import { getTranslateXY } from '@js/browser-utils';
  import { getTimestamp } from '@js/date-utils';

  export let views = [];

  const _DEBUG = false;
  const TOUCH_AREA_WIDTH = 70;
  const SLIDE_STYLE = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';

  /** @type {HTMLElement} */
  let SLIDER;
  let CHILDREN_BIND = {};
  let timestamp = getTimestamp();
  let currentSlidePosition = 0;
  let initialX = 0;
  let x = 0;
  let prevSlideTranslateX = 0;
  let nextSlideTranslateX = 0;
  $: SLIDE_WIDTH = SLIDER ? SLIDER.clientWidth : 0;
  $: TOTAL_SLIDES = views.length;
  $: MINIMUM_SWIPE_X = SLIDE_WIDTH / 3;
  $: currentView = views[currentSlidePosition];
  $: prevView = views[currentSlidePosition - 1];
  $: nextView = views[currentSlidePosition + 1];
  $: currentSlide = currentView ? CHILDREN_BIND[currentView.id] : null;
  $: prevSlide = prevView ? CHILDREN_BIND[prevView.id] : null;
  $: nextSlide = nextView ? CHILDREN_BIND[nextView.id] : null;
  $: deltaX = x - initialX;
  $: isPrev = deltaX > 0;
  $: isNext = !isPrev;
  $: isTouchedOnEdge = initialX <= TOUCH_AREA_WIDTH || initialX + TOUCH_AREA_WIDTH >= SLIDE_WIDTH;
  $: canSwipe = Math.abs(deltaX) >= MINIMUM_SWIPE_X;
  $: canGoPrev = currentSlidePosition > 0;
  $: canGoNext = currentSlidePosition + 1 < TOTAL_SLIDES;
  $: isViewsObjectSyncWithDomRepresentationHack =
    views.length === Object.keys(CHILDREN_BIND).length;

  $: if (SLIDER && views && SLIDE_WIDTH > 0) {
    if (isViewsObjectSyncWithDomRepresentationHack) {
      initSlider();
    }
  }

  function initSlider() {
    views.forEach((view, i) => {
      let translateX;
      if (i < currentSlidePosition) {
        translateX = -SLIDE_WIDTH;
      } else if (i > currentSlidePosition) {
        translateX = SLIDE_WIDTH;
      } else {
        translateX = 0;
      }

      const SLIDE = CHILDREN_BIND[view.id];
      // @ts-ignore
      SLIDE.style.transform = `translateX(${translateX}px)`;
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
      prevSlide.style.transform = `translateX(${(prevSlideTranslateX + deltaX) / 10}px)`;
    } else if (isNext && canGoNext && nextSlide) {
      nextSlide.style.transform = `translateX(${nextSlideTranslateX + deltaX}px)`;
      currentSlide.style.transform = `translateX(${deltaX / 4}px)`;
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
    console.log('trigger resize');
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
    {#each views as { id, component }}
      <li {id} bind:this={CHILDREN_BIND[id]}>
        <svelte:component this={component} />
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

  .debug-red {
    background-color: red;
    color: white;
  }

  .debug-green {
    background-color: rgb(25, 141, 25);
    color: white;
  }
</style>
