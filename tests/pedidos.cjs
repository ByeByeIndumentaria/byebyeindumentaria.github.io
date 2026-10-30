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

test('Lina Plus expone sus dos cajas y la curva G1 a G3', () => {
  const product = embeddedCatalog().find(item => item.id === 192);
  assert(product);
  assert.deepEqual(product.purchaseOptions.map(option => option.label), ['Caja por color', 'Caja surtida']);
  assert.deepEqual(product.purchaseOptions[0].talles, ['G1', 'G2', 'G3']);
  assert.equal(product.purchaseOptions[0].packaging.totalPieces, 9);
  assert.equal(product.purchaseOptions[1].packaging.totalPieces, 27);
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
  assert.match(appJs, /\$\{catalogoVisible\.length\} productos totales/);
  assert.match(indexHtml, /app\.js\?v=20261030-wh3125-stock/);
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

test('el número de pedido puede ingresarse manualmente o asignarse automáticamente', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const html = fs.readFileSync('pedidos/index.html', 'utf8');
  assert.match(html, /id="f-numero" maxlength="40" autocomplete="off"/);
  assert.match(html, /Dejalo vacío para asignarlo automáticamente o ingresalo manualmente/);
  assert.match(app, /f-numero"\)\.readOnly = false/);
  assert.match(app, /pedido\.numero = await obtenerProximoNumeroPedido\(\)/);
  assert.match(app, /for \(let intento = 0; intento < 3; intento\+\+\)/);

  const helper = app.match(/function siguienteNumeroPedido\(numeros\) \{[\s\S]*?\n\}/);
  assert(helper, 'falta el generador de números de pedido');
  const siguienteNumeroPedido = Function(`${helper[0]}\nreturn siguienteNumeroPedido;`)();
  assert.equal(siguienteNumeroPedido(['0007', 'SIN-NUMERO-x', 'pedido-a', '12']), '0013');
  assert.equal(siguienteNumeroPedido([]), '0001');
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

test('las fotos de pedidos priorizan una imagen vinculada a un botón de color', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const products = embeddedCatalog();
  const chomba = products.find(product => product.id === 4);
  assert.equal(chomba.galeria.colorMap.Blanco, 6);
  assert.match(chomba.galeria.sources[5], /prod_4_6\.jpg/);
  const indice = app.match(/function indiceFotoVinculadaAColor\(galeria, color\) \{[\s\S]*?\n\}\n\nfunction imagenesPriorizadasPorColor/);
  assert(indice, 'falta el selector de foto por color');
  const indiceFotoVinculadaAColor = Function(`
    function quitarAcentos(t) { return (t || '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, ''); }
    function norm(t) { return quitarAcentos(String(t || '')).toLowerCase().trim(); }
    ${indice[0].replace(/\n\nfunction imagenesPriorizadasPorColor$/, '')}
    return indiceFotoVinculadaAColor;
  `)();
  assert.equal(indiceFotoVinculadaAColor({
    colorMap: { Beige: 6 },
    photoNumbers: [1, 2, 5, 6]
  }, 'beige'), 3);
  assert.equal(indiceFotoVinculadaAColor({
    colorGalleryIndexByNormalizedColor: { 'gris melange': 7 }
  }, 'Gris Mélange'), 7);
  assert.match(app, /galeria: opcion\?\.galeria \|\| p\.galeria \|\| null/);
  assert.match(app, /celdaFotoHTML\(imagenesPriorizadasPorColor\(it\)/);
  assert.match(app, /primeraFotoDisponible\(imagenesPriorizadasPorColor\(it\)\)/);
});

test('Invierno 2027 conserva la primera foto de la muestra en notas de pedido', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const helper = app.match(/function imagenesPriorizadasPorColor\(item\) \{[\s\S]*?\n\}/);
  assert(helper, 'falta el selector de fotos para pedidos');
  const imagenesPriorizadasPorColor = Function(`
    function norm(t) { return String(t || '').toLowerCase().trim(); }
    function indiceFotoVinculadaAColor() { return 2; }
    ${helper[0]}
    return imagenesPriorizadasPorColor;
  `)();
  const fotos = ['muestra.jpg', 'modelo.jpg', 'color.jpg'];
  assert.deepEqual(imagenesPriorizadasPorColor({
    coleccion: 'produccion-invierno-2027',
    imagenes: fotos,
    galeria: { sources: fotos }
  }), fotos);
  assert.equal(imagenesPriorizadasPorColor({
    coleccion: 'verano-2027',
    colores: ['Negro'],
    imagenes: fotos,
    galeria: { sources: fotos }
  })[0], 'color.jpg');
  assert.match(app, /coleccion: p\.coleccion \|\| ""/);
  assert.match(app, /coleccion: itemSeleccionado\.coleccion \|\| ""/);
  assert.match(fs.readFileSync('pedidos/index.html', 'utf8'), /app\.js\?v=20261030-wh3125-stock/);
});

test('WH3125 también queda disponible con curvas completas en notas de pedido', () => {
  const products = embeddedCatalog();
  const ids = [154, 155, 162, 163, 164, 172, 175, 178, 188, 190, 193, 252];
  for (const id of ids) {
    const product = products.find(item => item.id === id);
    assert(product, `falta ${id}`);
    assert.equal(product.enStock, true);
    assert.equal(product.packingType, 'mixed-colors');
    assert.equal(product.warehouseStock.source, 'WH3125.xlsx');
    assert(product.packaging?.rows?.length > 0);
    assert(product.talles.length > 0);
  }
  assert.equal(products.find(item => item.id === 178).packaging.totalPieces, 24);
  assert.equal(products.find(item => item.id === 252).packaging.totalPieces, 28);
  assert(products.find(item => item.id === 252).talles.includes('4'));
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /WH3125_STALE_CLOUD_VERSIONS = new Map\(\[\[154, 1\], \[163, 1\], \[172, 3\], \[178, 2\], \[190, 2\]\]\)/);
});

test('los precios de Invierno 2027 se cargan desde las tres listas nuevas', () => {
  const html = fs.readFileSync('pedidos/index.html', 'utf8');
  const pricesMatch = html.match(/const PRECIOS_BASE = (\[[\s\S]*?\]);\nconst PRECIOS_POR_NOMBRE =/);
  const namesMatch = html.match(/const PRECIOS_POR_NOMBRE = (\[[\s\S]*?\]);/);
  assert(pricesMatch && namesMatch, 'faltan las listas de precios embebidas');
  const prices = JSON.parse(pricesMatch[1]);
  const byCode = new Map(prices.map(item => [item.codigo, item.precio]));
  assert.equal(byCode.get('125-226'), 25.5);
  assert.equal(byCode.get('225-553'), 22);
  assert.equal(byCode.get('225-156'), 16.5);
  assert.equal(byCode.get('226-337'), 21.5);
  assert.equal(byCode.get('225-597'), 24.8);
  assert.equal(byCode.get('225-228'), 18.65);
  assert.equal(byCode.get('NB 21-51'), 6.5);
  assert.equal(byCode.get('NL0071'), 10);
  assert.equal(byCode.get('126-421'), 32.5);
  assert.equal(JSON.parse(namesMatch[1]).find(item => item.nombre === 'Ponna').precio, 20.75);

  const ponna = embeddedCatalog().find(item => item.nombre === 'Ponna');
  assert.equal(ponna.precioReferencia.precio, 20.75);
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /2026-10-29-invierno-2027/);
  assert.match(app, /PRECIOS_POR_NOMBRE_MAP\[norm\(p\.nombre\)\]/);
});

test('pedidos se mantiene alineado automáticamente con Administración', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  const products = embeddedCatalog();
  for (const id of [239, 242, 246]) {
    assert.equal(products.find(product => product.id === id)?.oculto, true);
  }
  assert.match(app, /catalogoAdministradoFingerprint/);
  assert.match(app, /setInterval\(actualizarCatalogoPedidos, 10000\)/);
  assert.match(app, /visibilitychange/);
  assert.match(app, /pedidoItems = pedidoItems\.map\(normalizarItemPedido\)/);
  assert.match(app, /if \(p\.oculto \|\| CATALOGO_ELIMINADOS\.has\(Number\(p\.id\)\)\) return/);
});
