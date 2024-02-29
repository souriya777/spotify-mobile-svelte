<script>
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import {
    isNavigatingHasPriority,
    navigatingRgb,
    navigatingPriorityRgb,
    scrollTop,
    fixedTopComponent,
  } from '@js/store';
  import { lightenDarkenColor } from '@js/palette-utils';
  import DetailCover from '@lib/DetailCover.svelte';
  import DetailPlayPause from '@lib/DetailPlayPause.svelte';
  import DetailActions from '@lib/DetailActions.svelte';
  import DetailCoverArtist from '@/lib/DetailCoverArtist.svelte';
  import DetailHeader from '@lib/DetailHeader.svelte';
  import DetailTitleArtist from '@lib/DetailTitleArtist.svelte';

  export let title = '';
  /** @type {import('@js/spotify').SpotifyImage[]}*/
  export let images;
  export let isArtist = false;

  const NB_PX_BEFORE_CHANGE_HEADER_BACKGROUND = 30;
  const MARGIN_BLOCK_START_DESC_PX = 20;

  /** @type {HTMLElement} */
  let DESC_HTML;
  /** @type {HTMLElement} */
  let GRADIENT_HTML;
  /** @type {HTMLElement} */
  let PLAY_PAUSE_BUTTON_HTML;
  /** @type {HTMLElement} */
  let ARTIST_TITLE_HTML;

  let DESC_HEIGHT = 0;
  let GRADIENT_HEIGHT = 0;
  let PLAY_PAUSE_BUTTON_HEIGHT = 0;
  let fakePlayPauseStyle = '';
  let imgHeight;
  let lightColorRgb;
  let darkColorRgb;
  let backgroundColorRgb;
  let titleArtistHeight;

  $: if ($navigatingRgb) {
    lightColorRgb = $navigatingRgb;
    darkColorRgb = lightenDarkenColor($navigatingRgb);
  }

  $: HEADER_HEIGHT_PX =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--height-detail-header'),
    ) * 10;
  $: HALF_PLAY_PAUSE_BUTTON_HEIGHT = PLAY_PAUSE_BUTTON_HEIGHT / 2;
  $: COVER_HEIGHT = isArtist
    ? imgHeight - HEADER_HEIGHT_PX - titleArtistHeight
    : imgHeight + MARGIN_BLOCK_START_DESC_PX;
  $: canDarkenHeaderBackground = $scrollTop >= NB_PX_BEFORE_CHANGE_HEADER_BACKGROUND;
  $: titleReachedHeader = $scrollTop >= COVER_HEIGHT;
  const BACK_BUTTON_TRANSITION_NB_PX = 35;
  // $: titleNearHeaderBegin =
  //   imgHeight - HEADER_HEIGHT_PX - titleArtistHeight - BACK_BUTTON_TRANSITION_NB_PX;
  $: titleNearHeaderBegin =
    imgHeight - HEADER_HEIGHT_PX - titleArtistHeight - BACK_BUTTON_TRANSITION_NB_PX;
  $: titleNearHeaderEnd = titleNearHeaderBegin + BACK_BUTTON_TRANSITION_NB_PX;
  $: initialTranslateYPlayPause = GRADIENT_HEIGHT - PLAY_PAUSE_BUTTON_HEIGHT;
  $: canDisplayFakePlayPauseButton = !isArtist && $scrollTop >= initialTranslateYPlayPause;
  $: scrollY = $scrollTop - COVER_HEIGHT;
  $: scrollTopTitle = $scrollTop - COVER_HEIGHT;
  $: console.log('scrollY', scrollY, '$scrollTop', $scrollTop, 'COVER_HEIGHT', COVER_HEIGHT);
  $: playPauseButtonToHeaderBarHeight =
    imgHeight - HEADER_HEIGHT_PX + PLAY_PAUSE_BUTTON_HEIGHT - $scrollTop;
  $: startFake = imgHeight - HEADER_HEIGHT_PX - $scrollTop;
  $: canAnimateFakePlayPause = startFake <= 0 && startFake >= -HALF_PLAY_PAUSE_BUTTON_HEIGHT;
  // $: console.log(
  //   '$scrollTop',
  //   $scrollTop,
  //   'HEADER_HEIGHT_PX',
  //   HEADER_HEIGHT_PX,
  //   'playPauseButtonToHeaderBarHeight',
  //   playPauseButtonToHeaderBarHeight,
  //   'startFake',
  //   startFake,
  //   'canAnimate',
  //   titleReachedHeader,
  //   'canAnimateFakePlayPause',
  //   `${canAnimateFakePlayPause ? '🟢' : '🔴'}`,
  // );

  $: if (canDarkenHeaderBackground) {
    backgroundColorRgb = darkColorRgb;
    $navigatingPriorityRgb = darkColorRgb;
  } else {
    backgroundColorRgb = lightColorRgb;
    $navigatingPriorityRgb = null;
  }

  $: if (isArtist) {
    $fixedTopComponent = {
      viewName: 'DetailHeaderBar',
      props: {
        title,
        // FIXME TODO here the bug
        scrollY: playPauseButtonToHeaderBarHeight,
        scrollTopTitle,
        backgroundColorRgb,
        // FIXME to delete canAnimate ?
        canAnimate: titleReachedHeader,
        titleReachedHeader,
        scrollTopBegin: titleNearHeaderBegin,
        scrollTopEnd: titleNearHeaderEnd,
        canAnimateFakePlayPause,
        floating: true,
      },
    };
  }

  $: style = `
    --color-gradient-1: rgb(${lightColorRgb});
    --color-gradient-2: rgb(${darkColorRgb});
    --height-desc: -${DESC_HEIGHT}px;
    --margin-block-start-desc: ${MARGIN_BLOCK_START_DESC_PX}px;
  `;

  $: if (canDisplayFakePlayPauseButton) {
    const translateY = Math.min(
      $scrollTop - initialTranslateYPlayPause,
      HALF_PLAY_PAUSE_BUTTON_HEIGHT,
    );
    fakePlayPauseStyle = `transform: translate3d(0, -${translateY}px, 0)`;
  }

  onMount(() => {
    $isNavigatingHasPriority = true;
  });

  onDestroy(() => {
    $isNavigatingHasPriority = false;
    $fixedTopComponent = null;
  });

  afterUpdate(() => {
    if (DESC_HTML) {
      DESC_HEIGHT = DESC_HTML.clientHeight || 0;
    }
    if (GRADIENT_HTML) {
      GRADIENT_HEIGHT = GRADIENT_HTML.clientHeight || 0;
    }
    if (PLAY_PAUSE_BUTTON_HTML) {
      PLAY_PAUSE_BUTTON_HEIGHT = PLAY_PAUSE_BUTTON_HTML.clientHeight || 0;
    }
  });
