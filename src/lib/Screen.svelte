<script>
  import { currentPath } from '@js/store';
  import Ui from '@lib/Ui.svelte';
  import HomeView from '@lib/views/HomeView.svelte';
  import Nav from '@lib/Nav.svelte';
  import SideMenuView from '@lib/views/SideMenuView.svelte';
  import TroisView from '@lib/views/TroisView.svelte';
  import QuatreView from '@lib/views/QuatreView.svelte';
  import Button from '@lib/Button.svelte';
  import { getTimestamp } from '@js/date-utils';

  /** @type {HTMLElement} */
  let SCREEN;

  let VIEWS = [
    { id: 'view-side-menu', component: SideMenuView },
    { id: 'view-home', component: HomeView },
    { id: 'view-trois', component: TroisView },
    { id: 'view-quatre', component: QuatreView },
  ];

  function createView() {
    VIEWS = [
      ...VIEWS,
      {
        id: 'view-' + getTimestamp(),
        component: HomeView,
      },
    ];
  }
</script>

<div bind:this={SCREEN} class="screen">
  <div class="screen__content">
    currentPath:{$currentPath}
    <Button filled={true} callback={createView}>+view</Button>
    <Ui views={VIEWS}></Ui>
  </div>

  <div class="screen__nav">
    <Nav />
  </div>
</div>

<style>
  .screen {
    height: 100dvh;
    position: fixed;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }

  .screen__content {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .screen__nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
