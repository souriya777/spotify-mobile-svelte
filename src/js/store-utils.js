import { writable } from 'svelte/store';
import { setAxiosHeaderAuthorization } from '@/js/axios-utils';

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

      if ('accessToken' === key) {
        setAxiosHeaderAuthorization(val);
      }
    }
  });

  return value;
}

export { writableLocalStorage };
