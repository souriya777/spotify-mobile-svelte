<script>
  /** @type {HTMLElement} */
  let VIEW;
</script>

<div class="view" bind:this={VIEW}>
  <slot name="header" />
  <slot />
</div>
