"use strict";

function setOfCachedUrls(e) { return e.keys().then(function(e) { return e.map(function(e) { return e.url }) }).then(function(e) { return new Set(e) }) }
var precacheConfig = [
        ["index.html", "22861b243c3f3e60e01d075201e0973c"],
        ["service-worker.js", "5b5a2d863f9bff518996b98510c4dca0"],
        ["static/css/app.be77ddebd05bddb922da72412c242d49.css", "a65aa75f83bf7e0db561aa6234f3fb79"],
        ["static/css/emojify.css", "0d4c3db641f7db57799b95d2f934267a"],
        ["static/css/style.css", "8e5c16518ff3caad09c98d238e629bc6"],
        ["static/js/app.8b594e3e0358d636b060.js", "f5a993f447c8d8ee1e1878283ffe09cd"],
        ["static/js/manifest.974c6ed600919dec1697.js", "fb9c954b34cbd77367bfa645bd98f7d8"],
        ["static/js/vendor.65114f1a7a24ab69b0f4.js", "736cee1d11f5382158e2862a8af6143e"]
    ],
    cacheName = "sw-precache-v3-insiders-" + (self.registration ? self.registration.scope : ""),
    ignoreUrlParametersMatching = [/^utm_/],
    addDirectoryIndex = function(e, t) { var n = new URL(e); return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString() },
    cleanResponse = function(e) { return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) { return new Response(t, { headers: e.headers, status: e.status, statusText: e.statusText }) }) : Promise.resolve(e) },
    createCacheKey = function(e, t, n, r) { var a = new URL(e); return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString() },
    isPathWhitelisted = function(e, t) { if (0 === e.length) return !0; var n = new URL(t).pathname; return e.some(function(e) { return n.match(e) }) },
    stripIgnoredUrlParameters = function(e, t) { var n = new URL(e); return n.hash = "", n.search = n.search.slice(1).split("&").map(function(e) { return e.split("=") }).filter(function(e) { return t.every(function(t) { return !t.test(e[0]) }) }).map(function(e) { return e.join("=") }).join("&"), n.toString() },
    hashParamName = "_sw-precache",
    urlsToCacheKeys = new Map(precacheConfig.map(function(e) { var t = e[0],
            n = e[1],
            r = new URL(t, self.location),
            a = createCacheKey(r, hashParamName, n, !1); return [r.toString(), a] }));
self.addEventListener("install", function(e) { e.waitUntil(caches.open(cacheName).then(function(e) { return setOfCachedUrls(e).then(function(t) { return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n) { if (!t.has(n)) { var r = new Request(n, { credentials: "same-origin" }); return fetch(r).then(function(t) { if (!t.ok) throw new Error("Request for " + n + " returned a response with status " + t.status); return cleanResponse(t).then(function(t) { return e.put(n, t) }) }) } })) }) }).then(function() { return self.skipWaiting() })) }), self.addEventListener("activate", function(e) { var t = new Set(urlsToCacheKeys.values());
    e.waitUntil(caches.open(cacheName).then(function(e) { return e.keys().then(function(n) { return Promise.all(n.map(function(n) { if (!t.has(n.url)) return e.delete(n) })) }) }).then(function() { return self.clients.claim() })) }), self.addEventListener("fetch", function(e) { if ("GET" === e.request.method) { var t, n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
        (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, "index.html"), t = urlsToCacheKeys.has(n));
        t && e.respondWith(caches.open(cacheName).then(function(e) { return e.match(urlsToCacheKeys.get(n)).then(function(e) { if (e) return e; throw Error("The cached response that was expected is missing.") }) }).catch(function(t) { return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request) })) } });