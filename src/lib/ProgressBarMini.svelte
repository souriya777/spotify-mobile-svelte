<script>
  import { progressPercentInteger } from '@js/time-utils';
  import { realTimeProgressMs, durationMs } from '@js/store';

  $: progressPercent = progressPercentInteger($realTimeProgressMs, $durationMs);
  $: progressStyle = `--progress-percent: ${progressPercent}%`;
</script>

<div class="progressbar-mini">
  <div class="progress" style={progressStyle}></div>
</div>

<style>
  .progressbar-mini {
    background-color: hsla(0, 0%, 100%, 0.3);
    height: 0.2rem;
    border-radius: 0.2rem;
  }

  .progress {
    background-color: var(--color-secondary);
    height: 100%;
    width: var(--progress-percent);
  }
</style>
