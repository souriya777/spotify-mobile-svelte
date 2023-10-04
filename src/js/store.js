import { writable, derived } from 'svelte/store';
import { createDisplayFilter, writableLocalStorage } from '@/js/store-utils';
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
const searchQuery = writableLocalStorage('searchQuery', '');
const currentPath = writableLocalStorage('currentPath', '/');

// PLAYER
const player = writable(null);
const playerFull = writable(false);
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
const displayTrackOn = writable(true);
const displayArtistOn = writable(true);
const displayPlaylistOn = writable(true);
const displayAlbumOn = writable(true);
const displayTopOn = derived(
  [displayTrackOn, displayArtistOn, displayPlaylistOn, displayAlbumOn],
  ([$displayTrackOn, $displayArtistOn, $displayPlaylistOn, $displayAlbumOn]) =>
    $displayTrackOn && $displayArtistOn && $displayPlaylistOn && $displayAlbumOn,
);
const displayFilter = createDisplayFilter();

export {
  accessToken,
  userId,
  authorizationOk,
  deviceId,
  player,
  playerFull,
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
  searchQuery,
  currentPath,
  displayTrackOn,
  displayArtistOn,
  displayPlaylistOn,
  displayAlbumOn,
  displayTopOn,
  displayFilter,
};
