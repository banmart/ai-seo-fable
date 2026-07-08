import SubpageLayout from '../../../components/SubpageLayout';
import MidFunnelCTA from '../../../components/MidFunnelCTA';

export const metadata = {
  title: 'Rapid Authority Acquisition — Skip Years of Domain Building | GOBIYA',
  description:
    'The outcome: launch with the trust signals of an established site. Vetted aged-domain acquisition, clean link inheritance, and entity continuity — without the spam baggage.',
  alternates: { canonical: '/outcomes/rapid-authority-acquisition' },
};

const faqs = [
  {
    q: 'Is buying an aged domain risky?',
    a: 'Yes, if unvetted. Most aged domains for sale carry some combination of expired spam links, thin AI-generated content history, or undisclosed manual actions. The value only exists in domains that are actually clean — a minority of what gets listed for sale.',
  },
  {
    q: "How is a domain's history actually checked?",
    a: "Pull its full Wayback Machine archive to see what it was used for historically, check its backlink profile for spam patterns, and verify no manual action is attached (inferable from a sudden historical traffic collapse in third-party tools even without direct Search Console access).",
  },
];

export default function RapidAuthorityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.gobiya.com/outcomes/rapid-authority-acquisition/#page",
    "url": "https://www.gobiya.com/outcomes/rapid-authority-acquisition",
    "name": "Rapid Authority Acquisition — Skip Years of Domain Building | GOBIYA",
    "description": "The outcome: launch with the trust signals of an established site. Vetted aged-domain acquisition, clean link inheritance, and entity continuity — without the spam baggage.",
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
      <p className="kicker mono">// OUTCOME 03 — AUTHORITY STATE: ACQUIRED</p>
      <h1>Day One.<br />Year Five Authority.</h1>
      <p className="lede">
        The outcome we engineer: your project launches on a domain that already carries clean
        history, real backlinks, and archive continuity — compressing the years-long trust
        ramp that kills most new sites before they rank for anything.
      </p>

      <section aria-labelledby="h-plain">
        <h2 id="h-plain">In plain terms</h2>
        <p>
          New domains take time to earn the trust signals search engines rely on: link history,
          an indexation track record, and consistent expertise signals accumulated over years.
          Acquiring an aged domain with clean history is a shortcut around that ramp-up — but
          only if the history is actually clean. A domain with hidden manual actions or spam-link
          baggage transfers that liability to the new owner along with whatever authority it does
          carry.
        </p>
      </section>

      <section aria-labelledby="h-mechanism">
        <h2 id="h-mechanism">How it's built</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">M-01</span>
            <h3>Forensic domain vetting</h3>
            <p>
              Registration records, Wayback snapshots, dark years, and backlink provenance —
              every candidate domain is screened before acquisition. Most aged domains are
              landmines; we buy the ones that aren't.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-02</span>
            <h3>Continuity engineering</h3>
            <p>
              Legacy URLs redirected with intent, topical adjacency preserved, and the entity
              transition documented in schema — so search systems read a handover, not a hijack.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-03</span>
            <h3>Inherited-link triage</h3>
            <p>
              Every inherited backlink classified: keep, disavow, or reclaim. The authority you
              paid for is preserved; the spam that came with it is surgically removed.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-measure">
        <h2 id="h-measure">How it's measured</h2>
        <ul className="proof-grid">
          <li>
            <strong className="mono">TTI</strong>
            <span>time-to-index and time-to-first-ranking versus a cold-start baseline</span>
          </li>
          <li>
            <strong className="mono">LNK</strong>
            <span>referring domains retained through migration, net of disavowed toxicity</span>
          </li>
          <li>
            <strong className="mono">CRL</strong>
            <span>crawl frequency and depth — proof that search systems treat the site as established</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-solves">
        <h2 id="h-solves">Problems this resolves</h2>
        <a className="xlink" href="/problems/google-penalty">
          <span className="xlink__label">// PROBLEM 02</span>
          <strong>Bought a domain with baggage? Traffic fell off a cliff. →</strong>
        </a>
        <a className="xlink" href="/tools/aged-domain-lookup">
          <span className="xlink__label">// FREE DIAGNOSTIC</span>
          <strong>Vet any domain yourself — Aged Domain Lookup →</strong>
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
      <div style={{ marginTop: '1.25rem' }}><MidFunnelCTA page="/outcomes/rapid-authority-acquisition" /></div>
    </SubpageLayout>
  );
}
