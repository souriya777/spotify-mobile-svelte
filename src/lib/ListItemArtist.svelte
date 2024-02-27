<script>
  import { viewName, searchRecent } from '@js/store';
  import { updateRecentSearch } from '@js/spotify-utils';
  import { goDetail } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyArtist} */
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
    $searchRecent = updateRecentSearch($viewName, $searchRecent, item);

    goDetail('ArtistView', {
      id: item?.id,
      uri: item?.uri,
    });
  }}
/>
