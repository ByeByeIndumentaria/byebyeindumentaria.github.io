const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

function loadFrames(){
  const window={};
  new Function('window',fs.readFileSync('admin/photo-frame.js','utf8'))(window);
  return window.PhotoFrames;
}

test('a photo frame is stored per photo, validated and removable without touching the photo itself',()=>{
  const frames=loadFrames(),product={gallery:{sources:['a.jpg','b.jpg']}};
  frames.set(product,'a.jpg',{zoom:2.34567,x:120,y:-5});
  assert.deepEqual(product.photoFrames,[{src:'a.jpg',zoom:2.346,x:100,y:0}]);
  assert.deepEqual(product.gallery.sources,['a.jpg','b.jpg']);
  frames.set(product,'a.jpg',{zoom:1.5,x:40,y:30});
  assert.equal(product.photoFrames.length,1);
  assert.equal(frames.get(product,'a.jpg').zoom,1.5);
  assert.equal(frames.get(product,'b.jpg'),null);
  frames.set(product,'a.jpg',null);
  assert.equal('photoFrames' in product,false);
  assert.equal(frames.valid({zoom:'x',x:1,y:1}),null);
});

test('new uploads keep their frame and frames of removed photos are dropped on save',()=>{
  const frames=loadFrames(),product={gallery:{sources:['https://x/new.jpg']},purchaseOptions:[{gallery:{sources:['opt.jpg']}}]};
  product.photoFrames=[{src:'pending:1',zoom:2,x:50,y:50},{src:'gone.jpg',zoom:2,x:50,y:50},{src:'opt.jpg',zoom:1.2,x:50,y:50}];
  frames.remap(product,'pending:1','https://x/new.jpg');
  frames.prune(product);
  assert.deepEqual(product.photoFrames.map(item=>item.src),['https://x/new.jpg','opt.jpg']);
});

test('both admin screens offer Encuadrar, and the catalog draws the frame on grid photos',()=>{
  const index=fs.readFileSync('admin/index.html','utf8'),visual=fs.readFileSync('admin/settings.html','utf8'),site=fs.readFileSync('catalog-site.js','utf8');
  for(const page of [index,visual]){assert.match(page,/photo-frame\.js\?v=/);assert.match(page,/photo-tools\.js\?v=/);assert.match(page,/photo-frame\.css\?v=/);}
  assert.ok(index.indexOf('photo-frame.js')<index.indexOf('admin.js?'));
  assert.match(fs.readFileSync('admin/photo-tools.js','utf8'),/'Encuadrar'/);
  assert.match(fs.readFileSync('admin/admin.js','utf8'),/PhotoFrames\?\.remap\(payload,key,photo\.remoteUrl\)/);
  assert.match(fs.readFileSync('admin/settings.js','utf8'),/PhotoFrames\?\.prune\(payload\)/);
  assert.match(site,/photoFrames/);
  assert.match(site,/setProperty\('scale'/);
});
