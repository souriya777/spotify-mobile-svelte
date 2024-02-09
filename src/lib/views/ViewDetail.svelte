<script>
  import { afterUpdate } from 'svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import { navigatingRgb, scrollTop, shuffleState, slidePrevAndRemoveForMe } from '@js/store';
  import { lightenDarkenColor } from '@js/palette-utils';
  import DetailCover from '@lib/DetailCover.svelte';
  import DetailTitle from '@lib/DetailTitle.svelte';
  import Button from '@lib/Button.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import DetailPlayPause from '@lib/DetailPlayPause.svelte';

  export let title = '';
  /** @type {import('@js/spotify').SpotifyImage}*/
  export let cover;

  const NB_PX_BEFORE_CHANGE_HEADER_BACKGROUND = 30;

  /** @type {HTMLElement} */
  let HEADER_HTML;
  /** @type {HTMLElement} */
  let DESC_HTML;
  /** @type {HTMLElement} */
  let IMG_HTML;
  /** @type {HTMLElement} */
  let GRADIENT_HTML;
  /** @type {HTMLElement} */
  let PLAY_PAUSE_BUTTON_HTML;
  let DESC_HEIGHT = 0;
  let GRADIENT_HEIGHT = 0;
  let PLAY_PAUSE_BUTTON_HEIGHT = 0;
  let FIXME_favorite = false;
  let fakePlayPauseStyle = '';

  $: IMG_HEIGHT = IMG_HTML?.clientHeight ?? 0;
  $: DARKER_COLOR = $navigatingRgb ? lightenDarkenColor($navigatingRgb, -40) : [18, 18, 18];
  $: canDarkenHeaderBackground = $scrollTop >= NB_PX_BEFORE_CHANGE_HEADER_BACKGROUND;
  $: descReachedHeader = IMG_HEIGHT != 0 && $scrollTop >= IMG_HEIGHT;
  $: headerStyle = canDarkenHeaderBackground ? `background: rgb(${DARKER_COLOR})` : '';
  $: style = `
    --color-base: rgb(${$navigatingRgb?.join(',')});
    --color-darker: rgb(${DARKER_COLOR?.join(',')});
    --height-desc: -${DESC_HEIGHT}px;
  `;
  $: HALF_PLAY_PAUSE_BUTTON_HEIGHT = PLAY_PAUSE_BUTTON_HEIGHT / 2;
  $: initialTranslateYPlayPause = GRADIENT_HEIGHT - PLAY_PAUSE_BUTTON_HEIGHT;
  $: canDisplayFakePlayPauseButton = $scrollTop >= initialTranslateYPlayPause;

  $: if (canDisplayFakePlayPauseButton) {
    const translateY = Math.min(
      $scrollTop - initialTranslateYPlayPause,
      HALF_PLAY_PAUSE_BUTTON_HEIGHT,
    );
    fakePlayPauseStyle = `transform: translate3d(0, -${translateY}px, 0)`;
  }

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
  <div class="header" style={headerStyle} bind:this={HEADER_HTML}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="back" on:click={() => $slidePrevAndRemoveForMe?.()}>
      <Svg name="back" size={16} />
    </div>
    <DetailTitle {title} canAnimate={descReachedHeader} coverHeight={IMG_HEIGHT} />
  </div>

  <div class="fake-play-pause" class:canDisplayFakePlayPauseButton style={fakePlayPauseStyle}>
    <DetailPlayPause />
  </div>

  <div class="gradient" bind:this={GRADIENT_HTML}>
    <div class="img" bind:this={IMG_HTML}>
      <DetailCover image={cover} alt={title} canAnimate={!descReachedHeader} />
    </div>

    <div class="desc" bind:this={DESC_HTML}>
      <div class="font-collection-detail-title">
        <slot name="desc__title" />
      </div>

      <div class="desc__detail two-rows font-collection-detail">
        <slot name="desc__detail" />
      </div>

      <div class="desc__owner font-collection-detail-owner">
        <slot name="desc__owner" />
      </div>

      <div class="actions">
        {#if FIXME_favorite}
          <Button
            type="secondary"
            svg="heart-full"
            hasAccent={true}
            accent={true}
            callback={() => (FIXME_favorite = false)}
          />
        {:else}
          <Button type="secondary" svg="heart" callback={() => (FIXME_favorite = true)} />
        {/if}

        <div>
          <Button
            type="secondary"
            svg="shuffle"
            svgFlexJustify="flex-start"
            accent={$shuffleState}
            bottomDot={$shuffleState}
            callback={() => SpotifyApi.shuffle()}
          />

          <div
            class="play-pause-button"
            class:canDisplayFakePlayPauseButton
            bind:this={PLAY_PAUSE_BUTTON_HTML}
          >
            <DetailPlayPause />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content">
    <slot />
  </div>
</div>

<style>
  .view {
    position: relative;
  }

  .header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    background-color: var(--navigating-rgb);
    transition: background-color var(--transition-background);
    z-index: var(--z-index-nearest);
  }

  .back {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--height-detail-header);
    padding-inline-start: var(--padding-inline-library);
  }

  .img {
    position: sticky;
    top: var(--height-detail-header);
    display: flex;
    justify-content: center;
  }

  .gradient {
    background: linear-gradient(
      to bottom,
      var(--color-base) 0%,
      var(--color-darker) 60%,
      var(--color-darker) 80%,
      var(--color-primary) 100%
    );
    transition: background var(--transition-background);
  }

  .desc {
    margin-block-start: 2rem;
    background-color: transparent;
  }

  .desc,
  .content {
    position: relative;
    padding-inline: var(--padding-inline-library);
    z-index: var(--z-index-near);
  }

  .desc__owner {
    margin-block-start: 0.8rem;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-block: 0.8rem 1.8rem;
  }

  .play-pause-button {
    display: inline-block;
  }

  .fake-play-pause {
    position: sticky;
    top: var(--height-detail-header);
    right: var(--padding-inline-library);
    display: none;
    float: right;
    z-index: var(--z-index-nearest);
  }

  .canDisplayFakePlayPauseButton.fake-play-pause {
    display: block;
  }
</style>
