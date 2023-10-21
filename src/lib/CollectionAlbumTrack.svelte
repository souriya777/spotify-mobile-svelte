<script>
  import Collection from '@/lib/Collection.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import AddToPlaylist from '@/lib/AddToPlaylist.svelte';

  /** @type {import('@/js/spotify').SpotifyAlbumTrack[]} */
  export let items;
</script>

<Collection>
  {#each items as track, i}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

    <li>
      {track.uri}
      <button on:click={() => SpotifyApi.unlikeTrack(track.id)}>🤍</button>
      <button on:click={() => SpotifyApi.likeTrack(track.id)}>💚</button>
      <button
        on:click={() =>
          SpotifyApi.addSongToMultiplePlaylists(track.uri, [
            '3lZmcYRykUqUkjoH1tChCe',
            '5iLCxA1kjRDD9xpLD9Ym2z',
          ])}>add to 2 playlists</button
      >
      {i}.
      <CollectionItem title={track?.name} author={artist} />
      <AddToPlaylist trackUri={track.uri} />
    </li>
  {/each}
</Collection>
