<script>
  import { viewName as viewNameStore, eventBus } from '@js/store';
  import { getTimestamp } from '@js/date-utils';
  import { goRootView } from '@js/view-utils';

  export let label;
  export let viewName;
  export let isActive = false;

  $: style = `--animation: 250ms cubic-bezier(0.4, 0, 0.23, 1)`;

  /** @type {HTMLElement} */
  let ANIMATION_HTML;
  let bounce = false;
  let isAnimationPlayed = false;

  function goto() {
    const IS_NAV_SEARCH_DOUBLE_CLICKED = $viewNameStore === viewName && viewName === 'search';
    console.log('goto', $viewNameStore, viewName, IS_NAV_SEARCH_DOUBLE_CLICKED);
    bounce = true;
    isAnimationPlayed = false;
    $viewNameStore = viewName;
    goRootView();

    if (IS_NAV_SEARCH_DOUBLE_CLICKED) {
      eventBus.set({
        type: 'search-input-focus-event',
        data: {
          timestamp: getTimestamp(),
        },
      });
    }
  }

  function animationend() {
    if (bounce) {
      isAnimationPlayed = true;
    }

    ANIMATION_HTML.style.animation = ``;
    bounce = false;
  }
</script>

<a href="/" on:click|preventDefault={goto}>
  <div
    bind:this={ANIMATION_HTML}
    class="nav-item font-small"
    class:active={isActive}
    class:isAnimationPlayed
    class:bounce
    {style}
    on:animationend={animationend}
  >
    {#if isActive}
      <slot name="selected-icon" />
    {:else}
      <slot />
    {/if}

    {label}
  </div>
</a>

<style>
  a {
    text-decoration: none;
    color: inherit;
    color: var(--color-tertiary);
  }

  .nav-item {
    display: grid;
    place-items: center;
  }

  .nav-item.active {
    color: var(--color-secondary);
    animation: active-bounce var(--animation);
  }

  .nav-item.active.isAnimationPlayed {
    animation-play-state: paused;
  }

  .nav-item.bounce {
    animation: bounce var(--animation);
  }

  /* DUPLICATED animation ! */
  @keyframes active-bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  /* DUPLICATED animation ! */
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
