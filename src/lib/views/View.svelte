<script>
  export let id;
</script>

<div {id} class="view">
  <slot name="header" />
  <slot />
</div>
