const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('customers can optionally sort the real catalog',()=>{
  const schema=require('../catalog-site-schema.js'),admin=fs.readFileSync('admin/settings.js','utf8'),html=fs.readFileSync('index.html','utf8'),script=fs.readFileSync('script.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  const grid=schema.defaults().grid;
  assert.equal(grid.customerSort,false);
  assert.equal(grid.customerSortDefault,'featured');
  assert.match(html,/id="product-sort-control" hidden/);
  for(const path of ['grid.customerSort','grid.customerSortDefault','grid.sortFeatured','grid.sortName','grid.sortCode','grid.sortStock'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(script,/function updateCustomerSortControl/);
  assert.match(script,/sortMode==='name'/);
  assert.match(script,/sortMode==='code'/);
  assert.match(script,/sortMode==='stock'/);
  assert.match(script,/productSortSelect\?\.addEventListener\('change'/);
  assert.match(site,/grid\.customerSort/);
  assert.match(css,/\.catalog-sort/);
});

test('the existing featured order remains the default',()=>{
  const script=fs.readFileSync('script.js','utf8');
  assert.match(script,/siteSettings\.grid\?\.customerSort===true\?customerProductSort:'featured'/);
  assert.match(script,/sortMode!=='featured'/);
});
