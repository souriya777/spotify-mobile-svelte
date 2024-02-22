<script>
  import SpotifyApi from '@js/SpotifyApi';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyTrack} */
  export let item;
  export let hasPrefix = false;

  $: artist = item?.artists?.map((a) => a?.name).join(', ');
  $: owner = hasPrefix ? `Song &bull; ${artist}` : artist;
</script>

<ListItem
  uri={item?.uri}
  title={item?.name}
  {owner}
  images={item?.album?.images}
  imageAlt={item?.name}
  callbackFn={() => SpotifyApi.playTrack(item?.uri)}
/>
