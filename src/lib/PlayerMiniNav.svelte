<script>
  import { playerFull } from '@js/store';
  import Nav from '@lib/Nav.svelte';
  import PlayerMini from '@lib/PlayerMini.svelte';
</script>

<div class="player-nav__nav" class:player-nav__nav--full={$playerFull}>
  <div class="player-nav__mini">
    <PlayerMini />
  </div>
  <Nav />
</div>

<style>
  .player-nav__nav {
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translate3d(0, 0, 0);
    transition: transform var(--transition-bottom-panel);
    z-index: var(--z-index-near);
  }

  .player-nav__nav--full {
    transform: translate3d(0, 100%, 0);
    transition: transform var(--transition-bottom-panel);
  }

  .player-nav__mini {
    opacity: 1;
    transition: opacity var(--transition-bottom-panel);
  }

  .player-nav__nav--full .player-nav__mini {
    opacity: 0;
  }
</style>
