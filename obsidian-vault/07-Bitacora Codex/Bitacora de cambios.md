# Bitacora de cambios

## 2026-07-01

### Optimizacion SEO y WebP desde recomendaciones SGI

Cambios:
- Se reviso `C:/Users/EG/Downloads/SGI-recomendaciones.md`.
- Se acorto la meta description principal de 208 caracteres a 116 caracteres.
- Se convirtieron 7 imagenes de `public/ingenieria-suministros/` de PNG a WebP.
- Se actualizaron las rutas del sitio para cargar WebP en las tarjetas de ingenieria y suministros.
- Se retiraron los PNG reemplazados del directorio publico para reducir el peso del deploy.

Archivos modificados:
- `artifacts/sgi-landing/index.html`
- `artifacts/sgi-landing/src/App.tsx`
- `artifacts/sgi-landing/public/ingenieria-suministros/*.webp`
- `obsidian-vault/01-Proyecto SGI/Estado actual del proyecto SGI.md`
- `obsidian-vault/04-Pendientes/Pendientes.md`
- `obsidian-vault/06-Assets e Imagenes/Assets pendientes.md`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`
- `obsidian-vault/21-Estrategia/Recomendaciones SEO y rendimiento SGI.md`

Validacion:
- `node ..\..\node_modules\typescript\bin\tsc -p tsconfig.json --noEmit` ejecutado correctamente.
- `vite build --config vite.config.ts` ejecutado con `BASE_PATH=/SGI/` y `PORT=5173`.
- Peso original PNG ingenieria/suministros: ~3.34 MB.
- Peso nuevo WebP ingenieria/suministros: ~152 KB.
- La meta description nueva tiene 116 caracteres.
- El build final contiene WebP en `dist/public/ingenieria-suministros/` y ya no contiene los PNG reemplazados.

Pendientes nuevos:
- Ejecutar Lighthouse/PageSpeed despues del deploy.
- Agregar `favicon.ico` de respaldo si se instala una herramienta de conversion ICO o se define paquete de iconos final.
- Enviar sitemap a Google Search Console.
- Sustituir testimoniales genericos por testimonios reales cuando SGI confirme nombres/empresas.

### Autoridad industrial, comparativa E-E-A-T y carruseles con Framer Motion

Cambios:
- Se agrego un marquee infinito de marcas justo debajo del hero con ENGEL, ARBURG, HUSKY, KEYENCE, EATON, 3M, HILTI, MAKITA, MILWAUKEE y BALLUFF.
- Se reforzo la tabla comparativa `Por que SGI destaca` con columna verde para SGI y columna roja para otros proveedores.
- Se actualizaron los puntos de comparativa: respuesta <2h, tecnicos certificados ARBURG/RJG, reporte documentado, cobertura integral y seguimiento post-servicio.
- Se agrego bloque E-E-A-T `Nota del fundador` con espacio reservado para foto de Francisco y mensaje de compromiso industrial.
- Se agregaron mini-dashboards visuales en las tarjetas de servicios con barras animadas y micro-graficas.
- Se refactorizo la seccion de testimoniales de grid estatica a carrusel horizontal infinito con `framer-motion`.
- Se corrigio overflow horizontal en el hero movil para evitar texto y botones cortados en pantallas estrechas.
- No se agregaron precios SaaS ni integraciones de software ajenas al sector industrial.

Archivos modificados:
- `artifacts/sgi-landing/src/App.tsx`
- `artifacts/sgi-landing/src/index.css`
- `obsidian-vault/01-Proyecto SGI/Estado actual del proyecto SGI.md`
- `obsidian-vault/01-Proyecto SGI/Mapa de secciones de la web.md`
- `obsidian-vault/04-Pendientes/Pendientes.md`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`

Validacion:
- `node ..\..\node_modules\typescript\bin\tsc -p tsconfig.json --noEmit` ejecutado correctamente.
- `vite build --config vite.config.ts` ejecutado con `BASE_PATH=/SGI/` y `PORT=5173`.
- Build exitoso. Se conserva la advertencia conocida de `vendor-three` mayor a 500 KB, ya aislado en chunk separado.
- Capturas Chrome headless desktop y emulacion movil real usadas para validar el primer viewport; en movil se verifico `scrollWidth=390` sin overflow horizontal.

Pendientes nuevos:
- Agregar foto real de Francisco cuando este disponible.
- Revisar en Android que el marquee de marcas y testimoniales mantengan buena legibilidad.

