<script>
  import FavoriteSvg from '@lib/svg/FavoriteSvg.svelte';
  import Header from '@lib/Header.svelte';
  import Nav from '@lib/Nav.svelte';
</script>

<div class="screen">
  <Header />

  normal
  <div class="text-accent">accent</div>
  <div class="accent-area">accent-area</div>
  <div class="highlight-area">highlight-area</div>
  <button class="icon-text primary">
    <span class="icon">
      <FavoriteSvg />
    </span>
    <span class="text">primary</span>
  </button>
  <button class="icon-text secondary">
    <span class="icon">
      <FavoriteSvg />
    </span>
    <span class="text">secondary</span>
  </button>

  <Nav />
</div>

<style>
  .screen {
    position: relative;
    box-sizing: content-box;
    height: var(--height-iphone-12-mini);
    width: var(--width-iphone-12-mini);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }

  .text-accent {
    color: var(--color-accent);
  }

  .accent-area {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    padding: 1rem;
  }

  .highlight-area {
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
    padding: 1rem;
  }
</style>
