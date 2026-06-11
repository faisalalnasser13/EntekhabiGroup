# Entekhabi Group Website

Static academic lab website built with [Astro](https://astro.build/). Content is managed via Markdown files — no backend or database required.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to preview the site.

## Editing content

**Only edit these folders** (unless noted):

- `src/content/` — page content (Markdown)
- `src/data/publications.yaml` — manual publications
- `public/images/` — photos and figures

Put images in `public/images/` and reference them as `/images/your-file.jpg`.

For full field definitions, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

### Home (`/`)

**Lab name and mission** — edit `src/site.config.ts`:

```ts
labName: 'Entekhabi Group',
mission: 'Your one-sentence mission here.',
```

**Lab News** — add or edit files in `src/content/news/`. One file per item.

```yaml
---
title: "Paper accepted at Example Conference"
date: 2025-09-15
image: /images/news-example.jpg   # optional
---

News text goes here. Markdown is supported.
```

Newest items appear first.

---

### People (`/people`)

Add a file in `src/content/people/` (e.g. `jane-doe.md`). One file per person.

```yaml
---
name: Jane Doe
role: phd                        # pi | postdoc | phd | masters | undergrad | staff | associated | alumni
photo: /images/people/jane.jpg
email: jane@example.edu          # optional
website: https://example.edu/~jane   # optional
order: 1
---

Short bio in markdown.
```

**How people are grouped on the page:**

| Section | Roles |
|---|---|
| PI (top row) | `pi` |
| Current Members | `postdoc`, `phd`, `masters`, `undergrad` |
| Associated Members | `staff`, `associated` |
| Alumni | `alumni` |

---

### Research (`/research`)

Add or edit files in `src/content/research/`. One file per topic.

```yaml
---
title: "Remote Sensing"
image: /images/research/rs.jpg   # optional
order: 1                         # optional, lower = first
---

Description of this research area.
```

---

### Publications (`/publications`)

**Most papers load automatically** from OpenAlex (latest 25). You usually do not need to add them by hand.

| Task | What to do |
|---|---|
| Refresh the list | Run `npm run fetch-publications` (also runs monthly via GitHub Actions) |
| Hide a paper | Add its DOI to `scripts/exclusions.json` |
| Add a paper manually | Append an entry to `src/data/publications.yaml` |
| Add PDF or code link | Add a manual entry with the same `doi` — it merges with the OpenAlex entry |

Edit [`src/data/publications.yaml`](src/data/publications.yaml) on GitHub (pencil icon). **Indentation matters** — use 2 spaces per level.

```yaml
example-paper:
  title: Example Paper Title
  authors: A. Author, B. Author
  venue: Journal of Examples
  year: 2025
  doi: 10.1234/example             # optional, used for deduplication
  pdf: https://example.com/paper.pdf   # optional
  code: https://github.com/example/repo   # optional
```

---

### Openings (`/openings`)

Edit the single file `src/content/openings/openings.md`:

```yaml
---
title: "Open Positions"
---

## PhD Students

We are recruiting PhD students for Fall 2026.
```

Do not add other files to this folder.

---

## Build

```bash
npm run build
npm run preview
```

## Publications sync

Fetch the latest 25 publications from OpenAlex (ORCID `0000-0002-8362-4761`):

```bash
npm run fetch-publications
```

Output is written to `src/data/publications.json`. Exclude DOIs via `scripts/exclusions.json`. A GitHub Actions workflow syncs monthly and on manual dispatch.

## Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. Update `site` in `astro.config.mjs` to your final URL (e.g. `https://lab.example.edu` or `https://yourorg.github.io`).
3. If using a **project site** (URL like `https://yourorg.github.io/repo-name/`), also set `base: '/repo-name/'`.
4. In the repo **Settings → Pages**, set **Source** to **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**.
5. Push to the `main` branch — the workflow in `.github/workflows/deploy.yml` builds and publishes to `gh-pages`.

Live URL: **https://faisalalnasser13.github.io/EntekhabiGroup/**

For a custom domain, configure it under **Settings → Pages → Custom domain** after updating `site` in `astro.config.mjs`.

## Project structure

```
src/
  content/          # Markdown: news, people, research, openings
  data/             # publications.yaml + publications.json (OpenAlex)
  content.config.ts # Content schemas (do not edit unless adding fields)
  layouts/          # Page shell
  pages/            # Routes
  components/       # Reusable UI
  styles/           # Global CSS
public/
  images/           # Static images (edit here)
```
