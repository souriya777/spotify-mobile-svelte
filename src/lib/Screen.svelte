<script>
  import { PANEL_OPENED, PLAYER_FULL } from '@/js/store';
  import Player from '@/lib/Player.svelte';
  import SpotifyGrant from '@/lib/SpotifyGrant.svelte';
  import SpotifyMyAlbums from '@/lib/SpotifyMyAlbums.svelte';
  import Nav from '@/lib/Nav.svelte';
  import ScreenTop from '@/lib/ScreenTop.svelte';
  import SettingsSvg from '@/lib/svg/SettingsSvg.svelte';
  import Panel from '@/lib/Panel.svelte';
</script>

<div class="phoneShell">
  <div class="button-left-1" />
  <div class="button-left-2" />
  <div class="button-left-3" />
  <div class="button-right" />

  <div class="screen" class:playerFull={$PLAYER_FULL}>
    <ScreenTop />

    <div class="content">
      <div class="content__header">
        <div class="title">Good evening</div>
        <button on:click={() => PANEL_OPENED.set(true)}>
          <SettingsSvg />
        </button>
      </div>

      <SpotifyGrant />
      <SpotifyMyAlbums />

      <p>40 Most Beautiful Piano Classics</p>
      <div class="temp">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita
        quibusdam sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum
        reprehenderit sapiente vel quia, labore voluptatem iure.
      </div>
      <p>40 Most Beautiful Piano Classics</p>
      <div class="temp">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita
        quibusdam sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum
        reprehenderit sapiente vel quia, labore voluptatem iure.
      </div>
      <p>40 Most Beautiful Piano Classics</p>
      <div class="temp">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita
        quibusdam sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum
        reprehenderit sapiente vel quia, labore voluptatem iure.
      </div>

      <Panel />
    </div>

    <Player />
    <Nav />
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

  .content {
    background-color: bisque;
    position: relative;
    overflow-y: scroll;
    /* TODO uncomment */
    /* overflow-x: hidden; */
  }

  .content__header {
    display: flex;
    justify-content: space-between;
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

  .temp {
    color: var(--color-text-grey);
    height: 250px;
  }
</style>
