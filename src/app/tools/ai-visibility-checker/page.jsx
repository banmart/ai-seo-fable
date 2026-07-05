import SubpageLayout from '../../../components/SubpageLayout';
import AIVisibilityTool from './AIVisibilityTool';

export const metadata = {
  title: 'Free AI Visibility Checker — Can ChatGPT & Perplexity See You? | GOBIYA',
  description:
    "Check whether AI crawlers can reach your site, whether your homepage is machine-legible, and whether you've published the signals AI assistants use to cite you. Free, no signup.",
  alternates: { canonical: '/tools/ai-visibility-checker' },
};

const faqs = [
  {
    q: 'What does this tool actually check?',
    a: "It fetches your robots.txt and tests whether the major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and others) are allowed or blocked; checks for an llms.txt and sitemap.xml; and parses your homepage's raw HTML for title, meta description, H1, JSON-LD entity schema, and how much text renders without JavaScript. These are the accessibility signals that gate whether AI systems can read and cite you at all.",
  },
  {
    q: 'Why does blocking GPTBot or ClaudeBot matter?',
    a: "If you disallow an AI crawler in robots.txt, that assistant cannot fetch your pages to ground its answers in your content. Blocking is a common accidental cause of AI invisibility — a well-meaning rule copied from a template can quietly remove you from ChatGPT search, Perplexity, and AI Overviews.",
  },
  {
    q: "My site scores low but ranks fine on Google. How?",
    a: "Traditional Google ranking and AI citation are different games. Googlebot renders JavaScript; many AI crawlers don't. A client-rendered SPA can rank on Google yet appear as an empty shell to an AI crawler that only reads raw HTML. This tool measures the AI side specifically.",
  },
  {
    q: 'Does a high score guarantee AI citations?',
    a: "No. This checks accessibility and legibility — the necessary foundation. Actually being cited also depends on entity authority, citable content structure, and topical relevance to the query. A passing score means AI systems can see you; earning the citation is the next layer of work.",
  },
];

export default function AIVisibilityCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'AI Visibility Checker',
        url: 'https://www.gobiya.com/tools/ai-visibility-checker',
        applicationCategory: 'SEOApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@id': 'https://www.gobiya.com/#org' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="kicker mono">// TOOL 02 — AI VISIBILITY: ONLINE</p>
      <h1>AI Visibility Checker</h1>
      <p className="lede">
        Before an AI assistant can cite you, it has to be able to reach you and read you. This
        scanner checks whether the major AI crawlers are allowed in, whether your homepage is
        machine-legible without JavaScript, and whether you've published the signals AI systems
        use to trust a source.
      </p>

      <AIVisibilityTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the scan checks</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>AI crawler access (robots.txt)</h3>
            <p>
              Nine major AI user-agents tested against your robots.txt — GPTBot, OAI-SearchBot,
              ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Amazonbot, and
              Meta's agent. A single blanket disallow can silently remove you from every AI
              answer surface.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Entity legibility (JSON-LD)</h3>
            <p>
              Whether your homepage carries structured data — Organization, LocalBusiness,
              Person — that tells AI systems who you are without inference. No schema means the
              machine has to guess, and machines guess wrong.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Crawlable content (no-JS render)</h3>
            <p>
              How much readable text exists in the raw HTML before any JavaScript runs. Many AI
              crawlers don't execute JS, so a client-rendered site can look empty to them even
              when it's rich in a browser.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-04</span>
            <h3>Machine channels (llms.txt, sitemap)</h3>
            <p>
              Whether you publish an llms.txt — a direct instruction file for AI agents — and a
              valid sitemap. Both are explicit invitations that raise your citation probability.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-why">
        <h2 id="h-why">Why AI visibility is a separate discipline from SEO</h2>
        <p>
          Ranking on Google and being cited by an AI assistant share a foundation but diverge
          fast. Googlebot renders JavaScript and rewards a huge basket of ranking signals; AI
          crawlers are often simpler, frequently skip JS, and lean heavily on structured entity
          data and clean, extractable text. A site can rank on page one and still be functionally
          invisible to ChatGPT because its content only exists after hydration, or because a
          robots.txt rule quietly blocks GPTBot. This tool measures the AI-specific layer that
          traditional SEO audits miss.
        </p>
        <a className="xlink" href="/outcomes/cited-by-ai">
          <span className="xlink__label">// RELATED OUTCOME</span>
          <strong>Ready to move from visible to cited? See how we engineer AI citations →</strong>
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
