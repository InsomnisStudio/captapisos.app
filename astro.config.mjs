// @ts-check
import process from "node:process"
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// La config se evalúa antes de que Astro cargue .env: se lee aquí si existe.
try {
  process.loadEnvFile()
} catch {
  // Sin .env: valen las variables de entorno y los valores por defecto.
}

export default defineConfig({
  // URL pública de la landing (canonical y Open Graph).
  site: process.env.PUBLIC_SITE_URL || 'https://captapisos.app',
  // URLs sin barra final (/privacidad), como los enlaces: GitHub Pages sirve privacidad.html sin redirigir
  // y la canonical coincide con la URL que se rastrea.
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
})
