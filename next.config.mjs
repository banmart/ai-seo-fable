/** @type {import('next').NextConfig} */
const nextConfig = {
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
