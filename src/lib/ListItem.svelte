<script>
  import { trackUri, playing, forbiddenContextUri, contextUri, clearRecentSearch } from '@js/store';
  import ImgMini from '@lib/ImgMini.svelte';
  import DefaultArtistSvg from '@lib/svg/DefaultArtistSvg.svelte';
  import AnimatedEqualizer from './AnimatedEqualizer.svelte';
  import { onMount } from 'svelte';
  import Svg from '@lib/svg/Svg.svelte';

  export let uri;
  export let title;
  export let owner = '';
  /** @type {import('@js/spotify').SpotifyImage[]} */
  export let images = [];
  export let imageAlt = '';
  export let callbackFn;
  export let bubbleImage = false;
  export let hideImage = false;
  export let hasClear = false;

  let isDeactivateBecauseForbidden = false;

  $: isCurrentlyPlaying = $trackUri === uri;

  onMount(() => {
    isDeactivateBecauseForbidden = $forbiddenContextUri.find((uri) => uri === $contextUri) != null;
  });

  function handleClick() {
    if (!isDeactivateBecauseForbidden) {
      callbackFn?.();
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
  class="list-item"
  class:hideImage
  class:bubbleImage
  class:isDeactivateBecauseForbidden
  on:click={handleClick}
>
  {#if !hideImage}
    <div class="img">
      {#if bubbleImage}
        <ImgMini {images} alt={imageAlt} bubble={true}>
          <svelte:fragment slot="empty-img">
            <DefaultArtistSvg />
          </svelte:fragment>
        </ImgMini>
      {:else}
        <ImgMini {images} alt={imageAlt} />
      {/if}
    </div>
  {/if}

  <div class="text">
    <div class="name one-row font-list__title" class:isCurrentlyPlaying>
      {#if isCurrentlyPlaying}
        <AnimatedEqualizer pause={!$playing} />
      {/if}
      {title}
    </div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="owner one-row font-list__owner">{@html owner}</div>
  </div>

  {#if hasClear}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="cross" on:click|stopPropagation={() => clearRecentSearch(uri)}>
      <Svg name="cross" size={16} />
    </div>
  {/if}
</li>

<style>
  .list-item {
    display: flex;
    align-items: center;
    padding-block-end: var(--padding-inline-view-content);
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    padding-inline-start: 1rem;
  }

  .owner {
    color: var(--color-tertiary);
  }

  .isCurrentlyPlaying {
    color: var(--color-accent);
  }

  .isDeactivateBecauseForbidden {
    opacity: 0.4;
  }

  .cross {
    color: var(--color-tertiary);
  }
</style>
