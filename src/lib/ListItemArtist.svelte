<script>
  import { createView } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifySearchArtist} */
  export let item;
  export let owner = '';
</script>

<ListItem
  isListArtist={true}
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  createViewFn={() =>
    createView('ArtistView', {
      id: item?.id,
    })}
/>
