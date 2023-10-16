<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import CollectionTrack from '@/lib/CollectionTrack.svelte';

  export let id;

  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let tracks = [];

  onMount(() => {
    SpotifyApi.getPlaylistItems(id).then((items) => (tracks = items));
  });
</script>

Playlist {id}

<CollectionTrack playlistId={id} items={tracks} />
