<script>
  import {
    displayFilterSearch,
    isNavigatingHasPriority,
    navigatingRgb,
    previousSearchQuery,
    eventBus,
  } from '@js/store';
  import { DEFAULT_BACKGROUND_ELEVATED_RGB, DEFAULT_BACKGROUND_RGB } from '@js/palette-utils';
  import { SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT } from '@js/spotify-utils';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import ListFilter from '@lib/ListFilter.svelte';
  import ListAll from '@lib/ListAll.svelte';
  import ListPlaylist from '@lib/ListPlaylist.svelte';
  import ListAlbum from '@lib/ListAlbum.svelte';
  import ListArtist from '@lib/ListArtist.svelte';
  import FadeEffect from '@lib/FadeEffect.svelte';
  import SearchInput from '@lib/SearchInput.svelte';
  import ListTrack from '@lib/ListTrack.svelte';

  /** @type {import('@js/spotify').SpotifySearch} */
  let searchResult = null;
  let startFadeEffect;
  let isInputFocused = false;
  let searchValue = '';

  $: firstTracks = searchResult?.tracks?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = searchResult?.artists?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = searchResult?.albums?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstPlaylists = searchResult?.playlists?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];

  $: nextTracks =
    searchResult?.tracks?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];
  $: nextArtists =
    searchResult?.artists?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];
  $: nextAlbums =
    searchResult?.albums?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];
  $: nextPlaylists =
    searchResult?.playlists?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];

  $: RESULTS = [
    ...firstTracks,
    ...firstArtists,
    ...firstAlbums,
    ...firstPlaylists,
    ...nextTracks,
    ...nextArtists,
    ...nextAlbums,
    ...nextPlaylists,
  ];
  $: hasResult = RESULTS?.length > 0;

  $: {
    if (isInputFocused) {
      $navigatingRgb = DEFAULT_BACKGROUND_ELEVATED_RGB;
      $isNavigatingHasPriority = true;
    } else {
      $navigatingRgb = DEFAULT_BACKGROUND_RGB;
      $isNavigatingHasPriority = false;
    }
  }

  $: if ($eventBus?.type === 'search-input-focus-event') {
    $eventBus = null;
    isInputFocused = true;
  }

  function search(e) {
    searchValue = e.detail.value;
    // FIXME
    // previousSearchQuery.update((arr) => [...arr, value]);
    SpotifyApi.search(searchValue).then((result) => (searchResult = result));
  }
</script>

<ViewRoot title="Search" contentFull={isInputFocused}>
  <SearchInput
    focused={isInputFocused}
    on:valid={search}
    on:focus={() => (isInputFocused = true)}
    on:cancel={() => (isInputFocused = false)}
  />

  {#if hasResult}
    <div class="previous-search">
      TODO only on click search's item
      {JSON.stringify($previousSearchQuery)}
    </div>

    <div class="suggestion">TODO suggestion</div>

    <ListFilter
      isMyLib={false}
      hasTracks={firstTracks.length > 0}
      hasArtists={firstArtists.length > 0}
      hasAlbums={firstAlbums.length > 0}
      hasPlaylists={firstPlaylists.length > 0}
      callback={startFadeEffect}
    />

    <FadeEffect bind:start={startFadeEffect}>
      {#if $displayFilterSearch.trackActive}
        <ListTrack items={[]} />
      {:else if $displayFilterSearch.playlistActive}
        <ListPlaylist items={[]} />
      {:else if $displayFilterSearch.albumActive}
        <ListAlbum items={[]} />
      {:else if $displayFilterSearch.artistActive}
        <ListArtist items={[]} />
      {:else}
        <ListAll items={RESULTS} hasPrefix={true}>
          <div class="view-all" slot="end">
            View all results for &lsquo;{searchValue}&rsquo;
          </div>
        </ListAll>
      {/if}
    </FadeEffect>
  {/if}
</ViewRoot>

<style>
  .view-all {
    color: var(--color-accent);
  }
</style>
