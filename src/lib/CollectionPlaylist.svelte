<script>
  import CollectionPlaylistItem from '@lib/CollectionPlaylistItem.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  export let items;

  // TODO <NavLink to={`/playlist/${list?.id}`}>
</script>

<ul class="collection">
  {#each items as item (item?.id)}
    <li><CollectionPlaylistItem {item} /></li>
  {/each}
</ul>

<style>
  .collection {
    padding-block-end: var(--height-nav-and-player-mini);
  }
</style>
