<script>
  import { likedTracks } from '@js/store';
  import { createView } from '@js/view-utils';
  import List from '@lib/List.svelte';
  import ListItem from '@lib/ListItem.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  export let items;

  $: totalLiked = $likedTracks?.length;
  $: likedTitle = totalLiked >= 1 ? `${totalLiked} songs` : `${totalLiked} song`;
</script>

<List>
  <ListItem
    isLikeItem={true}
    title={'Liked Songs'}
    owner={likedTitle}
    createViewFn={() =>
      createView('PlaylistView', {
        id: 'liked',
      })}
  />

  {#each items as item (item?.id)}
    <ListItem
      title={item?.name}
      owner={item?.owner?.display_name}
      images={item?.images}
      imageAlt={item?.name}
      createViewFn={() =>
        createView('PlaylistView', {
          id: item?.id,
        })}
    />
  {/each}
</List>
