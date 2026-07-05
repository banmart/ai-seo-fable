import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Proxy the request to the live MCP endpoint
    const mcpRes = await fetch('https://domainsearchking.com/api/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!mcpRes.ok) {
      throw new Error(`External API error: ${mcpRes.status}`);
    }

    const data = await mcpRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain search error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch domain data', details: error.message },
      { status: 500 }
    );
  }
}
