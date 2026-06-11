export const ROLE_ORDER = [
	'pi',
	'postdoc',
	'phd',
	'masters',
	'undergrad',
	'staff',
	'associated',
	'alumni',
] as const;

export type PersonRole = (typeof ROLE_ORDER)[number];

export const ROLE_LABELS: Record<PersonRole, string> = {
	pi: 'Principal Investigator',
	postdoc: 'Postdoctoral Researcher',
	phd: 'PhD Student',
	masters: "Master's Student",
	undergrad: 'Undergraduate',
	staff: 'Staff',
	associated: 'Associated Member',
	alumni: 'Alumni',
};

export const CURRENT_MEMBER_ROLES = ['postdoc', 'phd', 'masters', 'undergrad'] as const;
export const ASSOCIATED_MEMBER_ROLES = ['staff', 'associated'] as const;

export const PEOPLE_SECTIONS = [
	{ id: 'current', title: 'Current Members', roles: CURRENT_MEMBER_ROLES },
	{ id: 'associated', title: 'Associated Members', roles: ASSOCIATED_MEMBER_ROLES },
	{ id: 'alumni', title: 'Alumni', roles: ['alumni'] as const },
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
