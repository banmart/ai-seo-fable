import SubpageLayout from '../../../components/SubpageLayout';
import CrawlTool from './CrawlTool';

export const metadata = {
  title: 'Free Index & Crawl Analyzer — Sitemap & Robots.txt Check | GOBIYA',
  description:
    'Check whether search engines can crawl and index your site. Analyzes robots.txt, XML sitemaps, sitemap declarations, lastmod dates, and homepage indexability. Free, no signup.',
  alternates: { canonical: '/tools/index-crawl-analyzer' },
};

const faqs = [
  {
    q: 'What causes pages to not get indexed?',
    a: "The common culprits: a robots.txt Disallow rule blocking the section, a noindex tag, missing or broken sitemaps so pages are never discovered, and — at scale — thin or duplicate programmatic content that Google crawls and declines to index ('Discovered — currently not indexed'). This tool checks the crawlability side; the content side is the other half.",
  },
  {
    q: 'What does this analyzer check?',
    a: "It fetches your robots.txt and reads whether it blocks crawlers and declares your sitemap; fetches your XML sitemap (following sitemap-index files to sample child sitemaps); counts URLs; checks for lastmod dates; flags oversized sitemaps beyond the 50,000-URL limit; and confirms your homepage isn't accidentally set to noindex.",
  },
  {
    q: 'Does a bigger sitemap mean better SEO?',
    a: "No — often the opposite. Pushing tens of thousands of thin, near-duplicate URLs into a sitemap invites index bloat, which dilutes crawl budget and can drag down your sitewide quality signal. Fewer, genuinely distinct, high-value pages usually index and rank better than a huge low-quality set.",
  },
  {
    q: 'Should my sitemap be listed in robots.txt?',
    a: "Yes. A `Sitemap:` directive in robots.txt lets every search engine discover your sitemap automatically, even ones you never manually submit to in a webmaster console. It's a one-line change with a real discovery benefit.",
  },
];

export default function IndexCrawlAnalyzerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Index & Crawl Analyzer',
        url: 'https://www.gobiya.com/tools/index-crawl-analyzer',
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
      <p className="kicker mono">// TOOL 05 — CRAWL & INDEX: ONLINE</p>
      <h1>Index & Crawl Analyzer</h1>
      <p className="lede">
        Before a page can rank, a search engine has to be able to crawl it and choose to index
        it. This analyzer inspects the machinery that governs both — your robots.txt and
        sitemaps — and flags the blocks and gaps that leave pages undiscovered or excluded.
      </p>

      <CrawlTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the analyzer checks</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>robots.txt access</h3>
            <p>
              Whether robots.txt exists, whether it blocks crawlers site-wide (a catastrophic
              but common accident), and whether it declares your sitemap.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Sitemap discovery</h3>
            <p>
              Fetches your XML sitemap — following sitemap-index files to sample child sitemaps —
              counts URLs, and checks for the lastmod dates that guide efficient recrawling.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Scale & bloat signals</h3>
            <p>
              Flags sitemaps past the 50,000-URL limit and large sitemap indexes where index
              bloat and thin programmatic pages are the usual risk to crawl budget.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-04</span>
            <h3>Homepage indexability</h3>
            <p>
              Confirms your homepage isn't carrying a leftover noindex directive that would drop
              it — and often the whole site's authority — from search.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-related">
        <h2 id="h-related">Related</h2>
        <a className="xlink" href="/problems/pages-not-indexed">
          <span className="xlink__label">// THE PROBLEM</span>
          <strong>A thousand pages published, forty indexed — see the full diagnosis →</strong>
        </a>
        <a className="xlink" href="/tools/website-health-scan">
          <span className="xlink__label">// FLAGSHIP</span>
          <strong>Run the full Website Health Scan on any single page →</strong>
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
