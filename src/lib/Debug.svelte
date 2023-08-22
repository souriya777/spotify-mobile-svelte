<script>
  import {
    clearLocalStorage,
    PLAYER,
    PLAYER_FULL_MODE,
    SPOTIFY_DEVICE_ID,
    SPOTIFY_ACCESS_TOKEN,
    PLAYER_READY,
  } from '@/js/store';
  import { BROWSER_DEVICE } from '@/js/browser-utils';
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import { PLAYER_NAME, getRecentlyPlayedTracks, getLastTrack } from '@/js/spotify-utils';

  $: spotifyDeviceId = $SPOTIFY_DEVICE_ID?.slice(0, 8)?.concat('...');
  $: player = JSON.stringify($PLAYER?._options);

  let open = true;
</script>

<details {open}>
  <summary>Debug</summary>
  <ul>
    <li>BROWSER_DEVICE:{BROWSER_DEVICE}</li>
    <li>SPOTIFY_DEVICE_ID:{spotifyDeviceId}</li>
    <li>PLAYER_NAME:{PLAYER_NAME}</li>
    <li>PLAYER:{player}</li>
    <li>PLAYER_FULL_MODE:{$PLAYER_FULL_MODE}</li>
    <li>SPOTIFY_ACCESS_TOKEN:{$SPOTIFY_ACCESS_TOKEN?.slice(0, 8)?.concat('...')}</li>
    <li>
      AXIOS_HEADER:{AXIOS_INSTANCE.defaults.headers.common.Authorization?.toString()
        ?.slice(0, 18)
        ?.concat('...')}
    </li>
    <li>{$PLAYER_READY ? '🟢' : '🔴'}PLAYER_READY:{$PLAYER_READY}</li>
  </ul>
  <button on:click={clearLocalStorage}>🗑️ localStorage</button>
  <button on:click={getRecentlyPlayedTracks}>recently-played</button>
  <button on:click={getLastTrack}>last-track</button>
</details>
