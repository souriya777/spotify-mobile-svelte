<script>
  import { viewName, searchRecent } from '@js/store';
  import { updateRecentSearch } from '@js/spotify-utils';
  import { goDetail } from '@js/view-utils';
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
    $searchRecent = updateRecentSearch($viewName, $searchRecent, item);

    goDetail('PlaylistView', {
      id: item?.id,
      uri: item?.uri,
    });
  }}
/>
