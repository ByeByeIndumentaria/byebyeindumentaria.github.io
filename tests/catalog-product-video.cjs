const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');

test('product videos are editable, validated and shown only when configured',()=>{
  const admin=fs.readFileSync('admin/admin.js','utf8'),model=fs.readFileSync('admin/model.js','utf8'),settings=fs.readFileSync('admin/settings.js','utf8'),html=fs.readFileSync('index.html','utf8'),script=fs.readFileSync('script.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8');
  assert.match(admin,/function ensureVideoField/);
  assert.match(admin,/p\.videoUrl=videoUrl/);
  assert.match(model,/El video debe tener un enlace https válido/);
  assert.match(settings,/Video de la prenda/);
  assert.match(settings,/product\.videoUrl=value/);
  assert.match(html,/id="modal-product-video"/);
  assert.match(script,/modalVideo\.removeAttribute\('src'\)/);
  assert.match(script,/video:'modal-product-video'/);
  assert.match(site,/productModal\.video','Video de la prenda'/);
});
