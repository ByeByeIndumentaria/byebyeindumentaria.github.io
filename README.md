# 🛍️ CATÁLOGO DIGITAL - SS 2027

**Catálogo web digital interactivo minimalista y elegante para Verano 2027**

---

## ✨ CARACTERÍSTICAS PRINCIPALES

### 📱 Diseño Responsivo
- Perfecto en desktop, tablet y móvil
- Interfaz minimalista y elegante
- Mucho espacio en blanco
- Tipografía moderna y limpia

### 🔍 Sistema de Filtros Inteligente
- **Filtrar por Colección** (Verano 2027, Invierno 2027, etc.)
- **Filtrar por Género** (Dama, Hombre)
- **Filtrar por Categoría** (Tops, Vestidos, Pantalones, etc.)
- Los filtros se generan automáticamente según los productos

### 🎨 Modal de Detalle
- Vista completa de cada producto
- **Selector visual de colores** (muestras de color)
- **Selector de talles**
- Descripción detallada
- Información de colección y cantidad de piezas

### 🛒 Carrito de Cotización
- No es un carrito de compra (no hay precios ni pagos)
- Permite al usuario seleccionar productos y variantes
- Vista lateral elegante
- Resumen completo de productos seleccionados

### 📄 Generación de PDF
- Crea un PDF profesional con los productos seleccionados
- Incluye todos los detalles (color, talle, cantidad)
- Diseño limpio y legible
- Descarga automática

