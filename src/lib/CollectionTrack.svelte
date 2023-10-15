<script>
  import Collection from '@/lib/Collection.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import { selectedPlaylistId } from '@/js/store';

  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  export let items;

  function moveUp(songIndex, newPosition) {
    if (songIndex > 0) {
      const cloneItems = [...items];

      const songToMove = cloneItems[songIndex];
      // Remove the song from its current position
      cloneItems.splice(songIndex, 1);
      // Insert the song in the new position
      cloneItems.splice(newPosition, 0, songToMove);

      items = [...cloneItems];
    }
  }

  function moveDown(songIndex, newPosition) {
    const cloneItems = [...items];

    if (songIndex < cloneItems.length - 1) {
      const songToMove = cloneItems[songIndex];
      // Remove the song from its current position
      cloneItems.splice(songIndex, 1);
      // Insert the song in the new position
      cloneItems.splice(newPosition, 0, songToMove);

      items = [...cloneItems];
    }
  }
</script>

<Collection>
  {#each items as track, i}
    {@const album = track?.album}
    {@const image = album?.images?.at(-1)}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

    <li>
      <div>
        {#if i > 0}
          <button on:click={() => moveUp(i, i - 1)}>⬆️</button>
        {/if}
        {#if i < items.length - 1}
          <button on:click={() => moveDown(i, i + 1)}>⬇️</button>
        {/if}
      </div>
      <button on:click={() => SpotifyApi.addSongToPlaylist(track.uri, $selectedPlaylistId)}>
        <CollectionItem
          imgUrl={image?.url}
          imgHeight={image?.height}
          imgWidth={image?.width}
          imgAlt={album?.name}
          title={track?.name}
          author={artist}
        />
      </button>
    </li>
  {/each}
</Collection>
