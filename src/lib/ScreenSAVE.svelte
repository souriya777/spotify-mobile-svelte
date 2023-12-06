<script>
  import { isBrowserSupportTouchEvents } from '@js/browser-utils';

  // import Header from '@lib/Header.svelte';
  // import Nav from '@lib/Nav.svelte';
  // import Button from '@lib/Button.svelte';

  const CAN_TOUCH = isBrowserSupportTouchEvents();

  /** @type {HTMLElement} */
  let TESTA;
  /** @type {HTMLElement} */
  let TESTA_SLIDER;
  /** @type {HTMLElement} */
  let SCREEN;
  /** @type {HTMLElement} */
  let SLIDER;
  let SLIDER_TOTAL_WIDTH = 0;
  $: SLIDE_WIDTH = SLIDER ? SLIDER.clientWidth : 0;
  // $: SLIDE_OFFSET = SLIDE_WIDTH ? SLIDE_WIDTH / 2 : 0;
  $: SLIDE_OFFSET = 10;
  $: if (SLIDER && SLIDER_TOTAL_WIDTH === 0) {
    for (const child of SLIDER.children) {
      SLIDER_TOTAL_WIDTH += child.clientWidth;
    }
  }
  let startX = 0;
  let sliderX = 0;
  let isDragging = false;
  let isSwiping = false;

  function getClientX(e) {
    // return CAN_TOUCH ? e.touches[0].clientX : e.clientX;
    console.log('getClientX', 'CAN_TOUCH', CAN_TOUCH);
    return CAN_TOUCH ? e.changedTouches[0].screenX : e.clientX;
  }

  function swipeStart(e) {
    console.log('🔵');

    // FIXME
    move = 'swipeStart 🔵';
    if (CAN_TOUCH) {
      isSwiping = true;
    } else {
      isDragging = true;
    }

    // FIXME
    move = 'swipeStart 🔵🔵' + isDragging + isSwiping;
    startX = getClientX(e);

    console.log('swipeStart', 'isSwiping', isSwiping, 'isDragging', isDragging, 'startX', startX);
    // FIXME
    move = 'swipeStart 🔵🔵🔵' + startX;
  }

  // function dragStart(e) {
  //   isDragging = true;
  //   startPosition = getClientX(e);
  // }

  // function touchStart(e) {
  //   isSwiping = true;
  //   startX = getClientX(e);
  // }

  // function endDrag() {
  //   isDragging = false;
  //   checkSlidePosition();
  // }

  // function touchEnd() {
  //   isSwiping = false;
  // }

  function swipeEnd() {
    console.log('🟢');
    console.log('swipeEnd');
    if (isDragging || isSwiping) {
      console.log('swipeEnd.checkSlidePosition()');
      checkSlidePosition();
      // FIXME
      move = 'swipeEnd - 🟢';
    }
    isSwiping = false;
    isDragging = false;
  }

  // function drag(e) {
  function swipe(e) {
    console.log('🟡');
    console.log('swipe');
    if (!isDragging && !isSwiping) {
      return;
    }

    const currentPosition = getClientX(e);
    difference = currentPosition - startX;

    console.log('swipe', 'currentPosition', currentPosition, 'difference', difference);

    // SLIDER.style.transform = `translateX(${sliderX + difference}px)`;

    // FIXME
    move = 'swipe 🟡🟡🟡🟡';
  }

  // function touchMove(e) {
  //   if (!isSwiping) return;

  //   const currentX = e.touches[0].clientX;
  //   const deltaX = currentX - startX;
  //   console.log(deltaX);

  //   // swipeContainer.scrollLeft += deltaX;
  //   // swipeContainer.scrollTop += deltaY;

  //   startX = currentX;
  // }

  function checkSlidePosition() {
    console.log('🕯️');
    console.log('checkSlidePosition', isDragging, isSwiping);

    // PREV
    if (difference >= SLIDE_OFFSET && sliderX < 0) {
      sliderX += SLIDE_WIDTH;
      direction = 'prev';
    }
    // NEXT
    else if (
      difference <= -SLIDE_OFFSET &&
      Math.abs(sliderX - SLIDE_WIDTH) < SLIDER_TOTAL_WIDTH - SLIDE_WIDTH
    ) {
      sliderX -= SLIDE_WIDTH;
      direction = 'next';
    }
    // SAME
    else {
      sliderX = 0;
      direction = 'back';
    }

    console.log('checkSlidePosition', 'direction', direction, 'sliderX', sliderX);

    // FIXME
    move = 'TRANSLATE 🟡checkSlidePosition';

    SLIDER.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';
    SLIDER.style.transform = `translateX(${sliderX}px)`;

    // Reset the transition property after the transition ends
    setTimeout(() => {
      SLIDER.style.transition = '';
    }, 500);
  }

  const BORDER_SCREEN = 1;

  /**
   * @param e {TouchEvent & { target: HTMLElement }}
   * @param touch {Touch}
   */
  function calculateTouchTopLeft(e, touch) {
    const { left, top } = e.target.getBoundingClientRect();
    // return {
    //   top: touch.pageY - top - BORDER_SCREEN,
    //   left: touch.pageX - left - BORDER_SCREEN,
    // };
    return {
      top: touch.pageY - top - BORDER_SCREEN,
      left: touch.pageX - left - BORDER_SCREEN,
    };
  }
  /**
   * @param e {TouchEvent & { target: HTMLElement }}
   * @param touch
   * @returns {{ dot: HTMLElement, top: number, left: number }}
   */
  function createDot(e, touch) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.id = touch.identifier.toString();
    const { top, left } = updateDotPosition(dot, e, touch);

    return {
      dot,
      top,
      left,
    };
  }

  /**
   * @param dot {HTMLElement}
   * @param e {TouchEvent & { target: HTMLElement }}
   * @param touch
   * @returns { {top: number, left: number} }
   */
  function updateDotPosition(dot, e, touch) {
    const { top, left } = calculateTouchTopLeft(e, touch);
    dot.style.top = `${top}px`;
    dot.style.left = `${left}px`;

    return {
      top,
      left,
    };
  }

  let move = '<none>';
  let touchPosition = 0;
  let initialTouchPosition = 0;
  let translateX = 0;
  $: touchIndicator = `${move} ${touchPosition}px`;
  $: TESTA_WIDTH = TESTA ? TESTA.clientWidth : 0;
  $: difference = touchPosition - initialTouchPosition;
  $: canSwipe = Math.abs(difference) >= TESTA_WIDTH / 2;
  $: isLeftEdgeReached = touchPosition <= 0;
  $: isRightEdgeReached = touchPosition >= TESTA_WIDTH;

  /** @param e {TouchEvent & { target: HTMLElement }} */
  function testaStart(e) {
    const touch = [...e.changedTouches].at(0);
    const { dot, left } = createDot(e, touch);
    touchPosition = left;
    initialTouchPosition = touchPosition;
    move = 'start';
    // TESTA.append(dot);
    SCREEN.append(dot);
  }
  /** @param e {TouchEvent & { target: HTMLElement }} */
  function testaMove(e) {
    const touch = [...e.changedTouches].at(0);
    const dot = document.getElementById(touch.identifier.toString());
    const { left } = updateDotPosition(dot, e, touch);
    touchPosition = left;

    translateX = difference;
    console.log(translateX);
    // console.log(`translateX(${Math.trunc(difference)}px)`);
    TESTA.style.transform = `translateX(${translateX}px)`;
    // TESTA_SLIDER.style.transform = `translateX(${translateX}px)`;
    move = 'move';
  }
  /** @param e {TouchEvent} */
  function testaEnd(e) {
    move = 'end';
    const touch = [...e.changedTouches].at(0);
    const dot = document.getElementById(touch.identifier.toString());
    dot.remove();

    testaSlide();
  }

  function testaSlide() {
    if (!canSwipe) {
      return;
    }

    if (difference > 0) {
      translateX += TESTA_WIDTH;
    } else if (difference < 0) {
      translateX -= TESTA_WIDTH;
    } else {
      translateX = 0;
    }

    TESTA.style.transform = `translateX(${translateX}px)`;
    // TESTA_SLIDER.style.transform = `translateX(${translateX}px)`;
  }
