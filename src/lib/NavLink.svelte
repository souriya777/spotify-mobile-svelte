<script>
  import { currentPath } from '@/js/store';

  export let to = '/';
  export let isActive = false;

  function goto(e) {
    e.preventDefault();
    currentPath.set(to);
    window.history.pushState({}, to, to);
  }
</script>

<a href={to} on:click={goto}>
  <div class="nav-item" class:active={isActive}>
    <slot />
  </div>
</a>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .nav-item {
    display: grid;
    place-items: center;
  }

  .nav-item.active {
    color: hotpink;
  }
</style>
