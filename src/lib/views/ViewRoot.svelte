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
    <div class="view__content-text">
      <slot />
    </div>
  </div>
</div>

<style>
  .view {
    position: relative;
  }

  .view__content {
    position: relative;
    padding-block-end: var(--padding-block-library);
    padding-inline: var(--padding-inline-view-content);
    z-index: var(--z-index-near);
  }

  .view__content-text {
    background-color: var(--color-primary);
  }

  .right {
    display: flex;
  }
</style>
