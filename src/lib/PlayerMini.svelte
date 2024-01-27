<script>
  import SpotifyApi from '@js/SpotifyApi';
  import {
    imageUrl,
    albumName,
    playing,
    activeDevice,
    playerFull,
    playingRgb,
    trackName,
    artistsDisplay,
  } from '@js/store';
  import Img from '@lib/Img.svelte';
  import Button from '@lib/Button.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import ProgressBar from '@lib/ProgressBar.svelte';
  import ImgUrlColorSolver from '@lib/ImgUrlColorSolver.svelte';
  import ActiveDeviceName from '@lib/ActiveDeviceName.svelte';
  import ScrollingText from '@lib/ScrollingText.svelte';

  const BACKGROUND_TRANSITION_MS = 200;

  /** @type {HTMLElement} */
  let titleHtml;

  $: style = `
    --padding-inline-title: 0.4rem;
    --transition-background: ${BACKGROUND_TRANSITION_MS}ms ease-in-out;
    `;

  function expandPlayer() {
    $playerFull = true;
  }

  /** @type {HTMLElement} */
  let playerMiniHtml;
  let oldPlayingRgb;

  $: if (oldPlayingRgb !== $playingRgb) {
    oldPlayingRgb = $playingRgb;
    if (titleHtml) {
      titleHtml.scrollLeft = 0;
    }
  }
</script>

<ImgUrlColorSolver imageUrl={$imageUrl} />

<div
  class="player-mini"
  {style}
  role="button"
  tabindex="0"
  on:click={expandPlayer}
  on:keyup={expandPlayer}
  bind:this={playerMiniHtml}
>
  <div class="img">
    {#if $imageUrl}
      <Img src={$imageUrl} alt={$albumName} />
    {:else}
      <Svg name="default-image" />
    {/if}
  </div>

  <ScrollingText>
    <span class="song">{$trackName}</span>
    <span>&nbsp;&bull;&nbsp;</span>
    <span class="artist">{$artistsDisplay}</span>

    <svelte:fragment slot="bottom">
      <p class="device-name">
        <ActiveDeviceName />
      </p>
    </svelte:fragment>
  </ScrollingText>

  <div class="device-icon">
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
    <ProgressBar isMini={true} />
  </div>
</div>

<style>
  .player-mini {
    display: grid;
    grid-template-columns: 4.6rem 1fr 4rem 4rem;
    grid-template-rows: 1fr 0.2rem;
    align-items: center;
    height: var(--height-player-mini);
    margin-inline: var(--padding-space-player);
    border-radius: 0.8rem;
    background-color: var(--playing-rgb);
    font-size: var(--font-s);
    overflow: hidden;
    transition: background-color var(--transition-background);
  }

  .img {
    position: relative;
    display: flex;
    padding-inline-start: var(--padding-space-player);
  }

  .device-icon {
    position: relative;
    display: flex;
  }

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

  .artist {
    padding-inline-end: calc(var(--padding-inline-title) + 0.4rem);
    color: var(--color-tertiary);
  }
</style>
