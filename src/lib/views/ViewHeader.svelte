<script>
  import { userPictureUrl } from '@js/store';
  export let title = '';

  $: style = `--picture-url: ${$userPictureUrl};`;
</script>

<header {style}>
  <div class="top">
    <div class="left">
      <div class="img" style={`background-image: url(${$userPictureUrl})`}></div>
      <div class="title font-title">{title}</div>
    </div>

    <slot name="right" />
  </div>

  <div class="bottom">
    <slot name="bottom" />
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    padding-block: 4rem 2rem;
    padding-inline: var(--padding-inline-library);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  }

  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .bottom {
    margin-block-start: 1rem;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .img {
    height: 3.4rem;
    width: 3.4rem;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .title {
    margin-inline-start: 0.8rem;
  }
</style>
