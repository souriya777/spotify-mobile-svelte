<script>
  import { trackName, artistsDisplay, playingRgb } from '@js/store';

  export let isBig = false;

  const SCROLL_OFFSET = 1;
  const INTERVAL_MS = 60;
  const TIMEMOUT_BEFORE_SCROLL = 2000;
  const BACKGROUND_TRANSITION_MS = 200;

  /** @type {HTMLElement} */
  let titleHtml;
  let titleInterval;
  let titleBegin = true;
  let titleEnd = false;
  let oldPlayingRgb;
  let blurColor = '';
  let blurActive = false;

  $: style = `
    --width-nbsp: 0.3rem;
    --width-blur: 1rem;
    ${blurColor};
  `;

  $: if (oldPlayingRgb !== $playingRgb) {
    oldPlayingRgb = $playingRgb;
    if (titleHtml) {
      titleHtml.scrollLeft = 0;
    }
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

  $: if (titleBegin && !titleEnd) {
    scrollTitle(SCROLL_OFFSET);
  }

  $: if (titleEnd && !titleBegin) {
    scrollTitle(-SCROLL_OFFSET);
  }

  function observeTitleBegin(node) {
    observeTitle(node, (entries) => {
      titleBegin = entries[0].isIntersecting ? true : false;
    });
  }

  function observeTitleEnd(node) {
    observeTitle(node, (entries) => {
      titleEnd = entries[0].isIntersecting ? true : false;
    });
  }

  function observeTitle(node, callback) {
    const observeFn = (entries) => {
      setTimeout(() => callback(entries), TIMEMOUT_BEFORE_SCROLL);
    };
    return observeScroll(node, observeFn);
  }

  function scrollTitle(offset) {
    clearInterval(titleInterval);
    titleInterval = setInterval(() => {
      if (titleHtml) {
        titleHtml.scrollLeft += offset;
      }
    }, INTERVAL_MS);
  }

  function observeScroll(node, observeFn) {
    const observer = new IntersectionObserver(observeFn, { threshold: 0 });
    observer.observe(node);
    return {
      destroy: () => observer.disconnect(),
    };
  }
</script>

<div
  class="scrolling-title"
  class:isBig
  class:blur--active={blurActive}
  class:blur--inactive={!blurActive}
  {style}
>
  <div class="title" bind:this={titleHtml}>
    {#if $trackName && $artistsDisplay}
      {#key $playingRgb}
        <span use:observeTitleBegin>&nbsp;</span>
        <slot />
        <span use:observeTitleEnd>&nbsp;</span>
      {/key}
    {/if}
  </div>
  <div class="bottom">
    <slot name="bottom" />
  </div>
</div>

<style>
  .scrolling-title {
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .scrolling-title::before,
  .scrolling-title::after {
    content: '';
    position: absolute;
    height: 100%;
    width: var(--width-blur);
    z-index: var(--z-index-nearest);
  }

  .scrolling-title::before {
    left: 0;
    background-image: linear-gradient(
      to right,
      var(--color-blur-start) 45%,
      var(--color-blur-end) 90%
    );
  }

  .scrolling-title::after {
    right: 0;
    background-image: linear-gradient(
      to left,
      var(--color-blur-start) 45%,
      var(--color-blur-end) 90%
    );
  }

  .isBig {
    margin-inline-start: calc(-1 * var(--width-blur));
  }

  .title {
    display: flex;
    padding-inline-start: calc(var(--padding-space-player) + var(--width-nbsp));
    white-space: nowrap;
    transform: translateX(var(--translate-title));
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .bottom {
    padding-inline-start: calc(var(--padding-space-player) + var(--width-nbsp));
  }

  .isBig .bottom {
    padding-inline-start: calc(var(--width-blur));
    white-space: nowrap;
    overflow-x: scroll;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .title::-webkit-scrollbar,
  .isBig .bottom::-webkit-scrollbar {
    display: none;
  }
</style>
