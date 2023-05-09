const BASE_ASSET_CACHE_NAME = 'base-asset';

const CACHED_RESOURCES = [
  '/pwa-demo/my-cached-demo/index.html',
  '/pwa-demo/my-cached-demo/style.css',
  '/pwa-demo/my-cached-demo/app.js',
  '/pwa-demo/my-cached-demo/fonts/OpenSans-VariableFont_wdth,wght.ttf',
];

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  // event.waitUntil(
  //   caches
  //     .open(BASE_ASSET_CACHE_NAME)
  //     .then((cache) =>
  //       cache.addAll([...CACHED_RESOURCES]).catch((e) => console.log(e))
  //     )
  // );
});
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log(`URL requested: ${event.request.url}`);
  if (event.request.url.includes('/todos/123')) {
    console.log('asdasd');
    const options = {
      status: 200,
      headers: {
        'Content-type': 'text/html',
      },
    };
    const htmlResponse = new Response(
      JSON.stringify({
        msg: 'iloveyou',
      }),
      options
    );
    event.respondWith(Promise.resolve(htmlResponse));
  }
});

//  add fetch event
// self.addEventListener('fetch', (event) => {
//   console.log('Run fetch');
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // caches.match() always resolves
//       // but in case of success response will have value
//       if (response !== undefined) {
//         return response;
//       } else {
//         return fetch(event.request).then((response) => {
//           // response may be used only once
//           // we need to save clone to put one copy in cache
//           // and serve second one
//           let responseClone = response.clone();

//           caches.open(BASE_ASSET_CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseClone);
//           });
//           return response;
//         });
//       }
//     })
//   );
// });

// Global search on all caches in the current origin
// caches.match(urlOrRequest).then(response => {
//   console.log(response ? response : "It's not in the cache");
// });

// // Cache-specific search
// caches.open("pwa-assets").then(cache => {
//  cache.match(urlOrRequest).then(response) {
//    console.log(response ? response : "It's not in the cache");
//  }
// });
