<script>
  import { playerFullMode, isPlaying, player, spotifyDeviceId, isPlayerReady } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import { onTap } from '@/js/event-utils';
  import SpotifyConnect from '@/lib/SpotifyConnect.svelte';
</script>

{#if $isPlayerReady}
  <div class="player" use:onTap={() => playerFullMode.set(true)}>
    <div class="bar" use:onTap={() => playerFullMode.set(false)}>
      <button>back</button>
      <p>Liked Songs</p>
    </div>
    <img
      src="https://i.scdn.co/image/ab67616d00001e02d9aae5518aa56971b3f406ea"
      alt="La Dura Vida del Joven Rapero"
    />
    <div class="title">Contando Lunares (feat. Cruz Cafuné)</div>
    <div class="artist">Don Patricio, Cruz Cafuné</div>
    <button>+✅</button>
    <div class="progress">
      <div>bar</div>
      <div class="time">
        <div class="begin">0:32</div>
        <div class="end">-2:28</div>
      </div>
    </div>
    <button>shuffle</button>
    <button on:click={() => $player.previousTrack()}>⏮️</button>
    {#if $isPlaying}
      <button on:click={() => SpotifyApi.pause($spotifyDeviceId)}>⏸️</button>
    {:else}
      <button on:click={() => SpotifyApi.play($spotifyDeviceId)}>▶️</button>
    {/if}
    <button on:click={() => $player.nextTrack()}>⏭️</button>
    <button>repeat</button>
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
