import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const projects = defineCollection({
  loader: file('./src/data/projects.json'),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    url: z.string()
  })
});

const events = defineCollection({
  loader: glob({ pattern: "*/*.{md,mdx}", base: "./src/data/events" }),
  schema: z.object({
    title: z.string()
  })
});

const eventYears = defineCollection({
  loader: glob({ pattern: "*/*/*.{md,mdx}", base: "./src/data/events" }),
  schema: z.object({
    title: z.string(),
    start: z.date().optional(),
    end: z.date().optional(),
    location: z.string().optional(),
    format: z.string().optional(),
    url: z.string().optional()
  })
});

const eventYearChallenges = defineCollection({
  loader: glob({ pattern: "*/*/*/*/*.{md,mdx}", base: "./src/data/events" }),
  schema: z.object({
    title: z.string(),
    category: z.union([z.string(), z.array(z.string()), z.null()]).optional(),
    tags: z.union([z.string(), z.array(z.string()), z.null()]).optional(),
    draft: z.boolean().optional(),
    completedDuringEvent: z.boolean().optional(),
    submitted: z.boolean().optional(),
    flag: z.string().optional()
  })
});

export const collections = {
  projects,
  events,
  eventYears,
  eventYearChallenges
};
