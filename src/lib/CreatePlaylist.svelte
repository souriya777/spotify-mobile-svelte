<script>
  import { onTap } from '@js/event-utils';
  import SpotifyApi from '@js/SpotifyApi';
  import { userId } from '@js/store';

  let name;

  function create() {
    if (name) {
      SpotifyApi.createPlaylist($userId, name);
    }
  }
</script>

<input type="text" bind:value={name} placeholder="new playlist name" />
<button use:onTap={create}>+playlist</button>
