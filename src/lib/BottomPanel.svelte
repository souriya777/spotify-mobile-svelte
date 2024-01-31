<script>
  export const openBottomPanelForMe = () => (opened = true);
  export const closeBottomPanelForMe = () => (opened = false);

  let opened = false;
</script>

<div class="bottom-panel" class:opened>
  <slot />
</div>

<style>
  .bottom-panel {
    height: 0;
    transition: height var(--transition-bottom-panel);
  }

  .opened {
    height: 100dvh;
    transition: height var(--transition-bottom-panel);
  }
</style>
