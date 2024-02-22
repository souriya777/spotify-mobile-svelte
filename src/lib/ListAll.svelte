<script>
  import List from '@lib/List.svelte';
  import ListItemPlaylist from '@lib/ListItemPlaylist.svelte';
  import ListItemAlbum from '@lib/ListItemAlbum.svelte';
  import ListItemArtist from '@lib/ListItemArtist.svelte';
  import ListItemPlaylistLiked from '@lib/ListItemPlaylistLiked.svelte';
  import ListItemTrack from '@lib/ListItemTrack.svelte';

  export let items;
  export let showLikedPlaylist = false;
  export let hasPrefix = false;
</script>

<List>
  {#if showLikedPlaylist}
    <ListItemPlaylistLiked />
  {/if}

  {#each items as item (item?.id)}
    {@const type = item?.uri?.split(':').at(1)}

    {#if 'playlist' === type}
      <ListItemPlaylist {item} {hasPrefix} />
    {:else if 'album' === type}
      <ListItemAlbum {item} {hasPrefix} />
    {:else if 'artist' === type}
      <ListItemArtist {item} {hasPrefix} />
    {:else if 'track' === type}
      <ListItemTrack {item} {hasPrefix} />
    {/if}
  {/each}

  <slot name="end" />
</List>
