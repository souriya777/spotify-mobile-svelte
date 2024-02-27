import { get } from 'svelte/store';
import { currentView, slidePrevAndRemoveForMe, addView, addAndSlideNextForMe } from '@js/store';
import { getTimestamp } from '@js/date-utils';
import SideMenuView from '@lib/views/SideMenuView.svelte';
import HomeView from '@lib/views/HomeView.svelte';
import SearchView from '@lib/views/SearchView.svelte';
import MyLibView from '@lib/views/MyLibView.svelte';
import PlaylistView from '@lib/views/PlaylistView.svelte';
import AlbumView from '@lib/views/AlbumView.svelte';
import ArtistView from '@lib/views/ArtistView.svelte';
import DumbView from '@lib/views/DumbView.svelte';

/**
 * @typedef {import('@js/internal').View} View
 * @typedef {import('@js/spotify').SpotifyPlaylist} SpotifyPlaylist
 * @typedef {import('@js/spotify').SpotifyAlbum} SpotifyAlbum
 * @typedef {import('@js/spotify').SpotifyArtist} SpotifyArtist
 * @typedef {import('@js/spotify').SpotifyTrack} SpotifyTrack
 */

const ROOT_VIEW_INDEX = 1; // side menu -> <root view>
const VIEW_ID_PREFIX = 'view-';

const SIDE_MENU_VIEW = {
  id: `${VIEW_ID_PREFIX}side-menu`,
  viewName: 'SideMenuView',
};

/** @type {View[]} */
const HOME_DEFAULT_VIEWS = [
  SIDE_MENU_VIEW,
  {
    id: `${VIEW_ID_PREFIX}home`,
    viewName: 'HomeView',
  },
];

/** @type {View[]} */
const SEARCH_DEFAULT_VIEWS = [
  SIDE_MENU_VIEW,
  {
    id: `${VIEW_ID_PREFIX}search`,
    viewName: 'SearchView',
  },
];

/** @type {View[]} */
const MY_LIB_DEFAULT_VIEWS = [
  SIDE_MENU_VIEW,
  {
    id: `${VIEW_ID_PREFIX}mylib`,
    viewName: 'MyLibView',
  },
];

function loadView(viewName) {
  let View;

  if ('SideMenuView' === viewName) {
    View = SideMenuView;
  } else if ('HomeView' === viewName) {
    View = HomeView;
  } else if ('SearchView' === viewName) {
    View = SearchView;
  } else if ('MyLibView' === viewName) {
    View = MyLibView;
  } else if ('PlaylistView' === viewName) {
    View = PlaylistView;
  } else if ('AlbumView' === viewName) {
    View = AlbumView;
  } else if ('ArtistView' === viewName) {
    View = ArtistView;
  } else if ('DumbView' === viewName) {
    View = DumbView;
  }

  return View;
}

function goRootView() {
  if (get(currentView()).length > ROOT_VIEW_INDEX + 1) {
    get(slidePrevAndRemoveForMe)?.();
  }
}

/**
 * @param {string} viewName
 * @param {object} props
 * @returns
 */
function createView(viewName, props) {
  const id = VIEW_ID_PREFIX + getTimestamp();

  return {
    id,
    viewName,
    props,
  };
}

/**
 * @returns {View}
 */
function createDumbView() {
  return createView('DumbView', {
    title: '😎' + new Date().getTime(),
  });
}

function canRemoveView(viewPosition) {
  return viewPosition > 1;
}

function goDetail(viewName, optionsView) {
  const view = createView(viewName, { ...optionsView });
  addView(view);
  get(addAndSlideNextForMe)?.();
}

/**
 * @param {number} position
 */
function isSideMenuView(position) {
  return position === 0;
}

/**
 * @param {number} position
 */
function isHomeView(position) {
  return position === 1;
}

export {
  ROOT_VIEW_INDEX,
  HOME_DEFAULT_VIEWS,
  SEARCH_DEFAULT_VIEWS,
  MY_LIB_DEFAULT_VIEWS,
  loadView,
  goRootView,
  createView,
  createDumbView,
  canRemoveView,
  goDetail,
  isSideMenuView,
  isHomeView,
};
