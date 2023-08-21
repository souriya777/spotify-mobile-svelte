'use strict';

import { writable, derived } from 'svelte/store';
import { setAxiosHeaderAuthorization } from '@/js/axios-utils';

// SPOTIFY
const SPOTIFY_ACCESS_TOKEN = writableLocalStorage('SPOTIFY_ACCESS_TOKEN', '');
const SPOTIFY_DEVICE_ID = writable('');
const SPOTIFY_AUTHORIZE_WAITING = writableLocalStorage('SPOTIFY_AUTHORIZE_WAITING', false);

// PLAYER
const PLAYER = writable(null);
const PLAYER_FULL_MODE = writable(false);
const PLAYER_READY = derived(
  [SPOTIFY_DEVICE_ID, PLAYER],
  ([$SPOTIFY_DEVICE_ID, $PLAYER]) => $SPOTIFY_DEVICE_ID != null && $PLAYER != null
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

      if ('SPOTIFY_ACCESS_TOKEN' === key) {
        setAxiosHeaderAuthorization(val);
      }
    }
  });

  return value;
}

function clearLocalStorage() {
  SPOTIFY_AUTHORIZE_WAITING.set(null);
  SPOTIFY_ACCESS_TOKEN.set(null);
}

export {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_AUTHORIZE_WAITING,
  SPOTIFY_DEVICE_ID,
  PLAYER,
  PLAYER_READY,
  PLAYER_FULL_MODE,
  clearLocalStorage,
};
