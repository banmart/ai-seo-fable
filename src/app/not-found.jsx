"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import WarpedLines from '../components/WarpedLines';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <main className="subpage not-found-page">
        <WarpedLines />
        <div className="subpage__col" style={{ position: 'relative', zIndex: 10 }}>
          
          <div className="nf-icon-container">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>

          <span className="nf-kicker">404 — Page not found</span>
          <h1 className="nf-title">Entity Drift Detected</h1>
          
          <p className="nf-copy">
            The page you are looking for does not exist or has been relocated within our search ecosystem. Let's get you back on track.
          </p>

          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-line">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m4 17 6-6-6-6M12 19h8" />
                </svg>
                Gobiya Diagnostic Console v1.0.4
              </div>
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            
            <div className="terminal-body" style={{ minHeight: '80px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--cyan)' }}>&gt;</span>
                {processing ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1.5s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span style={{ color: '#00d97e' }}>Drift recovered. Redirect paths available.</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="nf-btn-container">
            <Link href="/" className="cta cta--ghost">
              Return to Safety
            </Link>
            <Link href="/mcp" className="cta">
              View MCP Capabilities
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
