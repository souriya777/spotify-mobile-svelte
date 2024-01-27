<script>
  import Svg from '@lib/svg/Svg.svelte';

  export let callback;
  export let canCallback = true;
  export let type = '';
  export let svg = null;
  export let flexJustifySvg = 'center';
  export let filled = false;
  export let hasAccent = true;
  export let accent = false;
  export let bubble = false;
  export let bottomDot = false;

  $: style = `--align-svg: ${flexJustifySvg}`;

  function handleClick() {
    if (!canCallback) {
      return;
    }

    callback();

    if (hasAccent) {
      accent = !accent;
    }
  }
</script>

<button
  type="button"
  class={type}
  class:accent
  class:filled
  class:bubble
  class:bottomDot
  {style}
  on:click|stopPropagation={handleClick}
>
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
    height: var(--size-button);
    width: var(--size-button);
    padding-inline: unset;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .icon {
    display: flex;
    justify-content: var(--align-svg);
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

  .bubble {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    height: 5.6rem;
    width: 5.6rem;
    border-radius: 50%;
  }

  .bottomDot {
    position: relative;
  }

  .bottomDot::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 0.4rem;
    width: 0.4rem;
    transform: translate3d(-50%, 0, 0);
    border-radius: 50%;
    background-color: currentcolor;
  }
</style>
