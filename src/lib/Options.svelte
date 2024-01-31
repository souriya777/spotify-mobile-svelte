<script>
  import { optionsFull } from '@js/store';
</script>

<div class="options-panel">
  OPTIONS_testa
  <button on:click={() => ($optionsFull = false)}>close</button>
</div>

<style>
  .options-panel {
    background-color: var(--color-primary-highlight);
    height: 100dvh;
  }
</style>
