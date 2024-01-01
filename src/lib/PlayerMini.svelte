<script>
  import { imageUrl, trackName, artistsDisplay, albumName } from '@js/store';
  import Img from '@lib/Img.svelte';
</script>

<div class="player-mini">
  <Img src={$imageUrl} alt={$albumName} />
  <div class="title">
    <div class="track">{$trackName}</div>
    <div class="artist">{$artistsDisplay}</div>
  </div>
  <div class="device-name">web player</div>
  <button>icon-device (action)switch</button>
  <button>⏯️</button>
</div>

<style>
  .player-mini {
    border: 1px dashed aquamarine;
  }
  .title {
    background-color: pink;
  }
</style>
