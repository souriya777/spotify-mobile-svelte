<script>
  import { fade } from 'svelte/transition';
  import {
    displayFilterSearch,
    isNavigatingHasPriority,
    navigatingRgb,
    searchQuery,
    searchResult,
    eventBus,
    searchViewAll,
  } from '@js/store';
  import { DEFAULT_BACKGROUND_ELEVATED_RGB, DEFAULT_BACKGROUND_RGB } from '@js/palette-utils';
  import {
    SPOTIFY_FIRST_RESULTS_LIMIT,
    SPOTIFY_SECOND_RESULTS_LIMIT,
    extractSuggestionsFromSpotifySearch,
  } from '@js/spotify-utils';
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
  import { isEmpty, isNotEmpty } from '@js/string-utils';
  import SearchSuggestions from '@lib/SearchSuggestions.svelte';
  import RecentSearch from '@lib/RecentSearch.svelte';

  const TRANSITION_DURATION_MS = 150;

  let startFadeEffect;
  let isInputFocused = false;

  $: tracks = $searchResult?.tracks;
  $: artists = $searchResult?.artists;
  $: albums = $searchResult?.albums;
  $: playlists = $searchResult?.playlists;

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

  $: SUGGESTIONS = extractSuggestionsFromSpotifySearch($searchQuery, $searchResult);

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
  } else {
    $searchResult = null;
  }

  function search() {
    if (isEmpty($searchQuery)) {
      return;
    }

    SpotifyApi.search($searchQuery).then((result) => ($searchResult = result));
  }

  function cancel() {
    isInputFocused = false;
    $searchQuery = '';
  }
</script>

{#if !isInputFocused}
  <div transition:fade={{ duration: TRANSITION_DURATION_MS }}>
    <ViewRoot title="Search">
      <SearchInput focused={isInputFocused} on:focus={() => (isInputFocused = true)} />
    </ViewRoot>
  </div>
{:else}
  <div transition:fade={{ delay: TRANSITION_DURATION_MS, duration: TRANSITION_DURATION_MS }}>
    <ViewRoot title="Search" header={false}>
      <SearchInput
        focused={isInputFocused}
        on:valid={search}
        on:focus={() => (isInputFocused = true)}
        on:cancel={cancel}
        callback={startFadeEffect}
      />

      <FadeEffect bind:start={startFadeEffect}>
        <RecentSearch {isInputFocused} />

        {#if hasResult}
          {#if SUGGESTIONS}
            <div class="suggestion">
              <SearchSuggestions suggestions={SUGGESTIONS} />
            </div>
          {/if}

          {#if $searchViewAll}
            <ListFilter
              isMyLib={false}
              hasTracks={firstTracks.length > 0}
              hasArtists={firstArtists.length > 0}
              hasAlbums={firstAlbums.length > 0}
              hasPlaylists={firstPlaylists.length > 0}
              callback={startFadeEffect}
            />
          {/if}

          {#if $displayFilterSearch.trackActive}
            <ListTrack items={tracks} />
          {:else if $displayFilterSearch.artistActive}
            <ListArtist items={artists} />
          {:else if $displayFilterSearch.albumActive}
            <ListAlbum items={albums} />
          {:else if $displayFilterSearch.playlistActive}
            <ListPlaylist items={playlists} />
          {:else}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => ($searchViewAll = true)}>
              <ListAll items={RESULTS} hasPrefix={true}>
                <div class="view-all" slot="end">
                  View all results for &lsquo;{$searchQuery}&rsquo;
                </div>
              </ListAll>
            </div>
          {/if}
        {/if}
      </FadeEffect>
    </ViewRoot>
  </div>
{/if}

<style>
  .view-all {
    color: var(--color-accent);
  }
</style>
