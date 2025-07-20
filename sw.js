// Define a cache name
const CACHE_NAME = 'llavorepos-cache-v3'; // Using v3 to force an update

// List the ONLY files we need to cache
const urlsToCache = [
  '/LLAVOREPOS/',
  '/LLAVOREPOS/index.html',
  '/LLAVOREPOS/icons/icon-192x192.png',
  '/LLAVOREPOS/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
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
