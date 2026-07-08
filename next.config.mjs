const isDev = process.env.NODE_ENV !== 'production';

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.clarity.ms`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/book', destination: '/#apex', permanent: true },
      { source: '/contact', destination: '/#apex', permanent: true },
      { source: '/design-ideas', destination: '/tools/design-ideas', permanent: true },
      { source: '/about', destination: '/about/steve-martin', permanent: true },
      { source: '/creativity', destination: '/', permanent: true },
      { source: '/insights', destination: '/', permanent: true },
      { source: '/glendale-seo', destination: '/', permanent: true },
      { source: '/approach', destination: '/', permanent: true },
      { source: '/seo-company-encino', destination: '/', permanent: true },
      { source: '/case-studies', destination: '/outcomes', permanent: true },
      { source: '/relations', destination: '/', permanent: true },
      { source: '/relations/:slug*', destination: '/', permanent: true },
      { source: '/performance', destination: '/', permanent: true },
      { source: '/performance/:slug*', destination: '/', permanent: true },
      { source: '/ai-search-marketing-santa-clarita', destination: '/', permanent: true },
      { source: '/plastic-surgery-internet-marketing', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
