import { writable, derived, get } from 'svelte/store';
import { createDisplayFilter, writableLocalStorage } from '@js/store-utils';
import SpotifyRepeatState from '@js/SpotifyRepeatState';
import { HOME_DEFAULT_VIEWS, MY_LIB_DEFAULT_VIEWS, SEARCH_DEFAULT_VIEWS } from '@js/view-utils';
import { DEFAULT_PLAYING_RGB } from '@js/palette-utils';

// ACCESS
const accessToken = writableLocalStorage('accessToken', '');
const authorizationOk = writableLocalStorage('authorizationOk', false);

// USER
const userId = writableLocalStorage('userId', '');

// SPOTIFY ITEMS
const trackUri = writable('');
const trackName = writable('');
const albumUri = writable('');
const albumName = writable('');
const imageUrl = writable('');
/** @type {import('svelte/store').Writable<import('@js/spotify').SpotifyArtist[]>} */
const artists = writable([]);
const artistsDisplay = derived(artists, ($artists) =>
  $artists?.map((item) => item.name).join(', '),
);

// DEVICE
const deviceId = writableLocalStorage('deviceId', '');
/** @type {import('svelte/store').Writable<import('@js/spotify').SpotifyDevice[]>} */
const devices = writable([]);
const activeDevice = derived(devices, ($devices) => {
  return $devices.find((device) => device.is_active === true);
});

// MISCELLANEOUS
const apiTimestamp = writable(null);
const appReady = derived(
  [authorizationOk, accessToken, deviceId],
  ([$authorizationOk, $accessToken, $deviceId]) => $authorizationOk && $accessToken && $deviceId,
);
const serviceWorkerNotification = writableLocalStorage('serviceWorkerNotification', false);
const searchQuery = writableLocalStorage('searchQuery', '');
const scrollTop = writable(0);

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

// UI
const viewName = writableLocalStorage('viewName', 'home');
/** @type {import('svelte/store').Writable<import('@js/internal').View[]>} */
const VIEWS_HOME = writableLocalStorage('VIEWS_HOME', [...HOME_DEFAULT_VIEWS]);
/** @type {import('svelte/store').Writable<import('@js/internal').View[]>} */
const VIEWS_SEARCH = writableLocalStorage('VIEWS_SEARCH', [...SEARCH_DEFAULT_VIEWS]);
/** @type {import('svelte/store').Writable<import('@js/internal').View[]>} */
const VIEWS_MY_LIB = writableLocalStorage('VIEWS_MY_LIB', [...MY_LIB_DEFAULT_VIEWS]);
const VIEWS = derived(
  [viewName, VIEWS_HOME, VIEWS_SEARCH, VIEWS_MY_LIB],
  ([$viewName, $VIEWS_HOME, $VIEWS_SEARCH, $VIEWS_MY_LIB]) => {
    if ('home' === $viewName) {
      return $VIEWS_HOME;
    } else if ('search' === $viewName) {
      return $VIEWS_SEARCH;
    } else {
      return $VIEWS_MY_LIB;
    }
  },
);
// TODO move
/** @param {import('@js/internal').View} view */
function addView(view) {
  if ('home' === get(viewName)) {
    VIEWS_HOME.update((views) => [...views, { ...view }]);
  } else if ('search' === get(viewName)) {
    VIEWS_SEARCH.update((views) => [...views, { ...view }]);
  } else {
    VIEWS_MY_LIB.update((views) => [...views, { ...view }]);
  }
}
// TODO move
function removeView() {
  if ('home' === get(viewName)) {
    VIEWS_HOME.update((views) => [...views.slice(0, -1)]);
  } else if ('search' === get(viewName)) {
    VIEWS_SEARCH.update((views) => [...views.slice(0, -1)]);
  } else {
    VIEWS_MY_LIB.update((views) => [...views.slice(0, -1)]);
  }
}
const uiTimestamp = writable(-1);
const playingRgb = writable([...DEFAULT_PLAYING_RGB]);

// FILTER
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
  activeDevice,
  appReady,
  serviceWorkerNotification,
  searchQuery,
  scrollTop,
  viewName,
  VIEWS,
  addView,
  removeView,
  playingRgb,
  uiTimestamp,
  displayTrackOn,
  displayArtistOn,
  displayPlaylistOn,
  displayAlbumOn,
  displayTopOn,
  displayFilter,
};
