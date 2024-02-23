<script>
  import { goDetail, updateRecentSearch } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifySearchArtist} */
  export let item;
  export let hasPrefix = false;
  export let hasClear = false;

  $: owner = hasPrefix ? `Artist` : '';
</script>

<ListItem
  bubbleImage={true}
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  {hasClear}
  callbackFn={() => {
    updateRecentSearch(item);

    goDetail('ArtistView', {
      id: item?.id,
      uri: item?.uri,
    });
  }}
/>
