const BASE = 'https://gobiya.agency';

export default function sitemap() {
  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/tools', priority: 0.9 },
    { path: '/tools/aged-domain-lookup', priority: 0.9 },
    { path: '/tools/ai-visibility-checker', priority: 0.9 },
    { path: '/tools/website-health-scan', priority: 0.9 },
    { path: '/tools/schema-validator', priority: 0.9 },
    { path: '/tools/index-crawl-analyzer', priority: 0.9 },
    { path: '/tools/conversion-trust-audit', priority: 0.9 },
    { path: '/problems', priority: 0.7 },
    { path: '/problems/invisible-to-ai', priority: 0.8 },
    { path: '/problems/google-penalty', priority: 0.8 },
    { path: '/problems/traffic-no-leads', priority: 0.8 },
    { path: '/problems/pages-not-indexed', priority: 0.8 },
    { path: '/problems/losing-clicks-to-ai', priority: 0.8 },
    { path: '/outcomes', priority: 0.7 },
    { path: '/outcomes/cited-by-ai', priority: 0.8 },
    { path: '/outcomes/algorithm-proof', priority: 0.8 },
    { path: '/outcomes/rapid-authority-acquisition', priority: 0.8 },
    { path: '/outcomes/semantic-search-domination', priority: 0.8 },
    { path: '/about/steve-martin', priority: 0.8 },
    { path: '/mcp', priority: 0.6 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }));
}
