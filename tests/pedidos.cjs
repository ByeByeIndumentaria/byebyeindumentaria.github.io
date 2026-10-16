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
  assert.match(indexHtml, /app\.js\?v=20261016-stock-informativo/);
});

test('los productos administrados siguen buscables sin mostrar un cartel especial', () => {
  const appJs = fs.readFileSync('pedidos/app.js', 'utf8');
  const indexHtml = fs.readFileSync('pedidos/index.html', 'utf8');
  assert.doesNotMatch(indexHtml, /productos-admin-recientes/);
  assert.doesNotMatch(appJs, /Agregados desde Administración/);
  assert.match(indexHtml, /"id":10002[^\n]*"nombre":"Taft Niños"/);
  assert.match(indexHtml, /"id":10005[^\n]*"nombre":"Jirina Niñas"/);
});

test('al agregar una prenda la lista no tapa el cartel de colores del pedido', () => {
  const appJs = fs.readFileSync('pedidos/app.js', 'utf8');
  const limpiar = appJs.match(/function limpiarSeleccion\(\) \{([\s\S]*?)\n\}/)?.[1] || '';
  assert.doesNotMatch(limpiar, /elBuscador\.focus\(\)/);
  assert.match(appJs, /class="colores-pedido"/);
});

test('el stock por color usa las piezas declaradas y no la proporción de talles', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const helper = app.match(/function unidadesFilaPorCaja\(fila\) \{[\s\S]*?\n\}/);
  const calculator = app.match(/function unidadesColorPorCaja\(item\) \{[\s\S]*?\n\}/);
  assert(helper && calculator);
  const unidadesColorPorCaja = Function(`${helper[0]}\n${calculator[0]}\nreturn unidadesColorPorCaja;`)();
  const cantidades = unidadesColorPorCaja({ packaging: { rows: [
    { color: 'Beige', pieces: '48 piezas por color', sizePieces: { 30: 2, 32: 2, 34: 2, 36: 1, 38: 1 } },
    { color: 'Negro', pieces: 48, sizePieces: { 30: 2, 32: 2, 34: 2, 36: 1, 38: 1 } }
  ] } });
  assert.deepEqual(cantidades, { Beige: 48, Negro: 48 });
});

test('el PDF guarda automáticamente un pedido que todavía no tiene número', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /await guardarPedidoActual\(\{ silencioso: true \}\)/);
  assert.match(app, /recuperarPedidoGuardado/);
});

test('la falta de stock avisa pero nunca bloquea la carga ni el guardado', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /La prenda se agregará igualmente al pedido/);
  assert.match(app, /stockAllocations: stockPedido\.reservadas/);
  assert.match(app, /stockShortages: stockPedido\.faltantes/);
  assert.doesNotMatch(app, /No se puede agregar esa cantidad/);
  assert.doesNotMatch(app, /No se puede guardar el pedido/);
});

test('SIN STOCK se muestra en pantalla pero no se imprime en el PDF', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /etiqueta-sin-stock">SIN STOCK/);
  const pdf = app.match(/document\.getElementById\("btn-pdf"\)[\s\S]*?\/\* ={10,}\n   IMPORTAR PRECIOS/);
  assert(pdf, 'no se encontró el generador de PDF');
  assert.doesNotMatch(pdf[0], /SIN STOCK|etiqueta-sin-stock/);
});

test('el inventario se vincula sólo si coincide el código o el nombre del producto', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /function inventarioCompatible/);
  assert.match(app, /codigosValidos\.has\(codigoInventario\)/);
  assert.match(app, /function productoIdInventarioParaOpcion/);
  assert.match(app, /productoId: productoIdInventario/);
  assert.match(app, /Se ignoró una vinculación de inventario incompatible/);
});
