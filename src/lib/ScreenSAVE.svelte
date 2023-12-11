<script>
  import Nav from '@lib/Nav.svelte';
</script>

<div class="screen">
  <div class="screen__nav">
    <Nav />
  </div>
</div>

<style>
  :root {
    --height: 500px;
    --width: 300px;
  }

  .screen {
    position: relative;
    box-sizing: content-box;
    display: grid;
    height: var(--height-iphone-12-mini);
    width: var(--width-iphone-12-mini);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
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
</style>