### Segunda capa de rediseño Framer en toda la landing

Cambios:
- Se continuo el rediseño inspirado en Framer LanX aplicado a toda la landing.
- Se agrego una banda animada tipo marquee con servicios industriales SGI.
- Se mejoraron las tarjetas de servicios con tratamiento de producto premium, modulo numerado, flecha de accion y brillo inferior.
- Se mejoraron las metricas de `Nosotros` con tarjetas visuales mas profundas.
- Se reforzaron proyectos con etiqueta `Caso SGI`, brillo diagonal y mejor hover visual.
- Se agrego tratamiento premium a galeria, testimonios y FAQ.
- Se mantuvo intacta la informacion de negocio y el contexto industrial original.

Archivos modificados:
- `artifacts/sgi-landing/src/App.tsx`
- `artifacts/sgi-landing/src/index.css`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`
- `obsidian-vault/01-Proyecto SGI/Estado actual del proyecto SGI.md`
- `obsidian-vault/04-Pendientes/Pendientes.md`

Validacion:
- `node ..\..\node_modules\typescript\bin\tsc -p tsconfig.json --noEmit` ejecutado correctamente.
- `vite build --config vite.config.ts` ejecutado con `BASE_PATH=/SGI/` y `PORT=5173`.
- Build exitoso. Se conserva la advertencia conocida de `vendor-three` mayor a 500 KB, ya aislado.

Pendientes nuevos:
- Revisión visual manual en escritorio y Android para ajustar intensidad, espaciados o velocidad de marquee.

### Rediseño visual global inspirado en Framer LanX

Cambios:
- Se tomo como referencia visual el preview publico de Framer LanX.
- Se recreo el lenguaje visual en toda la landing SGI sin eliminar informacion existente.
- Se agregaron fondos animados globales con glow, grid tecnico, textura de puntos y scanlines.
- Se mejoro el hero con texto degradado animado, orbit ring y paneles flotantes tipo dashboard industrial.
- Se agregaron microinteracciones y profundidad 3D a la franja de iconos rapidos.
- Se actualizo el componente base `Card` para usar estilo premium glass, brillo sutil y hover mas elegante.
- Se mejoro `SectionTitle` con escala tipografica mayor y subrayado degradado.
- Se mantuvo el contexto industrial: mantenimiento, HVAC, obra civil, instalaciones, seguridad, moldeo y respuesta 24/7.

Archivos modificados:
- `artifacts/sgi-landing/src/App.tsx`
- `artifacts/sgi-landing/src/index.css`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`
- `obsidian-vault/01-Proyecto SGI/Estado actual del proyecto SGI.md`
- `obsidian-vault/04-Pendientes/Pendientes.md`

Validacion:
- `node ..\..\node_modules\typescript\bin\tsc -p tsconfig.json --noEmit` ejecutado correctamente.
- `vite build --config vite.config.ts` ejecutado con `BASE_PATH=/SGI/` y `PORT=5173`.
- Build exitoso. Se conserva la advertencia conocida de `vendor-three` mayor a 500 KB, aislado en chunk separado.

Pendientes nuevos:
- Revisar visualmente toda la pagina en Android real y escritorio.
- Ajustar intensidad de animaciones si SGI prefiere un look mas sobrio.

### Seccion premium de ventaja operativa inspirada en Framer

Cambios:
- Se analizo el preview publico de Framer `LanX` como referencia visual.
- Se agrego una nueva seccion despues de servicios: `Ventaja operativa`.
- La seccion incluye panel tecnico oscuro, estado de respuesta 24/7, pasos de ejecucion y tarjetas tipo dashboard.
- Se agrego comparativa `SGI vs proveedor tradicional` con enfoque en diagnostico, ejecucion, alcance y seguimiento.
- Se adapto la referencia SaaS al contexto SGI: mantenimiento, HVAC, obra civil, instalaciones, moldeo, suministros, seguridad y continuidad operativa.

