<script>
  import { onTap } from '@js/event-utils';
  import List from '@lib/List.svelte';
  import CollectionItem from '@lib/ListItem.svelte';
  import SpotifyApi from '@js/SpotifyApi';
  import AddToPlaylist from '@lib/AddToPlaylist.svelte';

  /** @type {import('@js/spotify').SpotifyTrack[]} */
  export let items;
  export let playlistId = null;

  async function move(currentIndex, newIndex) {
    if (playlistId) {
      items = await SpotifyApi.moveTrackInPlaylist(playlistId, items, currentIndex, newIndex);
    }
  }
</script>

<List>
  {#each items as track, i}
    {@const album = track?.album}
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

      {#if playlistId}
        <div>
          <button use:onTap={() => move(i, i - 1)}>⬆️</button>
          <button use:onTap={() => move(i, i + 1)}>⬇️</button>
        </div>
      {/if}

      <CollectionItem images={album?.images} title={track?.name} author={artist} />

      <AddToPlaylist trackUri={track.uri} />
    </li>
  {/each}
</List>
