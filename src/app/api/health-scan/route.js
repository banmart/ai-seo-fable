/* Website Health Scan API
   Fetches a page + its robots.txt and grades the on-page SEO fundamentals a
   business owner can act on: titles, meta, headings, indexability, images,
   links, HTTPS, mobile. No API keys. */

import {
  rateLimited, clientIp, createCache, normalizeTarget,
  fetchText, pathOf, visibleText, extractJsonLd,
} from '../_lib/toolkit';

export const runtime = 'nodejs';
export const maxDuration = 60; // PageSpeed Insights can take ~20-30s

const cache = createCache();

/* Google PageSpeed Insights v5 — Lighthouse lab metrics plus CrUX real-user
   field data (LCP / INP / CLS). Keyless works at low volume; set
   PAGESPEED_API_KEY for production quota (25k/day free). */
async function getPageSpeed(url) {
  try {
    const key = process.env.PAGESPEED_API_KEY ? `&key=${process.env.PAGESPEED_API_KEY}` : '';
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE${key}`,
      { signal: AbortSignal.timeout(40000) }
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`PSI ${res.status}:`, detail.slice(0, 300));
      return null;
    }
    const data = await res.json();
    const lh = data.lighthouseResult;
    const audits = lh?.audits ?? {};
    const metrics = data.loadingExperience?.metrics ?? null;
    const fm = (k) => (metrics?.[k] ? { category: metrics[k].category, percentile: metrics[k].percentile } : null);
    return {
      score: lh?.categories?.performance?.score != null ? Math.round(lh.categories.performance.score * 100) : null,
      lab: {
        lcp: audits['largest-contentful-paint']?.displayValue ?? null,
        cls: audits['cumulative-layout-shift']?.displayValue ?? null,
        tbt: audits['total-blocking-time']?.displayValue ?? null,
        fcp: audits['first-contentful-paint']?.displayValue ?? null,
      },
      field: metrics ? {
        lcp: fm('LARGEST_CONTENTFUL_PAINT_MS'),
        inp: fm('INTERACTION_TO_NEXT_PAINT'),
        cls: fm('CUMULATIVE_LAYOUT_SHIFT_SCORE'),
        overall: data.loadingExperience?.overall_category ?? null,
      } : null,
    };
  } catch (err) {
    console.error('PSI fetch failed:', err.message);
    return null; // performance data is an enrichment, never a blocker
  }
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

/* Is the path blocked for a generic crawler by robots.txt? (root-disallow check) */
function robotsBlocksPath(robotsText, path) {
  if (!robotsText) return false;
  const lines = robotsText.split(/\r?\n/).map((l) => l.replace(/#.*/, '').trim());
  let inStar = false;
  const disallows = [];
  for (const line of lines) {
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const val = m[2].trim();
    if (field === 'user-agent') inStar = val === '*';
    else if (inStar && field === 'disallow' && val) disallows.push(val);
  }
  return disallows.some((d) => d === '/' || (d.length > 1 && path.startsWith(d)));
}

function analyze(html, headers, robotsText, url) {
  const flags = [];
  const issues = [];
  const add = (level, text) => flags.push({ level, text });
  const issue = (level, title, detail) => issues.push({ level, title, detail });

  const isHttps = url.startsWith('https://');
  add(isHttps ? 'ok' : 'risk', isHttps ? 'HTTPS — SECURE' : 'NO HTTPS — INSECURE CONNECTION');
  if (!isHttps) issue('risk', 'Site not served over HTTPS', 'Browsers mark HTTP pages "Not secure" and Google demotes them. Install a TLS certificate and redirect all HTTP to HTTPS.');

  // Title
  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) { add('risk', 'MISSING <TITLE>'); issue('risk', 'No page title', 'The <title> is the single most important on-page tag and the clickable headline in search results. Add a unique, descriptive 30–60 character title.'); }
  else {
    const len = title.length;
    if (len < 30) { add('warn', `TITLE SHORT — ${len} CHARS`); issue('warn', 'Title tag is short', `"${title}" is only ${len} characters. You're leaving keyword and click-through room on the table — aim for 30–60.`); }
    else if (len > 65) { add('warn', `TITLE LONG — ${len} CHARS`); issue('warn', 'Title tag may truncate', `At ${len} characters this title gets cut off in search results. Trim to under ~60.`); }
    else add('ok', 'TITLE — PRESENT & SIZED');
  }

  // Meta description
  const desc = attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    ?? attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  if (!desc) { add('warn', 'NO META DESCRIPTION'); issue('warn', 'No meta description', 'Without a description, search engines auto-generate the snippet under your link — often poorly. Write a 70–160 character summary that earns the click.'); }
  else if (desc.length < 70) { add('warn', `META DESC SHORT — ${desc.length} CHARS`); issue('warn', 'Meta description is thin', `At ${desc.length} characters, your snippet under-sells the page. Expand toward 120–160 characters.`); }
  else add('ok', 'META DESCRIPTION — PRESENT');

  // H1
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  if (h1s === 0) { add('risk', 'NO H1'); issue('risk', 'No H1 heading', 'The H1 tells users and search engines the page\'s main topic. Add exactly one H1 that states what the page is about.'); }
  else if (h1s > 1) { add('warn', `MULTIPLE H1 — ${h1s}`); issue('warn', `${h1s} H1 headings`, 'Multiple H1s dilute the page\'s topical focus. Use one H1, then H2/H3 for sub-sections.'); }
  else add('ok', 'H1 — EXACTLY ONE');

  const h2s = [...html.matchAll(/<h2[\s>]/gi)].length;
  if (h2s === 0 && h1s > 0) { add('warn', 'NO H2 SUBHEADINGS'); issue('warn', 'No subheadings (H2)', 'A single heading with no structure is hard to scan and weak for featured snippets. Break the content into H2 sections.'); }

  // Indexability
  const robotsMeta = (attr(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i) ?? '').toLowerCase();
  const xRobots = (headers.get('x-robots-tag') ?? '').toLowerCase();
  const path = pathOf(url);
  const noindex = /noindex/.test(robotsMeta) || /noindex/.test(xRobots);
  const blockedByRobots = robotsBlocksPath(robotsText, path);
  if (noindex) { add('risk', 'NOINDEX — EXCLUDED FROM SEARCH'); issue('risk', 'Page is set to noindex', `A noindex directive (${/noindex/.test(xRobots) ? 'X-Robots-Tag header' : 'robots meta tag'}) tells search engines to keep this page out of results entirely. Remove it if this page should rank.`); }
  else if (blockedByRobots) { add('risk', 'BLOCKED BY ROBOTS.TXT'); issue('risk', 'Page blocked in robots.txt', `Your robots.txt disallows crawling ${path}. If this page should rank, remove the Disallow rule.`); }
  else add('ok', 'INDEXABLE — NO CRAWL BLOCKS');

  // Canonical
  const canonical = attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
    ?? attr(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
  if (!canonical) { add('warn', 'NO CANONICAL TAG'); issue('warn', 'No canonical tag', 'Without a canonical, duplicate URLs (trailing slash, tracking params, http/https) can split ranking signals. Add a self-referencing canonical.'); }
  else add('ok', 'CANONICAL — DECLARED');

  // Viewport / mobile
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  if (!hasViewport) { add('risk', 'NO VIEWPORT META — NOT MOBILE-READY'); issue('risk', 'Not mobile-optimized', 'No viewport meta tag means the page won\'t scale on phones. Google indexes mobile-first — add <meta name="viewport" content="width=device-width, initial-scale=1">.'); }
  else add('ok', 'VIEWPORT — MOBILE-READY');

  // lang
  const hasLang = /<html[^>]+lang=/i.test(html);
  if (!hasLang) { add('warn', 'NO LANG ATTRIBUTE'); issue('warn', 'No language declared', 'The <html> tag has no lang attribute, which hurts accessibility and international targeting. Add lang="en" (or your language).'); }

  // Images / alt
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const missingAlt = imgs.filter((t) => !/\balt\s*=/i.test(t)).length;
  if (imgs.length) {
    if (missingAlt) { add('warn', `${missingAlt}/${imgs.length} IMAGES MISSING ALT`); issue('warn', `${missingAlt} of ${imgs.length} images have no alt text`, 'Alt text describes images to search engines and screen readers, and drives image-search traffic. Add descriptive alt attributes.'); }
    else add('ok', `IMAGE ALT — ALL ${imgs.length} COVERED`);
  }

  // Open Graph
  const ogTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const ogImage = /<meta[^>]+property=["']og:image["']/i.test(html);
  if (!ogTitle || !ogImage) { add('warn', 'INCOMPLETE OPEN GRAPH'); issue('warn', 'Incomplete social preview tags', `Missing ${[!ogTitle && 'og:title', !ogImage && 'og:image'].filter(Boolean).join(' and ')}. Links to this page will render as bare text when shared on social or messaging apps.`); }
  else add('ok', 'OPEN GRAPH — COMPLETE');

  // Schema
  const { types, errors } = extractJsonLd(html);
  if (errors) { add('risk', `${errors} MALFORMED JSON-LD BLOCK(S)`); issue('risk', 'Broken structured data', `${errors} JSON-LD block(s) failed to parse. Invalid schema is ignored by search engines and forfeits rich results. Validate and fix the syntax.`); }
  if (!types.length) { add('warn', 'NO STRUCTURED DATA'); issue('warn', 'No structured data', 'No JSON-LD schema found. Structured data unlocks rich results and helps AI systems understand your business. Start with Organization or LocalBusiness.'); }
  else add('ok', `SCHEMA — ${types.join(', ').toUpperCase()}`);

  // Content depth
  const words = visibleText(html).split(/\s+/).filter(Boolean).length;
  if (words < 300) { add('warn', `THIN CONTENT — ~${words} WORDS`); issue('warn', 'Thin content', `Only ~${words} words of visible text. Thin pages struggle to rank and rarely get cited. Expand with substantive, useful content.`); }
  else add('ok', `CONTENT — ~${words} WORDS`);

  // Page weight
  const kb = Math.round(html.length / 1024);
  if (kb > 200) { add('warn', `HEAVY HTML — ${kb}KB`); issue('warn', 'Large HTML payload', `The HTML document alone is ${kb}KB. Bloated markup slows first paint and hurts Core Web Vitals. Trim inline data and unused markup.`); }

  const score = Math.max(0, 100 - flags.filter((f) => f.level === 'risk').length * 15 - flags.filter((f) => f.level === 'warn').length * 6);
  const risks = flags.filter((f) => f.level === 'risk').length;
  const verdict = risks > 0 ? 'CRITICAL ISSUES FOUND — FIX BEFORE THEY COST YOU RANKINGS'
    : flags.some((f) => f.level === 'warn') ? 'FUNDAMENTALS OK — OPTIMIZATION GAPS REMAIN'
    : 'CLEAN — ON-PAGE FUNDAMENTALS ARE SOLID';

  // Prioritize: risks first, then warns, in discovery order
  issues.sort((a, b) => (a.level === 'risk' ? 0 : 1) - (b.level === 'risk' ? 0 : 1));

  return {
    flags, issues, score, verdict,
    stats: {
      title, titleLen: title?.length ?? 0,
      descLen: desc?.length ?? 0,
      h1s, h2s, images: imgs.length, missingAlt,
      words, schema: types, indexable: !noindex && !blockedByRobots,
    },
  };
}

export async function POST(request) {
  if (rateLimited(clientIp(request), 10, 'health-scan')) {
    return Response.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 });
  }

  let target;
  try {
    const body = await request.json();
    target = normalizeTarget(body.url);
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!target) return Response.json({ error: 'Enter a valid URL, e.g. example.com/pricing' }, { status: 400 });

  const cached = cache.get(target.url);
  if (cached) return Response.json(cached);

  let page;
  try {
    page = await fetchText(target.url, 12000);
  } catch {
    return Response.json({ error: 'Could not reach that URL. Check it and try again.' }, { status: 502 });
  }
  if (!page.ok) {
    return Response.json({ error: `The page returned HTTP ${page.status}. Enter a live, public URL.` }, { status: 502 });
  }

  let robotsText = '';
  const [, cwv] = await Promise.all([
    (async () => {
      try {
        const r = await fetchText(`${target.origin}/robots.txt`, 6000);
        if (r.ok) robotsText = r.text;
      } catch { /* robots optional */ }
    })(),
    getPageSpeed(target.url),
  ]);

  const result = { url: page.finalUrl, cwv, ...analyze(page.text, page.headers, robotsText, page.finalUrl) };
  if (cwv?.score != null) {
    const level = cwv.score >= 90 ? 'ok' : cwv.score >= 50 ? 'warn' : 'risk';
    result.flags.push({ level, text: `GOOGLE PAGESPEED — ${cwv.score}/100 (MOBILE)` });
    if (level !== 'ok') {
      result.issues.push({
        level,
        title: `Google PageSpeed score is ${cwv.score}/100 on mobile`,
        detail: `Lighthouse measured LCP ${cwv.lab.lcp ?? 'n/a'}, CLS ${cwv.lab.cls ?? 'n/a'}, total blocking time ${cwv.lab.tbt ?? 'n/a'}. Slow pages lose rankings and visitors — compress images, cut render-blocking scripts, and lazy-load below-the-fold content.`,
      });
    }
  }
  if (cwv?.field?.overall === 'SLOW') {
    result.flags.push({ level: 'risk', text: 'CORE WEB VITALS — FAILING (REAL-USER DATA)' });
    result.issues.push({
      level: 'risk',
      title: 'Real Chrome users experience this page as slow',
      detail: 'Google\'s Chrome UX Report field data rates this URL "Slow" — this is the actual Core Web Vitals signal used in ranking, not a lab estimate. Prioritize LCP and INP fixes.',
    });
  }
  result.issues.sort((a, b) => (a.level === 'risk' ? 0 : 1) - (b.level === 'risk' ? 0 : 1));
  cache.set(target.url, result);
  return Response.json(result);
}
