<script>
  import { getUrlPath } from '@js/souriya-utils';
  import { isNotEmpty } from '@js/string-utils';
  import { searchQuery, currentPath } from '@js/store';
  import NavLink from '@lib/NavLink.svelte';
  import Svg from '@lib/svg/Svg.svelte';
  import { isHomePath, isMyLibPath, isSearchPath } from '@js/path-utils';

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
      <NavLink label="Home" to="/" isActive={isHomePath(path)}>
        <Svg name="home" />
        <Svg name="home-selected" slot="selected-icon" />
      </NavLink>
    </li>
    <li>
      <NavLink label="Search" to={searchUrl} isActive={isSearchPath(path)}>
        <Svg name="search" />
        <Svg name="search-selected" slot="selected-icon" />
      </NavLink>
    </li>
    <li>
      <NavLink label="Your Library" to="/my-lib" isActive={isMyLibPath(path)}>
        <Svg name="library" />
        <Svg name="library-selected" slot="selected-icon" />
      </NavLink>
    </li>
  </ul>
</nav>

<style>
  nav {
    width: 100%;
    padding-block: 1.6rem 3.2rem;
    background-image: linear-gradient(
      to top,
      rgba(18, 18, 18, 1) 45%,
      rgba(18, 18, 18, 0.94) 80%,
      rgba(18, 18, 18, 0.9)
    );
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
