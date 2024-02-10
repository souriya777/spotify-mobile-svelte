<script>
  import { displayFilter } from '@js/store';
  import Button from '@lib/Button.svelte';

  export let hasArtists = false;
  export let hasPlaylists = false;
  export let hasAlbums = false;
  export let callback = null;

  const BUTTON_MARGIN_INLINE_END_PX = 8;

  /** @type {HTMLElement} */
  let CLOSE_HTML;
  /** @type {HTMLElement} */
  let PLAYLIST_HTML;
  /** @type {HTMLElement} */
  let ALBUM_HTML;

  $: CLOSE_WIDTH = CLOSE_HTML?.clientWidth ?? 0;
  $: PLAYLIST_WIDTH = PLAYLIST_HTML?.clientWidth ?? 0;
  $: ALBUM_WIDTH = ALBUM_HTML?.clientWidth ?? 0;
  $: TRANSLATE_PLAYLIST = CLOSE_WIDTH + BUTTON_MARGIN_INLINE_END_PX;
  $: TRANSLATE_ALBUM = PLAYLIST_WIDTH + BUTTON_MARGIN_INLINE_END_PX;
  $: TRANSLATE_ARTIST = TRANSLATE_ALBUM + ALBUM_WIDTH + 2 * BUTTON_MARGIN_INLINE_END_PX;
  $: style = `
  --button-margin-inline-end: ${BUTTON_MARGIN_INLINE_END_PX}px;
  --translate-playlist: ${TRANSLATE_PLAYLIST}px;
  --translate-album: ${TRANSLATE_ALBUM}px;
  --translate-artist: ${TRANSLATE_ARTIST}px;
  --transition-transform: cubic-bezier(0.12, 0.68, 0.44, 0.95);
  --transition-opacity: cubic-bezier(0.26, 0.74, 0.39, 0.99);
  `;

  $: atLeastOneActive = $displayFilter.atLeastOneActive;
  $: playlistActive = $displayFilter.playlistActive;
  $: albumActive = $displayFilter.albumActive;
  $: artistActive = $displayFilter.artistActive;

  function close() {
    callback?.();
    displayFilter.filterNone();
  }

  $: togglePlaylist = () => {
    callback?.();

    if (playlistActive) {
      displayFilter.filterNone();
    } else {
      displayFilter.filterPlaylistOnly();
    }
  };
  $: toggleAlbum = () => {
    callback?.();

    if (albumActive) {
      displayFilter.filterNone();
    } else {
      displayFilter.filterAlbumOnly();
    }
  };
  $: toggleArtist = () => {
    callback?.();

    if (artistActive) {
      displayFilter.filterNone();
    } else {
      displayFilter.filterArtistOnly();
    }
  };
</script>

<ul
  class="no-scrollbar"
  class:atLeastOneActive
  class:playlistActive
  class:albumActive
  class:artistActive
  {style}
>
  <li class="close" bind:this={CLOSE_HTML}>
    <Button
      type="secondary"
      svg="cross"
      svgSize={14}
      hasAccent={false}
      bubbleNano={true}
      callback={close}
    ></Button>
  </li>

  {#if hasPlaylists}
    <li class="playlist" bind:this={PLAYLIST_HTML}>
      <Button
        filled={true}
        hasAccent={playlistActive}
        accent={playlistActive}
        callback={togglePlaylist}
      >
        Playlists
      </Button>
    </li>
  {/if}

  {#if hasAlbums}
    <li class="album" bind:this={ALBUM_HTML}>
      <Button filled={true} hasAccent={albumActive} accent={albumActive} callback={toggleAlbum}>
        Albums
      </Button>
    </li>
  {/if}

  {#if hasArtists}
    <li class="artist" bind:this={ALBUM_HTML}>
      <Button filled={true} hasAccent={artistActive} accent={artistActive} callback={toggleArtist}>
        Artists
      </Button>
    </li>
  {/if}
</ul>

<style>
  ul {
    position: relative;
    display: flex;
    align-items: center;
    height: 3.2rem;
    overflow-x: scroll;
  }

  li {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    margin-inline-end: var(--button-margin-inline-end);
  }

  .playlist {
    transform: translateX(0);
  }
  .album {
    transform: translateX(var(--translate-album));
  }

  .artist {
    transform: translateX(var(--translate-artist));
  }

  .playlistActive .playlist,
  .albumActive .album,
  .artistActive .artist {
    transform: translateX(var(--translate-playlist));
  }

  .close,
  .playlist,
  .album,
  .artist {
    transition:
      transform 0.6s var(--transition-transform),
      opacity 0.3s var(--transition-opacity);
  }

  .close,
  .atLeastOneActive:not(.playlistActive) .playlist,
  .atLeastOneActive:not(.albumActive) .album,
  .atLeastOneActive:not(.artistActive) .artist {
    opacity: 0;
    z-index: var(--z-index-far);
  }

  .atLeastOneActive .close {
    opacity: 1;
    z-index: var(--z-index-near);
  }

  .playlistActive .close {
    transition-delay: 0.2s;
  }
</style>