Archivos modificados:
- `artifacts/sgi-landing/src/App.tsx`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`
- `obsidian-vault/01-Proyecto SGI/Estado actual del proyecto SGI.md`

Validacion:
- `node ..\..\node_modules\typescript\bin\tsc -p tsconfig.json --noEmit` ejecutado correctamente.
- `vite build --config vite.config.ts` ejecutado con `BASE_PATH=/SGI/` y `PORT=5173`.
- Build exitoso; se mantiene la advertencia conocida de `vendor-three` mayor a 500 KB, ya aislado en chunk separado.

Pendientes nuevos:
- Revisar la nueva seccion en Android real despues del deploy.
- Ajustar textos comerciales si SGI quiere un tono mas tecnico o mas comercial.

### Optimizacion tecnica por auditoria SGI Landing

Cambios:
- Se aplicaron recomendaciones de la auditoria tecnica `Auditoria_SGI_Landing.md`.
- Se separo la escena 3D `IndustrialPlantScene` de `App.tsx` a `src/components/IndustrialPlantScene.tsx`.
- Se cargo la escena 3D con `React.lazy()` y `Suspense` para reducir el JavaScript inicial.
- Se agregaron `manualChunks` en Vite para separar React, UI, forms, Framer Motion y Three.js.
- Se agrego `loading="lazy"` y `decoding="async"` a imagenes fuera del logo.
- Se agregaron mejoras de accesibilidad: `<main>`, `aria-label`, `aria-expanded`, `aria-controls`, soporte de zoom movil y respeto a `prefers-reduced-motion`.
- Se agrego `sitemap.xml` y referencia en `robots.txt`.

Archivos modificados:
- `artifacts/sgi-landing/src/App.tsx`
- `artifacts/sgi-landing/src/components/IndustrialPlantScene.tsx`
- `artifacts/sgi-landing/src/index.css`
- `artifacts/sgi-landing/index.html`
- `artifacts/sgi-landing/vite.config.ts`
- `artifacts/sgi-landing/public/robots.txt`
- `artifacts/sgi-landing/public/sitemap.xml`

Validacion:
- `node ..\..\node_modules\typescript\bin\tsc -p tsconfig.json --noEmit` ejecutado correctamente en `artifacts/sgi-landing`.
- `vite build --config vite.config.ts` ejecutado con `BASE_PATH=/SGI/` y `PORT=5173`.
- Build exitoso con chunk inicial principal reducido a ~81 KB minificado.
- Three.js queda aislado en `vendor-three` (~529 KB minificado, ~133 KB gzip), por lo que ya no bloquea el bundle inicial.

Pendientes nuevos:
- Convertir y comprimir imagenes grandes a WebP/AVIF, especialmente logo e imagenes de ingenieria/suministros.
- Ejecutar validacion real en Android despues del deploy.
- Revisar Lighthouse/PageSpeed publico despues de publicar.

### Retiro de Open WebUI del flujo activo

Cambios:
- Se retiro Open WebUI del flujo activo de desarrollo de la web SGI.
- Se eliminaron de Open WebUI los modelos personalizados `codex-sgi`, `sgi-*` y el override local de `gpt-4o`.
- Se elimino de Open WebUI la herramienta local `SGI Workspace Access`.
- Se quitaron del dashboard los accesos a notas de integracion Open WebUI y equipo IA.
- Se eliminaron las notas activas de Open WebUI/equipo IA de la boveda.
- Se removieron pendientes operativos relacionados con Open WebUI, Gemini y equipo IA.

Resultado:
- El flujo vigente vuelve a ser Codex + Obsidian + GitHub.
- La web, assets y codigo fuente no fueron modificados.
- Open WebUI queda fuera del desarrollo activo y se puede retomar despues como experimento separado.

Validacion:
- No quedan modelos personalizados `codex-sgi` ni `sgi-*` en la base local de Open WebUI.
- No queda la herramienta `sgi_workspace_access` en Open WebUI.
- `Pendientes.md` vuelve a concentrarse en web, assets y negocio.

### Orquestador SGI con acceso controlado a Git y Obsidian

Cambios:
- Se creo la herramienta local `SGI Workspace Access` en Open WebUI.
- Se creo el modelo `SGI Orquestador General`.
- Se asocio `SGI Workspace Access` al orquestador mediante `toolIds`.
- La herramienta puede consultar estado Git, remotos, ultimo commit, pendientes, bitacora y busqueda en notas Obsidian.
- El acceso es solo lectura; no hace commits, push, deploy ni escritura de archivos.
- Se actualizo [[11-Codex/Equipo IA SGI]] con uso, funciones y restricciones.

Validacion:
- La herramienta carga correctamente como clase `Tools`.
- `sgi_workspace_overview` devuelve branch, ultimo commit, status, remotos y pendientes.
- `sgi_search_obsidian` encuentra coincidencias en notas Markdown.
- El modelo `sgi-orquestador-general` quedo activo con base `gpt-5.5-pro`.

Pendientes nuevos:
- Probar desde la interfaz de Open WebUI que el orquestador invoque `SGI Workspace Access`.
- Crear la base de conocimiento `SGI - Memoria del Proyecto` para busqueda semantica, complementaria a la herramienta local.

### Creacion del equipo IA SGI en Open WebUI

Cambios:
- Se crearon siete perfiles especializados en Open WebUI:
  - `SGI Director Tecnico`
  - `SGI Programador Senior`
  - `SGI Disenador Industrial`
  - `SGI Mente Creativa`
  - `SGI Redactor Comercial`
  - `SGI QA Mobile`
  - `SGI Gestor de Memoria`
- Se asignaron modelos base segun funcion: `gpt-5.5-pro`, `gpt-4.1` y `gpt-4o`.
- Se configuraron prompts de sistema, parametros, metadatos, tags y permisos de lectura/escritura para el usuario admin.
- Se documento la arquitectura en [[11-Codex/Equipo IA SGI]].
- Se enlazo la nota desde [[Dashboard SGI]].

Archivos modificados:
- `obsidian-vault/11-Codex/Equipo IA SGI.md`
- `obsidian-vault/Dashboard SGI.md`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`

