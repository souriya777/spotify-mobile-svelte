<script>
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  // FIXME move elsewhere
  import WebPlayer from '@/lib/WebPlayer.svelte';
  // FIXME move elsewhere
  let CAN_PLAY = false;

  const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

  let TEMP_ACCESS_TOKEN = '';

  async function getToken() {
    const authorizationCode = new URL(window.location).searchParams.get('code');
    // console.log("authorizationCode ?", authorizationCode);

    const spotifyData = {
      code: authorizationCode,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${window.btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
      },
      data: new URLSearchParams(spotifyData).toString(),
      url: 'https://accounts.spotify.com/api/token',
    };

    const data = await AXIOS_INSTANCE(options)
      .then((response) => response?.data)
      .catch((error) => {
        console.error(error.toJSON());
      });

    // set defaut axios headers
    AXIOS_INSTANCE.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

    // console.log(AXIOS_INSTANCE.defaults.headers, data.access_token);

    // console.log([data.access_token, data.refresh_token]);

    TEMP_ACCESS_TOKEN = data.access_token;
    // initSpotifyPlayer(TEMP_ACCESS_TOKEN);
    console.log(TEMP_ACCESS_TOKEN);

    return [data.access_token, data.refresh_token];
  }

  // FIXME move elsewhere
  function play(accessToken, trackUri, deviceId) {
    CAN_PLAY = true;
    // AXIOS_INSTANCE({
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   data: JSON.stringify({
    //     uris: [trackUri],
    //   }),
    //   url: `https://api.spotify.com/v1/me/player/play?device_id=${TEMP_DEVICE_ID}`,
    // });
  }
</script>

<button on:click={getToken}>get token</button>

<!-- FIXME move elsewhere -->
<button on:click={play}>play sherry</button>
{#if CAN_PLAY}
  <WebPlayer token={TEMP_ACCESS_TOKEN} />
{:else}
  <p>cannot play</p>
{/if}
