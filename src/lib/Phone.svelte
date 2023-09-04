<script>
  import PhoneScreen from '@/lib/PhoneScreen.svelte';
</script>

<div class="phone">
  <div class="button-left-1" />
  <div class="button-left-2" />
  <div class="button-left-3" />
  <div class="button-right" />

  <PhoneScreen />
</div>

<style>
  :root {
    --border-radius-shell: 48px;
    --border-radius-screen: 42px;
    --inline-position-button: -7px;
    --height-screen-top: 43px;
    --height-screen-nav: 52px;
  }

  .phone {
    position: relative;
    border: var(--border-width-shell) solid var(--color-shell);
    border-radius: var(--border-radius-shell);
  }

  .button-left-1,
  .button-left-2,
  .button-left-3 {
    position: absolute;
    left: var(--inline-position-button);
    width: 3px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    background: var(--color-shell);
    z-index: 1;
  }

  .button-left-1 {
    top: 92px;
    height: 18px;
  }

  .button-left-2 {
    top: 128px;
    height: 40px;
  }

  .button-left-3 {
    top: 180px;
    height: 40px;
  }

  .button-right {
    position: absolute;
    top: 156px;
    height: 58px;
    right: var(--inline-position-button);
    width: 3px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    background: var(--color-shell);
    z-index: 1;
  }
</style>
