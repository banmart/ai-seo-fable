"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  if (!pathname || pathname === '/') return null;

  const pathSegments = pathname.split('/').filter((s) => s.length > 0);
  
  // Format segments (e.g., 'aged-domain-lookup' -> 'Aged Domain Lookup')
  const formatName = (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    ...pathSegments.map((segment, index) => {
      const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return { name: formatName(segment), url };
    })
  ];

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': `https://www.gobiya.com${crumb.url}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <ol style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)'
        }}>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.url} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isLast ? (
                  <span style={{ color: 'var(--cyan)' }} aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {crumb.name}
                    </Link>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
