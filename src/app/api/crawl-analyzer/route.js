/* Index & Crawl Analyzer API
   Inspects robots.txt and the XML sitemap(s) to surface crawlability and
   index-budget problems: missing/blocked sitemap, sitemap not declared in
   robots, oversized sitemaps, and homepage indexability. No API keys. */

import {
  rateLimited, clientIp, createCache, normalizeTarget, fetchText,
} from '../_lib/toolkit';

export const runtime = 'nodejs';

const cache = createCache();
const MAX_CHILD_SITEMAPS = 5; // bound outbound requests

function parseRobots(text) {
  const sitemaps = [];
  const disallowAllStar = [];
  let inStar = false;
  let hasStarGroup = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const val = m[2].trim();
    if (field === 'sitemap') sitemaps.push(val);
    else if (field === 'user-agent') { inStar = val === '*'; if (inStar) hasStarGroup = true; }
    else if (inStar && field === 'disallow' && val === '/') disallowAllStar.push(val);
  }
  return { sitemaps, blocksAll: disallowAllStar.length > 0, hasStarGroup };
}

function countLocs(xml) {
  return (xml.match(/<loc>/gi) ?? []).length;
}

async function analyzeSitemap(origin, robotsSitemaps) {
  // Prefer sitemaps declared in robots; fall back to /sitemap.xml
  const candidates = robotsSitemaps.length ? robotsSitemaps : [`${origin}/sitemap.xml`];
  const primary = candidates[0];
  let res;
  try {
    res = await fetchText(primary, 10000);
  } catch {
    return { exists: false, url: primary };
  }
  if (!res.ok) return { exists: false, url: primary, status: res.status };

  const xml = res.text;
  const isIndex = /<sitemapindex[\s>]/i.test(xml);
  const hasLastmod = /<lastmod>/i.test(xml);

  if (!isIndex) {
    const urls = countLocs(xml);
    return { exists: true, url: res.finalUrl, type: 'urlset', urls, childCount: 0, hasLastmod, sampledAll: true };
  }

  // Sitemap index — sum a bounded sample of children
  const childUrls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
  const sample = childUrls.slice(0, MAX_CHILD_SITEMAPS);
  let urls = 0;
  let lastmodSeen = hasLastmod;
  await Promise.all(sample.map(async (u) => {
    try {
      const child = await fetchText(u, 8000);
      if (child.ok) {
        urls += countLocs(child.text);
        if (/<lastmod>/i.test(child.text)) lastmodSeen = true;
      }
    } catch { /* skip unreachable child */ }
  }));
  return {
    exists: true, url: res.finalUrl, type: 'index',
    childCount: childUrls.length, sampledChildren: sample.length,
    urls, hasLastmod: lastmodSeen, sampledAll: childUrls.length <= MAX_CHILD_SITEMAPS,
  };
}

async function homepageIndexable(origin) {
  try {
    const res = await fetchText(origin, 10000);
    if (!res.ok) return null;
    const meta = (res.text.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? '').toLowerCase();
    const header = (res.headers.get('x-robots-tag') ?? '').toLowerCase();
    return { noindex: /noindex/.test(meta) || /noindex/.test(header) };
  } catch {
    return null;
  }
}