</script>

<div
  class="screen"
  bind:this={SCREEN}
  on:touchstart={testaStart}
  on:touchend={testaEnd}
  on:touchmove={testaMove}
>
  <div class="indicator" class:red={isLeftEdgeReached || isRightEdgeReached} class:green={canSwipe}>
    <div>{touchIndicator}</div>
    <div>initialTouchPosition:{initialTouchPosition}</div>
    <div>difference:{difference}</div>
    <div>translateX:{translateX}</div>
  </div>
  <!-- <div
    class="testa"
    bind:this={TESTA}
    on:touchstart={testaStart}
    on:touchend={testaEnd}
    on:touchmove={testaMove}
  > -->
  <div class="testa" bind:this={TESTA}>
    <!-- <div bind:this={TESTA_SLIDER} class="testa__slider"> -->
    <div class="un">{TESTA_WIDTH}px</div>
    <div class="deux">{TESTA_WIDTH}px</div>
    <div class="trois">{TESTA_WIDTH}px</div>
    <div class="quatre">{TESTA_WIDTH}px</div>
    <!-- </div> -->
  </div>

  <!-- <code>
    <div>🔴CAN_TOUCH:{CAN_TOUCH}</div>
    <div>SLIDER_TOTAL_WIDTH:{SLIDER_TOTAL_WIDTH}px</div>
    <div>SLIDE_WIDTH:{SLIDE_WIDTH}px</div>
    <div>SLIDE_OFFSET:{SLIDE_OFFSET}px</div>
    <div class:dragging={isSwiping}>isSwiping:{isSwiping}</div>
    <div class:dragging={isDragging}>isDragging:{isDragging}</div>
    <div>direction:{direction}</div>
    <div>move:{move}</div>
    <div>startX:{startX}px</div>
    <div class:red={Math.abs(difference) >= SLIDE_OFFSET}>difference:{difference}px</div>
    <div>🟢sliderX:{sliderX}px</div>
    <div>🟢startX:{startX}px</div>
  </code>
  <div class="screen__slider">
    <div
      class="slider"
      role="button"
      tabindex="0"
      bind:this={SLIDER}
      on:touchstart={swipeStart}
      on:touchend={swipeEnd}
      on:touchmove={swipe}
      on:mousedown={swipeStart}
      on:mouseup={swipeEnd}
      on:mouseleave={swipeEnd}
      on:mousemove={swipe}
    >
      <div class="un"></div>
      <div class="deux"></div>
      <div class="trois"></div>
      <div class="quatre"></div>
    </div>
  </div> -->
  <!-- <div class="screen__side-menu">
    SIDE MENU Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae in soluta
    necessitatibus quisquam vel provident sit modi officia, enim sint, reiciendis ab quo. Dolorem
    mollitia, culpa debitis quaerat neque repellat.
  </div>

  <div class="screen_content">
    <Header />

    normal
    <div class="text-accent">accent</div>
    <div class="accent-area">accent-area</div>
    <div class="highlight-area">highlight-area</div>

    <Button type="primary" svg="favorite" callback={() => console.log('TODO')}>primary</Button>
    <Button type="secondary" svg="favorite" callback={() => console.log('TODO 2')}>secondary</Button
    >
    <Button type="secondary" svg="favorite" callback={() => console.log('TODO 3')} />
    <Button type="primary" hasAccent={false} callback={() => console.log('TODO 4')}
      >no-accent</Button
    >
    <Button filled={true} callback={() => console.log('TODO 5')}>filled</Button>

    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ducimus vel dolores incidunt
    est beatae possimus aut totam error soluta voluptatem, eius corporis similique quae ex
    distinctio voluptates. Quasi, consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing
    elit. Libero ducimus vel dolores incidunt est beatae possimus aut totam error soluta voluptatem,
    eius corporis similique quae ex distinctio voluptates. Quasi, consequuntur. Lorem ipsum dolor
    sit, amet consectetur adipisicing elit. Libero ducimus vel dolores incidunt est beatae possimus
    aut totam error soluta voluptatem, eius corporis similique quae ex distinctio voluptates. Quasi,
    consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ducimus vel
    dolores incidunt est beatae possimus aut totam error soluta voluptatem, eius corporis similique
    quae ex distinctio voluptates. Quasi, consequuntur. Lorem ipsum dolor sit, amet consectetur
    adipisicing elit. Libero ducimus vel dolores incidunt est beatae possimus aut totam error soluta
    voluptatem, eius corporis similique quae ex distinctio voluptates. Quasi, consequuntur. Lorem
    ipsum dolor sit, amet consectetur adipisicing elit. Libero ducimus vel dolores incidunt est
    beatae possimus aut totam error soluta voluptatem, eius corporis similique quae ex distinctio
    voluptates. Quasi, consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Libero ducimus vel dolores incidunt est beatae possimus aut totam error soluta voluptatem, eius
    corporis similique quae ex distinctio voluptates. Quasi, consequuntur.
  </div>

  <div class="screen__nav">
    <Nav />
  </div> -->
