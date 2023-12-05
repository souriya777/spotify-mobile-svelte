<script>
  import { getUrlPath, isNotEmpty } from '@js/souriya-utils';
  import { searchQuery, currentPath } from '@js/store';
  import NavLink from '@lib/NavLink.svelte';
  import Svg from '@lib/svg/Svg.svelte';

  $: searchUrl = isNotEmpty($searchQuery) ? `/search/${$searchQuery}` : '/search';

  $: path = $currentPath;

  function handlePopstate() {
    path = getUrlPath(window.location.href);
  }
</script>

<svelte:window on:popstate={handlePopstate} />

<nav>
  <ul>
    <li>
      <NavLink label="Home" to="/" isActive={/^\/$/gi.test(path)}>
        <Svg name="home" />
        <Svg name="home-selected" slot="selected-icon" />
      </NavLink>
    </li>
    <li>
      <NavLink label="Search" to={searchUrl} isActive={/search/gi.test(path)}>
        <Svg name="search" />
        <Svg name="search-selected" slot="selected-icon" />
      </NavLink>
    </li>
    <li>
      <NavLink label="Your Library" to="/my-lib" isActive={/my-lib/gi.test(path)}>
        <Svg name="library" />
        <Svg name="library-selected" slot="selected-icon" />
      </NavLink>
    </li>
  </ul>
</nav>

<style>
  nav {
    width: 100%;
    padding-block: 1.2rem 1.8rem;
    background-image: linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0.85));
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
