<script>
  import Nav from '@lib/Nav.svelte';
  import Player from '@lib/Player.svelte';
  import PlayerMini from '@lib/PlayerMini.svelte';
  import { playerFull } from '@js/store';

  function expandPlayer() {
    // TODO
    // if (!$playerFull) {
    //   $playerFull = true;
    // }
    $playerFull = !$playerFull;
  }
</script>

<div class="player-nav" class:player-nav--full={$playerFull}>
  <div
    class="player-nav__player"
    role="button"
    tabindex="0"
    on:click={expandPlayer}
    on:keyup={expandPlayer}
  >
    {#if $playerFull}
      <Player />
    {:else}
      <PlayerMini />
    {/if}
  </div>
  <div class="player-nav__nav" class:player-nav__nav--full={$playerFull}>
    <Nav />
  </div>
</div>

<style>
  :root {
    --transition-full: 0.25s cubic-bezier(0.26, 0.66, 0.43, 0.76);
  }

  .player-nav {
    height: calc(var(--height-nav) + var(--height-player-mini));
    transition: height var(--transition-full);
  }

  .player-nav--full {
    height: 100dvh;
    transition: height var(--transition-full);
  }

  .player-nav__nav {
    /* border: 1px dashed yellow; */
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translateY(0);
    transition: transform var(--transition-full);
  }

  .player-nav__nav--full {
    transform: translateY(100%);
    transition: transform var(--transition-full);
  }
</style>
