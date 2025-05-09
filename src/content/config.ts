import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

import { SiteConfig } from "../utils/SiteConfig"

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object ({
      author: z.string().default(SiteConfig.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      description: z.string(),
  }) 
});

export const collections = { blog };
