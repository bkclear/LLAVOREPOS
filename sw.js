// Define a cache name
const CACHE_NAME = 'llavorepos-cache-v2'; // Changed to v2 to ensure it updates

// List the files to cache with correct paths
const urlsToCache = [
  '/LLAVOREPOS/',
  '/LLAVOREPOS/index.html',
  '/LLAVOREPOS/style.css',   // Make sure your CSS file is named style.css
  '/LLAVOREPOS/script.js',  // Make sure your JS file is named script.js
  '/LLAVOREPOS/icons/icon-192x192.png',
  '/LLAVOREPOS/icons/icon-512x512.png'
];

// Install event: open a cache and add the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
