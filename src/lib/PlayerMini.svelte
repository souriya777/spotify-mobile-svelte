<script>
  import SpotifyApi from '@js/SpotifyApi';
  import { imageUrl, trackName, artistsDisplay, albumName, playing, activeDevice } from '@js/store';
  import Img from '@lib/Img.svelte';
  import Button from '@lib/Button.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import ProgressBarMini from '@lib/ProgressBarMini.svelte';

  const OFFSET = 1;
  const INTERVAL_MS = 60;
  const TIMEMOUT_BEFORE_1ST_SCROLL = 1000;
  /** @type {HTMLElement} */
  let titleHtml;
  let hasReachTitleBeginning = true;
  let hasReachTitleEnd = false;
  let intervalTitle;
  let isFirstTitleScroll = true;

  function observeTitleBeginning(node) {
    const observeFn = (entries) => {
      if (hasReachTitleEnd) {
        return;
      }

      if (isFirstTitleScroll) {
        isFirstTitleScroll = false;
        setTimeout(() => {
          observeTitleBeginning(node);
        }, TIMEMOUT_BEFORE_1ST_SCROLL);
        return;
      }

      hasReachTitleBeginning = entries[0].isIntersecting ? true : false;
      scrollTitle(OFFSET);
    };
    observeTitle(node, observeFn);
  }

  function observeTitleEnd(node) {
    const observeFn = (entries) => {
      if (hasReachTitleBeginning) {
        return;
      }

      hasReachTitleEnd = entries[0].isIntersecting ? true : false;
      scrollTitle(-OFFSET);
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
</script>

<div class="player-mini">
  <div class="img">
    <Img src={$imageUrl} alt={$albumName} />
  </div>
  <div class="info">
    <div class="title" bind:this={titleHtml}>
      {#if $trackName && $artistsDisplay}
        <span class="title__begin" use:observeTitleBeginning></span>
        <span class="song">{$trackName}</span>
        <span>&nbsp;&bull;&nbsp;</span>
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
  <div class="device-icon">
    {#if $activeDevice?.type}
      <Button
        type="primary"
        hasAccent={true}
        accent={true}
        svg={$activeDevice?.type}
        callback={() => console.log('TODO')}
      ></Button>
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
    --y-offset: 0.6rem;
  }

  .player-mini {
    display: grid;
    grid-template-columns: 4rem 1fr 4rem 4rem;
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
    padding-inline-start: var(--space-inline);
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .info {
    background-color: deeppink;
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .title {
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
    left: var(--space-inline);
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

  .player-mini__progressbar {
    grid-column: 1 / span 4;
    width: calc(100% - 1.6rem);
    margin-inline: auto;
  }
</style>
