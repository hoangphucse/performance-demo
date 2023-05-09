window.addEventListener('DOMContentLoaded', async (event) => {
  registrationWS();
  mountEvent();
});

const registrationWS = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('ws.js');
  } else {
    console.error('Service worker API not available !');
  }
};

const unRegistrationWS = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const result = await registration.unregister();
        result
          ? console.log('Service worker has been unregistered !')
          : console.error('Service worker could not be unregistered !');
      } else {
        console.log('There is no service worker to unregister !');
      }
    } catch (error) {
      console.error('Error while unregistering: ' + error.message);
    }
  } else {
    console.error('Service worker API not available !');
  }
};

// Handle delete all cached

const deleteAllCached = () => {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      caches.delete(cacheName);
    });
  });

  console.log('Delete successfully !');
};

// register event

const mountEvent = () => {
  // Unregister button
  const unregisterBtn = document.getElementById('unregister');
  if (unregisterBtn) {
    unregisterBtn.addEventListener('click', unRegistrationWS);
  }

  //   fetch todo btn
  const fetchtodoBtn = document.getElementById('fetch-todo-btn');
  if (fetchtodoBtn) {
    fetchtodoBtn.addEventListener('click', getData);
  }
  // Delete all cached button
  const deleteAllCachedBtn = document.getElementById('delete-all-cached');
  if (deleteAllCachedBtn) {
    deleteAllCachedBtn.addEventListener('click', deleteAllCached);
  }
};

// Interact with caches on main thread

const getTodoId = () => {
  const todoInputEle = document.querySelector('#todoId');
  return todoInputEle ? todoInputEle.value : 0;
};

// fetch data
// async function fetchData(url) {
//   const response = await fetch(url);
//   const jsonData = await response.json();
//   console.log(jsonData);
//   return jsonData;
// }

let cacheVersion = 1;
let oldTodoId = 0;
async function getDataWithCached() {
  const todoId = getTodoId();

  if (!todoId) return;

  if (oldTodoId !== todoId) {
    oldTodoId = todoId;
    cacheVersion++;
  }

  const cacheName = `myapp-${cacheVersion}`;
  const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`;
  let cachedData = await getCachedData(cacheName, url);

  if (cachedData) {
    console.log('Retrieved cached data');
    console.log({ cachedData });
    return cachedData;
  }

  console.log('Fetching fresh data');
  const cacheStorage = await caches.open(cacheName);
  await cacheStorage.add(url);

  cachedData = await getCachedData(cacheName, url);
  await deleteOldCaches(cacheName);
  console.log({ cachedData });
  return cachedData;
}

async function getData() {
  const todoId = getTodoId();

  if (!todoId) return;

  const cacheName = `myapp-${cacheVersion}`;
  const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`;

  const result = await fetch(url);
  const data = await result.json();
  console.log(data);
}

// Get data from the cache.
async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
}

// Delete any old caches to respect user's disk space.
async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();

  for (const key of keys) {
    const isOurCache = key.startsWith('myapp-');
    if (currentCache === key || !isOurCache) {
      continue;
    }
    caches.delete(key);
  }
}
