<script>
  import List from '@lib/List.svelte';
  import ListItemPlaylist from '@lib/ListItemPlaylist.svelte';
  import ListItemAlbum from '@lib/ListItemAlbum.svelte';
  import ListItemArtist from '@lib/ListItemArtist.svelte';
  import ListItemPlaylistLiked from '@lib/ListItemPlaylistLiked.svelte';

  export let items;
</script>

<List>
  <ListItemPlaylistLiked />

  {#each items as item (item?.id)}
    {@const type = item?.uri?.split(':').at(1)}

    {#if 'playlist' === type}
      <ListItemPlaylist {item} hasPrefix={true} />
    {:else if 'album' === type}
      <ListItemAlbum {item} hasPrefix={true} />
    {:else if 'artist' === type}
      <ListItemArtist {item} owner="Artist" />
    {/if}
  {/each}
</List>
