import SubpageLayout from '../../../components/SubpageLayout';
import BacklinkTool from './BacklinkTool';

export const metadata = {
  title: 'Free Backlink Checker — Authority Score & Referring Domains | GOBIYA',
  description:
    'Check any domain\'s backlink profile: editorial authority score, referring domains, and the top linking sites ranked by their own authority. Free, no signup.',
  alternates: { canonical: '/tools/backlink-checker' },
};

const faqs = [
  {
    q: 'Where does the backlink data come from?',
    a: 'From a 4.3-billion-edge link graph built on Common Crawl, the open web crawl used by most AI training pipelines. It is a point-in-time snapshot of the web\'s link structure — not a live monitoring index like Ahrefs or Moz — which makes it ideal for a fast, free profile check.',
  },
  {
    q: 'What is the authority score?',
    a: 'A 0–100-style editorial-authority rating, comparable to domain rating metrics you know from paid tools. It is weighted toward links from wiki, .edu, .gov, and news domains — the referrers that both Google and AI systems treat as trust signals.',
  },
  {
    q: 'Why does my count differ from Ahrefs or Semrush?',
    a: 'Every index crawls a different slice of the web at a different time. Common Crawl skews toward pages that matter — the same corpus LLMs learn from — so a link that shows up here is a link AI systems have likely seen. Treat the numbers as directional, and compare domains against each other within the same tool.',
  },
  {
    q: 'Do backlinks still matter for AI search?',
    a: 'More than ever, just differently. ChatGPT, Perplexity, and Google\'s AI Overviews decide who to cite partly on the same authority signals links create. A domain that authoritative sites link to gets mentioned; one nobody references stays invisible — in both the rankings and the answers.',
  },
];

export default function BacklinkCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Backlink Checker',
        url: 'https://www.gobiya.com/tools/backlink-checker',
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
      <p className="kicker mono">// TOOL 09 — LINK GRAPH TRAVERSAL: ONLINE</p>
      <h1>Backlink Checker</h1>
      <p className="lede">
        Enter a root domain and get its authority score, referring-domain count, and the top
        sites linking to it — ranked by the linkers' own authority, pulled from a
        4.3-billion-edge Common Crawl link graph.
      </p>

      <BacklinkTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the check returns</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>Editorial authority score</h3>
            <p>
              A 0–100-style domain rating weighted toward wiki, .edu, .gov, and news referrers —
              the links that actually move trust, not raw volume.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Referring domains &amp; total inlinks</h3>
            <p>
              How many unique domains link in, and how many total links they send. A high
              inlink-to-referrer ratio usually means sitewide footers or templated links, not
              editorial citations.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Top linkers, ranked by their authority</h3>
            <p>
              The linking domains that matter most, ordered by their own authority. Run it on a
              competitor to see exactly which referrers you're missing.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-why">
        <h2 id="h-why">Why check backlinks against Common Crawl</h2>
        <p>
          Common Crawl is the corpus most large language models are trained on. A backlink that
          exists in this graph is a link the AI systems answering your customers' questions have
          actually seen — which makes it the closest free proxy for how visible and citable your
          domain is to ChatGPT, Perplexity, and Google's AI Overviews. If your profile is thin
          here, you're not just under-ranked; you're under-referenced.
        </p>
        <a className="xlink" href="/problems/invisible-to-ai">
          <span className="xlink__label">// RELATED PROBLEM</span>
          <strong>AI assistants never mention your brand? That's a referencing problem. →</strong>
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
