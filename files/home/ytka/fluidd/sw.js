try{self["workbox:core:7.2.0"]&&_()}catch{}const $=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},G=$;class h extends Error{constructor(e,t){const n=G(e,t);super(n),this.name=e,this.details=t}}const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},U=s=>[f.prefix,s,f.suffix].filter(e=>e&&e.length>0).join("-"),V=s=>{for(const e of Object.keys(f))s(e)},C={updateDetails:s=>{V(e=>{typeof s[e]=="string"&&(f[e]=s[e])})},getGoogleAnalyticsName:s=>s||U(f.googleAnalytics),getPrecacheName:s=>s||U(f.precache),getPrefix:()=>f.prefix,getRuntimeName:s=>s||U(f.runtime),getSuffix:()=>f.suffix};function N(s,e){const t=e();return s.waitUntil(t),t}try{self["workbox:precaching:7.2.0"]&&_()}catch{}const Q="__WB_REVISION__";function z(s){if(!s)throw new h("add-to-cache-list-unexpected-type",{entry:s});if(typeof s=="string"){const a=new URL(s,location.href);return{cacheKey:a.href,url:a.href}}const{revision:e,url:t}=s;if(!t)throw new h("add-to-cache-list-unexpected-type",{entry:s});if(!e){const a=new URL(t,location.href);return{cacheKey:a.href,url:a.href}}const n=new URL(t,location.href),r=new URL(t,location.href);return n.searchParams.set(Q,e),{cacheKey:n.href,url:r.href}}class J{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:n})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const r=t.originalRequest.url;n?this.notUpdatedURLs.push(r):this.updatedURLs.push(r)}return n}}}class X{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:n})=>{const r=(n==null?void 0:n.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return r?new Request(r,{headers:t.headers}):t},this._precacheController=e}}let y;function Y(){if(y===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),y=!0}catch{y=!1}y=!1}return y}async function Z(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new h("cross-origin-copy-response",{origin:t});const n=s.clone(),a={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},c=Y()?n.body:await n.blob();return new Response(c,a)}const ee=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function M(s,e){const t=new URL(s);for(const n of e)t.searchParams.delete(n);return t.href}async function te(s,e,t,n){const r=M(e.url,t);if(e.url===r)return s.match(e,n);const a=Object.assign(Object.assign({},n),{ignoreSearch:!0}),c=await s.keys(e,a);for(const i of c){const o=M(i.url,t);if(r===o)return s.match(i,n)}}class se{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const ne=new Set;async function re(){for(const s of ne)await s()}function ae(s){return new Promise(e=>setTimeout(e,s))}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function R(s){return typeof s=="string"?new Request(s):s}class ce{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new se,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const n of this._plugins)this._pluginStateMap.set(n,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let n=R(e);if(n.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const c=await t.preloadResponse;if(c)return c}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const c of this.iterateCallbacks("requestWillFetch"))n=await c({request:n.clone(),event:t})}catch(c){if(c instanceof Error)throw new h("plugin-error-request-will-fetch",{thrownErrorMessage:c.message})}const a=n.clone();try{let c;c=await fetch(n,n.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))c=await i({event:t,request:a,response:c});return c}catch(c){throw r&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:r.clone(),request:a.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),n=t.clone();return this.waitUntil(this.cachePut(e,n)),t}async cacheMatch(e){const t=R(e);let n;const{cacheName:r,matchOptions:a}=this._strategy,c=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:r});n=await caches.match(c,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))n=await o({cacheName:r,matchOptions:a,cachedResponse:n,request:c,event:this.event})||void 0;return n}async cachePut(e,t){const n=R(e);await ae(0);const r=await this.getCacheKey(n,"write");if(!t)throw new h("cache-put-with-no-response",{url:ee(r.url)});const a=await this._ensureResponseSafeToCache(t);if(!a)return!1;const{cacheName:c,matchOptions:i}=this._strategy,o=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),g=l?await te(o,r.clone(),["__WB_REVISION__"],i):null;try{await o.put(r,l?a.clone():a)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await re(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:c,oldResponse:g,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const n=`${e.url} | ${t}`;if(!this._cacheKeys[n]){let r=e;for(const a of this.iterateCallbacks("cacheKeyWillBeUsed"))r=R(await a({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[n]=r}return this._cacheKeys[n]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const n of this.iterateCallbacks(e))await n(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const n=this._pluginStateMap.get(t);yield a=>{const c=Object.assign(Object.assign({},a),{state:n});return t[e](c)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,n=!1;for(const r of this.iterateCallbacks("cacheWillUpdate"))if(t=await r({request:this.request,response:t,event:this.event})||void 0,n=!0,!t)break;return n||t&&t.status!==200&&(t=void 0),t}}class W{constructor(e={}){this.cacheName=C.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,n=typeof e.request=="string"?new Request(e.request):e.request,r="params"in e?e.params:void 0,a=new ce(this,{event:t,request:n,params:r}),c=this._getResponse(a,n,t),i=this._awaitComplete(c,a,n,t);return[c,i]}async _getResponse(e,t,n){await e.runCallbacks("handlerWillStart",{event:n,request:t});let r;try{if(r=await this._handle(t,e),!r||r.type==="error")throw new h("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(const c of e.iterateCallbacks("handlerDidError"))if(r=await c({error:a,event:n,request:t}),r)break}if(!r)throw a}for(const a of e.iterateCallbacks("handlerWillRespond"))r=await a({event:n,request:t,response:r});return r}async _awaitComplete(e,t,n,r){let a,c;try{a=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:r,request:n,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(c=i)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:n,response:a,error:c}),t.destroy(),c)throw c}}class d extends W{constructor(e={}){e.cacheName=C.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const n=await t.cacheMatch(e);return n||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let n;const r=t.params||{};if(this._fallbackToNetwork){const a=r.integrity,c=e.integrity,i=!c||c===a;n=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?c||a:void 0})),a&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,n.clone()))}else throw new h("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const n=await t.fetch(e);if(!await t.cachePut(e,n.clone()))throw new h("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[n,r]of this.plugins.entries())r!==d.copyRedirectedCacheableResponsesPlugin&&(r===d.defaultPrecacheCacheabilityPlugin&&(e=n),r.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await Z(s):s}};class ie{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:n=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:C.getPrecacheName(e),plugins:[...t,new X({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const n of e){typeof n=="string"?t.push(n):n&&n.revision===void 0&&t.push(n.url);const{cacheKey:r,url:a}=z(n),c=typeof n!="string"&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==r)throw new h("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:r});if(typeof n!="string"&&n.integrity){if(this._cacheKeysToIntegrities.has(r)&&this._cacheKeysToIntegrities.get(r)!==n.integrity)throw new h("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(r,n.integrity)}if(this._urlsToCacheKeys.set(a,r),this._urlsToCacheModes.set(a,c),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return N(e,async()=>{const t=new J;this.strategy.plugins.push(t);for(const[a,c]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(c),o=this._urlsToCacheModes.get(a),l=new Request(a,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:c},request:l,event:e}))}const{updatedURLs:n,notUpdatedURLs:r}=t;return{updatedURLs:n,notUpdatedURLs:r}})}activate(e){return N(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),n=await t.keys(),r=new Set(this._urlsToCacheKeys.values()),a=[];for(const c of n)r.has(c.url)||(await t.delete(c),a.push(c.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n)return(await self.caches.open(this.strategy.cacheName)).match(n)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new h("non-precached-url",{url:e});return n=>(n.request=new Request(e),n.params=Object.assign({cacheKey:t},n.params),this.strategy.handle(n))}}let L;const v=()=>(L||(L=new ie),L);try{self["workbox:routing:7.2.0"]&&_()}catch{}const B="GET",b=s=>s&&typeof s=="object"?s:{handle:s};class p{constructor(e,t,n=B){this.handler=b(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=b(e)}}class oe extends p{constructor(e,t,n){const r=({url:a})=>{const c=e.exec(a.href);if(c&&!(a.origin!==location.origin&&c.index!==0))return c.slice(1)};super(r,t,n)}}class le{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,n=Promise.all(t.urlsToCache.map(r=>{typeof r=="string"&&(r=[r]);const a=new Request(...r);return this.handleRequest({request:a,event:e})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const r=n.origin===location.origin,{params:a,route:c}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:n});let i=c&&c.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let l;try{l=i.handle({url:n,request:e,event:t,params:a})}catch(u){l=Promise.reject(u)}const g=c&&c.catchHandler;return l instanceof Promise&&(this._catchHandler||g)&&(l=l.catch(async u=>{if(g)try{return await g.handle({url:n,request:e,event:t,params:a})}catch(D){D instanceof Error&&(u=D)}if(this._catchHandler)return this._catchHandler.handle({url:n,request:e,event:t});throw u})),l}findMatchingRoute({url:e,sameOrigin:t,request:n,event:r}){const a=this._routes.get(n.method)||[];for(const c of a){let i;const o=c.match({url:e,sameOrigin:t,request:n,event:r});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:c,params:i}}return{}}setDefaultHandler(e,t=B){this._defaultHandlerMap.set(t,b(e))}setCatchHandler(e){this._catchHandler=b(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new h("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new h("unregister-route-route-not-registered")}}let w;const he=()=>(w||(w=new le,w.addFetchListener(),w.addCacheListener()),w);function E(s,e,t){let n;if(typeof s=="string"){const a=new URL(s,location.href),c=({url:i})=>i.href===a.href;n=new p(c,e,t)}else if(s instanceof RegExp)n=new oe(s,e,t);else if(typeof s=="function")n=new p(s,e,t);else if(s instanceof p)n=s;else throw new h("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return he().registerRoute(n),n}function ue(s,e=[]){for(const t of[...s.searchParams.keys()])e.some(n=>n.test(t))&&s.searchParams.delete(t);return s}function*fe(s,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const a=new URL(s,location.href);a.hash="",yield a.href;const c=ue(a,e);if(yield c.href,t&&c.pathname.endsWith("/")){const i=new URL(c.href);i.pathname+=t,yield i.href}if(n){const i=new URL(c.href);i.pathname+=".html",yield i.href}if(r){const i=r({url:a});for(const o of i)yield o.href}}class de extends p{constructor(e,t){const n=({request:r})=>{const a=e.getURLsToCacheKeys();for(const c of fe(r.url,t)){const i=a.get(c);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(n,e.strategy)}}function pe(s){const e=v(),t=new de(e,s);E(t)}const ge="-precache-",ye=async(s,e=ge)=>{const n=(await self.caches.keys()).filter(r=>r.includes(e)&&r.includes(self.registration.scope)&&r!==s);return await Promise.all(n.map(r=>self.caches.delete(r))),n};function we(){self.addEventListener("activate",s=>{const e=C.getPrecacheName();s.waitUntil(ye(e).then(t=>{}))})}function me(s){return v().createHandlerBoundToURL(s)}function Re(s){v().precache(s)}function be(s,e){Re(s),pe(e)}class Ce extends p{constructor(e,{allowlist:t=[/./],denylist:n=[]}={}){super(r=>this._match(r),e),this._allowlist=t,this._denylist=n}_match({url:e,request:t}){if(t&&t.mode!=="navigate")return!1;const n=e.pathname+e.search;for(const r of this._denylist)if(r.test(n))return!1;return!!this._allowlist.some(r=>r.test(n))}}const _e={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};class Ue extends W{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(_e)}async _handle(e,t){const n=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(n);let r=await t.cacheMatch(e),a;if(!r)try{r=await n}catch(c){c instanceof Error&&(a=c)}if(!r)throw new h("no-response",{url:e.url,error:a});return r}}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch{}const Le=(s,e)=>e.some(t=>s instanceof t);let O,S;function ke(){return O||(O=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pe(){return S||(S=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const j=new WeakMap,T=new WeakMap,F=new WeakMap,k=new WeakMap,x=new WeakMap;function Ie(s){const e=new Promise((t,n)=>{const r=()=>{s.removeEventListener("success",a),s.removeEventListener("error",c)},a=()=>{t(m(s.result)),r()},c=()=>{n(s.error),r()};s.addEventListener("success",a),s.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&j.set(t,s)}).catch(()=>{}),x.set(e,s),e}function Te(s){if(T.has(s))return;const e=new Promise((t,n)=>{const r=()=>{s.removeEventListener("complete",a),s.removeEventListener("error",c),s.removeEventListener("abort",c)},a=()=>{t(),r()},c=()=>{n(s.error||new DOMException("AbortError","AbortError")),r()};s.addEventListener("complete",a),s.addEventListener("error",c),s.addEventListener("abort",c)});T.set(s,e)}let K={get(s,e,t){if(s instanceof IDBTransaction){if(e==="done")return T.get(s);if(e==="objectStoreNames")return s.objectStoreNames||F.get(s);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return m(s[e])},set(s,e,t){return s[e]=t,!0},has(s,e){return s instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in s}};function Ke(s){K=s(K)}function ve(s){return s===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=s.call(P(this),e,...t);return F.set(n,e.sort?e.sort():[e]),m(n)}:Pe().includes(s)?function(...e){return s.apply(P(this),e),m(j.get(this))}:function(...e){return m(s.apply(P(this),e))}}function Ee(s){return typeof s=="function"?ve(s):(s instanceof IDBTransaction&&Te(s),Le(s,ke())?new Proxy(s,K):s)}function m(s){if(s instanceof IDBRequest)return Ie(s);if(k.has(s))return k.get(s);const e=Ee(s);return e!==s&&(k.set(s,e),x.set(e,s)),e}const P=s=>x.get(s),xe=["get","getKey","getAll","getAllKeys","count"],De=["put","add","delete","clear"],I=new Map;function A(s,e){if(!(s instanceof IDBDatabase&&!(e in s)&&typeof e=="string"))return;if(I.get(e))return I.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,r=De.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(r||xe.includes(t)))return;const a=async function(c,...i){const o=this.transaction(c,r?"readwrite":"readonly");let l=o.store;return n&&(l=l.index(i.shift())),(await Promise.all([l[t](...i),r&&o.done]))[0]};return I.set(e,a),a}Ke(s=>({...s,get:(e,t,n)=>A(e,t)||s.get(e,t,n),has:(e,t)=>!!A(e,t)||s.has(e,t)}));try{self["workbox:expiration:7.2.0"]&&_()}catch{}try{self["workbox:recipes:7.2.0"]&&_()}catch{}function Ne(s){self.addEventListener("install",e=>{const t=s.urls.map(n=>s.strategy.handleAll({event:e,request:new Request(n)})[1]);e.waitUntil(Promise.all(t))})}self.addEventListener("message",s=>{s.data&&s.data.type==="SKIP_WAITING"&&self.skipWaiting()});be([{"revision":null,"url":"assets/af-B7tmR8zz.js"},{"revision":null,"url":"assets/ar-D8jgiXiO.js"},{"revision":null,"url":"assets/codicon-DCmgc-ay.ttf"},{"revision":null,"url":"assets/cs-C5qHYNqo.js"},{"revision":null,"url":"assets/css-fOVBx6Gk.js"},{"revision":null,"url":"assets/cssMode-Bi-2im_n.js"},{"revision":null,"url":"assets/de-ITSnK09x.js"},{"revision":null,"url":"assets/DeviceCamera-DBXb_jN8.js"},{"revision":null,"url":"assets/es-LicLIJbo.js"},{"revision":null,"url":"assets/fr-DWFYP5Ct.js"},{"revision":null,"url":"assets/gcode.tmLanguage-CxxTzjZ-.js"},{"revision":null,"url":"assets/HlsstreamCamera--vmcDxkd.js"},{"revision":null,"url":"assets/hu-Cw2sJJ3O.js"},{"revision":null,"url":"assets/IframeCamera-Dxtm4uM8.js"},{"revision":null,"url":"assets/index-BRUCRNop.css"},{"revision":null,"url":"assets/index-DFslUFkS.js"},{"revision":null,"url":"assets/IpstreamCamera-D1Ss1b4z.js"},{"revision":null,"url":"assets/it-DCuJnOpP.js"},{"revision":null,"url":"assets/ja-ZjrfT5Qd.js"},{"revision":null,"url":"assets/jsonMode-pxjipCbm.js"},{"revision":null,"url":"assets/klipper-config.tmLanguage-DHe00u4k.js"},{"revision":null,"url":"assets/ko-C5tJ747g.js"},{"revision":null,"url":"assets/log.tmLanguage-DH-qwE--.js"},{"revision":null,"url":"assets/markdown-DuPmBnHi.js"},{"revision":null,"url":"assets/MjpegstreamerAdaptiveCamera-eNsE6oZs.js"},{"revision":null,"url":"assets/MjpegstreamerCamera-DiUnVu5B.js"},{"revision":null,"url":"assets/nl-CguAxyMk.js"},{"revision":null,"url":"assets/onigasm-kQxuTr47.wasm"},{"revision":null,"url":"assets/parseGcode.worker-6CAfnbH7.js"},{"revision":null,"url":"assets/pl-BJcyvNl5.js"},{"revision":null,"url":"assets/pt_BR-DOMUTqMQ.js"},{"revision":null,"url":"assets/pt--ULNyXef.js"},{"revision":null,"url":"assets/qr-scanner-worker.min-D85Z9gVD.js"},{"revision":null,"url":"assets/raleway-cyrillic-400-normal-_3x-kIQx.woff"},{"revision":null,"url":"assets/raleway-cyrillic-400-normal-5e4zmbXM.woff2"},{"revision":null,"url":"assets/raleway-cyrillic-ext-400-normal-Ce31ewm7.woff"},{"revision":null,"url":"assets/raleway-cyrillic-ext-400-normal-zbv6uFvq.woff2"},{"revision":null,"url":"assets/raleway-latin-400-normal-2IY77EiR.woff2"},{"revision":null,"url":"assets/raleway-latin-400-normal-CCdtiDxY.woff"},{"revision":null,"url":"assets/raleway-latin-ext-400-normal-Bo7RAUwH.woff"},{"revision":null,"url":"assets/raleway-latin-ext-400-normal-BPsnCyNw.woff2"},{"revision":null,"url":"assets/raleway-vietnamese-400-normal-CTw6K1Xj.woff2"},{"revision":null,"url":"assets/raleway-vietnamese-400-normal-Dnv8EMCX.woff"},{"revision":null,"url":"assets/roboto-cyrillic-300-normal-Dg7J0kAT.woff"},{"revision":null,"url":"assets/roboto-cyrillic-300-normal-DJfICpyc.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-400-normal-BiRJyiea.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-400-normal-JN0iKxGs.woff"},{"revision":null,"url":"assets/roboto-cyrillic-500-normal-_hamcpv8.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-500-normal-YnJLGrUm.woff"},{"revision":null,"url":"assets/roboto-cyrillic-700-normal-BJaAVvFw.woff"},{"revision":null,"url":"assets/roboto-cyrillic-700-normal-jruQITdB.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-300-normal-BLLmCegk.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-300-normal-Chhwl1Jq.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-400-normal-b0JluIOJ.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-400-normal-D76n7Daw.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-500-normal-37WQE4S0.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-500-normal-BJvL3D7h.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-700-normal-CyZgh00P.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-700-normal-DXzexxfu.woff"},{"revision":null,"url":"assets/roboto-greek-300-normal-Bx8edVml.woff2"},{"revision":null,"url":"assets/roboto-greek-300-normal-D3gN5oZ1.woff"},{"revision":null,"url":"assets/roboto-greek-400-normal-IIc_WWwF.woff"},{"revision":null,"url":"assets/roboto-greek-400-normal-LPh2sqOm.woff2"},{"revision":null,"url":"assets/roboto-greek-500-normal-Bg8BLohm.woff2"},{"revision":null,"url":"assets/roboto-greek-500-normal-CdRewbqV.woff"},{"revision":null,"url":"assets/roboto-greek-700-normal-1IZ-NEfb.woff"},{"revision":null,"url":"assets/roboto-greek-700-normal-Bs05n1ZH.woff2"},{"revision":null,"url":"assets/roboto-latin-300-normal-BizgZZ3y.woff2"},{"revision":null,"url":"assets/roboto-latin-300-normal-BZ6gvbSO.woff"},{"revision":null,"url":"assets/roboto-latin-400-normal-BVyCgWwA.woff"},{"revision":null,"url":"assets/roboto-latin-400-normal-DXyFPIdK.woff2"},{"revision":null,"url":"assets/roboto-latin-500-normal-C6iW8rdg.woff2"},{"revision":null,"url":"assets/roboto-latin-500-normal-rpP1_v3s.woff"},{"revision":null,"url":"assets/roboto-latin-700-normal-BWcFiwQV.woff"},{"revision":null,"url":"assets/roboto-latin-700-normal-CbYYDfWS.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-300-normal-BzRVPTS2.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-300-normal-Djx841zm.woff"},{"revision":null,"url":"assets/roboto-latin-ext-400-normal-BSFkPfbf.woff"},{"revision":null,"url":"assets/roboto-latin-ext-400-normal-DgXbz5gU.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-500-normal-DvHxAkTn.woff"},{"revision":null,"url":"assets/roboto-latin-ext-500-normal-OQJhyaXd.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-700-normal-Ba-CAIIA.woff"},{"revision":null,"url":"assets/roboto-latin-ext-700-normal-DchBbzVz.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-300-normal-CAomnZLO.woff"},{"revision":null,"url":"assets/roboto-vietnamese-300-normal-PZa9KE_J.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-400-normal-D5pJwT9g.woff"},{"revision":null,"url":"assets/roboto-vietnamese-400-normal-DhTUfTw_.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-500-normal-LvuCHq7y.woff"},{"revision":null,"url":"assets/roboto-vietnamese-500-normal-p0V0BAAE.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-700-normal-B4Nagvlm.woff"},{"revision":null,"url":"assets/roboto-vietnamese-700-normal-CBbheh0s.woff2"},{"revision":null,"url":"assets/ru-CwWgM7Fq.js"},{"revision":null,"url":"assets/setupMonaco-COqcKI7b.js"},{"revision":null,"url":"assets/setupMonaco-DhU765Eg.css"},{"revision":null,"url":"assets/setupMonaco-DyX1CsEw.css"},{"revision":null,"url":"assets/setupMonaco.features-MWj1z0Nx.js"},{"revision":null,"url":"assets/sl-CMt3vT9G.js"},{"revision":null,"url":"assets/tr-QHQfAf9F.js"},{"revision":null,"url":"assets/uk-CEjhvAHl.js"},{"revision":null,"url":"assets/virtual_pwa-register-2WlJ9few.js"},{"revision":null,"url":"assets/vue-echarts-chunk-Cx_3MGTX.js"},{"revision":null,"url":"assets/WebrtcCamerastreamerCamera-4qiUXL3R.js"},{"revision":null,"url":"assets/WebrtcGo2RtcCamera-RXSkAPLz.js"},{"revision":null,"url":"assets/WebrtcMediamtxCamera-B-jM5Zke.js"},{"revision":null,"url":"assets/workbox-window.prod.es5-B9K5rw8f.js"},{"revision":null,"url":"assets/zh-CN-C44FMo2U.js"},{"revision":null,"url":"assets/zh-HK-DTpiQJ3C.js"},{"revision":"49cd01adf5c03c8fcba6f1726b448ee2","url":"index.html"},{"revision":"7b652b0e9e76b7475b62063b04b7161b","url":"monacoeditorwork/css.worker.bundle.js"},{"revision":"de7a55ee8d457a7a8975e1f318d54e3c","url":"monacoeditorwork/editor.worker.bundle.js"},{"revision":"c1ef45de3ecfcb4080eb192774386cf5","url":"monacoeditorwork/json.worker.bundle.js"},{"revision":"3bb20e2e2531f1d718ff39721bb93034","url":"editor.theme.json"},{"revision":"80ae0fbdf558c18f367ffcc02e3d8347","url":"favicon.ico"},{"revision":"3beae0267c3a29319cffa7ab09abdfde","url":"logo_annex.svg"},{"revision":"74e672677715e4840f22be046a144303","url":"logo_btt.svg"},{"revision":"48cd4739378f66f5b4cffd3655b16af5","url":"logo_eva.svg"},{"revision":"c19ef86d3647286b474e3ab4f4f22c07","url":"logo_fluidd.svg"},{"revision":"b9d7dc20763cb79efe987c33df23e232","url":"logo_hevort.svg"},{"revision":"2e592ea44568b5865fe29374352241f6","url":"logo_kingroon.svg"},{"revision":"9f102036941e2b688c3bcfc8d1ab74e8","url":"logo_klipper.svg"},{"revision":"f5c47f9e5d2bec2c3223d010e8b7c688","url":"logo_ldo.svg"},{"revision":"8aadda17536cc808a53ce83b4909fba5","url":"logo_mellow.svg"},{"revision":"c2bf33fe7a1c0039f21449459f78fd0e","url":"logo_peopoly.svg"},{"revision":"ce1d698dd08db7006064e231ea76bf97","url":"logo_prusa.svg"},{"revision":"0d06e11bc4388b77f5dc7646c741f81e","url":"logo_qidi.svg"},{"revision":"a3c3a13b525e0de1c8d65641808a7fed","url":"logo_ratrig.svg"},{"revision":"6f7f330be9f99d5876b8ed7d9e9ec637","url":"logo_siboor.svg"},{"revision":"a117c9fec7308a0b903fb586afd24fc5","url":"logo_snakeoil.svg"},{"revision":"fdb5c8c4e93f071adbd9c84ce40e812b","url":"logo_voron.svg"},{"revision":"b8f98afe9c9c4be7fd75c6693c870aea","url":"logo_vzbot.svg"},{"revision":"347a31155d0db7eccbc12b3c5e419bd0","url":"logo_zerog.svg"},{"revision":"6ea1e9fde2682dd8d0d1ea08f6624e9f","url":"img/icons/android-chrome-192x192.png"},{"revision":"db3b74c0e8a1fec2025f202d28f612f9","url":"img/icons/android-chrome-512x512.png"},{"revision":"b355fe6957e72037f1bc6fb3bad3a78d","url":"img/icons/android-chrome-maskable-192x192.png"},{"revision":"a351c8d619180fe28d1b9ae02b3d9066","url":"img/icons/android-chrome-maskable-512x512.png"},{"revision":"ec48f367f52f03862cee7cec3d01ad07","url":"img/icons/apple-touch-icon-120x120.png"},{"revision":"bc8f75876a747950735260adc634a81b","url":"img/icons/apple-touch-icon-152x152.png"},{"revision":"23e6410e45ff58896d23b4f4ef4514bd","url":"img/icons/apple-touch-icon-180x180.png"},{"revision":"27ab6d467f78011d71362fb060a98cf9","url":"img/icons/apple-touch-icon-60x60.png"},{"revision":"4af08cd1f1e8ad8b510a8b79847d1b5a","url":"img/icons/apple-touch-icon-76x76.png"},{"revision":"23e6410e45ff58896d23b4f4ef4514bd","url":"img/icons/apple-touch-icon.png"},{"revision":"d5ad46f18f3207b4073c1f8e734302d7","url":"img/icons/favicon-16x16.png"},{"revision":"3de1cf2d2204e73c6c5a622749f0f2f4","url":"img/icons/favicon-32x32.png"},{"revision":"80ae0fbdf558c18f367ffcc02e3d8347","url":"img/icons/favicon.ico"},{"revision":"4cc0223d744bd99a649837825b82c06e","url":"img/icons/msapplication-icon-144x144.png"},{"revision":"98c08c8393ca7732e4916440e52ae08f","url":"img/icons/mstile-150x150.png"},{"revision":"46e22970a62e18a71bc1039cdeab1d59","url":"img/icons/safari-pinned-tab.svg"},{"revision":"603dcda2c2942700dcec8b8e9aad766c","url":"img/icons/shortcut-configuration-96x96.png"},{"revision":"808c09c0275277dbc4d9dc43429221ac","url":"img/icons/shortcut-settings-96x96.png"},{"revision":"1f812c07e68e2d6adc8b9cca761bd331","url":"manifest.webmanifest"}]);we();const H=new URL("config.json",self.location.href).pathname,q=new Ue({cacheName:"config",fetchOptions:{cache:"no-cache"}});Ne({urls:[H],strategy:q});E(H,q,"GET");const Me=[/\/websocket/,/\/(printer|api|access|machine|server)\//,/\/webcam[2-4]?\//],Oe=void 0;E(new Ce(me("index.html"),{allowlist:Oe,denylist:Me}));
