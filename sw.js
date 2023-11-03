// URL for fallback page
const fallbackPage = './fallback.html';

// Install Service Worker here
self.addEventListener('install', event => {
    console.log('Service Worker has been installed');
});

const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';

const assets = [
    './assets/AppImages/android/android-launchericon-48-48.png',
    './assets/AppImages/android/android-launchericon-72-72.png',
    './assets/AppImages/android/android-launchericon-96-96.png',
    './fallback.html'
]

// Activate Service Worker
// This code runs when the service worker is activated
self.addEventListener('activate', event => {
    // This code runs when the service worker is activated
    event.waitUntil(
        // Retrieve all cache names from the cahe storage
        staticCacheName.keys().then(keys => {
            // Create a promise that waits for all cache deletion promises to complete
            return Promise.all(keys
                // Filter out cache names that are not equal to staticCacheName
                .filter(key => key !== staticCacheName)
                // Deleting caches asynchronically || Create an array of promises to delete the filtered cache names
                .map(key => staticCacheName.delete(key)))
        }),
        caches.open(staticCacheName).then((cache) => {
            //Cache er åben
            cache.addAll(assets);
        })

    )
});

// Fetch event
self.addEventListener('fetch', event => {
    // Control response on request
    event.respondWith(
        // Checks if a cached response exists for a given request
        /* This approach helps optimize web application performance by serving cached content when available 
            while also keeping the cache up-to-date with the latest network responses */
		caches.match(event.request).then(cacheResponse => {
			// Return match from cache. If there is a cached response, it is returned directly to the client
            // or in case no cached response is available we fetch from the server
			return cacheResponse || fetch(event.request).then(fetchResponse => {
				// The following code caches the fetched response
				return caches.open(dynamicCacheName).then(cache => {
                    // Storing the fetched response in the dynamic cache
					cache.put(event.request.url, fetchResponse.clone())
					// Returnerer fetch request
                    limitCacheSize(dynamicCacheName, 20)
					return fetchResponse;
				});
			}).catch(() => {
                // If the network request fails, serve the fallback page
                if(event.request.url.indexOf('.html') > -1) {
                    return caches.match(fallbackPage)
                }
            })
		})
    )
})


// Defining a function that takes two parameters:
// 'cacheName' (the name of the cache) and 'numberOfAllowedFiles' (the maximum number of files allowed in the cache)
const limitCacheSize = (cacheName, numberOfAllowedFiles) => {
	// Open the specified cache using 'caches.open' and create a promise
	caches.open(cacheName).then(cache => {
		// Retrieve all keys from the cache
		cache.keys().then(keys => {
            // Check if the number of cached files exceeds the allowed limit
			if(keys.length > numberOfAllowedFiles) {
                // Delete the oldest file in the cache and run the function until the limit is reached
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numberOfAllowedFiles))
			}
		})
	})
}