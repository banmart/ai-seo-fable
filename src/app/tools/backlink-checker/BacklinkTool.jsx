"use client";

import { useState } from 'react';

const QUOTA_KEY = 'gobiya-backlink-searches';
const QUOTA_LIMIT = 3;
const QUOTA_WINDOW = 24 * 60 * 60 * 1000;
const MAX_ROWS = 25;
const PAGE_SIZE = 8;

/* Client-side quota: timestamps of successful searches in the last 24h,
   persisted in localStorage. */
function recentSearches() {
  try {
    const raw = JSON.parse(localStorage.getItem(QUOTA_KEY) ?? '[]');
    return raw.filter((t) => Date.now() - t < QUOTA_WINDOW);
  } catch {
    return [];
  }
}

function recordSearch(list) {
  try {
    localStorage.setItem(QUOTA_KEY, JSON.stringify([...list, Date.now()]));
  } catch {
    /* storage unavailable — quota simply not enforced */
  }
}

export default function BacklinkTool() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [searchesLeft, setSearchesLeft] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const used = recentSearches();
    if (used.length >= QUOTA_LIMIT) {
      const nextAt = new Date(used[0] + QUOTA_WINDOW);
      setError(true);
      setStatus(`// ERROR — Daily limit reached (${QUOTA_LIMIT} searches / 24h). Next search available ${nextAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`);
      return;
    }

    setResults(null);
    setError(false);
    setLoading(true);
    setStatus('// TRAVERSING 4.3B-EDGE LINK GRAPH …');

    try {
      const res = await fetch('/api/backlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Lookup failed.');
      recordSearch(used);
      setSearchesLeft(QUOTA_LIMIT - used.length - 1);
      setResults(data);
      setPage(1);
      setStatus('// SCAN COMPLETE');
    } catch (err) {
      setError(true);
      setStatus(`// ERROR — ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const linkers = (results?.linkers ?? []).slice(0, MAX_ROWS);
  const totalPages = Math.ceil(linkers.length / PAGE_SIZE);

  return (
    <div>
      <form className="tool-form" onSubmit={handleSubmit} aria-label="Backlink checker">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="stripe.com"
          aria-label="Domain to check"
          required
        />
        <button className="cta" type="submit" disabled={loading}>
          {loading ? 'Scanning…' : 'Check Backlinks →'}
        </button>
      </form>
      <p className={`tool-status mono${error ? ' tool-status--error' : ''}`} role="status">{status}</p>

      {results && (
        <div className="tool-result">
          <ul className="proof-grid">
            <li>
              <strong className="mono">{results.score != null ? results.score : '—'}</strong>
              <span>authority score (0–100)</span>
            </li>
            <li>
              <strong className="mono">{results.referringDomains.toLocaleString()}</strong>
              <span>referring domains</span>
            </li>
            <li>
              <strong className="mono">{results.totalInlinks.toLocaleString()}</strong>
              <span>total inbound links</span>
            </li>
          </ul>

          <ul className="tool-issues" style={{ marginTop: '1.5rem' }}>
            {linkers.length ? linkers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((l, i) => (
              <li key={l.source} className="tool-issue tool-issue--ok">
                <span className="tool-issue__tag mono">#{(page - 1) * PAGE_SIZE + i + 1}</span>
                <div>
                  <strong>{l.source}</strong>
                  <p>
                    Linker authority {l.authority != null ? l.authority.toLocaleString() : '—'}
                    {l.linksOut != null ? ` · ${l.linksOut.toLocaleString()} outbound links` : ''}
                  </p>
                </div>
              </li>
            )) : (
              <li className="tool-issue tool-issue--warn">
                <span className="tool-issue__tag">NO DATA</span>
                <div>
                  <strong>No linking domains found</strong>
                  <p>
                    The domain has no referring domains in the current Common Crawl graph snapshot.
                    New sites and sites behind aggressive bot-blocking often show up empty.
                  </p>
                </div>
              </li>
            )}
          </ul>

          {totalPages > 1 && (
            <nav aria-label="Result pages" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
              <button
                type="button"
                className="cta cta--ghost mono"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← PREV
              </button>
              <span className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
                PAGE {page} / {totalPages}
              </span>
              <button
                type="button"
                className="cta cta--ghost mono"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                NEXT →
              </button>
            </nav>
          )}

          <p className="mono" style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            // TOP {linkers.length} LINKERS BY AUTHORITY — COMMON CRAWL SNAPSHOT, NOT LIVE MONITORING
            {searchesLeft != null ? ` — ${searchesLeft} SEARCH${searchesLeft === 1 ? '' : 'ES'} LEFT TODAY` : ''}
          </p>
        </div>
      )}
    </div>
  );
}
