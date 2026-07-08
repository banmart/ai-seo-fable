"use client";

import { useScrollEngine } from '../hooks/useScrollEngine'
import ScrubStage from '../components/ScrubStage'
import HUD from '../components/HUD'
import Header from '../components/Header'
import { ZoneChaos, ZoneIntegration, ZoneConversion, ZoneScale, ZoneApex } from '../components/Zones'
import Footer from '../components/Footer'

export default function HomePage() {
  useScrollEngine()

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.gobiya.com/#page",
        "url": "https://www.gobiya.com/",
        "name": "GOBIYA — AI SEO & Programmatic Search Architecture",
        "isPartOf": { "@id": "https://www.gobiya.com/#website" },
        "about": { "@id": "https://www.gobiya.com/#org" },
        "primaryImageOfPage": "https://www.gobiya.com/assets/images/hero-core.webp"
      },
      {
        "@type": "Service",
        "serviceType": "AI SEO & Programmatic Search Architecture",
        "provider": { "@id": "https://www.gobiya.com/#org" },
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrubStage />
      <HUD />
      <Header />
      <main>
        <ZoneChaos />
        <ZoneIntegration />
        <ZoneConversion />
        <ZoneScale />
        <ZoneApex />
      </main>
      <Footer />
    </>
  )
}
