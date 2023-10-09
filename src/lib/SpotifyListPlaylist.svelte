<script>
  import SpotifyListItem from '@/lib/SpotifyListItem.svelte';
  import SpotifyList from '@/lib/SpotifyList.svelte';
  import NavLink from '@/lib/NavLink.svelte';
  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  export let items;
</script>

<SpotifyList>
  {#each items as list}
    {@const image = list?.images?.at(-1)}

    <li>
      <NavLink to={`/playlist/${list?.id}`}>
        <SpotifyListItem
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
</SpotifyList>
