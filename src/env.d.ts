interface ImportMetaEnv {
  /** URL del portal. Por defecto http://localhost:5173. */
  readonly PUBLIC_APP_URL?: string
  /** URL del backend (anuncio de ejemplo del hero). Por defecto http://localhost:8080. */
  readonly PUBLIC_API_URL?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
