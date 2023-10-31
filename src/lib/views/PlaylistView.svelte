<script>
  import { onMount } from 'svelte';
  import SpotifyApi from '@/js/SpotifyApi';
  import CollectionTrack from '@/lib/CollectionTrack.svelte';
  import { scrollTop } from '@/js/store';

  export let id;

  const Y_OFFSET = 161;
  let img;
  /** @type {import('@/js/spotify').SpotifyTrack[]} */
  let tracks = [];

  onMount(() => {
    SpotifyApi.getPlaylistTracks(id).then((items) => (tracks = items));
  });

  $: if (img) {
    const scale = 1 - ($scrollTop / Y_OFFSET) * 0.33;
    const opacity = 1 - ($scrollTop / Y_OFFSET) * 1.5;
    // console.log($scrollTop, scale, opacity, '✅', img);
    img.style.transform = `scale(${scale})`;
    img.style.opacity = `${opacity}`;
  }
</script>

Playlist {id}

<div class="top-image">
  <img src="/karaoke.jpeg" alt="karaoke" bind:this={img} />
</div>
<CollectionTrack playlistId={id} items={tracks} />

<style>
  .top-image {
    position: relative;
    max-width: 150px;
    margin-inline: auto;
    padding-block: 20px;
  }

  .top-image img {
    position: absolute;
  }
</style>
