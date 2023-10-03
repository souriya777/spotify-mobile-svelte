<script>
  import SpotifyListItem from '@/lib/SpotifyListItem.svelte';
  import SpotifyList from '@/lib/SpotifyList.svelte';
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  export let items;
</script>

<SpotifyList>
  {#each items as track}
    {@const album = track?.album}
    {@const image = album?.images?.at(-1)}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

    <li>
      <SpotifyListItem
        imgUrl={image?.url}
        imgHeight={image?.height}
        imgWidth={image?.width}
        imgAlt={album?.name}
        title={track?.name}
        author={artist}
      />
    </li>
  {/each}
</SpotifyList>
