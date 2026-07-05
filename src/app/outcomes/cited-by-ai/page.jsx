import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Get Your Brand Cited by ChatGPT, Perplexity & AI Overviews | GOBIYA',
  description:
    'The outcome: when buyers ask AI assistants category questions, your brand is in the answer. Entity engineering, citable content architecture, and verified machine channels.',
  alternates: { canonical: '/outcomes/cited-by-ai' },
};

export default function CitedByAiPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// OUTCOME 01 — CITATION STATE: ACTIVE</p>
      <h1>In the Answer.<br />Not Under It.</h1>
      <p className="lede">
        The outcome we engineer: when a buyer asks ChatGPT, Perplexity, or Google's AI Overviews
        who solves their problem, your brand is named, described accurately, and linked — while
        competitors fight over the shrinking list of blue links below.
      </p>

      <section aria-labelledby="h-mechanism">
        <h2 id="h-mechanism">How it's built</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">M-01</span>
            <h3>Entity resolution layer</h3>
            <p>
              A complete schema graph — Organization, Service, Person, sameAs — plus consistent
              brand descriptions everywhere your company appears. AI systems stop guessing who
              you are because the answer is machine-readable.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-02</span>
            <h3>Citable passage architecture</h3>
            <p>
              Key pages restructured into specific, extractable claims: numbers, definitions,
              clear headings. Retrieval systems quote what is quotable — so we make your
              strongest claims the easiest ones to lift.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-03</span>
            <h3>Machine channels, open</h3>
            <p>
              AI crawlers verified and unblocked, llms.txt published, and an MCP server exposing
              your offer directly to AI agents — the same channel this site runs at{' '}
              <a href="/mcp" style={{ color: 'var(--cyan)' }}>/mcp</a>.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-measure">
        <h2 id="h-measure">How it's measured</h2>
        <ul className="proof-grid">
          <li>
            <strong className="mono">CITE%</strong>
            <span>share of category prompts where your brand is mentioned, tracked monthly across ChatGPT, Perplexity, and AI Overviews</span>
          </li>
          <li>
            <strong className="mono">ACC</strong>
            <span>accuracy of AI descriptions of your brand — no hallucinated positioning</span>
          </li>
          <li>
            <strong className="mono">REF</strong>
            <span>referral sessions from AI surfaces, isolated in analytics</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-solves">
        <h2 id="h-solves">Problems this resolves</h2>
        <a className="xlink" href="/problems/invisible-to-ai">
          <span className="xlink__label">// PROBLEM 01</span>
          <strong>Your buyers ask AI. AI doesn't know you exist. →</strong>
        </a>
        <a className="xlink" href="/problems/losing-clicks-to-ai">
          <span className="xlink__label">// PROBLEM 05</span>
          <strong>Still ranking #1. Nobody arrives. →</strong>
        </a>
      </section>

      <a className="cta" href="/#apex">Request Deployment Brief →</a>
    </SubpageLayout>
  );
}
