<script>
  import { listSortOptionsFull, listSortType } from '@js/store';
  import { onTap } from '@js/event-utils';
  import ArrowDownUpSvg from '@lib/svg/ArrowDownUpSvg.svelte';
  import { LIST_SORT_OPTIONS_MAP } from '@js/list-sort-utils';

  $: label = LIST_SORT_OPTIONS_MAP.get($listSortType)?.label;
</script>

<div class="list-sort">
  <div class="label" use:onTap={() => ($listSortOptionsFull = true)}>
    <ArrowDownUpSvg /> <span class="text font-1_5">{label}</span>
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
