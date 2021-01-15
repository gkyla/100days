// Config
const CACHE_NAME = 'gigit-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/js/main.js',
  '/img/img1.jpg',
  '/img/img2.jpg',
];

// Install SW & Chace
self.addEventListener('install', (e) => {
  console.log('Installing...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((chace) => {
      return chace.addAll(CACHE_ASSETS);
    })
  );
});

// Controling browser fetch
self.addEventListener('fetch', (e) => {
  console.log('Fetch...');
  e.respondWith(
    caches.match(e.request).then((response) => {
      // If the response match, use the cache assets
      if (response) {
        console.log('ServiceWorker: Use cache asset from : ', response.url);
        return response;
      }

      // If the assets is not available, fetch the request
      console.log('ServiceWorker: Load asset from the server:');
      return fetch(e.request.url);
    })
  );
});
