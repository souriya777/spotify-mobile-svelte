<script>
  import { accessToken, userId, deviceId, player, trackName } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';

  let _OPEN = true;
</script>

<details open={_OPEN}>
  <summary>Debug</summary>
  <ul>
    <li>😎:{$userId}</li>
    <li>🪙:{$accessToken?.substr(0, 8)}</li>
    <li>📱deviceId:{$deviceId?.substr(0, 8)}</li>
    <li>📻player:{$player?._options?.name}</li>
    <li>🎵song.:{$trackName}</li>
  </ul>

  <button on:click={SpotifyApi.forceAuthorization}>🗑️ FORCE</button>
  <button
    on:click={() => {
      $player.activateElement();
      SpotifyApi.synchronize();
    }}>🟢🟢🟢sync</button
  >
  <button on:click={() => SpotifyApi.getPlaybackState()}>🟢playback-state</button>
  <button on:click={() => SpotifyApi.getAvailableDevice()}>🟢devices</button>
  <button on:click={() => SpotifyApi.transfertPlayback($deviceId)}> transfert-playback </button>
  <button on:click={() => window.navigator.vibrate(200)}>vibrate</button>
  <button on:click={() => SpotifyApi.me()}>me</button>
  <button on:click={() => SpotifyApi.getRecentlyPlayedSongs()}>recently-played-songs</button>
  <button on:click={() => SpotifyApi.getQueue()}>queue</button>
  <button on:click={() => SpotifyApi.getQueueLastSong()}>last-queue</button>
  <button on:click={() => SpotifyApi.getPlaylistsSortedBySpotify($userId)}
    >playlists-recently-added</button
  >
  <button on:click={() => SpotifyApi.getPlaylistsSortedAlphabetically($userId)}
    >playlists ABC</button
  >
  <button on:click={() => SpotifyApi.getMySavedAlbumsSortedRecentlyPlayed()}
    >saved-albums-recently-played</button
  >
  <button on:click={() => SpotifyApi.getMySavedAlbumsSortedRecentlyAdded()}
    >saved-albums-recently-addded</button
  >
  <button on:click={() => SpotifyApi.getMyFollowedArtists()}>my-followed-artist</button>
  <button on:click={() => SpotifyApi.disconnect()}>disconnect</button>
</details>
