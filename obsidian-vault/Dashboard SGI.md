# Dashboard SGI

## Accesos rapidos

- [[01-Proyecto SGI/Estado actual del proyecto SGI]]
- [[01-Proyecto SGI/Mapa de secciones de la web]]
- [[04-Pendientes/Pendientes]]
- [[06-Assets e Imagenes/Assets pendientes]]
- [[07-Bitacora Codex/Bitacora de cambios]]
- [[10-GitHub y Deploy/Guia GitHub Pages]]
- [[11-Codex/Protocolo de trabajo con Codex]]

## Pendientes abiertos

```tasks
not done
path includes obsidian-vault
sort by path
sort by description
```

## Notas modificables clave

```dataview
TABLE file.folder AS "Carpeta", file.mtime AS "Ultima modificacion"
FROM "01-Proyecto SGI" OR "02-Contenido Web" OR "03-Decisiones" OR "04-Pendientes" OR "06-Assets e Imagenes" OR "07-Bitacora Codex"
SORT file.mtime DESC
LIMIT 12
```

## Flujo rapido

1. Capturar ideas en [[00-Inbox/Inbox]].
2. Convertir decisiones en notas dentro de [[03-Decisiones/Decisiones de diseno]].
3. Registrar tareas en [[04-Pendientes/Pendientes]].
4. Registrar nuevos archivos en [[06-Assets e Imagenes/Assets pendientes]].
5. Pedir a Codex que actualice [[07-Bitacora Codex/Bitacora de cambios]] despues de cada cambio importante.

