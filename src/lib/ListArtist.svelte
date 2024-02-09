<script>
  import { createView } from '@js/view-utils';
  import List from '@lib/List.svelte';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifySearchArtist[]} */
  export let items;
</script>

<List>
  {#each items as item (item?.id)}
    <ListItem
      isListArtist={true}
      title={item?.name}
      images={item?.images}
      imageAlt={item?.name}
      createViewFn={() =>
        createView('ArtistView', {
          id: item?.id,
        })}
    />
  {/each}
</List>
