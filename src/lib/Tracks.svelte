<script>
  import { trackUri } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import ListItem from '@lib/ListItem.svelte';

  export let uri = null;
  /** @type {import('@js/spotify').SpotifyTrack[]} */
  export let tracks;
  export let hideImage = false;

  function play(indexPosition, currentTrackUri) {
    $trackUri = currentTrackUri;
    SpotifyApi.playTrackWithContext(uri, currentTrackUri, indexPosition);
  }
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
      callbackFn={() => play(i, track?.uri)}
    />
  {/each}
</ul>