function buildVerdict({ robots, sitemap, home }) {
  const flags = [];
  const issues = [];
  const add = (level, text) => flags.push({ level, text });
  const issue = (level, title, detail) => issues.push({ level, title, detail });

  // robots.txt
  if (!robots.exists) {
    add('warn', 'NO ROBOTS.TXT');
    issue('warn', 'No robots.txt', "Without a robots.txt, crawlers get no guidance and can't find your sitemap via it. Add one that allows crawling and declares your sitemap.");
  } else if (robots.blocksAll) {
    add('risk', 'ROBOTS.TXT BLOCKS ALL CRAWLERS');
    issue('risk', 'robots.txt disallows the entire site', "A `Disallow: /` under `User-agent: *` blocks crawlers from your whole site. If this is production, it's catastrophic — remove the rule immediately.");
  } else {
    add('ok', 'ROBOTS.TXT — PRESENT & NOT BLOCKING');
  }

  // sitemap
  if (!sitemap.exists) {
    add('risk', 'NO XML SITEMAP');
    issue('risk', 'No XML sitemap found', "No sitemap at the declared location or /sitemap.xml. Search engines can still crawl links, but a sitemap is how you ensure every important URL is discovered — especially deep or new pages. Generate and submit one.");
  } else {
    add('ok', `SITEMAP — ${sitemap.type === 'index' ? 'INDEX' : 'URLSET'} FOUND`);

    if (robots.exists && !robots.sitemaps.length) {
      add('warn', 'SITEMAP NOT DECLARED IN ROBOTS.TXT');
      issue('warn', 'Sitemap not referenced in robots.txt', 'Adding a `Sitemap:` line to robots.txt helps every search engine discover it, including ones you never manually submit to. Add it.');
    }

    if (!sitemap.hasLastmod) {
      add('warn', 'SITEMAP MISSING <lastmod>');
      issue('warn', 'Sitemap has no <lastmod> dates', 'Without <lastmod>, crawlers can\'t tell which pages changed and may waste crawl budget re-checking stale URLs or ignore fresh ones. Add accurate lastmod values.');
    }

    if (sitemap.urls > 50000 || (sitemap.type === 'urlset' && sitemap.urls > 50000)) {
      add('risk', `SITEMAP OVERSIZED — ${sitemap.urls.toLocaleString()} URLS`);
      issue('risk', 'Sitemap exceeds the 50,000-URL limit', 'A single sitemap file is capped at 50,000 URLs. Split it into multiple sitemaps under a sitemap index, or the overflow won\'t be read.');
    }

    if (sitemap.type === 'index' && !sitemap.sampledAll) {
      issue('warn', `Large sitemap index — ${sitemap.childCount} child sitemaps`, `This scan sampled the first ${sitemap.sampledChildren} of ${sitemap.childCount} child sitemaps (~${sitemap.urls.toLocaleString()} URLs in the sample). At this scale, index bloat and thin programmatic pages are the usual risk — audit which sections actually earn their crawl budget.`);
      add('warn', `LARGE SITEMAP INDEX — ${sitemap.childCount} CHILDREN`);
    }
  }

  // homepage indexability
  if (home?.noindex) {
    add('risk', 'HOMEPAGE SET TO NOINDEX');
    issue('risk', 'Homepage is noindex', 'Your homepage carries a noindex directive — it will be dropped from search entirely. This is almost always a mistake left over from staging. Remove it now.');
  } else if (home) {
    add('ok', 'HOMEPAGE — INDEXABLE');
  }

  const risks = flags.filter((f) => f.level === 'risk').length;
  const warns = flags.filter((f) => f.level === 'warn').length;
  const score = Math.max(0, 100 - risks * 25 - warns * 10);
  const verdict = risks > 0 ? 'CRAWL/INDEX BLOCKERS FOUND — PAGES MAY NEVER BE INDEXED'
    : warns > 0 ? 'CRAWLABLE — BUT INDEX-BUDGET GAPS REMAIN'
    : 'CRAWL & INDEX SIGNALS — CLEAN';

  issues.sort((a, b) => (a.level === 'risk' ? 0 : 1) - (b.level === 'risk' ? 0 : 1));
  return { flags, issues, score, verdict };
}

export async function POST(request) {
  if (rateLimited(clientIp(request), 10, 'crawl-analyzer')) {
    return Response.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 });
  }

  let target;
  try {
    const body = await request.json();
    target = normalizeTarget(body.url);
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!target) return Response.json({ error: 'Enter a valid domain, e.g. example.com' }, { status: 400 });

  const cacheKey = target.origin;
  const cached = cache.get(cacheKey);
  if (cached) return Response.json(cached);

  // robots.txt first (it may declare the sitemap location)
  let robots = { exists: false, sitemaps: [], blocksAll: false };
  try {
    const r = await fetchText(`${target.origin}/robots.txt`, 8000);
    if (r.ok && !/<html/i.test(r.text.slice(0, 200))) robots = { exists: true, ...parseRobots(r.text) };
  } catch { /* robots optional */ }

  const [sitemap, home] = await Promise.all([
    analyzeSitemap(target.origin, robots.sitemaps ?? []),
    homepageIndexable(target.origin),
  ]);

  if (!robots.exists && !sitemap.exists && !home) {
    return Response.json({ error: 'Site unreachable. Check the domain and try again.' }, { status: 502 });
  }

  const result = {
    host: target.host,
    robots: { exists: robots.exists, sitemaps: robots.sitemaps ?? [], blocksAll: robots.blocksAll },
    sitemap,
    ...buildVerdict({ robots, sitemap, home }),
  };
  cache.set(cacheKey, result);
  return Response.json(result);
}
