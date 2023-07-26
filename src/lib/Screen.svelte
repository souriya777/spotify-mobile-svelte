<script>
  import { Router, Route } from 'svelte-routing';
  import { PLAYER_FULL } from '@/js/store';
  import Player from '@/lib/Player.svelte';
  import Nav from '@/lib/Nav.svelte';
  import ScreenTop from '@/lib/ScreenTop.svelte';
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import LibView from '@/lib/views/LibView.svelte';

  export let url = '/';
</script>

<div class="phoneShell">
  <div class="button-left-1" />
  <div class="button-left-2" />
  <div class="button-left-3" />
  <div class="button-right" />

  <div class="screen" class:playerFull={$PLAYER_FULL}>
    <ScreenTop />
    <Router {url}>
      <Route path="/" component={HomeView} />
      <Route path="/search" component={SearchView} />
      <Route path="/lib" component={LibView} />

      <Player />
      <Nav />
    </Router>
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

  .phoneShell {
    position: relative;
    border: var(--border-width-shell) solid var(--color-shell);
    border-radius: var(--border-radius-shell);
  }

  .screen {
    box-sizing: content-box;
    border: var(--border-width-screen) solid indianred;
    border-radius: var(--border-radius-screen);
    height: 147.46mm;
    width: 71.45mm;
    margin-inline: auto;
    display: grid;
    grid-template-rows: var(--height-screen-top) auto 32px var(--height-screen-nav);
    /* TODO uncomment */
    /* overflow: hidden; */
    background-color: var(--color-bg-spotify);
    color: var(--color-text-white);
  }

  .playerFull {
    grid-template-rows: var(--height-screen-top) 0 auto var(--height-screen-nav);
  }

  .button-left-1,
  .button-left-2,
  .button-left-3 {
    position: absolute;
    left: var(--inline-position-button);
    width: 3px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    background: var(--color-shell);
    z-index: 1;
  }

  .button-left-1 {
    top: 92px;
    height: 18px;
  }

  .button-left-2 {
    top: 128px;
    height: 40px;
  }

  .button-left-3 {
    top: 180px;
    height: 40px;
  }

  .button-right {
    position: absolute;
    top: 156px;
    height: 58px;
    right: var(--inline-position-button);
    width: 3px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    background: var(--color-shell);
    z-index: 1;
  }
</style>
