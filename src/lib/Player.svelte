<script>
  import {
    trackName,
    albumName,
    imageUrl,
    artistsDisplay,
    shuffleState,
    repeatState,
    playing,
    playerFull,
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

  const SVG_SIZE_PRIMARY = 28;
  const SVG_SIZE_SECONDARY = 36;
  const MIN_PLAYER_HEIGHT_FOR_IMG = 608;

  /** @type {HTMLElement} */
  let playerHtml;
  let FIXME_favorite = false;

  $: playerHeight = playerHtml ? playerHtml.clientHeight : 0;
  $: isPlayerTooSmall = playerHtml && playerHeight <= MIN_PLAYER_HEIGHT_FOR_IMG;
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
        svg="arrow-down"
        svgFlexJustify="flex-start"
        hasAccent={false}
        callback={minimizePlayer}
      />
      <p class="player-small">Liked Songs</p>
      <Button
        type="primary"
        svg="three-dots"
        svgFlexJustify="flex-end"
        hasAccent={false}
        callback={() => console.log('TODO panel')}
      />
    </div>
    <div class="img">
      <img src={$imageUrl} alt={$albumName} class:img--small={isPlayerTooSmall} />
    </div>

    <div class="song">
      <div class="song__text">
        <ScrollingText>
          <div class="track player-title">{$trackName}</div>
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
      <div class="time player-small">
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

    <ActiveDeviceName bigIcon={true} />
  </div>
{/key}

<style>
  .player {
    display: grid;
    /* FIXME */
    grid-template-rows: 40px 1fr 72px 50px 84px calc(20px + var(--padding-bottom-phone));
    grid-template-rows: 40px 6fr 72px 50px 88px 1fr;
    align-items: start;
    height: 100dvh;
    padding-block: var(--padding-block-player);
    padding-inline: var(--padding-inline-player);
    background-color: var(--playing-rgb);
  }

  .img {
    align-self: center;
    /* max-width: 36rem; */
  }

  img {
    margin-inline: auto;
    border-radius: 1rem;
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  }

  .img--small {
    max-width: 80%;
    transition: max-width ease 250ms;
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
