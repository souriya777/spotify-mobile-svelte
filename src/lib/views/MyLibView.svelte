<script>
  import { onMount } from 'svelte';
  import { onTap } from '@js/event-utils';
  import {
    displayFilterMyLib,
    gridMode,
    likedTracks,
    myLibRecentlyPlayed,
    myLibPlaylists,
    myLibAlbums,
    myLibArtists,
  } from '@js/store';
  import SpotifyApi from '@js/SpotifyApi';
  import { sortMyLibBySpotify } from '@js/list-sort-utils';
  import { SPOTIFY_FIRST_RESULTS_LIMIT } from '@js/spotify-utils';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import Button from '@lib/Button.svelte';
  import ListPlaylist from '@lib/ListPlaylist.svelte';
  import ListAlbum from '@lib/ListAlbum.svelte';
  import ListArtist from '@lib/ListArtist.svelte';
  import ListFilter from '@lib/ListFilter.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import ListAll from '@lib/ListAll.svelte';
  import ListSortButton from '@lib/ListSortButton.svelte';
  import FadeEffect from '@lib/FadeEffect.svelte';

  const DISPLAY_MODE_ICON_SIZE = 14;

  let startFadeEffect;

  $: recentlyPlayedUris = new Set($myLibRecentlyPlayed.map((item) => item?.uri));
  $: removeDuplicate = (item) => !recentlyPlayedUris.has(item?.uri);

  $: playlistsWithoutDuplicates = $myLibPlaylists?.filter(removeDuplicate);
  $: albumsWithoutDuplicates = $myLibAlbums?.filter(removeDuplicate);
  $: artistsWithoutDuplicates = $myLibArtists?.filter(removeDuplicate);

  $: firstPlaylists = playlistsWithoutDuplicates?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstAlbums = albumsWithoutDuplicates?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: firstArtists = artistsWithoutDuplicates?.slice(0, SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextPlaylists = playlistsWithoutDuplicates?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextAlbums = albumsWithoutDuplicates?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];
  $: nextArtists = artistsWithoutDuplicates?.slice(SPOTIFY_FIRST_RESULTS_LIMIT) ?? [];

  $: MY_LIB = [
    ...$myLibRecentlyPlayed,
    ...firstPlaylists,
    ...firstAlbums,
    ...firstArtists,
    ...nextPlaylists,
    ...nextAlbums,
    ...nextArtists,
  ];

  onMount(() => {
    // LIKED TRACKS
    SpotifyApi.getLikedTracks().then((items) => ($likedTracks = items));

    // MY LIB
    sortMyLibBySpotify();
  });
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
    <div class="filter-bar">
      <ListFilter
        hasPlaylists={$myLibPlaylists.length > 0}
        hasAlbums={$myLibAlbums.length > 0}
        hasArtists={$myLibArtists.length > 0}
        callback={startFadeEffect}
      />
    </div>
  </svelte:fragment>

  <div class="sort-display">
    <div class="sort">
      <ListSortButton />
    </div>
    <div use:onTap={() => ($gridMode = !$gridMode)}>
      {#if $gridMode}
        <Svg name="list-mode" size={DISPLAY_MODE_ICON_SIZE} />
      {:else}
        <Svg name="grid-mode" size={DISPLAY_MODE_ICON_SIZE} />
      {/if}
    </div>
  </div>

  <FadeEffect bind:start={startFadeEffect}>
    {#if $displayFilterMyLib.playlistActive}
      <ListPlaylist items={$myLibPlaylists} />
    {:else if $displayFilterMyLib.albumActive}
      <ListAlbum items={$myLibAlbums} />
    {:else if $displayFilterMyLib.artistActive}
      <ListArtist items={$myLibArtists} />
    {:else}
      <ListAll items={MY_LIB} showLikedPlaylist={true} />
    {/if}
  </FadeEffect>
</ViewRoot>

<style>
  .sort-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
