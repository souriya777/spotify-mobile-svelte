<script>
  import {
    clearLocalStorage,
    PLAYER,
    PLAYER_FULL_MODE,
    SPOTIFY_DEVICE_ID,
    PLAYER_READY,
    SPOTIFY_ACCESS_TOKEN,
  } from '@/js/store';
  import { BROWSER_DEVICE } from '@/js/browser-utils';
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import { PLAYER_NAME } from '@/js/spotify-utils';
</script>

<details open>
  <summary>Debug</summary>
  <ul>
    <li>BROWSER_DEVICE:{BROWSER_DEVICE}</li>
    <li>SPOTIFY_DEVICE_ID:{$SPOTIFY_DEVICE_ID?.slice(0, 8)?.concat('...')}</li>
    <li>PLAYER_NAME:{PLAYER_NAME}</li>
    <li>PLAYER:{JSON.stringify($PLAYER?._options)}</li>
    <li>PLAYER_FULL_MODE:{$PLAYER_FULL_MODE}</li>
    <li>SPOTIFY_ACCESS_TOKEN:{$SPOTIFY_ACCESS_TOKEN?.slice(0, 8)?.concat('...')}</li>
    <li>
      AXIOS_HEADER:{AXIOS_INSTANCE.defaults.headers.common.Authorization?.toString()
        ?.slice(0, 18)
        ?.concat('...')}
    </li>
    <li>PLAYER_READY:{$PLAYER_READY}</li>
  </ul>
  <button on:click={clearLocalStorage}>🗑️ localStorage</button>
</details>
