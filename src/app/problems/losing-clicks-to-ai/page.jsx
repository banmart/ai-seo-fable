import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'AI Overviews Eating Your Clicks? Rankings Flat, Traffic Down | GOBIYA',
  description:
    'Positions unchanged, CTR collapsing — AI Overviews answer the query before anyone scrolls to you. Diagnose the exposure and convert the shift into cited visibility.',
  alternates: { canonical: '/problems/losing-clicks-to-ai' },
};

const faqs = [
  {
    q: 'My rankings are stable but traffic keeps dropping. Why?',
    a: "If impressions hold while clicks fall, the SERP itself changed above you. AI Overviews and other answer surfaces satisfy the query before users reach position one — you kept your rank and lost the click. Compare CTR by query over time in Search Console to confirm.",
  },
  {
    q: 'Should I block AI crawlers to stop this?',
    a: "Blocking doesn't restore the clicks — the AI answer still appears, just built from competitors who remained crawlable. Blocking removes you from the answer while the answer keeps taking the traffic. The defensible position is being the cited source, not being absent.",
  },
  {
    q: 'Which queries are most exposed to AI Overviews?',
    a: 'Informational and comparison queries with a consensus answer are hit hardest. Queries requiring a tool, a transaction, or a current interaction retain clicks better. An exposure audit segments your traffic by that risk so you defend the right pages first.',
  },
];

export default function LosingClicksToAiPage() {
  const jsonLd = {
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
      <p className="kicker mono">// PROBLEM 05 — CTR STATE: INTERCEPTED</p>
      <h1>Still Ranking #1.<br />Nobody Arrives.</h1>
      <p className="lede">
        The AI Overview answers the question before anyone scrolls. Your position didn't move —
        the click evaporated above it. This traffic doesn't come back; it converts into a new
        contest over who the AI answer cites.
      </p>

      <section aria-labelledby="h-diagnose">
        <h2 id="h-diagnose">Diagnosis sequence</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">D-01</span>
            <h3>CTR decay isolation</h3>
            <p>
              Impressions versus clicks, per query, across time. Stable impressions with
              collapsing CTR fingerprints answer-surface interception — and tells you exactly
              which queries are bleeding.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-02</span>
            <h3>Exposure classification</h3>
            <p>
              Each affected query graded by how fully an AI answer can satisfy it. Consensus
              informational queries are lost causes for clicks; nuanced, tool-shaped, and
              transactional queries are defensible ground.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-03</span>
            <h3>Citation audit</h3>
            <p>
              For the queries where an AI answer now stands, who does it cite? If the answer is
              built from your competitors' pages, you're supplying the audience and they're
              collecting the attribution.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-fix">
        <h2 id="h-fix">The resolution</h2>
        <p>
          Two moves, run together: restructure exposed pages into the citable sources the AI
          answer is built from — capturing the mention, the link, and the brand impression —
          and shift click expectations toward the defensible query classes AI can't satisfy.
          The KPI stops being raw clicks and becomes presence in the answer.
        </p>
        <a className="xlink" href="/outcomes/cited-by-ai">
          <span className="xlink__label">// OUTCOME</span>
          <strong>Cited by AI: in the answer, not under it →</strong>
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
    </SubpageLayout>
  );
}
