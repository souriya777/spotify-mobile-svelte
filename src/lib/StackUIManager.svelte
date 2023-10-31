<script>
  // import Panel from '@/lib/Panel.svelte';

  export let View;
  export let props;

  $: STACK_VIEWS = STACK_VIEWS?.length > 0 ? [...STACK_VIEWS, View] : [View];
  $: console.log(STACK_VIEWS, STACK_VIEWS?.length, '🔴');
</script>

{#each STACK_VIEWS as theView, i}
  {@const active = i + 1 === STACK_VIEWS.length}

  <!-- <Panel {active}> -->
  <div class="to-be-stacked" class:active>
    StackUIManager testasou{i}
    <slot />

    <svelte:component this={theView} {...props} />
  </div>
  <!-- </Panel> -->
{/each}

<style>
  .to-be-stacked {
    height: 100%;
    /* padding-block-start: var(--height-screen-island); */
  }

  .active {
    /* transform: translateX(50%); */
    border: 8px dashed yellow;
  }
</style>
