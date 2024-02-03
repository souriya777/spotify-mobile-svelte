<script>
  import ViewHeader from '@lib/views/ViewHeader.svelte';

  /** @type {HTMLElement} */
  let VIEW;

  export let title = '';
</script>

<div class="view" bind:this={VIEW}>
  <ViewHeader {title}>
    <div slot="right" class="right">
      <slot name="header__right" />
    </div>

    <div slot="bottom">
      <slot name="header__bottom" />
    </div>
  </ViewHeader>

  <div class="view__content">
    <slot />
  </div>
</div>

<style>
  .view__content {
    padding-block: var(--padding-block-library);
    padding-inline: var(--padding-inline-library);
  }

  .right {
    display: flex;
  }
</style>
