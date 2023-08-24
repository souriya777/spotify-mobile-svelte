<script>
  import {
    playerPlaybackState,
    playerCurrentTrack,
    playerShuffle,
    playerRepeat,
    isPlayerFull,
    isPlayerReady,
  } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import { onTap } from '@/js/event-utils';
  import SpotifyConnect from '@/lib/SpotifyConnect.svelte';
  import SpotifyRepeatState from '@/js/SpotifyRepeatState';

  // TODO move in transformers ???
  $: track = $playerCurrentTrack;
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
      <div>bar</div>
      <div class="time">
        <div class="begin">0:32</div>
        <div class="end">-2:28</div>
      </div>
    </div>
    <button on:click={() => SpotifyApi.shuffle()}>🔀{$playerShuffle ? '🟢' : '🔴'}</button>
    <button on:click={() => SpotifyApi.previous()}>⏮️</button>
    {#if $playerPlaybackState?.is_playing}
      <button on:click={() => SpotifyApi.pause()}>⏸️</button>
    {:else}
      <button on:click={() => SpotifyApi.play()}>▶️</button>
    {/if}
    <button on:click={() => SpotifyApi.next()}>⏭️</button>
    <button on:click={() => SpotifyApi.repeat()}
      >🔁{$playerRepeat === SpotifyRepeatState.OFF
        ? '🔴'
        : $playerRepeat === SpotifyRepeatState.CONTEXT
        ? '🟢🟢🟢'
        : '🟢'}</button
    >
    <div class="progress">progress{$playerPlaybackState?.progress_ms}</div>
    <div class="device">💻 Souriya</div>
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
  }
</style>
