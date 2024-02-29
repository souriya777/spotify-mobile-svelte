import DetailHeaderBar from '@lib/DetailHeaderBar.svelte';

const UI_SLIDE_DURATION_MS = 450;

function loadComponent(viewName) {
  return viewName === 'DetailHeaderBar' ? DetailHeaderBar : null;
}

export { UI_SLIDE_DURATION_MS, loadComponent };
