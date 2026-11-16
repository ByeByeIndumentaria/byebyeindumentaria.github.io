const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('every product card control changes the rendered catalog',()=>{
  const admin=fs.readFileSync('admin/settings.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  for(const path of ['card.showGender','card.showPreorder','card.showStock','card.showCategory','card.showName','card.showCode','card.showAdd','card.addAlwaysVisible','card.outOfStockOpacity'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(site,/function applyCard\(settings\)/);
  for(const [flag,path] of [['Gender','showGender'],['Preorder','showPreorder'],['Stock','showStock'],['Category','showCategory'],['Name','showName'],['Code','showCode'],['Add','showAdd'],['AddAlways','addAlwaysVisible']])assert.match(site,new RegExp(`${flag}:card\\.${path}`));
  assert.match(site,/dataset\[`cardShow\$\{name\}`\]/);
  for(const selector of ['card-show-gender','card-show-preorder','card-show-stock','card-show-category','card-show-name','card-show-code','card-show-add','card-show-add-always'])assert.match(css,new RegExp(selector));
  assert.match(site,/--card-out-of-stock-opacity/);
  assert.match(css,/var\(--card-out-of-stock-opacity,.58\)/);
});
