<script>
  import { onMount } from 'svelte';
  import { hourMinute } from '@/js/souriya-utils';
  import IosAirplaneSvg from '@/lib/svg/IosAirplaneSvg.svelte';
  import IosSignalSvg from '@/lib/svg/IosSignalSvg.svelte';
  import IosBatterySvg from '@/lib/svg/IosBatterySvg.svelte';

  let now = Date.now();
  let batteryLevel = 100;
  let online;
  $: time = hourMinute(now);

  function updateBatteryUI(battery) {
    batteryLevel = battery.level * 100;
  }

  function monitorBattery(battery) {
    updateBatteryUI(battery);

    // Monitor for futher updates.
    battery.addEventListener('levelchange', updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingchange', updateBatteryUI.bind(null, battery));
    battery.addEventListener('dischargingtimechange', updateBatteryUI.bind(null, battery));
    battery.addEventListener('chargingtimechange', updateBatteryUI.bind(null, battery));
  }

  onMount(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(monitorBattery);
    }

    const interval = setInterval(() => {
      now = Date.now();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<svelte:window bind:online />

<div class="screenTop">
  <div class="hour">{time}</div>
  <div class="island" />
  <div class="infos">
    {#if online}
      <IosSignalSvg />
    {:else}
      <IosAirplaneSvg />
    {/if}
    <IosBatterySvg level={batteryLevel} />
  </div>
</div>

<style>
  .screenTop {
    background-color: dodgerblue;
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
</style>
