<script>
  export let imgUrl = null;
  export let imgHeight = 50;
  export let imgWidth = 50;
  export let imgAlt = '';
  export let title;
  export let author = null;
</script>

<div class="preview-summary">
  {#if imgUrl}
    <img src={imgUrl} alt={imgAlt} height={imgHeight} width={imgWidth} />
  {/if}
  <span class="text">
    {title}
    {#if author}
      <small>{author}</small>
    {/if}
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
    max-height: 50px;
  }
</style>
