<script>
  import { viewName, searchRecent } from '@js/store';
  import { updateRecentSearch } from '@js/spotify-utils';
  import SpotifyApi from '@js/SpotifyApi';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyTrack} */
  export let item;
  export let hasPrefix = false;
  export let hasClear = false;

  $: artist = item?.artists?.map((a) => a?.name).join(', ');
  $: owner = hasPrefix ? `Song &bull; ${artist}` : artist;
</script>

<ListItem
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.album?.images}
  imageAlt={item?.name}
  {hasClear}
  callbackFn={() => {
    $searchRecent = updateRecentSearch($viewName, $searchRecent, item);

    SpotifyApi.playTrack(item?.uri);
  }}
/>
