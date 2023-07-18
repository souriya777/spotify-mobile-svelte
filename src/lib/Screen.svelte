<script>
  import { onMount } from 'svelte';
  import { hourMinute } from '@/js/souriya-utils';
  import IosAirplaneSvg from '@/lib/svg/IosAirplaneSvg.svelte';
  import IosSignalSvg from '@/lib/svg/IosSignalSvg.svelte';
  import IosBatterySvg from '@/lib/svg/IosBatterySvg.svelte';
  import SpotifyAuthorize from '@/lib/SpotifyAuthorize.svelte';
  import SpotifyToken from '@/lib/SpotifyToken.svelte';
  import SpotifyMyAlbums from '@/lib/SpotifyMyAlbums.svelte';

  let now = Date.now();
  $: time = hourMinute(now);
  let online = navigator.onLine;
  let level = 100;

  function updateBatteryUI(battery) {
    level = battery.level * 100;
  }

  function monitorBattery(battery) {
    // Update the initial UI.
    updateBatteryUI(battery);

    // Monitor for futher updates.
    battery.addEventListener('levelchange', updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingchange', updateBatteryUI.bind(null, battery));
    battery.addEventListener('dischargingtimechange', updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingtimechange', updateBatteryUI.bind(null, battery));
  }

  if ('getBattery' in navigator) {
    navigator.getBattery().then(monitorBattery);
  } else {
    console.log('not supported');
  }

  onMount(() => {
    window.addEventListener('offline', () => {
      console.log('offline');
      online = false;
    });
    window.addEventListener('online', () => {
      console.log('online');
      online = true;
    });

    const interval = setInterval(
      () => {
        now = Date.now();
      },

      6000
    );

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="shell">
  <div class="screen">
    <div class="top">
      <div class="hour">{time}</div>
      <div class="island" />
      <div class="infos">
        {#if online}
          <IosSignalSvg />
        {:else}
          <IosAirplaneSvg />
        {/if}
        <IosBatterySvg {level} />
      </div>
    </div>
    <div class="button-left-1" />
    <div class="button-left-2" />
    <div class="button-left-3" />
    <div class="button-right" />

    <a href="/"><img src="/spotify-logo.svg" class="logo" alt="spotify logo" /></a>

    <SpotifyAuthorize />
    <SpotifyToken />
    <SpotifyMyAlbums />

    <p>40 Most Beautiful Piano Classics</p>
    <div class="temp">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium expedita
      quibusdam sed similique dignissimos, fuga modi beatae quia reiciendis vel id ! Dolorum
      reprehenderit sapiente vel quia, labore voluptatem iure.
    </div>
    <slot />
  </div>
</div>

<style>
  :root {
    --border-radius-shell: 46px;
    --border-radius-screen: 42px;
    --color-shell: #5e5566; /* deep purple */
  }

  .shell {
    border: 4px solid var(--color-shell);
    border-radius: var(--border-radius-shell);
  }

  .screen {
    box-sizing: content-box;
    position: relative;
    border: 8px solid black;
    border-radius: var(--border-radius-screen);
    background-color: var(--color-bg-spotify);
    color: var(--color-text-white);
    height: 147.46mm;
    width: 71.45mm;
    margin-inline: auto;
  }

  p {
    font-weight: 700;
  }

  .top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    width: 232px;
    margin-inline: auto;
    padding-block-start: 6px;
    padding-block-end: 12px;
    border-radius: var(--border-radius-iphone);
    font-size: var(--font-size-iphone-top);
    font-weight: var(--FIXME-font-weight-bold);
  }

  .infos {
    display: flex;
    align-items: center;
    justify-self: end;
    padding-inline-end: 2px;
  }

  .infos > :global(:first-child) {
    margin-inline-end: 6px;
  }

  .hour {
    justify-self: end;
    padding-inline-end: 29px;
  }

  .island {
    height: 25px;
    width: 86px;
    border-radius: 9999px;
    background-color: black;
  }

  .button-left-1,
  .button-left-2,
  .button-left-3 {
    position: absolute;
    left: -15px;
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
    right: -15px;
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

  .logo {
    height: 3em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em var(--color-spotify));
  }
</style>
