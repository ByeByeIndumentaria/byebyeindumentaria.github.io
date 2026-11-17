const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('products have optional direct links and a real share button',()=>{
  const schema=require('../catalog-site-schema.js'),admin=fs.readFileSync('admin/settings.js','utf8'),html=fs.readFileSync('index.html','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),script=fs.readFileSync('script.js','utf8'),live=fs.readFileSync('catalog-live.js','utf8');
  const defaults=schema.defaults();
  assert.equal(defaults.productModal.showShare,false);
  assert.equal(defaults.texts['modal.share'],'Compartir producto');
  assert.match(html,/id="modal-share-btn"/);
  assert.match(admin,/productModal\.showShare/);
  assert.match(admin,/Botón Compartir producto/);
  assert.match(site,/setButton\('#modal-share-btn','modal\.share'\)/);
  assert.match(script,/function productPublicUrl/);
  assert.match(script,/searchParams\.set\('p',String\(productId\)\)/);
  assert.match(script,/function openProductFromUrl/);
  assert.match(script,/async function shareCurrentProduct/);
  assert.match(script,/navigator\.share/);
  assert.match(script,/navigator\.clipboard\.writeText/);
  assert.match(live,/openProductFromUrl\(\)/);
});

test('the share button stays hidden until an editor enables it',()=>{
  const script=fs.readFileSync('script.js','utf8');
  assert.match(script,/part === 'share' && config\.showShare !== true/);
});
