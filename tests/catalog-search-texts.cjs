const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

test('search settings expose every real searchable product field',()=>{
  const source=fs.readFileSync('script.js','utf8');
  for(const setting of ['searchName','searchCode','searchDescription','searchColors','searchCategory','searchCollection','searchPurchaseOptions'])assert.match(source,new RegExp(`searchSettings\\.${setting}`));
  assert.match(source,/searchableValues\.push\(\.\.\.\(p\.colors\|\|\[\]\)/);
  assert.match(source,/resultTemplate\.replaceAll\('\{n\}'/);
});

test('text keys containing dots stay flat and have Spanish editor labels',()=>{
  const source=fs.readFileSync('admin/settings.js','utf8');
  assert.match(source,/path\.startsWith\('texts\.'\)\?settings\?\.texts\?\.\[path\.slice\(6\)\]/);
  assert.match(source,/settings\.texts\[path\.slice\(6\)\]=value/);
  assert.match(source,/'cart\.title':'Título del pedido'/);
  assert.match(source,/const textGroups=\{filters:'Filtros'/);
});

test('schema keeps existing search behavior while allowing expanded search',()=>{
  const context={window:{}};
  vm.runInNewContext(fs.readFileSync('catalog-site-schema.js','utf8'),context);
  const search=context.window.CatalogSiteSchema.defaults().searchBar;
  assert.equal(search.searchName,true);
  assert.equal(search.searchCode,true);
  assert.equal(search.searchPurchaseOptions,true);
  assert.equal(search.searchColors,false);
  assert.equal(search.searchDescription,false);
});

test('visible catalog texts and WhatsApp use the managed dictionaries',()=>{
  const runtime=fs.readFileSync('catalog-site.js','utf8'),catalog=fs.readFileSync('script.js','utf8');
  for(const key of ['cart.title','cart.empty','cart.whatsapp','filters.collections','filters.genders','filters.categories'])assert.match(runtime,new RegExp(key.replace('.','\\.')));
  assert.match(catalog,/function catalogText/);
  assert.match(catalog,/whatsapp\?\.template/);
  assert.match(catalog,/replaceAll\('\{items\}'/);
});
