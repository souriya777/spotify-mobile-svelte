<script>
  import Svg from '@lib/svg/Svg.svelte';
  import ViewHeader from '@lib/views/ViewHeader.svelte';
  import DetailCover from '@lib/DetailCover.svelte';

  export let title = '';
  /** @type {import('@js/spotify').SpotifyImage}*/
  export let cover;
  export let header = true;
  export let detailHeader = false;

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

  {#if detailHeader}
    <div class="detail-header">
      <Svg name="back" size={16} />
      <div class="detail-header__title font-collection-detail-header">{title}</div>
    </div>
    <div class="detail-header__cover">
      <DetailCover image={cover} alt={title} />
    </div>
  {/if}

  <div class="view__content" class:view__content--detailHeader={detailHeader}>
    <div class="view__content-text">
      {#if detailHeader}
        <div class="desc">
          <slot name="desc" />
        </div>
      {/if}
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
    padding-inline: var(--padding-inline-library);
    z-index: var(--z-index-near);
  }

  .view__content-text {
    background-color: var(--color-primary);
  }

  .right {
    display: flex;
  }

  .detail-header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    height: var(--height-detail-header);
    padding-inline-start: var(--padding-inline-library);
    background-color: var(--navigating-rgb);
    transition: background-color var(--transition-background);
    z-index: var(--z-index-nearest);
  }

  .detail-header__title {
    max-width: 20ch;
    margin-inline: auto;
    margin-block-start: 0.4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transform: translate3d(-5%, 0, 0);
  }

  .view__content--detailHeader {
    background-color: var(--navigating-rgb);
  }

  .detail-header__cover {
    position: sticky;
    top: var(--height-detail-header);
    width: var(--size-detail-cover);
    left: 50%;
    transform: translate3d(-50%, calc(-1 * var(--height-detail-header) / 2), 0);
    z-index: var(--z-index-nearest);
  }

  .desc {
    /* padding-block-start: calc(var(--size-detail-cover) - 2.2rem); */
    background: #761914;
    background: #121212;
    background: linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(118, 25, 20, 1) 100%);
  }
</style>
