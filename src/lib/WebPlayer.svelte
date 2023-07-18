<script>
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  export let token = '';

  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;

  document.body.appendChild(script);

  let DEVICE_ID = '';
  let PLAYER = '';
  // FIXME
  // let TRACK_URI = "0xtN05SZDvg943I3x08KT7";

  window.onSpotifyWebPlaybackSDKReady = () => {
    PLAYER = new window.Spotify.Player({
      name: 'Spotify svelte',
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 1,
    });

    PLAYER.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      DEVICE_ID = device_id;
    });

    PLAYER.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    PLAYER.connect();
  };

  function playMe() {
    console.log('playMe', AXIOS_INSTANCE.defaults.headers.common.Authorization);
    // PLAYER.togglePlay();

    AXIOS_INSTANCE({
      method: 'PUT',
      data: JSON.stringify({
        context_uri: 'spotify:album:7oWx4auBp2kCb54VkRCCUq',
      }),
      url: `https://api.spotify.com/v1/me/player/play?device_id=${DEVICE_ID}`,
    })
      .then((response) => console.log(response?.data))
      .catch((error) => {
        console.error(error.toJSON());
      });
  }
</script>

<div class="web-player">
  WEB PLAYER 🚀
  <p>device id : {DEVICE_ID}</p>
  <p>token : {token}</p>
  <button on:click={PLAYER.previousTrack()}>⏮️</button>
  <button on:click={playMe}>▶️</button>
  <button on:click={PLAYER.nextTrack()}>⏭️</button>
</div>

<style>
  .web-player {
    background-color: deeppink;
  }
</style>
