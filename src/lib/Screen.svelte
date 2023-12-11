<script>
  import MobileDragger from '@/lib/MobileDragger.svelte';

  /** @type {HTMLElement} */
  let SCREEN;

  let VIEWS = ['side-menu', 'welcome', 'playlist', 'album'];
</script>

<div bind:this={SCREEN} class="screen">
  <MobileDragger totalSlides={6}>
    <svelte:fragment slot="views">
      <div class="un" style="background-color: rgba(0, 100, 0, 0.5)">side-menu</div>
      <div class="deux" style="background-color: rgba(0, 0, 139, 0.5);">welcome</div>
      <div class="trois" style=" background-color: rgba(139, 0, 0, 0.5);">playlist</div>
      <div class="quatre" style="background-color: rgba(148, 0, 211, 0.5);">album</div>
      <div class="cinq">cinq</div>
      <div class="six">six</div>
    </svelte:fragment>
  </MobileDragger>
</div>

<style>
  .screen {
    height: 100%;
    border: 2px dashed hotpink;
  }
</style>
