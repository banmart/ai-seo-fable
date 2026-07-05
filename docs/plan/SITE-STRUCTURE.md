# GOBIYA — Site Structure & Page Plan

Direction: **no blog, no services pages.** The site is the scroll-narrative homepage + outcome/pain-point pages + free tools. Every page uses the existing global design system (see "Global styling" below).

Current state: `/` (scroll-driven homepage), `/mcp`, `/design-ideas`, `/.well-known/mcp.json`, `POST /mcp/v1`.

## Target URL hierarchy

```
/
├── /outcomes                                ← index: "What we make happen"
│   ├── /outcomes/cited-by-ai                ← brand shows up in ChatGPT/Perplexity/AI Overviews answers
│   ├── /outcomes/traffic-that-converts      ← behavioral architecture → conversion lift
│   ├── /outcomes/rank-at-scale              ← programmatic pages indexed & ranking
│   └── /outcomes/algorithm-proof            ← core-update resilience / stability
├── /problems                                ← index: "What's breaking your search revenue"
│   ├── /problems/invisible-to-ai            ← AI assistants never mention your brand
│   ├── /problems/traffic-no-leads           ← traffic exists, pipeline doesn't
│   ├── /problems/google-penalty             ← manual action / core-update crash
│   ├── /problems/pages-not-indexed          ← crawl/index bloat, thin programmatic content
│   └── /problems/losing-clicks-to-ai        ← AI Overviews eating CTR
├── /tools                                   ← free tools hub (see AI-TOOLS.md)
│   ├── /tools/aged-domain-lookup            ← FIRST BUILD
│   ├── /tools/ai-visibility-checker
│   └── /tools/...
├── /mcp                                     ← keep
├── /llms.txt, /sitemap.xml, /robots.txt     ← referenced/expected but missing — build
└── (contact = homepage #apex deploy form; no separate contact page)
```

## How outcome & problem pages work together

- **Problem pages** target pain-point search queries ("website not showing up in chatgpt", "google penalty recovery", "high traffic no conversions"). They open with the symptom, diagnose causes, and end with the outcome we deliver.
- **Outcome pages** are the proof-side mirror ("get cited by AI", "conversion-engineered traffic"). They carry metrics, mini case evidence, and the deploy CTA.
- Each problem page links to exactly one outcome page (its resolution) and one relevant tool (its diagnostic). Each outcome page links back to the problems it solves. Tools link to the problem page matching what they detect ("Domain has spam history? → /problems/google-penalty").

## Page template (both types)

Reuses homepage vocabulary so everything feels native:
1. `kicker mono` status line (e.g. `// PROBLEM 03 — INDEX STATE: PENALIZED`)
2. `h1` — symptom or outcome, in the site's declarative voice
3. `.lede` — 2–3 sentence framing
4. `.spec-list` — diagnosis steps or mechanism (how we fix/achieve it)
5. `.proof-grid` — 3 metrics/evidence tiles
6. `.cta` → `/#apex` deploy form
7. FAQ block (3–5 Q&As) → FAQPage schema

## Schema per page type

| Page | Schema |
|---|---|
| Outcome/problem pages | WebPage + FAQPage; Service schema stays on homepage @graph only |
| /tools/* | WebApplication + FAQPage |
| /tools/aged-domain-lookup | WebApplication, free, browser-based |

## Global styling (single source of truth)

- **All tokens and components live in `src/index.css`** (imported once in `layout.jsx`). New pages must use existing classes: `.zone__pin`-style column layout, `.kicker`, `.lede`, `.proof-grid`, `.spec-list`, `.stat-grid`, `.cta`, `.mono`.
- Add one shared `SubpageLayout` component (Header + static content column + Footer) — same fonts, colors, spacing, but **no scroll-scrub stage, no HUD** (those stay homepage-only). Subpages are server components: static HTML, fully crawlable.
- Any new component styles get appended to `index.css` under a `/* ---------- Subpages ---------- */` section — no per-page CSS files (fold `MCPPage.css`/`DesignIdeas.css` conventions into this over time).
- `/design-ideas` should be removed or noindexed before launch — it's an internal scratchpad.

## Technical fixes (pre-launch)

- `layout.jsx` uses `gobiya.agency`; `mcpManifest.js` uses `gobiya.com` — pick one canonical domain everywhere.
- Add `app/robots.js`, `app/sitemap.js`, `public/llms.txt`.
- Per-page `generateMetadata` (title, description, canonical, OG) for every new route.
