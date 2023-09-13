<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import { isEmpty } from '@/js/string-utils';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlistsAlphabetically = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let likedTracks = [];

  onMount(async () => {
    // get playlist
    playlists = await SpotifyApi.getPlaylists($userId);

    // get album
    albums = await SpotifyApi.getMyAlbums();
  });

  async function getAlphabetically() {
    playlistsAlphabetically = await SpotifyApi.getPlaylistsSortedAlphabetically($userId);
  }

  async function getLikedTracks() {
    likedTracks = await SpotifyApi.getLikedSongs();
  }
</script>

<h1>My Lib</h1>

<h2>Playlists ABC</h2>

<detail>
  <summary><button on:click={getLikedTracks}>LIKED❤️</button></summary>
  {#if likedTracks}
    <ul>
      {#each likedTracks as track, i}
        {@const album = track?.album}
        <!-- TODO tune it for performance -->
        {@const image = album?.images?.[2]}
        <li>
          <img src={image?.url} alt={album?.name} height={image?.height} width={image?.width} />
          {i + 1}
          {track?.name} <small>{album?.name}</small>
        </li>
      {/each}
    </ul>
  {/if}
</detail>

<detail>
  <summary
    ><button on:click={getAlphabetically}>playlists ABC</button
    >{playlistsAlphabetically?.length}</summary
  >
  {#if playlistsAlphabetically}
    <ul>
      {#each playlistsAlphabetically as list}
        <li>
          {isEmpty(list?.name) ? '🟡' + list?.owner?.display_name : list?.name}
        </li>
      {/each}
    </ul>
  {/if}
</detail>

<h2>Playlists</h2>

{#if playlists}
  <ul>
    {#each playlists as list}
      <li>{list?.name}</li>
    {/each}
  </ul>
{/if}

<h2>Albums</h2>

{#if albums}
  <ul>
    {#each albums as list}
      <li>{list?.name}</li>
    {/each}
  </ul>
{/if}

<style>
  img {
    display: inline-block;
  }
</style>
