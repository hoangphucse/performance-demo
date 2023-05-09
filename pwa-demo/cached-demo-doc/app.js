window.addEventListener('DOMContentLoaded', async (event) => {
  document.querySelector('#single').addEventListener('click', cacheSingleFile);
  document
    .querySelector('#multiple')
    .addEventListener('click', cacheMultipleFiles);
  document.querySelector('#delete').addEventListener('click', deleteCache);
});

// Add one URL to the cache
async function cacheSingleFile() {
  const cacheName = document.querySelector('#cacheName').value;
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      await cache.add('dummy.json');
      showResult('dummy.json was cached on ' + cacheName);
    } catch (error) {
      showResult('Error while caching a single file');
    }
  } else {
    showResult('Cache Storage not available');
  }
}

// Add multuple URL to the cache
async function cacheMultipleFiles() {
  const cacheName = document.querySelector('#cacheName').value;
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      const urlsToCache = [
        './',
        'dummy.css',
        'dummy.html',
        'dummy.json',
        'https://cdn.glitch.me/606fe2ae-f386-47d3-9892-c6d18ca17998%2F9b775a52-d700-4208-84e9-18578ee75266_icon.jpeg?v=1637764108088',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      ];
      await cache.addAll(urlsToCache);
      showResult(urlsToCache.length + ' files were cached on ' + cacheName);
    } catch (error) {
      showResult('Error while caching multiple files. ' + error.message);
    }
  } else {
    showResult('Cache Storage not available');
  }
}

async function deleteCache() {
  const cacheName = document.querySelector('#cacheName').value;
  if ('caches' in window) {
    await caches.delete(cacheName);
    showResult(cacheName + ' cache was deleted');
  } else {
    showResult('Cache Storage not available');
  }
}

function showResult(text) {
  document.querySelector('output').innerHTML = text;
}
