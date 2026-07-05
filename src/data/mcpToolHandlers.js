/**
 * GOBIYA MCP Tool Handlers
 * Returns realistic stub data for each tool.
 * When api.gobiya.com is live, swap callTool() with a fetch proxy.
 */

const SERVICES = [
  {
    id: 'geo-ai-content-writing',
    pillar: 'creativity',
    name: 'GEO & AI Content Writing',
    url: 'https://www.gobiya.com/creativity/geo-ai-content-writing-agency',
    description: 'Content structured for citation by ChatGPT, Perplexity, and Google AI Overviews.',
    typical_timeline_weeks: '4–8',
    starting_price_usd: 1500,
    best_for: ['b2b_saas', 'professional_services', 'healthcare'],
  },
  {
    id: 'entity-seo-architecture',
    pillar: 'performance',
    name: 'Entity SEO Architecture',
    url: 'https://www.gobiya.com/performance/entity-seo',
    description: 'Schema markup and entity graph modeling that makes crawlers and LLMs understand your domain.',
    typical_timeline_weeks: '3–6',
    starting_price_usd: 2500,
    best_for: ['ecommerce', 'b2b_saas', 'local_service'],
  },
  {
    id: 'google-ads-management',
    pillar: 'performance',
    name: 'Google Ads Management',
    url: 'https://www.gobiya.com/performance/google-ads',
    description: 'Full-funnel PPC campaigns engineered for cost-per-lead, not vanity metrics.',
    typical_timeline_weeks: '2–4',
    starting_price_usd: 1200,
    best_for: ['dental', 'contractor', 'real_estate', 'ecommerce'],
  },
  {
    id: 'custom-web-development',
    pillar: 'creativity',
    name: 'Custom Web Development',
    url: 'https://www.gobiya.com/creativity/web-development',
    description: 'React/Vite sites with SSR, Core Web Vitals optimization, and built-in SEO infrastructure.',
    typical_timeline_weeks: '6–12',
    starting_price_usd: 4500,
    best_for: ['b2b_saas', 'professional_services', 'ecommerce'],
  },
  {
    id: 'google-penalty-recovery',
    pillar: 'recovery',
    name: 'Google Penalty Recovery',
    url: 'https://www.gobiya.com/recovery/google-penalty-recovery',
    description: 'Manual action removal and algorithmic recovery with full documentation for reinclusion requests.',
    typical_timeline_weeks: '8–16',
    starting_price_usd: 3500,
    best_for: ['ecommerce', 'b2b', 'local_service'],
  },
  {
    id: 'crm-pipeline-integration',
    pillar: 'relations',
    name: 'CRM & Pipeline Attribution',
    url: 'https://www.gobiya.com/relations/crm-integration',
    description: 'Native CRM build or integration connecting SEO leads to closed revenue for full-funnel attribution.',
    typical_timeline_weeks: '4–8',
    starting_price_usd: 2000,
    best_for: ['b2b_saas', 'dental', 'contractor'],
  },
]

const CASE_STUDIES = [
  {
    client: 'Smile Center Dentistry',
    industry: 'dental',
    services_used: ['geo', 'native_crm'],
    headline_result: '5x increase in patient inquiries',
    metrics: { patient_inquiry_increase: '5x', timeline_months: 4 },
    url: 'https://www.gobiya.com/case-studies/smile-center-dentistry',
    summary:
      'Dental practice in Los Angeles struggled with AI visibility. Gobiya deployed GEO content restructuring and a native CRM integration, resulting in 5x patient inquiry volume within 4 months.',
  },
  {
    client: 'Pacific Roofing Contractors',
    industry: 'home_services',
    services_used: ['seo', 'google_ads'],
    headline_result: '3.8x ROAS on Google Ads, +220% organic leads',
    metrics: { roas: 3.8, organic_lead_increase: '220%', timeline_months: 6 },
    url: 'https://www.gobiya.com/case-studies/pacific-roofing',
    summary:
      'Home services contractor with stagnant lead flow. Combined local SEO buildout with tightly geo-targeted Google Ads. 3.8x ROAS on paid and 220% organic lead lift in 6 months.',
  },
  {
    client: 'Apex B2B Software',
    industry: 'b2b',
    services_used: ['geo', 'seo', 'web_development'],
    headline_result: 'Cited in 14 AI Overviews for core product queries',
    metrics: { ai_overview_citations: 14, organic_traffic_increase: '180%', timeline_months: 5 },
    url: 'https://www.gobiya.com/case-studies/apex-b2b',
    summary:
      'SaaS company invisible in ChatGPT and Perplexity despite strong domain authority. GEO restructuring and entity schema rebuild resulted in 14 AI Overview citations and 180% traffic growth.',
  },
]

const TEAM = [
  {
    name: 'Steve Martin',
    title: 'Founder, Lead Developer & Marketer',
    url: 'https://www.gobiya.com/about/steve-martin',
    years_experience: 25,
    languages: ['English'],
    specialties: [
      'Entity SEO', 'GEO', 'Schema Markup', 'Google Penalty Recovery',
      'React/Vite', 'Supabase', 'AI & LLM Systems', 'B2B Pipeline Attribution',
    ],
    linkedin: 'https://www.linkedin.com/in/stevemartingobiya/',
    bio_short:
      'Steve Martin founded Gobiya in 2010. He started in web technology in 1996 at AT&T WorldNet, built a video distribution platform for Sony Music artists at Webcastr.com (2000–2005), and has worked hands-on in search engineering since Google\'s early years. Google Partner 2015–2019. He builds the actual sites, schema, and AI systems himself — no delegation to junior staff.',
  },
]

