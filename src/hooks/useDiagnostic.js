"use client";

import { useState } from 'react';

/* Shared client logic for the diagnostic tools: input state, POST to the tool's
   endpoint, and status/error handling. Each tool renders its own result body. */
export function useDiagnostic(endpoint, probingText) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function run(e) {
    e.preventDefault();
    setResult(null);
    setError(false);
    setLoading(true);
    setStatus(probingText);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input, domain: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Scan failed.');
      setResult(data);
      setStatus('// SCAN COMPLETE');
    } catch (err) {
      setError(true);
      setStatus(`// ERROR — ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return { input, setInput, run, status, error, loading, result };
}
