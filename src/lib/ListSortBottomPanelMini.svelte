<script>
  import { listSortOptionsFull } from '@js/store';
  import BottomPanelMini from '@lib/BottomPanelMini.svelte';
  import ListSortOptions from '@lib/ListSortOptions.svelte';

  let openForMe;
  let closeForMe;

  $: if ($listSortOptionsFull) {
    openForMe?.();
  } else {
    closeForMe?.();
  }
</script>

<BottomPanelMini
  callbackAfterClose={() => ($listSortOptionsFull = false)}
  bind:openForMe
  bind:closeForMe
>
  <ListSortOptions />
</BottomPanelMini>
