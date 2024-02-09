<script>
  import { onMount } from 'svelte';
  import { userId, displayFilter, gridMode } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import Button from '@lib/Button.svelte';
  import ListPlaylist from '@lib/ListPlaylist.svelte';
  import ListAlbum from '@lib/ListAlbum.svelte';
  import ListFilter from '@lib/ListFilter.svelte';
  import ListArtist from '@lib/ListArtist.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import ListMyLib from '@lib/ListMyLib.svelte';
  import { SPOTIFY_FIRST_RESULTS_LIMIT } from '@js/spotify-utils';

  const DISPLAY_MODE_ICON_SIZE = 14;

  /** @type {(import('@js/spotify').SpotifyPlaylist | import('@js/spotify').SpotifyAlbum | import('@js/spotify').SpotifyArtist)[]} */
  let recentlyPlayed = [];
  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@js/spotify').SpotifySearchArtist[]} */
  let artists = [];

  $: recentlyPlayedUris = new Set(recentlyPlayed.map((item) => item?.uri));
  $: removeDuplicate = (item) => !recentlyPlayedUris.has(item?.uri);

  $: playlistsWithoutDuplicates = playlists?.filter(removeDuplicate);
  $: albumsWithoutDuplicates = albums?.filter(removeDuplicate);
  $: artistsWithoutDuplicates = artists?.filter(removeDuplicate);

  $: firstPlaylists = playlistsWithoutDuplicates?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = albumsWithoutDuplicates?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = artistsWithoutDuplicates?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextPlaylists = playlistsWithoutDuplicates?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextAlbums = albumsWithoutDuplicates?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextArtists = artistsWithoutDuplicates?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];

  $: MY_LIB = [
    ...recentlyPlayed,
    ...firstPlaylists,
    ...firstAlbums,
    ...firstArtists,
    ...nextPlaylists,
    ...nextAlbums,
    ...nextArtists,
  ];

  // let selectedPlaylist = 1;
  // let selectedAlbum = 1;

  onMount(() => {
    // ALL
    SpotifyApi.myLibRecentlyPlayed().then((items) => (recentlyPlayed = items));

    // PLAYLISTS
    sortPlaylistBySpotify();
    // sortPlaylistRecentlyAddedAt()

    // ALBUMS
    sortAlbumsRecentlyPlayed();

    // ARTISTS
    SpotifyApi.getMyFollowedArtists().then((items) => (artists = items));
  });

  async function sortPlaylistBySpotify() {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
    // selectedPlaylist = 1;
  }

  // async function sortPlaylistAlphabetically() {
  //   playlists = await SpotifyApi.getPlaylistsSortedAlphabetically($userId);
  //   selectedPlaylist = 2;
  // }

  // async function sortPlaylistRecentlyAddedAt() {
  //   playlists = await SpotifyApi.getPlaylistsSortedAddedAtFIXME($userId);
  //   selectedPlaylist = 3;
  // }

  async function sortAlbumsRecentlyPlayed() {
    SpotifyApi.getMySavedAlbumsSortedRecentlyPlayed().then((items) => (albums = items));
    // selectedAlbum = 1;
  }

  // async function sortAlbumsRecentlyAdded() {
  //   SpotifyApi.getMySavedAlbumsSortedRecentlyAdded().then((items) => (albums = items));
  //   selectedAlbum = 2;
  // }
</script>

<ViewRoot title="Your library">
  <svelte:fragment slot="header__right">
    <div>
      <Button type="secondary" svg="search" callback={() => console.log('TODO')} />
    </div>
    <div>
      <Button
        type="secondary"
        svg="plus"
        svgSize={36}
        svgViewbox="-4 -4 24 24"
        callback={() => console.log('TODO')}
      />
    </div>
  </svelte:fragment>

  <svelte:fragment slot="header__bottom">
    <div class="filter-bar">
      <ListFilter
        hasAlbums={albums.length > 0}
        hasPlaylists={playlists.length > 0}
        hasArtists={artists.length > 0}
      />
    </div>
  </svelte:fragment>

  <div class="sort-display">
    <div class="sort">TODO sort</div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => ($gridMode = !$gridMode)}>
      {#if $gridMode}
        <Svg name="list-mode" size={DISPLAY_MODE_ICON_SIZE} />
      {:else}
        <Svg name="grid-mode" size={DISPLAY_MODE_ICON_SIZE} />
      {/if}
    </div>
  </div>

  {#if $displayFilter.playlistActive}
    <ListPlaylist items={playlists} />
  {:else if $displayFilter.albumActive}
    <ListAlbum items={albums} />
  {:else if $displayFilter.artistActive}
    <ListArtist items={artists} />
  {:else}
    <ListMyLib items={MY_LIB} />
  {/if}
</ViewRoot>

<style>
  .sort-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sort {
    background-color: chocolate;
  }
</style>
