<script>
  import { listSortOptionsFull, listSortType, displayFilterMyLib } from '@js/store';
  import { onTap } from '@js/event-utils';
  import {
    LIST_SORT_OPTIONS_MAP,
    LIST_SORT_TYPE,
    sortPlaylistsBySpotify,
    sortPlaylistsAlphabetically,
    sortPlaylistsByCreator,
    sortAlbumsBySpotify,
    sortAlbumsAlphabetically,
    sortAlbumsByCreator,
    sortArtistsBySpotify,
    sortArtistsAlphabetically,
    sortMyLibBySpotify,
    sortMyLibAlphabetically,
  } from '@js/list-sort-utils';
  import Svg from '@lib/svg/Svg.svelte';

  const SVG_SIZE = 16;
  const SORT_ASC = {
    [LIST_SORT_TYPE.AZ]: true,
    [LIST_SORT_TYPE.CREATOR]: true,
  };

  function determineSortFn() {
    let sortFn;

    if ($displayFilterMyLib.playlistActive) {
      switch ($listSortType) {
        case LIST_SORT_TYPE.RECENTS:
          sortFn = () => sortPlaylistsBySpotify();
          break;
        case LIST_SORT_TYPE.AZ:
          sortFn = (reverse) => sortPlaylistsAlphabetically(reverse);
          break;
        case LIST_SORT_TYPE.CREATOR:
          sortFn = (reverse) => sortPlaylistsByCreator(reverse);
          break;
      }
    } else if ($displayFilterMyLib.albumActive) {
      switch ($listSortType) {
        case LIST_SORT_TYPE.RECENTS:
          sortFn = () => sortAlbumsBySpotify();
          break;
        case LIST_SORT_TYPE.AZ:
          sortFn = (reverse) => sortAlbumsAlphabetically(reverse);
          break;
        case LIST_SORT_TYPE.CREATOR:
          sortFn = (reverse) => sortAlbumsByCreator(reverse);
          break;
      }
    } else if ($displayFilterMyLib.artistActive) {
      if (LIST_SORT_TYPE.RECENTS === $listSortType) {
        sortFn = () => sortArtistsBySpotify();
      } else if (LIST_SORT_TYPE.AZ === $listSortType) {
        sortFn = (reverse) => sortArtistsAlphabetically(reverse);
      }
    } else {
      if (LIST_SORT_TYPE.RECENTS === $listSortType) {
        sortFn = () => sortMyLibBySpotify();
      } else if (LIST_SORT_TYPE.AZ === $listSortType) {
        sortFn = (reverse) => sortMyLibAlphabetically(reverse);
      }
    }

    return sortFn;
  }

  function select(id) {
    $listSortType = id;
    const option = LIST_SORT_OPTIONS_MAP.get(id);

    if (option.canReverse) {
      SORT_ASC[id] = !SORT_ASC[id];
    } else {
      // reset all sorting
      SORT_ASC[LIST_SORT_TYPE.AZ] = true;
      SORT_ASC[LIST_SORT_TYPE.CREATOR] = true;
    }

    const mySortFn = determineSortFn();
    mySortFn(SORT_ASC[id]);

    close();
  }

  function close() {
    $listSortOptionsFull = false;
  }
</script>

<div class="list-sort-options">
  <div class="content">
    <div class="sort-by font-1_3 font-bold">Sort by</div>
    <ul>
      {#each LIST_SORT_OPTIONS_MAP.entries() as [key, { id, label, canReverse }] (key)}
        {@const isSelected = id === $listSortType}
        {@const canShowOption =
          $displayFilterMyLib.playlistActive ||
          $displayFilterMyLib.albumActive ||
          ($displayFilterMyLib.artistActive && key !== LIST_SORT_TYPE.CREATOR) ||
          (!$displayFilterMyLib.atLeastOneActive && key !== LIST_SORT_TYPE.CREATOR)}

        {#if canShowOption}
          <li class:selected={isSelected} use:onTap={() => select(id)}>
            <div class="label">
              <div class="text">
                {label}
              </div>
              <div class="sort-direction">
                {#if canReverse}
                  {#if SORT_ASC[id]}
                    <Svg name="arrow-down" size={SVG_SIZE} />
                  {:else}
                    <Svg name="arrow-up" size={SVG_SIZE} />
                  {/if}
                {/if}
              </div>
            </div>
            <div class="checked">
              <Svg name="checked" />
            </div>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
  <div class="close" use:onTap={close}>Cancel</div>
</div>

<style>
  .list-sort-options {
    display: grid;
    grid-template-rows: 1fr var(--height-nav);
    height: 100%;
    padding-block-start: var(--padding-block-bottom-panel);
    padding-inline: var(--padding-inline-bottom-panel);
    background-color: var(--color-primary-elevated);
    border-top-left-radius: var(--border-radius-bottom-panel-mini);
    border-top-right-radius: var(--border-radius-bottom-panel-mini);
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  ul {
    width: 100%;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 0.6rem;
  }

  .label {
    display: flex;
  }

  .text {
    margin-inline-end: 0.4rem;
  }

  .selected {
    color: var(--color-accent);
  }

  .checked {
    display: none;
  }

  .selected .checked {
    display: block;
  }

  .sort-by {
    padding-block-end: var(--padding-block-bottom-panel);
    color: var(--color-tertiary);
  }

  .sort-direction {
    transform: translateY(0.4rem);
  }

  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>
