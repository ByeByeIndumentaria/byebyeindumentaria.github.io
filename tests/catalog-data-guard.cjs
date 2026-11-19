const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

function loadGuard(products){
  const source=fs.readFileSync('admin/data-guard.js','utf8');
  const sandbox={document:{addEventListener(){}},window:{},HTMLInputElement:class{}};
  new Function('document','window','HTMLInputElement','products',source)(sandbox.document,sandbox.window,sandbox.HTMLInputElement,products);
  return sandbox.window.CatalogDataGuard;
}
const sample=[
  {subcategory:'Remeras',colors:['Gris Claro','Chocolate'],sizes:['S','M']},
  {subcategory:'Remeras, Conjuntos',colors:['Gris Claro','Negro'],sizes:['M','L']},
  {subcategory:'Pantalones',colors:['Chocolate'],purchaseOptions:[{colors:['Azul/Negro'],sizes:['XL']}]}
];

test('typing a value that already exists with other capitals or accents suggests the existing one',()=>{
  const guard=loadGuard(sample);
  assert.deepEqual(guard.suggestion('color','gris claro'),{type:'spelling',value:'gris claro',use:'Gris Claro',count:2});
  assert.equal(guard.suggestion('color','Negro'),null);
});

test('typos and singular/plural mistakes get a "¿Quisiste decir…?"',()=>{
  const guard=loadGuard(sample);
  assert.equal(guard.suggestion('category','Remera').use,'Remeras');
  assert.equal(guard.suggestion('category','Conjunto').use,'Conjuntos');
  assert.equal(guard.suggestion('color','Chocolatte').use,'Chocolate');
  assert.equal(guard.suggestion('category','Camperas').type,'new');
  assert.equal(guard.suggestion('size','XXL').type,'new');
});

test('the guard is loaded in both administration screens and never rewrites data by itself',()=>{
  const source=fs.readFileSync('admin/data-guard.js','utf8');
  assert.match(fs.readFileSync('admin/index.html','utf8'),/data-guard\.js\?v=/);
  assert.match(fs.readFileSync('admin/settings.html','utf8'),/data-guard\.js\?v=/);
  assert.doesNotMatch(source,/api\.save|saveCatalog|fetch\(/);
  assert.match(source,/Falta https:\/\/ al principio/);
});

test('color library groups spellings, has search and two-tone swatches the catalog draws',()=>{
  const data=fs.readFileSync('admin/settings-data.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8');
  assert.match(data,/renderers\.colors=/);
  assert.match(data,/Buscar entre \$\{groups\.length\} colores/);
  assert.match(data,/'second'/);
  assert.match(data,/colores están escritos de más de una forma/);
  assert.match(site,/catalog-swatch-tones/);
  assert.match(site,/linear-gradient\(135deg/);
});
