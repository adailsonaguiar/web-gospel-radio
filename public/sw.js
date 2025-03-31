const CACHE_NAME = 'my_cache'
self.addEventListener('install', (event) => {
    console.log('Install service worker...')

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['/index.html']).then(() => self.skipWaiting())
        })
    )
})