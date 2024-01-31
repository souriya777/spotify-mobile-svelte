<script>
  import { createEventDispatcher } from 'svelte';
  import { VIEWS, uiTimestamp, resizeTimestamp } from '@js/store';
  import { canRemoveView, loadView, isHomeView, isSideMenuView } from '@js/view-utils';
  import { getTimestamp } from '@js/date-utils';
  import { getTranslateXY } from '@js/browser-utils';
  import PlayerMiniNav from '@lib/PlayerMiniNav.svelte';
  import PlayerBottomPanel from '@lib/PlayerBottomPanel.svelte';
  import OptionsBottomPanel from '@lib/OptionsBottomPanel.svelte';

  export const slidePrevAndRemoveForMe = () => (isRemovingView = true);
  export const addAndSlideNextForMe = () => (isAddingView = true);
  export const goPrevForMe = () => slidePrev(true);
  export const goNextForMe = () => slideNext(true);

  const DOM_OPERATION_TIMEOUT_MS = 100;
  const SLIDE_DURATION_MS = 450;
  const SLIDE_STYLE = `transform ${SLIDE_DURATION_MS}ms cubic-bezier(.23,.7,.33,.91)`;
  const SLIDE_SIDE_MENU_STYLE = `transform 100ms cubic-bezier(.67,.36,.3,.9)`;
  const TOUCH_AREA_WIDTH = 70;
  const PREV_VIEW_OFFSET_PERCENT = 30;
  const SIDE_MENU_SMALLER_WIDTH = 35;
  const MIN_HOME_BRIGHTNESS_PERCENT = 20;
  const MAX_HOME_BRIGHTNESS_PERCENT = 100;
  const dispatch = createEventDispatcher();

  /** @type {HTMLElement} */
  let VIEWS_HTML;
  /** @type {HTMLElement} */
  let FIXED_HTML;
  let VIEWS_BIND = {};
  let viewPosition = $VIEWS.length - 1;
  let initialX = 0;
  let x = 0;
  let prevX = 0;
  let nextX = 0;
  let isAddingView = false;
  let isRemovingView = false;
  let isSliding = false;
  let homeBrightness = MAX_HOME_BRIGHTNESS_PERCENT;
  let brightnessObserver;

  $: VIEW_WIDTH = VIEWS_HTML?.clientWidth ?? 0;
  $: CURRENT_ID = $VIEWS[viewPosition]?.id;
  $: PREV_ID = $VIEWS[viewPosition - 1]?.id;
  $: NEXT_ID = $VIEWS[viewPosition + 1]?.id;
  $: CURRENT_VIEW = VIEWS_BIND[CURRENT_ID];
  $: PREV_VIEW = VIEWS_BIND[PREV_ID];
  $: NEXT_VIEW = VIEWS_BIND[NEXT_ID];
  $: MINIMUM_SWIPE_X = VIEW_WIDTH / 3;
  $: HOME_MINUS_OFFSET = VIEW_WIDTH - SIDE_MENU_SMALLER_WIDTH;
  $: PREV_VIEW_OFFSET = `${-PREV_VIEW_OFFSET_PERCENT}%`;
  $: deltaX = x - initialX;
  $: homeBrightnessStyle = `${homeBrightness}%`;
  $: isTouchedOnLeftEdge = () => initialX <= TOUCH_AREA_WIDTH;
  $: isTouchedOnRightEdge = () => initialX + TOUCH_AREA_WIDTH >= VIEW_WIDTH;
  $: isTouchedOnEdge = () => isTouchedOnLeftEdge() || isTouchedOnRightEdge();
  $: isPrevSwipe = deltaX > 0;
  $: isNextSwipe = !isPrevSwipe;
  $: isViewsSyncWithDOM = $VIEWS.length === Object.keys(VIEWS_BIND).length;
  $: canSwipe = Math.abs(deltaX) >= MINIMUM_SWIPE_X;
  $: canGoPrev = viewPosition > 0;
  $: canGoNext = viewPosition + 1 < $VIEWS.length;

  $: if (VIEWS_BIND && isViewsSyncWithDOM) {
    translateSlide();

    if (isAddingView) {
      isAddingView = false;
      setTimeout(() => slideNext(true), DOM_OPERATION_TIMEOUT_MS);
    } else if (isRemovingView) {
      isRemovingView = false;
      slidePrev(true);
    }
  }

  function observeViewBrightness(node, viewPosition) {
    if (!isSideMenuView(viewPosition)) {
      return;
    }

    brightnessObserver = new IntersectionObserver(
      (entries) => {
        const { width, left } = entries[0].boundingClientRect;
        const widthRatio = Math.floor((Math.abs(left) / width) * 100);

        homeBrightness =
          widthRatio >= 92
            ? MAX_HOME_BRIGHTNESS_PERCENT
            : widthRatio <= MIN_HOME_BRIGHTNESS_PERCENT
              ? MIN_HOME_BRIGHTNESS_PERCENT
              : widthRatio;
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i * 0.01) },
    );

    brightnessObserver.observe(node);

    return {
      destroy: () => brightnessObserver.disconnect(),
    };
  }

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialX = touch.pageX;
    x = touch.pageX;
    prevX = getTranslateXY(PREV_VIEW).translateX;
    nextX = getTranslateXY(NEXT_VIEW).translateX;
  }

  function move(e) {
    if (!isTouchedOnEdge()) {
      return;
    }

    const touch = [...e.changedTouches].at(0);
    x = touch.pageX;
    isSliding = true;

    if (isPrevSwipe && canGoPrev) {
      movePrev();
    } else if (isNextSwipe && canGoNext) {
      moveNext();
    }
  }

  function movePrev() {
    let translateX;
    if (isHomeView(viewPosition)) {
      deltaX = limitPrev(deltaX, HOME_MINUS_OFFSET);
      translateX = limitPrev(prevX + deltaX);
      translate(FIXED_HTML, deltaX);
    } else {
      const percent = limitPrev(calculatePrevPercent());
      translateX = `${percent}%`;
    }

    translate(PREV_VIEW, translateX);
    translate(CURRENT_VIEW, deltaX);
  }

  function moveNext() {
    let translateX;
    let translateNextX = limitNext(nextX + deltaX);
    if (isSideMenuView(viewPosition)) {
      translateX = deltaX;
      translate(FIXED_HTML, translateNextX);
    } else {
      translateX = deltaX / 4;
    }
    translate(CURRENT_VIEW, translateX);
    translate(NEXT_VIEW, translateNextX);
  }

  function end() {
    if (isSideMenuView(viewPosition) && isTouchedOnRightEdge() && !isSliding) {
      slideNext(true);
      return;
    }

    isSliding = false;

    if (!isTouchedOnEdge()) {
      return;
    }

    isPrevSwipe ? slidePrev() : slideNext();
  }

  function slidePrev(forceSwipe = false) {
    if (!canGoPrev) {
      return;
    }

    CURRENT_VIEW.style.transition = SLIDE_STYLE;
    PREV_VIEW.style.transition = SLIDE_STYLE;
    FIXED_HTML.style.transition = SLIDE_STYLE;

    if (canSwipe || forceSwipe) {
      let translateX = VIEW_WIDTH;

      if (isHomeView(viewPosition)) {
        CURRENT_VIEW.style.transition = SLIDE_SIDE_MENU_STYLE;
        PREV_VIEW.style.transition = SLIDE_SIDE_MENU_STYLE;
        FIXED_HTML.style.transition = SLIDE_SIDE_MENU_STYLE;
        translateX = HOME_MINUS_OFFSET;
        translate(FIXED_HTML, translateX);
      }

      translate(CURRENT_VIEW, translateX);
      translate(PREV_VIEW, 0);
      removeSlide(viewPosition);
      viewPosition--;
    } else {
      let translateX;
      if (isHomeView(viewPosition)) {
        translateX = -HOME_MINUS_OFFSET;
        translate(FIXED_HTML, 0);
      } else {
        translateX = PREV_VIEW_OFFSET;
      }

      translate(PREV_VIEW, translateX);
      translate(CURRENT_VIEW, 0);
    }
  }

  function slideNext(forceSwipe = false) {
    if (!canGoNext) {
      return;
    }

    CURRENT_VIEW.style.transition = SLIDE_STYLE;
    NEXT_VIEW.style.transition = SLIDE_STYLE;
    FIXED_HTML.style.transition = SLIDE_STYLE;

    if (canSwipe || forceSwipe) {
      let translateX;
      if (isSideMenuView(viewPosition)) {
        CURRENT_VIEW.style.transition = SLIDE_SIDE_MENU_STYLE;
        NEXT_VIEW.style.transition = SLIDE_SIDE_MENU_STYLE;
        FIXED_HTML.style.transition = SLIDE_SIDE_MENU_STYLE;
        translateX = -HOME_MINUS_OFFSET;
        translate(FIXED_HTML, 0);
      } else {
        translateX = PREV_VIEW_OFFSET;
      }

      translate(CURRENT_VIEW, translateX);
      translate(NEXT_VIEW, 0);
      viewPosition++;
    } else if (NEXT_VIEW) {
      let translateX;
      if (isSideMenuView(viewPosition)) {
        translateX = HOME_MINUS_OFFSET;
        translate(FIXED_HTML, translateX);
      } else {
        translateX = VIEW_WIDTH;
      }

      translate(CURRENT_VIEW, 0);
      translate(NEXT_VIEW, translateX);
    }
  }

  /**
   * @param HTML_ELEMENT {HTMLElement}
   * @param width {number | string}
   */
  function translate(HTML_ELEMENT, width) {
    const translateX = typeof width === 'number' ? `${width}px` : width;
    HTML_ELEMENT.style.transform = `translate3d(${translateX}, 0, 0)`;
  }

  function translateSlide() {
    $VIEWS.forEach(({ id }, i) => {
      const SLIDE = VIEWS_BIND[id];
      if (!SLIDE) {
        return;
      }

      let translateX;

      if (isSideMenuView(i)) {
        translateX = -HOME_MINUS_OFFSET;
      } else if (i < viewPosition) {
        translateX = PREV_VIEW_OFFSET;
      } else if (i > viewPosition) {
        translateX = VIEW_WIDTH;
      } else {
        translateX = 0;
      }

      translate(SLIDE, translateX);
    });
  }

  function limitPrev(x, maxX = 0) {
    return x >= maxX ? maxX : x;
  }

  function limitNext(x, minX = 0) {
    return x <= minX ? minX : x;
  }

  function calculatePrevPercent() {
    return -PREV_VIEW_OFFSET_PERCENT - (deltaX * -PREV_VIEW_OFFSET_PERCENT) / VIEW_WIDTH;
  }

  function removeTransition() {
    if (CURRENT_VIEW) {
      CURRENT_VIEW.style.transition = '';
    }

    if (PREV_VIEW) {
      PREV_VIEW.style.transition = '';
    }

    if (NEXT_VIEW) {
      NEXT_VIEW.style.transition = '';
    }

    if (FIXED_HTML) {
      FIXED_HTML.style.transition = '';
    }
  }

  function removeSlide(viewPosition) {
    if (!canRemoveView(viewPosition)) {
      return;
    }

    setTimeout(() => {
      dispatch('removeSlide');
      setTimeout(() => cleanDomBinding(), DOM_OPERATION_TIMEOUT_MS);
    }, SLIDE_DURATION_MS);
  }

  function cleanDomBinding() {
    if (!VIEWS_BIND) {
      return;
    }

    Object.entries(VIEWS_BIND).forEach(([key, value]) => {
      if (!value) {
        delete VIEWS_BIND[key];
      }
    });

    $uiTimestamp = getTimestamp();
  }
