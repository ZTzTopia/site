import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const projects = defineCollection({
  loader: file('./src/data/projects.json'),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().default('No description.'),
    url: z.string(),
    tags: z
      .union([z.string(), z.array(z.string()), z.null()])
      .optional()
      .transform((val) => (Array.isArray(val) ? val : [val])),
  }),
});

const experiences = defineCollection({
  loader: file('./src/data/experiences.json'),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().default('No description.'),
    startDate: z.string(),
    endDate: z.string(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '*/*/*.{md,mdx}', base: './src/data/writeups' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    start: z.date().optional(),
    end: z.date().optional(),
    location: z.string().optional(),
    format: z.string().optional(),
    url: z.string().optional(),
  }),
});

const challenges = defineCollection({
  loader: glob({ pattern: '*/*/*/*/*.{md,mdx}', base: './src/data/writeups' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    categories: z
      .union([z.string(), z.array(z.string()), z.null()])
      .optional()
      .transform((val) => (Array.isArray(val) ? val : [val])),
    tags: z
      .union([z.string(), z.array(z.string()), z.null()])
      .optional()
      .transform((val) => (Array.isArray(val) ? val : [val])),
    draft: z.boolean().optional(),
    completedDuringEvent: z.boolean().optional(),
    submitted: z.boolean().optional(),
    blooded: z.boolean().optional(),
    points: z.number().optional(),
    solves: z.number().optional(),
    flags: z
      .union([z.string(), z.array(z.string()), z.null()])
      .optional()
      .transform((val) => (Array.isArray(val) ? val : [val])),

    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']).optional(),
    os: z.enum(['linux', 'windows', 'none']).optional(),
    url: z.string().optional(),
  }),
});

export const collections = {
  projects,
  experiences,
  events,
  challenges,
};
