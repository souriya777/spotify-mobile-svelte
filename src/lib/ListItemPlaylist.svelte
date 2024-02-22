<script>
  import { goDetail } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist} */
  export let item;
  export let hasPrefix = false;

  $: displayName = item?.owner?.display_name;
  $: owner = hasPrefix ? `Playlist &bull; ${displayName}` : displayName;
</script>

<ListItem
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  callbackFn={() =>
    goDetail('PlaylistView', {
      id: item?.id,
      uri: item?.uri,
    })}
/>
