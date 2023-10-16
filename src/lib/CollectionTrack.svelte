<script>
  import Collection from '@/lib/Collection.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  import SpotifyApi from '@/js/SpotifyApi';

  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  export let items;
  export let playlistId;

  async function move(songIndex, newPosition) {
    items = await SpotifyApi.moveTrackInPlaylist(playlistId, items, songIndex, newPosition);
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
          <button on:click={() => move(i, i - 1)}>⬆️</button>
        {/if}
        {#if i < items.length - 1}
          <button on:click={() => move(i, i + 1)}>⬇️</button>
        {/if}
      </div>
      <button on:click={() => SpotifyApi.addSongToPlaylist(track.uri, playlistId)}>
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
