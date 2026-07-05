"use client";

import { useDiagnostic } from '../../../hooks/useDiagnostic';

export default function ConversionTool() {
  const { input, setInput, run, status, error, loading, result } = useDiagnostic(
    '/api/conversion-audit',
    '// FETCHING PAGE + SCANNING CONVERSION SIGNALS …'
  );

  return (
    <div>
      <form className="tool-form" onSubmit={run} aria-label="Conversion and trust audit">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="yoursite.com"
          aria-label="Page URL"
          required
        />
        <button className="cta" type="submit" disabled={loading}>{loading ? 'Auditing…' : 'Audit →'}</button>
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
              <span>conversion readiness</span>
            </li>
            <li>
              <strong className="mono">{result.signals?.ctaButtons ?? 0}</strong>
              <span>CTA buttons detected</span>
            </li>
            <li>
              <strong className="mono">{result.signals?.contact?.length ?? 0}</strong>
              <span>contact methods</span>
            </li>
          </ul>

          {result.issues.length > 0 && (
            <>
              <h3 style={{ fontFamily: 'var(--display)', margin: '1.5rem 0 0.75rem' }}>Leaks & gaps</h3>
              <ul className="tool-issues">
                {result.issues.map((i) => (
                  <li key={i.title} className={`tool-issue tool-issue--${i.level}`}>
                    <span className="tool-issue__tag mono">{i.level === 'risk' ? 'CRITICAL' : 'FIX'}</span>
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

          <a className="xlink" href="/problems/traffic-no-leads">
            <span className="xlink__label">// RELATED PROBLEM</span>
            <strong>Traffic charts up, pipeline flat? See the full diagnosis →</strong>
          </a>
        </div>
      )}
    </div>
  );
}
