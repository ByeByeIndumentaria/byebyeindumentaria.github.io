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

test('Notas de pedidos conserva curvas y formatos de compra alternativos', () => {
  const products = embeddedCatalog();
  const product = products.find(item => item.id === 111);
  assert.equal(product.purchaseOptions.length, 2);
  assert.deepEqual(product.purchaseOptions.map(option => option.label), ['Caja por color', 'Caja surtida']);
  assert.notEqual(product.purchaseOptions[0].packaging.totalPieces, product.purchaseOptions[1].packaging.totalPieces);
});

test('los colores informativos también forman parte del PDF', () => {
  const app = fs.readFileSync('pedidos/app.js', 'utf8');
  assert.match(app, /preview-colores/);
  assert.match(app, /`Colores disponibles: \$\{colores\}`/);
  assert.match(app, /`Formato de venta: \$\{it\.formatoVenta/);
});
