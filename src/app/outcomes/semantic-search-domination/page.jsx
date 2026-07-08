import SubpageLayout from '../../../components/SubpageLayout';
import MidFunnelCTA from '../../../components/MidFunnelCTA';

export const metadata = {
  title: 'Semantic Search Domination — Own the Topic, Not the Keyword | GOBIYA',
  description:
    'The outcome: your site is the entity search systems resolve to for an entire topic cluster. Hub-and-spoke architecture, intent-mapped coverage, and rankings that scale.',
  alternates: { canonical: '/outcomes/semantic-search-domination' },
};

const faqs = [
  {
    q: "Isn't targeting more keywords always better?",
    a: "Not if it dilutes topical focus. A handful of comprehensive, well-linked pages that thoroughly cover related intents typically outperform dozens of thin pages each targeting one keyword, because Google's systems reward depth and internal-linking coherence over sheer page count.",
  },
  {
    q: 'How many pages does a topic cluster actually need?',
    a: 'It depends on how many genuinely distinct search intents exist within the topic — determined by looking at actual SERP overlap, not guessing. A cluster with 8 truly distinct spokes outperforms one with 30 near-duplicate spokes competing with each other.',
  },
];

export default function SemanticSearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.gobiya.com/outcomes/semantic-search-domination/#page",
    "url": "https://www.gobiya.com/outcomes/semantic-search-domination",
    "name": "Semantic Search Domination — Own the Topic, Not the Keyword | GOBIYA",
    "description": "The outcome: your site is the entity search systems resolve to for an entire topic cluster. Hub-and-spoke architecture, intent-mapped coverage, and rankings that scale.",
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
      <p className="kicker mono">// OUTCOME 04 — TOPICAL STATE: SATURATED</p>
      <h1>Own the Topic.<br />Keywords Follow.</h1>
      <p className="lede">
        The outcome we engineer: search systems — classic and generative — resolve your site as
        the authority for an entire topic cluster, so you rank across hundreds of intent
        variations you never individually targeted.
      </p>

      <section aria-labelledby="h-plain">
        <h2 id="h-plain">In plain terms</h2>
        <p>
          Google increasingly ranks around topics and entities, not isolated keywords — a site
          that comprehensively covers a subject, organized so each page answers one intent
          clearly and links to related coverage, tends to outrank one page trying to rank for
          many keywords at once. "Owning a topic" means Google's systems recognize the site as
          the most complete, well-organized resource for that subject.
        </p>
      </section>

      <section aria-labelledby="h-mechanism">
        <h2 id="h-mechanism">How it's built</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">M-01</span>
            <h3>SERP-derived cluster map</h3>
            <p>
              Topic clusters built from actual SERP overlap, not text similarity — pages are
              split or merged based on what Google already treats as one intent versus many.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-02</span>
            <h3>Hub-and-spoke architecture</h3>
            <p>
              Pillar pages carry the head terms; spokes capture every long-tail variant; an
              engineered internal-link matrix routes authority to the pages that need it.
              Nothing competes with itself.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-03</span>
            <h3>Quality-gated scale</h3>
            <p>
              Programmatic coverage grows only where the data supports a genuinely distinct
              page. Every spoke passes a thin-content gate before it's allowed into the index —
              scale that reads as depth, not spam.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-measure">
        <h2 id="h-measure">How it's measured</h2>
        <ul className="proof-grid">
          <li>
            <strong className="mono">COV</strong>
            <span>share of the topic's query space where you hold a top-10 position</span>
          </li>
          <li>
            <strong className="mono">IDX</strong>
            <span>indexed-to-submitted ratio — proof the architecture earns crawl budget</span>
          </li>
          <li>
            <strong className="mono">QUAL</strong>
            <span>qualified sessions per cluster, isolating intent-matched traffic from noise</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-solves">
        <h2 id="h-solves">Problems this resolves</h2>
        <a className="xlink" href="/problems/pages-not-indexed">
          <span className="xlink__label">// PROBLEM 04</span>
          <strong>You published a thousand pages. Google indexed forty. →</strong>
        </a>
        <a className="xlink" href="/problems/traffic-no-leads">
          <span className="xlink__label">// PROBLEM 03</span>
          <strong>Traffic charts up. Pipeline flat. →</strong>
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
      <div style={{ marginTop: '1.25rem' }}><MidFunnelCTA page="/outcomes/semantic-search-domination" /></div>
    </SubpageLayout>
  );
}
