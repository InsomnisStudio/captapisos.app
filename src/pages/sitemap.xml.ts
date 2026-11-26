import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { fechaIso } from '../lib/fechas'
import { PAGINAS_INDEXABLES } from '../lib/seo'

export const GET: APIRoute = async ({ site }) => {
  const guias = await getCollection('guias')
  const entradas = [
    ...PAGINAS_INDEXABLES.map((ruta) => ({ ruta, fecha: undefined })),
    ...guias.map((g) => ({ ruta: `/guias/${g.id}`, fecha: g.data.actualizado ?? g.data.publicado })),
  ]
  const urls = entradas
    .map(({ ruta, fecha }) => {
      const lastmod = fecha ? `<lastmod>${fechaIso(fecha)}</lastmod>` : ''
      return `  <url><loc>${new URL(ruta, site)}</loc>${lastmod}</url>`
    })
    .join('\n')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
