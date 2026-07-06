"use client";

import { useState } from 'react';
import './DesignIdeas.css';

const MOCK_RESULTS = [
  {
    id: 'saas',
    title: 'B2B Analytics Dashboard',
    desc: 'Dark mode glassmorphism with neon accents, optimized for complex data visualization and low cognitive load.',
    tag: 'SAAS',
    img: '/assets/images/mockup_saas_1783173139879.png',
  },
  {
    id: 'agency',
    title: 'Futuristic Agency Landing',
    desc: 'Deep space aesthetic with vibrant cyan/orange neuromarketing triggers, built to maximize lead generation.',
    tag: 'AGENCY',
    img: '/assets/images/mockup_agency_1783173152126.png',
  },
  {
    id: 'ecom',
    title: 'Luxury Storefront',
    desc: 'Minimalist high-end commerce interface emphasizing product imagery and seamless checkout flows.',
    tag: 'E-COMMERCE',
    img: '/assets/images/mockup_ecommerce_1783173164618.png',
  },
];

const LOADING_MESSAGES = [
  'Connecting to entity graph...',
  'Analyzing domain authority...',
  'Generating neuromarketing layouts...',
  'Rendering premium UI mockups...',
];

export default function DesignIdeasTool() {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('IDLE'); // IDLE | LOADING | RESULTS
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!domain || !email) return;

    setState('LOADING');
    
    // Fallback to mailto instead of Resend API
    const subject = encodeURIComponent('Design Ideas Request');
    const body = encodeURIComponent(`Form: Design Ideas\nEmail: ${email}\nDomain: ${domain}`);
    window.location.href = `mailto:banmart@gmail.com?subject=${subject}&body=${body}`;

    // Simulate multi-step AI generation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= LOADING_MESSAGES.length) {
        clearInterval(interval);
        setState('RESULTS');
      } else {
        setLoadingMsgIdx(step);
      }
    }, 1200);
  };

  return (
    <>
      {state === 'IDLE' && (
        <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p className="kicker mono">// GENERATIVE DESIGN ENGINE</p>
          <h1>Premium Design Intelligence</h1>
          <p className="lede" style={{ marginBottom: '3rem' }}>
            Enter your domain and email to receive state-of-the-art neuromarketing UI/UX design concepts explicitly generated for your business model.
          </p>

          <form className="deploy-form" onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <label htmlFor="domain-input" className="mono">TARGET DOMAIN</label>
            <input 
              id="domain-input"
              type="text" 
              placeholder="e.g., yourcompany.com" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
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
        </section>
      )}

      {state === 'LOADING' && (
        <section style={{ textAlign: 'center', padding: '6rem 0' }}>
          <div className="spinner" style={{ margin: '0 auto 2rem' }}></div>
          <p className="mono" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--cyan)' }}>
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
              TARGET: {domain.toUpperCase()}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {MOCK_RESULTS.map((res) => (
              <article key={res.id} className="ideas-gallery-card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                <div className="ideas-img-wrap">
                  <img src={res.img} alt={res.title} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span className={`gallery-tag mono gallery-tag--${res.id}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--border)', borderRadius: '2px', display: 'inline-block', marginBottom: '1rem' }}>
                    {res.tag}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--cyan)' }}>{res.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>{res.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
