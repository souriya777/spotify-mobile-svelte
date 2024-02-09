<script>
  import { onMount } from 'svelte';
  import { userId, displayFilter } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import Button from '@lib/Button.svelte';
  import ListPlaylist from '@lib/ListPlaylist.svelte';
  import ListAlbum from '@lib/ListAlbum.svelte';
  import ListFilter from '@lib/ListFilter.svelte';
  import ListArtist from '@lib/ListArtist.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@js/spotify').SpotifySearchArtist[]} */
  let artists = [];
  // /** @type {import('@js/spotify').SpotifyTrack[]} */
  // let likedTracks = [];

  // let selectedPlaylist = 1;
  // let selectedAlbum = 1;
  // let totalLikedTracks;

  onMount(() => {
    // PLAYLISTS
    sortPlaylistBySpotify();
    // SpotifyApi.getLikedTracks().then((tracks) => (totalLikedTracks = tracks?.length));

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

  // async function getLikedTracks() {
  //   likedTracks = await SpotifyApi.getLikedTracks();
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
    <div>TODO sort</div>
    <div>TODO list / grid</div>
  </div>

  {#if $displayFilter.playlistActive}
    <ListPlaylist items={playlists} />
  {:else if $displayFilter.albumActive}
    <ListAlbum items={albums} />
  {:else if $displayFilter.artistActive}
    <ListArtist items={artists} />
  {:else}
    TODO ALL
  {/if}
</ViewRoot>

<style>
  .sort-display {
    display: flex;
    justify-content: space-between;
    background-color: chocolate;
  }
</style>
