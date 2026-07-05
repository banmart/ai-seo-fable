# GOBIYA — Free Tools Plan (/tools)

Each tool is a lead magnet and a live demo of expertise. Tool result screens link to the matching **problem page** ("we found this issue → here's what it means") and the deploy CTA. Tools are free and ungated; only optional "email me the full report" captures leads.

## Build order

### 1. Aged Domain Lookup — `/tools/aged-domain-lookup` (FIRST)

Checks a domain's age, history, and baggage before you buy or build on it.

- **Inputs:** domain name.
- **Checks (server-side route handler):**
  - Registration/creation date via RDAP (free, no API key: `https://rdap.org/domain/{domain}`) — registrar, creation, expiry.
  - Wayback Machine history via CDX API (free): first snapshot date, snapshot count, gap years, and what the site used to be (titles of old snapshots → detect PBN/casino/pharma past).
  - DNS state (has it been parked / dropped) via DNS-over-HTTPS lookup.
  - Optional later: spam-history signals (blocklist checks), backlink counts via DataForSEO if key present.
- **Output:** age in years, timeline visualization (reuse `.stat-grid` + `.spec-list` styling), risk flags ("content pivot detected in 2019 — was a Vietnamese casino site"), verdict tile.
- **CTA:** risky history → /problems/google-penalty; clean aged domain → deploy form.
- **Caching:** cache per-domain 24h; rate-limit by IP.

### 2. AI Visibility Checker — `/tools/ai-visibility-checker`

Brand + domain in → are you cited when AI assistants answer category questions? Flagship GEO demo. Claude API server-side, cached 24h. Links to /problems/invisible-to-ai.

### 3. llms.txt Generator — `/tools/llms-txt-generator`

URL in → drafted llms.txt out. Cheap, shareable, on-brand with the MCP positioning.

### 4. Schema Markup Generator — `/tools/schema-generator`

Guided form → validated JSON-LD. Evergreen link magnet. Links to /problems/pages-not-indexed.

### 5. Index Bloat Analyzer — `/tools/index-bloat-analyzer`

Fetches sitemap, samples URLs, flags thin/duplicate patterns. Pairs with the programmatic-SEO positioning and /problems/pages-not-indexed.

### 6. MCP Manifest Generator — `/tools/mcp-generator`

Form → .well-known/mcp.json. Unique in the market; PR angle: "make your site agent-ready."

## Shared requirements

- Server component page + one client island for the tool form; 600–1,000 words of crawlable supporting copy (what it checks, methodology, FAQ) below the tool — that's what ranks.
- **Styling:** global `index.css` only — tool UI built from existing classes (`.deploy-form` inputs, `.cta`, `.proof-grid` for results, `.spec-list` for findings). New shared tool styles go in the `/* Subpages */` section of index.css.
- WebApplication + FAQPage schema on every tool page.
- Rate limit by IP; log anonymized usage — aggregate data becomes citable original research for outreach.
