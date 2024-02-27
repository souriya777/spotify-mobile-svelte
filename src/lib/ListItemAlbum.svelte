<script>
  import { viewName, searchRecent } from '@js/store';
  import { updateRecentSearch } from '@js/spotify-utils';
  import { goDetail } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyAlbum} */
  export let item;
  export let hasPrefix = false;

  $: artist = item?.artists?.map((a) => a?.name).join(', ');
  $: owner = hasPrefix ? `Album &bull; ${artist}` : artist;
  export let hasClear = false;
</script>

<ListItem
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  {hasClear}
  callbackFn={() => {
    $searchRecent = updateRecentSearch($viewName, $searchRecent, item);

    goDetail('AlbumView', {
      id: item?.id,
      uri: item?.uri,
    });
  }}
/>
