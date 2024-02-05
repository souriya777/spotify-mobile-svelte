<script>
  import {
    scrollTop,
    playingRgb,
    navigatingRgb,
    playerFull,
    imageBigUrl,
    resizeTimestamp,
    screenHeight,
  } from '@js/store';
  import UiProxy from '@lib/UiProxy.svelte';
  import ImgUrlColorSolver from '@lib/ImgUrlColorSolver.svelte';
  import { getTimestamp } from '@js/date-utils';

  /** @type {HTMLElement} */
  let SCREEN_HTML;

  $: if (SCREEN_HTML?.clientHeight) {
    $screenHeight = SCREEN_HTML.clientHeight;
  }
  $: rgb = `rgb(${$playingRgb.join(',')})`;
  $: style = `
    --playing-rgb: ${rgb};
    --navigating-rgb: rgb(${$navigatingRgb?.join(',')})
  `;

  function handleScroll(e) {
    scrollTop.update(() => e.target.scrollTop);
  }

  function handleResize() {
    $resizeTimestamp = getTimestamp();
  }
</script>

<svelte:head>
  <meta name="theme-color" content={$playerFull ? rgb : 'var(--color-primary)'} />
</svelte:head>

<svelte:window on:resize={handleResize} />

{#key $resizeTimestamp}
  <div class="screen" {style} bind:this={SCREEN_HTML} on:scroll={handleScroll}>
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
