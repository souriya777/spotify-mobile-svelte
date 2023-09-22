<script>
  import { currentPath } from '@/js/store';
  import Nav from '@/lib/Nav.svelte';
  import HomeView from '@/lib/views/HomeView.svelte';
  import SearchView from '@/lib/views/SearchView.svelte';
  import MyLibView from '@/lib/views/MyLibView.svelte';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('Router.svelte');

  let View;

  $: pathname = $currentPath;
  $: LOGGER.log('🟢', pathname);

  $: if (pathname === '/') {
    View = HomeView;
  } else if (/search/gi.test(pathname)) {
    View = SearchView;
  } else if (/my-lib/gi.test(pathname)) {
    View = MyLibView;
  }
</script>

<Nav />
<svelte:component this={View} />
