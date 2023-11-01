<script>
  import NoteSvg from '@/lib/svg/NoteSvg.svelte';
  import DefaultArtistSvg from '@/lib/svg/DefaultArtistSvg.svelte';

  /** @type {import('@/js/spotify').SpotifyImage[]} */
  export let images;
  export let alt;
  export let isArtist = false;

  /** @type {import('@/js/spotify').SpotifyImage} */
  let image = null;

  // {@const image = list?.images?.at(-1)}
  if (images) {
    // look for 300 width image
    image = images.find((img) => img.width === 300);

    // if no, take the first
    if (!image) {
      image = images.at(0);
    }
  }
</script>

{#if image}
  <img src={image.url} {alt} height={image.height} width={image.width} />
{:else if isArtist}
  <div class="empty-img-artist" aria-label={alt}>
    <DefaultArtistSvg />
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

  .empty-img {
    display: grid;
    place-items: center;
    background-color: var(--color-bg-spotify-preview-img);
    color: var(--color-preview-image-note);
  }

  .empty-img-artist {
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: var(--color-bg-spotify-preview-img);
  }
</style>
