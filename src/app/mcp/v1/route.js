import { NextResponse } from 'next/server';
import { MCP_SERVER, MCP_TOOLS } from '../../../data/mcpManifest';
import { callTool } from '../../../data/mcpToolHandlers';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await req.json();
    const { jsonrpc, id, method, params } = body ?? {};

    if (jsonrpc !== '2.0') {
      return NextResponse.json({
        jsonrpc: '2.0', id: id ?? null,
        error: { code: -32600, message: 'Invalid Request: jsonrpc must be "2.0"' },
      }, { status: 400, headers });
    }

    let result;

    if (method === 'initialize') {
      result = {
        protocolVersion: '2024-11-05',
        capabilities: { tools: { listChanged: false } },
        serverInfo: {
          name: MCP_SERVER.name,
          version: MCP_SERVER.version,
          description: MCP_SERVER.description,
          contact: MCP_SERVER.contact,
        },
      };
    } else if (method === 'tools/list') {
      result = { tools: MCP_TOOLS };
    } else if (method === 'tools/call') {
      const { name, arguments: args } = params ?? {};
      if (!name) {
        return NextResponse.json({
          jsonrpc: '2.0', id,
          error: { code: -32602, message: 'Invalid params: "name" is required' },
        }, { headers });
      }
      const data = callTool(name, args ?? {});
      result = { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    } else {
      return NextResponse.json({
        jsonrpc: '2.0', id,
        error: { code: -32601, message: `Method not found: ${method}` },
      }, { headers });
    }

    return NextResponse.json({ jsonrpc: '2.0', id, result }, { headers });
  } catch (err) {
    const mcpErr = err.code ? err : { code: -32603, message: String(err.message ?? err) };
    return NextResponse.json({ jsonrpc: '2.0', id: null, error: mcpErr }, { headers });
  }
}
