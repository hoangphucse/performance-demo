const CACHE_STORAGE = 'demo-cache';

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  caches.open(CACHE_STORAGE).then((cache) => {
    cache.addAll([
      '/pwa-demo/caching-strategies/cache-first/index.html',
      '/pwa-demo/caching-strategies/cache-first/app.js',
      '/pwa-demo/caching-strategies/cache-first/style.css',
      'https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.1/axios.min.js',
    ]);
  });
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
      // It can update the cache to serve updated content on the next request
      console.log({ cachedResponse });
      if (cachedResponse) return cachedResponse;
      else {
        return fetch(event.request).then((response) => {
          console.log({ response });
          // Only cache with '/todos'
          if (event.request.url.includes('/todos')) {
            // response may be used only once
            // we need to save clone to put one copy in cache and serve second one
            let responseClone = response.clone();
            caches.open(CACHE_STORAGE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      }
    })
  );
});
