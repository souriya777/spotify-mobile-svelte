<script>
  import Svg from '@lib/svg/Svg.svelte';

  export let callback;
  export let canCallback = true;
  export let type = '';
  export let svg = null;
  export let svgSize = 24;
  export let svgViewbox = '0 0 24 24';
  export let svgFlexJustify = 'center';
  export let filled = false;
  export let hasAccent = true;
  export let accent = false;
  export let reverseAccent = false;
  export let bubble = false;
  export let bubbleMini = false;
  export let bottomDot = false;

  $: style = `--align-svg: ${svgFlexJustify}`;

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
  class:reverseAccent
  class:filled
  class:bubble
  class:bubbleMini
  class:bottomDot
  class:bottomDot--left={svgFlexJustify === 'flex-start'}
  {style}
  on:click|stopPropagation={handleClick}
>
  {#if svg}
    <span class="icon">
      <Svg name={svg} size={svgSize} viewBox={svgViewbox} />
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

  .filled {
    border-radius: 1.8rem;
    padding: 0.2rem 1.8rem;
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
  }

  .bubble {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    height: var(--size-bubble-button);
    width: var(--size-bubble-button);
    border-radius: 50%;
  }

  .bubbleMini {
    height: var(--size-bubble-button-mini);
    width: var(--size-bubble-button-mini);
  }

  .accent {
    color: var(--color-accent);
  }

  .filled.accent {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
  }

  .reverseAccent {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
  }

  .bottomDot .icon {
    position: relative;
  }

  .bottomDot--left .icon {
    float: left;
  }

  .bottomDot .icon::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    height: 0.4rem;
    width: 0.4rem;
    transform: translate3d(-50%, 0, 0);
    border-radius: 50%;
    background-color: currentcolor;
  }
</style>
