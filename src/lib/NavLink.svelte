<script>
  import { currentPath } from '@js/store';

  export let label;
  export let to = '/';
  export let isActive = false;

  function goto() {
    currentPath.set(to);
    window.history.pushState({}, to, to);
  }
</script>

<a href={to} on:click|preventDefault={goto}>
  <div class="nav-item font-small" class:active={isActive}>
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
    animation: bounce 250ms cubic-bezier(0.4, 0, 0.23, 1);
  }

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
