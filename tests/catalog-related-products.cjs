const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const schema=require('../catalog-site-schema.js');
const model=require('../admin/model.js');

test('related products are optional, editable and rendered from real product data',()=>{
  const defaults=schema.defaults(),html=fs.readFileSync('index.html','utf8'),script=fs.readFileSync('script.js','utf8'),settings=fs.readFileSync('admin/settings.js','utf8'),admin=fs.readFileSync('admin/admin.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.equal(defaults.relatedProducts.enabled,false);
  assert.equal(defaults.relatedProducts.mode,'category');
  assert.match(html,/id="modal-related" hidden/);
  assert.match(script,/function relatedProductsFor/);
  assert.match(script,/function productCollectionIds/);
  assert.match(script,/config\.mode==='manual'/);
  assert.match(script,/product\.relatedProductIds/);
  assert.match(script,/function renderRelatedProducts/);
  assert.match(settings,/function renderRelatedProducts/);
  assert.match(settings,/Automática por categoría/);
  assert.match(settings,/Productos relacionados manuales/);
  assert.match(admin,/function ensureRelatedProductsField/);
  assert.match(admin,/renderRelatedProductOptions/);
  assert.match(css,/\.modal-related-grid/);
});

test('direct product links and related sorting share the real collection memberships',()=>{
  const script=fs.readFileSync('script.js','utf8');
  assert.match(script,/function productCollectionIds\(product\)\{return \[\.\.\.new Set/);
  assert.match(script,/const memberships=productCollectionIds\(product\)/);
  assert.match(script,/productCollectionIds\(b\)\.includes\(activeCollection\)/);
});

test('manual related product ids are validated without changing legacy products',()=>{
  const product={name:'Campera',category:'MUJER',collection:'invierno',subcategory:'Camperas',colors:['Negro'],sizes:['S'],packingType:'mixed-colors',packaging:{rows:[{color:'Negro',sizePieces:{S:1}}]},relatedProductIds:[2,3]};
  assert.doesNotThrow(()=>model.validate(product));
  product.relatedProductIds=[2,2];
  assert.throws(()=>model.validate(product),/productos relacionados/i);
});
