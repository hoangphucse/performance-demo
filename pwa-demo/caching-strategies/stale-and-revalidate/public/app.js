window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('#reload').addEventListener('click', (event) => {
    location.reload();
  });
  document.querySelector('#check').addEventListener('click', checkColor);

  registerSW();
  loadColor();
});

// Registers a service worker
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      // Change the service worker URL to see what happens when the SW doesn't exist
      const registration = await navigator.serviceWorker.register('sw.js');
    } catch (error) {
      showResult('Error while registering: ' + error.message);
    }
  } else {
    showResult('Service workers API not available');
  }
}

async function loadColor() {
  const response = await fetch('/color.json');
  const value = await response.json();
  document.querySelector('#box').style.backgroundColor = value;
  console.log({ value });
  showResult('Color: ' + value);
}

async function checkColor() {
  const cache = await caches.open('pwa-assets');
  const result = await cache.match('/color.json');
  if (result) {
    const value = await result.json();
    showResult('Cached Color: ' + value);
  } else {
    showResult('No cached color available');
  }
}

function showResult(text) {
  document.querySelector('output').innerHTML = text;
}
