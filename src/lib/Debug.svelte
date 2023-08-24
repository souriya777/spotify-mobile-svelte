<script>
  import {
    spotifyAccessToken,
    spotifyUserId,
    isPlayerFull,
    spotifyDeviceId,
    player,
    isPlayerReady,
  } from '@/js/store';
  import { BROWSER_DEVICE } from '@/js/browser-utils';
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import SpotifyApi from '@/js/SpotifyApi';

  $: deviceId = $spotifyDeviceId?.slice(0, 8)?.concat('...');

  let open = true;
</script>

<details {open}>
  <summary>Debug</summary>
  <ul>
    <li>😎:{$spotifyUserId}</li>
    <li>BROWSER_DEVICE:{BROWSER_DEVICE}</li>
    <li>deviceId:{deviceId}</li>
    <li>PLAYER_NAME:{SpotifyApi.PLAYER_NAME}</li>
    <li>player:{JSON.stringify($player?._options)}</li>
    <li>isPlayerFull:{$isPlayerFull}</li>
    <li>token:{$spotifyAccessToken?.slice(0, 8)?.concat('...')}</li>
    <li>
      AXIOS_HEADER:{AXIOS_INSTANCE.defaults.headers.common.Authorization?.toString()
        ?.slice(0, 18)
        ?.concat('...')}
    </li>
    <li>{$isPlayerReady ? '🟢' : '🔴'}isPlayerReady:{$isPlayerReady}</li>
    <li>volume:{SpotifyApi.DEFAULT_VOLUME}</li>
  </ul>

  <button on:click={SpotifyApi.forceSpotifyAuthorization}>🗑️ forceSpotifyAuthorization</button>
  <button on:click={() => SpotifyApi.me()}>me</button>
  <button on:click={() => SpotifyApi.getRecentlyPlayedSongs()}>recently-played</button>
  <button on:click={() => SpotifyApi.getLastSong()}>last-song</button>
  <button on:click={() => SpotifyApi.getMyPlaylists($spotifyUserId)}>my-playlists</button>
  <button on:click={() => SpotifyApi.getCurrentTrack()}>current-track</button>
</details>
