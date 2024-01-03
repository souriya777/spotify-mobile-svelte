<script>
  import Svg from '@lib/svg/Svg.svelte';

  export let callback;
  export let type = '';
  export let svg = null;
  export let filled = false;
  export let hasAccent = true;
  export let accent = false;

  function handleClick() {
    callback();

    if (hasAccent) {
      accent = !accent;
    }
  }
</script>

<button type="button" class={type} class:accent class:filled on:click={handleClick}>
  {#if svg}
    <span class="icon">
      <Svg name={svg} />
    </span>
  {/if}

  <span class="text">
    <slot />
  </span>
</button>

<style>
  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .accent {
    color: var(--color-accent);
  }

  .filled {
    border-radius: 1.8rem;
    padding: 0.2rem 1.8rem;
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
  }

  .filled.accent {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
  }
</style>
