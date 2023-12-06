<script>
  import '@css/main.scss';
  import { onMount } from 'svelte';
  import Screen from '@/lib/Screen.svelte';
  import { noScroll } from '@js/souriya-utils';

  onMount(() => {
    noScroll();
  });
</script>

<main>
  <Screen />
</main>
