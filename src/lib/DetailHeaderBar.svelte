<script>
  import DetailTitle from '@lib/DetailTitle.svelte';
  import DetailHeaderBackButton from '@lib/DetailHeaderBackButton.svelte';
  import DetailPlayPause from '@lib/DetailPlayPause.svelte';

  export let title;
  // FIXME usefull
  export let scrollY;
  export let scrollTopTitle;
  export let titleReachedHeader;
  export let scrollTopBegin;
  export let scrollTopEnd;
  export let backgroundColorRgb;
  export let canAnimateFakePlayPause = false;
  export let floating = false;

  let y;

  $: color = floating && !titleReachedHeader ? 'transparent' : `rgb(${backgroundColorRgb});`;
  $: style = `background-color: ${color}`;

  /** @type {HTMLElement} */
  let PLAY_PAUSE_BUTTON_HTML;
  // let PLAY_PAUSE_BUTTON_HEIGHT = 48;
  $: PLAY_PAUSE_BUTTON_HEIGHT = PLAY_PAUSE_BUTTON_HTML?.clientHeight ?? 0;
  $: console.log('🟢', PLAY_PAUSE_BUTTON_HEIGHT);
  // $: if (scrollY) {
  $: if (canAnimateFakePlayPause) {
    // y = scrollY;
    y = scrollTopTitle;
  }
  $: fakeButtonStyle = `--translate-y-fake-button: ${y}px`;
</script>

<div class="detail-header">
  <div class="back">
    <DetailHeaderBackButton {scrollTopBegin} {scrollTopEnd} {floating} />
  </div>
  <div class="title" {style}>
    <DetailTitle {title} {titleReachedHeader} {scrollY} {scrollTopTitle} />
  </div>
  &nbsp;

  <div
    class="fake-play-pause"
    class:canAnimateFakePlayPause
    style={fakeButtonStyle}
    bind:this={PLAY_PAUSE_BUTTON_HTML}
  >
    <DetailPlayPause />
  </div>
</div>

<style>
  .detail-header {
    border: 1px dashed yellow;
    position: sticky;
    top: 0;
    height: var(--height-detail-header);
    z-index: var(--z-index-nearest);
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: var(--navigating-rgb);
    transition: background-color var(--transition-background);
  }

  .back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .fake-play-pause {
    position: absolute;
    bottom: 0;
    /* right: var(--padding-inline-view-content); */
    right: 150px;
    /* transform: translateY(50%); */
    transform: translateY(var(--translate-y-fake-button));
    display: none;
  }

  .canAnimateFakePlayPause {
    display: block;
  }
</style>
