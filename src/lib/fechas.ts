const formato = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/** «26 de noviembre de 2026». */
export const fechaLarga = (d: Date) => formato.format(d)
/** «2026-11-26», para datetime, sitemap y JSON-LD. */
export const fechaIso = (d: Date) => d.toISOString().slice(0, 10)
