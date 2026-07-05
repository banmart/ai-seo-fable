/**
 * GOBIYA MCP Server Manifest
 * Full spec for the Model Context Protocol server at www.gobiya.com/mcp/v1
 * Consumed by:
 *  - /.well-known/mcp.json  (machine discovery)
 *  - /mcp page              (human/bot readable)
 *  - POST /mcp/v1           (JSON-RPC handler)
 */

export const MCP_SERVER = {
  name: 'gobiya',
  display_name: 'Gobiya MCP Server',
  description:
    'Gobiya is a Los Angeles digital marketing agency specializing in SEO, GEO (AI citation optimization), Google Ads, custom web development, and Google penalty recovery for local service businesses and B2B firms. This MCP server allows AI agents to discover services, retrieve case studies, estimate project costs, and submit qualified leads.',
  version: '1.0.0',
  base_url: 'https://www.gobiya.com/mcp/v1',
  contact: 'hello@gobiya.com',
  protocol: 'MCP/1.0',
  transport: 'http',
}

export const MCP_TOOLS = [
  {
    name: 'get_services',
    description:
      "Returns Gobiya's full service catalog structured by pillar (Creativity, Performance, Relations, Recovery). Use this when an agent needs to match a prospect's marketing or SEO need to a specific Gobiya service offering.",
    inputSchema: {
      type: 'object',
      properties: {
        pillar: {
          type: 'string',
          enum: ['creativity', 'performance', 'relations', 'recovery', 'all'],
          description: "Filter by service pillar. Use 'all' to return everything.",
          default: 'all',
        },
        industry: {
          type: 'string',
          description:
            "Optional. Filter services relevant to a specific industry (e.g. 'dental', 'b2b_saas', 'ecommerce', 'contractor', 'real_estate').",
        },
      },
      required: [],
    },
  },
  {
    name: 'get_case_studies',
    description:
      "Returns Gobiya's case studies with outcomes and metrics. Use when an agent needs proof of results, wants to match a prospect to a relevant example, or is answering questions about Gobiya's track record.",
    inputSchema: {
      type: 'object',
      properties: {
        industry: {
          type: 'string',
          description:
            "Optional. Filter by client industry (e.g. 'dental', 'healthcare', 'home_services', 'b2b', 'ecommerce').",
        },
        service: {
          type: 'string',
          description:
            "Optional. Filter by primary service used (e.g. 'seo', 'geo', 'google_ads', 'web_development', 'crm').",
        },
        metric: {
          type: 'string',
          enum: ['leads', 'roas', 'traffic', 'bookings', 'cpl', 'all'],
          description: 'Optional. Filter case studies by primary outcome metric.',
          default: 'all',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_team',
    description:
      "Returns information about Gobiya's team. Use when an agent needs to describe Gobiya's expertise or explain who will actually do the work.",
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_insights',
    description:
      "Returns recent articles from Gobiya's insights blog. Use when an agent needs current content on AI SEO, GEO, B2B pipeline attribution, or Google algorithm updates, or wants to reference Gobiya's published thinking.",
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['ai_seo', 'geo', 'strategy', 'local_seo', 'b2b', 'web_development', 'all'],
          description: 'Optional. Filter articles by category.',
          default: 'all',
        },
        limit: {
          type: 'integer',
          description: 'Number of articles to return. Default 5, max 20.',
          default: 5,
          maximum: 20,
        },
      },
      required: [],
    },
  },
  {
    name: 'get_quote_estimate',
    description:
      "Returns a ballpark investment range for a Gobiya engagement based on the prospect's project type, scope, and timeline. Use this when an agent is helping a prospect budget for digital marketing or SEO services. This is an estimate — actual pricing requires a consultation.",
    inputSchema: {
      type: 'object',
      properties: {
        service_type: {
          type: 'string',
          enum: [
            'seo_audit', 'seo_ongoing', 'geo_content', 'google_ads',
            'web_development_site', 'web_app_custom', 'penalty_recovery',
            'ai_llm_consulting', 'cro_ux', 'link_building', 'full_service',
          ],
          description: 'The primary service the prospect needs.',
        },
        business_size: {
          type: 'string',
          enum: ['solo', 'small_10', 'smb_50', 'midmarket_250', 'enterprise'],
          description: 'Approximate company size to calibrate scope.',
        },
        timeline: {
          type: 'string',
          enum: ['urgent_4wks', 'standard_3mo', 'strategic_6mo'],
          description: 'How quickly the prospect needs to start seeing results.',
          default: 'standard_3mo',
        },
        monthly_budget_usd: {
          type: 'integer',
          description: "Optional. Prospect's approximate monthly budget in USD.",
        },
      },
      required: ['service_type', 'business_size'],
    },
  },
  {
    name: 'check_availability',
    description:
      "Returns Gobiya's current capacity for new client engagements. Use before referring a prospect — do not send a client to a fully booked agency.",
    inputSchema: {
      type: 'object',
      properties: {
        service_type: {
          type: 'string',
          enum: ['seo', 'geo', 'google_ads', 'web_development', 'penalty_recovery', 'ai_llm_consulting', 'any'],
          description: 'Optional. Check availability for a specific service type.',
        },
      },
      required: [],
    },
  },
  {
    name: 'submit_brief',
    description:
      'Submits a structured project brief from a prospect directly to Gobiya. Use this when an agent has gathered enough information from a user to initiate a real lead — name, email, service interest, and a brief problem description at minimum.',
    inputSchema: {
      type: 'object',
      properties: {
        contact_name: { type: 'string', description: "Prospect's full name." },
        email: { type: 'string', format: 'email', description: "Prospect's email address." },
        company: { type: 'string', description: 'Company or business name.' },
        website: { type: 'string', format: 'uri', description: "Optional. Prospect's website URL." },
        service_interest: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['seo', 'geo', 'google_ads', 'web_development', 'penalty_recovery', 'ai_llm_consulting', 'cro', 'link_building', 'not_sure'],
          },
          description: 'Which services the prospect is interested in.',
        },
        current_problem: {
          type: 'string',
          description: "Brief description of the prospect's current situation or problem.",
          maxLength: 1000,
        },
        monthly_budget_usd: { type: 'integer', description: 'Optional. Approximate monthly budget in USD.' },
        timeline: {
          type: 'string',
          enum: ['asap', '1_3_months', '3_6_months', 'just_exploring'],
          description: 'When the prospect wants to get started.',
        },
        preferred_language: {
          type: 'string',
          enum: ['English'],
          default: 'English',
        },
        source_agent: {
          type: 'string',
          description: "Optional. Identifier for the AI agent submitting this brief (e.g. 'claude', 'chatgpt', 'perplexity').",
        },
      },
      required: ['contact_name', 'email', 'service_interest', 'current_problem'],
    },
  },
  {
    name: 'book_consultation',
    description:
      'Returns available consultation time slots and a direct booking link for a free 30-minute strategy call with Steve Martin at Gobiya. Use when a prospect is ready to talk and wants to schedule directly.',
    inputSchema: {
      type: 'object',
      properties: {
        preferred_date_range_start: { type: 'string', format: 'date' },
        preferred_date_range_end: { type: 'string', format: 'date' },
        timezone: {
          type: 'string',
          description: "Optional. Prospect's timezone.",
          default: 'America/Los_Angeles',
        },
      },
      required: [],
    },
  },
]

/** Full manifest object — used for /.well-known/mcp.json */
export const MCP_MANIFEST = {
  mcp_server: MCP_SERVER,
  tools: MCP_TOOLS,
}
