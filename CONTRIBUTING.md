# Contributing Content

Non-coders should edit content in:

- `src/content/` — news, research, and openings (Markdown); people and manual publications (YAML)
- `public/images/` — photos and figures

Do not change files outside those folders unless you know what you are doing.

## News (`src/content/news/`)

Create a new `.md` file per news item.

| Field | Type | Required |
|---|---|---|
| `title` | string | yes |
| `date` | date (YYYY-MM-DD) | yes |
| `image` | string (path under `public/`, e.g. `/images/news.jpg`) | no |

The markdown body below the frontmatter is the news article text.

```yaml
---
title: "Paper accepted at Example Conference"
date: 2025-09-15
image: /images/news-example.jpg
---

Your news text here. Markdown is supported.
```

## People (`src/content/people.yaml`)

Edit [`src/content/people.yaml`](src/content/people.yaml) on GitHub: open the file, click the pencil icon, and append a new entry at the bottom.

**Indentation matters in YAML.** Use two spaces per level. Do not use tabs.

Each person is one block. The top-level key is a unique ID (lowercase, hyphens, e.g. `jane-doe`):

```yaml
jane-doe:
  name: Jane Doe
  title: PhD Student
  role: current
  photo: /images/people/jane.jpg
  email: jane@example.edu
  website: https://example.edu/~jane
  order: 1
  bio: Short bio as plain text.
```

| Field | Type | Required |
|---|---|---|
| `name` | string | yes |
| `title` | string (job title shown on the site, e.g. `PhD Student`, `Professor`) | yes |
| `role` | enum: `pi`, `current`, `associated`, `alumni` (controls which section they appear in) | yes |
| `photo` | string (path under `public/`) | yes |
| `email` | string | no |
| `website` | string (URL) | no |
| `order` | number | yes |
| `bio` | string (plain text) | no |

Members and alumni are sorted alphabetically by last name within their section.

**Section groups:** `pi` (top row), `current` (Current Members), `associated` (Associated Members), `alumni` (Alumni).

## Publications

Most publications load automatically from OpenAlex (`src/data/publications.json`). To exclude a DOI, add it to [`scripts/exclusions.json`](scripts/exclusions.json).

**Manual publications** go in [`src/content/publications.yaml`](src/content/publications.yaml). Edit on GitHub with the pencil icon and append a new block:

```yaml
example-paper:
  title: Example Paper Title
  authors: A. Author, B. Author
  venue: Journal of Examples
  year: 2025
  doi: 10.1234/example
  pdf: https://example.com/paper.pdf
  code: https://github.com/example/repo
```

| Field | Type | Required |
|---|---|---|
| `title` | string | yes |
| `authors` | string | yes |
| `venue` | string | yes |
| `year` | number | yes |
| `doi` | string | no |
| `pdf` | string (URL) | no |
| `code` | string (URL) | no |

**Indentation matters in YAML.** Use two spaces per level. The top-level key is a unique ID (e.g. `example-paper`).

Manual entries merge with the OpenAlex list (matched by DOI when present).

## Research (`src/content/research/`)

Create a new `.md` file per research area.

| Field | Type | Required |
|---|---|---|
| `title` | string | yes |
| `image` | string (path under `public/`) | no |
| `order` | number | no |

The markdown body describes the research area.

```yaml
---
title: "Remote Sensing"
image: /images/research/rs.jpg
order: 1
---

Description of this research area.
```

## Openings (`src/content/openings/openings.md`)

Edit the single file `openings.md`. Do not add other files to this folder.

| Field | Type | Required |
|---|---|---|
| `title` | string | yes |

The markdown body lists current openings.

```yaml
---
title: "Open Positions"
---

## PhD Students

We are recruiting PhD students for Fall 2026.
```

## Images

Place images in `public/images/`. Reference them with paths starting with `/images/`, for example `/images/people/jane.jpg`.
