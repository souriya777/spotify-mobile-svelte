<script>
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import LibView from '@/lib/views/LibViewGrandChild.svelte';
  import SettingsSvg from '@/lib/svg/SettingsSvg.svelte';
  import Panel from '@/lib/Panel.svelte';
  import Player from '@/lib/Player.svelte';
  import { onMount, setContext } from 'svelte';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('StackUIManager.js');

  onMount(() => {
    LOGGER.log('StackUIManager');
  });

  setContext('StackUIManager', {
    createView: (viewName) => LOGGER.log('createView', viewName),
    createPanel: (panelName) => LOGGER.log('createPanel', panelName),
  });

  let stack = [];

  function createView(viewName) {
    let view;

    if ('home' === viewName) {
      view = HomeView;
    } else if ('search' === viewName) {
      view = SearchView;
    } else if ('lib' === viewName) {
      view = LibView;
    }

    stack = [...stack, [view, { active: true }]];
  }
</script>

<div>
  <div class="screen__content">
    <div class="content__header">
      <div class="title">Good evening TODO</div>
      <button on:click={() => LOGGER.log('move to stackUIManager')}>
        <SettingsSvg />
      </button>
    </div>

    <div class="toto">
      <Player />
    </div>

    <!-- here -->
    <button on:click={() => createView('home')}>Home</button>
    <button on:click={() => createView('search')}>Search</button>
    <button on:click={() => createView('lib')}>Lib</button>

    {#each stack as [view, props]}
      <Panel active={props.active}>
        <svelte:component this={view} />
      </Panel>
    {/each}
  </div>
</div>
