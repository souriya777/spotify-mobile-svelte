<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';

  export let trackUri;

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];

  onMount(() => {
    SpotifyApi.getPlaylistsSortedBySpotify($userId).then((items) => (playlists = items));
  });

  let selected;

  function addTrackToPlaylist() {
    console.log(selected, trackUri, '✅');
    if (selected) {
      SpotifyApi.addSongToPlaylist(trackUri, selected);
    }
  }
</script>

<select bind:value={selected} on:change={addTrackToPlaylist}>
  <option value="-1">--add to playlist--</option>
  {#each playlists as list}
    <option value={list?.id}>
      {list?.name}{list?.id}
    </option>
  {/each}
</select>
