import { NextResponse } from 'next/server';
import { MCP_MANIFEST } from '../../../data/mcpManifest';

export async function GET() {
  return NextResponse.json(MCP_MANIFEST, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
