<script>
  import { onMount } from 'svelte';
  import {
    spotifyDeviceId,
    playerPlaybackState,
    isPlayerFull,
    isPlayerReady,
    devices,
  } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import { onTap } from '@/js/event-utils';
  import SpotifyConnect from '@/lib/SpotifyConnect.svelte';
  import SpotifyRepeatState from '@/js/SpotifyRepeatState';
  import SpotifyPlaybackStateService from '@/js/SpotifyPlaybackStateService';
  import ProgressBar from '@/lib/ProgressBar.svelte';

  // TODO move in transformers ???
  $: track = $playerPlaybackState?.item;
  $: artistsDisplay = track?.artists?.map((item) => item.name).join(', ');
  $: imageUrl = track?.album?.images?.[0]?.url;
  $: currentTrack = {
    ...track,
    albumName: track?.album?.name,
    artistsDisplay,
    imageUrl,
  };

  $: if ($isPlayerReady) {
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

    const intervalPlayer = setInterval(() => {
      // do here to make it reactive
      $playerPlaybackState.progress_ms += 1000;

      // update store
      playerPlaybackState.set(SpotifyPlaybackStateService.refreshProgress($playerPlaybackState));
    }, 1000);

    return () => {
      clearInterval(intervalRefresh);
      clearInterval(intervalPlayer);
    };
  });
</script>

{#if $isPlayerReady}
  <div class="player" use:onTap={() => isPlayerFull.set(true)}>
    <div class="bar" use:onTap={() => isPlayerFull.set(false)}>
      <button>back</button>
      <p>Liked Songs</p>
    </div>
    <img src={imageUrl} alt={currentTrack.albumName} />
    <div class="title">{currentTrack.name}</div>
    <div class="artist">{currentTrack.artistsDisplay}</div>
    <button>+✅</button>
    <div class="progress">
      <div>
        <ProgressBar
          duration_ms={$playerPlaybackState?.item?.duration_ms}
          progress_percent={$playerPlaybackState?.progress_percent}
        />
      </div>
      <div class="time">
        <div class="begin">{$playerPlaybackState?.current_m_ss}</div>
        <div class="end">{$playerPlaybackState?.end_m_ss}</div>
      </div>
    </div>
    <button on:click={() => SpotifyApi.shuffle()}
      >🔀{$playerPlaybackState?.shuffle_state ? '🟢' : '🔴'}</button
    >
    <button on:click={() => SpotifyApi.previous()}>⏮️</button>
    {#if $playerPlaybackState?.is_playing}
      <button on:click={() => SpotifyApi.pause()}>⏸️</button>
    {:else}
      <button on:click={() => SpotifyApi.play()}>▶️</button>
    {/if}
    <button on:click={() => SpotifyApi.next()}>⏭️</button>
    <button on:click={() => SpotifyApi.repeat()}
      >🔁{$playerPlaybackState?.repeat_state === SpotifyRepeatState.OFF
        ? '🔴'
        : $playerPlaybackState?.repeat_state === SpotifyRepeatState.CONTEXT
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
