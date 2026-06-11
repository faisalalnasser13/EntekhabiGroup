export interface Publication {
	title: string;
	authors: string;
	venue: string;
	year: number;
	doi?: string | null;
	pdf?: string | null;
	code?: string | null;
	source?: 'openalex' | 'manual';
}

export function normalizeDoi(doi?: string | null): string | null {
	if (!doi) return null;
	return doi
		.replace(/^https?:\/\/doi\.org\//i, '')
		.toLowerCase()
		.trim();
}

function normalizeTitle(title: string): string {
	return title.toLowerCase().replace(/\s+/g, ' ').trim();
}

function publicationKey(pub: Publication): string {
	const doi = normalizeDoi(pub.doi);
	if (doi) return `doi:${doi}`;
	return `title:${normalizeTitle(pub.title)}|${pub.year}`;
}

export function mergePublications(
	openAlex: Publication[],
	manual: Publication[],
): Publication[] {
	const merged = new Map<string, Publication>();

	for (const pub of openAlex) {
		merged.set(publicationKey(pub), { ...pub, source: 'openalex' });
	}

	for (const pub of manual) {
		const key = publicationKey(pub);
		const existing = merged.get(key);

		if (existing) {
			merged.set(key, {
				...existing,
				pdf: pub.pdf ?? existing.pdf,
				code: pub.code ?? existing.code,
				venue: pub.venue || existing.venue,
				authors: pub.authors || existing.authors,
			});
			continue;
		}

		merged.set(key, { ...pub, source: 'manual' });
	}

	return [...merged.values()].sort((a, b) => {
		if (b.year !== a.year) return b.year - a.year;
		return a.title.localeCompare(b.title);
	});
}

export function groupPublicationsByYear(
	publications: Publication[],
): Map<number, Publication[]> {
	const byYear = new Map<number, Publication[]>();

	for (const pub of publications) {
		if (!byYear.has(pub.year)) {
			byYear.set(pub.year, []);
		}
		byYear.get(pub.year)!.push(pub);
	}

	return byYear;
}
