<script>
  import {
    viewName,
    // TO DEBUG
    // appReady,
    // addView as addViewStore,
    removeView as removeViewStore,
    addAndSlideNextForMe as addAndSlideNextForMeStore,
  } from '@js/store';
  import Ui from '@lib/Ui.svelte';
  // TO DEBUG
  // import { createView } from '@js/view-utils';
  // import Button from '@lib/Button.svelte';

  let slidePrevAndRemoveForMe;
  let addAndSlideNextForMe;
  let goPrevForMe;
  let goNextForMe;

  $: if (addAndSlideNextForMe) {
    console.log('🔴🔴🔴🔴🔴addAndSlideNextForMe', addAndSlideNextForMe);
    $addAndSlideNextForMeStore = addAndSlideNextForMe;
  }

  function removeView() {
    removeViewStore();
  }

  // TO DEBUG

  // function addView() {
  //   const view = createView();
  //   addViewStore(view);
  //   addAndSlideNextForMe();
  // }

  // function prevView() {
  //   slidePrevAndRemoveForMe();
  // }

  // function goPrev() {
  //   goPrevForMe();
  // }

  // function goNext() {
  //   goNextForMe();
  // }
</script>

<div class="ui-proxy">
  <!-- TO DEBUG SLIDE VIEWS -->
  <!-- <div>
    viewName:{$viewName}
    appReady:{$appReady}
    <Button filled={true} callback={goPrev}>go-</Button>
    <Button filled={true} callback={goNext}>go+</Button>
    <Button filled={true} callback={addView}>+view</Button>
    <Button filled={true} callback={prevView}>-view</Button>
  </div> -->

  {#if 'home' === $viewName}
    <Ui
      bind:goPrevForMe
      bind:goNextForMe
      bind:addAndSlideNextForMe
      bind:slidePrevAndRemoveForMe
      on:removeSlide={removeView}
    ></Ui>
  {:else if 'search' === $viewName}
    <Ui
      bind:goPrevForMe
      bind:goNextForMe
      bind:addAndSlideNextForMe
      bind:slidePrevAndRemoveForMe
      on:removeSlide={removeView}
    ></Ui>
  {:else}
    <Ui
      bind:goPrevForMe
      bind:goNextForMe
      bind:addAndSlideNextForMe
      bind:slidePrevAndRemoveForMe
      on:removeSlide={removeView}
    ></Ui>
  {/if}
</div>

<style>
  .ui-proxy {
    height: 100%;
  }
</style>
