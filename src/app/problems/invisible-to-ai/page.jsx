import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Why AI Assistants Never Mention Your Brand — and How to Fix It | GOBIYA',
  description:
    'ChatGPT, Perplexity, and Google AI Overviews answer your buyers\' questions without you. Diagnose why your brand is invisible to AI and what it takes to get cited.',
  alternates: { canonical: '/problems/invisible-to-ai' },
};

const faqs = [
  {
    q: 'Why does ChatGPT recommend my competitors but not me?',
    a: 'LLMs cite brands that exist as clear entities with consistent descriptions across the open web, and whose pages contain specific, quotable claims. If your positioning lives in a JS-rendered homepage and nowhere else, there is nothing for a model to retrieve or repeat.',
  },
  {
    q: 'Is this just SEO with a new name?',
    a: 'It overlaps but is not identical. Ranking #4 on Google can still mean zero AI citations if your content has no extractable passages. GEO optimizes for being quoted, not just listed.',
  },
  {
    q: 'How long does it take to show up in AI answers?',
    a: 'Retrieval-augmented systems (Perplexity, ChatGPT search, AI Overviews) can reflect changes in weeks because they read the live web. Training-data presence takes longer and compounds from consistent entity signals.',
  },
];

export default function InvisibleToAiPage() {
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
      <p className="kicker mono">// PROBLEM 01 — ENTITY STATE: UNRESOLVED</p>
      <h1>Your Buyers Ask AI.<br />AI Doesn't Know You Exist.</h1>
      <p className="lede">
        ChatGPT, Perplexity, and Google's AI Overviews now answer the questions your prospects
        used to type into search. When those answers name three competitors and not you, the
        deal is lost before your site gets a click.
      </p>

      <section aria-labelledby="h-symptoms">
        <h2 id="h-symptoms">The symptoms</h2>
        <ul className="proof-grid">
          <li>
            <strong className="mono">0</strong>
            <span>mentions of your brand when AI answers "best [your category]" questions</span>
          </li>
          <li>
            <strong className="mono">−30%</strong>
            <span>typical CTR erosion on queries where an AI answer appears above your ranking</span>
          </li>
          <li>
            <strong className="mono">?</strong>
            <span>AI describes your company inaccurately — or confuses you with someone else</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-causes">
        <h2 id="h-causes">Why it happens</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">D-01</span>
            <h3>No entity graph</h3>
            <p>
              Your brand has no consistent, machine-readable identity — schema, sameAs links,
              and uniform descriptions across the web. Models cannot cite what they cannot resolve.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-02</span>
            <h3>Nothing quotable</h3>
            <p>
              AI answers are assembled from specific, extractable claims with numbers and clear
              structure. Vague marketing copy gives retrieval systems nothing to lift.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-03</span>
            <h3>Invisible to AI crawlers</h3>
            <p>
              Client-rendered pages, blocked GPTBot/ClaudeBot/PerplexityBot, no llms.txt — the
              systems doing the citing may never have read your site at all.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-fix">
        <h2 id="h-fix">The resolution</h2>
        <p>
          This is an engineering problem, not a content-volume problem. We rebuild your brand as
          a resolvable entity, restructure key pages into citable passages, and open verified
          machine channels — schema graphs, llms.txt, MCP — that AI systems actually consume.
        </p>
        <a className="xlink" href="/outcomes/cited-by-ai">
          <span className="xlink__label">// OUTCOME</span>
          <strong>Cited by AI: your brand in the answer, not under it →</strong>
        </a>
        <a className="xlink" href="/tools">
          <span className="xlink__label">// DIAGNOSTIC</span>
          <strong>Run the free AI Visibility Checker (in fabrication) →</strong>
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

      <a className="cta" href="/#apex">Request Deployment Brief →</a>
    </SubpageLayout>
  );
}
