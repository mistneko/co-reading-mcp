/* Mitlesen — service worker（本地补丁，照 Anklang 配方裁小）。
   IMPORTANT: 前端每次改动都要 bump CACHE + reader.html 里 register("sw.js?v=…")，
   否则装了的客户端一直用旧壳（CF zone 4h 缓存陷阱的防线）。
   只预缓存公开图标类资产；/api /sse /mcp /messages 一律不拦。 */
/* ==== BEAUTIFY-2026-07 · 设计系统桌面批 · start ==== */
const CACHE = "mitlesen-v4";
/* ==== BEAUTIFY-2026-07 · 设计系统桌面批 · end ==== */
const PRECACHE = ["/icon-192.png", "/icon-512.png", "/apple-touch-icon.png", "/favicon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.pathname === "/mcp" || url.pathname === "/sse" || url.pathname === "/messages" ||
      url.pathname.startsWith("/api/")) return;          // 动态面永不拦
  if (PRECACHE.includes(url.pathname)) {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
  }
  // 其余（reader.html/css/js）走网络——阅读进度是活数据，不做离线壳
});
