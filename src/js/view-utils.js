import { getTimestamp } from '@js/date-utils';
import HomeView from '@lib/views/HomeView.svelte';
import SideMenuView from '@lib/views/SideMenuView.svelte';
import DumbView from '@lib/views/DumbView.svelte';

const HOME_SLIDE_POSITION = 1; // not 0 because of "SIDE MENU"

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

function canRemoveView(currentSlidePosition) {
  return currentSlidePosition > HOME_SLIDE_POSITION;
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

export { DEFAULT_VIEWS, HOME_SLIDE_POSITION, getView, createView, canRemoveView };
