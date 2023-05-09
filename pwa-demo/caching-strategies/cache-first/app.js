// Cache First
// Searches for a cached response first and falls back to the network if one isn't found.

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

const deleteAllCached = () => {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      caches.delete(cacheName);
    });
  });

  console.log('Delete successfully !');
};

// ========================================

const getTodoId = () => {
  const todoInputEle = document.querySelector('#todoId');
  return todoInputEle ? todoInputEle.value : 0;
};

async function getData() {
  const todoId = getTodoId();

  if (!todoId) return;
  const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`;

  const res = await axios.get(url);

  // const result = await fetch(url);
  // const data = await result.json();
  console.log(res.data);
}

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
