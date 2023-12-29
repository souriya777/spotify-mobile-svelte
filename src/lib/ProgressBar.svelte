<script>
  import SpotifyApi from '@js/SpotifyApi';
  import { percentToMillis, progressPercentInteger } from '@js/time-utils';
  import { progressMs, realTimeProgressMs, playing, durationMs } from '@js/store';

  $: percent = progressPercentInteger($realTimeProgressMs, $durationMs);

  let positionPercent = 15;
  function seekPosition() {
    const newPosition = percentToMillis(positionPercent, $durationMs);
    SpotifyApi.seekPosition(newPosition);
  }
</script>

<progress max="100" value={percent} />
{percent}
<div>
  <ul>
    <li>playing:{$playing}</li>
    <li>🔴progressMs:{$progressMs}</li>
    <li>🟢real-progress:{$realTimeProgressMs}</li>
  </ul>
</div>

<button on:click={seekPosition}>seek-position {positionPercent}%</button>
