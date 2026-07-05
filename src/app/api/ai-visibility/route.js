/* AI Visibility Checker API
   Free checks, no API keys:
   - robots.txt: per-crawler access rules for the major AI bots
   - llms.txt: presence of AI-agent instructions
   - Homepage HTML: title/description, JSON-LD entity schema, h1, server-rendered text
   - sitemap.xml: presence
   Results cached in-memory for 24h; rate-limited per IP. */

export const runtime = 'nodejs';

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = 10; // requests per IP per hour
const cache = new Map();
const rateBuckets = new Map();

const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i;

const AI_BOTS = [
  { ua: 'GPTBot', label: 'GPTBot (ChatGPT training)' },
  { ua: 'OAI-SearchBot', label: 'OAI-SearchBot (ChatGPT search)' },
  { ua: 'ChatGPT-User', label: 'ChatGPT-User (live browsing)' },
  { ua: 'ClaudeBot', label: 'ClaudeBot (Anthropic)' },
  { ua: 'PerplexityBot', label: 'PerplexityBot' },
  { ua: 'Google-Extended', label: 'Google-Extended (Gemini/AI Overviews training)' },
  { ua: 'CCBot', label: 'CCBot (Common Crawl)' },
  { ua: 'Amazonbot', label: 'Amazonbot (Alexa/Rufus)' },
  { ua: 'meta-externalagent', label: 'Meta-ExternalAgent (Meta AI)' },
];

function rateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip)?.filter((t) => now - t < 60 * 60 * 1000) ?? [];
  if (bucket.length >= RATE_LIMIT) return true;
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  return false;
}

async function fetchText(url, timeoutMs = 8000) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    redirect: 'follow',
    headers: { 'User-Agent': 'GobiyaAIVisibilityChecker/1.0 (+https://gobiya.agency/tools/ai-visibility-checker)' },
  });
  return { ok: res.ok, status: res.status, text: res.ok ? await res.text() : '' };
}

