<script>
  import { goDetail } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyAlbum} */
  export let item;
  export let hasPrefix = false;

  $: artist = item?.artists?.map((a) => a?.name).join(', ');
  $: owner = hasPrefix ? `album &bull; ${artist}` : artist;
</script>

<ListItem
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  callbackFn={() =>
    goDetail('AlbumView', {
      id: item?.id,
      uri: item?.uri,
    })}
/>
