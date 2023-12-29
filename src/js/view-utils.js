import { getTimestamp } from '@js/date-utils';
import HomeView from '@lib/views/HomeView.svelte';
import SideMenuView from '@lib/views/SideMenuView.svelte';
import DumbView from '@lib/views/DumbView.svelte';

const VIEW_ID_PREFIX = 'view-';

/** @type {import('@js/internal').View[]} */
const DEFAULT_VIEWS = [
  {
    id: `${VIEW_ID_PREFIX}side-menu`,
    viewName: 'SideMenuView',
  },
  {
    id: `${VIEW_ID_PREFIX}home`,
    viewName: 'HomeView',
  },
];

function getView(viewName) {
  let View;

  if ('SideMenuView' === viewName) {
    View = SideMenuView;
  } else if ('HomeView' === viewName) {
    View = HomeView;
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

export { DEFAULT_VIEWS, getView, createView, canRemoveView, isSideMenuView, isHomeView };
