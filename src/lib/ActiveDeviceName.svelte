<script>
  import { activeDevice } from '@js/store';
  import DeviceIcon from './DeviceIcon.svelte';

  export let bigIcon = false;
</script>

<div class="active-device-name" class:player-small={bigIcon}>
  {#if $activeDevice?.name}
    &nbsp;
    <span class="active-device-name__listen">
      <DeviceIcon big={bigIcon} />
    </span>
    {$activeDevice.name}
  {:else}
    &nbsp;
  {/if}
</div>

<style>
  .active-device-name {
    display: flex;
    align-items: center;
    color: var(--color-accent);
  }

  .active-device-name__listen {
    margin-inline-end: 0.3rem;
  }
</style>
