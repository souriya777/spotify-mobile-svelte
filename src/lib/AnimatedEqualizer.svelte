<script>
  export let pause = false;
</script>

<div class="animated-equalizer" class:pause>
  <div class="bar bar1"></div>
  <div class="bar bar2"></div>
  <div class="bar bar3"></div>
</div>

<style>
  .animated-equalizer {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
  }

  .bar {
    width: 3px;
    height: 16px;
    border-radius: 1px;
    background-color: var(--color-accent);
    transform: scaleY(0.2);
    transform-origin: bottom center;
    animation-duration: 0.9s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-play-state: running;
  }

  .bar1 {
    animation-name: bar1;
  }

  .bar2 {
    animation-name: bar2;
  }

  .bar3 {
    animation-name: bar3;
  }

  .pause .bar {
    animation: unset;
    transition: animation 250ms ease;
  }

  @keyframes bar1 {
    0% {
      transform: scaleY(0.9);
    }
    25% {
      transform: scaleY(0.5);
    }
    50% {
      transform: scaleY(0.3);
    }
    75% {
      transform: scaleY(0.6);
    }
    100% {
      transform: scaleY(0.9);
    }
  }

  @keyframes bar2 {
    0% {
      transform: scaleY(0.2);
    }
    25% {
      transform: scaleY(0.6);
    }
    50% {
      transform: scaleY(1);
    }
    75% {
      transform: scaleY(0.4);
    }
    /* 100% {
      transform: scaleY(0.2);
    } */
  }

  @keyframes bar3 {
    /* 0% {
      transform: scaleY(0.45);
    } */
    25% {
      transform: scaleY(0.25);
    }
    50% {
      transform: scaleY(0.65);
    }
    75% {
      transform: scaleY(0.9);
    }
    100% {
      transform: scaleY(0.45);
    }
  }
</style>
