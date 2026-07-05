import SubpageLayout from '../../../components/SubpageLayout';
import HealthScanTool from './HealthScanTool';

export const metadata = {
  title: 'Free Website Health Scan — Find Your SEO Issues in Seconds | GOBIYA',
  description:
    'Paste any URL and get a prioritized list of on-page SEO issues: missing titles, noindex traps, thin content, broken schema, missing alt text, and more. Free, no signup.',
  alternates: { canonical: '/tools/website-health-scan' },
};

const faqs = [
  {
    q: 'What does the Website Health Scan check?',
    a: "It fetches the page's raw HTML and its robots.txt, then grades the on-page fundamentals that actually move rankings: title tag presence and length, meta description, H1 and heading structure, indexability (noindex meta, X-Robots-Tag header, robots.txt blocks), canonical tag, mobile viewport, image alt coverage, Open Graph tags, structured data validity, content depth, and HTML page weight. Each finding comes with a plain-English explanation and a fix.",
  },
  {
    q: 'Is this the same as Lighthouse or PageSpeed?',
    a: "No. PageSpeed and Lighthouse focus on performance metrics (Core Web Vitals). This scan focuses on the SEO and crawlability issues that keep a page from ranking or being cited at all — the things that don't show up in a speed score but quietly cost you traffic. They're complementary.",
  },
  {
    q: 'Why does indexability matter so much?',
    a: "A page with a stray noindex tag or a robots.txt block is invisible to search no matter how good the content is. These are among the most common and most damaging issues we find — a single line left over from a staging site can deindex an entire section. The scan flags them first.",
  },
  {
    q: 'Does a perfect score mean I\'ll rank #1?',
    a: "No. This scan covers the technical and on-page foundation — necessary, not sufficient. Ranking also depends on content quality, authority, backlinks, and competition. A clean scan means nothing is actively holding the page back, so the harder work of authority and relevance can pay off.",
  },
];

export default function WebsiteHealthScanPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Website Health Scan',
        url: 'https://gobiya.agency/tools/website-health-scan',
        applicationCategory: 'SEOApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@id': 'https://gobiya.agency/#org' },
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
      <p className="kicker mono">// TOOL 03 — ON-PAGE FORENSICS: ONLINE</p>
      <h1>Website Health Scan</h1>
      <p className="lede">
        Paste a URL. In seconds you get a prioritized list of exactly what's holding the page
        back in search — the deindexing traps, the missing tags, the thin content — each with a
        plain explanation and the fix. The same triage we run before every engagement.
      </p>

      <HealthScanTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the scan grades</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>Indexability traps</h3>
            <p>
              The highest-severity checks: noindex meta tags, X-Robots-Tag headers, and
              robots.txt blocks that quietly remove a page from search entirely. One leftover
              line can deindex a whole section.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Core on-page tags</h3>
            <p>
              Title tag and meta description presence and length, exactly-one H1, heading
              structure, canonical, and language declaration — the fundamentals search engines
              read first.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Mobile, images & social</h3>
            <p>
              Viewport meta for mobile-first indexing, image alt-text coverage, and Open Graph
              tags that control how your links look when shared.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-04</span>
            <h3>Content & structured data</h3>
            <p>
              Visible content depth, HTML page weight, and JSON-LD validity — flagging thin
              pages and broken schema that forfeit rich results.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-related">
        <h2 id="h-related">Go deeper</h2>
        <a className="xlink" href="/tools/schema-validator">
          <span className="xlink__label">// NEXT TOOL</span>
          <strong>Validate your structured data and rich-result eligibility →</strong>
        </a>
        <a className="xlink" href="/tools/index-crawl-analyzer">
          <span className="xlink__label">// NEXT TOOL</span>
          <strong>Check your sitemap, robots.txt, and crawl budget →</strong>
        </a>
        <a className="xlink" href="/tools/ai-visibility-checker">
          <span className="xlink__label">// NEXT TOOL</span>
          <strong>See whether AI crawlers can reach and read your site →</strong>
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
