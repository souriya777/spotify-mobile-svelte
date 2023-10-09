<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import SpotifyListTrack from '@/lib/SpotifyListTrack.svelte';

  export let id;

  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let tracks = [];

  onMount(() => {
    SpotifyApi.getPlaylistItems(id).then((items) => (tracks = items));
  });
</script>

Playlist {id}

<SpotifyListTrack items={tracks} />
