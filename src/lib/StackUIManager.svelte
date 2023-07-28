<script>
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import LibView from '@/lib/views/LibView.svelte';
  import Panel from './Panel.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('StackUIManager');
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

<button on:click={() => createView('home')}>Home</button>
<button on:click={() => createView('search')}>Search</button>
<button on:click={() => createView('lib')}>Lib</button>

{#each stack as [view, props]}
  <Panel active={props.active}>
    <svelte:component this={view} />
  </Panel>
{/each}
