const CACHE_NAME = 'vibeboard-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192.png',
  '/icon-512.png',
  // Add all your sound files here:
  '/sounds/gehaald.mp3',
  '/sounds/plopperdeplop.mp3',
  '/sounds/hallowki.mp3',
  '/sounds/toenplots.mp3',
  '/sounds/luiheeftaids.mp3',
  '/sounds/ikrookeenpijp.mp3',
  '/sounds/eruit.mp3',
  '/sounds/behalvelui.mp3',
  '/sounds/dommerik.mp3',
  '/sounds/seksmetsmal.mp3',
  '/sounds/klus!.mp3',
  '/sounds/geenaids.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});