<script>
  import Collection from '@/lib/Collection.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  import NavLink from '@/lib/NavLink.svelte';

  /** @type {import('@/js/spotify').SpotifyAlbum[]} */
  export let items;
</script>

<Collection>
  {#each items as album}
    {@const image = album?.images?.at(-1)}
    {@const artist = album?.artists?.map((t) => t?.name).join(', ')}

    <li>
      id:{album?.id}
      <NavLink to={`/album/${album?.id}`}>
        <CollectionItem
          imgUrl={image?.url}
          imgHeight={image?.height}
          imgWidth={image?.width}
          imgAlt={album?.name}
          title={album?.name}
          author={artist}
        />
      </NavLink>
    </li>
  {/each}
</Collection>
