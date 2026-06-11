# Contributing Content

Non-coders should edit only files in `src/content/` and images in `public/images/`. Do not change files outside those folders.

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

## People (`src/content/people/`)

Create a new `.md` file per person.

| Field | Type | Required |
|---|---|---|
| `name` | string | yes |
| `role` | enum: `pi`, `postdoc`, `phd`, `masters`, `undergrad`, `staff`, `associated`, `alumni` | yes |
| `photo` | string (path under `public/`) | yes |
| `email` | string | no |
| `website` | string (URL) | no |
| `order` | number (sort order within role group) | yes |

The markdown body is the person's bio.

```yaml
---
name: Jane Doe
role: phd
photo: /images/people/jane.jpg
email: jane@example.edu
website: https://example.edu/~jane
order: 1
---

Short bio in markdown.
```

## Publications (`src/content/publications/`)

Create a new `.md` file per publication. No markdown body is rendered.

| Field | Type | Required |
|---|---|---|
| `title` | string | yes |
| `authors` | string | yes |
| `venue` | string | yes |
| `year` | number | yes |
| `pdf` | string (URL) | no |
| `code` | string (URL) | no |

```yaml
---
title: "Example Paper Title"
authors: "A. Author, B. Author"
venue: "Journal of Examples"
year: 2025
pdf: https://example.com/paper.pdf
code: https://github.com/example/repo
---
```

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
