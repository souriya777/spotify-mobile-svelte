<script>
  import { playing } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import Button from '@lib/Button.svelte';
</script>

{#if $playing}
  <Button
    type="primary"
    svg="pause"
    reverseAccent={true}
    bubble={true}
    bubbleMini={true}
    callback={() => SpotifyApi.pause()}
  ></Button>
{:else}
  <Button
    type="primary"
    svg="play"
    reverseAccent={true}
    bubble={true}
    bubbleMini={true}
    callback={() => SpotifyApi.play()}
  ></Button>
{/if}
