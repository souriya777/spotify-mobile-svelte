<script>
  import PhoneStatus from '@/lib/PhoneStatus.svelte';
  import SpotifyAuthentication from '@/lib/SpotifyAuthentication.svelte';
  import Router from '@/lib/Router.svelte';
</script>

<div class="screen">
  <div class="screen__top">
    <PhoneStatus />
  </div>

  <div class="screen__view">
    <SpotifyAuthentication />
    <Router />
  </div>
</div>

<style>
  :root {
    --border-radius-shell: 48px;
    --border-radius-screen: 42px;
    --inline-position-button: -7px;
    --height-screen-top: 43px;
    --height-screen-nav: 52px;
  }

  .screen {
    box-sizing: content-box;
    position: relative;
    border: var(--border-width-screen) solid indianred;
    border-radius: var(--border-radius-screen);
    height: 147.46mm;
    width: 71.45mm;
    margin-inline: auto;
    display: grid;
    grid-template-rows: var(--height-screen-top) auto;
    overflow-y: scroll;
    background-color: var(--color-bg-spotify);
    color: var(--color-text-white);
  }

  .screen__top {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-index-phone-status);
  }

  .screen__view {
    position: relative;
    margin-block-start: var(--FIXME-margin-block-start-content);
    border: 1px dashed hotpink;
  }
</style>
