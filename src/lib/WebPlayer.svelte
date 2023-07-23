<script>
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_GRANT_WAITING } from '@/js/store';
  import { forceSpotifyGrant } from '@/js/spotify-utils';
  import { appendScriptToBody } from '@/js/souriya-utils';

  let DEVICE_ID = '';
  let PLAYER = '';
  // FIXME
  // let TRACK_URI = "0xtN05SZDvg943I3x08KT7";

  appendScriptToBody('https://sdk.scdn.co/spotify-player.js');

  window.onSpotifyWebPlaybackSDKReady = () => {
    PLAYER = new window.Spotify.Player({
      name: import.meta.env.VITE_SPOTIFY_DEVICE_NAME,
      getOAuthToken: (cb) => {
        cb($SPOTIFY_ACCESS_TOKEN);
      },
      volume: 0.7,
    });

    PLAYER.addListener('ready', ({ device_id }) => {
      console.log('[souriya 😎] ready with device ID', device_id);
      DEVICE_ID = device_id;
    });

    PLAYER.addListener('not_ready', ({ device_id }) => {
      console.log('[souriya 😎] device ID has gone offline', device_id);
    });

    // PLAYER.on('initialization_error', ({ message }) => {
    //   console.error('Failed to initialize', message);
    // });

    // PLAYER.on('authentication_error', ({ message }) => {
    //   console.error('Failed to authenticate', message);
    // });

    // PLAYER.on('account_error', ({ message }) => {
    //   console.error('Failed to validate Spotify account', message);
    // });

    // PLAYER.on('playback_error', ({ message }) => {
    //   console.error('Failed to perform playback', message);
    // });

    PLAYER.connect();
    playMe();
  };

  function playMe() {
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
        const errorJSON = error.toJSON();
        console.error('🌱', error.toJSON());
        if (401 === errorJSON?.status) {
          console.log(
            '[souriya 😎]: Spotify returns 401 -> refresh access',
            !$SPOTIFY_GRANT_WAITING
          );
          forceSpotifyGrant();
        }
      });
  }
</script>

<div class="web-player">
  WEB PLAYER 🚀
  <p>device id : {DEVICE_ID}</p>
  <p>token : {$SPOTIFY_ACCESS_TOKEN}</p>
  <button on:click={() => PLAYER.previousTrack()}>⏮️</button>
  <button on:click={playMe}>▶️</button>
  <button on:click={() => PLAYER.nextTrack()}>⏭️</button>
</div>

<style>
  .web-player {
    background-color: deeppink;
  }
</style>
