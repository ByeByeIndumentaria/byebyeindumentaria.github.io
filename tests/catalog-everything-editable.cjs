const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('everything the customer features add can be tapped, hidden or styled in the editor',()=>{
  const shop=fs.readFileSync('catalog-shop.js','utf8');
  for(const id of ['shop.favorites','shop.gridToggle','shop.cardSwipe','shop.cardColors','shop.searchSuggest'])assert.ok(shop.includes(`'${id}'`),id);
  assert.doesNotMatch(shop,/forEach\(card=>delete card\.dataset\.shopReady\)/,'cards must not be decorated twice');
  assert.match(fs.readFileSync('catalog-content.js','utf8'),/'cart\.extraQuestions'/);
});

test('catalog parts that used to fall back to a whole section now have their own mark',()=>{
  const site=fs.readFileSync('catalog-site.js','utf8');
  for(const id of ['grid.collectionTabs','searchBar.activeChips','productModal.zoom','productModal.dots','productModal.arrows','productModal.genderBadge','productModal.categoryBadge','productModal.collection','productModal.close','toast','cart.close','cart.item','texts.cart.empty','texts.cart.emptyHint','filtersPanel.close'])assert.ok(site.includes(`'${id}'`),id);
  assert.match(site,/filtersPanel\.group\./);
});

test('hiding uses the real setting when there is one, and any mark can be hidden',()=>{
  const elements=fs.readFileSync('admin/settings-elements.js','utf8');
  for(const pair of ["'shop.cardColors':'shop.cardColors'","'grid.collectionTabs':'collectionsConfig.showTabs'","'productModal.zoom':'productModal.showZoom'","'texts.footer.back':'footer.showBack'"])assert.ok(elements.includes(pair),pair);
  assert.match(elements,/canHide=id=>!!id&&!neverHide\.has\(id\);/);
  assert.match(fs.readFileSync('admin/settings-shop.js','utf8'),/También en la tarjeta/);
});
