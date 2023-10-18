<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import CollectionAlbumTrack from '@/lib/CollectionAlbumTrack.svelte';

  export let id;

  /** @type {import('@/js/spotify').SpotifyAlbumTrack[]} */
  let tracks = [];

  onMount(() => {
    SpotifyApi.getAlbumTracks(id).then((items) => (tracks = items));
  });
</script>

Album {id}
<CollectionAlbumTrack items={tracks} />
