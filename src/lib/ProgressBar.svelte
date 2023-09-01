<script>
  import SpotifyApi from '@/js/SpotifyApi';
  import { percentToMillis } from '@/js/time-utils';
  import { progressMs, progressMsTick, isPlaying, durationMs, progress_percent } from '@/js/store';

  $: safeProgressPercent =
    !Number.isFinite($progress_percent) || isNaN($progress_percent) ? 0 : $progress_percent;

  let positionPercent = 15;
  function seekPosition() {
    const newPosition = percentToMillis(positionPercent, $durationMs);
    SpotifyApi.seekPosition(newPosition);
  }
</script>

<progress max="100" value={safeProgressPercent} />
{safeProgressPercent}
<div>
  🟢progressMs:{$progressMs}
  🔴progress:{$progressMsTick}
  isPlaying:{$isPlaying}
</div>

<button on:click={seekPosition}>seek-position {positionPercent}%</button>
