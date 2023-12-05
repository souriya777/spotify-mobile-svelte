<script>
  import Svg from '@lib/svg/Svg.svelte';
  import Header from '@lib/Header.svelte';
  import Nav from '@lib/Nav.svelte';
  import Button from './Button.svelte';

  let accentButton = false;

  function switchAccentButtonTODOmove() {
    accentButton = !accentButton;
  }
</script>

<div class="screen">
  <Header />

  normal
  <div class="text-accent">accent</div>
  <div class="accent-area">accent-area</div>
  <div class="highlight-area">highlight-area</div>

  <Button type="primary" svg="favorite" callback={() => console.log('TODO')}>primary</Button>
  <Button type="secondary" svg="favorite" callback={() => console.log('TODO 2')}>secondary</Button>
  <Button type="secondary" svg="favorite" callback={() => console.log('TODO 3')} />
  <Button type="primary" hasAccent={false} callback={() => console.log('TODO 4')}>no-accent</Button>
  <Button filled={true} callback={() => console.log('TODO 5')}>filled</Button>

  <Nav />
</div>

<style>
  .screen {
    position: relative;
    box-sizing: content-box;
    height: var(--height-iphone-12-mini);
    width: var(--width-iphone-12-mini);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }

  .text-accent {
    color: var(--color-accent);
  }

  .accent-area {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    padding: 1rem;
  }

  .highlight-area {
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
    padding: 1rem;
  }
</style>
