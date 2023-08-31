import { writable, derived } from 'svelte/store';
import { setAxiosHeaderAuthorization } from '@/js/axios-utils';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';
import SpotifyTrack from '@/js/SpotifyTrack';
import SpotifyPlaybackState from '@/js/SpotifyPlaybackState';

// SPOTIFY
const spotifyAccessToken = writableLocalStorage('spotifyAccessToken', '');
const spotifyUserId = writableLocalStorage('spotifyUserId');
const spotifyDeviceId = writable('');
const spotifyAuthorizeWaiting = writableLocalStorage('spotifyAuthorizeWaiting', false);

// FIXME RENAME ALL

// PLAYER
const player = writable(null);
/** @type {import('svelte/store').Writable<SpotifyTrack>} */
const playerCurrentTrack = writable(new SpotifyTrack());
/** @type {import('svelte/store').Writable<SpotifyPlaybackState>} */
const playerPlaybackState = writable(new SpotifyPlaybackState());
const playerShuffle = writable(false);
const playerRepeat = writable(SpotifyRepeatState.OFF);

const isPlayerFull = writable(false);
const isPlayerReady = derived(
  [spotifyDeviceId, player],
  ([$spotifyDeviceId, $player]) => $spotifyDeviceId && $player != null,
);
function writableLocalStorage(key, initialValue) {
  let value = writable(localStorage.getItem(key) || initialValue);

  const write = (key, initialValue) => {
    const lastValue = localStorage.getItem(key) || initialValue;
    value = writable(lastValue);
  };

  value.subscribe((val) => {
    if ([null, undefined].includes(val)) {
      localStorage.removeItem(key);
      document.removeEventListener('storage', write);
    } else {
      localStorage.setItem(key, val);
      document.addEventListener('storage', write);

      if ('spotifyAccessToken' === key) {
        setAxiosHeaderAuthorization(val);
      }
    }
  });

  return value;
}

function clearWritableLocalStorage() {
  spotifyAuthorizeWaiting.set(null);
  spotifyAccessToken.set(null);
}

export {
  spotifyAccessToken,
  spotifyUserId,
  spotifyAuthorizeWaiting,
  spotifyDeviceId,
  player,
  playerPlaybackState,
  playerCurrentTrack,
  playerShuffle,
  playerRepeat,
  isPlayerFull,
  isPlayerReady,
  clearWritableLocalStorage,
};
