<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewDetail from '@/lib/views/ViewDetail.svelte';
  // import Tracks from '@lib/Tracks.svelte';
  // import User from '@lib/User.svelte';

  export let id;

  /** @type {import('@js/spotify').SpotifyArtist} */
  let artist;
  // /** @type {import('@js/spotify').SpotifyTrack[]} */
  // let tracks = [];
  // /** @type {import('@js/spotify').SpotifyPlaylist} */
  // let playlist;
  // /** @type {import('@js/spotify').SpotifyUser} */
  // let user;

  // $: if (playlist?.owner?.id) {
  //   SpotifyApi.getUser(playlist.owner.id).then((spotifyUser) => {
  //     user = spotifyUser;
  //   });
  // }

  onMount(() => {
    SpotifyApi.getArtist(id).then((item) => (artist = item));
    // SpotifyApi.getTracks(id).then((items) => (tracks = items));
    // SpotifyApi.getPlaylistDetails(id).then((item) => (playlist = item));
  });

  // TODO factorize with PlaylistView
</script>

<ViewDetail title={artist?.name} images={artist?.images} isArtist={true}>
  <svelte:fragment slot="desc__title">
    {artist?.name}
  </svelte:fragment>

  <!-- TODO -->
  <!-- <Tracks contextUri={playlist?.uri} {tracks} /> -->

  <div>POPULAR</div>
  <div>DISCOGRAPHY (default: POPULAR RELEASE)</div>
  <div>FEATURING ???</div>
  <div>APPEARS ON ???</div>
  <div>FAN ALSO LIKE</div>

  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas
  atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum
  corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam
  nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis
  quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur
  adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam
  mollitia, ex alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum
  dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit,
  amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit,
  amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit,
  amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit,
  amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit,
  amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit,
  amet consectetur adipisicing elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis
  reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos libero voluptatum corporis
  consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, totam nisi?
  Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex alias sequi blanditiis quos
  libero voluptatum corporis consequatur nulla. Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fuga, totam nisi? Fuga, molestiae, quas atque quis reprehenderit rem ipsam mollitia, ex
  alias sequi blanditiis quos libero voluptatum corporis consequatur nulla.
</ViewDetail>
