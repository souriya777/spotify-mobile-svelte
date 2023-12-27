import { getTimestamp } from '@js/date-utils';
import HomeView from '@lib/views/HomeView.svelte';
import SideMenuView from '@lib/views/SideMenuView.svelte';
import DumbView from '@lib/views/DumbView.svelte';

/** @type {import('@js/internal').View[]} */
const DEFAULT_VIEWS = [
  {
    id: 'view-side-menu',
    viewName: 'SideMenuView',
  },
  {
    id: 'view-home',
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

/**
 * @returns {import('@js/internal').View}
 */
function createView() {
  const id = 'view-' + getTimestamp();

  return {
    id,
    viewName: 'DumbView',
    props: {
      title: 'Souriya 😎😎😎' + new Date().getTime(),
    },
  };
}

export { DEFAULT_VIEWS, getView, createView };
