<script>
  import { SPOTIFY_LIKED_IMAGES_API } from '@js/spotify-utils';
  import { likedTracks } from '@js/store';
  import { createView } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  $: totalLiked = $likedTracks?.length;
  $: likedTitle = totalLiked >= 1 ? `${totalLiked} songs` : `${totalLiked} song`;
</script>

<ListItem
  title="Liked Songs"
  owner={likedTitle}
  images={SPOTIFY_LIKED_IMAGES_API}
  createViewFn={() =>
    createView('PlaylistView', {
      id: 'id-liked',
      isLikedPlaylist: true,
    })}
/>
