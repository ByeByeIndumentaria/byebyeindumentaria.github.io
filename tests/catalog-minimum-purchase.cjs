const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('wholesale minimum and terms are real cart settings and default to no restriction',()=>{
  const defaults=schema.defaults().cart,settings=fs.readFileSync('admin/settings.js','utf8'),script=fs.readFileSync('script.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.equal(defaults.minimumBoxes,0);
  assert.equal(defaults.termsText,'');
  assert.match(settings,/function renderMinimumPurchase/);
  assert.match(settings,/Mínimo de cajas/);
  assert.match(settings,/cart\.termsText/);
  assert.match(script,/config\.minimumBoxes/);
  assert.match(script,/cart-minimum/);
  assert.match(script,/whatsapp\.disabled=belowMinimum/);
  assert.match(css,/cart-minimum\.unmet/);
});