### 💬 Integración WhatsApp
- Botón para abrir WhatsApp automáticamente
- Mensaje predeterminado con la selección
- El usuario puede enviar el PDF junto con el mensaje
- Perfecto para cotizaciones B2B

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
catalogo-verano-2027/
├── index.html          ← Estructura HTML (NO EDITES)
├── style.css           ← Estilos CSS (opcional editar)
├── script.js           ← Lógica + BASE DE DATOS (EDITA AQUÍ)
├── GUIA_DESPLIEGUE.md  ← Guía paso a paso para desplegar
└── README.md           ← Este archivo
```

---

## 🚀 QUICK START

### 1. Desplegar en 2 minutos (GitHub Pages)

```bash
# 1. Crear cuenta en github.com
# 2. Crear nuevo repositorio (público)
# 3. Subir estos 3 archivos: index.html, style.css, script.js
# 4. Ir a Settings > Pages
# 5. Seleccionar "main" branch
# 6. ¡Listo! Tu sitio estará en: https://tuusuario.github.io/catalogo-verano-2027
```

Para instrucciones detalladas, lee **GUIA_DESPLIEGUE.md**

### 2. Editar productos (Super fácil)

Abre `script.js` y busca `const PRODUCTS_DATABASE = [`. Ahí verás todos los productos en formato JSON.

Ejemplo:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    collection: 'Verano 2027',
    gender: 'Dama',
    category: 'Tops',
    pcs: 30,
    colors: ['Blanco', 'Gris Melange', 'Negro'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Conjunto de algodón puro, perfecto para el verano.'
}
```

**Para cambiar algo:**
- Cambiar nombre: Edita `name`
- Agregar color: Agrega un color al array `colors`
- Cambiar género: Edita `gender` (Dama o Hombre)
- Cambiar categoría: Edita `category`
- Agregar nuevo producto: Copia este bloque y adapta

---

## 🎯 CASOS DE USO

Este catálogo es perfecto para:

✅ **Empresas de ropa** - Mostrar colecciones por temporada
✅ **Tiendas mayoristas** - Catálogos para distribuidores
✅ **Diseñadores independientes** - Portfolio de productos
✅ **Confecciones** - Catálogos interactivos
✅ **E-commerce B2B** - Cotizaciones por WhatsApp
✅ **Showrooms digitales** - Presentar colecciones

---

## 🎨 PERSONALIZACIÓN

### Cambiar colores de la web

Abre `style.css` y busca:

```css
:root {
    --color-primary: #000;        /* Color principal (negro) */
    --color-secondary: #fff;      /* Color secundario (blanco) */
    --color-accent: #f5f5f5;      /* Color de acento (gris) */
}
```

Cambia los códigos hexadecimales a los colores que quieras.

### Cambiar tipografía

En `style.css`:

```css
--font-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
--font-display: 'Garamond', 'Georgia', serif;
```

Reemplaza con tus tipografías favoritas (ej: 'Montserrat', 'Playfair Display', etc.)

### Cambiar nombre del catálogo

En `index.html`, busca:

```html
<h1>CATÁLOGO DIGITAL</h1>
<p class="tagline">Made for summer. SS 2027</p>
```

Y cambia el texto.

---

## 📊 BASE DE DATOS

### Estructura de un producto

```javascript
{
    id: string,              // ID único (ej: 'dama_001')
    name: string,            // Nombre del producto
    collection: string,      // Colección (ej: 'Verano 2027')
    gender: string,          // Género ('Dama' o 'Hombre')
    category: string,        // Categoría (ej: 'Tops', 'Vestidos')
    pcs: number,             // Cantidad de piezas
    image: string,           // URL de imagen (SVG por defecto)
    colors: array,           // Array de colores disponibles
    sizes: array,            // Array de talles
    description: string      // Descripción del producto
}
```

### Colecciones disponibles
- Verano 2027 (por defecto)
- Invierno 2027 (agregar si deseas)
- Liquidación (agregar si deseas)
- O las que quieras definir

### Géneros
- Dama
- Hombre

### Categorías (ejemplos)
- Tops
- Remeras
- Vestidos
- Pantalones
- Shorts
- Chombas
- Camisas
- Trajes de Baño
- Sets
- Enteritos

---

## 🔧 CARACTERÍSTICAS TÉCNICAS

- **Sin dependencias externas** (excepto html2pdf para PDF)
- **HTML5 semántico**
- **CSS Grid y Flexbox**
- **JavaScript vanilla (ES6+)**
- **Responsive design mobile-first**
- **Progressive enhancement**
- **Performance optimizado**

---

## 🌐 COMPATIBILIDAD

- ✅ Chrome (todas las versiones)
- ✅ Firefox (todas las versiones)
- ✅ Safari (todas las versiones)
- ✅ Edge (todas las versiones)
- ✅ Navegadores móviles (iOS Safari, Chrome Android)

---

## 📝 EDICIONES COMUNES

### Agregar nueva colección

1. Abre `script.js`
2. Busca un producto
3. Cambia `collection: 'Verano 2027'` a `collection: 'Invierno 2027'`
4. Los filtros se actualizarán automáticamente

### Cambiar cantidad de talles

En el campo `sizes`, agrega o quita talles:

```javascript
// Antes
sizes: ['S', 'M', 'L', 'XL']

// Después - Agregar XXL
sizes: ['S', 'M', 'L', 'XL', 'XXL']

// O para números
sizes: ['30', '32', '34', '36']
```

### Cambiar colores disponibles

```javascript
// Antes
colors: ['Blanco', 'Negro']

// Después
colors: ['Blanco', 'Negro', 'Azul', 'Rojo', 'Verde']
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### El sitio se ve pero los productos no aparecen
- Verifica que `script.js` esté en la misma carpeta que `index.html`
- Abre la consola del navegador (F12) y busca errores

### Los cambios no se ven
- Recarga la página (Ctrl+F5 o Cmd+Shift+R)
- En GitHub Pages: Espera 1-5 minutos
- En Netlify: Verifica que los cambios se hayan sincronizado

### Las imágenes no cargan
- Verifica que la URL de la imagen sea correcta
- Intenta con otra URL de imagen
- O usa el SVG por defecto

### El WhatsApp no abre
- Verifica que tengas WhatsApp instalado
- Intenta en otro navegador
- En móvil debería funcionar perfectamente

---

## 📚 RECURSOS ÚTILES

### Documentación
- [MDN Web Docs](https://developer.mozilla.org) - Referencia web
- [Can I Use](https://caniuse.com) - Compatibilidad de navegadores
- [CSS Tricks](https://css-tricks.com) - Tutoriales CSS

### Herramientas
- [ColorPicker](https://htmlcolorcodes.com) - Códigos de color
- [FontAwesome](https://fontawesome.com) - Iconos
- [Google Fonts](https://fonts.google.com) - Tipografías gratis

### Hospedaje
- [GitHub Pages](https://pages.github.com) - Gratis
- [Netlify](https://netlify.com) - Gratis
- [Vercel](https://vercel.com) - Gratis

---

## 📞 CONTACTO Y SOPORTE

Si tienes dudas sobre:
- **Despliegue:** Lee GUIA_DESPLIEGUE.md
- **Edición de productos:** Ver sección "EDICIONES COMUNES"
- **Personalización avanzada:** Aprende CSS/JavaScript

---

## 📄 LICENCIA

Este código es **tuyo**. Úsalo, modifícalo y distribuye como quieras.

---

## 🎉 ¿LISTO PARA COMENZAR?

1. **Lee:** GUIA_DESPLIEGUE.md
2. **Despliega:** En GitHub Pages o Netlify (2 minutos)
3. **Comparte:** El enlace con tus clientes
4. **Edita:** Los productos cuando necesites

**¡Tu catálogo digital está listo! 🚀**

---

**Última actualización:** Junio 2026
**Versión:** 1.0
**Status:** ✅ Listo para producción
