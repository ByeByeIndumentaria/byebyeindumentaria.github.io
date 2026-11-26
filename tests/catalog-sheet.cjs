const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('the products screen offers a spreadsheet view that saves each product with its version',()=>{
  const index=fs.readFileSync('admin/index.html','utf8'),sheet=fs.readFileSync('admin/products-sheet.js','utf8');
  assert.match(index,/products-sheet\.js\?v=/);
  assert.ok(index.indexOf('products-tools.js?v=')<index.indexOf('products-sheet.js?v='));
  for(const label of ['Nombre','Código','Tipo de prenda','Público','Con stock','Visible','Insignia','Precio'])assert.match(sheet,new RegExp(`'${label}'`));
  assert.match(sheet,/model\.validate\(payload,row\.payload\)/);
  assert.match(sheet,/api\.save\(id,row\.version,payload\)/);
  assert.match(sheet,/beforeunload/);
});

test('group changes cover stock, garment type, audience and prices',()=>{
  const tools=fs.readFileSync('admin/products-tools.js','utf8');
  for(const label of ['Marcar sin stock','Marcar con stock','Cambiar tipo de prenda…','Cambiar público…','Cambiar precio…'])assert.ok(tools.includes(label),label);
});

test('price rules understand percentages, amounts and fixed prices and round to hundreds',()=>{
  const source=fs.readFileSync('admin/products-tools.js','utf8');
  const start=source.indexOf('  const money='),end=source.indexOf('  function changePrices');
  const rule=new Function(`${source.slice(start,end)};return priceRule;`)();
  assert.equal(rule('+10%').apply(24500),27000);
  assert.equal(rule('-15 %').apply(20000),17000);
  assert.equal(rule('+1.500').apply(20000),21500);
  assert.equal(rule('-300').apply(200),0);
  assert.equal(rule('25000').apply(1),25000);
  assert.equal(rule('$ 18.900').apply(1),18900);
  assert.equal(rule('subir'),null);
});
