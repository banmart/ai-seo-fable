import SubpageLayout from '../../../components/SubpageLayout';
import DesignIdeasTool from './DesignIdeasTool';

export const metadata = {
  title: 'Free AI Design Ideas Generator — UI/UX Concepts | GOBIYA',
  description:
    'Enter your domain and get AI-generated UI/UX design concepts rooted in behavioral psychology — layout, structure, and conversion-focused design ideas for your business model.',
  alternates: { canonical: '/tools/design-ideas' },
};

export default function DesignIdeasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Design Ideas Generator',
    url: 'https://www.gobiya.com/tools/design-ideas',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@id': 'https://www.gobiya.com/#org' },
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DesignIdeasTool />
    </SubpageLayout>
  );
}
