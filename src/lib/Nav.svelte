<script>
  import { viewName } from '@js/store';
  import NavLink from '@lib/NavLink.svelte';
  import Svg from '@lib/svg/Svg.svelte';
</script>

<nav>
  <ul>
    <li>
      <NavLink label="Home" viewName="home" isActive={'home' === $viewName}
        ><Svg name="home" /><Svg name="home-selected" slot="selected-icon" /></NavLink
      >
    </li>
    <li>
      <NavLink label="Search" viewName="search" isActive={'search' === $viewName}
        ><Svg name="search" /><Svg name="search-selected" slot="selected-icon" /></NavLink
      >
    </li>
    <li>
      <NavLink label="Your Library" viewName="mylib" isActive={'mylib' === $viewName}
        ><Svg name="library" /><Svg name="library-selected" slot="selected-icon" /></NavLink
      >
    </li>
  </ul>
</nav>

<style>
  nav {
    width: 100%;
    padding-block: 1.6rem var(--padding-bottom-phone);
    height: var(--height-nav);
    background-image: linear-gradient(
      to top,
      rgba(18, 18, 18, 1) 45%,
      rgba(18, 18, 18, 0.98) 80%,
      rgba(18, 18, 18, 0.99)
    );
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