Validacion:
- Los perfiles `sgi-*` quedaron activos en la base local de Open WebUI.
- Cada perfil tiene permisos locales para el usuario admin.
- Se desactivo cache de modelos base para facilitar recarga en la interfaz.

Pendientes nuevos:
- Rotar la API key de Gemini vista en captura antes de conectarla.
- Conectar Gemini con una clave nueva y reasignar roles visuales/creativos si conviene.
- Crear y asociar la base de conocimiento `SGI - Memoria del Proyecto`.

### Integracion inicial de Open WebUI con SGI

Cambios:
- Se guardo una key de OpenAI para el proyecto en `.env.local`, archivo ignorado por Git.
- Se configuro Open WebUI local para usar `https://api.openai.com/v1`.
- Se valido la API de OpenAI contra `/v1/models` sin exponer la clave.
- Se creo el modelo personalizado `Codex SGI` en Open WebUI con base `gpt-4.1`.
- Se agregaron permisos locales de lectura/escritura para que el usuario admin pueda ver `Codex SGI` en el selector.
- Se desactivo el cache local de modelos base para forzar recarga de Open WebUI.
- Se valido en pantalla que `Codex SGI` ya aparece dentro de Open WebUI.
- Se corrigio el texto del indicador del sistema para evitar caracteres dañados por codificacion.
- Se reconfiguro el indicador del sistema con flujo de trabajo, contexto SGI, criterio visual y reglas de seguridad.
- Se ajustaron parametros del modelo para trabajo tecnico: temperatura `0.25` y top_p `0.85`.
- Se documento la integracion en [[11-Codex/Integracion Open WebUI SGI]] y se enlazo desde el dashboard.

