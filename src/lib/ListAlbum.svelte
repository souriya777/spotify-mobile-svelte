<script>
  import { createView } from '@js/view-utils';
  import List from '@lib/List.svelte';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyAlbum[]} */
  export let items;
</script>

<List>
  {#each items as item (item?.id)}
    {@const artist = item?.artists?.map((a) => a?.name).join(', ')}
    <ListItem
      title={item?.name}
      owner={artist}
      images={item?.images}
      imageAlt={item?.name}
      createViewFn={() =>
        createView('AlbumView', {
          id: item?.id,
        })}
    />
  {/each}
</List>
