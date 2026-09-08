import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: z.object({
    titulo: z.string(),
    cliente: z.string().optional(),
    segmento: z.string(),
    ano: z.string(),
    servicos: z.array(z.string()),
    resumo: z.string(),
    ordem: z.number(),
    destaque: z.boolean().default(true),
    rascunho: z.boolean().default(false),
    cor: z.string().default('#111111'),
    capa: z.string(),
    imagemIntro: z.string().optional(),
    galeria: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),
  }),
});

export const collections = { projetos };
