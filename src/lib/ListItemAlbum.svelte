<script>
  import { createView } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyAlbum} */
  export let item;
  export let hasPrefix = false;

  $: artist = item?.artists?.map((a) => a?.name).join(', ');
  $: owner = hasPrefix ? `album &bull; ${artist}` : artist;
</script>

<ListItem
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  createViewFn={() =>
    createView('AlbumView', {
      id: item?.id,
    })}
/>
