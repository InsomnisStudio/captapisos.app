import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Guías: artículos útiles para captadores. Atraen búsquedas que la portada sola no puede posicionar.
const guias = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guias' }),
  schema: z.object({
    titulo: z.string(),
    /** Título para buscadores si `titulo` no cabe en 60 caracteres con « · Captapisos». */
    tituloSeo: z.string().max(60).optional(),
    /** ≤ 155 caracteres: es la meta description. */
    descripcion: z.string().max(160),
    publicado: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
  }),
})

export const collections = { guias }
