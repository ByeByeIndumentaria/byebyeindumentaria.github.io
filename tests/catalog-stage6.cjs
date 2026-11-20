const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const site=fs.readFileSync('catalog-site.js','utf8');
const extras=fs.readFileSync('admin/settings-extras.js','utf8');
const tools=fs.readFileSync('admin/products-tools.js','utf8');

function siteHelpers(){
  const start=site.indexOf('  const editorPreview='),end=site.indexOf('  function appendBlockContent');
  class Node{constructor(tag){this.tag=tag;this.children=[];}append(...items){this.children.push(...items);}replaceChildren(){this.children=[];}set textContent(value){this.children=[String(value)];}}
  const safeLink=value=>{if(typeof value!=='string')return'';if(/^#[\w-]+$/.test(value)||/^(?:tel:|mailto:)/i.test(value))return value;try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return'';}};
  const helpers=new Function('document','location','safeText','safeLink',`${site.slice(start,end)};return{richText,inSchedule};`)({createElement:tag=>new Node(tag)},{search:''},(value,fallback='')=>typeof value==='string'?value:fallback,safeLink);
  return{...helpers,Node};
}

test('block texts support bold, italic and safe links without HTML',()=>{
  const {richText,Node}=siteHelpers(),node=new Node('p');
  richText(node,'**Envíos** a *todo* el país [ver](https://example.com) [x](javascript:alert(1)) <b>y</b>');
  const parts=node.children.map(child=>typeof child==='string'?child:`${child.tag}:${child.children.join('')}:${child.href||''}`);
  assert.ok(parts.includes('strong:Envíos:'));
  assert.ok(parts.includes('em:todo:'));
  assert.ok(parts.includes('a:ver:https://example.com/'));
  assert.ok(!parts.some(part=>/javascript/.test(part)&&part.startsWith('a:')));
  assert.ok(parts.some(part=>part.includes('<b>y</b>')));
});

test('flyers, blocks and announcement messages respect "show from / until"',()=>{
  const {inSchedule}=siteHelpers();
  assert.equal(inSchedule({}),true);
  assert.equal(inSchedule({showFrom:'2099-01-01T09:00'}),false);
  assert.equal(inSchedule({showUntil:'2000-01-01T00:00'}),false);
  assert.equal(inSchedule({showFrom:'2020-01-01T00:00',showUntil:'2099-01-01T00:00'}),true);
  assert.match(site,/block\.hidden!==true&&\(editorPreview\|\|inSchedule\(block\)\)/);
  assert.match(site,/item\.hidden!==true&&\(editorPreview\|\|inSchedule\(item\)\)/);
  assert.match(site,/safeText\(item\.text\)&&\(preview\|\|inSchedule\(item\)\)/);
  assert.match(extras,/'Programar este flyer'/);
  assert.match(extras,/'Programar este bloque'/);
  assert.match(extras,/'Programar este mensaje'/);
});

test('texts warn when a variable like {n} is removed',()=>{
  assert.match(extras,/function checkVariables/);
  assert.match(extras,/'Volver al texto original'/);
  assert.match(extras,/schema\.DEFAULT_TEXTS/);
});

test('product screen: filters, duplicate, bulk actions and trash',()=>{
  const html=fs.readFileSync('admin/index.html','utf8');
  assert.match(html,/products-tools\.js\?v=/);
  assert.ok(html.indexOf('products-tools.js')>html.indexOf('admin.js?v='));
  for(const text of ['Todos los estados','Sin fotos','Curva pendiente','Con insignia','Nombre A–Z','Duplicar','Poner insignia…','Agregar a colección…','Quitar de colección…','Papelera (archivadas)'])assert.ok(tools.includes(text),text);
  assert.match(tools,/copy\.isHidden=true/);
  assert.match(tools,/editingId=null;version=0;/);
  assert.match(tools,/await api\.save\(id,row\.version,payload\)/);
  assert.match(tools,/quedaría sin colección/);
});
