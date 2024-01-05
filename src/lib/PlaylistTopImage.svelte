<script>
  // import { scrollTop } from '@js/store';
  import ImageSolver from '@lib/ImageSolver.svelte';

  /** @type {import('@js/spotify').SpotifyImage[]}*/
  export let images;
  export let alt;

  let img;

  // const Y_OFFSET = 161;

  $: if (img) {
    // const scale = 1 - ($scrollTop / Y_OFFSET) * 0.33;
    // const opacity = 1 - ($scrollTop / Y_OFFSET) * 1.5;

    img.style.transform = `scale($ {
      scale
    }

  )`;

    img.style.opacity = `$ {
    opacity
  }

  `;
  }
</script>

<div class="top-image">
  <div class="img" bind:this={img}><ImageSolver {images} {alt} isDetailImg={true} /></div>
</div>

<style>
  .top-image {
    position: relative;
    display: flex;
    justify-content: center;
    margin-inline: auto;
    padding-block: 20px;
  }

  .top-image .img {
    position: absolute;
  }
</style>
