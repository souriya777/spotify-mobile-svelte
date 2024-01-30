<script>
  import { trackName, artistsDisplay, playingRgb, trackUri } from '@js/store';

  export let customStyle = '';

  const SPEED_RATIO = 17;
  const SPEED_RATIO_SMALL = 10;
  const BACKGROUND_TRANSITION_MS = 200;

  /** @type {HTMLElement} */
  let textHtml;
  let blurColor = '';
  let oldPlayingRgb;
  $: canScroll = false;

  $: canAnimate = translateWidth > 0;
  $: canScrollReverse = !canScroll;
  $: visibleWidth = textHtml?.clientWidth ?? 0;
  $: totalWidth = textHtml?.scrollWidth ?? 0;
  $: translateWidth = totalWidth - visibleWidth;
  $: ratio = translateWidth > SPEED_RATIO ? SPEED_RATIO : SPEED_RATIO_SMALL;
  $: animationDuration = Math.trunc(translateWidth / ratio);

  $: style = `
    ${blurColor};
    --translate-width: -${translateWidth}px;
    --animation-duration: ${animationDuration}s;
    ${customStyle};
  `;

  $: if (oldPlayingRgb !== $playingRgb) {
    oldPlayingRgb = $playingRgb;
  }

  $: if ($playingRgb) {
    /**
     * 🙏 we can't make transition on background gradient...
     */
    blurColor = `
        --color-blur-start: transparent;
        --color-blur-end: transparent;
        `;
    setTimeout(() => {
      blurColor = `
        --color-blur-start: rgba(${$playingRgb.join(',')}, 0.9);
        --color-blur-end: rgba(${$playingRgb.join(',')}, 0.1);
        `;
    }, BACKGROUND_TRANSITION_MS);
  }

  function observeText(node) {
    const observeFn = (entries) => {
      entries.forEach((entry) => {
        canScroll = entry.isIntersecting;
      });
    };
    return observeScroll(node, observeFn);
  }

  function observeScroll(node, observeFn) {
    const observer = new IntersectionObserver(observeFn, { threshold: 0 });
    observer.observe(node);
    return {
      destroy: () => observer.disconnect(),
    };
  }

  function animationend() {
    canScroll = !canScroll;
  }
</script>

{#key $playingRgb || $trackUri}
  <div class="scrolling-text" {style} use:observeText>
    <div
      class="text"
      class:canAnimate
      class:canScroll={canAnimate && canScroll}
      class:canScrollReverse={canAnimate && canScrollReverse}
      bind:this={textHtml}
      on:animationend={animationend}
    >
      {#if $trackName && $artistsDisplay}
        <slot />
      {/if}
    </div>
    <div class="bottom">
      <slot name="bottom" />
    </div>
  </div>
{/key}

<style>
  .scrolling-text {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .scrolling-text::before,
  .scrolling-text::after {
    position: absolute;
    content: '';
    height: 100%;
    width: var(--width-scrolling-text-blur);
    z-index: var(--z-index-nearest);
  }

  .scrolling-text::before {
    left: 0;
    background-image: linear-gradient(
      to right,
      var(--color-blur-start) 45%,
      var(--color-blur-end) 90%
    );
  }

  .scrolling-text::after {
    right: 0;
    background-image: linear-gradient(
      to left,
      var(--color-blur-start) 45%,
      var(--color-blur-end) 90%
    );
  }

  .text {
    display: flex;
    padding-inline-start: calc(var(--width-scrolling-text-blur));
    white-space: nowrap;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .bottom {
    padding-inline-start: calc(var(--width-scrolling-text-blur) - 0.3rem);
  }

  .canAnimate {
    animation-duration: var(--animation-duration);
    animation-delay: 2s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }

  .canScroll {
    animation-name: scrollText;
  }

  .canScrollReverse {
    animation-name: scrollTextReverse;
    animation-fill-mode: backwards;
  }

  @keyframes scrollText {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(var(--translate-width), 0, 0);
    }
  }

  @keyframes scrollTextReverse {
    from {
      transform: translate3d(var(--translate-width), 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
