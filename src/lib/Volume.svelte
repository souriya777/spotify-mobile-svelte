<script>
  import SpotifyApi from '@/js/SpotifyApi';
  import { volumePercent } from '@/js/store';

  $: safePercent = Number($volumePercent);
</script>

vol:{safePercent}%
<button on:click={() => SpotifyApi.setVolume(safePercent + 10)}>vol++</button>
<button on:click={() => SpotifyApi.setVolume(safePercent - 10)}>vol--</button>
