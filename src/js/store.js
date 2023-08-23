import { writable, derived } from 'svelte/store';
import { setAxiosHeaderAuthorization } from '@/js/axios-utils';

// SPOTIFY
const spotifyAccessToken = writableLocalStorage('spotifyAccessToken', '');
const spotifyUserId = writableLocalStorage('spotifyUserId');
const spotifyDeviceId = writable('');
const spotifyAuthorizeWaiting = writableLocalStorage('spotifyAuthorizeWaiting', false);

// PLAYER
const player = writable(null);
const playerFullMode = writable(false);
const isPlayerReady = derived(
  [spotifyDeviceId, player],
  ([$spotifyDeviceId, $player]) => $spotifyDeviceId != null && $player != null,
);
const isPlaying = writable(false);

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
  isPlayerReady,
  playerFullMode,
  isPlaying,
  clearWritableLocalStorage,
};
