<script>
  import { serviceWorkerNotification } from '@js/store';

  async function updateServiceWorker() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();

      // Activate the waiting service worker to take control
      registration.waiting.postMessage({ action: 'skipWaiting' });

      window.location.href = '/';
    }
  }
</script>

{#if $serviceWorkerNotification === true}
  <div>
    A new version of the app is available.
    <button on:click={updateServiceWorker}>Refresh to update</button>
  </div>
{/if}
