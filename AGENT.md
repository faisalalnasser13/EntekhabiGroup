# AGENT.md — Lab Website Spec

Build a static academic lab website. Reference for tone/structure: https://earthintelligence.mit.edu/ (minimal, whitespace, sans-serif, one accent color, mobile-responsive).

## Stack
- Astro + TypeScript, static output. No backend, no database.
- Plain CSS (or minimal Tailwind). Markdown + YAML frontmatter for all content.
- Deploy: GitHub Pages via GitHub Actions on push to `main`. Set `site` and `base` in `astro.config.mjs` and use them for all internal links/assets.

## Pages
`/` (home), `/people`, `/research`, `/publications`, `/openings`. Shared BaseLayout with nav + footer.

- **Home:** lab name, one-sentence mission, hero animation, then "Lab News" feed from the news collection, newest first (image + date + rich-text body per item).
- **People:** grid grouped by role in this order: pi, postdoc, phd, masters, undergrad, staff, alumni. Sort by `order` within group.
- **Publications:** grouped by year, descending. Show title, authors, venue, and PDF/code links when present.
- **Research / Openings:** render from their collections.

## Content collections
Use Astro content collections with Zod schemas. Schemas MUST match CONTRIBUTING.md exactly:
- `news` (markdown in `src/content/news/`): title (string), date (date), image (string, optional) + markdown body
- `people` (markdown in `src/content/people/`): name, role (enum), photo, email?, website?, order (number) + markdown body
- `publications` (yaml in `src/data/publications.yaml` + OpenAlex json): title, authors, venue, year (number), doi?, pdf?, code?
- `research` (markdown in `src/content/research/`): title, image?, order? + body
- `openings`: single openings.md

## Rules
- Non-coders edit `src/content/`, `src/data/publications.yaml`, and `public/images/`. Keep all logic out of those folders.
