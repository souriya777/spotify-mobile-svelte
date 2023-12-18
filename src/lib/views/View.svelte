<script>
  export let id;

  /** @type {HTMLElement} */
  let VIEW;
</script>

<div {id} class="view" bind:this={VIEW}>
  <slot name="header" />
  <slot />
</div>
