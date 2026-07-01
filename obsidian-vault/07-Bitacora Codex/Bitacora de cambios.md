# Bitacora de cambios

## 2026-07-01

### Integracion inicial de Open WebUI con SGI

Cambios:
- Se guardo una key de OpenAI para el proyecto en `.env.local`, archivo ignorado por Git.
- Se configuro Open WebUI local para usar `https://api.openai.com/v1`.
- Se valido la API de OpenAI contra `/v1/models` sin exponer la clave.
- Se creo el modelo personalizado `Codex SGI` en Open WebUI con base `gpt-4.1`.
- Se agregaron permisos locales de lectura/escritura para que el usuario admin pueda ver `Codex SGI` en el selector.
- Se desactivo el cache local de modelos base para forzar recarga de Open WebUI.
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
