<script>
  import Collection from '@/lib/Collection.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  import NavLink from '@/lib/NavLink.svelte';
  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  export let items;
</script>

<Collection>
  {#each items as list}
    {@const image = list?.images?.at(-1)}

    <li>
      <NavLink to={`/playlist/${list?.id}`}>
        <CollectionItem
          imgUrl={image?.url}
          imgHeight={image?.height}
          imgWidth={image?.width}
          imgAlt={list?.name}
          title={list?.name}
          author={list?.owner?.display_name}
        />
      </NavLink>
    </li>
  {/each}
</Collection>
