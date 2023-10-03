<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Button from '@/lib/Button.svelte';
  import SpotifyListItem from '@/lib/SpotifyListItem.svelte';
  import SpotifyListTrack from '@/lib/SpotifyListTrack.svelte';
  import SpotifyListPlaylist from '@/lib/SpotifyListPlaylist.svelte';
  import SpotifyListAlbum from '@/lib/SpotifyListAlbum.svelte';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let likedTracks = [];

  let selected = 1;
  let totalLikedTracks;

  onMount(async () => {
    // get playlist
    sortBySpotify();

    SpotifyApi.getLikedTracks().then((tracks) => (totalLikedTracks = tracks?.length));

    // get album
    albums = await SpotifyApi.getMyAlbums();
  });

  async function sortBySpotify() {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
    selected = 1;
  }

  async function sortAlphabetically() {
    playlists = await SpotifyApi.getPlaylistsSortedAlphabetically($userId);
    selected = 2;
  }

  async function sortRecentlyAddedAt() {
    playlists = await SpotifyApi.getPlaylistsSortedAddedAtFIXME($userId);
    selected = 3;
  }

  async function getLikedTracks() {
    likedTracks = await SpotifyApi.getLikedTracks();
  }
</script>

<h1>My Lib</h1>

<h2>Playlists ABC</h2>

<detail>
  <summary><button on:click={getLikedTracks}>LIKED❤️</button></summary>
  <SpotifyListTrack items={likedTracks} />
</detail>

<h2>Playlists</h2>

<div>
  <Button label="🗂️by-spotify" callback={sortBySpotify} selected={selected === 1} />
  <Button label="🗂️abc" callback={sortAlphabetically} selected={selected === 2} />
  <Button
    label="🗂️recently-added-atFIXME"
    callback={sortRecentlyAddedAt}
    selected={selected === 3}
  />
</div>

<ul>
  <li>
    <SpotifyListItem
      imgUrl="https://misc.scdn.co/liked-songs/liked-songs-64.png"
      imgAlt="liked songs"
      title="Liked Songs"
      author={`${totalLikedTracks} titles`}
    />
  </li>

  <SpotifyListPlaylist items={playlists} />
</ul>

<h2>Albums</h2>

<SpotifyListAlbum items={albums} />

<style>
  li {
    display: flex;
  }
</style>
