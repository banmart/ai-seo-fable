"use client";

import { useDiagnostic } from '../../../hooks/useDiagnostic';

export default function CrawlTool() {
  const { input, setInput, run, status, error, loading, result } = useDiagnostic(
    '/api/crawl-analyzer',
    '// FETCHING ROBOTS + SITEMAP(S) …'
  );

  return (
    <div>
      <form className="tool-form" onSubmit={run} aria-label="Index and crawl analyzer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="yoursite.com"
          aria-label="Domain"
          required
        />
        <button className="cta" type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Analyze →'}</button>
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
              <span>crawl & index health</span>
            </li>
            <li>
              <strong className="mono">{result.sitemap?.exists ? (result.sitemap.type === 'index' ? `${result.sitemap.childCount}` : result.sitemap.urls.toLocaleString()) : '—'}</strong>
              <span>{result.sitemap?.type === 'index' ? 'child sitemaps' : 'sitemap URLs'}</span>
            </li>
            <li>
              <strong className="mono">{result.robots?.sitemaps?.length ?? 0}</strong>
              <span>sitemaps declared in robots</span>
            </li>
          </ul>

          {result.issues.length > 0 && (
            <>
              <h3 style={{ fontFamily: 'var(--display)', margin: '1.5rem 0 0.75rem' }}>Findings</h3>
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

          <a className="xlink" href="/problems/pages-not-indexed">
            <span className="xlink__label">// RELATED PROBLEM</span>
            <strong>Pages published but not indexed? See how we recover crawl budget →</strong>
          </a>
        </div>
      )}
    </div>
  );
}
