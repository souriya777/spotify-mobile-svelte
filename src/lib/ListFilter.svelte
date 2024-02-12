<script>
  import { afterUpdate } from 'svelte';
  import { displayFilterMyLib, displayFilterSearch } from '@js/store';
  import Button from '@lib/Button.svelte';

  export let isMyLib = true;
  export let hasPlaylists = false;
  export let hasAlbums = false;
  export let hasArtists = false;
  export let hasTracks = false;
  export let callback = null;

  const BUTTON_MARGIN_INLINE_END_PX = 8;

  /** @type {HTMLElement} */
  let CLOSE_HTML;
  /** @type {HTMLElement} */
  let LIST_FILTER_HTML;
  let FILTER_1_WIDTH = 0;
  let FILTER_2_WIDTH = 0;
  let FILTER_3_WIDTH = 0;
  let LIST_FILTERS;
  let atLeastOneActive;
  let playlistActive;
  let albumActive;
  let artistActive;
  let trackActive;
  let togglePlaylist;
  let toggleAlbum;
  let toggleArtist;
  let toggleTrack;
  let filterNone;

  $: if (isMyLib) {
    atLeastOneActive = $displayFilterMyLib.atLeastOneActive;
    playlistActive = $displayFilterMyLib.playlistActive;
    albumActive = $displayFilterMyLib.albumActive;
    artistActive = $displayFilterMyLib.artistActive;
    trackActive = $displayFilterMyLib.trackActive;
    togglePlaylist = () => toggle(playlistActive, displayFilterMyLib.filterPlaylistOnly);
    toggleAlbum = () => toggle(albumActive, displayFilterMyLib.filterAlbumOnly);
    toggleArtist = () => toggle(artistActive, displayFilterMyLib.filterArtistOnly);
    toggleTrack = () => toggle(trackActive, displayFilterMyLib.filterTrackOnly);
    filterNone = displayFilterMyLib.filterNone;
  } else {
    atLeastOneActive = $displayFilterSearch.atLeastOneActive;
    playlistActive = $displayFilterSearch.playlistActive;
    albumActive = $displayFilterSearch.albumActive;
    artistActive = $displayFilterSearch.artistActive;
    trackActive = $displayFilterSearch.trackActive;
    togglePlaylist = () => toggle(playlistActive, displayFilterSearch.filterPlaylistOnly);
    toggleAlbum = () => toggle(albumActive, displayFilterSearch.filterAlbumOnly);
    toggleArtist = () => toggle(artistActive, displayFilterSearch.filterArtistOnly);
    toggleTrack = () => toggle(trackActive, displayFilterSearch.filterTrackOnly);
    filterNone = displayFilterSearch.filterNone;
  }

  $: CLOSE_WIDTH = CLOSE_HTML?.clientWidth ?? 0;
  $: TRANSLATE_FILTER_1 = CLOSE_WIDTH + BUTTON_MARGIN_INLINE_END_PX;
  $: TRANSLATE_FILTER_2 = FILTER_1_WIDTH + BUTTON_MARGIN_INLINE_END_PX;
  $: TRANSLATE_FILTER_3 = TRANSLATE_FILTER_2 + FILTER_2_WIDTH + BUTTON_MARGIN_INLINE_END_PX;
  $: TRANSLATE_FILTER_4 = TRANSLATE_FILTER_3 + FILTER_3_WIDTH + BUTTON_MARGIN_INLINE_END_PX;
  $: PLAYLIST_FILTER = {
    type: 'playlist',
    label: 'Playlists',
    displayFlag: hasPlaylists,
    activeFlag: playlistActive,
    toggle: () => togglePlaylist(),
  };
  $: ALBUM_FILTER = {
    type: 'album',
    label: 'Albums',
    displayFlag: hasAlbums,
    activeFlag: albumActive,
    toggle: () => toggleAlbum(),
  };
  $: ARTIST_FILTER = {
    type: 'artist',
    label: 'Artists',
    displayFlag: hasArtists,
    activeFlag: artistActive,
    toggle: () => toggleArtist(),
  };
  $: TRACK_FILTER = {
    type: 'track',
    label: 'Tracks',
    displayFlag: hasTracks,
    activeFlag: trackActive,
    toggle: () => toggleTrack(),
  };
  $: LIST_FILTERS = isMyLib
    ? [PLAYLIST_FILTER, ALBUM_FILTER, ARTIST_FILTER]
    : [TRACK_FILTER, ARTIST_FILTER, ALBUM_FILTER, PLAYLIST_FILTER];
  $: firstFlagActive = LIST_FILTERS.at(0).activeFlag;

  $: style = `
  --translate-filter-1: calc(var(--padding-inline-view-content) + ${TRANSLATE_FILTER_1}px);
  --translate-filter-2: calc(var(--padding-inline-view-content) + ${TRANSLATE_FILTER_2}px);
  --translate-filter-3: calc(var(--padding-inline-view-content) + ${TRANSLATE_FILTER_3}px);
  --translate-filter-4: calc(var(--padding-inline-view-content) + ${TRANSLATE_FILTER_4}px);
  --button-margin-inline-end: ${BUTTON_MARGIN_INLINE_END_PX}px;
  --transition-transform: cubic-bezier(0.12, 0.68, 0.44, 0.95);
  --transition-opacity: cubic-bezier(0.26, 0.74, 0.39, 0.99);
  `;

  afterUpdate(() => {
    if (LIST_FILTER_HTML) {
      const CHILDREN_HTML = LIST_FILTER_HTML.querySelectorAll('.filter');
      FILTER_1_WIDTH = CHILDREN_HTML?.[0]?.clientWidth ?? 0;
      FILTER_2_WIDTH = CHILDREN_HTML?.[1]?.clientWidth ?? 0;
      FILTER_3_WIDTH = CHILDREN_HTML?.[2]?.clientWidth ?? 0;
    }
  });

  function close() {
    callback?.();
    filterNone();
  }

  function toggle(filterFlag, filterOnlyFn) {
    callback?.();

    if (filterFlag) {
      filterNone();
    } else {
      filterOnlyFn();
    }
  }