</script>

<div class="view" {style}>
  {#if isArtist}
    <div class="sticky-cover-artist">
      <DetailCoverArtist
        {images}
        alt={title}
        {backgroundColorRgb}
        on:imgHeight={(e) => (imgHeight = e.detail)}
      />
    </div>
  {:else}
    <DetailHeader {title} {scrollY} {scrollTopTitle} {backgroundColorRgb} {titleReachedHeader} />
  {/if}

  {#if canDisplayFakePlayPauseButton}
    <div class="fake-play-pause" style={fakePlayPauseStyle}>
      <DetailPlayPause />
    </div>
  {/if}

  <div class="gradient" bind:this={GRADIENT_HTML}>
    {#if !isArtist}
      <div class="sticky-cover">
        <DetailCover
          {images}
          alt={title}
          canAnimate={!titleReachedHeader}
          on:imgHeight={(e) => (imgHeight = e.detail)}
        />
      </div>
    {/if}

    <div class="desc" bind:this={DESC_HTML}>
      {#if isArtist}
        <div bind:this={ARTIST_TITLE_HTML}>
          <DetailTitleArtist
            title={`${title},${imgHeight},${HEADER_HEIGHT_PX},${titleArtistHeight}`}
            backgroundColorRgb={darkColorRgb}
            on:title-artist-height={(e) => (titleArtistHeight = e.detail)}
          />
        </div>
      {:else}
        <div class="desc__title two-rows font-2_4 font-bold line-height-1_1">
          <slot name="desc__title" />
        </div>

        <div class="two-rows font-1_3 tertiary">
          <slot name="desc__detail" />
        </div>

        <div class="desc__owner font-1_4 font-bold line-height-2_2">
          <slot name="desc__owner" />
        </div>

        <div class="desc__type-year font-1_4 line-height-2_2 tertiary">
          <slot name="desc__type-year" />
        </div>
      {/if}

      <DetailActions {isArtist} bind:PLAY_PAUSE_BUTTON_HTML />
    </div>
  </div>

  <div class="content">
    <slot />
  </div>
</div>

<style>
  .view {
    position: relative;
    padding-block-end: var(--height-nav-and-player-mini);
  }

  .sticky-cover {
    position: sticky;
    top: var(--height-detail-header);
    display: flex;
    justify-content: center;
  }

  .sticky-cover-artist {
    position: sticky;
    top: 0;
  }

  .gradient {
    background: linear-gradient(
      to bottom,
      var(--color-gradient-1) 0%,
      var(--color-gradient-2) 60%,
      var(--color-gradient-2) 80%,
      var(--color-primary) 100%
    );
    transition: background var(--transition-background);
  }

  .desc {
    background-color: transparent;
  }

  .desc,
  .content {
    position: relative;
    padding-inline: var(--padding-inline-view-content);
    z-index: var(--z-index-near);
  }

  .content {
    padding-block-end: calc(var(--height-nav) + var(--height-player-mini) + 1rem);
  }

  .desc__title {
    margin-block-start: var(--margin-block-start-desc);
  }

  .desc__owner {
    margin-block-start: 0.8rem;
  }

  .desc__type-year {
    margin-block: 1rem 0.8rem;
  }

  .fake-play-pause {
    position: sticky;
    top: var(--height-detail-header);
    right: var(--padding-inline-view-content);
    float: right;
    z-index: var(--z-index-nearest);
  }
</style>
