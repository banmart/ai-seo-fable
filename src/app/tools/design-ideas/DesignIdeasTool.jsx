"use client";

import { useEffect, useRef, useState } from 'react';
import './DesignIdeas.css';

const LOADING_MESSAGES = [
  'Reading your domain & business model...',
  'Deriving three design directions...',
  'Generating neuromarketing layouts...',
  'Rendering premium UI mockups...',
  'Finalizing concepts (image generation takes ~30s)...',
];

export default function DesignIdeasTool() {
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('IDLE'); // IDLE | LOADING | RESULTS | ERROR
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [concepts, setConcepts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input || !email) return;

    setState('LOADING');
    setLoadingMsgIdx(0);
    timerRef.current = setInterval(
      () => setLoadingMsgIdx((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1)),
      7000
    );

    // Capture the lead in parallel — generation shouldn't wait on it.
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, domain: input, formType: 'Design Ideas' }),
    }).catch(() => { /* lead capture is best-effort */ });

    try {
      const res = await fetch('/api/design-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Generation failed. Try again shortly.');
      setConcepts(data.concepts.filter((c) => c.image));
      setState('RESULTS');
    } catch (err) {
      setErrorMsg(err.message);
      setState('ERROR');
    } finally {
      clearInterval(timerRef.current);
    }
  };

  return (
    <>
      {(state === 'IDLE' || state === 'ERROR') && (
        <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p className="kicker mono">// GENERATIVE DESIGN ENGINE</p>
          <h1>Premium Design Intelligence</h1>
          <p className="lede" style={{ marginBottom: '3rem' }}>
            Enter your domain or a few keywords and our AI reads your business, derives three design
            directions, and renders live homepage mockups — generated for you, not from a template.
          </p>

          <form className="deploy-form" onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <label htmlFor="domain-input" className="mono">DOMAIN OR KEYWORDS</label>
            <input
              id="domain-input"
              type="text"
              placeholder="e.g., yourcompany.com — or 'late-night coffee roaster'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />

            <label htmlFor="email-input" className="mono">WORK EMAIL</label>
            <input
              id="email-input"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="cta" style={{ width: '100%', marginTop: '1rem' }}>
              Generate Concepts →
            </button>
          </form>

          {state === 'ERROR' && (
            <p className="tool-status mono tool-status--error" role="status" style={{ marginTop: '1.5rem' }}>
              // ERROR — {errorMsg}
            </p>
          )}
        </section>
      )}

      {state === 'LOADING' && (
        <section style={{ textAlign: 'center', padding: '6rem 0' }}>
          <div className="spinner" style={{ margin: '0 auto 2rem' }}></div>
          <p className="mono" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--cyan)' }} role="status">
            // {LOADING_MESSAGES[loadingMsgIdx]}
          </p>
        </section>
      )}

      {state === 'RESULTS' && (
        <section>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="mono" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--cyan)' }}>
              // DESIGN ARCHITECTURE GENERATED
            </h2>
            <p className="mono" style={{ color: 'var(--text-dim)' }}>
              TARGET: {input.toUpperCase()}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {concepts.map((res, i) => (
              <article key={i} className="ideas-gallery-card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                <div className="ideas-img-wrap">
                  <img src={res.image} alt={`${res.title} — website mockup concept`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span className="gallery-tag mono" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--border)', borderRadius: '2px', display: 'inline-block', marginBottom: '1rem' }}>
                    {res.tag}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--cyan)' }}>{res.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>{res.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: '3rem' }}>
            <a className="cta" href="/#apex">Want one of these built? Request a deployment brief →</a>
            <a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a>
          </div>
        </section>
      )}
    </>
  );
}
