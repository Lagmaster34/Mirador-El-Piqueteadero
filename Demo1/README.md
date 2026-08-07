# Mirador El Piqueteadero — Sitio web

Sitio de una sola página, HTML + CSS + JS puro (sin frameworks ni build), mobile-first.

## Cómo verlo localmente

```bash
cd Demo1
python3 -m http.server 8000
# abre http://localhost:8000
```

## Pendientes antes de publicar

1. **Número de WhatsApp**: no se incluyó ningún número (no fue provisto). Edita
   `js/main.js` línea con `const WHATSAPP_NUMBER = ""` y agrega el número real
   en formato `57XXXXXXXXXX`. Esto activa el botón flotante, el botón de
   Contacto y el enlace del footer.

2. **Fotografías reales**: todas las imágenes de comida y ambiente actuales son
   fotos de stock (Unsplash) usadas como marcador de posición visual, verificadas
   una por una para que el contenido sea coherente (hamburguesa, tacos, costilla,
   mesas compartidas, etc.). El hero y la sección "Mirador" usan una ilustración
   SVG original de montañas y atardecer en vez de una foto de stock, para no
   mostrar un paisaje que no es realmente el de Yarumal. Reemplaza las imágenes
   en `index.html` (busca `images.unsplash.com`) por fotos reales del
   establecimiento, la vista y los platos apenas estén disponibles — mejorará
   mucho la autenticidad y el SEO local.

3. **Mapa y "Cómo llegar"**: el iframe y los botones usan una búsqueda de Google
   Maps con la dirección de texto (Km 1 vía a la Costa, Yarumal, Antioquia) porque
   no se proporcionaron coordenadas exactas. Si tienes la ubicación exacta en
   Google Maps, reemplaza el `src` del iframe y los `href` de "Cómo llegar" en
   `index.html` por el enlace/coordenadas específicas del lugar.

4. **Dominio real**: la etiqueta `<link rel="canonical">` y el Open Graph en
   `index.html` usan `https://miradorelpiqueteadero.com/` como marcador de
   posición. Actualiza con el dominio real cuando el sitio esté publicado.

## Actualizar el menú

Todo el menú vive en **`js/menu-data.js`**. Es un solo archivo de datos: agrega,
edita o elimina platos y precios ahí — el sitio los renderiza automáticamente
(pestañas + tarjetas), sin tocar HTML ni CSS.

## Estructura

```
index.html        estructura y contenido de las 10 secciones
css/styles.css     sistema de diseño (colores, tipografía, layout, animaciones)
js/menu-data.js    datos del menú (fuente única para actualizarlo)
js/main.js         navegación, render del menú, scroll reveal, WhatsApp
```
