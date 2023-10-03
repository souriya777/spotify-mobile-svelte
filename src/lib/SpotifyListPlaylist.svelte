<script>
  import SpotifyListItem from '@/lib/SpotifyListItem.svelte';
  import SpotifyList from '@/lib/SpotifyList.svelte';
  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  export let items;
</script>

<SpotifyList>
  {#each items as list}
    {@const image = list?.images?.at(-1)}

    <li>
      <SpotifyListItem
        imgUrl={image?.url}
        imgHeight={image?.height}
        imgWidth={image?.width}
        imgAlt={list?.name}
        title={list?.name}
        author={list?.owner?.display_name}
      />
    </li>
  {/each}
</SpotifyList>
