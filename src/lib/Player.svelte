<script>
  import {
    trackName,
    artistsDisplay,
    shuffleState,
    repeatState,
    playing,
    playerFull,
    optionsFull,
    realTimeProgressMs,
    durationMs,
    resizeTimestamp,
  } from '@js/store';
  import { millisToMinuteSecond } from '@js/time-utils';
  import SpotifyApi from '@js/SpotifyApi';
  import SpotifyRepeatState from '@js/SpotifyRepeatState';
  import ProgressBar from '@lib/ProgressBar.svelte';
  import Button from '@lib/Button.svelte';
  import ActiveDeviceName from '@lib/ActiveDeviceName.svelte';
  import ScrollingText from '@lib/ScrollingText.svelte';
  import ImgCover from '@lib/ImgCover.svelte';

  const SVG_SIZE_PRIMARY = 28;
  const SVG_SIZE_SECONDARY = 36;

  /** @type {HTMLElement} */
  let playerHtml;
  let FIXME_favorite = false;

  $: progress_m_ss = millisToMinuteSecond($realTimeProgressMs);
  $: duration_m_ss = `-${millisToMinuteSecond($durationMs - $realTimeProgressMs)}`;

  function minimizePlayer() {
    $playerFull = false;
  }
</script>

{#key $resizeTimestamp}
  <div class="player" bind:this={playerHtml}>
    <div class="bar" role="button" tabindex="0" on:click={minimizePlayer} on:keyup={minimizePlayer}>
      <Button
        type="primary"
        svg="charette-down"
        svgFlexJustify="flex-start"
        hasAccent={false}
        callback={minimizePlayer}
      />
      <p class="font-player-small">Liked Songs</p>
      <Button
        type="primary"
        svg="three-dots"
        svgFlexJustify="flex-end"
        hasAccent={false}
        callback={() => ($optionsFull = true)}
      />
    </div>

    <ImgCover />

    <div class="song">
      <div class="song__text">
        <ScrollingText>
          <div class="track font-title">{$trackName}</div>
        </ScrollingText>
        <ScrollingText>
          <div class="artist">{$artistsDisplay}</div>
        </ScrollingText>
      </div>

      <div class="song__actions">
        {#if FIXME_favorite}
          <Button
            type="secondary"
            svgSize={SVG_SIZE_PRIMARY}
            svg="heart-full"
            hasAccent={true}
            accent={true}
            callback={() => (FIXME_favorite = false)}
          />
        {:else}
          <Button
            type="secondary"
            svgSize={SVG_SIZE_PRIMARY}
            svg="heart"
            callback={() => (FIXME_favorite = true)}
          />
        {/if}
      </div>
    </div>

    <div class="progress">
      <ProgressBar />
      <div class="time font-player-small">
        <div class="begin">{progress_m_ss}</div>
        <div class="end">{duration_m_ss}</div>
      </div>
    </div>

    <div class="actions">
      <Button
        type="primary"
        svg="shuffle"
        svgFlexJustify="flex-start"
        accent={$shuffleState}
        bottomDot={$shuffleState}
        callback={() => SpotifyApi.shuffle()}
      />
      <Button
        type={$shuffleState ? 'secondary' : 'primary'}
        svg="backward"
        svgSize={SVG_SIZE_SECONDARY}
        svgFlexJustify="flex-start"
        hasAccent={false}
        canCallback={!$shuffleState}
        callback={() => SpotifyApi.previous()}
      />

      {#if $playing}
        <Button
          type="primary"
          svgSize={SVG_SIZE_PRIMARY}
          svg="pause"
          bubble={true}
          callback={() => SpotifyApi.pause()}
        />
      {:else}
        <Button
          type="primary"
          svgSize={SVG_SIZE_PRIMARY}
          svg="play"
          bubble={true}
          callback={() => SpotifyApi.play()}
        />
      {/if}
      <Button
        type="primary"
        svg="forward"
        svgSize={SVG_SIZE_SECONDARY}
        svgFlexJustify="flex-end"
        hasAccent={false}
        callback={() => SpotifyApi.next()}
      />

      {#if $repeatState === SpotifyRepeatState.OFF}
        <Button
          type="primary"
          svg="repeat"
          svgFlexJustify="flex-end"
          callback={() => SpotifyApi.repeat()}
        />
      {:else if $repeatState === SpotifyRepeatState.CONTEXT}
        <Button
          type="primary"
          svg="repeat"
          svgFlexJustify="flex-end"
          accent={true}
          bottomDot={true}
          callback={() => SpotifyApi.repeat()}
        />
      {:else}
        <Button
          type="primary"
          svg="repeat-one"
          svgFlexJustify="flex-end"
          accent={true}
          bottomDot={true}
          callback={() => SpotifyApi.repeat()}
        />
      {/if}
    </div>

    <div>
      <ActiveDeviceName bigIcon={true} />
    </div>
  </div>
{/key}

<style>
  .player {
    display: grid;
    grid-template-rows: 4rem 6fr 7.2rem 5rem 8.8rem 1fr;
    align-items: start;
    height: 100dvh;
    padding-block: var(--padding-block-player);
    padding-inline: var(--padding-inline-player);
    background-color: var(--playing-rgb);
  }

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .time {
    display: flex;
    justify-content: space-between;
  }

  .artist {
    opacity: 0.7;
  }

  .song {
    display: grid;
    grid-template-columns: 1fr 4.8rem;
  }

  .song__text {
    margin-inline-start: calc(-1 * var(--width-scrolling-text-blur));
    flex-grow: 1;
    overflow: hidden;
  }

  .actions {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
