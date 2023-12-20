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

<div class="ui-foreground" class:ui-foreground--full={$playerFull}>
  <div
    class="ui__player"
    class:ui__player--full={$playerFull}
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
  <div class="ui__nav" class:ui__nav--full={$playerFull}>
    <Nav />
  </div>
</div>

<style>
  :root {
    --height-ui-foreground: 17rem;
    --transition-full: 0.25s cubic-bezier(0.26, 0.66, 0.43, 0.76);
  }

  .ui-foreground {
    height: var(--height-ui-foreground);
    transition: height var(--transition-full);
  }

  .ui-foreground--full {
    height: 100dvh;
    transition: height var(--transition-full);
  }

  .ui__nav {
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translateY(0);
    transition: transform var(--transition-full);
  }

  .ui__nav--full {
    transform: translateY(100%);
    transition: transform var(--transition-full);
  }
</style>