</script>

<div class="list-filter">
  <ul
    class="no-scrollbar"
    class:firstFlagActive
    class:atLeastOneActive
    class:playlistActive
    class:albumActive
    class:artistActive
    class:trackActive
    {style}
    bind:this={LIST_FILTER_HTML}
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

    {#each LIST_FILTERS as { type, label, displayFlag, activeFlag, toggle }, i}
      {#if displayFlag}
        <li class={`${type} filter filter-${i + 1}`}>
          <Button filled={true} hasAccent={activeFlag} accent={activeFlag} callback={toggle}>
            {label}
          </Button>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .list-filter {
    position: relative;
    margin-inline: calc(-1 * var(--padding-inline-view-content));
  }

  .list-filter::before,
  .list-filter::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: calc(var(--padding-inline-view-content) / 2);
    height: 100%;
    background-color: var(--background-color-list-filter);
    z-index: var(--z-index-near);
  }

  .list-filter::before {
    left: 0;
    box-shadow: var(--shadow-list-filter-begin);
  }

  .list-filter::after {
    right: 0;
    box-shadow: var(--shadow-list-filter-end);
  }

  ul {
    position: relative;
    display: flex;
    align-items: center;
    height: 3.2rem;
    margin-block-start: 1rem;
    overflow-x: scroll;
  }

  li {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
  }

  .atLeastOneActive {
    overflow-x: unset;
  }

  .close,
  .filter-1 {
    transform: translateX(var(--padding-inline-view-content));
  }

  .filter-2 {
    transform: translateX(var(--translate-filter-2));
  }

  .filter-3 {
    transform: translateX(var(--translate-filter-3));
  }

  .filter-4 {
    transform: translateX(var(--translate-filter-4));
  }

  .playlistActive .playlist,
  .albumActive .album,
  .artistActive .artist,
  .trackActive .track {
    transform: translateX(var(--translate-filter-1));
  }

  .close,
  .filter {
    transition:
      transform 0.6s var(--transition-transform),
      opacity 0.3s var(--transition-opacity) 0.2s;
  }

  .close,
  .atLeastOneActive:not(.playlistActive) .playlist,
  .atLeastOneActive:not(.albumActive) .album,
  .atLeastOneActive:not(.artistActive) .artist,
  .atLeastOneActive:not(.trackActive) .track {
    opacity: 0;
    z-index: var(--z-index-far);
    transition-delay: 0s;
  }

  .atLeastOneActive .close {
    opacity: 1;
    z-index: var(--z-index-near);
  }

  .firstFlagActive .close {
    transition-delay: 0.2s;
  }
</style>
