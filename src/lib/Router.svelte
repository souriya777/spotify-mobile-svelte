<script>
  import { currentPath } from '@/js/store';
  import Nav from '@/lib/Nav.svelte';
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import MyLibView from '@/lib/views/MyLibView.svelte';
  import Logger from '@/js/Logger';
  import PlaylistView from '@/lib/views/PlaylistView.svelte';
  import AlbumView from '@/lib/views/AlbumView.svelte';

  const LOGGER = Logger.getNewInstance('Router.svelte');

  let View;
  let props = {};

  $: pathname = $currentPath;
  $: LOGGER.log('🟢', pathname);

  $: if (pathname === '/') {
    View = HomeView;
  } else if (/search/gi.test(pathname)) {
    View = SearchView;
  } else if (/my-lib/gi.test(pathname)) {
    View = MyLibView;
  } else if (/playlist/gi.test(pathname)) {
    const id = pathname?.match(/(?<=playlist\/).*/g)?.[0];
    props = { id };
    View = PlaylistView;
  } else if (/album/gi.test(pathname)) {
    const id = pathname?.match(/(?<=album\/).*/g)?.[0];
    props = { id };
    View = AlbumView;
  }
</script>

<Nav />
<svelte:component this={View} {...props} />
