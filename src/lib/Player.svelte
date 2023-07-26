<script>
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_GRANT_WAITING, CAN_PLAY, PLAYER_FULL } from '@/js/store';
  import { forceSpotifyGrant } from '@/js/spotify-utils';
  import { appendScriptToBody } from '@/js/souriya-utils';
  import { DEVICE } from '@/js/browser-utils';
  import { onTap } from '@/js/event-utils';

  let DEVICE_ID = '';
  let PLAYER = '';
  const name = `${DEVICE}.${import.meta.env.VITE_SPOTIFY_DEVICE_NAME}`;
  // FIXME
  // let TRACK_URI = "0xtN05SZDvg943I3x08KT7";

  appendScriptToBody('https://sdk.scdn.co/spotify-player.js');

  window.onSpotifyWebPlaybackSDKReady = () => {
    PLAYER = new window.Spotify.Player({
      name,
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

{#if $CAN_PLAY}
  <div class="player" use:onTap={() => PLAYER_FULL.set(true)}>
    <div class="bar" use:onTap={() => PLAYER_FULL.set(false)}>
      <button>back</button>
      <p>Liked Songs</p>
    </div>
    <img
      src="https://i.scdn.co/image/ab67616d00001e02d9aae5518aa56971b3f406ea"
      alt="La Dura Vida del Joven Rapero"
    />
    <div class="title">Contando Lunares (feat. Cruz Cafuné)</div>
    <div class="artist">Don Patricio, Cruz Cafuné</div>
    <button>+✅</button>
    <div class="progress">
      <div>bar</div>
      <div class="time">
        <div class="begin">0:32</div>
        <div class="end">-2:28</div>
      </div>
    </div>
    <button>shuffle</button>
    <button on:click={() => PLAYER.previousTrack()}>⏮️</button>
    <button on:click={playMe}>▶️</button>
    <button on:click={() => PLAYER.nextTrack()}>⏭️</button>
    <button>repeat</button>
    <div class="device">💻 Souriya</div>
  </div>
{:else}
  <p>cannot play</p>
{/if}

<style>
  .player {
    background-color: deeppink;
  }

  .bar {
    display: flex;
    justify-content: space-between;
  }

  .progress {
    background-color: orange;
  }

  .time {
    display: flex;
  }
</style>
