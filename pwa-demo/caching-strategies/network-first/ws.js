const CACHE_STORAGE = 'demo-cache';
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Cache request with endpoint is : '/todos/123'

  // if (event.request)
  // return response from cache
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return fetch(event.request)
        .then((response) => {
          console.log({ response });
          // Only cache with '/todos'
          if (event.request.url.includes('/todos')) {
            // response may be used only once
            // we need to save clone to put one copy in cache and serve second one
            let responseClone = response.clone();

            caches.open(CACHE_STORAGE).then((cache) => {
              // delete exist value
              cache.keys().then((keys) => {
                keys.forEach((request) => {
                  if (request.url !== event.request.url) cache.delete(request);
                  console.log({ 1: request.url, 2: event.request.url });
                });
              });

              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          console.log('call loi');
          if (cachedResponse) return cachedResponse;
          else return new Response('Body of the HTTP response');
        });
    })
  );
});
