const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('the visual product editor manages photos and their color links',()=>{
  const settings=fs.readFileSync('admin/settings.js','utf8'),css=fs.readFileSync('admin/settings-modal.css','utf8'),html=fs.readFileSync('admin/settings.html','utf8');
  assert.match(settings,/embeddedPhotoUploads=new Map/);
  assert.match(settings,/optimizer\.optimize\(file\)/);
  assert.match(settings,/api\.upload\(pending\.blob\)/);
  assert.match(settings,/upload\.multiple=true/);
  assert.match(settings,/colorGalleryIndexByNormalizedColor/);
  assert.match(settings,/moveEmbeddedPhoto/);
  assert.match(settings,/removeEmbeddedPhoto/);
  assert.match(css,/\.embedded-photo-grid/);
  assert.match(html,/settings-modal\.css\?v=20261117-product-photos/);
});

test('colors edited inside the visual product editor update curves safely',()=>{
  const settings=fs.readFileSync('admin/settings.js','utf8');
  assert.match(settings,/function updateEmbeddedColors/);
  assert.match(settings,/target\.packaging\.rows=next\.map/);
  assert.match(settings,/product\.colors=\[\.\.\.new Set\(product\.purchaseOptions\.flatMap/);
  assert.match(settings,/model\.validate\(payload,record\.payload\)/);
  assert.match(settings,/Fotos, colores y curva ya están actualizados/);
});
