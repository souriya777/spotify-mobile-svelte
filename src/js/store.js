import { writable, derived } from 'svelte/store';
import { AXIOS_INSTANCE } from '@/js/axios-utils';

function writableAndLocalStorage(key, initialValue) {
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
        // set defaut axios headers
        AXIOS_INSTANCE.defaults.headers.common.Authorization = `Bearer ${val}`;
      }
    }
  });

  return value;
}

export const SPOTIFY_GRANT_WAITING = writableAndLocalStorage('SPOTIFY_GRANT_WAITING', false);
export const SPOTIFY_ACCESS_TOKEN = writableAndLocalStorage('SPOTIFY_ACCESS_TOKEN', '');
export const SPOTIFY_REFRESH_TOKEN = writableAndLocalStorage('SPOTIFY_REFRESH_TOKEN', '');
export const CAN_PLAY = derived(
  SPOTIFY_ACCESS_TOKEN,
  ($SPOTIFY_ACCESS_TOKEN) => $SPOTIFY_ACCESS_TOKEN !== ''
);
