self.addEventListener('install', async (event) => {
  const cache = await caches.open('pwa-assets');
  // it stores all resources on first SW install
  cache.addAll(['/', 'app.js', 'style.css', 'color.json']);
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      console.log('chay 1');
      const networkFetch = fetch(event.request)
        .then((response) => {
          console.log('chay 2');
          // update the cache with a clone of the network response
          caches.open('pwa-assets').then((cache) => {
            cache.put(event.request, response.clone());
          });
        })
        .catch(console.log);
      // prioritize cached response over network
      return cachedResponse || networkFetch;
    })
  );
});
