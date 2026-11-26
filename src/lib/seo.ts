// Datos estructurados (schema.org en JSON-LD) de la portada: quién somos, qué es el producto y cuánto cuesta.
import { EMAIL_CONTACTO } from './config'
import { fechaIso } from './fechas'
import { PLANES, PRUEBA } from './planes'

export const NOMBRE = 'Captapisos'

/**
 * Páginas fijas que se indexan; las guías se añaden solas al sitemap. Las legales se suman cuando dejen de ser
 * borrador (hoy llevan noindex).
 */
export const PAGINAS_INDEXABLES = ['/', '/guias']

export function schemaPortada(site: URL) {
  const url = new URL('/', site).href
  const organizacion = `${url}#organizacion`
  const precio = (importe: number, meses: number) => ({
    '@type': 'UnitPriceSpecification',
    price: importe,
    priceCurrency: 'EUR',
    valueAddedTaxIncluded: false,
    billingDuration: `P${meses}M`,
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizacion,
        name: NOMBRE,
        url,
        logo: new URL('/icono-512.png', site).href,
        email: EMAIL_CONTACTO,
        areaServed: { '@type': 'Country', name: 'España' },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#web`,
        name: NOMBRE,
        url,
        inLanguage: 'es-ES',
        publisher: { '@id': organizacion },
      },
      {
        '@type': 'WebApplication',
        '@id': `${url}#producto`,
        name: NOMBRE,
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'es-ES',
        description:
          'Alertas en tiempo real de los pisos que publican propietarios particulares en portales inmobiliarios, con una puntuación de particular y sus motivos. Para agentes y agencias inmobiliarias de toda España.',
        image: new URL('/og.png', site).href,
        publisher: { '@id': organizacion },
        offers: PLANES.map((p) => ({
          '@type': 'Offer',
          name: `Plan ${p.nombre}`,
          description: `${p.para} Prueba gratuita de ${PRUEBA.dias} días.`,
          url: `${url}#precios`,
          price: p.mes,
          priceCurrency: 'EUR',
          priceSpecification: [precio(p.mes, 1), precio(p.anio, 12)],
          availability: 'https://schema.org/InStock',
        })),
      },
    ],
  }
}

type Guia = { slug: string; titulo: string; descripcion: string; publicado: Date; actualizado?: Date }

/** Artículo y ruta de migas (Inicio › Guías › guía) de una guía. */
export function schemaGuia(site: URL, g: Guia) {
  const inicio = new URL('/', site).href
  const url = new URL(`/guias/${g.slug}`, site).href
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#articulo`,
        headline: g.titulo,
        description: g.descripcion,
        url,
        mainEntityOfPage: url,
        inLanguage: 'es-ES',
        datePublished: fechaIso(g.publicado),
        dateModified: fechaIso(g.actualizado ?? g.publicado),
        image: new URL('/og.png', site).href,
        author: { '@id': `${inicio}#organizacion` },
        publisher: { '@id': `${inicio}#organizacion` },
      },
      {
        '@type': 'Organization',
        '@id': `${inicio}#organizacion`,
        name: NOMBRE,
        url: inicio,
        logo: new URL('/icono-512.png', site).href,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: inicio },
          { '@type': 'ListItem', position: 2, name: 'Guías', item: new URL('/guias', site).href },
          { '@type': 'ListItem', position: 3, name: g.titulo, item: url },
        ],
      },
    ],
  }
}

/** JSON para un <script type="application/ld+json">: escapa «<» para que ningún texto pueda cerrar la etiqueta. */
export const jsonLd = (datos: unknown) => JSON.stringify(datos).replace(/</g, '\\u003c')
