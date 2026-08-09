# Mirador El Piqueteadero — Demo2

Sitio de una sola página, HTML + CSS + JS puro (sin frameworks ni build), mobile-first.
Su firma visual es un **cielo vivo**: un fondo fijo animado (montañas + sol) que cambia
de día → atardecer → noche a medida que se hace scroll, sincronizado con el contenido.

## Cómo verlo localmente

```bash
cd Demo2
python3 -m http.server 8000
# abre http://localhost:8000
```

## Qué se corrigió en esta revisión

- **CSS y JS ya no están duplicados.** Antes `index.html` tenía todo el CSS/JS inline
  y además existían `styles.css`/`script.js` como copias sueltas sin usar. Ahora
  `index.html` enlaza `css/styles.css` y `js/script.js` de verdad — un solo lugar para
  editar cada cosa.
- **Menú completo y real.** Faltaban las categorías "Entradas" y "Pal frío", y varias
  categorías generalizaban productos reales (p. ej. "Aguardientes" en vez de las 4
  marcas, "Micheladas" en vez de "Michelada tradicional" / "Micheladas afrutadas").
  Ahora las 7 categorías, con nombres y precios exactos, viven en un solo archivo:
  **`js/menu-data.js`**. Para actualizar el menú, edita solo ese archivo.
- **Fotos corregidas.** Se reemplazaron enlaces de descarga de Unsplash (frágiles,
  `.../download?force=true`) por enlaces directos del CDN. Se corrigió una foto que
  decía "mesa con amigos" pero mostraba carne desmenuzada en primer plano. Se quitó
  la etiqueta "Vista nocturna de Yarumal" de una foto de stock genérica (no es
  realmente Yarumal) y se renombró a "Ambiente nocturno".
- **Hero sin foto de stock superpuesta.** El hero mostraba una fotografía panorámica
  genérica como si fuera la vista real del mirador. Se quitó: ahora el fondo es
  solo el cielo animado (el elemento más distintivo del sitio), sin afirmar que una
  foto de stock es el paisaje real del negocio.
- **Se quitó un dato inventado** ("2.300 m sobre el nivel del mar" en el hero) que no
  fue proporcionado ni verificado.
- **Menú móvil funcional.** Antes, en celular, la barra de navegación solo mostraba el
  botón "Visítanos" — no había forma de ir a Menú/Horarios/Ubicación sin scrollear todo
  el sitio. Se agregó un botón de hamburguesa con panel deslizable.
- **Botón flotante de WhatsApp** (requisito del brief original que faltaba por completo).
- **Sección Ubicación con mapa embebido** (antes solo existía el botón "Cómo llegar",
  sin mapa).
- **SEO**: meta keywords, canonical y datos estructurados (JSON-LD `Restaurant`) para
  "restaurante en Yarumal", "mirador en Yarumal", etc.
- **Accesibilidad**: las fotos son `<div>` con imagen de fondo (no `<img>`), así que se
  agregó `role="img"` + `aria-label` a cada una para que lectores de pantalla tengan
  una descripción real, no solo el efecto visual decorativo.

## Pendientes antes de publicar

1. **Número de WhatsApp**: no se incluyó ninguno (no fue provisto). Edita
   `js/script.js`, la línea `var WHATSAPP_NUMBER = ''`, con el número real en formato
   `57XXXXXXXXXX`. Activa el botón flotante, el botón "Contactar" del CTA final y el
   enlace del footer — los tres a la vez.
2. **Fotografías reales** del lugar, los platos y la vista — hoy son fotos de stock de
   Unsplash verificadas una por una para que el contenido tenga sentido, pero no son
   del negocio. Reemplaza cualquier `--src:url('https://images.unsplash.com/...')` en
   `index.html` por fotos reales cuando estén disponibles.
3. **Dominio real**: `<link rel="canonical">` y Open Graph usan
   `https://miradorelpiqueteadero.com/` como marcador de posición.

## Actualizar el menú

Todo el menú (salvo "Signature", que es una tarjeta fija en `index.html`) vive en
**`js/menu-data.js`**. Agrega, edita o elimina categorías/platos/precios ahí — el sitio
los renderiza automáticamente en tarjetas, sin tocar HTML ni CSS.

## Estructura

```
index.html         estructura y contenido de todas las secciones
css/styles.css      sistema de diseño: tokens de color, cielo vivo, layout, animaciones
js/menu-data.js     datos del menú (fuente única para actualizarlo)
js/script.js        mood del cielo, reveals, menú móvil, render del menú, WhatsApp
```