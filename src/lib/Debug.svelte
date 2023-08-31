<script>
  import {
    spotifyAccessToken,
    spotifyUserId,
    playerCurrentTrack,
    isPlayerFull,
    spotifyDeviceId,
    player,
    isPlayerReady,
  } from '@/js/store';
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import SpotifyApi from '@/js/SpotifyApi';

  $: deviceId = $spotifyDeviceId?.slice(0, 8)?.concat('...');

  let open = true;
</script>

<details {open}>
  <summary>Debug</summary>
  <ul>
    <li>😎:{$spotifyUserId}</li>
    <li>🪙:{$spotifyAccessToken?.slice(0, 8)?.concat('...')}</li>
    <li>📱deviceId:{deviceId}</li>
    <li>📻player:{$player?._options?.name}</li>
    <li>isPlayerFull:{$isPlayerFull}</li>
    <li>
      ⚡️axios:{AXIOS_INSTANCE.defaults.headers.common.Authorization?.toString()
        ?.slice(0, 8 + 8)
        ?.concat('...')}
    </li>
    <li>{$isPlayerReady ? '🟢' : '🔴'}isPlayerReady:{$isPlayerReady}</li>
    <li>vol.:{$player?._options?.volume}</li>
    <li>🎵song.:{$playerCurrentTrack?.name}</li>
    <li>refresh frequency.:{import.meta.env.VITE_SPOTIFY_SYNC_FREQUENCY_MS}</li>
  </ul>

  <button on:click={SpotifyApi.forceSpotifyAuthorization}>🗑️ FORCE</button>
  <button on:click={() => SpotifyApi.synchronize()}>♻️sync</button>
  <button on:click={() => SpotifyApi.me()}>me</button>
  <button on:click={() => SpotifyApi.getPlaybackState()}>playback-state</button>
  <button on:click={() => SpotifyApi.transfertPlayback()}>transfert-state</button>
  <button on:click={() => SpotifyApi.getAvailableDevice()}>devices</button>
  <button on:click={() => SpotifyApi.getRecentlyPlayedSongs()}>recently-played-songs</button>
  <button on:click={() => SpotifyApi.getLastSong()}>last-song</button>
  <button on:click={() => SpotifyApi.getQueue()}>queue</button>
  <button on:click={() => SpotifyApi.getQueueLastSong()}>last-queue</button>
  <button on:click={() => SpotifyApi.getMyPlaylists($spotifyUserId)}>my-playlists</button>
</details>
