import { useState } from 'react';

/* Zones — five scroll-scrub sections */

function ZoneChaos() {
  return (
    <section id="chaos" className="zone" data-zone="1" aria-labelledby="h-chaos">
      <div className="zone__pin">
        <p className="kicker mono">// ZONE 01 — SURFACE STATE: UNSTRUCTURED</p>
        <h1 id="h-chaos">
          Stop Guessing.<br />Command the Algorithm.
        </h1>
        <p className="lede">
          GOBIYA architects programmatic search ecosystems for high-growth enterprises.
          Search is not a channel. It is infrastructure — and infrastructure is engineered, not guessed.
        </p>
        <a className="cta cta--ghost" href="#integration">Initiate Descent ↓</a>
      </div>
    </section>
  );
}

function ZoneIntegration() {
  return (
    <section id="integration" className="zone" data-zone="2" aria-labelledby="h-integration">
      <div className="zone__pin">
        <p className="kicker mono">// ZONE 02 — SEMANTIC LAYER: ONLINE</p>
        <h2 id="h-integration">Entity-First Indexing Architecture</h2>
        <p className="lede">
          Legacy keyword stuffing is dead weight. We model your domain as a machine-readable
          entity graph — the structure crawlers and LLMs actually resolve.
        </p>
        <ul className="proof-grid">
          <li>
            <strong className="mono">100%</strong>
            <span>schema coverage across every indexable node</span>
          </li>
          <li>
            <strong className="mono">×3.7</strong>
            <span>median entity-recognition lift post-deployment</span>
          </li>
          <li>
            <strong className="mono">&lt;28d</strong>
            <span>to full semantic-layer integration</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ZoneConversion() {
  return (
    <section id="conversion" className="zone" data-zone="3" aria-labelledby="h-conversion">
      <div className="zone__pin">
        <p className="kicker mono">// ZONE 03 — BEHAVIORAL ARCHITECTURE: MAPPED</p>
        <h2 id="h-conversion">Traffic Is Input. Conversion Is Output.</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">S-01</span>
            <h3>Neuromarketing Layout Design</h3>
            <p>Visual hierarchies engineered against attention data — not aesthetic preference.</p>
          </li>
          <li>
            <span className="mono spec-id">S-02</span>
            <h3>Frictionless UI/UX Pathways</h3>
            <p>Every interaction audited for cognitive load. Decision points reduced to intent.</p>
          </li>
          <li>
            <span className="mono spec-id">S-03</span>
            <h3>Programmatic Landing Page Scale</h3>
            <p>Thousands of intent-matched pages generated, deduplicated, and quality-gated from one system.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ZoneScale() {
  return (
    <section id="scale" className="zone" data-zone="4" aria-labelledby="h-scale">
      <div className="zone__pin">
        <p className="kicker mono">// ZONE 04 — PIPELINE STATE: BRANCHING</p>
        <h2 id="h-scale">Structural Growth. Measured.</h2>
        <dl className="stat-grid">
          <div>
            <dt className="mono">ORGANIC TRAFFIC</dt>
            <dd><span className="stat" data-count="412">0</span>%</dd>
            <dd className="stat-note">median 12-month growth, B2B SaaS cohort</dd>
          </div>
          <div>
            <dt className="mono">CONVERSION LIFT</dt>
            <dd><span className="stat" data-count="188">0</span>%</dd>
            <dd className="stat-note">post behavioral-architecture rebuild</dd>
          </div>
          <div>
            <dt className="mono">ALGORITHMIC STABILITY</dt>
            <dd><span className="stat" data-count="97">0</span>.4</dd>
            <dd className="stat-note">core-update resilience index / 100</dd>
          </div>
          <div>
            <dt className="mono">INDEXED PAGES</dt>
            <dd><span className="stat" data-count="240">0</span>K</dd>
            <dd className="stat-note">programmatic pages deployed &amp; ranking</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function ZoneApex() {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Fallback to mailto instead of Resend API
    const subject = encodeURIComponent('Deployment Brief Request');
    const body = encodeURIComponent(`Form: Deployment Brief\nEmail: ${email}\nDomain: ${domain}`);
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:banmart@gmail.com?subject=${subject}&body=${body}`;
    mailtoLink.click();
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setDomain('');
    }, 1000);
  };

  return (
    <section id="apex" className="zone zone--apex" data-zone="5" aria-labelledby="h-apex">
      <div className="zone__pin">
        <p className="kicker mono">// ZONE 05 — REVENUE ENGINE: STABLE</p>
        <h2 id="h-apex">Inquire for Core Architecture Deployment</h2>
        <p className="lede">
          Engagements are limited. We deploy for organizations where search is a revenue system,
          not a marketing line item.
        </p>
        
        {status === 'success' ? (
          <div className="deploy-form" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <h3 style={{ color: 'var(--cyan)' }}>// TRANSMISSION PREPARED</h3>
            <p>Your email client should have opened to complete the request.</p>
          </div>
        ) : (
          <form className="deploy-form" onSubmit={handleSubmit} aria-label="Discovery inquiry">
            <label className="mono" htmlFor="f-email">WORK EMAIL</label>
            <input 
              id="f-email" 
              name="email" 
              type="email" 
              required 
              autoComplete="email" 
              placeholder="you@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            
            <label className="mono" htmlFor="f-domain">PRIMARY DOMAIN</label>
            <input 
              id="f-domain" 
              name="domain" 
              type="url" 
              required 
              placeholder="https://" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={status === 'loading'}
            />
            
            <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button className="cta" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'PREPARING...' : 'Request Deployment Brief →'}
              </button>
              <a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a>
            </div>
            
            {status === 'error' && (
              <p style={{ color: 'var(--alert)', marginTop: '1rem', fontSize: '0.9rem' }}>
                Transmission failed. Please try again or email us directly.
              </p>
            )}
          </form>
        )}
        
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-start' }}>
          <a className="cta cta--ghost" href="/about/steve-martin" style={{ textDecoration: 'none' }}>
            Learn about Steve Martin →
          </a>
        </div>
      </div>
    </section>
  );
}

export { ZoneChaos, ZoneIntegration, ZoneConversion, ZoneScale, ZoneApex };
