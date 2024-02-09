<script>
  import { gridMode } from '@js/store';
</script>

<ul class="list" class:gridMode={$gridMode}>
  <slot />
</ul>

<style>
  .list {
    padding-block-start: var(--padding-inline-library);
    padding-block-end: var(--height-nav-and-player-mini);
  }

  .gridMode {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: var(--padding-inline-library);
  }

  :global(.list.gridMode li) {
    display: grid;
    padding-block: unset;
  }

  :global(.list.gridMode li .text) {
    padding: unset;
  }

  :global(.list.gridMode li img) {
    width: 100%;
    height: unset;
  }
</style>
