<script>
  import { playerFull, optionsFull } from '@js/store';
  import Player from '@lib/Player.svelte';
  import BottomPanel from '@lib/BottomPanel.svelte';

  let openForMe;
  let closeForMe;

  $: if ($playerFull) {
    openForMe?.();
  } else if (!$playerFull) {
    closeForMe?.();
  }
</script>

<BottomPanel
  blur={$optionsFull}
  callbackAfterClose={() => ($playerFull = false)}
  bind:openForMe
  bind:closeForMe
>
  <Player />
</BottomPanel>
