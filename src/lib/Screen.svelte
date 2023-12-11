<script>
  import Dragger from '@lib/Dragger.svelte';

  /** @type {HTMLElement} */
  let SCREEN;
</script>

<div bind:this={SCREEN} class="screen">
  <Dragger />
</div>

<style>
  .screen {
    height: 100%;
    border: 2px dashed hotpink;
  }
</style>
