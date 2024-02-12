<script>
  import { viewName } from '@js/store';
  import List from '@lib/List.svelte';
  import ListItemPlaylist from '@lib/ListItemPlaylist.svelte';
  import ListItemPlaylistLiked from '@lib/ListItemPlaylistLiked.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  export let items;
</script>

<List>
  {#if $viewName !== 'search'}
    <ListItemPlaylistLiked />
  {/if}

  {#each items as item (item?.uri)}
    <ListItemPlaylist {item} />
  {/each}
</List>
