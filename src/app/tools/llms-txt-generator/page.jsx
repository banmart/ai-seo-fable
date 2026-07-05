import SubpageLayout from '../../../components/SubpageLayout';
import LlmTxtTool from './LlmTxtTool';

export const metadata = {
  title: 'Free llms.txt Generator — AI Crawler Configuration | GOBIYA',
  description:
    'Draft a compliant llms.txt for your site so AI crawlers know what you are and where your important endpoints live.',
  alternates: { canonical: '/tools/llms-txt-generator' },
};

const faqs = [
  {
    q: 'What is an llms.txt file?',
    a: 'llms.txt is a standard proposed to help AI crawlers and Large Language Models understand the purpose, structure, and important endpoints of a website. It acts similarly to robots.txt, but instead of telling bots what NOT to crawl, it tells them what is MOST important to read.',
  },
  {
    q: 'Where do I put this file?',
    a: 'You should place the llms.txt file at the root of your domain (e.g., https://yourdomain.com/llms.txt). It is becoming standard practice for AI agents to look for this file when profiling a site.',
  },
  {
    q: 'Why should I care about AI crawlers?',
    a: 'Search is shifting from traditional index retrieval to AI-generated answers. If ChatGPT, Perplexity, or Google\'s AI overviews can\'t easily understand what your business does and where your docs/pricing are, they will exclude you from their generative answers.',
  },
];

export default function LlmTxtGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'llms.txt Generator',
        url: 'https://www.gobiya.com/tools/llms-txt-generator',
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
      <p className="kicker mono">// TOOL 08 — CRAWLER CONFIGURATION</p>
      <h1>llms.txt Generator</h1>
      <p className="lede">
        Draft a compliant llms.txt for your site so AI crawlers know what you are, what you do, and where your most important endpoints live.
      </p>

      <LlmTxtTool />

      <section aria-labelledby="h-why" style={{ marginTop: '4rem' }}>
        <h2 id="h-why">Why you need an llms.txt file</h2>
        <p>
          As AI search engines like Perplexity, SearchGPT, and Google AI Overviews replace traditional blue links, your visibility depends on how easily Large Language Models can parse and summarize your site.
        </p>
        <p>
          While `robots.txt` tells bots what to ignore, `llms.txt` tells them what matters. Providing this file gives you direct control over how your entity is defined in the training data and live retrieval context of the world's most powerful AI models.
        </p>
      </section>

      <section aria-labelledby="h-faq" style={{ marginTop: '4rem' }}>
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

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
        <a className="cta" href="/#apex">Request Deployment Brief →</a>
        <a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a>
      </div>
    </SubpageLayout>
  );
}
