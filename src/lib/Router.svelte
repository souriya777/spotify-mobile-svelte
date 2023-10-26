<script>
  import Nav from '@/lib/Nav.svelte';
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import MyLibView from '@/lib/views/MyLibView.svelte';
  import Logger from '@/js/Logger';
  import PlaylistView from '@/lib/views/PlaylistView.svelte';
  import AlbumView from '@/lib/views/AlbumView.svelte';
  import { getUrlPath } from '@/js/souriya-utils';
  import { currentPath } from '@/js/store';

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

<Nav />
<svelte:component this={View} {...props} />

<svelte:window on:popstate={handlePopstate} />

<svelte:head>
  <title>{title}</title>
</svelte:head>
