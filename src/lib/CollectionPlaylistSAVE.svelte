<script>
  import Collection from '@lib/Collection.svelte';
  import CollectionItem from '@lib/CollectionPlaylistItem.svelte';
  import NavLink from '@lib/NavLink.svelte';
  import RenamePlaylist from '@lib/RenamePlaylist.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  export let items;
</script>

<Collection>
  {#each items as list}
    <li>
      <RenamePlaylist playlistId={list?.id} playlistName={list?.name} />
      <NavLink to={`/playlist/${list?.id}`}>
        <CollectionItem
          images={list?.images}
          title={list?.name}
          author={list?.owner?.display_name}
        />
      </NavLink>
    </li>
  {/each}
</Collection>
