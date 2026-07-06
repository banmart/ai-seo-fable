/* Shared server-side toolkit for the diagnostic tools.
   No API keys — everything is derived from public signals a browser can fetch.
   Underscore-prefixed folder so Next.js does not treat it as a route. */

const RATE_LIMIT = 10; // requests per IP per hour
const rateBuckets = new Map();

/* Buckets are keyed per tool + IP so heavy use of one tool doesn't burn
   another tool's quota. */
export function rateLimited(ip, limit = RATE_LIMIT, scope = 'shared', windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const key = `${scope}:${ip}`;
  const bucket = rateBuckets.get(key)?.filter((t) => now - t < windowMs) ?? [];
  if (bucket.length >= limit) return true;
  bucket.push(now);
  rateBuckets.set(key, bucket);
  return false;
}

export function clientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
}

/* Simple TTL cache keyed by string. Each tool gets its own instance. */
export function createCache(ttlMs = 24 * 60 * 60 * 1000) {
  const store = new Map();
  return {
    get(key) {
      const hit = store.get(key);
      if (hit && Date.now() - hit.at < ttlMs) return hit.data;
      return null;
    },
    set(key, data) { store.set(key, { at: Date.now(), data }); },
  };
}

const HOST_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i;

/* SSRF guard: reject IP literals (public DNS names only) and internal-only
   hostnames so the tools can't be pointed at cloud metadata or the LAN. */
export function isPublicHost(hostname) {
  const h = hostname.toLowerCase().replace(/\.$/, '');
  if (!HOST_RE.test(h)) return false;                       // also rejects bare "localhost", IPv6
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(h)) return false;      // IPv4 literal
  if (/\.(localhost|local|internal|home|lan|corp|intranet)$/.test(h)) return false;
  return true;
}

/* Accept a bare domain, a domain+path, or a full URL. Returns a normalized
   { url, host, origin } or null if the host isn't a valid public domain. */
export function normalizeTarget(raw) {
  let input = String(raw ?? '').trim();
  if (!input) return null;
  if (!/^https?:\/\//i.test(input)) input = `https://${input}`;
  let u;
  try {
    u = new URL(input);
  } catch {
    return null;
  }
  if (!isPublicHost(u.hostname)) return null;
  const host = u.hostname.replace(/^www\./, '');
  return { url: u.href, host, origin: u.origin };
}

const UA = 'GobiyaSiteDiagnostics/1.0 (+https://www.gobiya.com/tools)';

const MAX_REDIRECTS = 5;
const MAX_BODY_BYTES = 3 * 1024 * 1024; // plenty for HTML/robots/sitemaps

/* Follow redirects manually so every hop is re-checked against the SSRF
   guard — a public site must not be able to bounce us to an internal IP. */
export async function fetchText(url, timeoutMs = 10000) {
  let current = url;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const u = new URL(current);
    if (!isPublicHost(u.hostname)) throw new Error('blocked host');
    const res = await fetch(current, {
      signal: AbortSignal.timeout(timeoutMs),
      redirect: 'manual',
      headers: { 'User-Agent': UA },
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (!loc) return { ok: false, status: res.status, finalUrl: current, headers: res.headers, text: '' };
      current = new URL(loc, current).href;
      continue;
    }
    let text = '';
    if (res.ok) {
      text = await res.text();
      if (text.length > MAX_BODY_BYTES) text = text.slice(0, MAX_BODY_BYTES);
    }
    return { ok: res.ok, status: res.status, finalUrl: current, headers: res.headers, text };
  }
  throw new Error('too many redirects');
}

/* Strip a URL's path for robots.txt Disallow matching. */
export function pathOf(url) {
  try { return new URL(url).pathname || '/'; } catch { return '/'; }
}

/* Extract visible text length from raw HTML (what a non-JS crawler reads). */
export function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Collect every JSON-LD block. Returns { blocks: [parsed], types: Set, errors: n }. */
export function extractJsonLd(html) {
  const blocks = [];
  const types = new Set();
  let errors = 0;
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1].trim());
      blocks.push(parsed);
      const walk = (node) => {
        if (Array.isArray(node)) return node.forEach(walk);
        if (node && typeof node === 'object') {
          const t = node['@type'];
          if (t) (Array.isArray(t) ? t : [t]).forEach((x) => types.add(x));
          Object.values(node).forEach(walk);
        }
      };
      walk(parsed);
    } catch {
      errors += 1;
    }
  }
  return { blocks, types: [...types], errors };
}

/* Flatten a JSON-LD graph into a list of top-level entity nodes. */
export function jsonLdNodes(blocks) {
  const nodes = [];
  const push = (n) => { if (n && typeof n === 'object' && n['@type']) nodes.push(n); };
  for (const b of blocks) {
    if (Array.isArray(b)) b.forEach(push);
    else if (b && b['@graph']) (Array.isArray(b['@graph']) ? b['@graph'] : []).forEach(push);
    else push(b);
  }
  return nodes;
}

/* Standard verdict/score from graded flags. risk = -25, warn = -10. */
export function scoreFlags(flags) {
  const risks = flags.filter((f) => f.level === 'risk').length;
  const warns = flags.filter((f) => f.level === 'warn').length;
  return Math.max(0, 100 - risks * 25 - warns * 10);
}
