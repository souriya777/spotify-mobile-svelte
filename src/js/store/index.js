import { writable, derived } from 'svelte/store';
import { writableLocalStorage } from '@/js/store-utils';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';

// ACCESS
const accessToken = writableLocalStorage('accessToken', '');
const authorizationOk = writableLocalStorage('authorizationOk', false);

// USER
const userId = writableLocalStorage('userId', '');

// TRACK
const trackUri = writable('');
const trackName = writable('');
const albumUri = writable('');
const albumName = writable('');
const imageUrl = writable('');
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyArtist[]>} */
const artists = writable([]);
const artistsDisplay = derived(artists, ($artists) =>
  $artists?.map((item) => item.name).join(', '),
);

// DEVICE
const deviceId = writableLocalStorage('deviceId', '');
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyDevice[]>} */
const devices = writable([]);

// MISCELLANEOUS
const apiTimestamp = writable(null);
const appReady = derived(
  [authorizationOk, accessToken, deviceId],
  ([$authorizationOk, $accessToken, $deviceId]) => $authorizationOk && $accessToken && $deviceId,
);
const serviceWorkerNotification = writableLocalStorage('serviceWorkerNotification', false);

// PLAYER
const player = writable(null);
const shuffleState = writable(false);
const repeatState = writable(SpotifyRepeatState.OFF);
const playing = writable(false);
const volumePercent = writable(0);
const progressMs = writable(0);
const durationMs = writable(0);
const realTimeProgressMs = derived(
  /* 
  apiTimestamp is to force update => because progressMs.set(0)
  does not trigger derived value recalculation
  */
  [progressMs, playing, apiTimestamp],
  // eslint-disable-next-line no-unused-vars
  ([$progressMs, $playing, $apiTimestamp], set, update) => {
    set($progressMs);
    const interval = setInterval(() => {
      if ($playing) {
        update((n) => n + 1000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  },
);

export {
  accessToken,
  userId,
  authorizationOk,
  deviceId,
  player,
  trackUri,
  trackName,
  albumName,
  albumUri,
  imageUrl,
  artists,
  artistsDisplay,
  shuffleState,
  repeatState,
  playing,
  volumePercent,
  progressMs,
  realTimeProgressMs,
  durationMs,
  apiTimestamp,
  devices,
  appReady,
  serviceWorkerNotification,
};
