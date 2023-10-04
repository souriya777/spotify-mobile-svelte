import { writable, derived } from 'svelte/store';
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

function createDisplayFilter() {
  const trackOn = writable(true);
  const albumOn = writable(true);
  const playlistOn = writable(true);
  const artistOn = writable(true);

  const topOn = derived(
    [trackOn, albumOn, playlistOn, artistOn],
    ([$trackOn, $albumOn, $playlistOn, $artistOn]) =>
      $trackOn && $albumOn && $playlistOn && $artistOn,
  );

  const trackActive = derived([topOn, trackOn], ([$topOn, $trackOn]) => !$topOn && $trackOn);

  const albumActive = derived([topOn, albumOn], ([$topOn, $albumOn]) => !$topOn && $albumOn);

  const playlistActive = derived(
    [topOn, playlistOn],
    ([$topOn, $playlistOn]) => !$topOn && $playlistOn,
  );

  const artistActive = derived([topOn, artistOn], ([$topOn, $artistOn]) => !$topOn && $artistOn);

  const store = derived(
    [
      topOn,
      trackOn,
      albumOn,
      playlistOn,
      artistOn,
      trackActive,
      albumActive,
      playlistActive,
      artistActive,
    ],
    ([
      $topOn,
      $trackOn,
      $albumOn,
      $playlistOn,
      $artistOn,
      $trackActive,
      $albumActive,
      $playlistActive,
      $artistActive,
    ]) => ({
      topOn: $topOn,
      trackOn: $trackOn,
      albumOn: $albumOn,
      playlistOn: $playlistOn,
      artistOn: $artistOn,
      trackActive: $trackActive,
      albumActive: $albumActive,
      playlistActive: $playlistActive,
      artistActive: $artistActive,
    }),
  );

  return {
    subscribe: store.subscribe,
    filterNone: () => {
      trackOn.set(true);
      artistOn.set(true);
      playlistOn.set(true);
      albumOn.set(true);
    },
    filterTrackOnly: () => {
      trackOn.set(true);
      artistOn.set(false);
      playlistOn.set(false);
      albumOn.set(false);
    },
    filterArtistOnly: () => {
      trackOn.set(false);
      artistOn.set(true);
      playlistOn.set(false);
      albumOn.set(false);
    },
    filterPlaylistOnly: () => {
      trackOn.set(false);
      artistOn.set(false);
      playlistOn.set(true);
      albumOn.set(false);
    },
    filterAlbumOnly: () => {
      trackOn.set(false);
      artistOn.set(false);
      playlistOn.set(false);
      albumOn.set(true);
    },
  };
}

export { writableLocalStorage, createDisplayFilter };
