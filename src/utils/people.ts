export const PERSON_GROUPS = ['pi', 'current', 'associated', 'alumni'] as const;

export type PersonGroup = (typeof PERSON_GROUPS)[number];

export const PEOPLE_SECTIONS = [
	{ id: 'current', title: 'Current Members', role: 'current' as const },
	{ id: 'associated', title: 'Associated Members', role: 'associated' as const },
	{ id: 'alumni', title: 'Alumni', role: 'alumni' as const },
] as const;

export function getLastName(name: string): string {
	const parts = name.trim().split(/\s+/);
	return parts[parts.length - 1] ?? name;
}

export function sortByLastName<T extends { data: { name: string } }>(entries: T[]): T[] {
	return [...entries].sort((a, b) =>
		getLastName(a.data.name).localeCompare(getLastName(b.data.name), undefined, {
			sensitivity: 'base',
		}),
	);
}
