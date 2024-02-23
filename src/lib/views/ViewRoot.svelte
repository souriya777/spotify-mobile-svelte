<script>
  import ViewHeader from '@lib/views/ViewHeader.svelte';

  export let title = '';
  export let header = true;

  /** @type {HTMLElement} */
  let VIEW;
</script>

<div class="view" bind:this={VIEW}>
  {#if header}
    <ViewHeader {title}>
      <div slot="right" class="right"><slot name="header__right" /></div>
      <div slot="bottom"><slot name="header__bottom" /></div>
    </ViewHeader>
  {/if}

  <div class="view__content">
    <slot />
  </div>
</div>

<style>
  .view {
    position: relative;
    padding-block-end: var(--height-nav-and-player-mini);
  }

  .view__content {
    position: relative;
    padding-block-end: var(--padding-block-library);
    padding-inline: var(--padding-inline-view-content);
    background-color: var(--color-primary);
    z-index: var(--z-index-near);
  }

  .right {
    display: flex;
  }
</style>
