<script>
  import { onMount } from 'svelte';
  import { userId } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import Button from '@lib/Button.svelte';
  import CollectionPlaylist from '@lib/CollectionPlaylist.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  let playlists = [];

  onMount(() => {
    // get playlist
    sortPlaylistBySpotify();
  });

  async function sortPlaylistBySpotify() {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
  }
</script>

<ViewRoot title="Your library">
  <svelte:fragment slot="header__right">
    <div>
      <Button type="secondary" svg="search" callback={() => console.log('TODO')} />
    </div>
    <div>
      <Button
        type="secondary"
        svg="plus"
        svgSize={36}
        svgViewbox="-4 -4 24 24"
        callback={() => console.log('TODO')}
      />
    </div>
  </svelte:fragment>

  <svelte:fragment slot="header__bottom">
    <div class="filter-bar">filter bar reprendre l'ancienne</div>
  </svelte:fragment>

  <div class="sort-display">
    <div>TODO sort</div>
    <div>TODO list / grid</div>
  </div>

  <CollectionPlaylist items={playlists} />
</ViewRoot>

<style>
  .sort-display {
    display: flex;
    justify-content: space-between;
    background-color: chocolate;
  }
</style>
