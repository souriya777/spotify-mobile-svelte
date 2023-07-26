<script>
  import { PANEL_OPENED } from '@/js/store';
  import SpotifyGrant from '@/lib/SpotifyGrant.svelte';
  import SpotifyMyAlbums from '@/lib/SpotifyMyAlbums.svelte';
  import SettingsSvg from '@/lib/svg/SettingsSvg.svelte';
  import Panel from '@/lib/Panel.svelte';
</script>

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
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita quibusdam
    sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum reprehenderit
    sapiente vel quia, labore voluptatem iure.
  </div>
  <p>40 Most Beautiful Piano Classics</p>
  <div class="temp">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita quibusdam
    sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum reprehenderit
    sapiente vel quia, labore voluptatem iure.
  </div>
  <p>40 Most Beautiful Piano Classics</p>
  <div class="temp">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita quibusdam
    sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum reprehenderit
    sapiente vel quia, labore voluptatem iure.
  </div>

  <Panel />
</div>

<style>
  :root {
    --border-radius-shell: 48px;
    --border-radius-screen: 42px;
    --inline-position-button: -7px;
    --height-screen-top: 43px;
    --height-screen-nav: 52px;
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

  .temp {
    color: var(--color-text-grey);
    height: 250px;
  }
</style>
