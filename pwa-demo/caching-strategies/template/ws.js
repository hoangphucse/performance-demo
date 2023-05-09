const CACHE_STORAGE = 'demo-cache';
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  self.clients.claim();
});
