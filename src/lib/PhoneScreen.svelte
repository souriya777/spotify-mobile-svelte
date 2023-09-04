<script>
  import PhoneStatus from '@/lib/PhoneStatus.svelte';
  import SpotifyAuthentication from '@/lib/SpotifyAuthentication.svelte';
  import Debug from '@/lib/Debug.svelte';
  import { appReady } from '@/js/store';
  import Player from './Player.svelte';
</script>

<div class="screen">
  <div class="screen__top">
    <PhoneStatus />
  </div>

  <div class="screen__content">
    <Debug />
    <SpotifyAuthentication />

    {#if $appReady}
      <Player />
    {/if}
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
    /* display: grid;
    grid-template-rows: var(--height-screen-top) auto 32px var(--height-screen-nav); */
    /* TODO uncomment */
    /* overflow: hidden; */
    background-color: var(--color-bg-spotify);
    color: var(--color-text-white);
  }

  .screen__content {
    background-color: slategray;
    position: relative;
    overflow-y: scroll;
    /* TODO uncomment */
    /* overflow-x: hidden; */
  }
</style>
