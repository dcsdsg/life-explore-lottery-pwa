const CACHE_NAME = "life-explore-pwa-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event=>{
  event.waitUntil(
    caches.keys()
      // Keep independent apps on this origin (including city-quests) untouched.
      .then(keys=>Promise.all(keys.filter(key=>/^life-explore-pwa-v\d+$/.test(key) && key !== CACHE_NAME).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", event=>{
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  // Only handle this app's shell. Nested pages own their own offline cache.
  const ownPaths = APP_SHELL.map(file=>new URL(file, self.registration.scope).pathname);
  if (!ownPaths.includes(url.pathname)) return;

  if (event.request.mode === "navigate"){
    event.respondWith(
      fetch(event.request)
        .then(response=>{
          if (response.ok){
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache=>cache.put("./index.html", copy));
          }
          return response;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>cached || fetch(event.request).then(response=>{
      if (response.ok){
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
