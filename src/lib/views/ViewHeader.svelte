<script>
  import { userPictureUrl } from '@js/store';
  import User from '@lib/User.svelte';
  export let title = '';

  $: style = `--picture-url: ${$userPictureUrl};`;
</script>

<header {style}>
  <div class="top">
    <div class="left">
      <User userPictureUrl={$userPictureUrl} />
      <div class="title font-title">{title}</div>
    </div>

    <slot name="right" />
  </div>

  <slot name="bottom" />
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    padding-block: 4rem 2rem;
    padding-inline: var(--padding-inline-view-content);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  }

  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .title {
    margin-inline-start: 0.8rem;
  }
</style>
