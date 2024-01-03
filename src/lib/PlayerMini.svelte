<script>
  import SpotifyApi from '@js/SpotifyApi';
  import { imageUrl, trackName, artistsDisplay, albumName, playing, activeDevice } from '@js/store';
  import Img from '@lib/Img.svelte';
  import Button from '@lib/Button.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import ProgressBarMini from '@lib/ProgressBarMini.svelte';
</script>

<div class="player-mini">
  <div class="img">
    <Img src={$imageUrl} alt={$albumName} />
  </div>
  <div class="info">
    <p class="title">
      {#if $trackName && $artistsDisplay}
        {$trackName}&nbsp;&bull;&nbsp;<span class="artist">{$artistsDisplay}</span>
      {/if}
    </p>
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
  }

  .info {
    position: relative;
    height: 100%;
  }

  .info,
  .device-icon,
  .action {
    display: flex;
  }

  .img,
  .device-icon,
  .action {
    background-color: inherit;
    z-index: 1;
  }

  .title {
    position: absolute;
    left: var(--space-inline);
    top: var(--y-offset);
    white-space: nowrap;
    overflow: hidden;
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

  .img {
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .artist {
    color: var(--color-tertiary);
  }

  .device-name {
    color: var(--color-accent);
  }

  .player-mini__progressbar {
    grid-column: 1 / span 4;
    width: calc(100% - 1.6rem);
    margin-inline: auto;
  }
</style>
