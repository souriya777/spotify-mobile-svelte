<script>
  import { SPOTIFY_LIKED_IMAGES_API } from '@js/spotify-utils';
  import { likedTracks } from '@js/store';
  import { goDetail } from '@js/view-utils';
  import ListItem from '@lib/ListItem.svelte';

  $: totalLiked = $likedTracks?.length;
  $: likedTitle = totalLiked >= 1 ? `${totalLiked} songs` : `${totalLiked} song`;
</script>

<ListItem
  uri="spotify:playlist:liked"
  title="Liked Songs"
  owner={likedTitle}
  images={SPOTIFY_LIKED_IMAGES_API}
  callbackFn={() =>
    goDetail('PlaylistView', {
      id: 'liked',
      uri: 'spotify:playlist:liked',
    })}
/>
