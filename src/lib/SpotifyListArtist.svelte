<script>
  import SpotifyListItem from '@/lib/SpotifyListItem.svelte';
  import SpotifyList from '@/lib/SpotifyList.svelte';
  /** @type {import('@/js/spotify').SpotifySearchArtist[]} */
  export let items;
</script>

<SpotifyList>
  {#each items as artist}
    {@const image = artist?.images?.at(-1)}

    <li class="spotify-list-artist-item">
      <SpotifyListItem
        imgUrl={image?.url}
        imgHeight={image?.height}
        imgWidth={image?.width}
        imgAlt={artist?.name}
        title={artist?.name}
      />
    </li>
  {/each}
</SpotifyList>

<style>
  :global(.spotify-list-artist-item img) {
    border-radius: 50%;
  }
</style>
