const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('help is loaded on both admin screens',()=>{
  for(const page of ['admin/index.html','admin/settings.html']){const html=fs.readFileSync(page,'utf8');assert.match(html,/help\.js\?v=/);assert.match(html,/help\.css\?v=/);}
  const admin=fs.readFileSync('admin/index.html','utf8');assert.ok(admin.indexOf('products-bulk.js?v=')<admin.indexOf('help.js?v='));
});

test('every help task has steps and a place, and tasks from the other screen link there',()=>{
  const source=fs.readFileSync('admin/help.js','utf8');
  const ids=[...source.matchAll(/\{id:'([\w-]+)',page:'(admin|editor|both)',q:'([^']+)'/g)];
  assert.ok(ids.length>=30,`hay ${ids.length} tareas`);
  assert.equal(new Set(ids.map(m=>m[1])).size,ids.length,'ids repetidos');
  for(const layer of [...source.matchAll(/editorGo\('(\w+)'\)/g)].map(m=>m[1]))assert.match(fs.readFileSync('admin/settings.js','utf8')+fs.readFileSync('admin/settings-shop.js','utf8')+fs.readFileSync('admin/settings-fields.js','utf8')+fs.readFileSync('admin/settings-content.js','utf8')+fs.readFileSync('admin/settings-blocks.js','utf8'),new RegExp(`(renderers\\.${layer}=|${layer}:render)`),layer);
  assert.match(source,/#ayuda-\$\{task\.id\}/);
});

test('pending checks and design review cover the common gaps',()=>{
  const source=fs.readFileSync('admin/help.js','utf8');
  for(const id of ['sin-foto','sin-curva','sin-codigo','codigo-repetido','tipos-parecidos'])assert.ok(source.includes(`'${id}'`),id);
  for(const text of ['apunta a una página que no existe','no tiene bloques','no tiene medidas cargadas','falta el número'])assert.ok(source.includes(text),text);
  assert.match(fs.readFileSync('admin/products-tools.js','utf8'),/ProductsTools\?\.extraFilter/);
});
