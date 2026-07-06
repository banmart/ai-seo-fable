"use client";

import { useState, useEffect } from 'react';
import './AgedDomain.css';
import Tooltip from '../../../components/Tooltip';

const CHECKLIST_ITEMS = [
  "Deploying naming agents",
  "Querying the .com registry",
  "Scanning .io - .co - .net - .org",
  "Checking GoDaddy - Namecheap - Porkbun",
  "Cross-referencing 4.34B web links",
  "Scanning expired & dropped lists",
  "Screening trademarks & taken brands",
  "Scoring brandability & memorability"
];

export default function AgedDomainTool() {
  const [keyword, setKeyword] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [comOnly, setComOnly] = useState(true);
  const [status, setStatus] = useState('IDLE'); // IDLE, LOADING, COMPLETE, ERROR
  const [errorMsg, setErrorMsg] = useState('');
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  
  // Progress animation state
  const [progressIdx, setProgressIdx] = useState(0);
  const [domainsChecked, setDomainsChecked] = useState(0);

  useEffect(() => {
    let interval;
    if (status === 'LOADING') {
      interval = setInterval(() => {
        setProgressIdx(prev => Math.min(prev + 1, CHECKLIST_ITEMS.length));
        setDomainsChecked(prev => prev + Math.floor(Math.random() * 5000) + 1000);
      }, 600);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setResults(null);
    setErrorMsg('');
    setStatus('LOADING');
    setProgressIdx(0);
    setDomainsChecked(0);
    
    try {
      // Calling the proxy endpoint to avoid CORS issues
      const res = await fetch('/api/domain-lookup/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, filter: activeFilter, comOnly }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error ?? 'Lookup failed.');
      
      // Artificial delay to let the animation play a bit
      setTimeout(() => {
        setResults(data);
        setPage(1);
        setStatus('COMPLETE');
      }, 3500);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('ERROR');
    }
  };

  return (
    <div className="domain-search-container">
      <form onSubmit={handleSearch}>
        <div className="domain-search-top">
          <input
            type="text"
            className="domain-search-input"
            placeholder="Enter a keyword — coffee, wine, fitness, dev..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="cta">
            Run Scan →
          </button>
        </div>

        <div className="domain-search-bottom">
          <span className="domain-search-label">SHOW</span>
          <div className="domain-search-filters">
            <button
              type="button"
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-pill ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ai')}
            >
              ✨ AI names
            </button>
            <Tooltip text="Prefix keyword search">
              <button
                type="button"
                className={`filter-pill ${activeFilter === 'starts' ? 'active' : ''}`}
                onClick={() => setActiveFilter('starts')}
              >
                {keyword ? `${keyword}---` : 'Starts with'}
              </button>
            </Tooltip>
            <Tooltip text="Anywhere keyword search">
              <button
                type="button"
                className={`filter-pill ${activeFilter === 'contains' ? 'active' : ''}`}
                onClick={() => setActiveFilter('contains')}
              >
                {keyword ? `---${keyword}---` : 'Contains'}
              </button>
            </Tooltip>
            <Tooltip text="Suffix keyword search">
              <button
                type="button"
                className={`filter-pill ${activeFilter === 'ends' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ends')}
              >
                {keyword ? `---${keyword}` : 'Ends with'}
              </button>
            </Tooltip>
          </div>
          
          <Tooltip text="Restrict search to .com TLDs">
            <div 
              className={`toggle-container ${comOnly ? 'active' : ''}`}
              onClick={() => setComOnly(!comOnly)}
            >
              <div className={`toggle-switch ${comOnly ? 'active' : ''}`}>
                <div className="toggle-knob"></div>
              </div>
              <span className="toggle-label">.com only</span>
            </div>
          </Tooltip>
        </div>
      </form>

      {status === 'ERROR' && (
        <p className="tool-status mono tool-status--error" role="status">
          // ERROR — {errorMsg}
        </p>
      )}

      {status === 'LOADING' && (
        <div className="scanning-dashboard">
          <h2 className="scanning-huge-number">3,174,187,786</h2>
          <p className="scanning-subtitle mono">FINALIZING YOUR SHORTLIST...</p>
          
          <div className="scanning-checklist">
            {CHECKLIST_ITEMS.map((item, idx) => {
              const isChecked = idx < progressIdx;
              const isCurrent = idx === progressIdx;
              return (
                <div key={idx} className={`checklist-item ${isChecked ? 'checked' : ''} ${isCurrent ? 'current' : ''}`}>
                  <span className="checklist-icon">{isChecked ? '✓' : (isCurrent ? '⟳' : '·')}</span>
                  <span className="checklist-text">{item}</span>
                </div>
              );
            })}
          </div>
          
          <div className="scanning-stats">
            <div className="stat-box">
              <span className="stat-value">227</span>
              <span className="stat-label">AGENTS DEPLOYED</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{domainsChecked.toLocaleString()}</span>
              <span className="stat-label">DOMAINS CHECKED</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">3,174,187,786</span>
              <span className="stat-label">COMBINATIONS</span>
            </div>
          </div>
        </div>
      )}

      {status === 'COMPLETE' && results && (
        <div className="tool-result">
          {results.domains?.length > 0 && (
            <ul className="proof-grid" style={{ marginTop: '1.5rem' }}>
              <li>
                <strong className="mono">{results.available ?? results.domains.length}</strong>
                <span>available to register</span>
              </li>
              {results.checked != null && (
                <li>
                  <strong className="mono">{results.checked.toLocaleString()}</strong>
                  <span>candidates verified live against the registry</span>
                </li>
              )}
              <li>
                <strong className="mono">{(results.tlds ?? ['com']).map((t) => `.${t}`).join(' ')}</strong>
                <span>TLDs searched</span>
              </li>
              <li>
                <strong className="mono">{results.mode === 'pattern' ? (results.position ?? 'pattern').toUpperCase() : 'AI NAMES'}</strong>
                <span>search mode</span>
              </li>
            </ul>
          )}
          <ul className="tool-issues" style={{ marginTop: '1.5rem' }}>
            {results.domains?.length ? results.domains.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((domain, i) => {
              // Replace YOUR_AFFILIATE_ID with the actual ID later
              const affiliateLink = `https://www.namecheap.com/domains/registration/results/?domain=${domain.name}&affId=YOUR_AFFILIATE_ID`;
              
              return (
                <li key={domain.name} className="tool-issue tool-issue--ok">
                  <span className="tool-issue__tag">{domain.available ? 'AVAILABLE' : 'TAKEN'}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <strong>{domain.name}</strong>
                      <p>{domain.description || 'Premium entity alignment'}</p>
                    </div>
                    {domain.available && (
                      <a 
                        href={affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cta"
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', margin: 0 }}
                      >
                        Lock in Domain ↗
                      </a>
                    )}
                  </div>
                </li>
              );
            }) : (
              <li className="tool-issue tool-issue--warn">
                <span className="tool-issue__tag">NO DATA</span>
                <div>
                  <strong>No results found</strong>
                  <p>Try broadening your keyword or disabling .com only.</p>
                </div>
              </li>
            )}
          </ul>

          {results.domains?.length > PAGE_SIZE && (
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
                PAGE {page} / {Math.ceil(results.domains.length / PAGE_SIZE)}
              </span>
              <button
                type="button"
                className="cta cta--ghost mono"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
                onClick={() => setPage((p) => Math.min(Math.ceil(results.domains.length / PAGE_SIZE), p + 1))}
                disabled={page >= Math.ceil(results.domains.length / PAGE_SIZE)}
              >
                NEXT →
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
