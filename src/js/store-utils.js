import { writable } from 'svelte/store';
import { setAxiosHeaderAuthorization } from '@/js/axios-utils';
import { spotifyAccessToken, spotifyAuthorizeWaiting } from '@/js/store';

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

export { writableLocalStorage, clearWritableLocalStorage };
