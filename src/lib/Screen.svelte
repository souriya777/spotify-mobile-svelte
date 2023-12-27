<script>
  import { currentPath } from '@js/store';
  import { getTimestamp } from '@js/date-utils';
  import Ui from '@lib/Ui.svelte';
  import HomeView from '@lib/views/HomeView.svelte';
  import SideMenuView from '@lib/views/SideMenuView.svelte';
  import DumbView from '@lib/views/DumbView.svelte';
  import Button from '@lib/Button.svelte';
  import UiForeground from '@lib/UiForeground.svelte';

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
      //   props: {
      //     title: 'DUMB' + new Date().getTime(),
      //   },
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

  function removeView() {
    VIEWS = [...VIEWS.slice(0, -1)];
  }
</script>

<div bind:this={SCREEN} class="screen">
  <Ui {VIEWS} on:removeSlide={removeView}>
    <!-- <div>
      currentPath:{$currentPath}
      <Button filled={true} callback={createView}>+view</Button>
      <Button filled={true} callback={removeView}>-view</Button>
    </div> -->
    <svelte:fragment slot="fixed">
      <UiForeground />
    </svelte:fragment>
  </Ui>
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
</style>
