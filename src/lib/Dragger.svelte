<script>
  const TOTAL_SLIDES = 4;
  const TOUCH_ZONE_WIDTH = 70;

  /** @type {HTMLElement} */
  let DRAGGER;
  /** @type {HTMLElement} */
  let SLIDER;

  let touchPosition = 0;
  let initialTouchPosition = 0;
  let translateX = 0;
  $: virtualTranslateX = translateX + difference;
  $: SCREEN_WIDTH = DRAGGER ? DRAGGER.clientWidth : 0;
  $: difference = touchPosition - initialTouchPosition;
  $: offset = SCREEN_WIDTH / 3;
  $: isTouchedOnEdge =
    initialTouchPosition <= TOUCH_ZONE_WIDTH ||
    initialTouchPosition >= SCREEN_WIDTH - TOUCH_ZONE_WIDTH;
  $: canSwipe = Math.abs(difference) >= offset;
  $: canGoPrev = virtualTranslateX <= 0;
  $: canGoNext = Math.abs(virtualTranslateX - SCREEN_WIDTH) < SCREEN_WIDTH * TOTAL_SLIDES;

  function start(e) {
    [...e.changedTouches].forEach((touch) => {
      initialTouchPosition = touch.pageX;
      touchPosition = initialTouchPosition;
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.top = `${touch.pageY}px`;
      dot.style.left = `${initialTouchPosition}px`;
      dot.id = touch.identifier.toString();
      DRAGGER.append(dot);
    });
  }

  function move(e) {
    [...e.changedTouches].forEach((touch) => {
      touchPosition = touch.pageX;
      const dot = document.getElementById(touch.identifier.toString());
      dot.style.top = `${touch.pageY}px`;
      dot.style.left = `${touchPosition}px`;

      if (isTouchedOnEdge && canGoPrev && canGoNext) {
        SLIDER.style.transform = `translateX(${virtualTranslateX}px)`;
      }
    });
  }

  function end(e) {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier.toString());
      dot.remove();

      slide();
    });
  }

  function slide() {
    if (!isTouchedOnEdge) {
      return;
    }

    if (Math.abs(difference) > offset) {
      if (difference > 0 && canGoPrev) {
        translateX += SCREEN_WIDTH;
      } else if (difference < 0 && canGoNext) {
        translateX -= SCREEN_WIDTH;
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
  class="dragger"
  on:touchstart={start}
  on:touchend={end}
  on:touchmove={move}
  on:transitionend={removeTransition}
>
  <div class="indicator" class:red={canGoPrev || canGoNext} class:green={canSwipe}>
    <div>SCREEN_WIDTH:{SCREEN_WIDTH}</div>
    <div>initialTouchPosition:{initialTouchPosition}</div>
    <div>touchPosition:{touchPosition}</div>
    <div>difference:{difference}</div>
    <div>translateX:{translateX}</div>
    <div>virtualTranslateX:{virtualTranslateX}</div>
    <div>total:{SCREEN_WIDTH * TOTAL_SLIDES}</div>
    <div>isTouchedOnEdge:{isTouchedOnEdge}</div>
  </div>

  <div bind:this={SLIDER} class="slider">
    <div class="un">side-menu</div>
    <div class="deux">welcome</div>
    <div class="trois">playlist</div>
    <div class="quatre">album</div>
  </div>
</div>

<style>
  .dragger {
    position: relative;
    height: 100%;
  }

  .indicator {
    margin-block-end: 10px;
  }

  :global(.dot) {
    position: absolute;
    transform: translate(-50%, -50%);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: rgba(255, 20, 146, 0.3);
  }

  .slider {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 100%);
    height: 100%;
  }

  .un {
    background-color: rgba(0, 100, 0, 0.5);
  }

  .deux {
    background-color: rgba(0, 0, 139, 0.5);
  }

  .trois {
    background-color: rgba(139, 0, 0, 0.5);
  }

  .quatre {
    background-color: rgba(148, 0, 211, 0.5);
  }

  .red {
    background-color: red;
    color: white;
  }
  .green {
    background-color: rgb(25, 141, 25);
    color: white;
  }
</style>
