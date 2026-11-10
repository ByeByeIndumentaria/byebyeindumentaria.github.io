# BYE BYE — Centro de pedidos compartido

La página funciona desde internet y no depende de la computadora ni de los
archivos personales de Isabella. Pedidos, inventario y usuarios autorizados
se administran en la base compartida de Supabase. Las herramientas de PDF y
Excel están incluidas en el sitio.

---

## 1. Cómo entrar

1. Abrí **https://byebyeindumentaria.github.io/pedidos/** en Chrome, Safari,
   Edge o Firefox.
2. Ingresá con tu correo y contraseña.
3. Si recibiste una invitación o un enlace de recuperación, abrilo y elegí
   una contraseña de al menos 8 caracteres.

No hay que instalar, copiar ni llevar carpetas de fotos. Puede usarse desde
cualquier computadora o teléfono con internet.

### Si olvidaste la contraseña

En la pantalla de ingreso escribí tu correo y tocá **Olvidé mi contraseña**.
El enlace recibido dura 60 minutos. Nunca compartas ese enlace ni la
contraseña. Si el correo no llega, revisá Spam antes de pedir otro.

### Roles

- **Propietaria:** administra usuarios, pedidos e inventario.
- **Administradora:** administra pedidos e inventario.
- **Operadora:** crea y edita pedidos, sin administrar accesos.
- **Solo lectura:** consulta sin modificar.

---

## 2. Qué trae cargado de entrada

Ya viene con:
- El catálogo completo de tu sitio web (productos, fotos, códigos).
- Los precios de la lista **Venta Final Invierno 2026** que ya me habías
  pasado.

Si tu catálogo o tus precios cambiaron desde ahora, seguí leyendo.

---

## 3. Cargar o actualizar precios (Excel)

**Ya viene con la lista completa y corregida cargada** (Invierno 2026 +
Verano SS27 Hombre y Dama combinados — 152 artículos con código). Si en
algún momento usaste una versión anterior de esta carpeta en esa misma
computadora, puede haber quedado algún precio viejo o una asociación de
código incorrecta guardada en el navegador — usá el botón **"Restablecer
precios guardados"** (arriba a la derecha) para limpiar eso y que valgan
los precios nuevos que trae este archivo.

Para cargar una lista de precios nueva en el futuro: botón **"Importar
precios (Excel)"** → elegís uno o varios archivos `.xlsx`. Se detecta
automáticamente la estructura (igual que hasta ahora).

La librería que lee Excel está incluida en `vendor/`, por lo que no se descarga
desde un sitio externo. De todos modos, la app requiere internet para
sincronizar pedidos e inventario con Supabase.

Por ahora, los precios importados y los matches manuales quedan guardados en
el navegador donde se cargaron. Esto no afecta los pedidos ni el inventario,
que sí son compartidos. La centralización de precios es una fase posterior.

---

## 4. Asistente de matching

Igual que en la versión anterior: botón **"Asistente de matching"** te
muestra, uno por uno, los productos sin código propio y te sugiere el
artículo de precio más parecido por nombre. Confirmás, corregís a mano, o
marcás "sin match". Esto también queda guardado en esa computadora.

Actualmente hay **13 productos sin código** en tu catálogo (los mismos que
ya te había listado). Si les agregás el código directamente en tu
`script.js` y me lo volvés a pasar, regenero este archivo con todo ya
resuelto.

---

## 5. Cargar un pedido

Igual que antes:
1. Completá los datos del cliente.
2. Buscá por código o nombre — aparece la lista de coincidencias.
3. Elegís el producto (clic, o con el teclado), se muestra la foto y el
   precio.
4. **Si ese producto ya tiene la "caja tipo" cargada** (la curva de colores
   y talles que arma cada caja, tal como está en tu sitio web), el campo
   **"Unid. por caja" se completa solo** y aparece la tabla con el
   desglose exacto (qué color y qué talle trae cada caja). Vos sólo
   tenés que indicar cuántas **cajas** pedís — el total de unidades y el
   subtotal se calculan solos.
5. **Si ese producto todavía no tiene la curva cargada en tu sitio web**,
   el campo "Unid. por caja" queda editable como antes, para que lo
   completes a mano.
6. **Enter** (o clic en "Agregar"): se suma al pedido y el cursor vuelve
   solo al buscador.
7. Podés editar cantidades/precio o borrar cualquier ítem ya cargado, ahí
   mismo en la tabla.
8. Descuento % y Envío $ opcionales — el total se recalcula solo.

### Guardar y continuar pedidos

- **Guardar pedido** conserva el pedido actual en este navegador, incluso si todavía es un borrador.
- **Pedidos guardados** permite buscar, abrir y seguir editando cualquier pedido anterior.
- Cada pedido puede marcarse como Borrador, En confirmación, Por pagar, Pagado, En preparación, Entregado o Cancelado.
- Si intentás cerrar la página con cambios pendientes, el navegador muestra una advertencia.

Actualmente **136 de 180 productos** ya tienen su curva de caja cargada
(la misma info que usa tu sitio web). Los que todavía no la tienen son,
sobre todo, productos de la colección anterior a "Producción Invierno
2027". Si les cargás la curva en el sitio (con `packaging: { totalPieces:
..., rows: [...] }`, como los demás) y me volvés a pasar el `script.js`,
te regenero el archivo con eso ya resuelto también para esos.

---

## 6. Generar el PDF del pedido

Primero guardá el pedido para que Supabase le asigne un número único. Después,
el botón **"Descargar PDF del pedido"** genera y descarga la nota ya armada,
con las fotos incluidas. Las librerías necesarias están dentro de `vendor/` y
no se descargan desde sitios externos.

---

## 7. Dónde queda todo guardado

Los pedidos, el inventario, los movimientos de stock, los números de pedido y
los permisos se guardan en la base compartida. Los precios importados, los
matches confirmados y la copia de emergencia del pedido en curso permanecen
en el navegador usado. Para trabajar desde otra computadora sin diferencias,
importá allí la misma lista de precios hasta completar su centralización.

---

## 8. Si el catálogo cambia

Los cambios guardados desde Administración de catálogo se sincronizan con
Pedidos automáticamente. Si no aparecen, recargá la página y comprobá que
figure **Base compartida conectada**. No hace falta copiar `script.js` ni
regenerar archivos manualmente.

## 9. Diagnóstico rápido

- **No puedo entrar:** verificá el correo, usá *Olvidé mi contraseña* y abrí
  solamente el enlace más reciente.
- **El enlace venció:** pedí uno nuevo; duran 60 minutos.
- **No aparecen cambios del catálogo:** recargá y revisá la conexión.
- **No permite editar:** la cuenta puede tener rol de Solo lectura o estar
  desactivada; debe revisarlo una Propietaria.
- **Error de base compartida:** no sigas duplicando intentos. Conservá el
  pedido abierto, revisá internet y recargá cuando vuelva la conexión.
