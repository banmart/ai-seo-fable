"use client";

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './DesignIdeas.css';
import '../mcp/MCPPage.css';

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

export default function DesignIdeasPage() {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('IDLE'); // IDLE | LOADING | RESULTS
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!domain || !email) return;

    setState('LOADING');
    
    // Fire and forget the contact API request
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, domain, formType: 'Design Ideas' }),
    }).catch(console.error);

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
      <Header />
      <div className="mcp-page" itemScope itemType="https://schema.org/WebPage">
        <main className="mcp-main">
          
          {state === 'IDLE' && (
            <section className="mcp-hero">
              <div className="mcp-hero-grid" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
                <div>
                  <p className="kicker mono">// GENERATIVE DESIGN ENGINE</p>
                  <h1>Premium Design Intelligence</h1>
                  <p className="mcp-hero-sub" style={{ margin: '0 auto 3rem' }}>
                    Enter your domain and email to receive state-of-the-art neuromarketing UI/UX design concepts explicitly generated for your business model.
                  </p>

                  <form className="ideas-form" onSubmit={handleSubmit}>
                    <div className="ideas-form-group">
                      <label htmlFor="domain-input" className="mono">TARGET DOMAIN</label>
                      <input 
                        id="domain-input"
                        type="text" 
                        placeholder="e.g., yourcompany.com" 
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="ideas-form-group">
                      <label htmlFor="email-input" className="mono">WORK EMAIL</label>
                      <input 
                        id="email-input"
                        type="email" 
                        placeholder="you@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <button type="submit" className="cta ideas-submit">
                      Generate Concepts →
                    </button>
                  </form>
                </div>
              </div>
            </section>
          )}

          {state === 'LOADING' && (
            <section className="mcp-section" style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div className="spinner" style={{ margin: '0 auto 2rem' }}></div>
              <p className="mcp-section-title mono" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>
                // {LOADING_MESSAGES[loadingMsgIdx]}
              </p>
            </section>
          )}

          {state === 'RESULTS' && (
            <section className="mcp-section">
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="mcp-section-title mono" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  // DESIGN ARCHITECTURE GENERATED
                </h2>
                <p className="mono" style={{ color: 'var(--text-dim)' }}>
                  TARGET: {domain.toUpperCase()}
                </p>
              </div>

              <div className="mcp-discovery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', background: 'transparent', border: 'none' }}>
                {MOCK_RESULTS.map((res) => (
                  <article key={res.id} className="mcp-discovery-card ideas-gallery-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="ideas-img-wrap">
                      <img src={res.img} alt={res.title} loading="lazy" />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <span className={`gallery-tag mono gallery-tag--${res.id}`}>
                        {res.tag}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--cyan)' }}>{res.title}</h3>
                      <p className="mcp-discovery-desc">{res.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
