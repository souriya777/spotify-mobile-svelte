<script>
  import {
    deviceId,
    devices,
    trackUri,
    trackName,
    albumName,
    imageUrl,
    artistsDisplay,
    shuffleState,
    repeatState,
    playing,
    realTimeProgressMs,
    durationMs,
  } from '@/js/store';
  import { millisToMinuteSecond } from '@/js/time-utils';
  import SpotifyApi from '@/js/SpotifyApi';
  import SpotifyRepeatState from '@/js/SpotifyRepeatState';
  import ProgressBar from '@/lib/ProgressBar.svelte';
  import Volume from '@/lib/Volume.svelte';

  $: activeDevice = $devices?.find((device) => device.is_active === true);
  $: isAnotherDeviceActive = $deviceId !== activeDevice?.id;
  $: progress_m_ss = millisToMinuteSecond($realTimeProgressMs);
  $: duration_m_ss = millisToMinuteSecond($durationMs);
</script>

<div class="player">
  <div class="bar">
    <button>back</button>
    <p>Liked Songs</p>
  </div>
  <img src={$imageUrl} alt={$albumName} />
  <div class="title">{$trackName}{$trackUri}</div>
  <div class="artist">{$artistsDisplay}</div>
  <button>+❤️</button>
  <div class="progress">
    <div>
      <ProgressBar />
    </div>
    <div><Volume /></div>
    <div class="time">
      <div class="begin">{progress_m_ss}</div>
      <div class="end">{duration_m_ss}</div>
    </div>
  </div>
  <button on:click={() => SpotifyApi.shuffle()}>🔀{$shuffleState ? '🟢' : '🔴'}</button>
  <button on:click={() => SpotifyApi.previous()}>⏮️</button>
  {#if $playing}
    <button on:click={() => SpotifyApi.pause()}>⏸️</button>
  {:else}
    <button on:click={() => SpotifyApi.play()}>▶️</button>
  {/if}
  <button on:click={() => SpotifyApi.next()}>⏭️</button>
  <button on:click={() => SpotifyApi.repeat()}
    >🔁{$repeatState === SpotifyRepeatState.OFF
      ? '🔴'
      : $repeatState === SpotifyRepeatState.CONTEXT
      ? '🟢🟢🟢'
      : '🟢'}</button
  >
  <div class:isAnotherDeviceActive class="device">
    {activeDevice?.type === 'Computer' ? '💻' : '📱'}
    {activeDevice?.name}
  </div>
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
</div>

<style>
  .player {
    background-color: deeppink;
  }

  .bar {
    display: flex;
    justify-content: space-between;
  }

  .progress {
    background-color: orange;
  }

  .time {
    display: flex;
    justify-content: space-between;
  }

  .isAnotherDeviceActive {
    background-color: var(--color-active);
  }
</style>
