// Planes y prueba gratuita: los usan la sección de precios y los datos estructurados (JSON-LD).
/* Precios sin IVA; el anual son 10 mensualidades (2 meses gratis). */
export const PRUEBA = { dias: 7, iaDiaria: 30 }

export const PLANES = [
  {
    codigo: 'agente',
    nombre: 'Agente',
    para: 'Para el agente que trabaja su zona.',
    mes: 49,
    anio: 490,
    destacado: false,
    incluye: [
      '3 alertas activas',
      'Avisos en tiempo real, sin recargar',
      'Puntuación de particular con sus motivos',
      'Etiquetas: «Abstenerse agencias», «Herencia», «Urgente»…',
      'Estado de cada aviso: sin ver, contactado, descartado',
    ],
  },
  {
    codigo: 'pro',
    nombre: 'Pro',
    para: 'Para quien vigila varias zonas y quiere afinar más.',
    mes: 99,
    anio: 990,
    destacado: true,
    incluye: [
      'Todo lo del plan Agente',
      'Alertas ilimitadas',
      'Criterio con IA: describe con tus palabras qué debe tener el anuncio y la IA lo comprueba',
      'Hasta 300 comprobaciones con IA al día',
    ],
  },
]
