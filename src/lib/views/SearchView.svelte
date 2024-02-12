<script>
  import { onMount } from 'svelte';
  import { searchQuery } from '@js/store';
  import { debounce } from '@js/souriya-utils';
  import { isEmpty } from '@js/string-utils';
  import SpotifyApi from '@js/SpotifyApi';
  import { displayFilterSearch } from '@js/store';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  // import CollectionTrack from '@lib/PlaylistTracks.svelte';
  import CollectionAlbum from '@lib/ListAlbum.svelte';
  import ListArtist from '@lib/ListArtist.svelte';
  import { SPOTIFY_FIRST_RESULTS_LIMIT } from '@js/spotify-utils';
  import ListPlaylist from '@lib/ListPlaylist.svelte';
  import ListFilter from '@lib/ListFilter.svelte';
  import FadeEffect from '@lib/FadeEffect.svelte';

  const DEBOUNCE_SEARCH_MS = 750;

  /** @type {import('@js/spotify').SpotifySearch}
   */
  let searchResult = null;
  let startFadeEffect;

  $: firstTracks = searchResult?.tracks?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = searchResult?.artists?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstPlaylists = searchResult?.playlists?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = searchResult?.albums?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];

  // $: nextTracks = searchResult?.tracks?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextArtists = searchResult?.artists?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextAlbums = searchResult?.albums?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];

  $: queryUrl = window.location.href.match(/(?<=search\/).*/i)?.[0] ?? '';
  $: decodedQueryUrl = decodeURI(queryUrl);

  onMount(() => {
    search($searchQuery);
  });

  const updateQuery = (e) => {
    const query = e?.target?.value;

    if (!query) {
      return;
    }

    search(query);
  };

  function search(query) {
    if (isEmpty(query)) {
      return;
    }

    $searchQuery = query;

    debounce(async () => {
      searchResult = await SpotifyApi.search(query);
    }, DEBOUNCE_SEARCH_MS);
  }
</script>

<ViewRoot title="Search">
  <input
    type="text"
    placeholder="What do you want to listen to ?"
    on:input={updateQuery}
    bind:value={decodedQueryUrl}
  />

  <!-- FIXME -->
  <!-- <ListFilter
    isMyLib={false}
    hasTracks={firstTracks.length > 0}
    hasArtists={firstArtists.length > 0}
    hasAlbums={firstAlbums.length > 0}
    hasPlaylists={firstPlaylists.length > 0}
    callback={startFadeEffect}
  /> -->
  <ListFilter
    isMyLib={false}
    hasTracks={true}
    hasArtists={true}
    hasAlbums={true}
    hasPlaylists={true}
    callback={startFadeEffect}
  />

  <FadeEffect bind:start={startFadeEffect}>
    {#if $displayFilterSearch.trackOn}
      <h3>1st tracks</h3>
      <!-- <CollectionTrack items={firstTracks} /> -->
    {/if}

    {#if $displayFilterSearch.artistOn}
      <h3>1st artists</h3>
      <ListArtist items={firstArtists} />
    {/if}

    {#if $displayFilterSearch.playlistOn}
      <h3>1st playlists</h3>
      <ListPlaylist items={firstPlaylists} />
    {/if}

    {#if $displayFilterSearch.albumOn}
      <h3>1st albums</h3>
      <CollectionAlbum items={firstAlbums} />
    {/if}

    {#if $displayFilterSearch.trackOn}
      <h3>next tracks</h3>
      TODO
      <!-- <CollectionTrack items={nextTracks} /> -->
    {/if}

    {#if $displayFilterSearch.artistOn}
      <h3>next artists</h3>
      <ListArtist items={nextArtists} />
    {/if}

    {#if $displayFilterSearch.playlistOn}
      <h3>next playlists</h3>
    {/if}

    {#if $displayFilterSearch.albumOn}
      <h3>next albums</h3>
      <CollectionAlbum items={nextAlbums} />
    {/if}
  </FadeEffect>
</ViewRoot>