</div>

<style>
  :root {
    --height: 500px;
    --width: 300px;
  }

  .testa {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, var(--width));
    height: var(--height);
    width: var(--width);
    /* border: 1px dashed black; */
  }

  .screen {
    border: 1px dashed black;
  }

  .testa__slider {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, var(--width));
    height: 100%;
    /* height: var(--height);
    width: var(--width);
    border: 1px dashed black; */
  }

  :global(.dot) {
    position: absolute;
    transform: translate(-50%, -50%);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: rgba(255, 20, 146, 0.3);
  }

  code {
    width: 100%;
    text-align: center;
    display: inline-block;
    font-size: 30px;
  }

  .screen__slider {
    height: var(--height);
    width: var(--width);
    border: 4px dashed black;
    overflow-x: hidden;
  }

  .slider {
    display: grid;
    grid-template-columns: repeat(4, var(--width));
    height: 100%;
    cursor: grab;
  }

  .slider:active {
    cursor: grabbing;
  }

  .un,
  .deux,
  .trois,
  .quatre {
    display: grid;
    place-content: center;
    font-size: 80px;
    color: white;
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

  .dragging {
    background-color: crimson;
    color: white;
  }
  /* .screen {
    position: relative;
    box-sizing: content-box;
    display: grid;
    height: var(--height-iphone-12-mini);
    width: var(--width-iphone-12-mini);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    overflow-y: scroll;
  }

  .screen_content {
    background-color: hotpink;
    color: white;
    height: 100%;
    overflow-y: scroll;
  }

  .screen__nav {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .screen__side-menu {
    position: absolute;
    height: 100%;
    width: var(--width-side-menu);
    background-color: var(--color-primary-highlight);
    z-index: var(--z-index-nearest);
  }

  .text-accent {
    color: var(--color-accent);
  }

  .accent-area {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    padding: 1rem;
  }

  .highlight-area {
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
    padding: 1rem;
  } */
</style>
