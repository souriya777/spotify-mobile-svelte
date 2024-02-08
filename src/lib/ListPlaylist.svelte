<script>
  import { createPlaylistView } from '@js/view-utils';
  import List from '@lib/List.svelte';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  export let items;
</script>

<List>
  {#each items as item (item?.id)}
    <ListItem
      title={item?.name}
      owner={item?.owner?.display_name}
      images={item?.images}
      imageAlt={item?.name}
      createViewFn={() => createPlaylistView(item.id)}
    />
  {/each}
</List>
