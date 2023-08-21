<script>
  import { PLAYER_FULL_MODE } from '@/js/store';
  import Player from '@/lib/Player.svelte';
  // FIXME
  // import Nav from '@/lib/Nav.svelte';
  import ScreenTop from '@/lib/ScreenTop.svelte';
  // FIXME
  // import SettingsSvg from '@/lib/svg/SettingsSvg.svelte';
  import SpotifyAuthorization from '@/lib/SpotifyAuthorization.svelte';
  // FIXME
  // import StackUiManager from '@/lib/StackUIManager.svelte';
  import Debug from '@/lib/Debug.svelte';
</script>

<div class="phoneShell">
  <div class="button-left-1" />
  <div class="button-left-2" />
  <div class="button-left-3" />
  <div class="button-right" />

  <SpotifyAuthorization />

  <div class="screen" class:screen--full-player={$PLAYER_FULL_MODE}>
    <!-- <StackUiManager> -->
    <!-- FIXME not in StackUIManager -->
    <div class="screen__top">
      <ScreenTop />
    </div>

    <div class="screen__content">
      <!-- <div class="content__header">
        <div class="title">Good evening TODO</div>
        <button on:click={() => console.log('move to stackUIManager')}>
          <SettingsSvg />
        </button>
      </div> -->
      <Debug />
      <Player />
    </div>
    <!-- <span slot="content" /> -->

    <!-- FIXME not in StackUIManager -->
    <div class="screen__bottom">
      <!-- <Player /> -->
      <!-- <Nav /> -->
    </div>
    <!-- </StackUiManager> -->
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
    position: relative;
    border: var(--border-width-screen) solid indianred;
    border-radius: var(--border-radius-screen);
    height: 147.46mm;
    width: 71.45mm;
    margin-inline: auto;
    display: grid;
    grid-template-rows: var(--height-screen-top) auto;
    /* display: grid;
    grid-template-rows: var(--height-screen-top) auto 32px var(--height-screen-nav); */
    /* TODO uncomment */
    /* overflow: hidden; */
    background-color: var(--color-bg-spotify);
    color: var(--color-text-white);
  }

  /* .screen--full-player {
    grid-template-rows: var(--height-screen-top) 0 auto var(--height-screen-nav);
  } */

  .screen__content {
    background-color: slategray;
    position: relative;
    overflow-y: scroll;
    /* TODO uncomment */
    /* overflow-x: hidden; */
  }

  .screen__bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  /* FIXME */
  /* .content__header {
    display: flex;
    justify-content: space-between;
  } */

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
