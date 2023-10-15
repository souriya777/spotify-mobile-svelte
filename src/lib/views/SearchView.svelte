<script>
  import { onMount } from 'svelte';
  import { displayFilter, userId } from '@/js/store';
  import { debounce } from '@/js/souriya-utils';
  import SpotifyApi from '@/js/SpotifyApi';
  import { searchQuery } from '@/js/store';
  import CollectionTrack from '@/lib/CollectionTrack.svelte';
  import SpotifySelectPlaylist from '@/lib/SpotifySelectPlaylist.svelte';
  import CollectionAlbum from '@/lib/CollectionAlbum.svelte';
  import CollectionArtist from '@/lib/CollectionArtist.svelte';
  import ListFilter from '@/lib/ListFilter.svelte';

  /** @type {import('@/js/spotify').SpotifySearch} */
  let searchResult = null;

  const FIRST_RESULTS_LIMIT = 3;
  let playlists = [];

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

  onMount(async () => {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
  });

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

  <h2>the playlists</h2>

  <SpotifySelectPlaylist items={playlists} />

  <h2>tap Ur query</h2>
  <input type="text" on:input={updateQuery} bind:value={decodedQueryUrl} />

  <ListFilter
    hasTracks={firstTracks.length > 0}
    hasAlbums={firstAlbums.length > 0}
    hasPlaylists={firstPlaylists.length > 0}
    hasArtists={firstArtists.length > 0}
  />

  <h2>results</h2>

  {#if $displayFilter.trackOn}
    <h3>1st tracks</h3>
    <CollectionTrack items={firstTracks} />
  {/if}

  {#if $displayFilter.artistOn}
    <h3>1st artists</h3>
    <CollectionArtist items={firstArtists} />
  {/if}

  {#if $displayFilter.playlistOn}
    <h3>1st playlists</h3>
    <SpotifySelectPlaylist items={firstPlaylists} />
  {/if}

  {#if $displayFilter.albumOn}
    <h3>1st albums</h3>
    <CollectionAlbum items={firstAlbums} />
  {/if}

  {#if $displayFilter.trackOn}
    <h3>next tracks</h3>
    <CollectionTrack items={nextTracks} />
  {/if}

  {#if $displayFilter.artistOn}
    <h3>next artists</h3>
    <CollectionArtist items={nextArtists} />
  {/if}

  {#if $displayFilter.playlistOn}
    <h3>next playlists</h3>
    <SpotifySelectPlaylist items={nextPlaylists} />
  {/if}

  {#if $displayFilter.albumOn}
    <h3>next albums</h3>
    <CollectionAlbum items={nextAlbums} />
  {/if}
</div>
