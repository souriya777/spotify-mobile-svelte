<script>
  import { optionsFull } from '@js/store';
  import ImgCover from '@lib/ImgCover.svelte';
  import { onTap } from '@js/event-utils';

  function close() {
    $optionsFull = false;
  }
</script>

<div class="options-panel">
  <div class="content">
    <ImgCover />
    <ul>
      <li>add to queue</li>
      <li>go to radio</li>
      <li>3rd actions</li>
    </ul>
  </div>
  <div class:close--visible={$optionsFull} use:onTap={close}>Close</div>
</div>

<style>
  .options-panel {
    display: grid;
    grid-template-rows: 1fr var(--height-nav);
    height: 100%;
    background-color: var(--background-color-options-blur);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close--visible {
    display: flex;
    justify-content: center;
    padding-block-start: 1.4rem;
    width: 100%;
  }
</style>
