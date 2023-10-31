<script>
  import { scrollTop } from '@/js/store';

  const Y_OFFSET = 161;
  let img;

  $: if (img) {
    const scale = 1 - ($scrollTop / Y_OFFSET) * 0.33;
    const opacity = 1 - ($scrollTop / Y_OFFSET) * 1.5;
    img.style.transform = `scale(${scale})`;
    img.style.opacity = `${opacity}`;
  }
</script>

<div class="top-image">
  <img src="/karaoke.jpeg" alt="karaoke" bind:this={img} />
</div>

<style>
  .top-image {
    position: relative;
    max-width: 150px;
    margin-inline: auto;
    padding-block: 20px;
  }

  .top-image img {
    position: absolute;
  }
</style>
