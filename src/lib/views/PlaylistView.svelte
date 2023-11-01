<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import CollectionTrack from '@/lib/CollectionTrack.svelte';
  import PlaylistTopImage from './PlaylistTopImage.svelte';

  export let id;

  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let tracks = [];
  /** @type {import('@/js/spotify').SpotifyPlaylist} */
  let playlist;

  onMount(() => {
    SpotifyApi.getPlaylistTracks(id).then((items) => (tracks = items));
    SpotifyApi.getPlaylistDetails(id).then((item) => (playlist = item));
  });
</script>

Playlist {id}

<PlaylistTopImage images={playlist?.images} alt={playlist?.name} />
<CollectionTrack playlistId={id} items={tracks} />
