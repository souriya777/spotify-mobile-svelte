import { writable, derived, get } from 'svelte/store';
import { createDisplayFilter, writableLocalStorage } from '@js/store-utils';
import SpotifyRepeatState from '@js/SpotifyRepeatState';
import { HOME_DEFAULT_VIEWS, MY_LIB_DEFAULT_VIEWS, SEARCH_DEFAULT_VIEWS } from '@js/view-utils';
import { DEFAULT_BACKGROUND_HIGHLIGHT_RGB } from '@js/palette-utils';
import LIST_SORT_TYPE from '@js/LIST_SORT_TYPE';

/**
 * @typedef {import('@js/spotify').SpotifyPlaylist} SpotifyPlaylist
 * @typedef {import('@js/spotify').SpotifyAlbum} SpotifyAlbum
 * @typedef {import('@js/spotify').SpotifyArtist} SpotifyArtist
 * @typedef {import('@js/spotify').SpotifyTrack} SpotifyTrack
 * @typedef {import('@js/spotify').SpotifyDevice} SpotifyDevice
 * @typedef {import('@js/spotify').SpotifySearch} SpotifySearch
 */

// ACCESS
const accessToken = writableLocalStorage('accessToken', '');
const authorizationOk = writableLocalStorage('authorizationOk', false);

// USER
const userId = writableLocalStorage('userId', '');
const userDisplayName = writableLocalStorage('userDisplayName', '');
const userPictureUrl = writableLocalStorage('userPictureUrl', '');

// SPOTIFY ITEMS
const trackUri = writable('');
const trackName = writable('');
const albumUri = writable('');
const albumName = writable('');
const imageMiniUrl = writable('');
const imageCoverUrl = writable('');
/** @type {import('svelte/store').Writable<SpotifyArtist[]>} */
const artists = writable([]);
const artistsDisplay = derived(artists, ($artists) =>
  $artists?.map((item) => item.name).join(', '),
);
/** @type {import('svelte/store').Writable<SpotifyTrack[]>} */
const likedTracks = writable([]);
const unavailableContextUri = writableLocalStorage('unavailableContextUri', []);

// MY LIB
/** @type {import('svelte/store').Writable<(SpotifyPlaylist | SpotifyAlbum | SpotifyArtist)[]>} */
const myLibRecentlyPlayed = writable([]);
/** @type {import('svelte/store').Writable<SpotifyPlaylist[]>} */
const myLibPlaylists = writable([]);
/** @type {import('svelte/store').Writable<SpotifyAlbum[]>} */
const myLibAlbums = writable([]);
/** @type {import('svelte/store').Writable<SpotifyArtist[]>} */
const myLibArtists = writable([]);

// DEVICE
const deviceId = writableLocalStorage('deviceId', '');
/** @type {import('svelte/store').Writable<SpotifyDevice[]>} */
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

// SEARCH
const searchQuery = writableLocalStorage('searchQuery', '');
const searchFullMode = writable(false);
const searchViewAll = writable(false);
/** @type {import('svelte/store').Writable<Array<SpotifyTrack | SpotifyArtist | SpotifyAlbum| SpotifyPlaylist>>} */
const searchRecent = writableLocalStorage('searchRecent', []);
function clearRecentSearch(uri) {
  searchRecent.update((arr) => [...arr.filter((item) => item?.uri !== uri)]);
}

// PLAYER
const player = writable(null);
const playerFull = writable(false);
const optionsFull = writable(false);
const listSortOptionsFull = writable(false);
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
  [progressMs, durationMs, playing, apiTimestamp],
  // eslint-disable-next-line no-unused-vars
  ([$progressMs, $durationMs, $playing, $apiTimestamp], set, update) => {
    set($progressMs);
    const interval = setInterval(() => {
      if ($playing) {
        update((n) => {
          if (n >= $durationMs) {
            clearInterval(interval);
            return n;
          }
          return n + 1000;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  },
);

// UI
const scrollTop = writable(0);
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

const contextUri = derived([viewName, VIEWS_MY_LIB], ([$viewName, $VIEWS_MY_LIB]) => {
  return $viewName !== 'mylib' ? '' : $VIEWS_MY_LIB.at(-1)?.props?.uri;
});

function currentView() {
  if ('home' === get(viewName)) {
    return VIEWS_HOME;
  } else if ('search' === get(viewName)) {
    return VIEWS_SEARCH;
  } else {
    return VIEWS_MY_LIB;
  }
}

/** @param {import('@js/internal').View} view */
function addView(view) {
  currentView().update((views) => [...views, { ...view }]);
}

function removeView() {
  currentView().update((views) => [...views.slice(0, -1)]);
}

const fixedTopComponent = writable(null);
const uiTimestamp = writable(-1);
const resizeTimestamp = writable(-1);
const screenHeight = writable(0);
const gridMode = writable(false);
const isSideMenuVisible = writable(false);
const playingRgb = writable([...DEFAULT_BACKGROUND_HIGHLIGHT_RGB]);
const navigatingRgb = writable();
const navigatingPriorityRgb = writable();
const isNavigatingHasPriority = writable(false);
const listSortType = writable(LIST_SORT_TYPE.RECENTS);
const addAndSlideNextForMe = writable();
const slidePrevAndRemoveForMe = writable();

// FILTER
const displayFilterMyLib = createDisplayFilter();
const displayFilterSearch = createDisplayFilter();

// EVENT
/** @type {import('svelte/store').Writable<import('@js/internal').EventBus>} */
const eventBus = writable(null);

export {
  accessToken,
  userId,
  userDisplayName,
  userPictureUrl,
  authorizationOk,
  deviceId,
  player,
  playerFull,
  optionsFull,
  listSortOptionsFull,
  trackUri,
  trackName,
  albumName,
  albumUri,
  imageMiniUrl,
  imageCoverUrl,
  artists,
  artistsDisplay,
  likedTracks,
  unavailableContextUri,
  myLibRecentlyPlayed,
  myLibPlaylists,
  myLibAlbums,
  myLibArtists,
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
  searchFullMode,
  searchViewAll,
  searchRecent,
  clearRecentSearch,
  scrollTop,
  viewName,
  VIEWS,
  contextUri,
  currentView,
  addView,
  removeView,
  playingRgb,
  navigatingRgb,
  navigatingPriorityRgb,
  isNavigatingHasPriority,
  listSortType,
  addAndSlideNextForMe,
  slidePrevAndRemoveForMe,
  fixedTopComponent,
  uiTimestamp,
  resizeTimestamp,
  screenHeight,
  gridMode,
  isSideMenuVisible,
  displayFilterMyLib,
  displayFilterSearch,
  eventBus,
};
