<script>
  import { serviceWorkerNotification } from '@js/store';
  import Logger from '@js/Logger';

  const LOGGER = Logger.getNewInstance('RegisterServiceWorker.svelte');
  const SERVICE_WORKER_VERSION = '1703840724278'; // timestamp when of last change
  let swRegistration = null;
  let displayRefresh = false;

  if ('serviceWorker' in navigator) {
    addEventListener('load', function () {
      navigator.serviceWorker
        .register(`/service-worker.js?v=${SERVICE_WORKER_VERSION}`)
        .then((registration) => {
          LOGGER.log('service-worker registered ✅', registration.scope);
        })
        .catch((error) => {
          LOGGER.error('Service Worker registration failed:', error);
        });
    });

    navigator.serviceWorker.getRegistration().then((registration) => {
      swRegistration = registration;

      if (registration && registration.active) {
        // Check if there's a new service worker waiting
        if (registration.waiting) {
          serviceWorkerNotification.set(true);
          displayRefresh = true;
        }
      }
    });
  }

  function refreshServiceWorker() {
    // Activate the waiting service worker to take control
    swRegistration.waiting.postMessage({ action: 'skipWaiting' });
    displayRefresh = false;
  }
</script>

{#if displayRefresh}
  <div>
    A new version of the app is available.
    <button on:click={refreshServiceWorker}>Refresh to update</button>
  </div>
{/if}
