<script>
  import { devices } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';

  $: activeDevice = $devices?.find((device) => device.is_active === true);
</script>

<div>
  <ul>
    {#each $devices as device}
      <li>
        <input
          type="radio"
          bind:group={activeDevice}
          value={device.id}
          on:click={() => {
            SpotifyApi.transfertPlayback(device.id);
          }}
        />{device.name}
      </li>
    {/each}
  </ul>
</div>

<style>
  .isAnotherDeviceActive {
    background-color: var(--color-active);
  }
</style>
