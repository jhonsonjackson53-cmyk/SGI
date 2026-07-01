# Integracion Open WebUI SGI

## Estado

Open WebUI quedo configurado localmente para usar OpenAI como proveedor y un perfil dedicado al proyecto SGI.

## Configuracion aplicada

- Servicio local: `http://localhost:8080`
- Conexion OpenAI: `https://api.openai.com/v1`
- Archivo local de credenciales: `SGI/.env.local`
- Variable usada: `OPENAI_API_KEY`
- Modelo personalizado: `Codex SGI`
- ID del modelo: `codex-sgi`
- Modelo base: `gpt-4.1`

## Criterio del modelo Codex SGI

El perfil esta orientado a:

- Web SGI y GitHub Pages.
- Repositorio local SGI.
- Boveda Obsidian del proyecto.
- Contexto industrial SGI: mantenimiento, HVAC, obra civil, instalacion, moldeo por inyeccion, suministros industriales, seguridad, cumplimiento NOM, control de riesgos y calidad operativa.
- Mantener consistencia visual con identidad tecnica/industrial SGI.

## Validacion

- La key local existe en `.env.local` y no se expone en Git.
- Open WebUI tiene OpenAI habilitado con una key cargada.
- La API de OpenAI respondio correctamente a `/v1/models`.
- Open WebUI escucha en `0.0.0.0:8080`.
- El modelo `Codex SGI` quedo activo en la tabla local de modelos de Open WebUI.
- El modelo `Codex SGI` tiene permisos locales de lectura/escritura para el usuario admin.
- Se desactivo el cache local de modelos base para forzar recarga del selector.
- Se valido visualmente que `Codex SGI` aparece en Open WebUI.
- Se corrigio el texto del indicador del sistema para evitar caracteres dañados por codificacion.

## Seguridad

- No versionar `.env.local`.
- No copiar la API key en notas, chats, capturas ni archivos del repositorio.
- Mantener la key solo en archivos locales ignorados por Git o en gestores seguros.

## Pendiente tecnico

Crear un paquete de conocimiento importable en Open WebUI con documentos del proyecto SGI y, si se requiere, asociarlo al modelo `Codex SGI` desde la interfaz de Knowledge.

## Si no aparece en la interfaz

1. Refrescar Open WebUI con `Ctrl + F5`.
2. Buscar `Codex SGI` en el selector de modelos.
3. Si sigue sin aparecer, cerrar y volver a iniciar sesion en Open WebUI para renovar la lista de modelos del usuario.

## Accion en la interfaz

Despues de confirmar el modelo en pantalla, guardar con `Guardar y Actualizar` si Open WebUI muestra cambios pendientes.
