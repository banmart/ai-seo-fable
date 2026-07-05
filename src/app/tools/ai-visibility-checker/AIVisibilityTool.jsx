"use client";

import { useState } from 'react';

const ACCESS_LABEL = {
  allowed: 'ALLOWED',
  partial: 'PARTIAL',
  blocked: 'BLOCKED',
};
const ACCESS_LEVEL = {
  allowed: 'ok',
  partial: 'warn',
  blocked: 'risk',
};

export default function AIVisibilityTool() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  async function run(e) {
    e.preventDefault();
    setResult(null);
    setError(false);
    setStatus('// PROBING ROBOTS + LLMS.TXT + SCHEMA + RENDER …');
    try {
      const res = await fetch('/api/ai-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Check failed.');
      setResult(data);
      setStatus('// SCAN COMPLETE');
    } catch (err) {
      setError(true);
      setStatus(`// ERROR — ${err.message}`);
    }
  }

  return (
    <div>
      <form className="tool-form" onSubmit={run} aria-label="AI visibility checker">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          aria-label="Domain name"
          required
        />
        <button className="cta" type="submit">Run Check →</button>
      </form>
      <p className={`tool-status mono${error ? ' tool-status--error' : ''}`} role="status">{status}</p>

      {result && (
        <div className="tool-result">
          <div>
            {result.flags.map((f) => (
              <span key={f.text} className={`tool-flag tool-flag--${f.level}`}>{f.text}</span>
            ))}
          </div>

          <ul className="proof-grid">
            <li>
              <strong className="mono">{result.score}<span style={{ fontSize: '0.9rem' }}>/100</span></strong>
              <span>AI-readiness score</span>
            </li>
            <li>
              <strong className="mono">{result.robots?.bots?.filter((b) => b.access === 'allowed').length ?? '—'}<span style={{ fontSize: '0.9rem' }}>/{result.robots?.bots?.length ?? 9}</span></strong>
              <span>AI crawlers allowed</span>
            </li>
            <li>
              <strong className="mono">{result.home?.reachable ? result.home.textChars.toLocaleString() : '—'}</strong>
              <span>chars visible without JavaScript</span>
            </li>
          </ul>

          {result.robots?.bots && (
            <ul className="spec-list">
              <li>
                <span className="mono spec-id">A-01</span>
                <h3>AI crawler access</h3>
                <p>
                  {result.robots.exists
                    ? 'Per-bot rules parsed from robots.txt:'
                    : 'No robots.txt found — every crawler is allowed by default:'}
                </p>
                <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.4rem' }}>
                  {result.robots.bots.map((b) => (
                    <div key={b.ua} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{b.label}</span>
                      <span className={`tool-flag tool-flag--${ACCESS_LEVEL[b.access]}`} style={{ margin: 0 }}>{ACCESS_LABEL[b.access]}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          )}

          <ul className="spec-list">
            <li>
              <span className="mono spec-id">A-02</span>
              <h3>Entity legibility</h3>
              <p>
                {result.home?.schemaTypes?.length
                  ? `JSON-LD schema found: ${result.home.schemaTypes.join(', ')}. AI systems can read who you are without guessing.`
                  : 'No JSON-LD schema on the homepage. AI systems have no structured signal for your identity, offer, or authority — they have to infer everything from prose.'}
              </p>
            </li>
            <li>
              <span className="mono spec-id">A-03</span>
              <h3>Crawlable content</h3>
              <p>
                {result.home?.reachable
                  ? result.home.textChars >= 500
                    ? `${result.home.textChars.toLocaleString()} characters of text render in the raw HTML — a non-JS crawler sees your content.`
                    : `Only ${result.home.textChars} characters render without JavaScript. Many AI crawlers don't execute JS, so your content may be invisible to them.`
                  : 'The homepage could not be fetched over HTTPS.'}
              </p>
            </li>
            <li>
              <span className="mono spec-id">A-04</span>
              <h3>Machine channels</h3>
              <p>
                llms.txt {result.llms?.exists ? 'published' : 'not found'} · sitemap.xml {result.sitemap?.exists ? 'present' : 'not found'}.
                {result.llms?.exists
                  ? ' Your llms.txt gives AI agents a direct instruction file — a strong citation signal.'
                  : ' Publishing an llms.txt tells AI agents what you are and which pages to trust.'}
              </p>
            </li>
            <li>
              <span className="mono spec-id">A-05</span>
              <h3>Verdict</h3>
              <p>{result.verdict}</p>
            </li>
          </ul>

          <a className="xlink" href="/problems/invisible-to-ai">
            <span className="xlink__label">// IF AI CAN'T SEE YOU</span>
            <strong>Blocked crawlers or thin schema keep you out of AI answers — see how we fix entity visibility →</strong>
          </a>
        </div>
      )}
    </div>
  );
}
