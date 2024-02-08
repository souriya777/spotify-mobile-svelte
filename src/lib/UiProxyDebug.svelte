<script>
  import {
    viewName,
    appReady,
    addView as addViewStore,
    slidePrevAndRemoveForMe,
    addAndSlideNextForMe,
  } from '@js/store';
  import { createDumbView } from '@js/view-utils';
  import Button from '@lib/Button.svelte';

  export let goPrevForMe;
  export let goNextForMe;

  function addView() {
    const view = createDumbView();
    addViewStore(view);
    $addAndSlideNextForMe();
  }

  function prevView() {
    $slidePrevAndRemoveForMe();
  }

  function goPrev() {
    goPrevForMe();
  }

  function goNext() {
    goNextForMe();
  }
</script>

<div>
  viewName:{$viewName}
  appReady:{$appReady}
  <Button filled={true} callback={goPrev}>go-</Button>
  <Button filled={true} callback={goNext}>go+</Button>
  <Button filled={true} callback={addView}>+view</Button>
  <Button filled={true} callback={prevView}>-view</Button>
</div>
