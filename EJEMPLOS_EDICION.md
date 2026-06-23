# 📝 EJEMPLOS DE EDICIÓN - GUÍA PRÁCTICA

Este archivo muestra **ejemplos paso a paso** de cómo hacer cambios comunes en `script.js`.

---

## 📍 DÓNDE EDITAR

Abre el archivo `script.js` en cualquier editor de texto (Notepad, VS Code, etc.) y busca esta línea:

```javascript
const PRODUCTS_DATABASE = [
```

Esa es la base de datos de productos. Aquí es donde harás todos los cambios.

---

## EJEMPLO 1: Cambiar el nombre de un producto

### Situación:
Quieres cambiar "SET ALGODÓN" por "CONJUNTO PREMIUM ALGODÓN"

### Pasos:

1. Busca el producto en `script.js`:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',     ← ESTE CAMPO
    collection: 'Verano 2027',
    ...
}
```

2. Cambia el texto:
```javascript
{
    id: 'dama_001',
    name: 'CONJUNTO PREMIUM ALGODÓN',     ← CAMBIO AQUÍ
    collection: 'Verano 2027',
    ...
}
```

3. Guarda el archivo (Ctrl+S)

4. Sube a GitHub y espera 1-5 minutos

✅ **¡Listo! El nombre ha cambiado en tu catálogo**

---

## EJEMPLO 2: Agregar un nuevo color a un producto

### Situación:
El "SET ALGODÓN" ahora también viene en azul. Quieres agregarlo.

### Pasos:

1. Busca el producto:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    colors: ['Blanco', 'Gris Melange', 'Negro'],     ← AQUÍ ESTÁN LOS COLORES
    ...
}
```

2. Agrega el nuevo color (escribe dentro del array):
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    colors: ['Blanco', 'Gris Melange', 'Negro', 'Azul'],     ← AGREGADO
    ...
}
```

⚠️ **Nota:** La COMA es importante. Después de cada color va una coma EXCEPTO el último.

3. Guarda y sube a GitHub

✅ **¡Listo! Ahora el cliente puede seleccionar "Azul" al ver este producto**

---

## EJEMPLO 3: Cambiar los talles disponibles

### Situación:
Un producto que tenía S, M, L, XL ahora también viene en XXL y 3XL

### Pasos:

1. Busca el campo `sizes`:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    sizes: ['S', 'M', 'L', 'XL'],     ← TALLES
    ...
}
```

2. Agrega los nuevos talles:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],     ← ACTUALIZADOS
    ...
}
```

3. Guarda y sube

✅ **¡Listo! Los nuevos talles aparecerán en el selector**

---

## EJEMPLO 4: Aumentar la cantidad de piezas

### Situación:
Aumentaste la producción de un artículo. Quieres actualizar las piezas de 30 a 50.

### Pasos:

1. Busca el campo `pcs`:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    pcs: 30,     ← CANTIDAD
    ...
}
```

2. Cambia el número:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    pcs: 50,     ← ACTUALIZADO
    ...
}
```

3. Guarda y sube

✅ **¡Listo! El catálogo muestra 50 PCS**

---

## EJEMPLO 5: Cambiar la colección de un producto

### Situación:
Quieres mover un producto de "Verano 2027" a "Liquidación"

### Pasos:

1. Busca el campo `collection`:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    collection: 'Verano 2027',     ← COLECCIÓN
    ...
}
```

2. Cambia el valor:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    collection: 'Liquidación',     ← ACTUALIZADO
    ...
}
```

3. Guarda y sube

✅ **¡Listo! El producto ahora aparecerá en "Liquidación" y desaparecerá de "Verano 2027"**

---

## EJEMPLO 6: Cambiar la categoría de un producto

### Situación:
Clasificaste mal un producto. Quieres cambiar "Tops" a "Remeras"

### Pasos:

1. Busca el campo `category`:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    category: 'Tops',     ← CATEGORÍA
    ...
}
```

2. Cambia el valor:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    category: 'Remeras',     ← ACTUALIZADO
    ...
}
```

3. Guarda y sube

✅ **¡Listo! El producto aparecerá en "Remeras"**

---

## EJEMPLO 7: Agregar un producto completamente nuevo

### Situación:
Tienes una nueva remera que quieres agregar al catálogo

### Pasos:

1. Copia este bloque (desde `{` hasta `},` **incluida la coma**):

```javascript
    {
        id: 'dama_032',
        name: 'SET ESTAMPADO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 24,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23505050" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3ESet Estampado%3C/text%3E%3C/svg%3E',
        colors: ['Estampa 1', 'Estampa 2', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Conjunto estampado, moderno y colorido.'
    },
```

2. Busca al final de la lista de productos (justo ANTES de `];`) y pégalo:

```javascript
    {
        id: 'dama_032',
        name: 'SET ESTAMPADO',
        ...
    },  ← PEGA AQUÍ (antes del ];)
];  ← El cierre de la base de datos
```

3. **Personaliza el nuevo producto:**

```javascript
    {
        id: 'dama_033',                              ← INCREMENTA EL ID (033, no 032)
        name: 'REMERA NUEVA',                        ← NOMBRE
        collection: 'Verano 2027',                   ← TU COLECCIÓN
        gender: 'Dama',                              ← GÉNERO
        category: 'Remeras',                         ← CATEGORÍA
        pcs: 40,                                     ← PIEZAS
        image: 'data:image/svg+xml/...',            ← IMAGEN (deja igual por ahora)
        colors: ['Blanco', 'Negro', 'Rojo'],        ← COLORES
        sizes: ['S', 'M', 'L', 'XL'],               ← TALLES
        description: 'Remera nueva, super cómoda.'  ← DESCRIPCIÓN
    },
