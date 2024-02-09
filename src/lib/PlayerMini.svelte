<script>
  import SpotifyApi from '@js/SpotifyApi';
  import {
    imageMiniUrl,
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
  import ActiveDeviceName from '@lib/ActiveDeviceName.svelte';
  import ScrollingText from '@lib/ScrollingText.svelte';

  /** @type {HTMLElement} */
  let titleHtml;

  $: style = `--padding-inline-title: 0.4rem;`;

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

<div
  class="player-mini font-player-mini"
  {style}
  role="button"
  tabindex="0"
  on:click={expandPlayer}
  on:keyup={expandPlayer}
  bind:this={playerMiniHtml}
>
  <div class="img">
    {#if $imageMiniUrl}
      <Img src={$imageMiniUrl} alt={$albumName} radius={true} />
    {:else}
      <Svg name="default-image" />
    {/if}
  </div>

  <ScrollingText customStyle={`margin-block-start: -0.2rem`}>
    <span class="song">{$trackName}</span>
    <span class="bull">&nbsp;&bull;&nbsp;</span>
    <span class="artist">{$artistsDisplay}</span>

    <svelte:fragment slot="bottom">
      <p class="device-name font-player-mini__device">
        <ActiveDeviceName />
      </p>
    </svelte:fragment>
  </ScrollingText>

  <div class="device">
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
  :root {
    --player-mini-img-size: 4rem;
    --player-mini-img-padding-block-start: 0.4rem;
  }

  .player-mini {
    display: grid;
    grid-template-columns: var(--player-mini-img-size) 1fr 4rem 4rem;
    grid-template-rows: 1fr var(--height-progressbar-mini);
    align-items: center;
    height: var(--height-player-mini);
    margin-inline: var(--padding-space-player);
    padding-inline: 0.8rem;
    padding-block-start: 0.6rem;
    border-radius: 0.8rem;
    background-color: var(--playing-rgb);
    overflow: hidden;
    transition: background-color var(--transition-background);
  }

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img {
    padding-block-end: var(--player-mini-img-padding-block-start);
    height: calc(var(--player-mini-img-size) + var(--player-mini-img-padding-block-start));
    width: auto;
    filter: var(--shadow-cover);
  }

  .device {
    position: relative;
    display: flex;
    margin-block-start: -0.4rem;
  }

  .action {
    margin-block-start: -0.2rem;
  }

  .device,
  .action {
    display: flex;
  }

  .device,
  .action {
    height: 100%;
  }

  .player-mini__progressbar {
    grid-column: 1 / span 4;
    width: calc(100% - 0.1rem);
    margin-inline: auto;
  }

  .artist {
    padding-inline-end: calc(var(--padding-inline-title) + 0.4rem);
    color: var(--color-tertiary);
  }
</style>
