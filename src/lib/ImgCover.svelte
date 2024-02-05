<script>
  import { albumName, imageCoverUrl, screenHeight } from '@js/store';

  const MIN_PLAYER_HEIGHT_FOR_IMG = 608;
  $: isPlayerTooSmall = $screenHeight <= MIN_PLAYER_HEIGHT_FOR_IMG;
</script>

<div class="img">
  <img src={$imageCoverUrl} alt={$albumName} class:img--small={isPlayerTooSmall} />
</div>

<style>
  .img {
    align-self: center;
  }

  img {
    margin-inline: auto;
    border-radius: var(--border-radius-cover-img);
    filter: var(--shadow-cover);
  }

  .img--small {
    max-width: 80%;
    transition: max-width ease 250ms;
  }
</style>
