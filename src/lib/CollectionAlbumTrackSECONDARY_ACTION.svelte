<script>
  import List from '@lib/List.svelte';
  import CollectionItem from '@lib/ListItem.svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import AddToPlaylist from '@lib/AddToPlaylist.svelte';
  import { onTap } from '@js/event-utils';

  /** @type {import('@js/spotify').SpotifyAlbumTrack[]} */
  export let items;
</script>

<List>
  {#each items as track (track?.uri)}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

    <li>
      {track.uri}
      <button use:onTap={() => SpotifyApi.unlikeTrack(track.id)}>🤍</button>
      <button use:onTap={() => SpotifyApi.likeTrack(track.id)}>💚</button>
      <button
        use:onTap={() =>
          SpotifyApi.addSongToMultiplePlaylists(track.uri, [
            '3lZmcYRykUqUkjoH1tChCe',
            '5iLCxA1kjRDD9xpLD9Ym2z',
          ])}>add to 2 playlists</button
      >
      <CollectionItem title={track?.name} author={artist} />
      <AddToPlaylist trackUri={track.uri} />
    </li>
  {/each}
</List>
