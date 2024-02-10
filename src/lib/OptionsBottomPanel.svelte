<script>
  import { optionsFull } from '@js/store';
  import BottomPanel from '@lib/BottomPanel.svelte';
  import Options from '@lib/Options.svelte';

  let openForMe;
  let closeForMe;

  $: if ($optionsFull) {
    openForMe?.();
  } else {
    closeForMe?.();
  }
</script>

<BottomPanel
  bounce={true}
  callbackAfterClose={() => ($optionsFull = false)}
  bind:openForMe
  bind:closeForMe
>
  <Options />
</BottomPanel>
