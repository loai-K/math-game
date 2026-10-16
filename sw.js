const CACHE = 'math-islands-v1';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/style.css',
  'assets/script.js',
  'assets/qrcode.js',
  'assets/icon.svg',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/favicon-32.png',
  'assets/apple-touch-icon.png'
];
// Nice to have offline, but never worth failing the install over.
const EXTRAS = ['assets/sound.mp3'];
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;700;800&display=swap';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(async cache => {
        await cache.addAll(CORE);
        await Promise.all([...EXTRAS.map(url => cache.add(url)), precacheFonts(cache)].map(p => p.catch(() => {})));
      })
      .then(() => self.skipWaiting())
  );
});

// The first visit loads the font before this worker controls the page, so
// fetch the stylesheet and the font files it points to here.
async function precacheFonts(cache) {
  const res = await fetch(FONT_CSS);
  if (!res.ok) return;
  const urls = (await res.clone().text()).match(/https:\/\/fonts\.gstatic\.com\/[^)'"\s]+/g) || [];
  await cache.put(FONT_CSS, res);
  await Promise.all([...new Set(urls)].map(url => cache.add(url)));
}

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = /^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !fonts) return;
  if (fonts) event.respondWith(cacheFirst(req));
  else event.respondWith(url.pathname.endsWith('.mp3') ? music(req) : networkFirst(req));
});

// Game files: always take the newest copy when online, so edits and replaced
// files show up on the next reload; the cache is only the offline fallback.
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req, { cache: 'no-cache' });
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    if (cached) return cached;
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
  return res;
}

// Audio elements ask for byte ranges, which the Cache API can't answer on its
// own, so fetch the whole file (cached copy when offline) and slice it here.
async function music(req) {
  const cache = await caches.open(CACHE);
  let res;
  try {
    res = await fetch(req.url, { cache: 'no-cache' });
    if (res.status !== 200) return res;
    await cache.put(req.url, res.clone());
  } catch (err) {
    res = await cache.match(req.url);
    if (!res) throw err;
  }
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!range) return res;
  const data = await res.arrayBuffer();
  const size = data.byteLength;
  const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
  const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
  return new Response(data.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes'
    }
  });
}