/* Parse robots.txt into UA groups: [{ agents: [...], disallow: [...], allow: [...] }] */
function parseRobots(text) {
  const groups = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const [, field, value] = [m[0], m[1].toLowerCase(), m[2].trim()];
    if (field === 'user-agent') {
      if (!lastWasAgent) {
        current = { agents: [], disallow: [], allow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (current && (field === 'disallow' || field === 'allow')) {
      current[field].push(value);
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

function botAccess(groups, ua) {
  const lower = ua.toLowerCase();
  // A bot-specific group (deliberate rules for this AI crawler) wins over the '*' fallback.
  const specific = groups.filter((g) => g.agents.some((a) => a !== '*' && lower.includes(a)));
  const isSpecific = specific.length > 0;
  const applied = isSpecific ? specific : groups.filter((g) => g.agents.includes('*'));
  if (!applied.length) return 'allowed';

  const disallow = applied.flatMap((g) => g.disallow).filter(Boolean);
  const allowRoot = applied.some((g) => g.allow.includes('/'));
  // Full block: Disallow: / with no Allow: / override.
  if (disallow.includes('/') && !allowRoot) return 'blocked';
  // Path-level disallows under the generic '*' group are normal site hygiene (/admin, /cgi-bin)
  // and don't reduce AI visibility — only flag 'partial' when rules were written for THIS bot.
  if (isSpecific && disallow.length) return 'partial';
  return 'allowed';
}

async function getRobots(domain) {
  try {
    const res = await fetchText(`https://${domain}/robots.txt`);
    if (!res.ok) return { exists: false, bots: AI_BOTS.map((b) => ({ ...b, access: 'allowed' })) };
    const groups = parseRobots(res.text);
    return {
      exists: true,
      bots: AI_BOTS.map((b) => ({ ...b, access: botAccess(groups, b.ua) })),
    };
  } catch {
    return null;
  }
}

async function getLlmsTxt(domain) {
  try {
    const res = await fetchText(`https://${domain}/llms.txt`);
    // Guard against SPAs that 200 every path with the app shell
    const looksReal = res.ok && res.text.length > 40 && !/<html/i.test(res.text.slice(0, 500));
    return { exists: looksReal, bytes: looksReal ? res.text.length : 0 };
  } catch {
    return null;
  }
}

async function getSitemap(domain) {
  try {
    const res = await fetchText(`https://${domain}/sitemap.xml`);
    return { exists: res.ok && /<(urlset|sitemapindex)/i.test(res.text.slice(0, 2000)) };
  } catch {
    return null;
  }
}

async function getHomepage(domain) {
  try {
    const res = await fetchText(`https://${domain}/`, 12000);
    if (!res.ok) return { reachable: false, status: res.status };
    const html = res.text;
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
    const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]
      ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ?? null;
    const hasH1 = /<h1[\s>]/i.test(html);

    const schemaTypes = new Set();
    for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const walk = (node) => {
          if (Array.isArray(node)) return node.forEach(walk);
          if (node && typeof node === 'object') {
            const t = node['@type'];
            if (t) (Array.isArray(t) ? t : [t]).forEach((x) => schemaTypes.add(x));
            Object.values(node).forEach(walk);
          }
        };
        walk(JSON.parse(m[1]));
      } catch { /* malformed block — skip */ }
    }

    // Server-rendered text: strip scripts/styles/tags and measure what a non-JS crawler sees
    const visibleText = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      reachable: true,
      title,
      description,
      hasH1,
      schemaTypes: [...schemaTypes],
      textChars: visibleText.length,
    };
  } catch {
    return null;
  }
}

function buildVerdict({ robots, llms, sitemap, home }) {
  const flags = [];

  if (robots) {
    const blocked = robots.bots.filter((b) => b.access === 'blocked');
    const partial = robots.bots.filter((b) => b.access === 'partial');
    if (!robots.exists) flags.push({ level: 'warn', text: 'NO ROBOTS.TXT — ALL CRAWLERS ALLOWED BY DEFAULT' });
    else if (blocked.length) flags.push({ level: 'risk', text: `AI CRAWLERS BLOCKED — ${blocked.map((b) => b.ua).join(', ').toUpperCase()}` });
    else if (partial.length) flags.push({ level: 'warn', text: `AI CRAWLERS RESTRICTED — ${partial.map((b) => b.ua).join(', ').toUpperCase()}` });
    else flags.push({ level: 'ok', text: 'AI CRAWLERS — ALL MAJOR BOTS ALLOWED' });
  } else {
    flags.push({ level: 'warn', text: 'ROBOTS.TXT — UNREACHABLE' });
  }

  if (llms) flags.push(llms.exists
    ? { level: 'ok', text: 'LLMS.TXT — PUBLISHED' }
    : { level: 'warn', text: 'LLMS.TXT — NOT FOUND' });

  if (sitemap) flags.push(sitemap.exists
    ? { level: 'ok', text: 'SITEMAP.XML — PRESENT' }
    : { level: 'warn', text: 'SITEMAP.XML — NOT FOUND' });

  if (home?.reachable) {
    const entitySchema = home.schemaTypes.some((t) => /Organization|LocalBusiness|Person|Corporation/i.test(t));
    flags.push(home.schemaTypes.length
      ? { level: entitySchema ? 'ok' : 'warn', text: entitySchema ? `ENTITY SCHEMA — ${home.schemaTypes.join(', ').toUpperCase()}` : `SCHEMA PRESENT, NO ENTITY TYPE — ${home.schemaTypes.join(', ').toUpperCase()}` }
      : { level: 'risk', text: 'NO JSON-LD SCHEMA — AI SYSTEMS MUST GUESS WHO YOU ARE' });
    flags.push(home.textChars >= 500
      ? { level: 'ok', text: `SERVER-RENDERED CONTENT — ${home.textChars.toLocaleString()} CHARS VISIBLE WITHOUT JS` }
      : { level: 'risk', text: `THIN HTML — ONLY ${home.textChars} CHARS WITHOUT JS (CLIENT-RENDERED?)` });
    if (!home.title) flags.push({ level: 'risk', text: 'NO <TITLE> TAG' });
    if (!home.description) flags.push({ level: 'warn', text: 'NO META DESCRIPTION' });
    if (!home.hasH1) flags.push({ level: 'warn', text: 'NO H1 ON HOMEPAGE' });
  } else {
    flags.push({ level: 'risk', text: 'HOMEPAGE UNREACHABLE OVER HTTPS' });
  }

  const risks = flags.filter((f) => f.level === 'risk').length;
  const warns = flags.filter((f) => f.level === 'warn').length;
  const score = Math.max(0, 100 - risks * 25 - warns * 10);
  const verdict = risks > 0 ? 'AI VISIBILITY COMPROMISED — CRITICAL SIGNALS MISSING OR BLOCKED'
    : warns > 0 ? 'PARTIALLY AI-READY — GAPS REDUCE CITATION PROBABILITY'
    : 'AI-READY — MACHINE CHANNELS OPEN AND LEGIBLE';

  return { flags, verdict, score };
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

  const [robots, llms, sitemap, home] = await Promise.all([
    getRobots(domain), getLlmsTxt(domain), getSitemap(domain), getHomepage(domain),
  ]);
  if (!robots && !home) {
    return Response.json({ error: 'Site unreachable. Check the domain and try again.' }, { status: 502 });
  }

  const data = { domain, robots, llms, sitemap, home, ...buildVerdict({ robots, llms, sitemap, home }) };
  if (robots && home?.reachable) cache.set(domain, { at: Date.now(), data });
  return Response.json(data);
}
