const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('color, size, packing and availability filters use real product data',()=>{
  const schema=require('../catalog-site-schema.js'),admin=fs.readFileSync('admin/settings.js','utf8'),html=fs.readFileSync('index.html','utf8'),script=fs.readFileSync('script.js','utf8'),css=fs.readFileSync('style.css','utf8');
  const extra=schema.defaults().filtersPanel.extraFilters;
  assert.deepEqual(extra,{color:false,size:false,packing:false,availability:false});
  for(const id of ['color-filter-group','size-filter-group','packing-filter-group','availability-filter-group'])assert.match(html,new RegExp(`id="${id}" hidden`));
  for(const path of ['filtersPanel.extraFilters.color','filtersPanel.extraFilters.size','filtersPanel.extraFilters.packing','filtersPanel.extraFilters.availability'])assert.match(admin,new RegExp(path.replaceAll('.','\\.')));
  assert.match(script,/function productExtraFilterValues/);
  assert.match(script,/function buildExtraFilters/);
  assert.match(script,/function productMatchesExtraFilters/);
  assert.match(script,/productMatchesExtraFilters\(p\)/);
  assert.match(script,/data-extra-filter/);
  assert.match(css,/\.extra-filter-group\[hidden\]/);
});

test('extra filters stay absent with the current default design',()=>{
  const script=fs.readFileSync('script.js','utf8');
  assert.match(script,/enabled:config\.color===true/);
  assert.match(script,/group\.hidden=!definition\.enabled/);
});
