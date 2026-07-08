import SubpageLayout from '../../../components/SubpageLayout';
import MidFunnelCTA from '../../../components/MidFunnelCTA';

export const metadata = {
  title: 'High Traffic, No Leads? Fix the Intent Mismatch | GOBIYA',
  description:
    'Sessions climb, pipeline stays flat. Diagnose whether you attracted the wrong intent, rank for the wrong queries, or lose visitors at a broken conversion path.',
  alternates: { canonical: '/problems/traffic-no-leads' },
};

const faqs = [
  {
    q: 'Why does my site get traffic but no conversions?',
    a: 'Usually one of three causes: the queries you rank for carry informational intent while your page asks for a commercial commitment; the traffic is topically adjacent but not from your buyer; or the conversion path itself is broken or buried. Diagnosing which one requires segmenting sessions by landing query intent, not looking at totals.',
  },
  {
    q: 'Is more traffic ever the answer?',
    a: 'Rarely. If 50,000 monthly sessions produce zero pipeline, 100,000 of the same sessions will too. Fixing the intent match on existing traffic almost always outperforms buying or ranking for more of it.',
  },
  {
    q: 'How do I know which pages attract the wrong intent?',
    a: 'Read the SERP for each page\'s main query. If Google ranks comparison articles and your page is a signup form — or vice versa — the engine has already told you what searchers want there. Pages fighting their SERP\'s page type convert poorly no matter how well they rank.',
  },
];

export default function TrafficNoLeadsPage() {
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
      <p className="kicker mono">// PROBLEM 03 — INTENT STATE: MISMATCHED</p>
      <h1>Traffic Charts Up.<br />Pipeline Flat.</h1>
      <p className="lede">
        Fifty thousand sessions a month and the sales team hears crickets. That's not a volume
        problem — it's an intent problem. You're ranking for queries your buyers don't ask, or
        answering the right query with the wrong kind of page.
      </p>

      <section aria-labelledby="h-diagnose">
        <h2 id="h-diagnose">Diagnosis sequence</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">D-01</span>
            <h3>Intent segmentation</h3>
            <p>
              Every landing page mapped to the intent of the query that feeds it. Informational
              traffic hitting commercial pages — or commercial intent landing on blog posts —
              shows up immediately as the leak.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-02</span>
            <h3>SERP page-type audit</h3>
            <p>
              For each revenue query, we read what Google actually rewards: listicles, tools,
              product pages, guides. A well-optimized page of the wrong type loses to a mediocre
              page of the right one — and converts nobody it does catch.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-03</span>
            <h3>Path forensics</h3>
            <p>
              From qualified landing to conversion event: where do buyer-intent sessions
              actually die? Often the traffic is fine and the architecture between arrival and
              action is what's broken.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-selfcheck">
        <h2 id="h-selfcheck">Check this yourself in 5 minutes</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">01</span>
            <h3>Pull your top 20 queries by clicks</h3>
            <p>
              Search Console → Performance → Queries, sorted by clicks. For each, ask: would
              someone typing this be ready to talk to sales, or just researching? A page full of
              research-stage queries won't convert like a commercial one.
            </p>
          </li>
          <li>
            <span className="mono spec-id">02</span>
            <h3>Read the SERP for your top 3 revenue queries</h3>
            <p>
              Search each in an incognito window. If the results are mostly listicles and guides
              but your page is a demo-request form, Google — and searchers — expect a different
              page type than the one you're offering there.
            </p>
          </li>
          <li>
            <span className="mono spec-id">03</span>
            <h3>Trace one session from landing to drop-off</h3>
            <p>
              In GA4, open the funnel exploration for your primary conversion event and find the
              step with the steepest drop between a high-traffic landing page and the next
              action. That's usually where architecture, not traffic volume, is the bottleneck.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-fix">
        <h2 id="h-fix">The resolution</h2>
        <p>
          Rebuild coverage around the queries your buyers actually ask, in the page formats
          those SERPs reward, with conversion paths engineered per intent tier. The metric that
          moves is qualified pipeline per thousand sessions — not sessions.
        </p>
        <a className="xlink" href="/outcomes/semantic-search-domination">
          <span className="xlink__label">// OUTCOME</span>
          <strong>Semantic search domination: own the queries that convert →</strong>
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
      <div style={{ marginTop: '1.25rem' }}><MidFunnelCTA page="/problems/traffic-no-leads" /></div>
    </SubpageLayout>
  );
}
