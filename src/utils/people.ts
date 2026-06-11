export const ROLE_ORDER = [
	'pi',
	'postdoc',
	'phd',
	'masters',
	'undergrad',
	'staff',
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
	alumni: 'Alumni',
};