Archivos modificados:
- `obsidian-vault/11-Codex/Integracion Open WebUI SGI.md`
- `obsidian-vault/Dashboard SGI.md`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`

Validacion:
- `.env.local` existe y esta ignorado por Git.
- Open WebUI tiene OpenAI habilitado con una key local cargada.
- La API de OpenAI respondio correctamente y mostro disponibilidad de modelos como `gpt-4.1`, `gpt-4.1-mini`, `gpt-4o`, `gpt-4o-mini` y `o4-mini`.
- Open WebUI quedo escuchando en `0.0.0.0:8080`.
- El modelo `codex-sgi` quedo activo en la base local de Open WebUI.
- `codex-sgi` quedo con permisos de lectura/escritura para el usuario admin.
- Captura del usuario confirma que `Codex SGI` es visible en la pantalla de modelos de Open WebUI.
- La base local de Open WebUI conserva respaldo previo en `webui.db.codex-pre-sgi-final-config-backup`.

Pendientes nuevos:
- Importar o vincular documentos del proyecto SGI como Knowledge dentro de Open WebUI.
- Probar desde la interfaz que `Codex SGI` aparezca en el selector de modelos y responda con el contexto esperado.

### Preparacion de handoff cliente y alineacion SEO

Cambios:
- Se preparo el documento [[Handoff cliente - avance SGI 2026-07-01]] con resumen cliente, cambios del PR #1, assets/contenido involucrado, validacion y brechas.
- Se actualizo el estado del proyecto con referencia al PR #1 fusionado y a las fuentes recientes de Drive (`SGI.html` y `ArchivosGit.txt`).
- Se completo la nota de contacto con telefono, WhatsApp, correo y direccion actualmente usados por la web.
- Se registraron los grupos de assets publicos incorporados en la landing.
- Se marco el siguiente bloque recomendado en pendientes: cierre pre-cliente.
- Se corrigieron metadatos SEO, Open Graph, Twitter Card, favicon y JSON-LD para apuntar a GitHub Pages y a `sginogales@gmail.com`.

Archivos modificados:
- `artifacts/sgi-landing/index.html`
- `obsidian-vault/01-Proyecto SGI/Estado actual del proyecto SGI.md`
- `obsidian-vault/02-Contenido Web/Datos de contacto SGI.md`
- `obsidian-vault/04-Pendientes/Pendientes.md`
- `obsidian-vault/06-Assets e Imagenes/Assets pendientes.md`
- `obsidian-vault/07-Bitacora Codex/Bitacora de cambios.md`
- `obsidian-vault/22-Handoffs/Handoff cliente - avance SGI 2026-07-01.md`

Validacion:
- `tsc --build` ejecutado con binario local.
- `tsc -p artifacts/sgi-landing/tsconfig.json --noEmit` ejecutado con binario local.
- `vite build --config vite.config.ts` ejecutado en `artifacts/sgi-landing` con `BASE_PATH=/SGI/`.
- `pnpm install` y `pnpm run typecheck` no pudieron completarse por falta de `sh` en Windows; se valido con binarios locales instalados.
- Commit `fdcd17d` publicado en `main` para activar GitHub Pages.
- Verificacion HTTP de `https://jhonsonjackson53-cmyk.github.io/SGI/?v=fdcd17d-2`: respuesta 200, canonical/OG apuntan a GitHub Pages, favicon usa `/SGI/logo-sgi.png` y el correo publicado es `sginogales@gmail.com`.

Pendientes nuevos:
- Validar previews sociales en herramientas externas despues de que cache de plataformas se actualice.
- Confirmar datos comerciales definitivos y permisos de logos de terceros.

## 2026-06-30

### Se finaliza configuracion de Obsidian como memoria del proyecto

Cambios:
- Se confirmo que la boveda correcta es `SGI/obsidian-vault`.
- Se elimino la configuracion accidental `.obsidian` creada en la raiz `SGI`.
- Se documento la ruta correcta en `ABRIR_OBSIDIAN.md`.
- Se dejo el registro global de Obsidian apuntando solo a `obsidian-vault`.
- Se abrio Obsidian usando la ruta correcta del vault.
- Se versiono la configuracion de `Graph View` con filtros, colores y fuerzas visuales.
- Se versiono la configuracion base de plugins: Obsidian Git, Dataview, Tasks y Templater.
- Se dejo `Dashboard SGI` como entrada principal de trabajo.

Motivo:
Evitar que Obsidian use la raiz del repositorio como boveda y asegurar que la memoria del proyecto quede separada del codigo, dependencias y archivos temporales.

Resultado:
- Obsidian queda configurado como memoria del proyecto.
- GitHub mantiene versionadas las notas y configuraciones utiles.
- Codex puede consultar y actualizar la memoria sin mezclarla con el codigo fuente.

### Se amplia la memoria para Graph View

Cambios:
- Se agrego el nodo central `Indice Cerebro SGI`.
- Se crearon notas conectadas para servicios, secciones web, capacidades, ingenieria, suministros, marcas, proveedores, sectores, assets publicos y estrategia.
- Se agrego una guia de configuracion para Graph View.
- Se conecto el Dashboard SGI con el indice del grafo.

Motivo:
Crear una vista grafica mas rica en Obsidian, con nodos y enlaces reales entre las partes del proyecto.

### Se crea memoria Obsidian del proyecto

Cambios:
- Se agrego la carpeta `obsidian-vault`.
- Se crearon notas base para proyecto, contenido, decisiones, pendientes, assets y bitacora.
- Se agregaron plantillas para futuros cambios.

Motivo:
Configurar Obsidian como memoria del proyecto SGI y conectarlo con el flujo Codex + GitHub.

### Arreglo movil previo

Cambios:
- Se ajusto la franja de servicios rapidos para mobile.
- Se publico en GitHub Pages.

Resultado:
- Preview publico actualizado en GitHub Pages.
