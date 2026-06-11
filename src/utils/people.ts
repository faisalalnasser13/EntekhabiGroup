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
