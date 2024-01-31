<script>
  import { playerFull, optionsFull } from '@js/store';
  import Player from '@lib/Player.svelte';
  import BottomPanel from '@lib/BottomPanel.svelte';

  let openBottomPanelForMe;
  let closeBottomPanelForMe;

  $: if ($playerFull && openBottomPanelForMe) {
    openBottomPanelForMe();
  } else if (!$playerFull && closeBottomPanelForMe) {
    closeBottomPanelForMe();
  }
</script>

<BottomPanel
  blur={$optionsFull}
  callbackAfterClose={() => ($playerFull = false)}
  bind:openBottomPanelForMe
  bind:closeBottomPanelForMe
>
  <Player />
</BottomPanel>
