<script>
  import { userPictureUrl } from '@js/store';
  export let title = '';

  $: style = `--picture-url: ${$userPictureUrl};`;
</script>

<header {style}>
  <!-- <div class="img">
    <img src={$userPictureUrl} alt={$userDisplayName} />
  </div> -->
  <div class="img" style={`background-image: url(${$userPictureUrl})`}></div>
  <div class="title">{title}</div>
</header>

<style>
  header {
    display: flex;
    margin: 3rem;
  }

  .img {
    height: 34px;
    width: 34px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .title {
    background-color: aqua;
  }
</style>
