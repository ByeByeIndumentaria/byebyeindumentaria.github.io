const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('the optional welcome window is editable and disabled by default',()=>{
  const defaults=schema.defaults(),settings=fs.readFileSync('admin/settings.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.equal(defaults.welcome.enabled,false);
  assert.equal(defaults.welcome.once,true);
  assert.match(settings,/function renderWelcome/);
  assert.match(settings,/Mostrar ventana de bienvenida/);
  assert.match(settings,/imageField\('Subir imagen',settings\.welcome,'image'\)/);
  assert.match(site,/function applyWelcome/);
  assert.match(site,/applyWelcome\(settings,\{preview\}\)/);
  assert.match(site,/else if\(filters\)filters\.before\(area\);\}\}\n  let announcementTimer/);
  assert.match(site,/localStorage\.getItem\(key\)==='closed'/);
  assert.match(css,/\.welcome-overlay/);
  assert.match(css,/\.welcome-dialog/);
});
