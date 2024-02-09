<script>
  import { createView } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist} */
  export let item;
  export let hasPrefix = false;

  $: displayName = item?.owner?.display_name;
  $: owner = hasPrefix ? `playlist &bull; ${displayName}` : displayName;
</script>

<ListItem
  title={item?.name}
  {owner}
  images={item?.images}
  imageAlt={item?.name}
  createViewFn={() =>
    createView('PlaylistView', {
      id: item?.id,
    })}
/>
