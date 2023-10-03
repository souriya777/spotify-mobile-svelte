<script>
  import { onMount } from 'svelte';
  import { userId } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';
  import Button from '@/lib/Button.svelte';
  import PreviewSummary from '@/lib/PreviewSummary.svelte';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  let playlists = [];
  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  let albums = [];
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let likedTracks = [];

  let selected = 1;
  let totalLikedTracks;

  onMount(async () => {
    // get playlist
    sortBySpotify();

    SpotifyApi.getLikedTracks().then((tracks) => (totalLikedTracks = tracks?.length));

    // get album
    albums = await SpotifyApi.getMyAlbums();
  });

  async function sortBySpotify() {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
    selected = 1;
  }

  async function sortAlphabetically() {
    playlists = await SpotifyApi.getPlaylistsSortedAlphabetically($userId);
    selected = 2;
  }

  async function sortRecentlyAddedAt() {
    playlists = await SpotifyApi.getPlaylistsSortedAddedAtFIXME($userId);
    selected = 3;
  }

  async function getLikedTracks() {
    likedTracks = await SpotifyApi.getLikedTracks();
  }
</script>

<h1>My Lib</h1>

<h2>Playlists ABC</h2>

<detail>
  <summary><button on:click={getLikedTracks}>LIKED❤️</button></summary>
  <ul>
    {#each likedTracks as track, i}
      {@const album = track?.album}
      {@const image = album?.images?.at(-1)}
      {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

      <li>
        {i + 1}
        <PreviewSummary
          imgUrl={image?.url}
          imgHeight={image?.height}
          imgWidth={image?.width}
          imgAlt={album?.name}
          title={track?.name}
          author={artist}
        />
      </li>
    {/each}
  </ul>
</detail>

<h2>Playlists</h2>

<div>
  <Button label="🗂️by-spotify" callback={sortBySpotify} selected={selected === 1} />
  <Button label="🗂️abc" callback={sortAlphabetically} selected={selected === 2} />
  <Button
    label="🗂️recently-added-atFIXME"
    callback={sortRecentlyAddedAt}
    selected={selected === 3}
  />
</div>

<ul>
  <li>
    <PreviewSummary
      imgUrl="https://misc.scdn.co/liked-songs/liked-songs-64.png"
      imgAlt="liked songs"
      title="Liked Songs"
      author={`${totalLikedTracks} titles`}
    />
  </li>

  {#each playlists as list}
    {@const image = list?.images?.at(-1)}

    <li>
      <PreviewSummary
        imgUrl={image?.url}
        imgHeight={image?.height}
        imgWidth={image?.width}
        imgAlt={list?.name}
        title={list?.name}
        author={list?.owner?.display_name}
      />
    </li>
  {/each}
</ul>

<h2>Albums</h2>

<ul>
  {#each albums as album}
    {@const image = album?.images?.at(-1)}
    {@const artist = album?.artists?.map((t) => t?.name).join(', ')}

    <li>
      <PreviewSummary
        imgUrl={image?.url}
        imgHeight={image?.height}
        imgWidth={image?.width}
        imgAlt={album?.name}
        title={album?.name}
        author={artist}
      />
    </li>
  {/each}
</ul>

<style>
  li {
    display: flex;
  }
</style>
