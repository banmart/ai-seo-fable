export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/design-ideas'] },
      { userAgent: 'GPTBot', allow: ['/llms.txt', '/.well-known/'] },
      { userAgent: 'Claude-Web', allow: ['/llms.txt', '/.well-known/'] },
      { userAgent: 'PerplexityBot', allow: ['/llms.txt', '/.well-known/'] },
      { userAgent: 'anthropic-ai', allow: ['/llms.txt', '/.well-known/'] },
    ],
    sitemap: 'https://www.gobiya.com/sitemap.xml',
  };
}
