<script>
  import { volumePercent } from '@js/store';
  import { onTap } from '@js/event-utils';
  import SpotifyApi from '@js/SpotifyApi';

  $: safePercent = Number($volumePercent);
</script>

vol:{safePercent}%
<button use:onTap={() => SpotifyApi.setVolume(safePercent + 10)}>vol++</button>
<button use:onTap={() => SpotifyApi.setVolume(safePercent - 10)}>vol--</button>