</script>

<!-- TO DEBUG -->
<code>
  isViewsSyncWithDOM:{isViewsSyncWithDOM}-{$VIEWS.length}-{Object.keys(VIEWS_BIND).length}
  viewPosition:{viewPosition}
  bind:{Object.keys(VIEWS_BIND)}
</code>

<div
  class="ui"
  style={`--side-menu-smaller-width: ${SIDE_MENU_SMALLER_WIDTH}px; --home-brightness: ${homeBrightnessStyle}`}
>
  {#key $resizeTimestamp}
    <ul
      bind:this={VIEWS_HTML}
      on:touchstart={start}
      on:touchend={end}
      on:touchmove={move}
      on:transitionend={removeTransition}
    >
      {#key $uiTimestamp}
        {#each $VIEWS as { id, viewName, props }, i (id)}
          <li class:isSliding bind:this={VIEWS_BIND[id]} use:observeViewBrightness={i}>
            <svelte:component this={loadView(viewName)} {...props} />
          </li>
        {/each}
      {/key}
    </ul>
  {/key}

  <div class="fixed" bind:this={FIXED_HTML}>
    <PlayerMiniNav />
  </div>

  <div class="fixed">
    <PlayerBottomPanel />
  </div>

  <div class="fixed">
    <OptionsBottomPanel />
  </div>
</div>

<style>
  .ui {
    height: 100%;
  }

  ul {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
  }

  li {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--color-primary);
  }

  ul > :first-child {
    width: calc(100% - var(--side-menu-smaller-width));
    background-color: var(--color-primary-highlight);
  }

  ul > :nth-child(2),
  .fixed {
    filter: brightness(var(--home-brightness));
  }

  .fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: var(--z-index-near);
  }

  .isSliding {
    overflow: hidden;
  }
</style>
