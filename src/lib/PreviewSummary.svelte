<script>
  export let imgUrl;
  export let imgHeight = 50;
  export let imgWidth = 50;
  export let imgAlt;
  export let title;
  export let author;
</script>

<div class="preview-summary">
  <img src={imgUrl} alt={imgAlt} height={imgHeight} width={imgWidth} />
  <span class="text">
    {title}
    <small>{author}</small>
  </span>
</div>

<style>
  .preview-summary {
    display: flex;
  }

  .text {
    display: flex;
    flex-direction: column;
  }

  img {
    display: inline-block;
    max-width: 50px;
    height: auto;
  }
</style>
