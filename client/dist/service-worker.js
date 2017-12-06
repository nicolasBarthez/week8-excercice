"use strict";
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
var precacheConfig = [
    ["index.html", "40a009eb8a94052ddbcefaba35977cb1"],
    ["service-worker.js", "114eb79ef68c4bb5e16af793a549a42a"],
    [
      "static/css/app.b341889fed4f54e1d100f35048c9ef3a.css",
      "7da160edab263c8e4e422b449bebc581"
    ],
    ["static/css/emojify.css", "0d4c3db641f7db57799b95d2f934267a"],
    ["static/css/style.css", "29c3377b24a95c9ec78580a83fa7e6e3"],
    [
      "static/js/app.6ad67a3962c693b122ca.js",
      "627eea910e1eefa0a78303cdbdc4df44"
    ],
    [
      "static/js/manifest.4de603898a7da9b8cb70.js",
      "a987ad9dad7249a2b720deb95e3424a9"
    ],
    [
      "static/js/vendor.65114f1a7a24ab69b0f4.js",
      "736cee1d11f5382158e2862a8af6143e"
    ]
  ],
  cacheName =
    "sw-precache-v3-insiders-" +
    (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString();
  },
  cleanResponse = function(e) {
    return e.redirected
      ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
          return new Response(t, {
            headers: e.headers,
            status: e.status,
            statusText: e.statusText
          });
        })
      : Promise.resolve(e);
  },
  createCacheKey = function(e, t, n, r) {
    var a = new URL(e);
    return (
      (r && a.pathname.match(r)) ||
        (a.search +=
          (a.search ? "&" : "") +
          encodeURIComponent(t) +
          "=" +
          encodeURIComponent(n)),
      a.toString()
    );
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function(e) {
      return n.match(e);
    });
  },
  stripIgnoredUrlParameters = function(e, t) {
    var n = new URL(e);
    return (
      (n.hash = ""),
      (n.search = n.search
        .slice(1)
        .split("&")
        .map(function(e) {
          return e.split("=");
        })
        .filter(function(e) {
          return t.every(function(t) {
            return !t.test(e[0]);
          });
        })
        .map(function(e) {
          return e.join("=");
        })
        .join("&")),
      n.toString()
    );
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var t = e[0],
        n = e[1],
        r = new URL(t, self.location),
        a = createCacheKey(r, hashParamName, n, !1);
      return [r.toString(), a];
    })
  );
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(e) {
        return setOfCachedUrls(e).then(function(t) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(n) {
              if (!t.has(n)) {
                var r = new Request(n, { credentials: "same-origin" });
                return fetch(r).then(function(t) {
                  if (!t.ok)
                    throw new Error(
                      "Request for " +
                        n +
                        " returned a response with status " +
                        t.status
                    );
                  return cleanResponse(t).then(function(t) {
                    return e.put(n, t);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener("activate", function(e) {
    var t = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(e) {
          return e.keys().then(function(n) {
            return Promise.all(
              n.map(function(n) {
                if (!t.has(n.url)) return e.delete(n);
              })
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener("fetch", function(e) {
    if ("GET" === e.request.method) {
      var t,
        n = stripIgnoredUrlParameters(
          e.request.url,
          ignoreUrlParametersMatching
        );
      (t = urlsToCacheKeys.has(n)) ||
        ((n = addDirectoryIndex(n, "index.html")),
        (t = urlsToCacheKeys.has(n)));
      t &&
        e.respondWith(
          caches
            .open(cacheName)
            .then(function(e) {
              return e.match(urlsToCacheKeys.get(n)).then(function(e) {
                if (e) return e;
                throw Error(
                  "The cached response that was expected is missing."
                );
              });
            })
            .catch(function(t) {
              return (
                console.warn(
                  'Couldn\'t serve response for "%s" from cache: %O',
                  e.request.url,
                  t
                ),
                fetch(e.request)
              );
            })
        );
    }
  });
