import SubpageLayout from '../../../components/SubpageLayout';
import SchemaTool from './SchemaTool';

export const metadata = {
  title: 'Free Schema & Rich Results Validator — Check Your JSON-LD | GOBIYA',
  description:
    'Validate your structured data in seconds. Extracts every JSON-LD block, checks required properties for rich results, and flags missing entity, FAQ, and breadcrumb schema. Free.',
  alternates: { canonical: '/tools/schema-validator' },
};

const faqs = [
  {
    q: 'What is structured data and why does it matter?',
    a: "Structured data (usually JSON-LD) is machine-readable markup that tells search engines and AI systems exactly what a page is about — your business, a product, a review, an FAQ. It unlocks rich results (stars, prices, FAQs in the SERP) and is a primary signal AI assistants use to understand and cite your brand accurately.",
  },
  {
    q: 'What does this validator check?',
    a: "It extracts every JSON-LD block on the page, confirms each parses as valid JSON, and checks the required properties for the common rich-result types (Product, Article, FAQPage, LocalBusiness, Review, Event, and more). It then flags gaps — missing entity schema, absent breadcrumbs, incomplete types — with a fix for each.",
  },
  {
    q: 'Why does a broken schema block hurt me?',
    a: "Search engines silently ignore JSON-LD that fails to parse — you get no rich result and no credit, with no error shown to you. A single trailing comma can disable structured data for the whole page. That's why invalid schema is flagged as critical here.",
  },
  {
    q: 'Does this cover microdata and RDFa too?',
    a: "This validator focuses on JSON-LD, which is the format Google explicitly recommends and the one AI systems parse most reliably. If your site uses microdata or RDFa, migrating to JSON-LD is itself a recommended step.",
  },
];

export default function SchemaValidatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Schema & Rich Results Validator',
        url: 'https://gobiya.agency/tools/schema-validator',
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
      <p className="kicker mono">// TOOL 04 — STRUCTURED DATA: ONLINE</p>
      <h1>Schema & Rich Results Validator</h1>
      <p className="lede">
        Structured data is how you tell Google and AI systems what you are in a language they
        can't misread. This validator pulls every JSON-LD block off your page, checks it against
        the rules for rich results, and shows you exactly what's missing or broken.
      </p>

      <SchemaTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the validator checks</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>Parse validity</h3>
            <p>
              Every JSON-LD block is parsed. Malformed blocks — the ones search engines silently
              discard — are flagged as critical, because you're getting zero credit and no error.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Required properties</h3>
            <p>
              Each detected type is checked against the properties its rich result requires —
              Product needs a name and offers, Article a headline, FAQPage a mainEntity. Missing
              fields mean no rich result.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Entity foundation</h3>
            <p>
              Whether the page carries Organization, LocalBusiness, or Person schema — the anchor
              for Knowledge Graph presence and accurate AI citations.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-04</span>
            <h3>High-value gaps</h3>
            <p>
              Common opportunities left on the table: BreadcrumbList for cleaner SERP listings,
              FAQPage for expanded real estate and AI answers.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-related">
        <h2 id="h-related">Pair it with</h2>
        <a className="xlink" href="/tools/website-health-scan">
          <span className="xlink__label">// FLAGSHIP</span>
          <strong>Run the full Website Health Scan for every on-page issue →</strong>
        </a>
        <a className="xlink" href="/tools/ai-visibility-checker">
          <span className="xlink__label">// NEXT TOOL</span>
          <strong>Check whether AI crawlers can reach and read your site →</strong>
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
