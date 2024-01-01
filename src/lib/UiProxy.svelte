<script>
  import {
    appReady,
    currentPath,
    addView as addViewStore,
    removeView as removeViewStore,
  } from '@js/store';
  import { createView } from '@js/view-utils';
  import { isHomePath, isSearchPath } from '@js/path-utils';
  import Button from '@lib/Button.svelte';
  import Ui from '@lib/Ui.svelte';

  let slidePrevAndRemoveForMe;
  let addAndSlideNextForMe;
  let goPrevForMe;
  let goNextForMe;

  function addView() {
    const view = createView();
    addViewStore(view);
    addAndSlideNextForMe();
  }

  function removeView() {
    removeViewStore();
  }

  function prevView() {
    slidePrevAndRemoveForMe();
  }

  function goPrev() {
    goPrevForMe();
  }

  function goNext() {
    goNextForMe();
  }
</script>

<div class="ui-proxy">
  <!-- TO DEBUG SLIDE VIEWS -->
  <div>
    currentPath:{$currentPath}
    appReady:{$appReady}
    <Button filled={true} callback={goPrev}>go-</Button>
    <Button filled={true} callback={goNext}>go+</Button>
    <Button filled={true} callback={addView}>+view</Button>
    <Button filled={true} callback={prevView}>-view</Button>
  </div>

  {#if isHomePath($currentPath)}
    <Ui
      bind:goPrevForMe
      bind:goNextForMe
      bind:addAndSlideNextForMe
      bind:slidePrevAndRemoveForMe
      on:removeSlide={removeView}
    ></Ui>
  {:else if isSearchPath($currentPath)}
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
