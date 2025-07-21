const CACHE_NAME = 'llavorepos-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/sw.js',
  // Add other assets if needed, like:
  // '/styles.css',
  // '/script.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/index.html'); // fallback
    })
  );
});
