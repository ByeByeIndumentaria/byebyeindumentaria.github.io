const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('floating WhatsApp has working destination, message, position and device controls',()=>{
  const schema=fs.readFileSync('catalog-site-schema.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),admin=fs.readFileSync('admin/settings.js','utf8'),css=fs.readFileSync('style.css','utf8');
  for(const path of ['whatsapp.floating','whatsapp.floatingLabel','whatsapp.floatingMessage','whatsapp.floatingPosition','whatsapp.floatingDesktop','whatsapp.floatingMobile','whatsapp.floatingColor','whatsapp.floatingTextColor'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(schema,/floating:false,floatingLabel:'Escribinos'/);
  assert.match(site,/function applyFloatingWhatsapp/);
  assert.match(site,/https:\/\/wa\.me\/\$\{number\}\?text=\$\{encodeURIComponent/);
  assert.match(site,/config\.floating!==true\|\|!number/);
  assert.match(css,/\.floating-whatsapp/);
  assert.match(css,/data-mobile="false"/);
  assert.match(css,/data-desktop="false"/);
});

test('floating WhatsApp stays absent until enabled with a destination number',()=>{
  const schema=require('../catalog-site-schema.js'),site=fs.readFileSync('catalog-site.js','utf8'),defaults=schema.defaults();
  assert.equal(defaults.whatsapp.number,'');
  assert.equal(defaults.whatsapp.floating,false);
  assert.match(site,/if\(config\.floating!==true\|\|!number\)return/);
});
