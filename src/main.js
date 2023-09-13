import App from '@/App.svelte';
import Logger from '@/js/Logger';

const LOGGER = Logger.getNewInstance('main.js');

const app = new App({
  target: document.getElementById('app'),
});

if ('serviceWorker' in navigator) {
  addEventListener('load', function () {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        LOGGER.log('service-worker registered ✅', registration.scope);
      })
      .catch((error) => {
        LOGGER.error('Service Worker registration failed:', error);
      });
  });
}

export default app;
