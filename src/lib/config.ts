// Los CTA llevan al portal. URL configurable con PUBLIC_APP_URL (sin barra final).
const base = (import.meta.env.PUBLIC_APP_URL || 'http://localhost:5173').replace(/\/+$/, '')

export const APP_URL = base
export const URL_REGISTRO = `${base}/registro`
export const URL_LOGIN = `${base}/login`

// API del backend: la landing solo usa el endpoint público del anuncio de ejemplo (sin barra final).
export const API_URL = (import.meta.env.PUBLIC_API_URL || 'http://localhost:8080').replace(/\/+$/, '')

// Contacto (pie, preguntas frecuentes, plan Agencia y páginas legales).
export const EMAIL_CONTACTO = 'insomnisdev@gmail.com'
