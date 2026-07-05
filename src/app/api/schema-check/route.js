/* Schema & Rich Results API
   Extracts JSON-LD from a page, validates required properties for common types,
   and reports rich-result eligibility and entity-schema gaps. No API keys. */

import {
  rateLimited, clientIp, createCache, normalizeTarget,
  fetchText, extractJsonLd, jsonLdNodes,
} from '../_lib/toolkit';

export const runtime = 'nodejs';

const cache = createCache();

// Minimal required-property maps for the rich-result types Google supports.
const REQUIRED = {
  Organization: ['name', 'url'],
  LocalBusiness: ['name', 'address'],
  Product: ['name'],
  Offer: ['price', 'priceCurrency'],
  Article: ['headline'],
  NewsArticle: ['headline'],
  BlogPosting: ['headline'],
  Recipe: ['name', 'recipeIngredient'],
  Event: ['name', 'startDate'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
  Review: ['reviewRating', 'author'],
  AggregateRating: ['ratingValue'],
  VideoObject: ['name', 'thumbnailUrl', 'uploadDate'],
  Person: ['name'],
  JobPosting: ['title', 'datePosted', 'hiringOrganization'],
};

const ENTITY_TYPES = ['Organization', 'LocalBusiness', 'Corporation', 'Person', 'Brand'];
const RICH_TYPES = ['Product', 'Recipe', 'Event', 'FAQPage', 'BreadcrumbList', 'Article', 'NewsArticle', 'BlogPosting', 'Review', 'VideoObject', 'JobPosting', 'HowTo'];

const typesOf = (node) => {
  const t = node['@type'];
  return t ? (Array.isArray(t) ? t : [t]) : [];
};

function analyze(html) {
  const { blocks, types, errors } = extractJsonLd(html);
  const nodes = jsonLdNodes(blocks);
  const flags = [];
  const issues = [];
  const add = (level, text) => flags.push({ level, text });
  const issue = (level, title, detail) => issues.push({ level, title, detail });

  if (errors) {
    add('risk', `${errors} MALFORMED JSON-LD BLOCK(S)`);
    issue('risk', `${errors} structured-data block(s) won't parse`, 'Invalid JSON-LD is silently ignored by search engines — you get zero credit for it and forfeit any rich results. Run each block through a JSON validator and fix the syntax.');
  }

  if (!nodes.length && !errors) {
    add('risk', 'NO STRUCTURED DATA FOUND');
    issue('risk', 'No JSON-LD structured data', 'This page has no machine-readable schema. Search engines and AI systems have to infer everything about your business from prose. Add Organization or LocalBusiness schema as a baseline.');
    return { flags, issues, score: 30, verdict: 'NO STRUCTURED DATA — MISSING A FOUNDATIONAL AI & RICH-RESULT SIGNAL', detected: [], entities: [] };
  }

  // Validate required properties per node
  const detected = [];
  for (const node of nodes) {
    for (const type of typesOf(node)) {
      const required = REQUIRED[type];
      const entry = { type, valid: true, missing: [] };
      if (required) {
        for (const prop of required) {
          const has = node[prop] !== undefined && node[prop] !== null && node[prop] !== '';
          if (!has) { entry.valid = false; entry.missing.push(prop); }
        }
      }
      detected.push(entry);
      if (!entry.valid) {
        add('warn', `${type.toUpperCase()} — MISSING ${entry.missing.join(', ').toUpperCase()}`);
        issue('warn', `${type} schema is incomplete`, `Missing required propert${entry.missing.length > 1 ? 'ies' : 'y'}: ${entry.missing.join(', ')}. Without these, Google won't show the rich result this type unlocks. Add the missing fields.`);
      }
    }
  }

  // Entity presence
  const hasEntity = types.some((t) => ENTITY_TYPES.includes(t));
  if (hasEntity) add('ok', `ENTITY SCHEMA — ${types.filter((t) => ENTITY_TYPES.includes(t)).join(', ').toUpperCase()}`);
  else {
    add('warn', 'NO ENTITY SCHEMA');
    issue('warn', 'No Organization/LocalBusiness/Person schema', 'Entity schema is what tells AI systems and Google who you are — the anchor for your Knowledge Graph presence and AI citations. Add it site-wide, typically in the homepage @graph.');
  }

  // Rich-result opportunities present
  const richPresent = types.filter((t) => RICH_TYPES.includes(t));
  if (richPresent.length) add('ok', `RICH-RESULT TYPES — ${richPresent.join(', ').toUpperCase()}`);

  // Common high-value gaps
  if (!types.includes('BreadcrumbList')) {
    issue('warn', 'No BreadcrumbList schema', 'Breadcrumb schema replaces the plain URL in search results with a readable navigation path, improving click-through. Add BreadcrumbList on interior pages.');
    add('warn', 'NO BREADCRUMB SCHEMA');
  }
  if (!types.includes('FAQPage') && !types.includes('Product')) {
    issue('warn', 'No FAQPage schema', 'If the page answers common questions, FAQPage schema can win expanded SERP real estate and feed AI answer engines directly. Add it where you have genuine Q&A content.');
  }

  const valid = detected.filter((d) => d.valid).length;
  const risks = flags.filter((f) => f.level === 'risk').length;
  const warns = flags.filter((f) => f.level === 'warn').length;
  const score = Math.max(0, 100 - risks * 30 - warns * 8);
  const verdict = risks > 0 ? 'STRUCTURED DATA BROKEN OR ABSENT — RICH RESULTS FORFEITED'
    : warns > 0 ? 'SCHEMA PRESENT — GAPS LIMIT RICH-RESULT & AI ELIGIBILITY'
    : 'STRUCTURED DATA — COMPLETE AND VALID';

  issues.sort((a, b) => (a.level === 'risk' ? 0 : 1) - (b.level === 'risk' ? 0 : 1));

  return {
    flags, issues, score, verdict,
    detected,
    entities: types,
    stats: { blocks: blocks.length, types: types.length, validNodes: valid, totalNodes: detected.length, parseErrors: errors },
  };
}

export async function POST(request) {
  if (rateLimited(clientIp(request))) {
    return Response.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 });
  }

  let target;
  try {
    const body = await request.json();
    target = normalizeTarget(body.url);
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!target) return Response.json({ error: 'Enter a valid URL, e.g. example.com' }, { status: 400 });

  const cached = cache.get(target.url);
  if (cached) return Response.json(cached);

  let page;
  try {
    page = await fetchText(target.url, 12000);
  } catch {
    return Response.json({ error: 'Could not reach that URL. Check it and try again.' }, { status: 502 });
  }
  if (!page.ok) return Response.json({ error: `The page returned HTTP ${page.status}.` }, { status: 502 });

  const result = { url: page.finalUrl, ...analyze(page.text) };
  cache.set(target.url, result);
  return Response.json(result);
}
