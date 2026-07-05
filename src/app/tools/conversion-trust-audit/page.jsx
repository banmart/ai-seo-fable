import SubpageLayout from '../../../components/SubpageLayout';
import ConversionTool from './ConversionTool';

export const metadata = {
  title: 'Free Conversion & Trust Audit — Why Your Traffic Does Not Convert | GOBIYA',
  description:
    'Paste a URL and see the conversion leaks: missing CTAs, unreachable contact info, no forms, and absent trust signals. The page-level reasons visitors leave without becoming leads. Free, no signup.',
  alternates: { canonical: '/tools/conversion-trust-audit' },
};

const faqs = [
  {
    q: 'What does the Conversion & Trust Audit check?',
    a: "It fetches the page and scans the elements that turn a visitor into a lead: a clear primary call-to-action (button, not just text), reachable contact methods (click-to-call phone, email, address schema), a lead or contact form, trust and social-proof signals (testimonials, reviews, ratings, credentials), links to active social profiles, and a headline value proposition (H1). Each gap comes with a plain explanation and a fix.",
  },
  {
    q: 'How is this different from a Website Health Scan?',
    a: "The Health Scan grades whether search engines can find and rank the page — titles, indexability, schema, content depth. This audit assumes the traffic already arrives and asks the next question: once a visitor lands, is there anything telling them what to do and any reason to trust you? It's a conversion-path audit, not a crawlability audit.",
  },
  {
    q: 'Why do trust signals matter so much?',
    a: "Most visitors who don't convert don't leave because your offer is wrong — they leave to \"check reviews\" and never come back. Testimonials, ratings, client logos, and credentials on the page resolve that hesitation in the moment, before the visitor drifts to a competitor. A page can have a perfect CTA and still leak leads if there's nothing to vouch for you.",
  },
  {
    q: 'Does a high score mean my page will convert?',
    a: "No. This audit checks that the fundamentals of a conversion path exist and are reachable — necessary, not sufficient. Actual conversion also depends on offer strength, message-to-audience match, page speed, and where in the funnel the visitor is. A clean audit means nothing on the page is actively blocking a ready-to-buy visitor from acting.",
  },
];

export default function ConversionTrustAuditPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Conversion & Trust Audit',
        url: 'https://gobiya.agency/tools/conversion-trust-audit',
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
      <p className="kicker mono">// TOOL 06 — CONVERSION PATH: ONLINE</p>
      <h1>Conversion &amp; Trust Audit</h1>
      <p className="lede">
        Traffic charts up, pipeline flat? The problem is usually on the page, not in the ad spend.
        Paste a URL and see exactly where the conversion path leaks — no clear action to take, no
        way to reach you, no reason to trust you — each with the fix.
      </p>

      <ConversionTool />

      <section aria-labelledby="h-checks">
        <h2 id="h-checks">What the audit grades</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">C-01</span>
            <h3>The primary action</h3>
            <p>
              Whether there's an unmistakable call-to-action button — not just a phrase buried in
              copy. A visitor ready to convert needs one obvious thing to click. No clear CTA is
              the single most common reason otherwise-good traffic leaves without acting.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-02</span>
            <h3>Reachability</h3>
            <p>
              Click-to-call phone links, email, address schema, and forms. B2B and local buyers
              routinely bounce when they can't immediately see how to reach you — and a plain-text
              phone number that isn't a <span className="mono">tel:</span> link adds friction on
              mobile, where most of your traffic is.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-03</span>
            <h3>Trust &amp; social proof</h3>
            <p>
              Testimonials, reviews, ratings, client logos, credentials, and Review/AggregateRating
              schema. Social proof is often the difference between a visitor who converts and one
              who leaves to vet you and never returns.
            </p>
          </li>
          <li>
            <span className="mono spec-id">C-04</span>
            <h3>Value proposition</h3>
            <p>
              A headline (H1) that states what you do and for whom. A visitor should understand your
              offer in five seconds; a missing or vague headline loses them before the CTA ever
              matters.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-related">
        <h2 id="h-related">Go deeper</h2>
        <a className="xlink" href="/problems/traffic-no-leads">
          <span className="xlink__label">// RELATED PROBLEM</span>
          <strong>Traffic up, pipeline flat? See the full diagnosis →</strong>
        </a>
        <a className="xlink" href="/tools/website-health-scan">
          <span className="xlink__label">// NEXT TOOL</span>
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
