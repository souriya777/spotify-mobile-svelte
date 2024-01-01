<script>
  import UiProxy from '@lib/UiProxy.svelte';
</script>

<div class="screen">
  <UiProxy></UiProxy>
</div>

<style>
  .screen {
    position: fixed;
    height: 100dvh;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border: 1px dashed deeppink;
  }
</style>
