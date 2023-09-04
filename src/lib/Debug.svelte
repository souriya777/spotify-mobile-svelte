<script>
  import { accessToken, userId, deviceId, player, trackName } from '@/js/store';
  import SpotifyApi from '@/js/SpotifyApi';

  let open = false;
</script>

<details {open}>
  <summary>Debug</summary>
  <ul>
    <li>😎:{$userId}</li>
    <li>🪙:{$accessToken?.substr(0, 8)}</li>
    <li>📱deviceId:{$deviceId?.substr(0, 8)}</li>
    <li>📻player:{$player?._options?.name}</li>
    <li>vol.:{$player?._options?.volume}</li>
    <li>🎵song.:{$trackName}</li>
    <li>refresh frequency.:{import.meta.env.VITE_SPOTIFY_SYNC_FREQUENCY_MS}</li>
  </ul>

  <button on:click={SpotifyApi.forceSpotifyAuthorization}>🗑️ FORCE</button>
  <button on:click={() => SpotifyApi.synchronize()}>🟢🟢🟢sync</button>
  <button on:click={() => SpotifyApi.getPlaybackState()}>🟢playback-state</button>
  <button on:click={() => SpotifyApi.getAvailableDevice()}>🟢devices</button>
  <button on:click={() => SpotifyApi.transfertPlayback($deviceId)}> transfert-playback </button>
  <button on:click={() => SpotifyApi.me()}>me</button>
  <button on:click={() => SpotifyApi.getRecentlyPlayedSongs()}>recently-played-songs</button>
  <button on:click={() => SpotifyApi.determineLastSong()}>last-song</button>
  <button on:click={() => SpotifyApi.getQueue()}>queue</button>
  <button on:click={() => SpotifyApi.getQueueLastSong()}>last-queue</button>
  <button on:click={() => SpotifyApi.getMyPlaylists($userId)}>my-playlists</button>
  <button on:click={() => SpotifyApi.disconnect()}>disconnect</button>
</details>
