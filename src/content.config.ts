import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const personRole = z.enum([
	'pi',
	'postdoc',
	'phd',
	'masters',
	'undergrad',
	'staff',
	'associated',
	'alumni',
]);

const news = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		image: z.string().optional(),
	}),
});

const people = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
	schema: z
		.object({
			name: z.string(),
			role: personRole,
			photo: z.string(),
			email: z.string().optional(),
			website: z.string().optional(),
			order: z.number(),
		})
		.strict(),
});

const publications = defineCollection({
	loader: file('./src/data/publications.yaml'),
	schema: z
		.object({
			title: z.string(),
			authors: z.string(),
			venue: z.string(),
			year: z.number(),
			doi: z.string().optional(),
			pdf: z.string().optional(),
			code: z.string().optional(),
		})
		.strict(),
});

const research = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
	schema: z.object({
		title: z.string(),
		image: z.string().optional(),
		order: z.number().optional(),
	}),
});

const openings = defineCollection({
	loader: glob({ pattern: 'openings.md', base: './src/content/openings' }),
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { news, people, publications, research, openings };
