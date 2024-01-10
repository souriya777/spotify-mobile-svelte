<script>
  import { durationMs, progressMs, playing } from '@js/store';

  let lastProgress = $progressMs;
  let reloadTimestamp;

  $: animationState = $playing ? 'running' : 'paused';
  $: style = `animation: ${$durationMs}ms linear -${$progressMs}ms 1 normal none ${animationState} progress-start`;

  $: if (lastProgress !== $progressMs) {
    lastProgress = $progressMs;
    reloadTimestamp = new Date().getTime();
  }
</script>

<div class="progressbar-mini">
  {#key reloadTimestamp}
    <div class="progress" {style}></div>
  {/key}
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
    transform: scale(0);
    transform-origin: left;
    width: 100%;
  }

  @keyframes progress-start {
    0% {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }
</style>
