import SubpageLayout from '../../../components/SubpageLayout';
import MidFunnelCTA from '../../../components/MidFunnelCTA';

export const metadata = {
  title: 'Get Your Brand Cited by ChatGPT, Perplexity & AI Overviews | GOBIYA',
  description:
    'The outcome: when buyers ask AI assistants category questions, your brand is in the answer. Entity engineering, citable content architecture, and verified machine channels.',
  alternates: { canonical: '/outcomes/cited-by-ai' },
};

const faqs = [
  {
    q: 'What actually makes a passage "citable" to an AI model?',
    a: 'A citable passage answers one specific question directly, names its subject clearly, and includes a verifiable fact — a number, a date, a named example. Vague claims ("industry-leading") get paraphrased or dropped; specific claims get quoted.',
  },
  {
    q: 'Does ranking #1 on Google guarantee an AI citation?',
    a: "No. AI Overviews, ChatGPT, and Perplexity draw from whichever pages best answer the underlying question, which isn't always the page ranking #1. A page can rank well and still be paraphrased around it because it lacks a clean, quotable answer.",
  },
];

export default function CitedByAiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.gobiya.com/outcomes/cited-by-ai/#page",
    "url": "https://www.gobiya.com/outcomes/cited-by-ai",
    "name": "Get Your Brand Cited by ChatGPT, Perplexity & AI Overviews | GOBIYA",
    "description": "The outcome: when buyers ask AI assistants category questions, your brand is in the answer. Entity engineering, citable content architecture, and verified machine channels.",
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
      <p className="kicker mono">// OUTCOME 01 — CITATION STATE: ACTIVE</p>
      <h1>In the Answer.<br />Not Under It.</h1>
      <p className="lede">
        The outcome we engineer: when a buyer asks ChatGPT, Perplexity, or Google's AI Overviews
        who solves their problem, your brand is named, described accurately, and linked — while
        competitors fight over the shrinking list of blue links below.
      </p>

      <section aria-labelledby="h-plain">
        <h2 id="h-plain">In plain terms</h2>
        <p>
          AI search tools answer questions by retrieving and summarizing content from the web —
          they can only quote a source that's crawlable, machine-readable as a clear entity, and
          written as extractable facts rather than vague marketing copy. Between two similar
          brands, the one an AI cites is usually the one whose site answers the question
          directly and identifies itself unambiguously, not necessarily the "better" one.
        </p>
      </section>

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
      <div style={{ marginTop: '1.25rem' }}><MidFunnelCTA page="/outcomes/cited-by-ai" /></div>
    </SubpageLayout>
  );
}
