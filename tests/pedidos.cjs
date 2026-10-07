const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

function embeddedCatalog() {
  const html = fs.readFileSync('pedidos/index.html', 'utf8');
  const match = html.match(/const CATALOGO = (\[[\s\S]*?\]);\nconst PRECIOS_BASE =/);
  assert(match, 'el catálogo de pedidos debe estar embebido');
  return JSON.parse(match[1]);
}

test('Notas de pedidos incluye todas las prendas nuevas con foto y colores', () => {
  const products = embeddedCatalog();
  for (const id of [259, 260, 261, 262, 263, 264, 265]) {
    const product = products.find(item => item.id === id);
    assert(product, `falta el producto ${id}`);
    assert(product.nombre);
    assert(product.imagenes.length > 0, `falta la foto de ${product.nombre}`);
    assert(product.colores.length > 0, `faltan los colores de ${product.nombre}`);
  }
});

test('Notas incluye las prendas infantiles creadas desde Administración con colores y curvas', () => {
  const products = embeddedCatalog();
  const expected = new Map([
    [10000, 'Clarita'],
    [10001, 'Gastón Niños'],
    [10002, 'Taft Niños'],
    [10003, 'Sirena Niñas'],
    [10004, 'Lerato Niñas'],
    [10005, 'Jirina Niñas']
  ]);
  for (const [id, name] of expected) {
    const product = products.find(item => item.id === id);
    assert(product, `falta ${name}`);
    assert.equal(product.nombre, name);
    assert(product.colores.length > 0, `faltan colores de ${name}`);
    assert(product.talles.length > 0, `faltan talles de ${name}`);
    assert(product.packaging?.rows?.length > 0, `falta curva de ${name}`);
    assert(product.imagenes.length > 0, `falta foto de ${name}`);
  }
});

test('Notas de pedidos conserva curvas y formatos de compra alternativos', () => {
  const products = embeddedCatalog();
  const product = products.find(item => item.id === 111);
  assert.equal(product.purchaseOptions.length, 2);
  assert.deepEqual(product.purchaseOptions.map(option => option.label), ['Caja por color', 'Caja surtida']);
  assert.notEqual(product.purchaseOptions[0].packaging.totalPieces, product.purchaseOptions[1].packaging.totalPieces);
});

test('los colores informativos también forman parte del PDF', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const html = fs.readFileSync('pedidos/index.html', 'utf8');
  assert.match(app, /preview-colores/);
  assert.match(app, /`Colores disponibles:\\n\$\{colores\}`/);
  assert.match(app, /`Formato de venta: \$\{it\.formatoVenta/);
  assert.match(html, /<th>Colores disponibles<\/th>/);
  assert.match(app, /class="colores-pedido"/);
});

test('Notas de pedidos sincroniza automáticamente los productos publicados desde Administración', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const html = fs.readFileSync('pedidos/index.html', 'utf8');
  assert.match(html, /\.\.\/catalog-config\.js\?v=20261007-pedidos-sync/);
  assert.match(html, /\.\.\/catalog-api\.js\?v=20261007-pedidos-sync/);
  assert.match(app, /async function sincronizarCatalogoAdministrado\(\)/);
  assert.match(app, /CATALOGO\.push\(actualizado\)/);
  assert.match(app, /await sincronizarCatalogoAdministrado\(\)/);
});

test('el buscador muestra el catálogo administrado completo, sin el límite histórico de 25 productos', () => {
  const appJs = fs.readFileSync('pedidos/app.js', 'utf8');
  const indexHtml = fs.readFileSync('pedidos/index.html', 'utf8');
  assert.match(appJs, /buscarItems\(elBuscador\.value, Math\.max\(ITEMS\.length, 1\)\)/);
  assert.match(appJs, /addEventListener\("focus", actualizarResultadosBuscador\)/);
  assert.match(appJs, /\$\{CATALOGO\.length\} productos totales/);
  assert.match(indexHtml, /app\.js\?v=20261007-infantil-colores-curvas-v4/);
});

test('al agregar una prenda la lista no tapa el cartel de colores del pedido', () => {
  const appJs = fs.readFileSync('pedidos/app.js', 'utf8');
  const limpiar = appJs.match(/function limpiarSeleccion\(\) \{([\s\S]*?)\n\}/)?.[1] || '';
  assert.doesNotMatch(limpiar, /elBuscador\.focus\(\)/);
  assert.match(appJs, /class="colores-pedido"/);
});
