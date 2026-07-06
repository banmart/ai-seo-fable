/* AI Design Ideas API
   Two-stage generation, no mocks:
   1. Gemini 2.5 Flash reads the domain (or keywords) — plus the live homepage
      when reachable — and produces three tailored design concepts with
      image prompts.
   2. Nano Banana (gemini-2.5-flash-image) renders each concept as a
      website-mockup image, returned as data URLs.
   Requires GEMINI_API_KEY. Rate-limited hard: image generation costs money. */

import {
  rateLimited, clientIp, normalizeTarget, fetchText, visibleText,
} from '../_lib/toolkit';

export const runtime = 'nodejs';
export const maxDuration = 60; // image generation is slow

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

async function gemini(model, body, timeoutMs = 45000) {
  const res = await fetch(`${GEMINI_BASE}/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Gemini ${model} ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

/* Stage 1 — derive three design concepts from the input (and homepage if live). */
async function generateConcepts(input, siteContext) {
  const prompt = `You are a senior web designer at an elite agency that builds dark, futuristic, conversion-optimized websites.

The prospect entered: "${input}"
${siteContext ? `Their current homepage says:\n${siteContext}\n` : 'No live site was reachable — infer the business from the domain/keywords alone.'}

Produce exactly 3 distinct homepage design concepts tailored to THIS business. Vary the direction (e.g. bold/dark, clean/minimal, editorial/premium). For each concept write an image-generation prompt that describes a full desktop website homepage mockup: hero section, headline text idea, navigation, layout structure, color palette, typography feel, and one conversion element. The mockup must look like a real rendered website screenshot, not an illustration.

Return JSON only: an array of 3 objects with keys:
- "title": short concept name (3-5 words)
- "tag": 1-2 word category label, uppercase
- "desc": one sentence selling the concept to the business owner
- "imagePrompt": the full image prompt (start it with "High-fidelity desktop website homepage mockup UI screenshot,")`;

  const data = await gemini(TEXT_MODEL, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'ARRAY',
        minItems: 3,
        maxItems: 3,
        items: {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING' },
            tag: { type: 'STRING' },
            desc: { type: 'STRING' },
            imagePrompt: { type: 'STRING' },
          },
          required: ['title', 'tag', 'desc', 'imagePrompt'],
        },
      },
    },
  });

  const text = data.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
  const concepts = JSON.parse(text);
  if (!Array.isArray(concepts) || concepts.length === 0) throw new Error('No concepts returned');
  return concepts.slice(0, 3);
}

/* Stage 2 — render one concept with Nano Banana. Returns a data URL or null. */
async function renderMockup(imagePrompt) {
  try {
    const data = await gemini(IMAGE_MODEL, {
      contents: [{ parts: [{ text: imagePrompt }] }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: { aspectRatio: '4:3' },
      },
    }, 55000);
    const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) return null;
    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  } catch (err) {
    console.error('Mockup render failed:', err.message);
    return null;
  }
}

export async function POST(request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: 'Design generation is not configured yet. Try again later.' }, { status: 503 });
  }
  let input;
  try {
    const body = await request.json();
    input = String(body.input ?? '').trim().slice(0, 120);
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (input.length < 3) {
    return Response.json({ error: 'Enter a domain or a few keywords describing the business.' }, { status: 400 });
  }

  // Image generation is the expensive path — keep the per-IP budget tight.
  // Checked after validation so a malformed submission doesn't burn quota.
  if (rateLimited(clientIp(request), 2, 'design-ideas', 24 * 60 * 60 * 1000)) {
    return Response.json({ error: 'Generation limit reached — 2 runs per day. Try again tomorrow.' }, { status: 429 });
  }

  // If the input looks like a live domain, read its homepage for grounding.
  let siteContext = null;
  const target = /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(input.replace(/^https?:\/\//i, '').split('/')[0])
    ? normalizeTarget(input) : null;
  if (target) {
    try {
      const page = await fetchText(target.origin, 8000);
      if (page.ok) {
        const title = page.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
        siteContext = `${title}\n${visibleText(page.text).slice(0, 600)}`.trim() || null;
      }
    } catch { /* unreachable site — generate from the name alone */ }
  }

  try {
    const concepts = await generateConcepts(input, siteContext);
    const images = await Promise.all(concepts.map((c) => renderMockup(c.imagePrompt)));
    const results = concepts.map((c, i) => ({
      title: c.title, tag: c.tag, desc: c.desc, image: images[i],
    }));
    if (!results.some((r) => r.image)) {
      return Response.json({ error: 'Image generation failed. Try again shortly.' }, { status: 502 });
    }
    return Response.json({ input, grounded: Boolean(siteContext), concepts: results });
  } catch (err) {
    console.error('Design ideas error:', err.message);
    return Response.json({ error: 'Generation failed. Try again shortly.' }, { status: 502 });
  }
}
