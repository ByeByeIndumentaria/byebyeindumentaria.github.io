const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const site=fs.readFileSync('catalog-site.js','utf8');
const schema=require('../catalog-site-schema.js');
const elements=fs.readFileSync('admin/settings-elements.js','utf8');
const html=fs.readFileSync('admin/settings.html','utf8');
const publicHtml=fs.readFileSync('index.html','utf8');

function applyElementStylesFromSite(){
  const source=site.slice(site.indexOf('  function applyElementStyles'),site.indexOf('  function apply(raw'));
  const node={};
  global.document={head:{append(){}},getElementById:()=>null,createElement:()=>node};
  const apply=new Function(`${source};return applyElementStyles;`)();
  return settings=>{apply(settings,{preview:false});return node.textContent;};
}

test('every element can carry its own style and the published catalog applies it',()=>{
  assert.deepEqual(schema.defaults().elementStyles,{});
  assert.match(site,/applyElementStyles\(settings,\{preview\}\)/);
  const css=applyElementStylesFromSite()({elementStyles:{'cart.whatsappButton':{background:'#25d366',color:'#ffffff',radius:8,fontSize:16,fontWeight:'bold',textTransform:'upper'},'card.code':{hidden:true}}});
  assert.match(css,/\[data-edit-id="cart\.whatsappButton"\]\[data-edit-id="cart\.whatsappButton"\]\{[^}]*background:#25d366!important/);
  assert.match(css,/font-size:16px!important/);
  assert.match(css,/font-weight:700!important/);
  assert.match(css,/text-transform:uppercase!important/);
  assert.match(css,/border-radius:8px!important/);
  assert.match(css,/\[data-edit-id="card\.code"\]\{display:none!important\}/);
});

test('element styles reject anything that is not a safe value',()=>{
  const css=applyElementStylesFromSite()({elementStyles:{'x";}body{':{color:'#fff'},'ok':{color:'red;}body{display:none',fontSize:'9999',textTransform:'evil',background:'url(x)'}}});
  assert.doesNotMatch(css,/body/);
  assert.doesNotMatch(css,/url\(/);
  assert.match(css,/font-size:96px/);
  assert.doesNotMatch(css,/evil/);
});

test('tapping a name or a flyer title selects that element, not the whole card or flyer',()=>{
  assert.doesNotMatch(site,/target:null\};card\.setPointerCapture/);
  assert.doesNotMatch(site,/moved:false\};slide\.setPointerCapture/);
  assert.match(site,/if\(!cardDrag\.moved\)cardDrag\.card\.setPointerCapture/);
  assert.match(site,/if\(!heroDrag\.moved\)heroDrag\.slide\.setPointerCapture/);
  assert.match(site,/card=target\.closest\('\.product-card'\)/);
  assert.match(site,/styles:computed\?\{color:computed\.color/);
});

test('the editor offers an element panel, product editing and short separate panels',()=>{
  assert.match(html,/<script src="settings-elements\.js\?v=[^"]+"><\/script>/);
  assert.ok(html.indexOf('settings-elements.js')>html.indexOf('settings.js?v='));
  for(const text of ['Color de letra','Color del botón','Color del borde','Tamaño de letra','Grosor','Mayúsculas','Alineación','Esquinas redondeadas','Mostrar este elemento','Restaurar este elemento como estaba','Editar la prenda'])assert.ok(elements.includes(text),text);
  for(const layer of ['grid','card','cart','footer','pricing','colors','product'])assert.match(elements,new RegExp(`renderers\\.${layer}=`));
  assert.match(elements,/'cart\.whatsappButton':'cart\.showWhatsapp'/);
  assert.match(elements,/field\('Nombre','name'\)/);
  assert.match(elements,/field\('Código','orderNumber'\)/);
  assert.match(elements,/function restoreSection/);
});

test('opening a section takes the preview there and lost preview-ready signals are recovered',()=>{
  assert.match(elements,/type:'catalog-site-highlight',id,scroll:true/);
  assert.match(site,/if\(event\.data\.scroll\)/);
  assert.match(elements,/function catchUpPreview|const catchUpPreview/);
  assert.match(elements,/addEventListener\('beforeunload'/);
});

test('public catalog loads the new site script',()=>{
  assert.match(publicHtml,/catalog-site\.js\?v=20261119-etapa6/);
  assert.match(publicHtml,/catalog-site-schema\.js\?v=20261119-etapa2/);
});

test('turning off "Mostrar botón del pedido" really hides the cart button',()=>{
  const css=fs.readFileSync('style.css','utf8');
  assert.match(css,/\.cart-btn\[hidden\]\{display:none!important\}/);
  assert.match(site,/toggle\.hidden=!enabled\|\|settings\.header\.showCart===false/);
});
