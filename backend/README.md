# Activación del panel BYE BYE

El catálogo público conserva su URL en GitHub Pages. `/admin/` es el panel.
El modo `/admin/?preview=1` permite probar los formularios, pero nunca publica.

1. Crear un proyecto Supabase independiente de la aplicación de pedidos.
2. Ejecutar `catalog.sql` una vez en su SQL Editor. Crea tablas, permisos,
   guardado con control de versión y el bucket público de fotos.
3. Crear dos usuarios en Authentication > Users. Cada persona debe elegir su
   contraseña. Insertar sus UUID en `catalog_editors` (ver final del SQL).
4. Completar `catalog-config.js` con URL y clave **publishable** o **anon**.
   No poner claves secretas/service_role en archivos del sitio.
5. Publicar archivos y probar acceso, creación, edición y lectura anónima.

Los productos históricos se cargan desde `admin/catalog-seed.json`. Al editar
uno, se guarda una copia completa en la nube con el mismo ID. Las nuevas altas
reciben IDs a partir de 10000. No es necesario volver a subir las fotos antiguas.
Las opciones de compra existentes se conservan y cada curva se edita por opción.

El catálogo consulta cambios cada 10 segundos y al volver a la pestaña. Ante
un error conserva lo que ya estaba cargado y, al abrir la web, puede usar el
catálogo histórico como respaldo. Los cambios más recientes requieren conexión.

Los archivos subidos son WebP de hasta 1600 px en el lado mayor; se conserva la
proporción, sin recortar. No se sobrescriben archivos. Si falla la publicación,
se permite reintentar; pueden quedar fotos sin asociar que se limpian manualmente.

No hay borrado desde el panel ni registro público de cuentas. La tabla de
productos contiene únicamente información de catálogo pública. Las membresías
son privadas. Solo usuarios autorizados pueden guardar; los clientes no pueden
escribir ni subir fotos. Un conflicto de versión impide sobrescribir cambios
hechos por otra persona. No se implementa historial/reversión de versiones.

Verificación local: `node --test tests/catalog-admin.cjs`.

## Estado verificado el 24/09/2026

- Proyecto conectado: `fkqiqyorfbihezpjfcru` (BYE BYE Catálogo).
- La lectura pública de `catalog_products` responde HTTP 200; todavía no hay
  productos guardados en la nube. El catálogo histórico permanece en el sitio.
- La lectura anónima de `catalog_editors` está bloqueada (HTTP 401).
- Las 13 pruebas de `tests/catalog-admin.cjs` y `tests/catalog-api.cjs` pasan.
- Las dos cuentas indicadas por la propietaria existen y sus membresías en
  `catalog_editors` están verificadas.
- Pendiente: probar ingreso y guardado con una sesión de editora.
