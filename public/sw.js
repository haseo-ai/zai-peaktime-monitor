const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `zai-monitor-${CACHE_VERSION}`;

// 캐시할 정적 에셋 목록
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/zai-logo.png',
  '/i18n.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// API 요청 패턴
const API_PATTERN = /\/api\//;

// Service Worker 설치 이벤트
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Skip waiting on install');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Install failed:', error);
      })
  );
});

// Service Worker 활성화 이벤트
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// 네트워크 요청 처리
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // API 요청은 network-first 전략
  if (API_PATTERN.test(url.pathname)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 응답이 성공적이면 캐시에 저장
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              })
              .catch(error => {
                console.warn('[SW] Failed to cache API response:', error);
              });
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패 시 캐시에서 시도
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // 정적 에셋은 cache-first 전략
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('[SW] Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('[SW] Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // 정적 에셋이면 캐시에 저장
            if (response.status === 200 && shouldCache(event.request)) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                })
                .catch(error => {
                  console.warn('[SW] Failed to cache static asset:', error);
                });
            }
            return response;
          });
      })
  );
});

// 캐싱해야 할 요청인지 확인
function shouldCache(request) {
  const url = new URL(request.url);
  
  // 같은 origin에서만 캐싱
  if (url.origin !== self.location.origin) {
    return false;
  }
  
  // 이미지, CSS, JS, SVG, 글꼴 등 정적 리소스만 캐싱
  const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.json', '.woff', '.woff2'];
  return extensions.some(ext => url.pathname.endsWith(ext)) || 
         url.pathname === '/' || 
         url.pathname === '/index.html';
}

// 오프라인 폴백
self.addEventListener('fetch', event => {
  // 이미 위에서 처리된 요청은 무시
  if (event.response) return;
  
  // 네트워크 실패 시 오프라인 페이지 제공
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/');
        })
    );
  }
});