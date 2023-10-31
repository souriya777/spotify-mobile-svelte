<script>
  import { appReady, playerFull, currentPath } from '@/js/store';
  import { getUrlPath } from '@/js/souriya-utils';
  import Nav from '@/lib/Nav.svelte';
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import MyLibView from '@/lib/views/MyLibView.svelte';
  import Logger from '@/js/Logger';
  import PlaylistView from '@/lib/views/PlaylistView.svelte';
  import AlbumView from '@/lib/views/AlbumView.svelte';
  import Debug from '@/lib/Debug.svelte';
  import Notification from '@/lib/Notification.svelte';
  import Player from '@/lib/Player.svelte';
  import StackUiManager from '@/lib/StackUIManager.svelte';
  import SpotifyAuthentication from '@/lib/SpotifyAuthentication.svelte';

  const LOGGER = Logger.getNewInstance('Router.svelte');

  let View;
  let props = {};
  let title = 'home';

  $: path = $currentPath;
  $: go(path);
  $: LOGGER.log('🟢', path);

  function handlePopstate() {
    const newPath = getUrlPath(window.location.href);
    go(newPath);
  }

  function load(ComponentView, path) {
    View = ComponentView;
    title = '/' === path ? '/home' : path;
  }

  function go(path) {
    if (/search/gi.test(path)) {
      View = SearchView;
      load(SearchView, '/search');
    } else if (/my-lib/gi.test(path)) {
      load(MyLibView, '/my-lib');
    } else if (/playlist/gi.test(path)) {
      const id = path?.match(/(?<=playlist\/).*/g)?.[0];
      props = { id };
      load(PlaylistView, `/playlist/${id}`);
    } else if (/album/gi.test(path)) {
      const id = path?.match(/(?<=album\/).*/g)?.[0];
      props = { id };
      load(AlbumView, `/album/${id}`);
    } else {
      load(HomeView, '/');
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<svelte:window on:popstate={handlePopstate} />
<SpotifyAuthentication />

<StackUiManager {View} {props}>
  <Notification />
  <Debug />

  {#if $appReady}
    <details open={$playerFull}>
      <summary>
        <button on:click={() => playerFull.update((state) => !state)}>player</button>
      </summary>
      <Player />
    </details>
  {/if}

  <Nav />
</StackUiManager>
