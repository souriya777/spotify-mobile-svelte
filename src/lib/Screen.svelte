<script>
  import { currentPath } from '@js/store';
  import Ui from '@lib/Ui.svelte';
  import HomeView from '@lib/views/HomeView.svelte';
  import SideMenuView from '@lib/views/SideMenuView.svelte';
  import DumbView from '@lib/views/DumbView.svelte';
  import Button from '@lib/Button.svelte';
  import { getTimestamp } from '@js/date-utils';

  /** @type {HTMLElement} */
  let SCREEN;

  /** @type {import('@js/internal').View[]} */
  let VIEWS = [
    {
      id: 'view-side-menu',
      component: SideMenuView,
    },
    {
      id: 'view-home',
      component: HomeView,
    },
    {
      id: 'view-dumb',
      component: DumbView,
      props: {
        title: 'DUMB' + new Date().getTime(),
      },
    },
  ];

  function createView() {
    const id = 'view-' + getTimestamp();

    VIEWS = [
      ...VIEWS,
      {
        id,
        component: DumbView,
        props: {
          title: 'Souriya 😎😎😎' + new Date().getTime(),
        },
      },
    ];
  }
</script>

<div bind:this={SCREEN} class="screen">
  <div class="screen__content">
    currentPath:{$currentPath}
    <Button filled={true} callback={createView}>+view</Button>
    <Ui {VIEWS}></Ui>
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
</style>
