# Estado actual del proyecto SGI

Fecha de inicio de esta memoria: 2026-06-30
Ultima actualizacion: 2026-07-15

## Resumen

SGI cuenta con una landing web publicada mediante GitHub Pages. El sitio presenta servicios industriales, experiencia tecnica, moldeo, ingenieria, suministros, seguridad, proyectos, contacto y una animacion 3D interactiva en el inicio. El PR #1 (`[codex] Upgrade SGI landing experience`) ya fue fusionado a `main`.

## Preview publico

https://jhonsonjackson53-cmyk.github.io/SGI/

## Repositorio

https://github.com/jhonsonjackson53-cmyk/SGI

## Estado tecnico

- Framework: Vite + React.
- Ruta del sitio: `artifacts/sgi-landing`.
- Hosting: GitHub Pages.
- Deploy: GitHub Actions desde `main`.
- Base publica: `/SGI/`.
- Animacion 3D: Three.js.

## Ultimos arreglos importantes

- Se integraron cinco fotografias reales de `S22` en proyectos, galeria y evidencia de trabajo en planta.
- Se retiro el espacio temporal del fundador y se sustituyo por evidencia fotografica verificable.
- Se eliminaron testimonios genericos no autorizados.
- Se mejoraron navegacion semantica, accesibilidad del formulario y valores iniciales de estadisticas.
- Se corrigio la ruta del activo de MAKITA.
- Se regenero Graphify desde la landing reparada: 561 nodos, 801 relaciones y 95 comunidades.
- Se unifico el fondo visual de toda la pagina: las secciones ya no pintan fondos alternados y ahora comparten un solo blueprint/gradiente continuo.
- Se corrigio el bloque post-hero que se veia pesado: ahora marcas, capacidades y servicios aparecen en un solo panel operativo compacto, sin franjas sueltas ni overflow horizontal.
- Se extendio a toda la landing el estilo oscuro tipo control operativo: fondos blueprint, gradientes rojo/gris, tarjetas glass, paneles tecnicos y formularios oscuros.
- Se acorto la meta description principal y se optimizaron las imagenes de ingenieria/suministros a WebP, reduciendo ese bloque de ~3.34 MB a ~152 KB cargados.
- Se agregaron piezas de autoridad industrial: marquee de marcas debajo del hero, tabla comparativa SGI vs otros proveedores, nota del fundador, mini-dashboards en servicios y testimoniales en carrusel infinito con framer-motion.
- Se corrigio proteccion contra overflow horizontal en el hero movil para evitar texto o botones cortados.
- Se agrego una segunda capa de rediseño Framer: marquee industrial, tarjetas de servicios premium, proyectos con etiqueta `Caso SGI`, testimonios/FAQ/galeria con mayor profundidad visual.
- Se aplico un rediseño visual global inspirado en Framer LanX: fondos animados, paneles flotantes, tarjetas glass, texto degradado y microinteracciones en toda la landing.
- Se agrego una seccion premium de ventaja operativa inspirada en referencia Framer, adaptada a SGI con panel tecnico y comparativa contra proveedor tradicional.
- Se aplico una optimizacion tecnica por auditoria: escena 3D separada con carga diferida, chunks de Vite, lazy loading de imagenes, sitemap y mejoras de accesibilidad.
- Se corrigieron metadatos SEO/Open Graph/JSON-LD para apuntar a GitHub Pages y al contacto real mostrado en la app.
- Se corrigieron rutas de imagenes para GitHub Pages.
- Se ajusto la franja de servicios rapidos en movil.
- Se agregaron imagenes reales y logos a carpetas publicas.
- Se configuro workflow de GitHub Pages.

## Handoff cliente

- Documento preparado: [[Handoff cliente - avance SGI 2026-07-01]]
- Fuentes usadas: PR #1 de GitHub, `SGI.html` y `ArchivosGit.txt` de Google Drive, estado actual de Obsidian.

## Proximos focos sugeridos

- Revisar en Android real que el fondo continuo conserve buena lectura y no se perciban cortes visuales al hacer scroll.
- Revisar en Android real el panel de autoridad post-hero y ajustar tamano, velocidad de carruseles o espaciados si hace falta.
- Revisar en Android real el nuevo dark system global y ajustar contraste/intensidad si hace falta.
- Agregar foto real de Francisco solamente si SGI decide recuperar una nota personal y autoriza la imagen.
- Validar en Android el carrusel de marcas.
- Validar velocidad del marquee y legibilidad de tarjetas en Android.
- Revisar visualmente toda la landing despues del rediseño global en desktop y Android.
- Revisar en Android real la nueva seccion de ventaja operativa.
- Comprimir assets restantes si se detectan pesos altos, especialmente logo final y futuras imagenes de proyectos.
- Validar Lighthouse/PageSpeed despues del deploy.
- Enviar sitemap a Google Search Console.
- Agregar testimonios reales solamente cuando existan datos y autorizacion verificables.
- Definir textos finales de cada servicio.
- Revisar todo el sitio en movil.
- Conectar dominio propio si SGI lo tiene.
- Confirmar telefono, correo y WhatsApp definitivos.
