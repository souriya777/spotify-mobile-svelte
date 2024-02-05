<script>
  import {
    viewName,
    removeView as removeViewStore,
    addAndSlideNextForMe as addAndSlideNextForMeStore,
    slidePrevAndRemoveForMe as slidePrevAndRemoveForMeStore,
  } from '@js/store';
  import Ui from '@lib/Ui.svelte';
  // import UiProxyDebug from '@lib/UiProxyDebug.svelte';

  let slidePrevAndRemoveForMe;
  let addAndSlideNextForMe;
  let goPrevForMe;
  let goNextForMe;

  $: if (addAndSlideNextForMe) {
    $addAndSlideNextForMeStore = addAndSlideNextForMe;
  }

  $: if (slidePrevAndRemoveForMe) {
    $slidePrevAndRemoveForMeStore = slidePrevAndRemoveForMe;
  }

  function removeView() {
    removeViewStore();
  }
</script>

<div class="ui-proxy">
  <!-- <UiProxyDebug {goPrevForMe} {goNextForMe} /> -->

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
