<script>
  import Nav from '@lib/Nav.svelte';
  import Player from '@lib/Player.svelte';
  import PlayerMini from '@lib/PlayerMini.svelte';
  import { playerFull } from '@js/store';
  $: style = `--transition-full: 0.25s cubic-bezier(0.26, 0.66, 0.43, 0.76);`;
</script>

<div class="player-nav" class:player-nav--full={$playerFull} {style}>
  <div class="player-nav__player">
    <Player />
  </div>
  <div class="player-nav__nav" class:player-nav__nav--full={$playerFull}>
    <div class="player-nav__mini">
      <PlayerMini />
    </div>
    <Nav />
  </div>
</div>

<style>
  .player-nav {
    height: var(--height-nav);
    transition: height var(--transition-full);
  }

  .player-nav--full {
    height: 100dvh;
    transition: height var(--transition-full);
  }

  .player-nav__nav {
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translate3d(0, 0, 0);
    transition: transform var(--transition-full);
    z-index: var(--z-index-nearest);
  }

  .player-nav__nav--full {
    transform: translate3d(0, 100%, 0);
    transition: transform var(--transition-full);
  }

  .player-nav__mini {
    opacity: 1;
    transition: opacity var(--transition-full);
  }

  .player-nav__nav--full .player-nav__mini {
    opacity: 0;
  }
</style>
