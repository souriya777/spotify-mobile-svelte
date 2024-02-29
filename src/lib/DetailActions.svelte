<script>
  import { shuffleState } from '@/js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import Button from '@lib/Button.svelte';
  import DetailPlayPause from '@lib/DetailPlayPause.svelte';

  /** @type {HTMLElement} */
  export let PLAY_PAUSE_BUTTON_HTML;
  export let isArtist = false;

  // let PLAY_PAUSE_BUTTON_HTML;
  let FIXME_favorite = false;
  // TODO move favorite action
</script>

<div class="actions">
  {#if isArtist}
    <button>following</button>
  {:else if FIXME_favorite}
    <Button
      type="secondary"
      svg="heart-full"
      hasAccent={true}
      accent={true}
      callback={() => (FIXME_favorite = false)}
    />
  {:else}
    <Button type="secondary" svg="heart" callback={() => (FIXME_favorite = true)} />
  {/if}

  <div>
    <Button
      type="secondary"
      svg="shuffle"
      svgFlexJustify="flex-start"
      accent={$shuffleState}
      bottomDot={$shuffleState}
      callback={() => SpotifyApi.shuffle()}
    />

    <div class="play-pause-button" bind:this={PLAY_PAUSE_BUTTON_HTML}>
      <DetailPlayPause />
    </div>
  </div>
</div>

<style>
  .actions {
    display: flex;
    justify-content: space-between;
    margin-block-end: 1.8rem;
  }

  .play-pause-button {
    display: inline-block;
  }
</style>
