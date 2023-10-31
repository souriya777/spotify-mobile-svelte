<script>
  import ArrowBackSvg from '@/lib/svg/ArrowBackSvg.svelte';

  export let active;
</script>

<div class="panel" class:active>
  <button on:click={() => (active = false)}>
    <ArrowBackSvg />
  </button>
  <code>
    active={active}
  </code>
  <slot />
</div>

<style>
  .panel {
    background-color: seagreen;
    position: absolute;

    /* top: 0; */
    bottom: 0;

    right: 0;
    width: 100%;

    /* height: 100%; */
    height: 50%;

    opacity: 0.8;
    transform: translateX(100%);
    transform: translateX(80%);
  }

  .active {
    transform: translateX(0);
  }
</style>
