const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('pages, menu, size guides and order questions start empty and keep what the editor saves',()=>{
  const defaults=schema.defaults({products:[],categories:[]});
  assert.deepEqual(defaults.pages,[]);assert.deepEqual(defaults.menu,{enabled:false,items:[]});assert.deepEqual(defaults.sizeTables,[]);assert.deepEqual(defaults.cart.extraQuestions,[]);
  const saved=schema.migrate({schemaVersion:2,pages:[{id:'p1',title:'Envíos',slug:'envios'}],cart:{extraQuestions:[{id:'q',label:'CUIT',required:true}]}});
  assert.equal(saved.pages[0].slug,'envios');assert.equal(saved.cart.extraQuestions[0].label,'CUIT');assert.equal(saved.cart.enabled,true);
});

test('the catalog renders product rows, pages by #pagina- links, the menu, size guides and order questions',()=>{
  const index=fs.readFileSync('index.html','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),content=fs.readFileSync('catalog-content.js','utf8');
  assert.ok(index.indexOf('catalog-data.js?v=')<index.indexOf('catalog-content.js?v='));assert.match(index,/catalog-content\.css\?v=/);
  assert.match(site,/'products'\]\.includes\(block\.type\)/);assert.match(site,/managed-block-products/);assert.match(site,/location\.startsWith\('page:'\)/);
  for(const text of ['#pagina-','← Volver al catálogo','Guía de talles','Completá: ','getCartCustomerLines'])assert.ok(content.includes(text),text);
  assert.doesNotMatch(content,/CatalogAPI|fetch\(/);
});

test('the visual editor can add pages, menu links, size guides, product rows and order questions',()=>{
  const editor=fs.readFileSync('admin/settings-content.js','utf8'),blocks=fs.readFileSync('admin/settings-blocks.js','utf8'),html=fs.readFileSync('admin/settings.html','utf8');
  assert.match(html,/settings-content\.js\?v=/);
  for(const text of ['＋ Nueva página','Mostrar el menú','＋ Agregar enlace al menú','＋ Nueva guía de talles','＋ Fila','＋ Columna','Preguntas propias del pedido','Obligatoria'])assert.ok(editor.includes(text),text);
  assert.match(blocks,/\['products','Fila de prendas'/);assert.match(blocks,/Página: /);assert.match(blocks,/Elegidas a mano \(por código\)/);
});
