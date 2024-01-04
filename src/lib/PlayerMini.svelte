<script>
  import SpotifyApi from '@js/SpotifyApi';
  import {
    imageUrl,
    trackName,
    artistsDisplay,
    albumName,
    playing,
    activeDevice,
    playerFull,
  } from '@js/store';
  import Img from '@lib/Img.svelte';
  import Button from '@lib/Button.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import ProgressBarMini from '@lib/ProgressBarMini.svelte';

  const OFFSET = 1;
  const INTERVAL_MS = 60;
  const TIMEMOUT_BEFORE_SCROLL = 2000;
  /** @type {HTMLElement} */
  let titleHtml;
  let hasReachTitleBeginning = true;
  let hasReachTitleEnd = false;
  let intervalTitle;

  let styleBlurStart = `--color-blur-start: rgba(40, 40, 40, 0.9)`;
  let styleBlurEnd = `--color-blur-end: rgba(40, 40, 40, 0.1)`;
  $: style = `${styleBlurStart}; ${styleBlurEnd}`;

  function observeTitleBeginning(node) {
    const observeFn = (entries) => {
      if (hasReachTitleEnd) {
        return;
      }

      setTimeout(() => {
        hasReachTitleBeginning = entries[0].isIntersecting ? true : false;
        scrollTitle(OFFSET);
      }, TIMEMOUT_BEFORE_SCROLL);
    };
    observeTitle(node, observeFn);
  }

  function observeTitleEnd(node) {
    const observeFn = (entries) => {
      if (hasReachTitleBeginning) {
        return;
      }

      setTimeout(() => {
        hasReachTitleEnd = entries[0].isIntersecting ? true : false;
        scrollTitle(-OFFSET);
      }, TIMEMOUT_BEFORE_SCROLL);
    };
    observeTitle(node, observeFn);
  }

  function observeTitle(node, observeFn) {
    const observer = new IntersectionObserver(observeFn, { threshold: 0 });
    observer.observe(node);
    return {
      destroy: () => observer.disconnect(),
    };
  }

  function scrollTitle(offset) {
    clearInterval(intervalTitle);
    intervalTitle = setInterval(() => {
      if (titleHtml) {
        titleHtml.scrollLeft += offset;
      }
    }, INTERVAL_MS);
  }

  function expandPlayer() {
    $playerFull = true;
  }
</script>

<div class="player-mini" {style}>
  <div
    class="img blur blur--right"
    role="button"
    tabindex="0"
    on:click={expandPlayer}
    on:keyup={expandPlayer}
  >
    {#if $imageUrl}
      <Img src={$imageUrl} alt={$albumName} />
    {:else}
      <Svg name="default-image" />
    {/if}
  </div>
  <div class="info" role="button" tabindex="0" on:click={expandPlayer} on:keyup={expandPlayer}>
    <div class="title" bind:this={titleHtml}>
      {#if $trackName && $artistsDisplay}
        <span class="title__begin" use:observeTitleBeginning></span>
        <span class="song">{$trackName}</span>
        <span>&bull;</span>
        <span class="artist">{$artistsDisplay}</span>
        <span class="title__end" use:observeTitleEnd></span>
      {/if}
    </div>
    <p class="device-name">
      {#if $activeDevice?.name}
        <span class="device-name__listen">
          <Svg name="device-listened" size={10} />
        </span>
        {$activeDevice.name}
      {:else}
        &nbsp;
      {/if}
    </p>
  </div>
  <div class="device-icon blur blur--left">
    {#if $activeDevice?.type}
      <Button
        type="primary"
        hasAccent={true}
        accent={true}
        svg={$activeDevice?.type}
        callback={() => console.log('TODO')}
      ></Button>
    {:else}
      <Button type="primary" svg="device-unknown" callback={() => console.log('TODO')}></Button>
    {/if}
  </div>
  <div class="action">
    {#if $playing}
      <Button type="primary" svg="pause" callback={() => SpotifyApi.pause()}></Button>
    {:else}
      <Button type="primary" svg="play" callback={() => SpotifyApi.play()}></Button>
    {/if}
  </div>
  <div class="player-mini__progressbar">
    <ProgressBarMini />
  </div>
</div>

<style>
  :root {
    --space-inline: 0.6rem;
    --y-offset: 1.2rem;
    --width-blur: 1rem;
    --padding-inline-title: 0.4rem;
  }

  .player-mini {
    display: grid;
    grid-template-columns: 4.6rem 1fr 4rem 4rem;
    grid-template-rows: 1fr 0.2rem;
    align-items: center;
    height: var(--height-player-mini);
    margin-inline: var(--space-inline);
    border-radius: 0.8rem;
    background-color: var(--color-primary-highlight);
    font-size: var(--font-s);
    overflow: hidden;
  }

  .img {
    position: relative;
    display: flex;
    padding-inline-start: var(--space-inline);
  }

  .device-icon {
    position: relative;
    display: flex;
  }

  .info {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .title {
    padding-inline-start: var(--space-inline);
    padding-block-start: var(--y-offset);
    white-space: nowrap;
    transform: translateX(var(--translate-title));
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .title::-webkit-scrollbar {
    display: none;
  }

  .device-name {
    position: absolute;
    left: calc(var(--space-inline) + var(--padding-inline-title));
    bottom: var(--y-offset);
    display: flex;
    align-items: center;
  }

  .device-name__listen {
    margin-inline-end: 0.3rem;
  }

  .artist {
    color: var(--color-tertiary);
  }

  .device-name {
    color: var(--color-accent);
  }

  .info,
  .device-icon,
  .action {
    display: flex;
  }

  .device-icon,
  .action {
    height: 100%;
  }

  .blur::after,
  .blur::before {
    content: '';
    position: absolute;
    height: 100%;
    width: var(--width-blur);
    z-index: var(--z-index-nearest);
  }

  .blur--right::after {
    right: calc(-1 * var(--width-blur));
    background-image: linear-gradient(
      to right,
      rgba(40, 40, 40, 0.9) 45%,
      rgba(40, 40, 40, 0.1) 90%
    );
  }

  .blur--left::before {
    left: calc(-1 * var(--width-blur));
    background-image: linear-gradient(
      to left,
      rgba(40, 40, 40, 0.9) 45%,
      rgba(40, 40, 40, 0.1) 90%
    );
  }

  .player-mini__progressbar {
    grid-column: 1 / span 4;
    width: calc(100% - 1.6rem);
    margin-inline: auto;
  }

  .song {
    padding-inline-start: var(--padding-inline-title);
  }

  .artist {
    padding-inline-end: calc(var(--padding-inline-title) + 0.4rem);
  }
</style>
