const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const site=fs.readFileSync('catalog-site.js','utf8');
const mobile=fs.readFileSync('admin/settings-mobile.js','utf8');
const elements=fs.readFileSync('admin/settings-elements.js','utf8');
const html=fs.readFileSync('admin/settings.html','utf8');
const css=fs.readFileSync('admin/editor-polish.css','utf8');

function elementCss(styles){
  const source=site.slice(site.indexOf('  function applyElementStyles'),site.indexOf('  function apply(raw'));
  const node={};global.document={head:{append(){}},getElementById:()=>null,createElement:()=>node};
  new Function(`${source};return applyElementStyles;`)()({elementStyles:styles},{preview:false});
  return node.textContent;
}

test('each element can be shown only on computer or only on phone, with its own phone size',()=>{
  const out=elementCss({'header.tagline':{showOn:'desktop'},'card.name':{fontSize:20,fontSizeMobile:14},'card.code':{showOn:'mobile'}});
  assert.match(out,/@media\(max-width:768px\)\{\[data-edit-id="header\.tagline"\]\{display:none!important\}\}/);
  assert.match(out,/@media\(min-width:769px\)\{\[data-edit-id="card\.code"\]\{display:none!important\}\}/);
  assert.match(out,/@media\(max-width:768px\)\{\[data-edit-id="card\.name"\]\[data-edit-id="card\.name"\]\{font-size:14px!important\}\}/);
  assert.match(elements,/'Dónde se ve'/);
  assert.match(elements,/'Tamaño de letra en celular'/);
});

test('the phone editor reaches every screen and section through "Más"',()=>{
  assert.match(html,/settings-mobile\.js\?v=[^"]+/);
  assert.ok(html.indexOf('settings-mobile.js')>html.indexOf('settings-elements.js'));
  for(const text of ['Ficha de producto','Filtros abiertos','Pedido con prendas','Colores y letras','Todos los textos','Orden de prendas','Categorías','Historial','Rehacer','Modo navegar'])assert.ok(mobile.includes(text),text);
  assert.match(mobile,/dataset\.mobileAction='more'/);
  assert.match(css,/grid-template-columns:repeat\(5,1fr\)/);
  assert.match(mobile,/if\(isPhone\(\)\)setSheetState\('half'\)/);
});

test('search finds options in every section by whole-word starts, ignoring filler words',()=>{
  assert.match(mobile,/const indexedLayers=\[/);
  assert.match(mobile,/stopWords=new Set\(\['de','del'/);
  assert.match(mobile,/word\.startsWith\(term\)/);
  assert.doesNotMatch(mobile,/entry\.text\.includes\(word\)/);
  assert.match(mobile,/carrito:'pedido'/);
  assert.match(mobile,/search-flash/);
});
