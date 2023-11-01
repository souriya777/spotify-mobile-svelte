<script>
  import NoteSvg from '@/lib/svg/NoteSvg.svelte';

  /** @type {import('@/js/spotify').SpotifyImage[]} */
  export let images;

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
  <img src={image.url} alt={'FIXME'} height={image.height} width={image.width} />
{:else}
  <div class="empty-img">
    <NoteSvg />
  </div>
{/if}

<style>
  img,
  .empty-img {
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
</style>
