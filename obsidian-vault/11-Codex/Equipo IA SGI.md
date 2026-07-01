# Equipo IA SGI

## Objetivo

Crear un equipo de trabajo IA para mejorar la web SGI de forma continua, manteniendo control tecnico, memoria del proyecto y publicacion segura.

## Principio operativo

- Open WebUI propone, revisa, redacta y organiza.
- Codex ejecuta cambios reales en archivos, validaciones, commits y deploy.
- Obsidian conserva memoria, bitacora, decisiones y pendientes.
- GitHub mantiene historial, respaldo y GitHub Pages.
- Ningun agente publica cambios sin revision.

## Perfiles creados en Open WebUI

### SGI Director Tecnico

- ID: `sgi-director-tecnico`
- Base: `gpt-5.5-pro`
- Uso: priorizar, dividir tareas, decidir flujo y riesgos.
- Temperatura: `0.2`

### SGI Programador Senior

- ID: `sgi-programador-senior`
- Base: `gpt-5.5-pro`
- Uso: revisar bugs, arquitectura, React, CSS, responsive y GitHub Pages antes de implementacion.
- Temperatura: `0.18`

### SGI Disenador Industrial

- ID: `sgi-disenador-industrial`
- Base: `gpt-4o`
- Uso: revisar capturas, UI, colores, iconos, composicion y coherencia industrial.
- Temperatura: `0.45`
- Futuro: reasignar a Gemini cuando se conecte una API key nueva y segura.

### SGI Mente Creativa

- ID: `sgi-mente-creativa`
- Base: `gpt-4o`
- Uso: ideas visuales, storytelling, animaciones, campanas y conceptos.
- Temperatura: `0.75`
- Futuro: reasignar a Gemini cuando se conecte una API key nueva y segura.

### SGI Redactor Comercial

- ID: `sgi-redactor-comercial`
- Base: `gpt-4.1`
- Uso: textos comerciales, servicios, CTA, SEO y mensajes para cliente.
- Temperatura: `0.35`

### SGI QA Mobile

- ID: `sgi-qa-mobile`
- Base: `gpt-4o`
- Uso: revisar capturas, responsive, bugs visuales, imagenes faltantes y calidad pre-cliente.
- Temperatura: `0.2`

### SGI Gestor de Memoria

- ID: `sgi-gestor-memoria`
- Base: `gpt-5.5-pro`
- Uso: bitacora, pendientes, decisiones, assets, handoffs y estado del proyecto.
- Temperatura: `0.15`

## Flujo recomendado

1. El usuario plantea objetivo o problema.
2. `SGI Director Tecnico` define prioridad, responsable y criterios de aceptacion.
3. El rol especializado propone solucion:
   - Codigo: `SGI Programador Senior`.
   - Visual: `SGI Disenador Industrial`.
   - Ideas: `SGI Mente Creativa`.
   - Texto: `SGI Redactor Comercial`.
   - Revision: `SGI QA Mobile`.
4. Codex implementa cambios reales en el repositorio.
5. Codex valida preview, build y estado de Git.
6. `SGI Gestor de Memoria` registra resumen, archivos, validacion y pendientes.
7. Codex publica en GitHub Pages cuando aplique.

## Pendientes

- Rotar la API key de Gemini vista en captura antes de conectarla.
- Conectar Gemini en Open WebUI con una clave nueva.
- Crear `SGI - Memoria del Proyecto` en Conocimiento.
- Asociar esa base de conocimiento a todos los perfiles SGI.
- Evaluar si conviene integrar Claude para redaccion/revision comercial.