```

4. Guarda y sube

✅ **¡Listo! Tu nuevo producto aparecerá en el catálogo**

---

## EJEMPLO 8: Eliminar un producto

### Situación:
Ya no vendes un producto y quieres sacarlo del catálogo

### Pasos:

1. Busca el producto completo en `script.js`

2. **Borra TODO el bloque**, incluyendo la coma:

```javascript
// ELIMINA ESTO (TODO el bloque):
    {
        id: 'dama_001',
        name: 'SET ALGODÓN',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 30,
        image: 'data:image/svg+xml/...',
        colors: ['Blanco', 'Gris Melange', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Conjunto de algodón puro...'
    },  ← BORRA TAMBIÉN ESTA COMA
```

3. Guarda y sube

✅ **¡Listo! El producto ya no aparece en el catálogo**

---

## EJEMPLO 9: Cambiar descripción

### Situación:
Quieres actualizar la descripción de un producto para que sea más atractiva

### Pasos:

1. Busca el campo `description`:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    description: 'Conjunto de algodón puro, perfecto para el verano.',     ← AQUÍ
    ...
}
```

2. Cambia el texto:
```javascript
{
    id: 'dama_001',
    name: 'SET ALGODÓN',
    description: 'Conjunto premium de algodón 100% puro. Súper cómodo, ideal para días cálidos y ocasiones informales. Disponible en 3 colores neutros.',     ← NUEVA DESCRIPCIÓN
    ...
}
```

3. Guarda y sube

✅ **¡Listo! La descripción aparecerá en el modal del producto**

---

## EJEMPLO 10: Crear una nueva colección

### Situación:
Quieres agregar una colección "Invierno 2027" con nuevos productos

### Pasos:

1. Agrega productos con `collection: 'Invierno 2027'`:

```javascript
    {
        id: 'dama_100',
        name: 'SUÉTER LANA',
        collection: 'Invierno 2027',     ← NUEVA COLECCIÓN
        gender: 'Dama',
        category: 'Sweaters',
        pcs: 30,
        image: 'data:image/svg+xml/...',
        colors: ['Gris', 'Negro', 'Crudo'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Suéter de lana pura, abrigado y elegante.'
    },
    {
        id: 'dama_101',
        name: 'PANTALÓN LANA',
        collection: 'Invierno 2027',     ← MISMA COLECCIÓN
        gender: 'Dama',
        category: 'Pantalones',
        pcs: 40,
        ...
    },
```

2. Guarda y sube

✅ **¡Listo! Automáticamente aparecerá "Invierno 2027" en los filtros**

---

## ⚠️ ERRORES COMUNES

### ❌ Olvidar comas
```javascript
// MAL - Falta coma después de 'Negro'
colors: ['Blanco', 'Negro']
sizes: ['S', 'M', 'L']

// BIEN - Con comas
colors: ['Blanco', 'Negro'],
sizes: ['S', 'M', 'L'],
```

### ❌ Tildes mal escritas
```javascript
// MAL
name: 'RÉMERA BLANCA'

// BIEN
name: 'REMERA BLANCA'
```

(El sistema funciona mejor sin tildes especiales)

### ❌ IDs duplicados
```javascript
// MAL - ID repetido
{
    id: 'dama_001',
    name: 'PRODUCTO 1'
},
{
    id: 'dama_001',     ← REPETIDO
    name: 'PRODUCTO 2'
}

// BIEN - IDs únicos
{
    id: 'dama_001',
    name: 'PRODUCTO 1'
},
{
    id: 'dama_002',     ← ÚNICO
    name: 'PRODUCTO 2'
}
```

### ❌ Comillas mal cerradas
```javascript
// MAL
name: "REMERA

// BIEN
name: 'REMERA'
```

---

## 🆘 VALIDAR CAMBIOS

Si hiciste cambios y el sitio se ve roto, abre la **Consola** del navegador (F12) y busca errores en rojo.

Los errores más comunes son:
- Falta una coma
- Falta cerrar una comilla
- Falta una llave `}`

---

## 📋 CHECKLIST ANTES DE SUBIR

Antes de guardar y subir a GitHub:

- [ ] ¿Verifiqué que todos los productos tienen `id` único?
- [ ] ¿Todas las comillas están cerradas correctamente?
- [ ] ¿No hay comas faltantes entre campos?
- [ ] ¿Los nombres tienen sentido?
- [ ] ¿Las colecciones y géneros son consistentes?

---

## 🎯 RESUMEN RÁPIDO

| Acción | Ubicación | Cambio |
|--------|-----------|--------|
| Cambiar nombre | `name` | Edita el texto |
| Agregar color | `colors: [...]` | Agrega dentro del array |
| Cambiar talle | `sizes: [...]` | Edita el array |
| Cambiar pcs | `pcs` | Edita el número |
| Cambiar colección | `collection` | Cambia el texto |
| Cambiar categoría | `category` | Cambia el texto |
| Cambiar género | `gender` | Cambia a 'Dama' o 'Hombre' |
| Agregar producto | Al final de la lista | Copia un bloque |
| Eliminar producto | En la lista | Borra el bloque completo |

---

¿Necesitas ayuda? Revisa **GUIA_DESPLIEGUE.md** o **README.md**

**¡Ahora estás listo para editar tu catálogo! 🚀**
