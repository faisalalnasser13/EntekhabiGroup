# Entekhabi Group Website

Static academic lab website built with [Astro](https://astro.build/). Content is managed via Markdown files — no backend or database required.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to preview the site.

## Editing content

Non-coders should edit only:

- `src/content/` — news, people, publications, research, and openings
- `public/images/` — photos and figures

See [CONTRIBUTING.md](CONTRIBUTING.md) for field definitions and examples.

Lab name and mission statement are in `src/site.config.ts`.

## Build

```bash
npm run build
npm run preview
```

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
  content/          # Markdown content (edit here)
  content.config.ts # Content schemas (do not edit unless adding fields)
  layouts/          # Page shell
  pages/            # Routes
  components/       # Reusable UI
  styles/           # Global CSS
public/
  images/           # Static images (edit here)
```
