<script>
  import { addView, addAndSlideNextForMe } from '@js/store';
  import { createPlaylistView } from '@js/view-utils';
  import ImageMini from '@lib/ImageMini.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist} */
  export let item;

  function goPlaylist() {
    console.log('goPlaylist', item?.id, $addAndSlideNextForMe);
    const view = createPlaylistView(item.id);
    addView(view);
    $addAndSlideNextForMe();
  }
</script>

<div class="playlist-item" on:click={goPlaylist} on:keyup={goPlaylist} role="button" tabindex="0">
  <ImageMini images={item?.images} alt={item?.name} />
  <div class="text">
    <div class="name font-playlist-mini--title">{item?.name}</div>
    <div class="owner font-playlist-mini--owner">{item?.owner?.display_name}</div>
  </div>
</div>

<style>
  .playlist-item {
    display: flex;
    padding-block: 1rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline-start: 1rem;
  }

  .owner {
    color: var(--color-tertiary);
  }
</style>
