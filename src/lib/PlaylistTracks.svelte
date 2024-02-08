<script>
  import { trackUri, playing } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import ImageMini from '@lib/ImageMini.svelte';
  import AnimatedEqualizer from '@lib/AnimatedEqualizer.svelte';

  // TODO fix space
  // TODO font-size
  // TODO remove CollectionTrackSECONDARY_ACTIONS
  export let playlistUri;
  /** @type {import('@js/spotify').SpotifyTrack[]} */
  export let tracks;

  function play(indexPosition) {
    SpotifyApi.playTrackWithContext(playlistUri, indexPosition);
  }
</script>

<ul>
  {#each tracks as track, i (track?.id)}
    {@const album = track?.album}
    {@const uri = track?.uri}
    {@const artist = track?.artists?.map((t) => t?.name).join(', ')}

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li on:click={() => play(i)} on:keyup={() => play(i)}>
      <ImageMini images={album?.images} alt={track?.name} />

      <div class="text">
        <div class="song">
          {#if $trackUri === uri}
            <AnimatedEqualizer pause={!$playing} />
          {/if}
          {track?.name}
        </div>
        <div class="artist">
          {artist}
        </div>
      </div>

      <div class="option">option</div>
    </li>
  {/each}
</ul>

<style>
  li {
    display: flex;
    align-items: center;
    padding-block: 1rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    padding-inline-start: 1rem;
  }
</style>