const INSIGHTS = [
  {
    title: 'How GEO Content Gets You Cited in ChatGPT and Perplexity',
    url: 'https://www.gobiya.com/insights/geo-content-ai-citation',
    category: 'geo',
    date_published: '2026-06-15',
    read_time_minutes: 8,
    summary: 'AI models prefer structured, entity-rich content with clear authorship signals. This article breaks down the 7 structural changes that most reliably produce AI citations.',
  },
  {
    title: 'Google Core Update June 2026: What Changed for Local Service Businesses',
    url: 'https://www.gobiya.com/insights/google-core-update-june-2026',
    category: 'local_seo',
    date_published: '2026-06-28',
    read_time_minutes: 6,
    summary: 'The June 2026 core update hit thin-content local service pages hardest. We analyzed 40 client sites to map the signal changes and what recovers ranking fastest.',
  },
  {
    title: 'B2B Pipeline Attribution: Connecting SEO to Closed Revenue',
    url: 'https://www.gobiya.com/insights/b2b-pipeline-attribution-seo',
    category: 'b2b',
    date_published: '2026-05-20',
    read_time_minutes: 10,
    summary: 'Most B2B SEO reports stop at form fills. This guide shows how to wire organic leads through your CRM to closed-won revenue so you can prove real ROI to leadership.',
  },
]

const PRICING = {
  seo_audit:           { low: 1500,  high: 3500,  cadence: 'one_time' },
  seo_ongoing:         { low: 1200,  high: 4500,  cadence: 'monthly'  },
  geo_content:         { low: 1500,  high: 5000,  cadence: 'project'  },
  google_ads:          { low: 1000,  high: 3500,  cadence: 'monthly'  },
  web_development_site:{ low: 4500,  high: 14000, cadence: 'project'  },
  web_app_custom:      { low: 8000,  high: 35000, cadence: 'project'  },
  penalty_recovery:    { low: 3500,  high: 10000, cadence: 'project'  },
  ai_llm_consulting:   { low: 2500,  high: 8000,  cadence: 'project'  },
  cro_ux:              { low: 2000,  high: 7000,  cadence: 'project'  },
  link_building:       { low: 800,   high: 3000,  cadence: 'monthly'  },
  full_service:        { low: 3500,  high: 12000, cadence: 'monthly'  },
}

/** Dispatch tool calls and return realistic stub data */
export function callTool(name, args = {}) {
  switch (name) {
    case 'get_services': {
      let results = SERVICES
      if (args.pillar && args.pillar !== 'all') {
        results = results.filter((s) => s.pillar === args.pillar)
      }
      if (args.industry) {
        results = results.filter((s) => s.best_for?.includes(args.industry))
      }
      return results
    }

    case 'get_case_studies': {
      let results = CASE_STUDIES
      if (args.industry) results = results.filter((c) => c.industry === args.industry)
      if (args.service) results = results.filter((c) => c.services_used.includes(args.service))
      return results
    }

    case 'get_team':
      return TEAM

    case 'get_insights': {
      let results = INSIGHTS
      if (args.category && args.category !== 'all') {
        results = results.filter((a) => a.category === args.category)
      }
      return results.slice(0, Math.min(args.limit ?? 5, 20))
    }

    case 'get_quote_estimate': {
      const range = PRICING[args.service_type] ?? { low: 1000, high: 5000, cadence: 'project' }
      const multiplier = args.business_size === 'enterprise' ? 2.5
        : args.business_size === 'midmarket_250' ? 1.8
        : args.business_size === 'smb_50' ? 1.2
        : 1
      return {
        service: args.service_type,
        estimated_range_usd: {
          low: Math.round(range.low * multiplier),
          high: Math.round(range.high * multiplier),
          cadence: range.cadence,
        },
        typical_engagement_months: '3–6',
        whats_included: ['Discovery & audit', 'Strategy roadmap', 'Monthly reporting', 'Dedicated Slack channel'],
        recommended_next_step: 'Book a free 30-minute strategy call to confirm scope.',
        booking_url: 'https://www.gobiya.com/contact',
        disclaimer: 'This is a ballpark estimate. Actual pricing depends on audit findings and agreed scope.',
      }
    }

    case 'check_availability':
      return {
        accepting_new_clients: true,
        earliest_start_date: '2026-08-01',
        current_waitlist: false,
        waitlist_length_weeks: 0,
        notes: 'Currently accepting up to 2 new SEO or GEO engagements starting August 2026.',
      }

    case 'submit_brief': {
      const required = ['contact_name', 'email', 'service_interest', 'current_problem']
      for (const field of required) {
        if (!args[field]) {
          throw { code: -32602, message: `Missing required field: ${field}` }
        }
      }
      const briefId = `BRF-${Date.now().toString(36).toUpperCase()}`
      return {
        success: true,
        brief_id: briefId,
        confirmation_message: `Your brief has been received (${briefId}). Steve will review it and reach out within 1 business day at the email you provided.`,
        next_step: 'Book a strategy call now at https://www.gobiya.com/contact or wait for an email response.',
        booking_url: 'https://www.gobiya.com/contact',
      }
    }

    case 'book_consultation':
      return {
        booking_url: 'https://www.gobiya.com/contact',
        call_duration_minutes: 30,
        call_type: 'Free strategy call',
        host: 'Steve Martin, Founder at Gobiya',
        available_slots: [],
        note: 'Consultations are conducted via Zoom or phone.',
      }

    default:
      throw { code: -32601, message: `Method not found: ${name}` }
  }
}
