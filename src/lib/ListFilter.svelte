<script>
  import { displayFilter } from '@/js/store';

  export let displayTop = true;
  export let hasTracks = false;
  export let hasArtists = false;
  export let hasPlaylists = false;
  export let hasAlbums = false;
</script>

<div>
  <h2>filters</h2>

  {#if displayTop}
    <button class:active={$displayFilter.topOn} on:click={displayFilter.filterNone}> top </button>
  {/if}

  {#if hasTracks}
    <button class:active={$displayFilter.trackActive} on:click={displayFilter.filterTrackOnly}>
      track
    </button>
  {/if}

  {#if hasArtists}
    <button class:active={$displayFilter.artistActive} on:click={displayFilter.filterArtistOnly}>
      artist
    </button>
  {/if}

  {#if hasPlaylists}
    <button
      class:active={$displayFilter.playlistActive}
      on:click={displayFilter.filterPlaylistOnly}
    >
      playlist
    </button>
  {/if}

  {#if hasAlbums}
    <button class:active={$displayFilter.albumActive} on:click={displayFilter.filterAlbumOnly}>
      album
    </button>
  {/if}
</div>

<style>
  button.active {
    background-color: var(--color-active);
  }
</style>
