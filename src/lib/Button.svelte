<script>
  export let label;
  export let callback;
  export let selected = false;
</script>

<button class:selected on:click={callback}>{label}</button>

<style>
  .selected {
    border: 4px dashed hotpink;
  }
</style>
