"use client";

import { useDiagnostic } from '../../../hooks/useDiagnostic';

export default function HealthScanTool() {
  const { input, setInput, run, status, error, loading, result } = useDiagnostic(
    '/api/health-scan',
    '// FETCHING PAGE + ROBOTS + PARSING …'
  );

  return (
    <div>
      <form className="tool-form" onSubmit={run} aria-label="Website health scan">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="yoursite.com/page"
          aria-label="Page URL"
          required
        />
        <button className="cta" type="submit" disabled={loading}>{loading ? 'Scanning…' : 'Run Scan →'}</button>
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
              <span>on-page health score</span>
            </li>
            <li>
              <strong className="mono">{result.issues.filter((i) => i.level === 'risk').length}</strong>
              <span>critical issues</span>
            </li>
            <li>
              <strong className="mono">{result.issues.filter((i) => i.level === 'warn').length}</strong>
              <span>optimization gaps</span>
            </li>
          </ul>

          {result.issues.length > 0 && (
            <>
              <h3 style={{ fontFamily: 'var(--display)', margin: '1.5rem 0 0.75rem' }}>Issues found</h3>
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

          <a className="xlink" href="/#apex">
            <span className="xlink__label">// WANT THESE FIXED?</span>
            <strong>We remediate every issue above and rebuild the fundamentals that rank — request a deployment brief →</strong>
          </a>
        </div>
      )}
    </div>
  );
}
