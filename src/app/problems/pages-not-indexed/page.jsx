import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Pages Not Indexed? Fix Crawl Budget & Index Bloat | GOBIYA',
  description:
    "Published a thousand pages, Google indexed forty. Diagnose crawl-budget waste, thin programmatic content, and 'Discovered — currently not indexed' at the root.",
  alternates: { canonical: '/problems/pages-not-indexed' },
};

const faqs = [
  {
    q: "What does 'Discovered — currently not indexed' actually mean?",
    a: "Google found the URL but decided crawling it wasn't worth the resources yet — a quality judgment on your site, not a queue delay. At scale, it means Google predicts those pages are low-value based on the pattern of pages it already crawled.",
  },
  {
    q: 'Will submitting the sitemap again force indexing?',
    a: "No. Sitemaps are discovery hints, not commands. If Google is declining to index discovered pages, resubmitting the same list changes nothing — the pages themselves have to clear Google's quality bar, or the sections generating them need consolidation.",
  },
  {
    q: 'Can too many pages hurt the pages that matter?',
    a: 'Yes. Index bloat dilutes crawl budget and drags down the sitewide quality signal core updates evaluate. Pruning or noindexing thin sections routinely improves rankings for the pages you keep.',
  },
];

export default function PagesNotIndexedPage() {
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
      <p className="kicker mono">// PROBLEM 04 — CRAWL STATE: DECLINED</p>
      <h1>A Thousand Pages Published.<br />Forty Indexed.</h1>
      <p className="lede">
        Search Console says "Discovered — currently not indexed" and the number keeps growing.
        Google isn't behind on your site. It has looked at your pattern and decided most of it
        isn't worth crawling. That verdict is reversible — but not by resubmitting sitemaps.
      </p>

      <section aria-labelledby="h-diagnose">
        <h2 id="h-diagnose">Diagnosis sequence</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">D-01</span>
            <h3>Index-state census</h3>
            <p>
              Every URL classified: indexed, crawled-not-indexed, discovered-not-indexed,
              excluded by design. The distribution across your page templates shows exactly
              which sections Google has written off.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-02</span>
            <h3>Template quality audit</h3>
            <p>
              Programmatic pages judged the way Google judges them — as a class. If the
              template produces near-duplicates with a swapped city name or spec value, the
              whole section reads as scaled thin content.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-03</span>
            <h3>Crawl-budget forensics</h3>
            <p>
              Log-file and crawl-stats analysis: where does Googlebot actually spend its visits?
              Faceted URLs, parameter duplicates, and orphaned sections routinely consume the
              budget your money pages needed.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-fix">
        <h2 id="h-fix">The resolution</h2>
        <p>
          Consolidate or gate the thin sections, differentiate the templates that stay, and
          rebuild internal linking so authority and crawl demand concentrate on pages that earn
          their place. Indexation follows quality density — shrink the site's dead weight and
          the good pages get in.
        </p>
        <a className="xlink" href="/outcomes/semantic-search-domination">
          <span className="xlink__label">// OUTCOME</span>
          <strong>Semantic search domination: scale that Google indexes →</strong>
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
