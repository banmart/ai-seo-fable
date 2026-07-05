"use client";

/* ============ GOBIYA — /mcp Discovery Page ============ */
import { useState } from 'react'
import { MCP_SERVER, MCP_TOOLS } from '../../data/mcpManifest'
import './MCPPage.css'

const PILLAR_COLORS = {
  creativity:  '#00F0FF',
  performance: '#7B61FF',
  relations:   '#00D97E',
  recovery:    '#FF6B35',
}

const METHOD_BADGE = {
  string:  '#00F0FF',
  integer: '#7B61FF',
  array:   '#00D97E',
  object:  '#FF6B35',
  boolean: '#FFD166',
}

function TypeBadge({ type }) {
  const color = METHOD_BADGE[type] || '#8B93A7'
  return (
    <span className="mcp-type-badge" style={{ borderColor: color, color }}>
      {type}
    </span>
  )
}

function SchemaRow({ name, schema, required }) {
  return (
    <tr className={required ? 'mcp-schema-required' : ''}>
      <td className="mcp-schema-name mono">
        {name}
        {required && <span className="mcp-required-star">*</span>}
      </td>
      <td><TypeBadge type={schema.type} /></td>
      <td className="mcp-schema-desc">{schema.description || schema.enum?.join(' | ') || '—'}</td>
    </tr>
  )
}

function ToolCard({ tool }) {
  const [open, setOpen] = useState(false)
  const props = tool.inputSchema?.properties ?? {}
  const required = tool.inputSchema?.required ?? []
  const hasParams = Object.keys(props).length > 0

  return (
    <article className="mcp-tool-card" itemScope itemType="https://schema.org/SoftwareApplication">
      <button
        className="mcp-tool-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="mcp-tool-title">
          <span className="mcp-tool-name mono" itemProp="name">{tool.name}</span>
          <span className="mcp-tool-arrow">{open ? '▲' : '▼'}</span>
        </div>
        <p className="mcp-tool-desc" itemProp="description">{tool.description}</p>
      </button>

      {open && (
        <div className="mcp-tool-body">
          {hasParams ? (
            <>
              <h4 className="mcp-schema-heading mono">INPUT PARAMETERS</h4>
              <div className="mcp-schema-wrap">
                <table className="mcp-schema-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(props).map(([k, v]) => (
                      <SchemaRow key={k} name={k} schema={v} required={required.includes(k)} />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="mcp-no-params mono">// No parameters required</p>
          )}

          <h4 className="mcp-schema-heading mono">EXAMPLE CALL</h4>
          <pre className="mcp-code-block"><code>{JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/call',
            params: { name: tool.name, arguments: {} },
          }, null, 2)}</code></pre>
        </div>
      )}
    </article>
  )
}

