// @ts-nocheck
self.addEventListener('install', () => {
  console.log('service-worker installed ✅');
});

self.addEventListener('activate', () => {
  console.log('service-worker activated ✅');
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (e) => {
  // Check if the request is for an external API
  if (!/\/me\/tracks/g.test(e.request.url)) {
    return;
  }

  console.log('🟢 service-worker match :)', e.request.url);
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open('api-cache').then((cache) => {
              cache.put(e.request, responseToCache);
            });
            return response;
          } else {
            // Handle API error responses here
            // You can return an error message or handle it as needed
          }
        })
        .catch((error) => {
          // Handle fetch errors here
          console.error('API Fetch error:', error);
          // You can return an error message or handle it as needed
        });
    }),
  );
});
