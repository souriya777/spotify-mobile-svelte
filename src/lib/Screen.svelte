<script>
  import { playingRgb, playerFull, imageBigUrl, resizeTimestamp, screenHeight } from '@js/store';
  import UiProxy from '@lib/UiProxy.svelte';
  import ImgUrlColorSolver from '@lib/ImgUrlColorSolver.svelte';
  import { getTimestamp } from '@js/date-utils';

  /** @type {HTMLElement} */
  let SCREEN_HTML;

  $: if (SCREEN_HTML?.clientHeight) {
    $screenHeight = SCREEN_HTML.clientHeight;
  }
  $: rgb = $playerFull ? `rgb(${$playingRgb.join(',')})` : 'var(--color-primary)';
  $: style = `--playing-rgb: ${rgb};`;

  function handleResize() {
    $resizeTimestamp = getTimestamp();
  }
</script>

<svelte:head>
  <meta name="theme-color" content={rgb} />
</svelte:head>

<svelte:window on:resize={handleResize} />

{#key $resizeTimestamp}
  <div class="screen" {style} bind:this={SCREEN_HTML}>
    <ImgUrlColorSolver imageUrl={$imageBigUrl} />
    <UiProxy></UiProxy>
  </div>
{/key}

<style>
  .screen {
    position: fixed;
    height: 100dvh;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }
</style>
