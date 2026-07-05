import SubpageLayout from '../../components/SubpageLayout';

export const metadata = {
  title: 'Free SEO & AI Search Tools | GOBIYA',
  description:
    'Free diagnostic tools from GOBIYA: aged domain lookup, AI visibility checks, and more. No signup, no gate.',
  alternates: { canonical: '/tools' },
};

const tools = [
  {
    href: '/tools/aged-domain-lookup',
    id: 'T-01',
    name: 'Aged Domain Lookup',
    desc: 'Registration record, Wayback history, dark years, and DNS state — know what a domain carries before you build on it.',
    live: true,
  },
  {
    href: '/tools/ai-visibility-checker',
    id: 'T-02',
    name: 'AI Visibility Checker',
    desc: "Can ChatGPT, Perplexity, and Google's AI crawlers reach and read your site? Scan crawler access, entity schema, and no-JS content in seconds.",
    live: true,
  },
  {
    href: '/tools/website-health-scan',
    id: 'T-03',
    name: 'Website Health Scan',
    desc: 'Paste any URL for a prioritized list of on-page SEO issues: deindexing traps, missing tags, thin content, broken schema — each with the fix.',
    live: true,
  },
  {
    href: '/tools/schema-validator',
    id: 'T-04',
    name: 'Schema & Rich Results Validator',
    desc: 'Extracts every JSON-LD block, checks required properties for rich results, and flags missing entity, FAQ, and breadcrumb schema.',
    live: true,
  },
  {
    href: '/tools/index-crawl-analyzer',
    id: 'T-05',
    name: 'Index & Crawl Analyzer',
    desc: 'Reads your sitemap and robots.txt, samples URLs, and flags crawl-budget waste, index bloat, and thin programmatic patterns.',
    live: true,
  },
  {
    href: '/tools/conversion-trust-audit',
    id: 'T-06',
    name: 'Conversion & Trust Audit',
    desc: 'Traffic up, pipeline flat? Find the conversion leaks — missing CTAs, unreachable contact info, absent trust signals — on any page.',
    live: true,
  },
  {
    href: '/design-ideas',
    id: 'T-07',
    name: 'AI Design Ideas Generator',
    desc: 'Input your domain and let AI generate structural, layout, and UX ideas rooted in behavioral psychology.',
    live: true,
  },
  {
    href: '/tools/llms-txt-generator',
    id: 'T-08',
    name: 'llms.txt Generator',
    desc: 'Draft a compliant llms.txt for your site so AI crawlers know what you are.',
    live: true,
  },
];

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.gobiya.com/tools/#page",
    "url": "https://www.gobiya.com/tools",
    "name": "Free SEO & AI Search Tools | GOBIYA",
    "description": "Free diagnostic tools from GOBIYA: aged domain lookup, AI visibility checks, and more. No signup, no gate.",
    "isPartOf": { "@id": "https://www.gobiya.com/#website" }
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="kicker mono">// TOOLBAY — DIAGNOSTIC SYSTEMS: ONLINE</p>
      <h1>Free Diagnostic Tools</h1>
      <p className="lede">
        The same checks we run before every engagement, opened to the public. No signup, no gate,
        no throttled "pro" version.
      </p>
      <ul className="spec-list">
        {tools.map((t) => (
          <li key={t.id}>
            <span className="mono spec-id">{t.id}</span>
            <h3>
              {t.live ? (
                <a href={t.href} style={{ color: 'var(--text)', textDecoration: 'none' }}>
                  {t.name} <span style={{ color: 'var(--cyan)' }}>→</span>
                </a>
              ) : (
                <>
                  {t.name} <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.25em' }}>IN FABRICATION</span>
                </>
              )}
            </h3>
            <p>{t.desc}</p>
          </li>
        ))}
      </ul>
      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <a className="cta cta--ghost" href="/#apex">Need the full audit? →</a>
        <a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a>
      </div>
    </SubpageLayout>
  );
}
