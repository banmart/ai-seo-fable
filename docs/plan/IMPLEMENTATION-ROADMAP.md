# GOBIYA — Implementation Roadmap

Scope: homepage + outcome pages + problem pages + tools. No blog, no services pages.

## Phase 1: Foundation (weeks 1–3)

- [ ] Decide canonical domain (gobiya.agency vs gobiya.com); align layout.jsx, JSON-LD, MCP manifest.
- [ ] Add `app/robots.js`, `app/sitemap.js`, `public/llms.txt`.
- [ ] Build shared `SubpageLayout` (Header + static column + Footer, server component, global index.css styles — no scrub stage/HUD).
- [ ] Ship **Aged Domain Lookup** tool (RDAP + Wayback CDX + DNS; no API keys needed).
- [ ] First page pair: /problems/invisible-to-ai + /outcomes/cited-by-ai.
- [ ] Remove or noindex /design-ideas.
- [ ] GA4 + Search Console + Bing Webmaster; submit sitemap.

## Phase 2: Coverage (weeks 4–8)

- [ ] Remaining problem pages (google-penalty, traffic-no-leads, pages-not-indexed, losing-clicks-to-ai).
- [ ] Remaining outcome pages (traffic-that-converts, rank-at-scale, algorithm-proof).
- [ ] /outcomes and /problems index pages; /tools hub page.
- [ ] AI Visibility Checker tool.
- [ ] Cross-linking pass: problem ↔ outcome ↔ tool per SITE-STRUCTURE.md rules.
- [ ] Replace homepage placeholder stats with real engagement data.

## Phase 3: Tools & reach (weeks 9–16)

- [ ] llms.txt Generator, Schema Generator, Index Bloat Analyzer.
- [ ] Pitch tools to SEO/dev communities (r/SEO, newsletters, HN for the MCP angle).
- [ ] Track AI citations for category queries; iterate problem-page copy toward citability.
- [ ] Core Web Vitals audit (LCP < 2.5s, INP < 200ms, CLS < 0.1).

## Phase 4: Authority (months 5–12)

- [ ] MCP Manifest Generator tool + PR push ("make your site agent-ready").
- [ ] Original-research page from aggregated tool data (lives under /tools, not a blog).
- [ ] Quarterly: schema validation, SEO drift check, KPI review.

## Risks

- Domain split must resolve in Phase 1 — split entity signals hurt Google and AI citations.
- Homepage is client-only; verify crawlers get content, else add static fallback.
- Tool abuse: rate-limit + cache from day one (RDAP and Wayback are free but throttled).
- Real metrics needed for outcome pages — placeholder stats are a credibility/E-E-A-T liability.
