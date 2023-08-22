<script>
  import {
    playerFullMode,
    spotifyAccessToken,
    spotifyDeviceId,
    player,
    isPlayerReady,
  } from '@/js/store';
  import { BROWSER_DEVICE } from '@/js/browser-utils';
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import SpotifyApi from '@/js/SpotifyApi';

  $: deviceId = $spotifyDeviceId?.slice(0, 8)?.concat('...');

  let open = false;
</script>

<details {open}>
  <summary>Debug</summary>
  <ul>
    <li>BROWSER_DEVICE:{BROWSER_DEVICE}</li>
    <li>deviceId:{deviceId}</li>
    <li>playerName:{SpotifyApi.playerName}</li>
    <li>player:{JSON.stringify($player?._options)}</li>
    <li>playerFullMode:{$playerFullMode}</li>
    <li>spotifyAccessToken:{$spotifyAccessToken?.slice(0, 8)?.concat('...')}</li>
    <li>
      AXIOS_HEADER:{AXIOS_INSTANCE.defaults.headers.common.Authorization?.toString()
        ?.slice(0, 18)
        ?.concat('...')}
    </li>
    <li>{$isPlayerReady ? '🟢' : '🔴'}isPlayerReady:{$isPlayerReady}</li>
  </ul>
  <button on:click={SpotifyApi.forceSpotifyAuthorization}>🗑️ forceSpotifyAuthorization</button>
  <button on:click={SpotifyApi.getRecentlyPlayedSongs}>recently-played</button>
  <button on:click={SpotifyApi.getLastSong}>last-track</button>
</details>
