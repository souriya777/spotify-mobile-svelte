<script>
  import Collection from '@lib/Collection.svelte';
  import CollectionItem from '@lib/CollectionItem.svelte';
  import NavLink from '@lib/NavLink.svelte';

  /** @type {import('@js/spotify').SpotifyAlbum[]} */
  export let items;
</script>

<Collection>
  {#each items as album}
    {@const artist = album?.artists?.map((t) => t?.name).join(', ')}

    <li>
      id:{album?.id}
      <NavLink to={`/album/${album?.id}`}>
        <CollectionItem images={album?.images} title={album?.name} author={artist} />
      </NavLink>
    </li>
  {/each}
</Collection>
