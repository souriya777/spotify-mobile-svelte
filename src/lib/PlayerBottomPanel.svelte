<script>
  import { playerFull } from '@js/store';
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

<BottomPanel bind:openBottomPanelForMe bind:closeBottomPanelForMe>
  <Player />
</BottomPanel>
