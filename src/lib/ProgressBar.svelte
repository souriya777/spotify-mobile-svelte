<script>
  import SpotifyApi from '@/js/SpotifyApi';
  import { percentToMillis } from '@/js/time-utils';

  export let duration_ms = 0;
  export let progress_percent = 0;
  $: safeProgressPercent = isNaN(progress_percent) ? 0 : progress_percent;

  let positionPercent = 77;

  function seekPosition() {
    const newPosition = percentToMillis(positionPercent, duration_ms);
    SpotifyApi.seekPosition(newPosition);
  }
</script>

<progress max="100" value={safeProgressPercent} />
{safeProgressPercent}
{duration_ms}

<button on:click={seekPosition}>seek-position 77%</button>
