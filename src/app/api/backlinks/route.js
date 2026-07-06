/* Backlink profile proxy.
   The upstream (backlinkmcp.com) is a JSON-RPC 2.0 MCP server over a 4.3B-edge
   Common Crawl link graph. This route fans out to domain_authority_score and
   backlinks_for_domain and flattens both structuredContent payloads into one
   { score, referringDomains, totalInlinks, linkers } response for the UI. */

import { NextResponse } from 'next/server';
import { rateLimited, clientIp, createCache } from '../_lib/toolkit';

const UPSTREAM = 'https://backlinkmcp.com/api/mcp';
const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;
const cache = createCache(6 * 60 * 60 * 1000); // graph snapshot data; 6h is plenty fresh

async function callTool(name, domain) {
  const res = await fetch(UPSTREAM, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: { domain } } }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`External API error: ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message ?? 'Upstream MCP error');
  if (data.result?.isError) throw new Error('Upstream tool error');
  const sc = data.result?.structuredContent;
  if (!sc) {
    // The upstream signals its free-tier daily cap as a plain text content
    // block with no structuredContent and isError:false.
    const text = data.result?.content?.[0]?.text ?? '';
    const capped = /daily limit/i.test(text);
    const err = new Error(capped ? 'Upstream daily quota reached.' : 'Upstream returned no data.');
    err.capped = capped;
    throw err;
  }
  return sc;
}

export async function POST(request) {
  if (rateLimited(clientIp(request), 10, 'backlinks')) {
    return NextResponse.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 });
  }

  let domain;
  try {
    const body = await request.json();
    domain = String(body.domain ?? '')
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .slice(0, 253);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!DOMAIN_RE.test(domain)) {
    return NextResponse.json({ error: 'Enter a root domain, e.g. stripe.com' }, { status: 400 });
  }

  const cached = cache.get(domain);
  if (cached) return NextResponse.json(cached);

  try {
    const [score, links] = await Promise.all([
      callTool('domain_authority_score', domain),
      callTool('backlinks_for_domain', domain),
    ]);

    const payload = {
      domain,
      found: score.found ?? links.ok ?? false,
      score: score.domain_rating ?? null,
      referringDomains: score.referring_domains ?? links.ranked_returned ?? 0,
      totalInlinks: links.total_inlinks ?? 0,
      rowCap: links.row_cap ?? null,
      linkers: (links.linkers ?? []).slice(0, 25).map((l) => ({
        source: l.source,
        authority: l.authority ?? null,
        linksOut: l.links_out ?? null,
      })),
    };
    cache.set(domain, payload);
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Backlink lookup error:', error);
    if (error.capped) {
      return NextResponse.json(
        { error: 'The link-graph service hit its daily lookup quota. Try again tomorrow.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: 'Backlink lookup is temporarily unavailable. Try again shortly.' },
      { status: 502 }
    );
  }
}
