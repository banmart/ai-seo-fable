"use client";

import { useDiagnostic } from '../../../hooks/useDiagnostic';

export default function SchemaTool() {
  const { input, setInput, run, status, error, loading, result } = useDiagnostic(
    '/api/schema-check',
    '// FETCHING PAGE + EXTRACTING JSON-LD …'
  );

  return (
    <div>
      <form className="tool-form" onSubmit={run} aria-label="Schema validator">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="yoursite.com/product"
          aria-label="Page URL"
          required
        />
        <button className="cta" type="submit" disabled={loading}>{loading ? 'Checking…' : 'Validate →'}</button>
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
              <span>structured-data score</span>
            </li>
            <li>
              <strong className="mono">{result.stats?.types ?? result.entities.length}</strong>
              <span>schema types found</span>
            </li>
            <li>
              <strong className="mono">{result.stats?.parseErrors ?? 0}</strong>
              <span>parse errors</span>
            </li>
          </ul>

          {result.detected?.length > 0 && (
            <>
              <h3 style={{ fontFamily: 'var(--display)', margin: '1.5rem 0 0.75rem' }}>Types detected</h3>
              <div>
                {result.detected.map((d, idx) => (
                  <span key={`${d.type}-${idx}`} className={`tool-flag tool-flag--${d.valid ? 'ok' : 'warn'}`}>
                    {d.type}{d.valid ? '' : ` ⚠ missing ${d.missing.join(', ')}`}
                  </span>
                ))}
              </div>
            </>
          )}

          {result.issues.length > 0 && (
            <>
              <h3 style={{ fontFamily: 'var(--display)', margin: '1.5rem 0 0.75rem' }}>Issues & opportunities</h3>
              <ul className="tool-issues">
                {result.issues.map((i) => (
                  <li key={i.title} className={`tool-issue tool-issue--${i.level}`}>
                    <span className="tool-issue__tag mono">{i.level === 'risk' ? 'CRITICAL' : 'GAP'}</span>
                    <div>
                      <strong>{i.title}</strong>
                      <p>{i.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mono" style={{ marginTop: '1.5rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            // VERDICT — {result.verdict}
          </p>

          <a className="xlink" href="/outcomes/cited-by-ai">
            <span className="xlink__label">// WHY THIS MATTERS</span>
            <strong>Clean entity schema is how AI systems learn who you are — see how we engineer citations →</strong>
          </a>
        </div>
      )}
    </div>
  );
}
