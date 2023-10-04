<script>
  import { onMount } from 'svelte';
  import { displayFilter } from '@/js/store';
  import { debounce } from '@/js/souriya-utils';
  import SpotifyApi from '@/js/SpotifyApi';
  import { searchQuery } from '@/js/store';
  import SpotifyListTrack from '@/lib/SpotifyListTrack.svelte';
  import SpotifyListPlaylist from '@/lib/SpotifyListPlaylist.svelte';
  import SpotifyListAlbum from '@/lib/SpotifyListAlbum.svelte';
  import SpotifyListArtist from '@/lib/SpotifyListArtist.svelte';

  /** @type {import('@/js/spotify').SpotifySearch} */
  let searchResult = null;

  const FIRST_RESULTS_LIMIT = 3;

  $: firstTracks = searchResult?.tracks?.slice(0, FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = searchResult?.artists?.slice(0, FIRST_RESULTS_LIMIT) ?? [];
  $: firstPlaylists = searchResult?.playlists?.slice(0, FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = searchResult?.albums?.slice(0, FIRST_RESULTS_LIMIT) ?? [];

  $: nextTracks = searchResult?.tracks?.slice(FIRST_RESULTS_LIMIT) ?? [];
  $: nextArtists = searchResult?.artists?.slice(FIRST_RESULTS_LIMIT) ?? [];
  $: nextPlaylists = searchResult?.playlists?.slice(FIRST_RESULTS_LIMIT) ?? [];
  $: nextAlbums = searchResult?.albums?.slice(FIRST_RESULTS_LIMIT) ?? [];

  $: queryUrl = window.location.href.match(/(?<=search\/).*/i)?.[0] ?? '';
  $: decodedQueryUrl = decodeURI(queryUrl);

  const updateQuery = (e) => {
    const query = e?.target?.value;

    if (!query) {
      return;
    }

    search(query);
  };

  function search(query) {
    window.history.pushState({}, 'new search', `/search/${query}`);
    searchQuery.set(query);

    debounce(async () => {
      searchResult = await SpotifyApi.search(query);
    }, 750);
  }

  onMount(() => {
    search($searchQuery);
  });
</script>

<div>
  <h1>search</h1>
  <div>queryUrl:{decodedQueryUrl}</div>
  <input type="text" on:input={updateQuery} bind:value={decodedQueryUrl} />

  <div>
    <h2>filters</h2>

    <button class:active={$displayFilter.topOn} on:click={displayFilter.filterNone}> top </button>

    {#if firstTracks.length > 0}
      <button class:active={$displayFilter.trackActive} on:click={displayFilter.filterTrackOnly}>
        track
      </button>
    {/if}

    {#if firstArtists.length > 0}
      <button class:active={$displayFilter.artistActive} on:click={displayFilter.filterArtistOnly}>
        artist
      </button>
    {/if}

    {#if firstPlaylists.length > 0}
      <button
        class:active={$displayFilter.playlistActive}
        on:click={displayFilter.filterPlaylistOnly}
      >
        playlist
      </button>
    {/if}

    {#if firstAlbums.length > 0}
      <button class:active={$displayFilter.albumActive} on:click={displayFilter.filterAlbumOnly}>
        album
      </button>
    {/if}
  </div>

  <h2>results</h2>

  {#if $displayFilter.trackOn}
    <h3>1st tracks</h3>
    <SpotifyListTrack items={firstTracks} />
  {/if}

  {#if $displayFilter.artistOn}
    <h3>1st artists</h3>
    <SpotifyListArtist items={firstArtists} />
  {/if}

  {#if $displayFilter.playlistOn}
    <h3>1st playlists</h3>
    <SpotifyListPlaylist items={firstPlaylists} />
  {/if}

  {#if $displayFilter.albumOn}
    <h3>1st albums</h3>
    <SpotifyListAlbum items={firstAlbums} />
  {/if}

  {#if $displayFilter.trackOn}
    <h3>next tracks</h3>
    <SpotifyListTrack items={nextTracks} />
  {/if}

  {#if $displayFilter.artistOn}
    <h3>next artists</h3>
    <SpotifyListArtist items={nextArtists} />
  {/if}

  {#if $displayFilter.playlistOn}
    <h3>next playlists</h3>
    <SpotifyListPlaylist items={nextPlaylists} />
  {/if}

  {#if $displayFilter.albumOn}
    <h3>next albums</h3>
    <SpotifyListAlbum items={nextAlbums} />
  {/if}
</div>

<style>
  button.active {
    background-color: var(--color-active);
  }
</style>
