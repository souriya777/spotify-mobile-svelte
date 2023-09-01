<script>
  import { onMount } from 'svelte';
  import {
    spotifyDeviceId,
    playerIsFull,
    playerIsReady,
    devices,
    songName,
    albumName,
    imageUrl,
    artistsDisplay,
    shuffleState,
    repeatState,
    isPlaying,
    current_m_ss,
    end_m_ss,
  } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import { onTap } from '@/js/event-utils';
  import SpotifyConnect from '@/lib/SpotifyConnect.svelte';
  import SpotifyRepeatState from '@/js/SpotifyRepeatState';
  import ProgressBar from '@/lib/ProgressBar.svelte';

  $: if ($playerIsReady) {
    SpotifyApi.synchronize();
  }

  $: activeDevice = $devices?.find((device) => device.is_active === true);

  $: isAnotherDeviceActive = $spotifyDeviceId !== activeDevice?.id;

  onMount(() => {
    const frequency = import.meta.env.VITE_SPOTIFY_SYNC_FREQUENCY_MS;

    const intervalRefresh = setInterval(() => {
      // FIXME tune it
      // SpotifyApi.synchronize();
      // console.log('...refresh PLAYBACK_STATE 🔴');
    }, frequency);

    // const intervalPlayer = setInterval(() => {
    // FIXME refresh progress_ms
    // FIXME do here to make it reactive
    // progressMs.update(n => n + 1000);
    // }, 1000);
    // FIXME make interval via '.subscribe()' ?

    return () => {
      clearInterval(intervalRefresh);
      // clearInterval(intervalPlayer);
    };
  });
</script>

{#if $playerIsReady}
  <div class="player" use:onTap={() => playerIsFull.set(true)}>
    <div class="bar" use:onTap={() => playerIsFull.set(false)}>
      <button>back</button>
      <p>Liked Songs</p>
    </div>
    <img src={$imageUrl} alt={$albumName} />
    <div class="title">{$songName}</div>
    <div class="artist">{$artistsDisplay}</div>
    <button>+✅</button>
    <div class="progress">
      <div>
        <ProgressBar />
      </div>
      <div class="time">
        <div class="begin">{$current_m_ss}</div>
        <div class="end">{$end_m_ss}</div>
      </div>
    </div>
    <button on:click={() => SpotifyApi.shuffle()}>🔀{$shuffleState ? '🟢' : '🔴'}</button>
    <button on:click={() => SpotifyApi.previous()}>⏮️</button>
    {#if $isPlaying}
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
              bind:group={activeDevice.id}
              value={device.id}
              on:click={() => SpotifyApi.transfertPlayback(device.id)}
            />{device.name}
          </li>
        {/each}
      </ul>
    </div>
  </div>
{:else}
  <SpotifyConnect />
{/if}

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
    background-color: var(--color-active-player);
  }
</style>
