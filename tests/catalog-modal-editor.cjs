const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const schema = require('../catalog-site-schema.js');

test('the product sheet editor controls real layout, gallery and curve output', () => {
  const defaults = schema.defaults().productModal;
  assert.deepEqual(defaults.parts, ['collection','title','code','price','description','video','notice','colors','sizes','curve','related','share','pdf','add']);
  assert.deepEqual(defaults.curveColumns, ['color','stock','curve','pieces']);
  assert.equal(defaults.curveFormat, 'inline');

  const settings = fs.readFileSync('admin/settings.js', 'utf8');
  const runtime = fs.readFileSync('script.js', 'utf8');
  const bridge = fs.readFileSync('catalog-site.js', 'utf8');
  for (const name of ['moveModalPart','toggleModalPart','moveCurveColumn','toggleCurveColumn','renderEmbeddedProductEditor','saveEmbeddedProduct']) {
    assert.match(settings, new RegExp(`function ${name}`));
  }
  assert.match(settings, /Una columna por talle/);
  assert.match(settings, /Guardar producto/);
  assert.match(runtime, /function applyProductModalSettings/);
  assert.match(runtime, /modal-gallery-thumbnails/);
  assert.match(runtime, /hiddenCurveColumns/);
  assert.match(runtime, /catalog-site-preview-product/);
  assert.match(bridge, /productId:modal\?\.dataset\.productId/);
});
