const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const schema=require('../catalog-site-schema.js');

test('own product data, tags and audiences have safe defaults and keep what the editor saves',()=>{
  const defaults=schema.defaults({products:[],categories:[]});
  assert.deepEqual(defaults.productFields,[]);
  assert.equal(defaults.productTags.enabled,true);
  assert.deepEqual(defaults.audiences.map(item=>item.value),['MUJER','HOMBRE','NINOS','UNISEX']);
  const saved=schema.migrate({schemaVersion:2,productFields:[{id:'tela',label:'Tela',type:'options',options:['Lino']}],audiences:[{value:'BEBES',label:'Bebés'}]});
  assert.equal(saved.productFields[0].id,'tela');
  assert.deepEqual(saved.audiences.map(item=>item.value),['BEBES']);
});

test('the editor, the admin screen and the catalog are wired together',()=>{
  const settingsHtml=fs.readFileSync('admin/settings.html','utf8'),adminHtml=fs.readFileSync('admin/index.html','utf8'),indexHtml=fs.readFileSync('index.html','utf8');
  assert.match(settingsHtml,/settings-fields\.js\?v=/);
  assert.ok(adminHtml.indexOf('products-tools.js?v=')<adminHtml.indexOf('product-fields.js?v=')&&adminHtml.indexOf('product-fields.js?v=')<adminHtml.indexOf('products-sheet.js?v='));
  assert.ok(indexHtml.indexOf('script.js?v=')<indexHtml.indexOf('catalog-data.js?v='));
  assert.match(fs.readFileSync('script.js','utf8'),/window\.CatalogData\.searchValues\(p\)/);
  const editor=fs.readFileSync('admin/settings-fields.js','utf8');
  for(const text of ['Datos propios de las prendas','Etiquetas','Públicos','＋ Agregar dato','＋ Agregar público','Usar como filtro'])assert.ok(editor.includes(text),text);
  const admin=fs.readFileSync('admin/product-fields.js','utf8');
  for(const text of ['Más datos','Agregar etiqueta…','Quitar etiqueta…','Completar un dato…'])assert.ok(admin.includes(text),text);
});

test('product values are cleaned before saving and empty values are removed',()=>{
  const source=fs.readFileSync('admin/product-fields.js','utf8');
  const sandbox={records:new Map(),openEditor:async()=>{},api:{getSiteSettings:async()=>({})},document:{getElementById:()=>null,querySelector:()=>null,createElement:()=>({append(){},set textContent(v){}})},window:{}};
  new Function(...Object.keys(sandbox),source.replace('  load();\n',''))(...Object.values(sandbox));
  const tools=sandbox.window.ProductFields,p={};
  tools.setField(p,{id:'tela',type:'text'},'  Lino <b> ');assert.deepEqual(p.fields,{tela:'Lino b'});
  tools.setField(p,{id:'largo',type:'number'},'12,5');assert.equal(p.fields.largo,12.5);
  tools.setField(p,{id:'promo',type:'yesno'},'si');assert.equal(p.fields.promo,true);
  tools.setField(p,{id:'tela',type:'text'},'');tools.setField(p,{id:'largo',type:'number'},'');tools.setField(p,{id:'promo',type:'yesno'},'');
  assert.equal('fields' in p,false);
  tools.setTags(p,[' Oferta','Oferta','"x"','']);assert.deepEqual(p.tags,['Oferta','x']);
});
