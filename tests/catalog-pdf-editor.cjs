const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('both catalog PDFs expose real editable texts, colors and filenames',()=>{
  const schema=fs.readFileSync('catalog-site-schema.js','utf8'),admin=fs.readFileSync('admin/settings.js','utf8'),catalog=fs.readFileSync('script.js','utf8');
  for(const key of ['selectionPdf.title','selectionPdf.total','selectionPdf.page','productPdf.modelPhotos','productPdf.info','productPdf.curveTitle','productPdf.preparing']){
    assert.match(schema,new RegExp(key.replace('.','\\.')));
    assert.match(catalog,new RegExp(`catalogText\\('${key.replace('.','\\.')}'`));
  }
  for(const path of ['selectionPdf.filename','selectionPdf.headerColor','selectionPdf.accentColor','productPdf.filename','productPdf.background','productPdf.textColor','productPdf.accentColor'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(catalog,/managedPdfFilename\(selectionSettings\.filename/);
  assert.match(catalog,/managedPdfFilename\(productPdfSettings\.filename/);
});

test('pedido only exposes controls that the catalog applies',()=>{
  const admin=fs.readFileSync('admin/settings.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  for(const path of ['cart.enabled','cart.title','cart.side','cart.width','cart.showWhatsapp','cart.showPdf','cart.showClear'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  for(const removed of ['cart.customerFields','cart.notes'])assert.doesNotMatch(admin,new RegExp(removed.replace('.','\\.')));
  for(const path of ['cart.quantities','cart.maxQuantity','cart.showPieceTotals','cart.quantityLabel','cart.totalBoxesLabel','cart.totalPiecesLabel'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(admin,/whatsapp\.floating/);
  assert.match(site,/function applyFloatingWhatsapp/);
  assert.match(site,/function applyCart\(settings\)/);
  assert.match(site,/cart\.showWhatsapp===false/);
  assert.match(site,/cart\.showPdf===false/);
  assert.match(site,/cart\.showClear===false/);
  assert.match(css,/data-cart-enabled="false"/);
});