export default function MCPPage() {
  const curlExample = `curl -X POST https://api.gobiya.com/mcp/v1 \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`

  const claudeConfig = JSON.stringify({
    mcpServers: {
      gobiya: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-http-client'],
        env: { MCP_SERVER_URL: 'https://api.gobiya.com/mcp/v1' },
      },
    },
  }, null, 2)

  return (
    <div className="mcp-page" itemScope itemType="https://schema.org/WebPage">
      {/* ── Header ── */}
      <header className="mcp-site-header">
        <a className="brand" href="/">GOBIYA<span className="brand__tick">_</span></a>
        <nav className="mcp-header-nav">
          <a href="/" className="mcp-nav-link">← Home</a>
          <a href="/.well-known/mcp.json" className="header-cta" target="_blank" rel="noopener">
            RAW JSON
          </a>
        </nav>
      </header>

      <main className="mcp-main">

        {/* ── Hero ── */}
        <section className="mcp-hero" aria-labelledby="mcp-h1">
          <div className="mcp-hero-grid">
            <div>
              <p className="kicker mono">// MCP SERVER — GOBIYA v{MCP_SERVER.version}</p>
              <h1 id="mcp-h1" itemProp="name">
                Gobiya MCP Server
              </h1>
              <p className="mcp-hero-sub" itemProp="description">
                A Model Context Protocol server that lets AI agents — Claude, ChatGPT, Perplexity,
                and any MCP-compatible client — discover services, retrieve case studies,
                estimate costs, and submit qualified leads directly to Gobiya.
              </p>
              <div className="mcp-endpoint-row">
                <span className="mcp-method-badge">POST</span>
                <code className="mcp-endpoint-url">{MCP_SERVER.base_url}</code>
              </div>
            </div>

            <div className="mcp-stat-panel">
              <div className="mcp-stat"><span className="mono">{MCP_TOOLS.length}</span><span>Tools</span></div>
              <div className="mcp-stat"><span className="mono">JSON-RPC 2.0</span><span>Protocol</span></div>
              <div className="mcp-stat"><span className="mono">HTTP</span><span>Transport</span></div>
              <div className="mcp-stat"><span className="mono">MCP/1.0</span><span>Version</span></div>
            </div>
          </div>
        </section>

        {/* ── Discovery Links ── */}
        <section className="mcp-section" aria-labelledby="mcp-discovery-h2">
          <h2 id="mcp-discovery-h2" className="mcp-section-title mono">// DISCOVERY</h2>
          <div className="mcp-discovery-grid">
            <a href="/.well-known/mcp.json" className="mcp-discovery-card" target="_blank" rel="noopener">
              <span className="mcp-discovery-icon">📄</span>
              <span className="mono">/.well-known/mcp.json</span>
              <span className="mcp-discovery-desc">Machine-readable manifest. Auto-discovered by MCP clients.</span>
            </a>
            <a href="/llms.txt" className="mcp-discovery-card" target="_blank" rel="noopener">
              <span className="mcp-discovery-icon">🤖</span>
              <span className="mono">/llms.txt</span>
              <span className="mcp-discovery-desc">Plain-text instructions for AI agents and crawlers.</span>
            </a>
            <div className="mcp-discovery-card">
              <span className="mcp-discovery-icon">🔗</span>
              <span className="mono">Link: &lt;/.well-known/mcp.json&gt;; rel="mcp"</span>
              <span className="mcp-discovery-desc">HTTP header present on every page response.</span>
            </div>
          </div>
        </section>

        {/* ── Connect ── */}
        <section className="mcp-section" aria-labelledby="mcp-connect-h2">
          <h2 id="mcp-connect-h2" className="mcp-section-title mono">// CONNECT AN AI AGENT</h2>
          <div className="mcp-connect-grid">
            <div>
              <h3 className="mcp-connect-sub">Claude Desktop config</h3>
              <pre className="mcp-code-block"><code>{claudeConfig}</code></pre>
            </div>
            <div>
              <h3 className="mcp-connect-sub">Raw HTTP (curl)</h3>
              <pre className="mcp-code-block"><code>{curlExample}</code></pre>
            </div>
          </div>
        </section>

        {/* ── Tool Catalog ── */}
        <section className="mcp-section" aria-labelledby="mcp-tools-h2">
          <h2 id="mcp-tools-h2" className="mcp-section-title mono">// TOOL CATALOG — {MCP_TOOLS.length} TOOLS</h2>
          <p className="mcp-tools-intro">
            Click any tool to expand its input schema and see an example JSON-RPC call.
            Fields marked <span className="mcp-required-star">*</span> are required.
          </p>
          <div className="mcp-tools-list">
            {MCP_TOOLS.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>

        {/* ── Methods ── */}
        <section className="mcp-section" aria-labelledby="mcp-methods-h2">
          <h2 id="mcp-methods-h2" className="mcp-section-title mono">// SUPPORTED JSON-RPC METHODS</h2>
          <div className="mcp-methods-grid">
            {[
              { method: 'initialize',   desc: 'Protocol handshake. Returns server capabilities and version.' },
              { method: 'tools/list',   desc: 'Returns the full catalog of available tools with schemas.' },
              { method: 'tools/call',   desc: 'Calls a specific tool by name with provided arguments.' },
            ].map(({ method, desc }) => (
              <div key={method} className="mcp-method-row">
                <code className="mcp-method-name mono">{method}</code>
                <p className="mcp-method-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── About ── */}
        <section className="mcp-section mcp-about" aria-labelledby="mcp-about-h2" itemScope itemType="https://schema.org/Organization">
          <h2 id="mcp-about-h2" className="mcp-section-title mono">// ABOUT GOBIYA</h2>
          <p itemProp="description">
            Gobiya is a Los Angeles digital marketing agency specializing in SEO, GEO (AI citation optimization),
            Google Ads, custom web development, and Google penalty recovery for local service businesses and B2B firms.
            Founded by Steve Martin in 2010 — 25 years in search engineering.
          </p>
          <div className="mcp-about-links">
            <a href="https://www.gobiya.com/contact" className="cta">Book a Free Strategy Call →</a>
            <a href={`mailto:${MCP_SERVER.contact}`} className="cta cta--ghost">{MCP_SERVER.contact}</a>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <p className="mono">
          GOBIYA — MCP SERVER v{MCP_SERVER.version}. © 2026.{' '}
          <a href={`mailto:${MCP_SERVER.contact}`}>{MCP_SERVER.contact}</a>
          {' · '}
          <a href="/.well-known/mcp.json">mcp.json</a>
          {' · '}
          <a href="/llms.txt">llms.txt</a>
        </p>
      </footer>
    </div>
  )
}
