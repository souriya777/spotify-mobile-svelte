import { serviceWorkerNotification } from '@/js/store';
import Logger from '@/js/Logger';

const LOGGER = Logger.getNewInstance('register-service-worker.js');
const SW_VERSION = '1694633582590'; // timestamp when of last change

if ('serviceWorker' in navigator) {
  addEventListener('load', function () {
    navigator.serviceWorker
      .register(`/service-worker.js?v=${SW_VERSION}`)
      .then((registration) => {
        LOGGER.log('service-worker registered ✅', registration.scope);
      })
      .catch((error) => {
        LOGGER.error('Service Worker registration failed:', error);
      });
  });

  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration && registration.active) {
      // Check if there's a new service worker waiting
      if (registration.waiting) {
        console.log('🔴');
        serviceWorkerNotification.set(true);

        // // Display a notification to the user
        // const refreshButton = document.createElement('button');
        // refreshButton.textContent = 'Refresh to update';
        // refreshButton.addEventListener('click', () => {
        //   // Activate the waiting service worker to take control
        //   registration.waiting.postMessage({ action: 'skipWaiting' });
        // });

        // const notification = document.createElement('div');
        // notification.textContent = 'A new version of the app is available.';
        // notification.appendChild(refreshButton);
        // document.body.appendChild(notification);
      }
    }
  });
}
