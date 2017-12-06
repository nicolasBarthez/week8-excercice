"use strict";

function setOfCachedUrls(e) { return e.keys().then(function(e) { return e.map(function(e) { return e.url }) }).then(function(e) { return new Set(e) }) }
var precacheConfig = [
        ["index.html", "96a902affc7dd3403c6b3e0255f1fa34"],
        ["service-worker.js", "b7b2b028ba6463c1f678c2aba1e01d3d"],
        ["static/css/app.0aee091630f8f4cb3b1ba0e8eea3c135.css", "f499c23193bd0cae9f9f995da6db5c97"],
        ["static/css/emojify.css", "0d4c3db641f7db57799b95d2f934267a"],
        ["static/css/style.css", "a8391f6ac55cc78f674f4141b1509077"],
        ["static/js/app.de82078f1d5fd25b351e.js", "6a7c2f334955012d37cc851986e66ed3"],
        ["static/js/manifest.5fdb6a16c8f454f52072.js", "60e6217fbdd83e8484e278985b28a6e1"],
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