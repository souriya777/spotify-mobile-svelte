<script>
  export let id;

  /** @type {HTMLElement} */
  let VIEW;
  let initialY = 0;
  let y = 0;
  // let translateY = 0;
  $: deltaY = y - initialY;
  // $: virtualTranslateY = translateY + deltaY;

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialY = touch.pageY;
    y = initialY;

    console.log('start', initialY, y, deltaY);
  }

  function move(e) {
    const touch = [...e.changedTouches].at(0);
    y = touch.pageY;
    console.log('move', initialY, y, deltaY);

    // if (canGoPrev && canGoNext) {
    // VIEW.style.transform = `translateY(${virtualTranslateY}px)`;
    // }
  }

  function end() {
    console.log('end', initialY, y, deltaY);
  }
</script>

<div {id} class="view" bind:this={VIEW} on:touchstart={start} on:touchend={end} on:touchmove={move}>
  <slot name="header" />
  <!-- <div>
    <div>initialY:{initialY}</div>
    <div>y:{y}</div>
    <div>deltaY:{deltaY}</div>
    <div>translateY:{translateY}</div>
    <div>virtualTranslateY:{virtualTranslateY}</div>
  </div> -->
  <slot />
</div>
