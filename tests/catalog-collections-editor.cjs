const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('collection opening, remembering, all-catalog and visible tabs are real settings',()=>{
  const admin=fs.readFileSync('admin/settings.js','utf8'),catalog=fs.readFileSync('script.js','utf8'),css=fs.readFileSync('style.css','utf8');
  for(const path of ['collectionsConfig.initial','behavior.restoreView','collectionsConfig.showAll','collectionsConfig.allLabel','collectionsConfig.showTabs'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(catalog,/function getInitialCollectionId\(\)/);
  assert.match(catalog,/behavior\?\.restoreView === true/);
  assert.doesNotMatch(catalog,/productSearchQuery = savedCatalog\.search/,'la búsqueda no se recuerda al volver');
  assert.match(catalog,/config\.showAll===true/);
  assert.match(catalog,/catalog-collection-tabs/);
  assert.match(catalog,/activeCollection = getInitialCollectionId\(\)/);
  assert.match(css,/\.catalog-collection-tabs/);
});
