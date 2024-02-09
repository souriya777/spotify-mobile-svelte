<script>
  export let src;
  export let alt;
  export let radius = false;
  export let bubble = false;
</script>

<img {src} {alt} class:radius class:bubble />

<style>
  img {
    height: 100%;
  }

  .radius {
    border-radius: var(--border-radius-image-mini);
  }

  .bubble {
    border-radius: 50%;
  }
</style>
