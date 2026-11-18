const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('maintenance mode is a real optional screen and stays disabled by default',()=>{
  const settings=fs.readFileSync('admin/settings.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.equal(schema.defaults().maintenance.enabled,false);
  assert.match(settings,/function renderMaintenance/);
  assert.match(settings,/Activar modo mantenimiento/);
  assert.match(settings,/maintenance\.returnDate/);
  assert.match(site,/function applyMaintenance/);
  assert.match(site,/maintenance-screen/);
  assert.match(site,/applyMaintenance\(settings\)/);
  assert.match(css,/\.maintenance-screen\{/);
});
