<script>
  import List from '@lib/List.svelte';
  import ListItemAlbum from '@lib/ListItemAlbum.svelte';

  /** @type {import('@js/spotify').SpotifyAlbum[]} */
  export let items;
</script>

<List>
  {#each items as item (item?.uri)}
    <ListItemAlbum {item} />
  {/each}
</List>
