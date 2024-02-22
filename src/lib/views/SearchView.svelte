<script>
  import {
    displayFilterSearch,
    isNavigatingHasPriority,
    navigatingRgb,
    searchQuery,
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
  import { isNotEmpty } from '@js/string-utils';

  /** @type {import('@js/spotify').SpotifySearch} */
  let searchResult = null;
  let startFadeEffect;
  let isInputFocused = false;

  $: tracks = searchResult?.tracks;
  $: artists = searchResult?.artists;
  $: albums = searchResult?.albums;
  $: playlists = searchResult?.playlists;

  $: firstTracks = tracks?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = artists?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = albums?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstPlaylists = playlists?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];

  $: nextTracks = tracks?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];
  $: nextArtists = artists?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];
  $: nextAlbums = albums?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];
  $: nextPlaylists =
    playlists?.slice(SPOTIFY_FIRST_RESULTS_LIMIT, SPOTIFY_SECOND_RESULTS_LIMIT) ?? [];

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

  $: if (isNotEmpty($searchQuery)) {
    isInputFocused = true;
    search();
  } else {
    isInputFocused = false;
    searchResult = null;
  }

  function search() {
    // FIXME
    // previousSearchQuery.update((arr) => [...arr, value]);
    SpotifyApi.search($searchQuery).then((result) => (searchResult = result));
  }

  function cancel() {
    isInputFocused = false;
    $searchQuery = '';
  }
</script>

<ViewRoot title="Search" contentFull={isInputFocused}>
  <SearchInput
    focused={isInputFocused}
    on:valid={search}
    on:focus={() => (isInputFocused = true)}
    on:cancel={cancel}
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
        <ListTrack items={tracks} />
      {:else if $displayFilterSearch.artistActive}
        <ListArtist items={artists} />
      {:else if $displayFilterSearch.albumActive}
        <ListAlbum items={albums} />
      {:else if $displayFilterSearch.playlistActive}
        <ListPlaylist items={playlists} />
      {:else}
        <ListAll items={RESULTS} hasPrefix={true}>
          <div class="view-all" slot="end">
            View all results for &lsquo;{$searchQuery}&rsquo;
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
