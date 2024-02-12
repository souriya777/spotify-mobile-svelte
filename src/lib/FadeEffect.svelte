<script>
  export let fade = false;
  export const start = () => (fade = true);
</script>

<div class:fade on:animationend={() => (fade = false)}>
  <slot />
</div>

<style>
  .fade {
    animation: fade 0.5s linear;
  }

  @keyframes fade {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0;
    }
    66% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
