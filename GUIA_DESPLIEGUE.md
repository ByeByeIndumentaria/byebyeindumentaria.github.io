# 📖 GUÍA COMPLETA - CATÁLOGO DIGITAL SS 2027

## Índice
1. [Introducción](#introducción)
2. [Opción 1: Despliegue en GitHub Pages (Recomendado)](#opción-1-github-pages)
3. [Opción 2: Despliegue en Netlify](#opción-2-netlify)
4. [Cómo Editar los Productos](#cómo-editar-productos)
5. [Preguntas Frecuentes](#faq)

---

## Introducción

Tu catálogo digital está compuesto por **3 archivos principales**:
- **index.html** → La estructura de la página
- **style.css** → Los estilos y diseño
- **script.js** → La lógica y funcionamiento

**Todos los productos** están centralizados en una **base de datos JSON** dentro de `script.js`. Esto significa que puedes cambiar, agregar o eliminar productos sin tocar el código de programación.

---

## OPCIÓN 1: GitHub Pages (Recomendado) ✨

### ¿Por qué GitHub Pages?
- ✅ Totalmente GRATIS
- ✅ Dominio personalizado incluido (tuusuario.github.io)
- ✅ Actualizaciones automáticas
- ✅ Perfecto para no-programadores

### Paso 1: Crear una cuenta en GitHub (si no la tienes)

1. Ve a [github.com](https://github.com)
2. Haz clic en **Sign up** (esquina superior derecha)
3. Completa el formulario:
   - **Username:** Elige un nombre de usuario (ej: `miempresa-catalogo`)
   - **Email:** Tu correo
   - **Password:** Contraseña segura
4. Haz clic en **Create account**
5. Verifica tu correo

### Paso 2: Crear un nuevo repositorio

1. Una vez en tu cuenta, ve a **Repositories** (pestaña superior)
2. Haz clic en el botón verde **New** (esquina derecha)
3. En **Repository name** escribe: `catalogo-verano-2027`
4. En **Description** (opcional): "Catálogo digital SS 2027"
5. Selecciona **Public** (IMPORTANTE: debe ser público)
6. ✅ Marca la casilla **Add a README file**
7. Haz clic en **Create repository**

### Paso 3: Subir tus archivos

1. En tu nuevo repositorio, haz clic en **Add file** > **Upload files**
2. **Arrastra y suelta** los 3 archivos (o haz clic para seleccionar):
   - `index.html`
   - `style.css`
   - `script.js`
3. Haz clic en **Commit changes** (botón verde al final)
4. Escribe un mensaje corto como "Primer commit - Catálogo inicial"
5. Haz clic nuevamente en **Commit changes**

### Paso 4: Activar GitHub Pages

1. Ve a **Settings** (pestaña en la parte superior del repositorio)
2. En el menú izquierdo, busca **Pages**
3. En **Source**, selecciona la rama **main**
4. Selecciona la carpeta **(root)**
5. Haz clic en **Save**
6. ¡Listo! GitHub te mostrará un mensaje como: "Your site is published at `https://tuusuario.github.io/catalogo-verano-2027`"

### Paso 5: Acceder a tu catálogo

En unos segundos (máximo 5 minutos), tu sitio estará en línea en:
```
https://tuusuario.github.io/catalogo-verano-2027
```

---

## OPCIÓN 2: Netlify (Alternativa rápida) 🚀

### ¿Por qué Netlify?
- ✅ MUY fácil de usar
- ✅ Desplegable en 2 minutos
- ✅ Dominio personalizado disponible
- ✅ Interfaz super intuitiva

### Paso 1: Crear cuenta en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en **Sign up** (esquina superior derecha)
3. Selecciona **GitHub** para registrarte con tu cuenta de GitHub
4. Autoriza a Netlify acceso a tu GitHub
5. ¡Listo! Estás registrado

### Paso 2: Crear un nuevo sitio

1. Haz clic en **New site from Git** (o **Add new site**)
2. Selecciona **GitHub** como proveedor
3. Autoriza a Netlify si es necesario
4. Selecciona el repositorio `catalogo-verano-2027`
5. En **Build settings** deja todo por defecto
6. Haz clic en **Deploy site**
7. ¡Listo! Tu sitio se publicará automáticamente en una URL tipo: `https://xxxxx.netlify.app`

---

## CÓMO EDITAR PRODUCTOS 📝

### ⚠️ IMPORTANTE
**SOLO necesitas editar el archivo `script.js`**. El resto NO toques.

### Dónde están los productos

1. Abre el archivo `script.js` en tu editor de texto (Notepad++, VS Code, etc.)
2. Busca la sección: **`const PRODUCTS_DATABASE = [`**
3. Ahí encontrarás TODOS los productos

### Estructura de un producto

Cada producto es un objeto como este:

```javascript
{
    id: 'dama_001',                      // ID único (no duplicar)
    name: 'SET ALGODÓN',                 // Nombre del producto
    collection: 'Verano 2027',           // Colección
    gender: 'Dama',                      // Género (Dama o Hombre)
    category: 'Tops',                    // Categoría
    pcs: 30,                             // Cantidad de piezas
    image: 'data:image/svg+xml,%3C...',  // Imagen (URL o data)
    colors: ['Blanco', 'Gris Melange', 'Negro'],  // Colores disponibles
    sizes: ['S', 'M', 'L', 'XL'],        // Talles
    description: 'Conjunto de algodón puro...'    // Descripción
}
```

### Tareas comunes

#### 1️⃣ CAMBIAR EL NOMBRE DE UN PRODUCTO

Busca el campo `name` y cambia el texto:

```javascript
// ANTES
name: 'SET ALGODÓN',

// DESPUÉS
name: 'CONJUNTO PREMIUM ALGODÓN',
```

#### 2️⃣ AGREGAR UN NUEVO COLOR

En el campo `colors`, añade un color a la lista:

```javascript
// ANTES
colors: ['Blanco', 'Gris Melange', 'Negro'],

// DESPUÉS
colors: ['Blanco', 'Gris Melange', 'Negro', 'Azul'],
```

#### 3️⃣ CAMBIAR LA CANTIDAD DE PIEZAS

Modifica el número en `pcs`:

```javascript
// ANTES
pcs: 30,

// DESPUÉS
pcs: 50,
```

#### 4️⃣ AGREGAR UN NUEVO PRODUCTO

Copia este bloque y pégalo al final de `PRODUCTS_DATABASE` (ANTES del `];` final):

```javascript
    {
        id: 'dama_033',                  // Incrementa el número del ID
        name: 'NUEVO PRODUCTO',          // Tu nombre
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Nuevos',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f0f0f0" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3ETu Producto%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Descripción del producto.'
    },
```

#### 5️⃣ MOVER UN PRODUCTO DE SECCIÓN

Simplemente cambia el valor de `collection` o `gender`:

```javascript
// ANTES - En Verano 2027, Dama
collection: 'Verano 2027',
gender: 'Dama',

// DESPUÉS - En Invierno 2027, Hombre
collection: 'Invierno 2027',
gender: 'Hombre',
```

#### 6️⃣ ELIMINAR UN PRODUCTO

Busca el producto completo y **borra todo el bloque** (incluidas las comas):

```javascript
// ELIMINA ESTO (TODO):
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    ...
},
```

### Guardar cambios

1. **Guarda el archivo** (Ctrl+S en Windows o Cmd+S en Mac)
2. **Si usas GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Haz clic en `script.js`
   - Haz clic en el lápiz ✏️ (Edit)
   - Copia todo el contenido actualizado
   - Pega en el editor
   - Haz clic en **Commit changes**
   - Tu sitio se actualizará automáticamente en 1-2 minutos

3. **Si usas Netlify:**
   - Guarda el archivo localmente
   - Sube los cambios a GitHub (usando Git o la web)
   - Netlify se actualizará automáticamente

---

## CAMBIAR LA IMAGEN DE UN PRODUCTO 📸

### Opción A: Usar una URL de imagen existente

```javascript
image: 'https://ejemplo.com/mi-imagen.jpg'
```

### Opción B: Usar el SVG por defecto (para pruebas)

El SVG que ya está es un placeholder. Puedes dejarlo así.

### Opción C: Cambiar el texto del SVG

Busca esta línea en el SVG:

```javascript
%3Ctext x="100" y="125" text-anchor="middle" ... %3ETu Producto%3C/text%3E
```

Y reemplaza `Tu Producto` con el nombre del producto.

---

## CAMBIAR COLECCIONES, GÉNEROS O CATEGORÍAS 🏷️

El sistema **genera automáticamente** los filtros basándose en los valores de `collection`, `gender` y `category` que uses en los productos.

**Ejemplo:**
Si cambias un producto de:
```javascript
collection: 'Verano 2027'
```
A:
```javascript
collection: 'Liquidación'
```

Automáticamente aparecerá "Liquidación" en los filtros.

---

## FAQ - PREGUNTAS FRECUENTES ❓

### P: ¿Cuánto cuesta?
**R:** Totalmente GRATIS con GitHub Pages o Netlify. No hay cargos mensuales.

### P: ¿Necesito saber programar?
**R:** NO. Solo debes editar el JSON de productos. La estructura está clara y comentada.

### P: ¿Puedo agregar más de 50 productos?
**R:** Sí, sin límite. El sistema es escalable.

### P: ¿Los cambios se ven inmediatamente?
**R:** No. Tarda 1-5 minutos en actualizar el sitio en vivo. Es normal.

### P: ¿Puedo cambiar los colores del diseño?
**R:** Sí. Abre `style.css` y busca `:root { --color-primary: ...`. Ahí puedes cambiar los colores principales.

### P: ¿Puedo agregar un dominio personalizado?
**R:** Sí:
- **GitHub Pages:** Settings > Pages > Custom domain (requiere comprar dominio)
- **Netlify:** Settings > Domain management > Add custom domain

### P: ¿Cómo agrego WhatsApp Business?
**R:** El código ya está optimizado. Solo asegúrate de que los clientes tengan WhatsApp instalado. El botón abre automáticamente el chat.

### P: ¿Puedo agregar un catálogo de Invierno?
**R:** Sí. Solo agrega productos con `collection: 'Invierno 2027'` y aparecerá automáticamente en los filtros.

### P: ¿Cómo hago backup?
**R:** 
- En GitHub: Tu repositorio es tu backup automático. Está en la nube.
- Descarga una copia local de tus archivos cada tanto.

### P: ¿Puedo eliminar el tagline "Made for summer"?
**R:** Sí. Abre `index.html` y busca `<p class="tagline">Made for summer...</p>` y cambia el texto.

---

## SOPORTE Y RECURSOS

- **Documentación GitHub:** https://pages.github.com
- **Documentación Netlify:** https://docs.netlify.com
- **Editor Online para JSON:** https://jsonlint.com (para validar cambios)
- **Colores HTML:** https://htmlcolorcodes.com

---

## RESUMEN RÁPIDO DE CAMBIOS

| Quiero hacer | Dónde editar | Campo |
|---|---|---|
| Cambiar nombre de producto | `script.js` | `name` |
| Agregar color | `script.js` | `colors: [...]` |
| Agregar nuevo producto | `script.js` | Copiar bloque |
| Cambiar género | `script.js` | `gender` |
| Cambiar colección | `script.js` | `collection` |
| Cambiar diseño | `style.css` | CSS variables |
| Cambiar estructura | `index.html` | HTML |

---

## 🎉 ¡LISTO!

Tu catálogo digital está listo para usarse. Ahora puedes:

✅ Compartir el enlace con tus clientes
✅ Editar productos sin ayuda
✅ Agregar nuevas colecciones
✅ Recibir cotizaciones por WhatsApp

¿Preguntas? Consulta la sección FAQ arriba. 

**¡Éxito con tu catálogo! 🚀**
