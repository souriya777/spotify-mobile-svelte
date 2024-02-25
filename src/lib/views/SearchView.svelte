<script>
  import { fade } from 'svelte/transition';
  import {
    displayFilterSearch,
    isNavigatingHasPriority,
    navigatingRgb,
    searchFullMode,
    searchQuery,
    searchResult,
    searchViewAll,
    eventBus,
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
  import { isEmpty } from '@js/string-utils';
  import SearchSuggestions from '@lib/SearchSuggestions.svelte';
  import RecentSearch from '@lib/RecentSearch.svelte';

  const TRANSITION_DURATION_MS = 150;

  /** @type {HTMLElement} */
  let SCROLL_ANCHOR_HTML;
  let startFadeEffect;
  let focusInput;

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
    if ($searchFullMode) {
      $navigatingRgb = DEFAULT_BACKGROUND_ELEVATED_RGB;
      $isNavigatingHasPriority = true;
    } else {
      $navigatingRgb = DEFAULT_BACKGROUND_RGB;
      $isNavigatingHasPriority = false;
    }
  }

  $: if ($eventBus?.type === 'search-input-focus-event') {
    $eventBus = null;
    $searchFullMode = true;
    focusInput?.();
  }

  $: if (isEmpty($searchQuery)) {
    $searchResult = null;
  } else {
    $searchFullMode = true;
    search();
  }

  function search() {
    if (isEmpty($searchQuery)) {
      return;
    }

    SpotifyApi.search($searchQuery).then((result) => ($searchResult = result));
  }

  function cancel() {
    $searchFullMode = false;
    $searchQuery = '';
  }

  function viewAll() {
    $searchViewAll = true;
    startFadeEffect?.();
    SCROLL_ANCHOR_HTML?.scrollIntoView();
  }
</script>

{#if !$searchFullMode}
  <div
    in:fade={{ delay: TRANSITION_DURATION_MS, duration: TRANSITION_DURATION_MS }}
    out:fade={{ duration: TRANSITION_DURATION_MS }}
  >
    <ViewRoot title="Search">
      <SearchInput focused={$searchFullMode} on:focus={() => ($searchFullMode = true)} />
    </ViewRoot>
  </div>
{:else}
  <div
    in:fade={{ delay: TRANSITION_DURATION_MS, duration: TRANSITION_DURATION_MS }}
    out:fade={{ duration: TRANSITION_DURATION_MS }}
  >
    <div class="scroll-anchor" bind:this={SCROLL_ANCHOR_HTML}></div>
    <ViewRoot title="Search" header={false}>
      <SearchInput
        focused={$searchFullMode}
        bind:focusForMe={focusInput}
        on:valid={search}
        on:cancel={cancel}
      />

      <FadeEffect bind:start={startFadeEffect}>
        <RecentSearch />

        {#if hasResult}
          {#if SUGGESTIONS && !$searchViewAll}
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
            <ListAll items={RESULTS} hasPrefix={true}>
              <div class="view-all" slot="end">
                {#if $searchViewAll === false}
                  <div on:click={viewAll}>
                    View all results for &lsquo;{$searchQuery}&rsquo;
                  </div>
                {/if}
              </div>
            </ListAll>
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
