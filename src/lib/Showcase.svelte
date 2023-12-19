<script>
  import Button from '@lib/Button.svelte';
  import Logger from '@js/Logger';

  const LOGGER = Logger.getNewInstance('Showcase.js');
</script>

<div class="showcase">
  normal
  <div class="text-accent">accent</div>
  <div class="accent-area">accent-area</div>
  <div class="highlight-area">highlight-area</div>

  <Button type="primary" svg="favorite" callback={() => LOGGER.log('TODO')}>primary</Button>
  <Button type="secondary" svg="favorite" callback={() => LOGGER.log('TODO 2')}>secondary</Button>
  <Button type="secondary" svg="favorite" callback={() => LOGGER.log('TODO 3')} />
  <Button type="primary" hasAccent={false} callback={() => LOGGER.log('TODO 4')}>no-accent</Button>
  <Button filled={true} callback={() => LOGGER.log('TODO 5')}>filled</Button>
</div>
