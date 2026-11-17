const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('customer details and notes are real optional cart features',()=>{
  const schema=require('../catalog-site-schema.js'),admin=fs.readFileSync('admin/settings.js','utf8'),html=fs.readFileSync('index.html','utf8'),script=fs.readFileSync('script.js','utf8'),css=fs.readFileSync('style.css','utf8');
  const cart=schema.defaults().cart;
  assert.equal(cart.customerFields,false);
  assert.equal(cart.notes,false);
  assert.match(html,/id="cart-customer" hidden/);
  for(const path of ['cart.customerFields','cart.notes','cart.customerNameLabel','cart.customerBusinessLabel','cart.customerCityLabel','cart.customerPhoneLabel','cart.noteLabel'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(script,/CART_CUSTOMER_STORAGE_KEY/);
  assert.match(script,/function updateCartCustomerForm/);
  assert.match(script,/function getCartCustomerLines/);
  assert.match(script,/replaceAll\('\{cliente\}',customerText\)/);
  assert.match(script,/customerPdfLines=getCartCustomerLines/);
  assert.match(css,/\.cart-customer/);
});

test('customer information is not shown with the unchanged defaults',()=>{
  const script=fs.readFileSync('script.js','utf8');
  assert.match(script,/showFields=config\.customerFields===true,showNote=config\.notes===true/);
  assert.match(script,/cartCustomerEl\.hidden=!\(showFields\|\|showNote\)/);
});
