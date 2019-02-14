console.log('hello swwss')

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './',
  './manifest.json',
  './index.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('push', function(event) {
  const msg = event.data.text();
  const title = 'Push Codelab';
  const options = {
    body: msg,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };
  self.registration.showNotification(title, options);
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        if (event && event.request && event.request.url) {
          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.add(event.request);
          })
        }
        return fetch(event.request);
      }
    )
  );
});