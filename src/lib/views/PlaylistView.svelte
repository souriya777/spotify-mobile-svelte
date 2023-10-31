<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import CollectionTrack from '@/lib/CollectionTrack.svelte';
  import PlaylistTopImage from './PlaylistTopImage.svelte';

  export let id;

  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let tracks = [];

  onMount(() => {
    SpotifyApi.getPlaylistTracks(id).then((items) => (tracks = items));
  });
</script>

Playlist {id}

<PlaylistTopImage />
<CollectionTrack playlistId={id} items={tracks} />
