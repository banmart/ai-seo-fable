import '../index.css';

export const metadata = {
  title: 'GOBIYA — AI SEO & Programmatic Search Architecture',
  description: 'Elite AI SEO and web development agency architecting programmatic search ecosystems and behavioral-psychology-driven conversion funnels.',
  metadataBase: new URL('https://www.gobiya.com/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GOBIYA — Command the Algorithm',
    description: 'Elite AI SEO & Web Development. Programmatic search ecosystems. Behavioral conversion architecture.',
    url: 'https://www.gobiya.com/',
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
  verification: {
    google: 'BCJ8-9rzY9X5CjZqM2hY7erF-1vFCZHFKl-Y-nbXv3U',
    other: {
      'p:domain_verify': '422d36275e412e182dff33f542a68498',
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.gobiya.com/#org",
        "name": "GOBIYA",
        "url": "https://www.gobiya.com/",
        "logo": "https://www.gobiya.com/assets/images/hero-core.png",
        "description": "Elite AI SEO and web development agency architecting programmatic search ecosystems and behavioral-psychology-driven conversion funnels.",
        "knowsAbout": ["Search Engine Optimization","Programmatic SEO","Entity-first Indexing","Conversion Rate Optimization","Neuromarketing","Core Web Vitals"],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "deploy@gobiya.com"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.gobiya.com/#website",
        "url": "https://www.gobiya.com/",
        "name": "GOBIYA",
        "publisher": { "@id": "https://www.gobiya.com/#org" }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/images/hero-core.webp" fetchPriority="high" />
        <link rel="preload" as="video" href="/assets/videos/zone-1-chaos.webm" type="video/webm" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Michroma&family=Inter:wght@200;300;400;600&display=swap" rel="stylesheet" />
        <link rel="mcp" href="/.well-known/mcp.json" type="application/json" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <meta name="mcp-server" content="https://api.gobiya.com/mcp/v1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            function loadTrackingScripts() {
              if (window.trackingLoaded) return;
              window.trackingLoaded = true;
              
              // GA4 (Google Analytics)
              const ga = document.createElement('script');
              ga.src = "https://www.googletagmanager.com/gtag/js?id=G-3R3D5Q9YV6";
              ga.async = true;
              document.head.appendChild(ga);
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3R3D5Q9YV6', { anonymize_ip: true, send_page_view: true });

              // Microsoft Clarity
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v5j018vnnn");
            }

            // Load on interaction or after 3.5s
            ['mousemove', 'scroll', 'touchstart', 'click'].forEach(e => 
              window.addEventListener(e, loadTrackingScripts, { once: true })
            );
            setTimeout(loadTrackingScripts, 3500);
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
