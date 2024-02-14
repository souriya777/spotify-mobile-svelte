<script>
  import { gridMode, viewName } from '@js/store';
</script>

<ul class="list" class:mylib={$viewName === 'mylib'} class:gridMode={$gridMode}><slot /></ul>

<style>
  .mylib.list {
    padding-block-end: var(--height-nav-and-player-mini);
    padding-block-start: var(--padding-block-library);
  }

  .gridMode {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    column-gap: var(--padding-inline-view-content);
    row-gap: 1.5rem;
  }

  :global(.list.gridMode li) {
    display: grid;
    grid-template-rows: 1fr;
    padding-block: unset;
  }

  :global(.list.gridMode li .text) {
    padding: unset;
    padding-block-start: 0.7rem;
  }

  :global(.list.gridMode li .empty-img) {
    height: 100%;
    width: 100%;
  }

  :global(.list.gridMode li .empty-img svg) {
    height: var(--size-img-empty-note-grid-mode);
    width: var(--size-img-empty-note-grid-mode);
  }

  :global(.list.gridMode li .name) {
    /* FIXME move this font-size in font.scss ? */
    font-size: 1.4rem;
  }

  :global(.list.gridMode li .name),
  :global(.list.gridMode li .owner) {
    /* FIXME move this font-size in font.scss ? */
    line-height: 2rem;
  }

  :global(.list.gridMode .bubbleImage) {
    margin-block-end: 1.4rem;
  }

  :global(.list.gridMode .bubbleImage .img-container) {
    height: var(--size-img-artist-grid-mode);
    width: var(--size-img-artist-grid-mode);
  }

  :global(.list.gridMode .bubbleImage .img),
  :global(.list.gridMode .bubbleImage .text) {
    margin-inline: auto;
  }
</style>
