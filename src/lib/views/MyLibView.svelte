<script>
  import { onMount } from 'svelte';
  import { userId, displayFilter } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Button from '@/lib/Button.svelte';
  import CollectionTrack from '@/lib/CollectionTrack.svelte';
  import CollectionPlaylist from '@/lib/CollectionPlaylist.svelte';
  import CollectionAlbum from '@/lib/CollectionAlbum.svelte';
  import CollectionArtist from '@/lib/CollectionArtist.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  import ListFilter from '@/lib/ListFilter.svelte';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@/js/spotify').SpotifySearchArtist[]} */
  let artists = [];
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let likedTracks = [];

  let selectedPlaylist = 1;
  let selectedAlbum = 1;
  let totalLikedTracks;

  onMount(() => {
    // get playlist
    sortPlaylistBySpotify();

    SpotifyApi.getLikedTracks().then((tracks) => (totalLikedTracks = tracks?.length));

    sortAlbumsRecentlyPlayed();

    SpotifyApi.getMyFollowedArtists().then((items) => (artists = items));
  });

  async function sortPlaylistBySpotify() {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
    selectedPlaylist = 1;
  }

  async function sortPlaylistAlphabetically() {
    playlists = await SpotifyApi.getPlaylistsSortedAlphabetically($userId);
    selectedPlaylist = 2;
  }

  async function sortPlaylistRecentlyAddedAt() {
    playlists = await SpotifyApi.getPlaylistsSortedAddedAtFIXME($userId);
    selectedPlaylist = 3;
  }

  async function sortAlbumsRecentlyPlayed() {
    SpotifyApi.getMySavedAlbumsSortedRecentlyPlayed().then((items) => (albums = items));
    selectedAlbum = 1;
  }

  async function sortAlbumsRecentlyAdded() {
    SpotifyApi.getMySavedAlbumsSortedRecentlyAdded().then((items) => (albums = items));
    selectedAlbum = 2;
  }

  async function getLikedTracks() {
    likedTracks = await SpotifyApi.getLikedTracks();
  }
</script>

<h1>My Lib</h1>

<ListFilter
  displayTop={false}
  hasAlbums={albums.length > 0}
  hasPlaylists={playlists.length > 0}
  hasArtists={artists.length > 0}
/>

{#if $displayFilter.playlistOn}
  <detail>
    <summary><button on:click={getLikedTracks}>LIKED❤️</button></summary>
    <CollectionTrack items={likedTracks} />
  </detail>

  <h2>Playlists</h2>

  <div>
    <Button
      label="🗂️by-spotify"
      callback={sortPlaylistBySpotify}
      selected={selectedPlaylist === 1}
    />
    <Button label="🗂️abc" callback={sortPlaylistAlphabetically} selected={selectedPlaylist === 2} />
    <Button
      label="🗂️recently-added-atFIXME"
      callback={sortPlaylistRecentlyAddedAt}
      selected={selectedPlaylist === 3}
    />
  </div>

  <ul>
    <li>
      <CollectionItem
        imgUrl="/liked-songs-64.png"
        imgAlt="liked songs"
        title="Liked Songs"
        author={`${totalLikedTracks} titles`}
      />
    </li>

    <CollectionPlaylist items={playlists} />
  </ul>
{/if}

{#if $displayFilter.albumOn}
  <h2>Albums</h2>

  <Button
    label="sort-albums-recently-played"
    callback={sortAlbumsRecentlyPlayed}
    selected={selectedAlbum === 1}
  />

  <Button
    label="sort-albums-recently-added"
    callback={sortAlbumsRecentlyAdded}
    selected={selectedAlbum === 2}
  />

  <CollectionAlbum items={albums} />
{/if}

{#if $displayFilter.artistOn}
  <h2>Artists</h2>

  <CollectionArtist items={artists} />
{/if}

<style>
  li {
    display: flex;
  }
</style>
