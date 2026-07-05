import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Semantic Search Domination — Own the Topic, Not the Keyword | GOBIYA',
  description:
    'The outcome: your site is the entity search systems resolve to for an entire topic cluster. Hub-and-spoke architecture, intent-mapped coverage, and rankings that scale.',
  alternates: { canonical: '/outcomes/semantic-search-domination' },
};

export default function SemanticSearchPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// OUTCOME 04 — TOPICAL STATE: SATURATED</p>
      <h1>Own the Topic.<br />Keywords Follow.</h1>
      <p className="lede">
        The outcome we engineer: search systems — classic and generative — resolve your site as
        the authority for an entire topic cluster, so you rank across hundreds of intent
        variations you never individually targeted.
      </p>

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

      <a className="cta" href="/#apex">Request Deployment Brief →</a>
    </SubpageLayout>
  );
}
