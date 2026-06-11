#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ORCID = process.env.ORCID ?? '0000-0002-8362-4761';
const LIMIT = Number(process.env.PUBLICATION_LIMIT ?? 25);
const OUTPUT_PATH = join(ROOT, 'src/data/publications.json');
const EXCLUSIONS_PATH = join(ROOT, 'scripts/exclusions.json');
const MAILTO = process.env.OPENALEX_MAILTO ?? 'alnasser@mit.edu';

function normalizeDoi(doi) {
	if (!doi) return null;
	return doi
		.replace(/^https?:\/\/doi\.org\//i, '')
		.toLowerCase()
		.trim();
}

function loadExclusions() {
	try {
		const raw = readFileSync(EXCLUSIONS_PATH, 'utf8');
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed.dois) ? parsed.dois : [];
	} catch {
		return [];
	}
}

function formatAuthors(authorships = []) {
	return authorships
		.map((entry) => entry.raw_author_name ?? entry.author?.display_name)
		.filter(Boolean)
		.join(', ');
}

function formatVenue(work) {
	return (
		work.primary_location?.source?.display_name ??
		work.primary_location?.raw_source_name ??
		work.locations?.[0]?.source?.display_name ??
		work.locations?.[0]?.raw_source_name ??
		''
	);
}

function mapWork(work) {
	const doi = normalizeDoi(work.doi);
	const pdf =
		work.best_oa_location?.pdf_url ??
		work.primary_location?.pdf_url ??
		undefined;

	return {
		title: work.display_name ?? work.title ?? 'Untitled',
		authors: formatAuthors(work.authorships),
		venue: formatVenue(work),
		year: work.publication_year ?? null,
		doi,
		pdf,
		source: 'openalex',
		openalexId: work.id ?? null,
	};
}

async function fetchOpenAlexWorks(excludedDois) {
	const publications = [];
	let page = 1;
	const perPage = 50;

	while (publications.length < LIMIT) {
		const url = new URL('https://api.openalex.org/works');
		url.searchParams.set(
			'filter',
			`authorships.author.orcid:https://orcid.org/${ORCID}`,
		);
		url.searchParams.set('sort', 'publication_date:desc');
		url.searchParams.set('per_page', String(perPage));
		url.searchParams.set('page', String(page));
		url.searchParams.set('mailto', MAILTO);

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`OpenAlex API error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		const results = data.results ?? [];

		if (results.length === 0) break;

		for (const work of results) {
			const doi = normalizeDoi(work.doi);
			if (doi && excludedDois.has(doi)) continue;
			if (!work.publication_year) continue;

			publications.push(mapWork(work));
			if (publications.length >= LIMIT) break;
		}

		const total = data.meta?.count ?? 0;
		if (publications.length >= LIMIT || page * perPage >= total) break;
		page += 1;
	}

	return publications.sort((a, b) => {
		if ((b.year ?? 0) !== (a.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
		return a.title.localeCompare(b.title);
	});
}

async function main() {
	const excludedDois = new Set(
		loadExclusions().map(normalizeDoi).filter(Boolean),
	);

	console.log(`Fetching up to ${LIMIT} publications for ORCID ${ORCID}...`);
	const publications = await fetchOpenAlexWorks(excludedDois);
	console.log(`Fetched ${publications.length} publications (${excludedDois.size} DOIs excluded).`);

	const payload = {
		orcid: ORCID,
		fetchedAt: new Date().toISOString(),
		limit: LIMIT,
		publications,
	};

	mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
	writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
	console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
