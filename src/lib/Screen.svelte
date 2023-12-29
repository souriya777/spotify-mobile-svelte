<script>
  import { currentPath, VIEWS } from '@js/store';
  import { createView } from '@js/view-utils';
  import Button from '@lib/Button.svelte';
  import Ui from '@lib/Ui.svelte';
  import PlayerNav from '@lib/PlayerNav.svelte';

  let slidePrevAndRemoveForMe;
  let addAndSlideNextForMe;
  let goPrevForMe;
  let goNextForMe;

  function addView() {
    const view = createView();
    $VIEWS = [...$VIEWS, { ...view }];
    addAndSlideNextForMe();
  }

  function removeView() {
    $VIEWS = [...$VIEWS.slice(0, -1)];
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

<div class="screen">
  <!-- TO DEBUG SLIDE VIEWS -->
  <div>
    currentPath:{$currentPath}
    <Button filled={true} callback={goPrev}>go-</Button>
    <Button filled={true} callback={goNext}>go+</Button>
    <Button filled={true} callback={addView}>+view</Button>
    <Button filled={true} callback={prevView}>-view</Button>
  </div>
  <Ui
    bind:goPrevForMe
    bind:goNextForMe
    bind:addAndSlideNextForMe
    bind:slidePrevAndRemoveForMe
    on:removeSlide={removeView}
  >
    <svelte:fragment slot="fixed">
      <PlayerNav />
    </svelte:fragment>
  </Ui>
</div>

<style>
  .screen {
    position: fixed;
    height: 100dvh;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border: 1px dashed deeppink;
  }
</style>
