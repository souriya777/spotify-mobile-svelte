<script>
  import { afterUpdate } from 'svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import { navigatingRgb, scrollTop, playing, shuffleState } from '@js/store';
  import { lightenDarkenColor } from '@js/palette-utils';
  import DetailCover from '@lib/DetailCover.svelte';
  import DetailTitle from '@lib/DetailTitle.svelte';
  import Button from '@lib/Button.svelte';
  import Svg from '@lib/svg/Svg.svelte';

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
  let DESC_HEIGHT = 0;
  let FIXME_favorite = false;

  $: IMG_HEIGHT = IMG_HTML?.clientHeight ?? 0;
  $: DARKER_COLOR = $navigatingRgb ? lightenDarkenColor($navigatingRgb, -40) : [18, 18, 18];
  $: canDarkenHeaderBackground = $scrollTop >= NB_PX_BEFORE_CHANGE_HEADER_BACKGROUND;
  $: descReachedHeader = IMG_HEIGHT != 0 && $scrollTop >= IMG_HEIGHT;
  $: headerStyle = canDarkenHeaderBackground ? `background: ${DARKER_COLOR}` : '';
  $: style = `
    --color-base: rgb(${$navigatingRgb?.join(',')});
    --color-darker: rgb(${DARKER_COLOR?.join(',')});
    --height-desc: -${DESC_HEIGHT}px;
  `;

  afterUpdate(() => {
    if (DESC_HTML) {
      DESC_HEIGHT = DESC_HTML.clientHeight || 0;
    }
  });
</script>

<div class="view" {style}>
  <div class="header" style={headerStyle} bind:this={HEADER_HTML}>
    <div class="back">
      <Svg name="back" size={16} />
    </div>
    <DetailTitle {title} canAnimate={descReachedHeader} coverHeight={IMG_HEIGHT} />
  </div>

  <div class="gradient">
    <div class="img" bind:this={IMG_HTML}>
      <DetailCover image={cover} alt={title} canAnimate={!descReachedHeader} />
    </div>

    <div class="desc" bind:this={DESC_HTML}>
      <div class="font-collection-detail-title">
        <slot name="desc__title" />
      </div>

      <div class="desc__detail font-collection-detail">
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

          {#if $playing}
            <Button
              type="primary"
              svg="pause"
              reverseAccent={true}
              bubble={true}
              bubbleMini={true}
              callback={() => SpotifyApi.pause()}
            ></Button>
          {:else}
            <Button
              type="primary"
              svg="play"
              reverseAccent={true}
              bubble={true}
              bubbleMini={true}
              callback={() => SpotifyApi.play()}
            ></Button>
          {/if}
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

  .desc__detail {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .desc__owner {
    margin-block-start: 0.8rem;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-block: 0.8rem 1.8rem;
  }
</style>
