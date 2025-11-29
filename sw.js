const CACHE_NAME = 'pentaridex-v7-6-cache';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  '[https://unpkg.com/react@18.2.0/umd/react.production.min.js](https://unpkg.com/react@18.2.0/umd/react.production.min.js)',
  '[https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js](https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js)',
  '[https://unpkg.com/history@5.3.0/umd/history.production.min.js](https://unpkg.com/history@5.3.0/umd/history.production.min.js)',
  '[https://unpkg.com/react-router@6.3.0/umd/react-router.production.min.js](https://unpkg.com/react-router@6.3.0/umd/react-router.production.min.js)',
  '[https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.production.min.js](https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.production.min.js)',
  '[https://unpkg.com/@babel/standalone/babel.min.js](https://unpkg.com/@babel/standalone/babel.min.js)',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://unpkg.com/lucide@latest](https://unpkg.com/lucide@latest)',
  '[https://unpkg.com/leaflet@1.9.4/dist/leaflet.css](https://unpkg.com/leaflet@1.9.4/dist/leaflet.css)',
  '[https://unpkg.com/leaflet@1.9.4/dist/leaflet.js](https://unpkg.com/leaflet@1.9.4/dist/leaflet.js)',
  '[https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js](https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js)',
  '[https://unpkg.com/html5-qrcode](https://unpkg.com/html5-qrcode)'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Assets
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

// Update Service Worker
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