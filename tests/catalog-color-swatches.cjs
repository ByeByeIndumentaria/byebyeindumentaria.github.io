const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('real color swatches are optional and use the editable color-name library',()=>{
  const settings=fs.readFileSync('admin/settings.js','utf8'),script=fs.readFileSync('script.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.equal(schema.defaults().colorSwatches.enabled,false);
  assert.match(settings,/function renderColorLibrary/);
  assert.match(settings,/Mostrar muestras de color/);
  assert.match(settings,/settings\.colorSwatches\.values\[key\]/);
  assert.match(script,/class="color-swatch"/);
  assert.match(script,/data-color-key/);
  assert.match(site,/function applyColorSwatches/);
  assert.match(site,/dataset\.colorSwatches/);
  assert.match(css,/data-color-swatches="true"/);
});
