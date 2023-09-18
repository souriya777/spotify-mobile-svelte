<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Button from './Button.svelte';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let likedTracks = [];

  let selected = 1;

  onMount(async () => {
    // get playlist
    sortBySpotify();

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
  <Button label="🗂️by-spotify" callback={sortBySpotify} selected={selected === 1} />
  <Button label="🗂️abc" callback={sortAlphabetically} selected={selected === 2} />
  <Button
    label="🗂️recently-added-atFIXME"
    callback={sortRecentlyAddedAt}
    selected={selected === 3}
  />
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
