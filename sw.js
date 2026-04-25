const CACHE_NAME = 'mood-diary-v2';
const urlsToCache = [
  './',
  './?resource=index.html',
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;600;700&family=Nunito:wght@400;500;600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
