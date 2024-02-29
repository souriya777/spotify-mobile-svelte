<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewDetail from '@/lib/views/ViewDetail.svelte';
  import Tracks from '@lib/Tracks.svelte';
  import User from '@lib/User.svelte';
  import SpotifyTrackAdapter from '@js/SpotifyTrackAdapter';

  export let id;

  /** @type {import('@js/spotify').SpotifyAlbum} */
  let album;
  /** @type {import('@js/spotify').SpotifyAlbumTrack[]} */
  let albumTracks = [];

  $: tracks = albumTracks?.map((albumTrack) => SpotifyTrackAdapter.adaptAlbumTrack(albumTrack));

  onMount(() => {
    SpotifyApi.getAlbum(id).then((items) => (album = items));
    SpotifyApi.getAlbumTracks(id).then((items) => (albumTracks = items));
  });
</script>

<ViewDetail title={album?.name} images={album?.images}>
  <svelte:fragment slot="desc__title">
    {album?.name}
  </svelte:fragment>

  <svelte:fragment slot="desc__owner">
    <User
      userPictureUrl={album?.images?.at(0)?.url}
      username={album?.artists?.map((a) => a?.name).join(', ')}
      mini={true}
    />
  </svelte:fragment>

  <svelte:fragment slot="desc__type-year">
    {album?.album_type?.charAt(0).toUpperCase() +
      album?.album_type?.slice(1)}&nbsp;&bull;&nbsp;{album?.release_date?.slice(0, 4)}
  </svelte:fragment>

  <Tracks hideImage={true} contextUri={album?.uri} {tracks} />
</ViewDetail>
