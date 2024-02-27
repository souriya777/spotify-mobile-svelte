<script>
  import { devices } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import { onTap } from '@js/event-utils';

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
          use:onTap={() => {
            SpotifyApi.transfertPlayback(device.id);
          }}
        />{device.name}
      </li>
    {/each}
  </ul>
</div>

<style>
  /* FIXME */
  /* .isAnotherDeviceActive {
    background-color: var(--color-active);
  } */
</style>
