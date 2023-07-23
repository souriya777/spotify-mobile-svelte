'use strict';

import { writable, derived } from 'svelte/store';
import { setAxiosAuthorization } from '@/js/axios-utils';

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
        setAxiosAuthorization(val);
      }
    }
  });

  return value;
}

function clearLocalStorage() {
  SPOTIFY_GRANT_WAITING.set(null);
  SPOTIFY_ACCESS_TOKEN.set(null);
  SPOTIFY_REFRESH_TOKEN.set(null);
}

const SPOTIFY_GRANT_WAITING = writableLocalStorage('SPOTIFY_GRANT_WAITING', false);
const SPOTIFY_ACCESS_TOKEN = writableLocalStorage('SPOTIFY_ACCESS_TOKEN', '');
const SPOTIFY_REFRESH_TOKEN = writableLocalStorage('SPOTIFY_REFRESH_TOKEN', '');
const CAN_PLAY = derived(
  SPOTIFY_ACCESS_TOKEN,
  ($SPOTIFY_ACCESS_TOKEN) => $SPOTIFY_ACCESS_TOKEN !== ''
);

export {
  SPOTIFY_GRANT_WAITING,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
  CAN_PLAY,
  clearLocalStorage,
};
