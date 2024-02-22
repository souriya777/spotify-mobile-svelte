<script>
  import SpotifyApi from '@js/SpotifyApi';
  import ListItem from '@lib/ListItem.svelte';

  export let contextUri = null;
  /** @type {import('@js/spotify').SpotifyTrack[]} */
  export let tracks;
  export let hideImage = false;
</script>

<ul>
  {#each tracks as track, i (track?.uri)}
    {@const album = track?.album}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}
    <ListItem
      {hideImage}
      uri={track?.uri}
      title={track?.name}
      owner={artist}
      images={album?.images}
      imageAlt={album?.name}
      callbackFn={() => SpotifyApi.playTrackWithContext(track?.uri, contextUri, i)}
    />
  {/each}
</ul>
