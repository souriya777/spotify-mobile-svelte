<script>
  import {
    scrollTop,
    playingRgb as playingRgbStore,
    navigatingRgb as navigatingRgbStore,
    navigatingPriorityRgb as navigatingPriorityRgbStore,
    isNavigatingHasPriority,
    playerFull,
    imageCoverUrl,
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
  $: playingRgb = `rgb(${$playingRgbStore?.join(',')})`;
  $: navigatingRgb = `rgb(${$navigatingRgbStore?.join(',')})`;
  $: navigatingPriorityRgb = $navigatingPriorityRgbStore
    ? `rgb(${$navigatingPriorityRgbStore?.join(',')})`
    : null;
  $: style = `
    --playing-rgb: ${playingRgb};
    --navigating-rgb: ${navigatingRgb};
  `;

  function handleScroll(e) {
    scrollTop.update(() => e.target.scrollTop);
  }

  function handleResize() {
    $resizeTimestamp = getTimestamp();
  }
</script>

<svelte:head>
  {#if $isNavigatingHasPriority && !$playerFull}
    <meta
      name="theme-color"
      content={navigatingPriorityRgb ? navigatingPriorityRgb : navigatingRgb}
    />
  {:else}
    <meta name="theme-color" content={$playerFull ? playingRgb : 'var(--color-primary)'} />
  {/if}
</svelte:head>

<svelte:window on:resize={handleResize} />

{#key $resizeTimestamp}
  <div class="screen" {style} bind:this={SCREEN_HTML} on:scroll={handleScroll}>
    <ImgUrlColorSolver imageUrl={$imageCoverUrl} />
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
