<script>
  import { goDetail } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifySearchArtist} */
  export let item;
  export let owner = '';
</script>

<ListItem
  bubbleImage={true}
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  callbackFn={() =>
    goDetail('ArtistView', {
      id: item?.id,
      uri: item?.uri,
    })}
/>
