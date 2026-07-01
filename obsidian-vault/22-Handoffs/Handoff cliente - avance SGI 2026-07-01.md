# Handoff cliente - avance SGI 2026-07-01

## Resumen ejecutivo

La web de SGI ya esta en una version presentable para revision de cliente o socio. El PR #1 (`[codex] Upgrade SGI landing experience`) fue fusionado a `main` y dejo una landing React/Vite publicada por GitHub Pages con enfoque industrial, assets reales, secciones interactivas y una escena 3D de planta industrial en el inicio.

URL publica: https://jhonsonjackson53-cmyk.github.io/SGI/

## Fuentes revisadas

- GitHub PR #1: `jhonsonjackson53-cmyk/SGI`, fusionado en `main` con merge commit `e6432b2`.
- Google Drive `ArchivosGit.txt`: confirma el repositorio `https://github.com/jhonsonjackson53-cmyk/SGI/tree/main`.
- Google Drive `SGI.html`: version HTML estatica previa con contenido base, SEO, contacto, estructura comercial y referencias de assets.
- Obsidian: estado actual, bitacora, pendientes, assets, contacto y estrategia comercial.

## Que cambio en la web

- Se reemplazo una landing mas estatica por una experiencia React con animaciones, tarjetas interactivas y navegacion visual.
- Se agrego hero con escena 3D abstracta de planta industrial usando Three.js.
- Se incorporaron assets reales para proyectos, sectores, proveedores, marcas, ingenieria y suministros.
- Se reforzaron secciones de servicios, experiencia tecnica, moldeo, ingenieria y desarrollo, suministros, seguridad, marcas, clientes/sectores, proveedores, proyectos y proceso operativo.
- Se configuro GitHub Pages con build desde `main` y base publica `/SGI/`.
- Se corrigieron rutas de imagenes para GitHub Pages y se ajusto layout movil de servicios rapidos.
- Se alinearon metadatos SEO/Open Graph/JSON-LD a la URL publica de GitHub Pages y al correo `sginogales@gmail.com`.

## Assets y contenido involucrado

- Branding: `logo-sgi.png`, favicon y previews sociales.
- Proyectos: mantenimiento de rodamiento, obra civil, moldeo, herreria, fabricacion de racks, scrubber antes/despues, cortina industrial, maquinado de molde, instalacion de maquinaria y certificados.
- Sectores: maquiladoras, automotriz, electronica, plasticos, construccion, alimentos, logistica y hospitalario.
- Marcas/tecnologias: ENGEL, ARBURG, HUSKY, KEYENCE, EATON, 3M, HILTI, MAKITA, MILWAUKEE y BALLUFF.
- Proveedores/socios: GRAINGER, FASTENAL, ABB, SONEPAR y MCMASTER.
- Ingenieria y suministros: diseno, propuesta, prototipos, pruebas, herramientas, refacciones y consumibles.
- Contacto mostrado: Lago Azul #45, Jardin de la Montana, Nogales, Sonora; 631 318 5564; `sginogales@gmail.com`; WhatsApp `+52 631 318 5564`.

## Validacion registrada

- PR #1 reporto `pnpm.cmd run typecheck`.
- PR #1 reporto preview local en `http://127.0.0.1:5173/`.
- PR #1 reporto imagenes publicas con respuesta HTTP 200.
- El repo contiene workflow `.github/workflows/pages.yml` para publicar GitHub Pages desde `main`.

## Gaps antes de enviar al cliente

- Confirmar telefono, WhatsApp, correo y direccion como datos comerciales definitivos.
- Validar en Android real y en un navegador movil que no haya cortes de texto ni problemas con la escena 3D.
- Confirmar permisos de uso comercial para logos de marcas y proveedores.
- Optimizar peso de imagenes grandes antes de una campana o envio masivo.
- Confirmar textos definitivos por servicio, especialmente si SGI quiere enfatizar mantenimiento, moldeo, HVAC u obra civil.
- Verificar despues del deploy que GitHub Pages muestre favicon, previews sociales, canonical y JSON-LD correctos.
- Definir si se usara dominio propio y correo corporativo; por ahora la URL publica es GitHub Pages.

## Siguiente bloque recomendado

Cierre pre-cliente: hacer QA en GitHub Pages con cache limpio, probar WhatsApp/formulario, validar assets en movil, revisar previews sociales y pedir confirmacion de datos comerciales/permisos. Despues de eso, el avance se puede enviar al cliente como version de revision.
