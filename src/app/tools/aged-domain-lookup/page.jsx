import SubpageLayout from '../../../components/SubpageLayout';
import AgedDomainTool from './AgedDomainTool';

export const metadata = {
  title: 'Free Aged Domain Lookup — Check Domain Age & History | GOBIYA',
  description:
    'Check any domain\'s age, registration date, Wayback Machine history, and hidden baggage before you buy it or build on it. Free, no signup.',
  alternates: { canonical: '/tools/aged-domain-lookup' },
};

const faqs = [
  {
    q: 'What counts as an aged domain?',
    a: 'Most SEOs treat 3+ years as established and 10+ years as aged. Age alone is not authority — a 12-year-old domain that spent 2019–2022 as a casino PBN is a liability, not an asset. History quality matters more than the registration date.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Registration and expiry dates come from RDAP, the successor to WHOIS operated by domain registries. Site history comes from the Internet Archive\'s Wayback Machine CDX index. DNS state is checked live. No scraped or estimated data.',
  },
  {
    q: 'Can this tool detect a spam history?',
    a: 'It flags the signals that correlate with one: multi-year archive gaps (drop-and-repurpose cycles), registry hold statuses, and no-archive profiles. For a definitive answer, open the flagged years in the Wayback Machine and look at what the site actually was.',
  },
  {
    q: 'Does domain age help SEO?',
    a: 'Google says age itself is not a ranking factor. What an aged domain can carry is an existing backlink profile and index history — good or bad. That inheritance is what you are really evaluating here.',
  },
];

export default function AgedDomainLookupPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Aged Domain Lookup',
        url: 'https://gobiya.agency/tools/aged-domain-lookup',
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
      <p className="kicker mono">// TOOL 01 — DOMAIN FORENSICS: ONLINE</p>
      <h1>Aged Domain Lookup</h1>
      <p className="lede">
        Every domain has a past. This scanner pulls its registration record, its full archive
        history, and its current DNS state — so you know what you're inheriting before you buy
        it or build on it.
      </p>

      <AgedDomainTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the scan checks</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>Registration record (RDAP)</h3>
            <p>
              True registration date, expiry, registrar, and registry status codes — straight from
              the registry, not a WHOIS scrape. Hold and redemption statuses are flagged as risks.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Archive history (Wayback Machine)</h3>
            <p>
              First crawl date, years of continuous snapshots, and dark years. A domain that goes
              dark for two years and comes back is the classic drop-catch-repurpose pattern —
              the point where spam histories usually enter.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Live DNS state</h3>
            <p>
              Whether the domain currently resolves — distinguishing active sites from parked or
              dropped domains.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-why">
        <h2 id="h-why">Why domain history matters more than domain age</h2>
        <p>
          An aged domain is an inheritance: you get its backlink profile, its index history, and
          any manual actions or algorithmic suppression attached to it. A clean 8-year-old domain
          with continuous, single-topic history is a genuine head start. The same domain with a
          2-year gap and a past life as a link farm can suppress everything you build on it —
          and diagnosing that after launch costs far more than checking before.
        </p>
        <a className="xlink" href="/problems/google-penalty">
          <span className="xlink__label">// RELATED PROBLEM</span>
          <strong>Bought a domain that came with baggage? Traffic crashed after a core update? →</strong>
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
