<script>
  import { accessToken, userId, deviceId, player, trackName } from '@js/store';
  import { onTap } from '@js/event-utils';
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

  <button use:onTap={SpotifyApi.forceAuthorization}>🗑️ FORCE</button>
  <button
    use:onTap={() => {
      $player.activateElement();
      SpotifyApi.synchronize();
    }}>🟢🟢🟢sync</button
  >
  <button use:onTap={() => SpotifyApi.getPlaybackState()}>🟢playback-state</button>
  <button use:onTap={() => SpotifyApi.getAvailableDevice()}>🟢devices</button>
  <button use:onTap={() => SpotifyApi.transfertPlayback($deviceId)}> transfert-playback </button>
  <button use:onTap={() => window.navigator.vibrate(200)}>vibrate</button>
  <button use:onTap={() => SpotifyApi.me()}>me</button>
  <button use:onTap={() => SpotifyApi.getRecentlyPlayedSongs()}>recently-played-songs</button>
  <button use:onTap={() => SpotifyApi.getMyLibRecentlyPlayed()}>my-lib-recently</button>
  <button use:onTap={() => SpotifyApi.getQueue()}>queue</button>
  <button use:onTap={() => SpotifyApi.getQueueLastSong()}>last-queue</button>
  <button use:onTap={() => SpotifyApi.getPlaylistsSortedBySpotify($userId)}
    >playlists-recently-added</button
  >
  <button use:onTap={() => SpotifyApi.getPlaylistsSortedAlphabetically($userId)}
    >playlists ABC</button
  >
  <button use:onTap={() => SpotifyApi.getMySavedAlbumsSortedRecentlyPlayed()}
    >saved-albums-recently-played</button
  >
  <button use:onTap={() => SpotifyApi.getMySavedAlbumsSortedRecentlyAdded()}
    >saved-albums-recently-addded</button
  >
  <button use:onTap={() => SpotifyApi.getMyFollowedArtists()}>my-followed-artist</button>
  <button
    use:onTap={() =>
      SpotifyApi.getSeveralArtists([
        '0PUi9O36OMwere5DTyayAq',
        '36msvw9B10rxW90NSQ2794',
        '4ACplpEqD6JIVgKrafauzs',
      ])}>several-artists</button
  >
  <button use:onTap={() => SpotifyApi.disconnect()}>disconnect</button>
</details>
