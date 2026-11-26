# Captapisos · Landing

Web comercial de Captapisos. Estática, hecha con Astro y Tailwind v4. Sin backend.

## Arrancar

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # astro check + build estático en dist/
pnpm preview    # sirve dist/
```

## Configuración

Copia `.env.example` a `.env` o pasa las variables al hacer el build:

| Variable          | Para qué                                                        | Por defecto             |
| ----------------- | --------------------------------------------------------------- | ----------------------- |
| `PUBLIC_APP_URL`  | URL del portal. Los CTA llevan a `/registro` y `/login`.        | `http://localhost:5173` |
| `PUBLIC_API_URL`  | URL del backend. El hero pide `/api/public/sample-listing`.      | `http://localhost:8080` |
| `PUBLIC_SITE_URL` | URL pública de la landing (canonical y Open Graph).             | `https://captapisos.es` |

> El dominio `captapisos.es` es provisional: aún no está confirmado. Cuando lo esté, cámbialo en
> `astro.config.mjs` (valor por defecto) y en `.env.example`.

## Estructura

- `src/pages/index.astro`: la página principal, que monta las secciones en orden.
- `src/pages/{terminos,privacidad,aviso-legal,cookies}.astro`: textos legales (layout `src/layouts/Legal.astro`).
- `src/sections/`: una sección por archivo (cabecera, hero, problema, cómo funciona, el aviso, alertas, en directo, precios, preguntas, portales, CTA final y pie).
- `src/lib/`: configuración (URLs y email de contacto) y lista de portales con su web.
- `src/assets/marca/`: copia de los logos oficiales (`~/CaptapisosMarca/logos/`). El logotipo y el símbolo de la web salen de ellos.
- `src/components/`: logotipo, símbolo, ilustración «casa a rayos X» e iconos (trazados de Lucide, trazo 1,75).
- `src/styles/global.css`: tokens y clases del manual de marca, los mismos que usa el portal.
- `public/`: favicon e iconos de app oficiales e imagen Open Graph.
- `scripts/og.html`: fuente de `public/og.png` (1200×630).

## Anuncio real en el hero

Al cargar la página, la tarjeta flotante del hero pide `GET ${PUBLIC_API_URL}/api/public/sample-listing`
(contrato en `docs/front-alertas.md` §9 del repo del portal). Con datos reales muestra, en formato compacto,
la foto, el chip «Nuevo particular», precio, habitaciones y m², la zona (barrio o municipio · provincia) y
la puntuación con su anillo; la tarjeta entera enlaza al anuncio. Si tarda más de 4 s, falla, da 404 o la
respuesta no tiene la forma esperada, se queda la tarjeta de ejemplo, con la misma forma y la marca
«Ejemplo». Todo se inserta como texto.

El resto de avisos, alertas y feeds de la página son ejemplos con datos inventados, y están marcados como tales.

## Precios

Van fijos en `src/sections/Precios.astro` porque la landing es estática. La fuente de verdad es el backend
(`backend/crates/server/src/plans.rs`, servido en `GET /api/plans`, `docs/front-cuenta-y-planes.md` §1): si
cambian allí, hay que cambiarlos aquí. Precios sin IVA; el anual son 10 mensualidades.

## Textos legales

`/terminos`, `/privacidad`, `/aviso-legal` y `/cookies` son **borradores pendientes de revisión legal**: llevan
un aviso visible y `noindex`. Antes de publicarlos hay que completar los marcadores entre corchetes
([RAZÓN SOCIAL], [NIF], [DOMICILIO], proveedores…), revisarlos con un profesional y quitar `noindex` y el aviso
en `src/layouts/Legal.astro`.

Contacto: insomnisdev@gmail.com (`EMAIL_CONTACTO` en `src/lib/config.ts`).
