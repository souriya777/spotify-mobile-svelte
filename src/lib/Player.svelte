<script>
  import {
    player,
    playerCurrentTrack,
    playerShuffle,
    playerRepeat,
    isPlayerFull,
    isPlaying,
    isPlayerReady,
  } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import { onTap } from '@/js/event-utils';
  import SpotifyConnect from '@/lib/SpotifyConnect.svelte';
  import SpotifyRepeatState from '@/js/SpotifyRepeatState';

  $: artistsDisplay = $playerCurrentTrack?.artists?.map((item) => item.name).join(', ');
  $: imageUrl = $playerCurrentTrack?.album?.images?.[0]?.url;

  $: currentTrack = {
    ...$playerCurrentTrack,
    albumName: $playerCurrentTrack?.album?.name,
    artistsDisplay,
    imageUrl,
  };
  $: console.log(currentTrack);
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
    <button on:click={() => $player.previousTrack()}>⏮️</button>
    {#if $isPlaying}
      <button on:click={() => SpotifyApi.pause()}>⏸️</button>
    {:else}
      <button on:click={() => SpotifyApi.play()}>▶️</button>
    {/if}
    <button on:click={() => $player.nextTrack()}>⏭️</button>
    <button on:click={() => SpotifyApi.repeat()}
      >🔁{$playerRepeat === SpotifyRepeatState.OFF
        ? '🔴'
        : $playerRepeat === SpotifyRepeatState.CONTEXT
        ? '🟢🟢🟢'
        : '🟢'}</button
    >
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
