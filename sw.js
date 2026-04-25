const CACHE_NAME = 'mood-diary-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;600;700&family=Nunito:wght@400;500;600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Удаляем старые кэши
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // API запросы к Apps Script — всегда через сеть, не кэшируем
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  // Nominatim геолокация — через сеть
  if (event.request.url.includes('nominatim.openstreetmap.org')) {
    return;
  }
  // Остальное — cache first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
