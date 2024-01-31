<script>
  import { optionsFull } from '@js/store';
  import BottomPanel from '@lib/BottomPanel.svelte';
  import Options from '@lib/Options.svelte';

  let openBottomPanelForMe;
  let closeBottomPanelForMe;

  $: if ($optionsFull && openBottomPanelForMe) {
    openBottomPanelForMe();
  } else if (!$optionsFull && closeBottomPanelForMe) {
    closeBottomPanelForMe();
  }
</script>

<BottomPanel
  bounce={true}
  callbackAfterClose={() => ($optionsFull = false)}
  bind:openBottomPanelForMe
  bind:closeBottomPanelForMe
>
  <Options />
</BottomPanel>
