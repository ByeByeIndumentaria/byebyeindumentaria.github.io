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

test('collections can be reordered from the editor or Administración and the catalog follows that order',()=>{
  const admin=fs.readFileSync('admin/admin.js','utf8'),editor=fs.readFileSync('admin/settings-content.js','utf8'),live=fs.readFileSync('catalog-live.js','utf8');
  assert.match(admin,/Renumera todas las colecciones/);assert.doesNotMatch(admin,/position:second\.position/);
  assert.match(editor,/Orden de las colecciones/);assert.match(editor,/api\.saveCollection\(row\.id/);
  assert.match(live,/sortCollections\(\);buildCollectionFilters\(\)/);assert.match(live,/r\.position\]/);
});

test('the sticky search bar only leaves room for the header when the header is sticky too',()=>{
  const css=fs.readFileSync('catalog-content.css','utf8');
  assert.match(css,/body\[data-header-sticky-desktop="false"\] \.filters-section:not\(\.site-search-not-sticky\)\{top:0\}/);
  assert.match(css,/body\[data-header-sticky-mobile="true"\] \.filters-section:not\(\.site-search-not-sticky\)\{top:var\(--header-h-mobile,52px\)\}/);
});

test('saving the collection order from the editor always sends a valid name and type',()=>{
  const editor=fs.readFileSync('admin/settings-content.js','utf8');
  assert.match(editor,/payload\.type\|\|=LEGACY_PREORDERS\.has\(row\.id\)\?'preorder':'stock'/);
  assert.match(editor,/payload\.name\|\|=/);
});

test('the garment-type filter list is rebuilt from scratch, so it never repeats',()=>{
  const script=fs.readFileSync('script.js','utf8'),start=script.indexOf('function buildCategoryFilters() {');
  assert.ok(start>0);assert.match(script.slice(start,start+300),/categoryFilters\.replaceChildren\(\);/);
});

test('kids, then sports, then accessories go to the end, in that order (editable list in Orden)',()=>{
  const script=fs.readFileSync('script.js','utf8'),schema=require('../catalog-site-schema.js');
  assert.deepEqual(schema.defaults().grid.endOrder,[{type:'audience',value:'NINOS'},{type:'collection',value:'deportivo'},{type:'collection',value:'accesorios'}]);
  const start=script.indexOf('return filteredList.sort((a, b) => {'),body=script.slice(start,script.indexOf('\n}\n',start));
  assert.ok(body.indexOf('lastDifference')>0&&body.indexOf('lastDifference')<body.indexOf('stockDifference'));
  assert.match(body,/rule\?\.type === 'audience' && product\.category === rule\.value/);
  assert.match(fs.readFileSync('admin/settings-content.js','utf8'),/Al final del catálogo, en este orden/);
});

test('in the editorial look the search bar is a single thin opaque row',()=>{
  const css=fs.readFileSync('catalog-shop.css','utf8');
  assert.match(css,/body\[data-look="editorial"\] #site-header,body\[data-look="editorial"\] \.filters-section\{background:var\(--white\)!important/);
  assert.match(css,/grid-template-columns:minmax\(0,560px\) 1fr/);
});

test('tapping the brand (BYE BYE or the logo) goes back to the top, except inside the editor',()=>{
  const content=fs.readFileSync('catalog-content.js','utf8');
  assert.match(content,/event\.target\.closest\('\.header-brand'\)/);assert.match(content,/scrollTo\(\{top:0/);assert.match(content,/if\(editor\)return;/);assert.match(content,/aria-label','Ir al inicio'/);
});

test('the page appears with its saved design instead of flashing the base design',()=>{
  const html=fs.readFileSync('index.html','utf8'),site=fs.readFileSync('catalog-site.js','utf8');
  assert.ok(html.indexOf("classList.add('site-booting')")>0&&html.indexOf("classList.add('site-booting')")<html.indexOf('style.css?v='),'se oculta antes de cargar los estilos');
  assert.match(html,/setTimeout\(function\(\)\{d\.classList\.remove\('site-booting'\);\},2500\)/);
  assert.match(site,/byebye-site-cache-v1/);assert.match(site,/if\(cachedText\)refresh\(\);else await refresh\(\);/);assert.match(site,/\}finally\{reveal\(\);\}/);
});

test('searches are not restored on reload; recent searches are suggested instead, and «Todo» is a showcase',()=>{
  const script=fs.readFileSync('script.js','utf8'),shop=fs.readFileSync('catalog-shop.js','utf8'),schema=require('../catalog-site-schema.js');
  assert.doesNotMatch(script,/productSearchQuery = savedCatalog\.search/);assert.equal(schema.defaults().behavior.restoreView,false);
  assert.match(shop,/byebye-busquedas/);assert.match(shop,/Búsquedas recientes/);
  const ids=schema.showcaseOrder([{id:1,subcategory:'A'},{id:2,subcategory:'A'},{id:3,subcategory:'B'},{id:4,subcategory:'C'},{id:5,subcategory:'B'}],{categoryOrder:['B','A','C'],hasPhoto:p=>p.id!==5});
  assert.deepEqual(ids,[3,1,4,2,5]);
  assert.match(script,/orderByCollection\['todos::\*'\]/);assert.match(fs.readFileSync('admin/settings.js','utf8'),/Mezclar tipos de prenda \(vitrina\)/);
});
