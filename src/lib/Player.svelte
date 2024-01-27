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
        flexJustifySvg="flex-start"
        hasAccent={false}
        callback={minimizePlayer}
      />
      <p>Liked Songs</p>
      <Button
        type="primary"
        svg="three-dots"
        flexJustifySvg="flex-end"
        hasAccent={false}
        callback={() => console.log('TODO panel')}
      />
    </div>
    <div class="img">
      <!-- FIXME -->
      <!-- <img src={$imageUrl} alt={$albumName} class:img--small={isPlayerTooSmall} /> -->
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
            svg="heart-full"
            hasAccent={true}
            accent={true}
            callback={() => (FIXME_favorite = false)}
          />
        {:else}
          <Button type="secondary" svg="heart" callback={() => (FIXME_favorite = true)} />
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
        accent={$shuffleState}
        bottomDot={$shuffleState}
        callback={() => SpotifyApi.shuffle()}
      />
      <Button
        type={$shuffleState ? 'secondary' : 'primary'}
        svg="backward"
        hasAccent={false}
        canCallback={!$shuffleState}
        callback={() => SpotifyApi.previous()}
      />
      {#if $playing}
        <Button type="primary" svg="pause" bubble={true} callback={() => SpotifyApi.pause()} />
      {:else}
        <Button type="primary" svg="play" bubble={true} callback={() => SpotifyApi.play()} />
      {/if}
      <Button type="primary" svg="forward" hasAccent={false} callback={() => SpotifyApi.next()} />

      {#if $repeatState === SpotifyRepeatState.OFF}
        <Button type="primary" svg="repeat" callback={() => SpotifyApi.repeat()} />
      {:else if $repeatState === SpotifyRepeatState.CONTEXT}
        <Button
          type="primary"
          svg="repeat"
          accent={true}
          bottomDot={true}
          callback={() => SpotifyApi.repeat()}
        />
      {:else}
        <Button
          type="primary"
          svg="repeat-one"
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
    grid-template-rows: 40px 1fr 72px 60px 84px 20px;
    align-items: start;
    height: 100dvh;
    padding-block: var(--padding-block-player);
    padding-inline: var(--padding-inline-player);
    background-color: var(--playing-rgb);

    width: 100vw;
    border: 1px dashed white;
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
