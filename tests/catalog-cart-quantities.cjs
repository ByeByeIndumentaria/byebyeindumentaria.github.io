const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('cart quantities persist and update boxes, pieces, WhatsApp and PDF',()=>{
  const schema=require('../catalog-site-schema.js'),script=fs.readFileSync('script.js','utf8'),html=fs.readFileSync('index.html','utf8'),css=fs.readFileSync('style.css','utf8');
  const cart=schema.defaults().cart;
  assert.equal(cart.quantities,false);
  assert.equal(cart.maxQuantity,99);
  assert.match(html,/id="cart-summary"/);
  assert.match(script,/quantity: Math\.max\(1,Math\.min\(99,Number\(saved\.quantity\)\|\|1\)\)/);
  assert.match(script,/function setCartQuantity/);
  assert.match(script,/function getCartTotals/);
  assert.match(script,/cart-item-quantity/);
  assert.match(script,/replaceAll\('\{cajas\}'/);
  assert.match(script,/quantitySummary=getCartSettings\(\)\.quantities===true/);
  assert.match(css,/\.cart-item-quantity/);
  assert.match(css,/\.cart-summary/);
});

test('quantity controls remain absent with the unchanged default configuration',()=>{
  const script=fs.readFileSync('script.js','utf8');
  assert.match(script,/quantityEnabled=cartConfig\.quantities===true/);
  assert.match(script,/quantityEnabled\?'<div class="cart-item-quantity"><\/div>':''/);
  assert.match(script,/cartSummaryEl\.hidden=!enabled/);
});
