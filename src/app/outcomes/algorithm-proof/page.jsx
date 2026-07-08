import SubpageLayout from '../../../components/SubpageLayout';
import MidFunnelCTA from '../../../components/MidFunnelCTA';

export const metadata = {
  title: 'Algorithm-Proof Growth — Survive Every Core Update | GOBIYA',
  description:
    'The outcome: organic growth that core updates strengthen instead of punish. Structural quality signals, clean link inheritance, and update-resilient architecture.',
  alternates: { canonical: '/outcomes/algorithm-proof' },
};

const faqs = [
  {
    q: 'Do core updates target specific sites?',
    a: "No. Core updates change how Google's systems weigh signals sitewide, then every site gets reprocessed against the new weighting. There's no manual targeting — sites that move did so because the new weighting values something they do or don't have.",
  },
  {
    q: 'How would I know in advance if my site is vulnerable to the next update?',
    a: 'Look for the patterns updates have repeatedly punished: thin or templated content, content written primarily for search engines rather than readers, and reliance on manipulative link patterns. A site with none of those has historically been far more stable across updates.',
  },
];

export default function AlgorithmProofPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.gobiya.com/outcomes/algorithm-proof/#page",
    "url": "https://www.gobiya.com/outcomes/algorithm-proof",
    "name": "Algorithm-Proof Growth — Survive Every Core Update | GOBIYA",
    "description": "The outcome: organic growth that core updates strengthen instead of punish. Structural quality signals, clean link inheritance, and update-resilient architecture.",
    "isPartOf": { "@id": "https://www.gobiya.com/#website" }
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <p className="kicker mono">// OUTCOME 02 — STABILITY STATE: HARDENED</p>
      <h1>Updates Ship.<br />Your Traffic Doesn't Flinch.</h1>
      <p className="lede">
        The outcome we engineer: a site whose quality signals are structural — so each core
        update reappraises you upward while competitors ride the rollercoaster.
      </p>

      <section aria-labelledby="h-plain">
        <h2 id="h-plain">In plain terms</h2>
        <p>
          Core updates don't punish sites directly — Google periodically re-runs its quality
          assessment across the whole web, and sites that were only ever ranking-adjacent (thin
          content propped up by links, or tricks that worked under an older assessment) get
          reappraised downward. A site built on structural quality — genuine expertise on every
          page, a clean link and domain history, content that would still be useful with the SEO
          stripped away — has nothing for a reappraisal to catch.
        </p>
      </section>

      <section aria-labelledby="h-mechanism">
        <h2 id="h-mechanism">How it's built</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">M-01</span>
            <h3>Clean inheritance</h3>
            <p>
              Domain history audited, toxic links disavowed, thin and duplicative content
              consolidated. Nothing in the foundation for an update to punish.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-02</span>
            <h3>Structural quality signals</h3>
            <p>
              Entity-first architecture, demonstrable expertise on every indexable page, and
              programmatic sections quality-gated so scale never reads as spam.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-03</span>
            <h3>Update telemetry</h3>
            <p>
              Baselines captured before every announced update; drift measured after. When
              something moves, we know what and why within days — not quarters.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-solves">
        <h2 id="h-solves">Problems this resolves</h2>
        <a className="xlink" href="/problems/google-penalty">
          <span className="xlink__label">// PROBLEM 02</span>
          <strong>Traffic didn't dip. It fell off a cliff. →</strong>
        </a>
        <a className="xlink" href="/tools/aged-domain-lookup">
          <span className="xlink__label">// FREE DIAGNOSTIC</span>
          <strong>Check what your domain is carrying — Aged Domain Lookup →</strong>
        </a>
      </section>

      <section aria-labelledby="h-faq">
        <h2 id="h-faq">FAQ</h2>
        <ul className="faq">
          {faqs.map(({ q, a }) => (
            <li key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}><a className="cta" href="/#apex">Request Deployment Brief →</a><a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a></div>
      <div style={{ marginTop: '1.25rem' }}><MidFunnelCTA page="/outcomes/algorithm-proof" /></div>
    </SubpageLayout>
  );
}
