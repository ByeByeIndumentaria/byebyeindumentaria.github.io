const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('the customer features are on by default and can be switched off from the editor',()=>{
  const defaults=schema.defaults({products:[],categories:[]});
  assert.deepEqual(Object.keys(defaults.shop).sort(),['cardColors','cardSwipe','favorites','favoritesTitle','gridToggle','newBadge','newDays','newLabel','recent','recentTitle','searchSuggest'].sort());
  for(const key of ['favorites','recent','gridToggle','cardSwipe','cardColors','searchSuggest','newBadge'])assert.equal(defaults.shop[key],true);
  const migrated=schema.migrate({schemaVersion:2,shop:{favorites:false}},{products:[],categories:[]});
  assert.equal(migrated.shop.favorites,false);
  assert.equal(migrated.shop.recent,true);
  const editor=fs.readFileSync('admin/settings-shop.js','utf8');
  for(const key of ['favorites','recent','gridToggle','cardSwipe','cardColors','searchSuggest','newBadge','newDays'])assert.match(editor,new RegExp(`'shop\\.${key}'`));
});

test('the catalog loads the customer features after its main script',()=>{
  const index=fs.readFileSync('index.html','utf8');
  assert.match(index,/catalog-shop\.js\?v=/);assert.match(index,/catalog-shop\.css\?v=/);
  assert.ok(index.indexOf('script.js?v=')<index.indexOf('catalog-shop.js?v='));
  assert.ok(index.indexOf('catalog-shop.js?v=')<index.indexOf('catalog-live.js?v='));
  assert.match(fs.readFileSync('admin/settings.html','utf8'),/settings-shop\.js\?v=/);
});

test('favorites and recently viewed stay in the visitor device and never call the database',()=>{
  const shop=fs.readFileSync('catalog-shop.js','utf8');
  assert.match(shop,/localStorage\.setItem/);
  assert.doesNotMatch(shop,/CatalogAPI|fetch\(|\/rest\/v1/);
  assert.match(shop,/byebye-favoritos/);assert.match(shop,/byebye-vistos/);
  assert.match(shop,/Agregar todas al pedido/);
  assert.match(shop,/wa\.me/);
});

test('the "Nuevo" label uses the date a product was first published, and duplicates start fresh',()=>{
  const admin=fs.readFileSync('admin/admin.js','utf8'),tools=fs.readFileSync('admin/products-tools.js','utf8');
  assert.match(admin,/if\(editingId==null&&!payload\.createdAt\)payload\.createdAt=new Date\(\)\.toISOString\(\);/);
  assert.match(tools,/delete copy\.createdAt/);
  assert.match(tools,/Novedad:/);
});

test('with "stock first" the whole catalog shows every in-stock product before any out-of-stock one',()=>{
  const script=fs.readFileSync('script.js','utf8'),start=script.indexOf('return filteredList.sort((a, b) => {'),body=script.slice(start,script.indexOf('\n}\n',start));
  assert.ok(body.indexOf('stockDifference')>0&&body.indexOf('stockDifference')<body.indexOf('groupDifference'),'stock must be compared before the category groups');
  const settings=fs.readFileSync('admin/settings.js','utf8');
  assert.match(settings,/Primero todas las prendas con stock/);
  assert.match(settings,/Sin stock · se muestran al final del catálogo/);
});

test('framed photos fill their borders with the color of the photo background',()=>{
  const frame=fs.readFileSync('admin/photo-frame.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8');
  assert.match(frame,/function edgeColor/);assert.match(frame,/Color de los bordes/);assert.match(frame,/clean\.bg=/);
  assert.match(site,/setProperty\('background-color',frame\.bg\)/);
  const window={};new Function('window',frame)(window);const product={};
  window.PhotoFrames.set(product,'a.jpg',{zoom:1,x:50,y:50,bg:'#F4F4F2'});
  assert.equal(product.photoFrames[0].bg,'#f4f4f2');
  window.PhotoFrames.set(product,'a.jpg',{zoom:1,x:50,y:50,bg:'red;'});
  assert.equal('bg' in product.photoFrames[0],false);
});
