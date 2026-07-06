/* Generative domain search proxy.
   The upstream (domainsearchking.com) is a JSON-RPC 2.0 MCP server, so this
   route translates the UI's { keyword, filter, comOnly } into a tools/call
   and flattens the structuredContent back into { domains: [{ name, available }] }. */

import { NextResponse } from 'next/server';
import { rateLimited, clientIp } from '../../_lib/toolkit';

const UPSTREAM = 'https://domainsearchking.com/api/mcp';
const PATTERN_FILTERS = new Set(['starts', 'ends', 'contains']);

export async function POST(request) {
  if (rateLimited(clientIp(request), 10, 'domain-search')) {
    return NextResponse.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 });
  }

  let keyword; let filter; let comOnly;
  try {
    const body = await request.json();
    keyword = String(body.keyword ?? '').trim().toLowerCase().slice(0, 60);
    filter = String(body.filter ?? 'all');
    comOnly = Boolean(body.comOnly);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (!/^[a-z0-9][a-z0-9 ,-]*$/.test(keyword)) {
    return NextResponse.json({ error: 'Enter a keyword using letters and numbers, e.g. coffee' }, { status: 400 });
  }

  const usePattern = PATTERN_FILTERS.has(filter);
  const rpc = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: usePattern
      ? {
          name: 'find_available_domains_by_pattern',
          arguments: { keyword, position: filter, tlds: comOnly ? ['com'] : ['com', 'net', 'io', 'co'], limit: 60 },
        }
      : {
          name: 'find_available_domains',
          arguments: { keyword, count: 24 },
        },
  };

  try {
    const mcpRes = await fetch(UPSTREAM, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rpc),
      signal: AbortSignal.timeout(120000), // registry-verified enumeration is slow
    });
    if (!mcpRes.ok) throw new Error(`External API error: ${mcpRes.status}`);

    const data = await mcpRes.json();
    if (data.error) throw new Error(data.error.message ?? 'Upstream MCP error');

    const sc = data.result?.structuredContent ?? {};
    const names = sc.domains ?? [];
    const domains = names.map((name) => ({ name, available: true }));
    return NextResponse.json({
      domains,
      keyword,
      mode: usePattern ? 'pattern' : 'generative',
      position: sc.position ?? null,
      tlds: sc.tlds ?? (usePattern ? null : ['com']),
      checked: sc.checked ?? null,      // candidates verified against the registry (pattern mode)
      available: sc.available ?? names.length,
      byTld: sc.byTld ?? null,
    });
  } catch (error) {
    console.error('Domain search error:', error);
    return NextResponse.json(
      { error: 'Domain search is temporarily unavailable. Try again shortly.' },
      { status: 502 }
    );
  }
}
