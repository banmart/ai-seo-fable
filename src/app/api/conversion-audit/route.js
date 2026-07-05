/* Conversion & Trust Audit API
   Fetches a page and detects the elements that turn traffic into leads:
   clear CTAs, reachable contact info, forms, and trust/social-proof signals.
   Answers "why does my traffic not convert?" from the page itself. No API keys. */

import {
  rateLimited, clientIp, createCache, normalizeTarget,
  fetchText, visibleText, extractJsonLd,
} from '../_lib/toolkit';

export const runtime = 'nodejs';

const cache = createCache();

const CTA_WORDS = /\b(get started|get a quote|request (?:a )?(?:quote|demo|brief)|book (?:a )?(?:call|demo|consultation|appointment)|contact us|start (?:your )?(?:free )?trial|sign up|schedule|buy now|add to cart|get in touch|talk to (?:us|sales)|free consultation)\b/i;
const TRUST_WORDS = /\b(testimonial|reviews?|rated|trusted by|clients?|case stud|as seen (?:in|on)|guarantee|certified|accredited|award|years? (?:of )?experience|customers?)\b/i;

function analyze(html) {
  const flags = [];
  const issues = [];
  const add = (level, text) => flags.push({ level, text });
  const issue = (level, title, detail) => issues.push({ level, title, detail });

  const text = visibleText(html);
  const { types } = extractJsonLd(html);

  // --- CTAs -------------------------------------------------------------
  const buttonsAndLinks = [
    ...[...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map((m) => m[1]),
    ...[...html.matchAll(/<a\b[^>]*class=["'][^"']*\b(?:btn|button|cta)\b[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi)].map((m) => m[1]),
  ].map((s) => s.replace(/<[^>]+>/g, ' ').trim()).filter(Boolean);
  const ctaHits = buttonsAndLinks.filter((t) => CTA_WORDS.test(t));
  const ctaInText = CTA_WORDS.test(text);
  if (ctaHits.length) add('ok', `PRIMARY CTA — ${ctaHits.length} ACTION BUTTON(S)`);
  else if (ctaInText) { add('warn', 'CTA TEXT PRESENT — NO CLEAR BUTTON'); issue('warn', 'No prominent call-to-action button', 'The page mentions an action but has no obvious CTA button. Visitors ready to convert have nothing clear to click. Add a high-contrast primary button above the fold.'); }
  else { add('risk', 'NO CALL-TO-ACTION DETECTED'); issue('risk', 'No call-to-action', "There's no detectable CTA — button or phrase — telling visitors what to do next. Traffic with nowhere to go doesn't convert. Add one unmistakable primary action (Get a quote, Book a call).") ; }

  // --- Contact ----------------------------------------------------------
  const tel = /href=["']tel:/i.test(html);
  const mailto = /href=["']mailto:/i.test(html);
  const phoneInText = /(\+?\d[\d\s().-]{7,}\d)/.test(text);
  const addressSchema = types.some((t) => /PostalAddress|LocalBusiness/i.test(t));
  const contactSignals = [tel && 'phone link', mailto && 'email link', phoneInText && !tel && 'phone number', addressSchema && 'address schema'].filter(Boolean);
  if (contactSignals.length) add('ok', `CONTACT — ${contactSignals.join(', ').toUpperCase()}`);
  else { add('risk', 'NO CONTACT METHOD FOUND'); issue('risk', 'No reachable contact method', 'No phone link, email, or address was found. B2B and local buyers routinely bounce when they can\'t immediately see how to reach you. Add a visible phone (tel: link) and/or email.'); }
  if (!tel && (phoneInText || contactSignals.length)) issue('warn', 'Phone number not click-to-call', 'If you show a phone number, wrap it in a tel: link so mobile visitors can tap to call. A plain-text number adds friction on the device most of your traffic uses.');

  // --- Forms ------------------------------------------------------------
  const forms = [...html.matchAll(/<form\b/gi)].length;
  if (forms) add('ok', `FORMS — ${forms} ON PAGE`);
  else issue('warn', 'No form on the page', 'No form was detected. A short lead or contact form captures visitors who aren\'t ready to call. If your conversion path is a form on another page, make sure the CTA points there clearly.');

  // --- Trust / social proof --------------------------------------------
  const reviewSchema = types.some((t) => /Review|AggregateRating/i.test(t));
  const trustText = TRUST_WORDS.test(text);
  if (reviewSchema) add('ok', 'TRUST — REVIEW/RATING SCHEMA');
  if (trustText || reviewSchema) {
    if (!reviewSchema) add('ok', 'TRUST — SOCIAL-PROOF LANGUAGE PRESENT');
  } else {
    add('warn', 'NO TRUST SIGNALS DETECTED');
    issue('warn', 'No visible trust signals', 'No testimonials, reviews, ratings, client logos, or credentials were detected. Social proof is often the difference between a visitor who converts and one who leaves to "check reviews" and never returns. Add testimonials or a Review/AggregateRating schema.');
  }

  // --- Social profiles --------------------------------------------------
  const socials = ['linkedin', 'twitter', 'x.com', 'facebook', 'instagram', 'youtube', 'tiktok']
    .filter((s) => new RegExp(`href=["'][^"']*${s.replace('.', '\\.')}`, 'i').test(html));
  if (socials.length) add('ok', `SOCIAL — ${socials.length} PROFILE LINK(S)`);
  else issue('warn', 'No social profile links', 'No links to social profiles were found. They add legitimacy and give hesitant buyers another way to vet you before committing. Link your active profiles in the footer.');

  // --- Value proposition (H1) ------------------------------------------
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ').trim();
  if (!h1) { add('risk', 'NO H1 VALUE PROPOSITION'); issue('risk', 'No headline value proposition', 'There\'s no H1 stating what you do and for whom. A visitor should understand your offer in five seconds; a missing or vague headline loses them before the CTA ever matters.'); }
  else add('ok', 'VALUE PROP — H1 PRESENT');

  const risks = flags.filter((f) => f.level === 'risk').length;
  const warns = flags.filter((f) => f.level === 'warn').length;
  const score = Math.max(0, 100 - risks * 22 - warns * 9);
  const verdict = risks > 0 ? 'CONVERSION PATH BROKEN — TRAFFIC HAS NOWHERE TO GO'
    : warns > 0 ? 'CONVERTS, BUT LEAKS — TRUST & PATH GAPS COST YOU LEADS'
    : 'CONVERSION FUNDAMENTALS — IN PLACE';

  issues.sort((a, b) => (a.level === 'risk' ? 0 : 1) - (b.level === 'risk' ? 0 : 1));

  return {
    flags, issues, score, verdict,
    signals: {
      ctaButtons: ctaHits.length, forms, contact: contactSignals,
      trust: reviewSchema ? 'schema+text' : trustText ? 'text' : 'none',
      socials, hasH1: Boolean(h1),
    },
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
