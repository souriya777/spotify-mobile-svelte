<script>
  import { onMount } from 'svelte';
  import { listSortOptionsFull, listSortId } from '@js/store';
  import { sortMyLibBySpotify } from '@js/list-sort-utils';
  import ArrowDownUpSvg from '@lib/svg/ArrowDownUpSvg.svelte';
  import { LIST_SORT_OPTIONS_MAP } from '@js/list-sort-utils';

  onMount(() => {
    sortMyLibBySpotify();
  });

  $: label = LIST_SORT_OPTIONS_MAP.get($listSortId)?.label;
</script>

<div class="list-sort">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="label" on:click={() => ($listSortOptionsFull = true)}>
    <ArrowDownUpSvg /> <span class="text font-list-sort-small">{label}</span>
  </div>
</div>

<style>
  .label {
    display: flex;
  }

  .text {
    margin-inline-start: 0.4rem;
  }
</style>
