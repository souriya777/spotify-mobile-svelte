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
  export let bubbleMini = false;
  export let bubbleNano = false;
  export let bubble = false || bubbleMini || bubbleNano;
  export let bottomDot = false;

  const BOTTOM_DOT_HALF_SIZE_PX = 4;
  let bottomDotStyle = '';

  $: if (bottomDot) {
    let bottomDotPosition = (svgSize - BOTTOM_DOT_HALF_SIZE_PX) / 2;
    if ('flex-end' === svgFlexJustify) {
      bottomDotPosition *= -1;
    }
    bottomDotStyle = `
    --middle-x-svg: ${bottomDotPosition}px;
    --bottomDotSize: ${BOTTOM_DOT_HALF_SIZE_PX}px;
    `;
  }

  $: style = `
    --align-svg: ${svgFlexJustify};
    ${bottomDotStyle}
  `;

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
  class:bubbleNano
  class:font-button-filled={filled}
  {style}
  on:click|stopPropagation={handleClick}
>
  {#if svg}
    <span class="icon">
      <Svg name={svg} size={svgSize} viewBox={svgViewbox} />

      {#if bottomDot}
        <div class="bottomDot"></div>
      {/if}
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
    position: relative;
    display: flex;
    justify-content: var(--align-svg);
  }

  .filled {
    height: var(--size-button-filled);
    width: unset;
    padding-inline: 1.7rem;
    border-radius: 1.8rem;
    background-color: var(--color-primary-elevated);
    color: var(--color-on-primary-elevated);
    transition:
      background-color 300ms ease,
      color 300ms ease;
  }

  .bubble {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    height: var(--size-button-bubble);
    width: var(--size-button-bubble);
    border-radius: 50%;
  }

  .bubbleMini {
    height: var(--size-button-bubble-mini);
    width: var(--size-button-bubble-mini);
  }

  .bubbleNano {
    height: var(--size-button-bubble-nano);
    width: var(--size-button-bubble-nano);
    background-color: var(--color-primary-elevated);
    color: var(--color-on-primary-elevated);
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

  .bottomDot {
    position: absolute;
    bottom: -0.8rem;
    height: var(--bottomDotSize);
    width: var(--bottomDotSize);
    border-radius: 50%;
    background-color: currentcolor;
    transform: translateX(var(--middle-x-svg));
  }
</style>
