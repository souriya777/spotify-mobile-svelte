<script>
  import { PANEL_OPENED } from '@/js/store';
  import ArrowBackSvg from '@/lib/svg/ArrowBackSvg.svelte';
  import Debug from '@/lib/Debug.svelte';
  import Logo from '@/lib/Logo.svelte';
</script>

<div class="panel" class:active={$PANEL_OPENED}>
  <button on:click={() => PANEL_OPENED.set(false)}>
    <ArrowBackSvg />
  </button>
  <Debug />
  <Logo />
  panel
  <slot />
</div>

<style>
  .panel {
    background-color: seagreen;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    transform: translateX(100%);
  }

  .active {
    transform: translateX(0);
  }
</style>
