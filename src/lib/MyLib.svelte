<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];

  onMount(async () => {
    // get playlist
    playlists = await SpotifyApi.getPlaylists($userId);

    // get album
    albums = await SpotifyApi.getMyAlbums();
  });
</script>

<h1>My Lib</h1>

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
