<script>
  import SpotifyListItem from '@/lib/SpotifyListItem.svelte';
  import SpotifyList from '@/lib/SpotifyList.svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  export let items;

  const FIXME_playlistId = '5iLCxA1kjRDD9xpLD9Ym2z';
</script>

<SpotifyList>
  {#each items as track}
    {@const album = track?.album}
    {@const image = album?.images?.at(-1)}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

    <li>
      <button on:click={() => SpotifyApi.addSongToPlaylist(track.uri, FIXME_playlistId)}>
        <SpotifyListItem
          imgUrl={image?.url}
          imgHeight={image?.height}
          imgWidth={image?.width}
          imgAlt={album?.name}
          title={track?.name}
          author={artist}
        />
      </button>
    </li>
  {/each}
</SpotifyList>
