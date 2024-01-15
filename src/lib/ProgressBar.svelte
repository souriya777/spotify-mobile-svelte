<script>
  import { durationMs, progressMs, playing } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';

  export let isMini = false;

  /** @type {HTMLElement} */
  let progressHtml;
  /** @type {HTMLElement} */
  let progressBarHtml;
  /** @type {HTMLElement} */
  let ballHtml;

  let lastProgressMs;
  let visualProgressMs;
  let x = 0;
  let initialX = 0;
  let reloadTimestamp;

  $: isforward = initialX < x;
  $: ballCenterOffsetForward = 0;
  $: ballCenterOffsetBackward = -ballWidth / 2;
  $: ballCenterOffset = isforward ? ballCenterOffsetForward : ballCenterOffsetBackward;
  $: progressBarLeft = progressBarHtml ? progressBarHtml.getBoundingClientRect().left : 0;
  $: progressBarWidth = progressBarHtml ? progressBarHtml.getBoundingClientRect().width : 0;
  $: ballWidth = ballHtml ? ballHtml.getBoundingClientRect().width : 0;
  $: realX = x - progressBarLeft;
  $: animationName = isMini ? 'progress-mini-start' : 'progress-normal-start';
  $: animationState = $playing ? 'running' : 'paused';
  $: animationStyle = getAnimation($progressMs);

  $: if (lastProgressMs !== $progressMs) {
    lastProgressMs = $progressMs;
    reloadTimestamp = new Date().getTime();
  }

  function clickProgressBar(e) {
    const barX = e.clientX - progressBarLeft;
    updateProgress(barX);
    synchronizeVisualProgress();
  }

  function touchBallStart(e) {
    const touch = [...e.changedTouches].at(0);
    initialX = touch.pageX;
    x = touch.pageX;
    $playing = false;
  }

  function touchBallEnd() {
    synchronizeVisualProgress();
  }

  function synchronizeVisualProgress() {
    if (visualProgressMs < 0) {
      visualProgressMs = 0;
    } else if (visualProgressMs > $durationMs) {
      visualProgressMs = $durationMs;
    }
    SpotifyApi.seekPosition(visualProgressMs);
    $playing = true;
  }

  function touchMove(e) {
    const touch = [...e.changedTouches].at(0);
    x = touch.pageX;
    updateProgress(realX);
  }

  function updateProgress(x) {
    const progressPercent = ((x + ballCenterOffset) / progressBarWidth) * 100;
    visualProgressMs = Math.round(($durationMs * progressPercent) / 100);
    animationStyle = getAnimation(visualProgressMs);
  }

  function getAnimation(progressMs) {
    return `animation: ${$durationMs}ms linear -${progressMs}ms 1 normal none ${animationState} ${animationName}`;
  }
</script>

<!-- DEBUG -->
<!-- <button
  on:click={() => {
    $player.activateElement();
    SpotifyApi.synchronize();
  }}>🟢🟢🟢sync</button
> -->
<!-- <ul>
  <li>x:{x}</li>
  <li>realX:{realX}</li>
  <li>progressBarLeft:{progressBarLeft}</li>
  <li>progressBarWidth:{progressBarWidth}</li>
  <li>$durationMs:{$durationMs}</li>
   <li>$progressMs:{$progressMs}</li>
  <li>lastProgressMs:{lastProgressMs}</li>
   <li>visualProgressMs:{visualProgressMs}</li>
  <li>animationState:{animationState}</li>
  <li>ballCenterOffset:{ballCenterOffset}</li>
</ul> -->

<div
  class="progressbar"
  class:progressbarNormal={!isMini}
  class:progressbarMini={isMini}
  on:click={clickProgressBar}
  on:keyup={clickProgressBar}
  bind:this={progressBarHtml}
  role="button"
  tabindex="0"
>
  {#key reloadTimestamp}
    <div class="progress animation" style={animationStyle} bind:this={progressHtml}></div>
    {#if !isMini}
      <div
        class="ball"
        on:touchstart={touchBallStart}
        on:touchend={touchBallEnd}
        on:touchmove={touchMove}
        bind:this={ballHtml}
      ></div>
    {/if}
  {/key}
</div>

<style>
  :root {
    --progressbar-border-radius: 0.2rem;
  }
  .progressbar {
    background-color: hsla(0, 0%, 100%, 0.3);
    border-radius: var(--progressbar-border-radius);
    margin-block: 1rem;
  }

  .progress {
    background-color: var(--color-secondary);
    height: 100%;
    border-radius: var(--progressbar-border-radius);
  }

  .progressbarMini .progress {
    height: 0.2rem;
    transform-origin: left;
    transform: scale(0);
  }

  .progressbarNormal {
    display: flex;
    height: 0.4rem;
  }

  .ball {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    transform: translate(-50%, -25%);
    background-color: var(--color-secondary);
  }

  @keyframes -global-progress-mini-start {
    0% {
      transform: scaleX(0);
    }

    100% {
      transform: scaleX(1);
    }
  }
  @keyframes -global-progress-normal-start {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }
</style>
