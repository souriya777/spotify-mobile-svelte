<script>
  export let View;
  export let props;

  $: STACK_VIEWS = STACK_VIEWS?.length > 0 ? [...STACK_VIEWS, View] : [View];
  $: console.log(STACK_VIEWS, STACK_VIEWS?.length, '🔴');
</script>

<div class="to-be-stacked">
  StackUIManager
  <slot />

  {#each STACK_VIEWS as view, i}
    <div class:active={i + 1 === STACK_VIEWS.length}>
      testasou{i}
      <svelte:component this={view} {...props} />
    </div>
  {/each}
</div>

<style>
  .active {
    /* transform: translateX(50%); */
    background-color: yellow;
  }
</style>
