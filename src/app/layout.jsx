import '../index.css';

export const metadata = {
  title: 'GOBIYA — AI SEO & Programmatic Search Architecture',
  description: 'Elite AI SEO and web development agency architecting programmatic search ecosystems and behavioral-psychology-driven conversion funnels.',
  metadataBase: new URL('https://gobiya.agency/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GOBIYA — Command the Algorithm',
    description: 'Elite AI SEO & Web Development. Programmatic search ecosystems. Behavioral conversion architecture.',
    url: 'https://gobiya.agency/',
    siteName: 'GOBIYA',
    images: [
      {
        url: '/assets/images/hero-core.png',
        width: 1376,
        height: 768,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://gobiya.agency/#org",
        "name": "GOBIYA",
        "url": "https://gobiya.agency/",
        "logo": "https://gobiya.agency/assets/images/hero-core.png",
        "description": "Elite AI SEO and web development agency architecting programmatic search ecosystems and behavioral-psychology-driven conversion funnels.",
        "knowsAbout": ["Search Engine Optimization","Programmatic SEO","Entity-first Indexing","Conversion Rate Optimization","Neuromarketing","Core Web Vitals"],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "deploy@gobiya.agency"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://gobiya.agency/#website",
        "url": "https://gobiya.agency/",
        "name": "GOBIYA",
        "publisher": { "@id": "https://gobiya.agency/#org" }
      },
      {
        "@type": "WebPage",
        "@id": "https://gobiya.agency/#page",
        "url": "https://gobiya.agency/",
        "name": "GOBIYA — AI SEO & Programmatic Search Architecture",
        "isPartOf": { "@id": "https://gobiya.agency/#website" },
        "about": { "@id": "https://gobiya.agency/#org" },
        "primaryImageOfPage": "https://gobiya.agency/assets/images/hero-core.png"
      },
      {
        "@type": "Service",
        "serviceType": "AI SEO & Programmatic Search Architecture",
        "provider": { "@id": "https://gobiya.agency/#org" },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Core Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Entity-first Indexing Architecture" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Neuromarketing Layout Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Programmatic Landing Page Systems" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conversion Funnel Engineering" } }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/images/hero-core.webp" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Michroma&family=Inter:wght@200;300;400;600&display=swap" rel="stylesheet" />
        <link rel="mcp" href="/.well-known/mcp.json" type="application/json" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <meta name="mcp-server" content="https://api.gobiya.com/mcp/v1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
