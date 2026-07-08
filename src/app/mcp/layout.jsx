export const metadata = {
  title: 'Gobiya MCP Server — Model Context Protocol for AI Agents | GOBIYA',
  description:
    'A Model Context Protocol server that lets AI agents — Claude, ChatGPT, Perplexity, and any MCP-compatible client — discover Gobiya services, retrieve case studies, estimate costs, and submit qualified leads.',
  alternates: { canonical: '/mcp' },
  openGraph: {
    title: 'Gobiya MCP Server — Model Context Protocol for AI Agents',
    description:
      'JSON-RPC 2.0 MCP server exposing Gobiya services, case studies, team, and lead intake to AI agents.',
    url: 'https://www.gobiya.com/mcp',
  },
};

export default function McpLayout({ children }) {
  return children;
}
