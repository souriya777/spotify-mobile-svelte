<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewDetail from '@lib/views/ViewDetail.svelte';
  import Tracks from '@lib/Tracks.svelte';
  import User from '@lib/User.svelte';

  export let id;

  /** @type {import('@js/spotify').SpotifyTrack[]} */
  let tracks = [];
  /** @type {import('@js/spotify').SpotifyPlaylist} */
  let playlist;
  /** @type {import('@js/spotify').SpotifyUser} */
  let user;

  $: if (playlist?.owner?.id) {
    SpotifyApi.getUser(playlist.owner.id).then((spotifyUser) => {
      user = spotifyUser;
    });
  }

  onMount(() => {
    // SpotifyApi.getTracks(id).then((items) => (tracks = items));
    SpotifyApi.getPlaylistDetails(id).then((item) => (playlist = item));
  });

  // TODO factorize with PlaylistView
</script>

<ViewDetail title={playlist?.name} images={playlist?.images}>
  <svelte:fragment slot="desc__title">
    {playlist?.name}
  </svelte:fragment>

  <svelte:fragment slot="desc__detail">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html playlist?.description}
  </svelte:fragment>

  <svelte:fragment slot="desc__owner">
    <User
      userPictureUrl={user?.images?.at(0)?.url}
      username={playlist?.owner?.display_name}
      mini={true}
    />
  </svelte:fragment>

  <Tracks uri={playlist?.uri} {tracks} />
</ViewDetail>
