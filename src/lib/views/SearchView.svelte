<script>
  import { debounce } from '@/js/souriya-utils';
  import SpotifyApi from '@/js/SpotifyApi';

  /** @type {import('@/js/spotify').SpotifySearch} */
  let searchResult = null;
  let displayTrackOn = true;
  let displayArtistOn = true;
  let displayPlaylistOn = true;
  let displayAlbumOn = true;

  const FIRST_RESULTS_LIMIT = 3;

  $: displayTopOn = displayTrackOn && displayArtistOn && displayPlaylistOn && displayAlbumOn;

  $: firstTracks = searchResult?.tracks?.slice(0, FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = searchResult?.artists?.slice(0, FIRST_RESULTS_LIMIT) ?? [];
  $: firstPlaylists = searchResult?.playlists?.slice(0, FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = searchResult?.albums?.slice(0, FIRST_RESULTS_LIMIT) ?? [];

  $: nextTracks = searchResult?.tracks?.slice(FIRST_RESULTS_LIMIT) ?? [];
  $: nextArtists = searchResult?.artists?.slice(FIRST_RESULTS_LIMIT) ?? [];
  $: nextPlaylists = searchResult?.playlists?.slice(FIRST_RESULTS_LIMIT) ?? [];
  $: nextAlbums = searchResult?.albums?.slice(FIRST_RESULTS_LIMIT) ?? [];

  const updateQuery = (e) =>
    debounce(async () => {
      const query = e?.target?.value;
      if (query) {
        console.log(query);
        searchResult = await SpotifyApi.search(query);
      }
    }, 750);
</script>

<div>
  <h1>search</h1>
  <input type="text" on:input={updateQuery} />

  <div>
    <h2>filters</h2>
    <button
      class:active={displayTopOn}
      on:click={() => {
        displayTrackOn = true;
        displayArtistOn = true;
        displayPlaylistOn = true;
        displayAlbumOn = true;
      }}>top</button
    >
    {#if firstTracks.length > 0}
      <button
        class:active={!displayTopOn && displayTrackOn}
        on:click={() => {
          displayTrackOn = true;
          displayArtistOn = false;
          displayPlaylistOn = false;
          displayAlbumOn = false;
        }}>track</button
      >
    {/if}
    {#if firstArtists.length > 0}
      <button
        class:active={!displayTopOn && displayArtistOn}
        on:click={() => {
          displayTrackOn = false;
          displayArtistOn = true;
          displayPlaylistOn = false;
          displayAlbumOn = false;
        }}>artist</button
      >
    {/if}
    {#if firstPlaylists.length > 0}
      <button
        class:active={!displayTopOn && displayPlaylistOn}
        on:click={() => {
          displayTrackOn = false;
          displayArtistOn = false;
          displayPlaylistOn = true;
          displayAlbumOn = false;
        }}>playlist</button
      >
    {/if}
    {#if firstAlbums.length > 0}
      <button
        class:active={!displayTopOn && displayAlbumOn}
        on:click={() => {
          displayTrackOn = false;
          displayArtistOn = false;
          displayPlaylistOn = false;
          displayAlbumOn = true;
        }}>album</button
      >
    {/if}
  </div>

  <h2>results</h2>

  {#if displayTrackOn}
    <h3>1st tracks</h3>
    <ul>
      {#each firstTracks as track}
        {@const album = track?.album}
        {@const image = album?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={track?.name} height={image?.height} width={image?.width} />
          {track?.name}
          <small>song</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayArtistOn}
    <h3>1st artists</h3>
    <ul>
      {#each firstArtists as artist}
        {@const image = artist?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={artist?.name} height={image?.height} width={image?.width} />
          {artist?.name}
          <small>artist</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayPlaylistOn}
    <h3>1st playlists</h3>
    <ul>
      {#each firstPlaylists as playlist}
        {@const image = playlist?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={playlist?.name} height={image?.height} width={image?.width} />
          {playlist?.name}
          <small>playlist</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayAlbumOn}
    <h3>1st albums</h3>
    <ul>
      {#each firstAlbums as album}
        {@const image = album?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={album?.name} height={image?.height} width={image?.width} />
          {album?.name}
          <small>album</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayTrackOn}
    <h3>next tracks</h3>
    <ul>
      {#each nextTracks as track}
        {@const album = track?.album}
        {@const image = album?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={track?.name} height={image?.height} width={image?.width} />
          {track?.name}
          <small>song</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayArtistOn}
    <h3>next artists</h3>
    <ul>
      {#each nextArtists as artist}
        {@const image = artist?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={artist?.name} height={image?.height} width={image?.width} />
          {artist?.name}
          <small>artist</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayPlaylistOn}
    <h3>next playlists</h3>
    <ul>
      {#each nextPlaylists as playlist}
        {@const image = playlist?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={playlist?.name} height={image?.height} width={image?.width} />
          {playlist?.name}
          <small>playlist</small>
        </li>
      {/each}
    </ul>
  {/if}

  {#if displayAlbumOn}
    <h3>next albums</h3>
    <ul>
      {#each nextAlbums as album}
        {@const image = album?.images?.at(-1)}

        <li>
          <img src={image?.url} alt={album?.name} height={image?.height} width={image?.width} />
          {album?.name}
          <small>album</small>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  img {
    display: inline-block;
    max-width: 50px;
    height: auto;
  }

  button.active {
    background-color: var(--color-active);
  }
</style>
