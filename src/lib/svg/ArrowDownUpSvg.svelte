<script>
  import Svg from '@lib/svg/Svg.svelte';

  export let svgSize = 16;
</script>

<div class="arrow-down-up-svg">
  <div class="down">
    <Svg name="arrow-down" size={svgSize} />
  </div>
  <div class="up">
    <Svg name="arrow-up" size={svgSize} />
  </div>
</div>

<style>
  .arrow-down-up-svg {
    display: flex;
    align-items: center;
    width: 2.8rem;
  }

  .up {
    transform: translateX(-0.6rem);
  }

  .down {
    transform: translateX(-0.2rem);
  }
</style>
