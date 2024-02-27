<script>
  import { onTap } from '@js/event-utils';
  import SpotifyApi from '@js/SpotifyApi';

  export let playlistId;
  export let playlistName;

  let newName = playlistName;

  function rename() {
    if (newName) {
      SpotifyApi.updatePlaylistName(playlistId, newName);
    }
  }
</script>

<input type="text" bind:value={newName} />
<button use:onTap={rename}>rename🔴</button>
