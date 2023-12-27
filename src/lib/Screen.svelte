<script>
  import { currentPath, VIEWS } from '@js/store';
  import Ui from '@lib/Ui.svelte';
  import Button from '@lib/Button.svelte';
  import UiForeground from '@lib/UiForeground.svelte';
  import { createView } from '@js/view-utils';

  /** @type {HTMLElement} */
  let SCREEN;

  function updateViews() {
    const view = createView();
    $VIEWS = [...$VIEWS, { ...view }];
  }

  function removeView() {
    $VIEWS = [...$VIEWS.slice(0, -1)];
  }
</script>

<div bind:this={SCREEN} class="screen">
  <div>
    currentPath:{$currentPath}
    <Button filled={true} callback={updateViews}>+view</Button>
    <Button filled={true} callback={removeView}>-view</Button>
  </div>
  <Ui VIEWS={$VIEWS} on:removeSlide={removeView}>
    <svelte:fragment slot="fixed">
      <UiForeground />
    </svelte:fragment>
  </Ui>
</div>

<style>
  .screen {
    height: 100dvh;
    position: fixed;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }
</style>
