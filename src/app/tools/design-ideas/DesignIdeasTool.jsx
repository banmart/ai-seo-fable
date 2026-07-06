"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
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
  const [expanded, setExpanded] = useState(null); // concept shown in the lightbox
  const timerRef = useRef(null);
  const resultsRef = useRef(null);
  const lightboxRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  // Close the lightbox on Escape; zoom it open with GSAP
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => { if (e.key === 'Escape') setExpanded(null); };
    window.addEventListener('keydown', onKey);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && lightboxRef.current) {
      gsap.from(lightboxRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' });
      gsap.from(lightboxRef.current.querySelector('img'), { scale: 0.92, duration: 0.35, ease: 'power3.out' });
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

  // Stagger the concept cards in once results render
  useEffect(() => {
    if (state !== 'RESULTS' || !resultsRef.current) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = resultsRef.current.querySelectorAll('.ideas-gallery-card');
    gsap.from(cards, {
      y: 44,
      opacity: 0,
      scale: 0.97,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.18,
      clearProps: 'all',
    });
  }, [state]);

  const downloadName = (title) =>
    `gobiya-design-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`;

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

          <div ref={resultsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {concepts.map((res, i) => (
              <article key={i} className="ideas-gallery-card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                {/* Faux browser chrome — frames the render like a live site */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.9rem', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
                  <span className="mono" style={{ marginLeft: '0.75rem', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.08em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {res.title.toLowerCase().replace(/[^a-z0-9]+/g, '')}.concept
                  </span>
                </div>
                <div className="ideas-img-wrap" style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setExpanded(res)}
                    title="Click to expand to full view"
                    aria-label={`Expand ${res.title} mockup to full view`}
                    style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'zoom-in' }}
                  >
                    <img src={res.image} alt={`${res.title} — website mockup concept`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </button>
                  <a
                    href={res.image}
                    download={downloadName(res.title)}
                    title="Download this mockup as PNG"
                    onClick={(e) => e.stopPropagation()}
                    className="cta cta--ghost mono"
                    style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', padding: '0.4rem 0.8rem', fontSize: '0.7rem', background: 'rgba(0,0,0,0.65)' }}
                  >
                    ↓ PNG
                  </a>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                    <span className="gallery-tag mono" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--border)', borderRadius: '2px' }}>
                      {res.tag}
                    </span>
                    {res.palette?.length > 0 && (
                      <span style={{ display: 'flex', gap: '0.35rem' }} aria-label="Concept color palette">
                        {res.palette.map((hex) => (
                          <span key={hex} title={hex} style={{ width: 16, height: 16, borderRadius: '50%', background: hex, border: '1px solid rgba(255,255,255,0.25)' }} />
                        ))}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--cyan)' }}>{res.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>{res.desc}</p>
                  {res.fonts && (
                    <p className="mono" style={{ marginTop: '0.9rem', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      TYPE — {res.fonts}
                    </p>
                  )}
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

      {expanded && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${expanded.title} — full view`}
          onClick={() => setExpanded(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'zoom-out',
          }}
        >
          <img
            src={expanded.image}
            alt={`${expanded.title} — full-size website mockup`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '78vh', width: 'auto', height: 'auto', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'default' }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', cursor: 'default' }}
          >
            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              {expanded.title.toUpperCase()}
            </span>
            <a
              className="cta mono"
              href={expanded.image}
              download={downloadName(expanded.title)}
              title="Download this mockup as PNG"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}
            >
              ↓ DOWNLOAD PNG
            </a>
            <button
              type="button"
              className="cta cta--ghost mono"
              onClick={() => setExpanded(null)}
              title="Close full view (Esc)"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}
            >
              ✕ CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
