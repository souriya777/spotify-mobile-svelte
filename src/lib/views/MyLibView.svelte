<script>
  import { onMount } from 'svelte';
  import { userId } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import View from '@lib/views/View.svelte';
  import Button from '@lib/Button.svelte';
  import CollectionPlaylist from '@lib/CollectionPlaylist.svelte';

  /** @type {import('@js/spotify').SpotifyPlaylist[]} */
  let playlists = [];

  let selectedPlaylist = 1;

  onMount(() => {
    // get playlist
    sortPlaylistBySpotify();
  });

  async function sortPlaylistBySpotify() {
    playlists = await SpotifyApi.getPlaylistsSortedBySpotify($userId);
    selectedPlaylist = 1;
  }
</script>

<View title="Your library">
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

  <div>
    <div>TODO sort</div>
    <div>TODO list / grid</div>
  </div>

  <CollectionPlaylist items={playlists} />
</View>
