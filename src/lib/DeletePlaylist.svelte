<script>
  /**
   * FIXME 405 Method Not Allowed
   * Spotify API does not private endpoint to
   * remove playlist
   * @param {string} playlistId
   */

  import { onTap } from '@js/event-utils';
  import SpotifyApi from '@js/SpotifyApi';

  export let playlistId;

  function deletePlaylist() {
    SpotifyApi.deletePlaylist(playlistId);
  }
</script>

<button use:onTap={deletePlaylist}>-playlist</button>
