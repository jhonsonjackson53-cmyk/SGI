# Guia GitHub Pages

## URL publica

https://jhonsonjackson53-cmyk.github.io/SGI/

## Rama de publicacion

`main`

## Workflow

`.github/workflows/pages.yml`

## Notas tecnicas

- La app debe compilar con `BASE_PATH=/SGI/`.
- Las imagenes publicas deben cargarse usando la base del proyecto.
- Si una imagen aparece rota en GitHub Pages, revisar primero rutas absolutas y cache del navegador.

## Verificacion rapida

- Abrir la URL con un parametro de cache: `?v=fecha-o-cambio`.
- Probar en escritorio y movil.
- Confirmar que GitHub Actions termine en verde.

