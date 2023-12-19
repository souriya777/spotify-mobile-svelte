<script>
  import Router from '@lib/Router.svelte';
  import { scrollTop } from '@js/store';

  function handleScroll(e) {
    scrollTop.update(() => e.target.scrollTop);
  }
</script>

<div class="phone-screen" on:scroll={handleScroll}>
  <div class="content">
    <Router />
  </div>
</div>

<style>
  :root {
    --border-radius-shell: 48px;
    --border-radius-screen: 42px;
    --inline-position-button: -7px;
    --height-screen-nav: 52px;
  }

  .phone-screen {
    box-sizing: content-box;
    position: relative;
    border: var(--border-width-screen) solid indianred;
    border-radius: var(--border-radius-screen);
    height: 147.46mm;
    width: 71.45mm;
    margin-inline: auto;
    overflow-y: scroll;
    background-color: var(--color-bg-spotify);
    color: var(--color-text-white);
  }
</style>
