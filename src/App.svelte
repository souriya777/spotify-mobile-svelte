<script>
  import '@css/main.scss';
  import { onMount } from 'svelte';
  import Screen from '@lib/Screen.svelte';
  import SpotifyAuthentication from '@lib/SpotifyAuthentication.svelte';
  import RegisterServiceWorker from '@lib/RegisterServiceWorker.svelte';

  onMount(() => {
    // @ts-ignore
    if (window.navigator.standalone === false) {
      // TODO improve UX
      alert("To add this web app to your home screen, tap 'Share' and then 'Add to Home Screen'.");
    }
  });
</script>

<main>
  <RegisterServiceWorker />
  <Screen />
  <SpotifyAuthentication />
</main>
