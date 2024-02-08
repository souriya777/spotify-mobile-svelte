import { writable, derived, get } from 'svelte/store';
import LocalStorage from '@js/LocalStorage';

let STORAGE_LISTENER_ADDED = false;

function setLocalStorage(key, value) {
  const stored = typeof value === 'object' ? JSON.stringify(value) : value;
  LocalStorage.set(key, stored);
}

function parseLocalStorage(value) {
  let result = null;

  try {
    result = JSON.parse(value);
  } catch (error) {
    result = value;
  }

  return result;
}

function writableLocalStorage(key, initialValue) {
  let storageValue = parseLocalStorage(LocalStorage.get(key));

  const initial = storageValue ? storageValue : initialValue;
  const writableValue = writable(initial);

  // SYNC store =to=> Storage
  if (!storageValue && initialValue) {
    setLocalStorage(key, initialValue);
  }

  // SYNC Storage =to=> store
  const updateFromLocalStorage = (e) => {
    if (e.key === key) {
      const newValue = parseLocalStorage(e.newValue);
      set(newValue);
    }
  };

  // LISTEN for changes in Storage
  if (!STORAGE_LISTENER_ADDED) {
    window.addEventListener('storage', updateFromLocalStorage);
    STORAGE_LISTENER_ADDED = true;
  }

  const { subscribe, update, set } = writableValue;

  return {
    subscribe,
    set: (value) => {
      set(value);
      setLocalStorage(key, value);
    },
    update: (updater) => {
      const value = updater(get(writableValue));
      update(updater);
      setLocalStorage(key, value);
    },
    clear: () => {
      set(initialValue);
      setLocalStorage(key, initialValue);
    },
    destroy: () => {
      window.removeEventListener('storage', updateFromLocalStorage);
    },
  };
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

  const atLeastOneActive = derived(
    [trackActive, albumActive, playlistActive, artistActive],
    ([$trackActive, $albumActive, $playlistActive, $artistActive]) =>
      $trackActive || $albumActive || $playlistActive || $artistActive,
  );

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
      atLeastOneActive,
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
      $atLeastOneActive,
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
      atLeastOneActive: $atLeastOneActive,
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
