<script>
  import List from '@lib/List.svelte';
  import ListItemTrack from '@lib/ListItemTrack.svelte';

  /** @type {import('@js/spotify').SpotifyTrack[]} */
  export let items;
</script>

<List>
  {#each items as item (item?.uri)}
    <ListItemTrack {item} />
  {/each}
</List>
