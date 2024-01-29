<script>
  import { playingRgb, playerFull } from '@js/store';
  import UiProxy from '@lib/UiProxy.svelte';

  $: rgb = `rgb(${$playingRgb.join(',')})`;
  $: style = `--playing-rgb: ${rgb};`;
</script>

<svelte:head>
  <meta name="theme-color" content={$playerFull ? rgb : 'var(--color-primary)'} />
</svelte:head>

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
