<script>
  import List from '@lib/List.svelte';
  import ListItemArtist from '@lib/ListItemArtist.svelte';

  /** @type {import('@js/spotify').SpotifySearchArtist[]} */
  export let items;
</script>

<List>
  {#each items as item (item?.uri)}
    <ListItemArtist {item} />
  {/each}
</List>
