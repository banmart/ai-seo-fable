/* Aged Domain Lookup API
   Free data sources, no API keys:
   - RDAP (rdap.org): registration/expiry dates, registrar, status
   - Wayback CDX API: archive history, gaps, past page titles
   - Google DNS-over-HTTPS: current resolution state
   Results cached in-memory for 24h; rate-limited per IP. */

export const runtime = 'nodejs';

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = 10; // requests per IP per hour
const cache = new Map();
const rateBuckets = new Map();

const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i;

function rateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip)?.filter((t) => now - t < 60 * 60 * 1000) ?? [];
  if (bucket.length >= RATE_LIMIT) return true;
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  return false;
}

async function fetchJson(url, timeoutMs = 8000) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { 'User-Agent': 'GobiyaAgedDomainLookup/1.0 (+https://www.gobiya.com/tools/aged-domain-lookup)' },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function getRdap(domain) {
  try {
    const data = await fetchJson(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
    const events = Object.fromEntries((data.events ?? []).map((e) => [e.eventAction, e.eventDate]));
    const registrar = (data.entities ?? []).find((e) => (e.roles ?? []).includes('registrar'));
    const registrarName = registrar?.vcardArray?.[1]?.find((f) => f[0] === 'fn')?.[3] ?? null;
    return {
      registered: events.registration ?? null,
      expires: events.expiration ?? null,
      lastChanged: events['last changed'] ?? null,
      registrar: registrarName,
      status: data.status ?? [],
    };
  } catch {
    return null;
  }
}

async function getWayback(domain) {
  try {
    // One row per year: timestamp + page title-ish original URL; collapse keeps payload small
    const rows = await fetchJson(
      `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(domain)}&output=json&fl=timestamp,statuscode&filter=statuscode:200&collapse=timestamp:4&limit=100`,
      12000
    );
    const entries = rows.slice(1); // drop header row
    if (entries.length === 0) return { firstSnapshot: null, years: [], gapYears: [] };
    const years = entries.map((r) => Number(r[0].slice(0, 4)));
    const first = Math.min(...years);
    const last = Math.max(...years);
    const gapYears = [];
    for (let y = first; y <= last; y++) if (!years.includes(y)) gapYears.push(y);
    return {
      firstSnapshot: String(entries[0][0]),
      years,
      gapYears,
    };
  } catch {
    return null;
  }
}

async function getDns(domain) {
  try {
    const data = await fetchJson(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`);
    return { resolves: Boolean(data.Answer?.length), records: data.Answer?.length ?? 0 };
  } catch {
    return null;
  }
}

function buildVerdict({ rdap, wayback, dns }) {
  const flags = [];
  const now = Date.now();

  let ageYears = null;
  let ageSource = null;
  if (rdap?.registered) {
    ageYears = (now - Date.parse(rdap.registered)) / (365.25 * 24 * 3600 * 1000);
    ageSource = 'rdap';
    if (ageYears >= 10) flags.push({ level: 'ok', text: `AGED — REGISTERED ${ageYears.toFixed(1)}Y AGO` });
    else if (ageYears >= 3) flags.push({ level: 'ok', text: `ESTABLISHED — ${ageYears.toFixed(1)}Y OLD` });
    else flags.push({ level: 'warn', text: `YOUNG DOMAIN — ${ageYears.toFixed(1)}Y OLD` });
  } else if (wayback?.firstSnapshot) {
    // RDAP unavailable — first archive crawl gives a lower bound on age
    ageYears = (now - Date.parse(
      `${wayback.firstSnapshot.slice(0, 4)}-${wayback.firstSnapshot.slice(4, 6)}-${wayback.firstSnapshot.slice(6, 8)}`
    )) / (365.25 * 24 * 3600 * 1000);
    ageSource = 'archive';
    flags.push({ level: 'ok', text: `AGE ≥ ${ageYears.toFixed(1)}Y — FROM FIRST ARCHIVE CRAWL (RDAP UNAVAILABLE)` });
  } else {
    flags.push({ level: 'warn', text: 'REGISTRATION DATE UNAVAILABLE (RDAP)' });
  }

  if (wayback) {
    if (!wayback.firstSnapshot) {
      flags.push({ level: 'warn', text: 'NO ARCHIVE HISTORY — NEVER CRAWLED OR ALWAYS BLOCKED' });
    } else {
      const archiveYears = new Set(wayback.years).size;
      flags.push({ level: 'ok', text: `ARCHIVE HISTORY — ${archiveYears} YEAR(S) OF SNAPSHOTS` });
      if (wayback.gapYears.length >= 2)
        flags.push({ level: 'risk', text: `HISTORY GAPS — DARK IN ${wayback.gapYears.join(', ')} (POSSIBLE DROP/REPURPOSE)` });
    }
  }

  if (dns) {
    flags.push(dns.resolves
      ? { level: 'ok', text: 'DNS — RESOLVING' }
      : { level: 'warn', text: 'DNS — NOT RESOLVING (PARKED OR DROPPED)' });
  }

  if (rdap?.status?.some((s) => /hold|redemption|pending delete/i.test(s)))
    flags.push({ level: 'risk', text: `REGISTRY STATUS — ${rdap.status.join(', ').toUpperCase()}` });

  const risks = flags.filter((f) => f.level === 'risk').length;
  const verdict = risks > 0 ? 'CAUTION — HISTORY REQUIRES MANUAL REVIEW'
    : ageYears !== null && ageYears >= 3 ? 'CLEAN AGED PROFILE — NO AUTOMATED RED FLAGS'
    : 'LOW SIGNAL — LIMITED HISTORY TO EVALUATE';

  return { flags, verdict, ageYears: ageYears === null ? null : Number(ageYears.toFixed(1)), ageSource };
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (rateLimited(ip)) {
    return Response.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 });
  }

  let domain;
  try {
    const body = await request.json();
    domain = String(body.domain ?? '')
      .trim().toLowerCase()
      .replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!DOMAIN_RE.test(domain)) {
    return Response.json({ error: 'Enter a valid domain, e.g. example.com' }, { status: 400 });
  }

  const cached = cache.get(domain);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return Response.json(cached.data);
  }

  const [rdap, wayback, dns] = await Promise.all([getRdap(domain), getWayback(domain), getDns(domain)]);
  if (!rdap && !wayback && !dns) {
    return Response.json({ error: 'All lookup sources failed. Try again shortly.' }, { status: 502 });
  }

  const data = { domain, rdap, wayback, dns, ...buildVerdict({ rdap, wayback, dns }) };
  // Only cache complete results — a transient RDAP/Wayback failure shouldn't stick for 24h
  if (rdap && wayback) cache.set(domain, { at: Date.now(), data });
  return Response.json(data);
}
