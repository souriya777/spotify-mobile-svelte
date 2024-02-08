import { getTimestamp } from '@js/date-utils';
import SideMenuView from '@lib/views/SideMenuView.svelte';
import HomeView from '@lib/views/HomeView.svelte';
import SearchView from '@lib/views/SearchView.svelte';
import MyLibView from '@lib/views/MyLibView.svelte';
import PlaylistView from '@lib/views/PlaylistView.svelte';
import DumbView from '@lib/views/DumbView.svelte';

const ROOT_VIEW_INDEX = 1;
// DEPRECATED
// const ROOT_VIEW_INDEX = 2; // side menu + root view
const VIEW_ID_PREFIX = 'view-';
const SIDE_MENU_VIEW = {
  id: `${VIEW_ID_PREFIX}side-menu`,
  viewName: 'SideMenuView',
};

/** @type {import('@js/internal').View[]} */
const HOME_DEFAULT_VIEWS = [
  SIDE_MENU_VIEW,
  {
    id: `${VIEW_ID_PREFIX}home`,
    viewName: 'HomeView',
  },
];

/** @type {import('@js/internal').View[]} */
const SEARCH_DEFAULT_VIEWS = [
  SIDE_MENU_VIEW,
  {
    id: `${VIEW_ID_PREFIX}search`,
    viewName: 'SearchView',
  },
];

/** @type {import('@js/internal').View[]} */
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
  } else if ('DumbView' === viewName) {
    View = DumbView;
  }

  return View;
}

function canRemoveView(viewPosition) {
  return viewPosition > 1;
}

/**
 * @returns {import('@js/internal').View}
 */
function createView() {
  const id = VIEW_ID_PREFIX + getTimestamp();

  return {
    id,
    viewName: 'DumbView',
    props: {
      title: '😎' + new Date().getTime(),
    },
  };
}

/**
 * @returns {import('@js/internal').View}
 */
function createPlaylistView(id) {
  return {
    id: VIEW_ID_PREFIX + getTimestamp(),
    viewName: 'PlaylistView',
    props: {
      id,
    },
  };
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
  createView,
  createPlaylistView,
  canRemoveView,
  isSideMenuView,
  isHomeView,
};
