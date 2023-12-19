<script>
  import NoteSvg from '@lib/svg/NoteSvg.svelte';
  import DefaultArtistSvg from '@lib/svg/DefaultArtistSvg.svelte';
  import ColorThief from 'colorthief';
  import Logger from '@js/Logger';

  const LOGGER = Logger.getNewInstance('ImageSolver.js');

  /** @type {import('@/js/spotify').SpotifyImage[]} */
  export let images;
  export let alt;
  export let isArtist = false;
  export let isDetailImg = false;

  /** @type {import('@/js/spotify').SpotifyImage} */
  let calculatedImg = null;
  let bindImg;

  $: if (images) {
    // look for 300 width image
    calculatedImg = images.find((img) => img.width === 300);

    // if no, take the first
    if (!calculatedImg) {
      calculatedImg = images.at(0);
    }
  }

  $: {
    if (bindImg) {
      const totoImg = bindImg;
      // const colorThief = new ColorThief();

      // LOGGER.log('-->', totoImg);

      if (totoImg?.complete) {
        // LOGGER.log('complete', totoImg, '🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢');
        // const color = colorThief.getColor(totoImg);
        // LOGGER.log(color, '🟢🟢🟢');
      } else {
        // LOGGER.log('INcomplete', '🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙');
        // totoImg.addEventListener('load', function () {
        //   //   colorThief.getColor(totoImg);
        //   LOGGER.log('LOAD', '🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙');
        // });
      }
    }
  }

  let dominantColor;

  function getDominantColor() {
    LOGGER.log('🔥🔥🔥', this, bindImg);
    const colorThief = new ColorThief();
    const color = colorThief.getColor(bindImg);
    LOGGER.log(color, '🟢🟢🟢');
    dominantColor = `background-color: rgb(${color?.[0]},${color?.[1]},${color?.[2]});`;
  }
</script>

{#if calculatedImg && !isDetailImg}
  <img src={calculatedImg.url} {alt} height={calculatedImg.height} width={calculatedImg.width} />
{:else if calculatedImg && isDetailImg}
  <!-- FIXME img dominant color -->
  <div class="testo" style={dominantColor}>❤️</div>
  <img
    class="isDetailImg"
    src={calculatedImg.url}
    {alt}
    height={calculatedImg.height}
    width={calculatedImg.width}
    crossorigin="anonymous"
    bind:this={bindImg}
    on:load={getDominantColor}
  />
{:else if isArtist}
  <div class="empty-img-artist" aria-label={alt}>
    <DefaultArtistSvg />
  </div>
{:else if isDetailImg}
  <div class="empty-img isDetailImg" aria-label={alt}>
    <NoteSvg size={64} />
  </div>
{:else}
  <div class="empty-img" aria-label={alt}>
    <NoteSvg />
  </div>
{/if}

<style>
  img,
  .empty-img,
  .empty-img-artist {
    width: var(--size-image-preview-collection);
    height: var(--size-image-preview-collection);
    border-radius: 4px;
    object-fit: cover;
  }

  img {
    display: inline-block;
  }

  .testo {
    height: 150px;
    width: 150px;
    background: white;
  }

  .empty-img {
    display: grid;
    place-items: center;
    background-color: var(--color-bg-spotify-preview-img);
    color: var(--color-preview-image-note);
  }

  .isDetailImg {
    width: var(--size-image-detail-collection);
    height: var(--size-image-detail-collection);
  }

  .empty-img-artist {
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: var(--color-bg-spotify-preview-img);
  }
</style>
