<script>
  import { goDetail, updateRecentSearch } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist} */
  export let item;
  export let hasPrefix = false;

  $: displayName = item?.owner?.display_name;
  $: owner = hasPrefix ? `Playlist &bull; ${displayName}` : displayName;
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
    updateRecentSearch(item);

    goDetail('PlaylistView', {
      id: item?.id,
      uri: item?.uri,
    });
  }}
/>
