<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let likedTracks = [];

  onMount(async () => {
    // get playlist
    playlists = await SpotifyApi.getPlaylistsRecentlyAdded($userId);

    // get album
    albums = await SpotifyApi.getMyAlbums();
  });

  async function sortAlphabetically() {
    playlists = await SpotifyApi.getPlaylistsSortedAlphabetically($userId);
  }

  async function sortRecentlyAddedAt() {
    playlists = await SpotifyApi.getPlaylistsSortedAddedAtFIXME($userId);
  }

  async function getLikedTracks() {
    likedTracks = await SpotifyApi.getLikedTracks();
  }
</script>

<h1>My Lib</h1>

<h2>Playlists ABC</h2>

<detail>
  <summary><button on:click={getLikedTracks}>LIKED❤️</button></summary>
  <ul>
    {#each likedTracks as track, i}
      {@const album = track?.album}
      {@const image = album?.images?.at(-1)}

      <li>
        <img src={image?.url} alt={album?.name} height={image?.height} width={image?.width} />
        {i + 1}
        {track?.name} <small>{album?.name}</small>
      </li>
    {/each}
  </ul>
</detail>

<h2>Playlists</h2>

<div>
  <button on:click={sortAlphabetically}>🗂️abc</button>
  <button on:click={sortRecentlyAddedAt}>🗂️recently-added-atFIXME</button>
</div>

<ul>
  {#each playlists as list}
    {@const image = list?.images?.at(-1)}

    <li>
      <img src={image?.url} alt={list?.name} height={image?.height} width={image?.width} />
      {list?.name}
    </li>
  {/each}
</ul>

<h2>Albums</h2>

<ul>
  {#each albums as album}
    {@const image = album?.images?.at(-1)}
    <li>
      <img src={image?.url} alt={album?.name} height={image?.height} width={image?.width} />
      {album?.name}
    </li>
  {/each}
</ul>

<style>
  img {
    display: inline-block;
    max-width: 50px;
    height: auto;
  }
</style>
