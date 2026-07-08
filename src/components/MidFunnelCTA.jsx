"use client";

import { useState } from 'react';

/* MidFunnelCTA — lightweight "email me this diagnosis" option for
   consideration-stage visitors not ready for a full deployment brief. */
export default function MidFunnelCTA({ page }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, domain: page, formType: 'Email Me This Diagnosis' }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="mono" style={{ fontSize: '0.8rem', color: 'var(--cyan)' }}>
        // Sent — check your inbox for this diagnosis.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Email me this diagnosis"
      style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}
    >
      <label htmlFor={`midfunnel-email-${page}`} className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
        Not ready to talk?
      </label>
      <input
        id={`midfunnel-email-${page}`}
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        style={{ maxWidth: '220px' }}
      />
      <button
        type="submit"
        className="cta cta--ghost mono"
        disabled={status === 'loading'}
        style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
      >
        {status === 'loading' ? 'Sending...' : 'Email me this diagnosis →'}
      </button>
      {status === 'error' && (
        <span style={{ color: 'var(--alert)', fontSize: '0.75rem' }}>Failed — try again.</span>
      )}
    </form>
  );
}
