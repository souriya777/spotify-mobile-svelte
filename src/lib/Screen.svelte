<script>
  import UiProxy from '@lib/UiProxy.svelte';
  import { playingRgb } from '@js/store';

  $: style = `--playing-rgb: rgb(${$playingRgb.join(',')});`;
</script>

<div class="screen" {style}>
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
  }
</style>
