'use strict';
const $=id=>document.getElementById(id), api=window.CatalogAPI, model=window.CatalogModel;
const preview=new URLSearchParams(location.search).has('preview');
const clone=value=>JSON.parse(JSON.stringify(value));
const asset=src=>src?new URL(src, new URL('../',location.href)).href:'';
let seed, records=new Map(), editing=null, editingId=null, version=0, dirty=false, busy=false, uploads=0;
let pendingPhotos=new Map(), currentGroup=0, savedPackaging=new Map(), galleryDirty=false;
function el(tag,text,className){const e=document.createElement(tag);if(text!=null)e.textContent=text;if(className)e.className=className;return e;}
function notice(text){$('notice').textContent=text;}
function message(error){$('save-status').textContent=error.message||String(error);}
function group(){return editing.purchaseOptions?.length?editing.purchaseOptions[currentGroup]:editing;}
function selectOptions(select,values){select.replaceChildren(...values.map(([value,label])=>{const o=el('option',label);o.value=value;return o;}));}
function galleryFor(p){return p.gallery||{sources:[],colorGalleryIndexByNormalizedColor:{}};}
function colorPhoto(p,color){const g=galleryFor(p);const n=model.normalize(color);const idx=g.colorGalleryIndexByNormalizedColor?.[n];if(idx!=null)return g.sources[idx];const match=Object.entries(g.colorMap||{}).find(([c])=>model.normalize(c)===n);if(match){const i=(g.photoNumbers||[]).indexOf(Number(match[1]));if(i>=0)return g.sources[i];}return '';}
function removeColorPhoto(p,color){
  const g=p.gallery;if(!g)return;
  for(const key of Object.keys(g.colorGalleryIndexByNormalizedColor||{}))if(model.normalize(key)===model.normalize(color))delete g.colorGalleryIndexByNormalizedColor[key];
  for(const key of Object.keys(g.colorMap||{}))if(model.normalize(key)===model.normalize(color))delete g.colorMap[key];
}
function normalizeGallery(p){
  const g=p.gallery||={sources:[],colorGalleryIndexByNormalizedColor:{}},mapped={...(g.colorGalleryIndexByNormalizedColor||{})};
  for(const color of p.colors||[]){const key=model.normalize(color);if(mapped[key]!=null)continue;const src=colorPhoto(p,color),index=g.sources.indexOf(src);if(index>=0)mapped[key]=index;}
  g.colorGalleryIndexByNormalizedColor=mapped;delete g.colorMap;delete g.photoNumbers;return g;
}
function photoSrc(src){const pending=pendingPhotos.get(src);return pending?.url||(src?asset(src):'');}
function remapGallery(g,previous){g.colorGalleryIndexByNormalizedColor=Object.fromEntries(Object.entries(previous).map(([color,src])=>[color,g.sources.indexOf(src)]).filter(([,index])=>index>=0));}
function galleryAssignments(g){return Object.fromEntries(Object.entries(g.colorGalleryIndexByNormalizedColor||{}).map(([color,index])=>[color,g.sources[index]]).filter(([,src])=>src));}
function resetPhotos(){for(const v of pendingPhotos.values())URL.revokeObjectURL(v.url);pendingPhotos.clear();}
async function loadRecords(){
  const next=new Map(seed.products.map(p=>[p.id,{id:p.id,payload:p,version:0}]));
  if(api.configured&&!preview){for(const r of await api.list())next.set(Number(r.id),r);}
  records=next;renderCards();
}
function renderCards(){
  const q=model.normalize($('search').value),collection=$('collection-filter').value;
  const list=[...records.values()].filter(r=>(!collection||(r.payload.collections||[r.payload.collection]).includes(collection))&&model.normalize(r.payload.name+' '+(r.payload.orderNumber||'')).includes(q));
  $('count').textContent=`${list.length} productos`;
  $('products').replaceChildren();
  for(const r of list){const p=r.payload,card=el('article',null,'card'),img=el('img');img.loading='lazy';img.alt=p.name;
    const src=galleryFor(p).sources[0];if(src)img.src=asset(src);else img.alt='Sin foto · '+p.name;
    const body=el('div',null,'card-info');body.append(el('span',p.isHidden?'Oculto':p.inStock===false?'Sin stock':p.subcategory,'badge'),el('h3',p.name),el('p',p.orderNumber||'Sin código'),el('p',`${p.colors.length} colores · ${p.packaging||p.purchaseOptions?.length?'Curva cargada':'Curva pendiente'}`));
    const actions=el('div',null,'actions');for(const [label,curve] of [['Editar',false],['Editar curva',true]]){const b=el('button',label);b.onclick=()=>openEditor(r.id,curve);actions.append(b);}body.append(actions);card.append(img,body);$('products').append(card);
  }
}
async function openEditor(id,curve=false){
  if(id!=null&&api.configured&&!preview){
    try{const [latest]=await api.getProducts([Number(id)]);if(latest)records.set(Number(id),latest);}
    catch(e){notice('No se pudo cargar la última versión. '+e.message);return;}
  }
  resetPhotos();savedPackaging.clear();currentGroup=0;galleryDirty=false;editingId=id;version=id==null?0:records.get(id).version;
  editing=id==null?{name:'',orderNumber:'',category:'MUJER',subcategory:'Camperas',collection:'produccion-invierno-2027',colors:[],sizes:[],packaging:{rows:[]},inStock:true,description:'',gallery:{sources:[],colorGalleryIndexByNormalizedColor:{}},preserveProductName:true,preserveCatalogColors:true}:clone(records.get(id).payload);
  normalizeGallery(editing);
  dirty=false;$('save-status').textContent='';$('editor-title').textContent=id==null?'Agregar producto':editing.name;$('save').textContent=preview?'Vista previa · sin publicar':id==null?'Publicar producto':'Guardar cambios';$('save').disabled=preview;
  for(const [input,key] of [['name','name'],['code','orderNumber'],['collection','collection'],['gender','category'],['subcategory','subcategory'],['description','description']])$(input).value=editing[key]||'';
  $('stock').checked=editing.inStock!==false;
  const hasOptions=!!editing.purchaseOptions?.length;$('option-label').hidden=!hasOptions;$('variants-note').hidden=!hasOptions;
  $('new-color').disabled=hasOptions;$('add-color').disabled=hasOptions;
  if(hasOptions)selectOptions($('option'),editing.purchaseOptions.map((o,i)=>[String(i),o.label]));
  renderColors();renderPhotos();renderCurve();$('editor').showModal();if(curve)$('curve-section').scrollIntoView({block:'start'});
}
function closeEditor(){if(busy||uploads)return;if(dirty&&!confirm('¿Cerrar sin guardar los cambios?'))return;$('editor').close();resetPhotos();editing=null;dirty=false;}
function renderColors(){
  $('colors').replaceChildren();
  for(const color of editing.colors){const row=el('div',null,'color-row'),src=colorPhoto(editing,color),img=el('img');img.alt=src?'Foto vinculada a '+color:'Sin foto vinculada';if(src)img.src=photoSrc(src);
    const title=el('strong',color,'color-name'),status=el('span',src?'Foto vinculada':'Sin foto vinculada','color-photo-status');row.append(img,title,status);
    if(!editing.purchaseOptions?.length){const remove=el('button','Quitar');remove.type='button';remove.onclick=()=>{if(!confirm('¿Quitar el color '+color+' y su curva?'))return;removeColorPhoto(editing,color);editing.colors=editing.colors.filter(c=>c!==color);if(editing.packaging)editing.packaging.rows=editing.packaging.rows.filter(r=>r.color!==color);galleryDirty=true;dirty=true;renderColors();renderPhotos();renderCurve();};row.append(remove);}
    $('colors').append(row);
  }
}
function addPhotos(files){
  for(const file of files){if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){message('Cada foto debe ser JPG, PNG o WebP y pesar hasta 5 MB.');continue;}const key='pending:'+crypto.randomUUID();pendingPhotos.set(key,{blob:file,url:URL.createObjectURL(file),name:file.name});normalizeGallery(editing).sources.push(key);galleryDirty=true;dirty=true;}
  $('add-photos').value='';renderPhotos();renderColors();if(pendingPhotos.size)$('save-status').textContent=`${pendingPhotos.size} foto${pendingPhotos.size===1?'':'s'} lista${pendingPhotos.size===1?'':'s'} para publicar, sin optimizar.`;
}
function renderPhotos(){
  const list=$('photos'),g=normalizeGallery(editing);list.replaceChildren();
  if(!g.sources.length){list.append(el('p','Todavía no hay fotos. Podés publicar el producto y agregarlas después.','empty-photos'));return;}
  g.sources.forEach((src,index)=>{const card=el('article',null,'photo-item'),img=el('img');img.src=photoSrc(src);img.alt=`Foto ${index+1} de ${editing.name||'producto'}`;const info=el('div',null,'photo-info');info.append(el('strong',`Foto ${index+1}`));const select=el('select');select.setAttribute('aria-label',`Color de la foto ${index+1}`);select.append(new Option('Sin vincular a un color',''));
    for(const color of editing.colors)select.append(new Option(color,model.normalize(color)));const assigned=Object.entries(g.colorGalleryIndexByNormalizedColor||{}).find(([,photoIndex])=>photoIndex===index);select.value=assigned?.[0]||'';select.onchange=()=>{for(const key of Object.keys(g.colorGalleryIndexByNormalizedColor||{}))if(g.colorGalleryIndexByNormalizedColor[key]===index||key===select.value)delete g.colorGalleryIndexByNormalizedColor[key];if(select.value)g.colorGalleryIndexByNormalizedColor[select.value]=index;galleryDirty=true;dirty=true;renderColors();renderPhotos();};info.append(el('label','Vincular con un color (opcional)'));info.lastChild.append(select);
    const controls=el('div',null,'photo-actions'),up=el('button','←'),down=el('button','→'),remove=el('button','Quitar');up.type=down.type=remove.type='button';up.title='Mover antes';down.title='Mover después';up.disabled=index===0;down.disabled=index===g.sources.length-1;up.onclick=()=>movePhoto(index,index-1);down.onclick=()=>movePhoto(index,index+1);remove.onclick=()=>removePhoto(index);controls.append(up,down,remove);card.append(img,info,controls);list.append(card);});
}
function movePhoto(from,to){const g=normalizeGallery(editing),mapped=galleryAssignments(g),[src]=g.sources.splice(from,1);g.sources.splice(to,0,src);remapGallery(g,mapped);galleryDirty=true;dirty=true;renderPhotos();renderColors();}
function removePhoto(index){const g=normalizeGallery(editing),mapped=galleryAssignments(g),[src]=g.sources.splice(index,1),pending=pendingPhotos.get(src);if(pending){URL.revokeObjectURL(pending.url);pendingPhotos.delete(src);}remapGallery(g,mapped);galleryDirty=true;dirty=true;renderPhotos();renderColors();}
function syncOptionGalleries(p){
  if(!galleryDirty||!p.purchaseOptions?.length)return;const g=normalizeGallery(p),linkedBySource=new Map();for(const [color,index] of Object.entries(g.colorGalleryIndexByNormalizedColor||{})){const src=g.sources[index];if(src){const colors=linkedBySource.get(src)||[];colors.push(color);linkedBySource.set(src,colors);}}
  for(const option of p.purchaseOptions){const allowed=new Set((option.colors||[]).map(model.normalize)),sources=g.sources.filter(src=>!linkedBySource.has(src)||linkedBySource.get(src).some(color=>allowed.has(color)));option.gallery={sources,colorGalleryIndexByNormalizedColor:Object.fromEntries(Object.entries(g.colorGalleryIndexByNormalizedColor||{}).map(([color,index])=>[color,sources.indexOf(g.sources[index])]).filter(([color,index])=>allowed.has(color)&&index>=0))};}
}
function renderCurve(){
  const g=group();$('pending').checked=!g.packaging;$('curve-controls').hidden=!g.packaging;$('sizes').value=(g.sizes||[]).join(', ');
  $('curve-table').replaceChildren();if(!g.packaging)return;
  const table=el('table'),head=el('tr');head.append(el('th','Color'));for(const size of g.sizes||[])head.append(el('th',size));head.append(el('th','Total'));const thead=el('thead');thead.append(head);table.append(thead);const tbody=el('tbody');
  for(const row of g.packaging.rows){const tr=el('tr'),name=el('th',row.color);name.scope='row';if(row.curveText)name.append(el('small',' · '+row.curveText));tr.append(name);const total=el('td');
    const updateTotal=()=>{const values=(g.sizes||[]).map(s=>row.sizePieces?.[s]);total.textContent=values.length&&values.every(Number.isInteger)?values.reduce((a,b)=>a+b,0):'—';};
    for(const size of g.sizes||[]){const td=el('td'),input=el('input');input.type='number';input.min='0';input.max='9999';input.step='1';input.value=row.sizePieces?.[size]??'';input.setAttribute('aria-label',`${row.color}, talle ${size}`);
      input.oninput=()=>{row.sizePieces||={};row.sizePieces[size]=input.value===''?null:Number(input.value);delete row.curveText;delete row.pieces;dirty=true;updateTotal();};td.append(input);tr.append(td);}
    updateTotal();tr.append(total);tbody.append(tr);
  }table.append(tbody);$('curve-table').append(table);
}
function preparePayload(){
  if(group().packaging && $('sizes').value.trim() !== (group().sizes||[]).join(', ')) throw new Error('Tocá «Aplicar talles» para confirmar la nueva lista antes de guardar.');
  const p=clone(editing);for(const [input,key] of [['name','name'],['code','orderNumber'],['collection','collection'],['gender','category'],['subcategory','subcategory'],['description','description']])p[key]=$(input).value.trim();
  if(p.collection!==editing.collection)p.collections=[p.collection];if(p.subcategory!==editing.subcategory)delete p.subcategories;
  p.inStock=$('stock').checked;p.preserveProductName=true;
  const groups=p.purchaseOptions?.length?p.purchaseOptions:[p];
  if(p.purchaseOptions?.length)p.sizes=[...new Set(p.purchaseOptions.flatMap(o=>o.sizes||[]))];
  model.validate(p, editingId == null ? null : records.get(editingId).payload);
  for(const g of groups)model.recalculate(g.packaging);
  syncOptionGalleries(p);
  return p;
}
async function save(event){event.preventDefault();if(preview||busy||uploads)return;let payload;
  try{payload=preparePayload();}catch(e){message(e);return;}
  busy=true;$('save').disabled=true;$('save-status').textContent='Guardando fotos y producto…';
  try{
    for(const [key,photo] of pendingPhotos){photo.remoteUrl||=await api.upload(photo.blob);for(const target of [payload,...(payload.purchaseOptions||[])]){const g=target.gallery;if(!g)continue;g.sources=g.sources.map(src=>src===key?photo.remoteUrl:src);}}
    const result=await api.save(editingId,version,payload);records.set(Number(result.id),result);dirty=false;$('editor').close();resetPhotos();editing=null;renderCards();notice('Publicado. El catálogo de tus clientes se actualizará en unos segundos.');
  }catch(e){message(e);}finally{busy=false;$('save').disabled=preview;}
}
$('add-product').onclick=()=>openEditor(null);$('close-editor').onclick=closeEditor;$('cancel').onclick=closeEditor;
$('editor').addEventListener('cancel',e=>{e.preventDefault();closeEditor();});$('product-form').addEventListener('submit',save);
$('product-form').addEventListener('input',()=>{dirty=true;});window.addEventListener('beforeunload',e=>{if(dirty||busy){e.preventDefault();e.returnValue='';}});
$('add-photos').onchange=()=>addPhotos($('add-photos').files);
$('add-color').onclick=()=>{const color=$('new-color').value.trim();if(!color)return;if(editing.colors.some(c=>model.normalize(c)===model.normalize(color))){message('Ese color ya existe.');return;}editing.colors.push(color);if(editing.packaging)editing.packaging.rows.push({color,sizePieces:Object.fromEntries(editing.sizes.map(s=>[s,null]))});$('new-color').value='';dirty=true;renderColors();renderPhotos();renderCurve();};
$('new-color').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('add-color').click();}};
$('option').onchange=()=>{currentGroup=Number($('option').value);renderCurve();};
$('pending').onchange=()=>{const g=group();if($('pending').checked){savedPackaging.set(currentGroup,clone({packaging:g.packaging,sizes:g.sizes}));delete g.packaging;g.sizes=[];}else{const saved=savedPackaging.get(currentGroup);if(saved){g.packaging=saved.packaging;g.sizes=saved.sizes;}else{g.sizes=[];g.packaging={rows:(g.colors||editing.colors).map(color=>({color,sizePieces:{}}))};}}dirty=true;renderCurve();};
$('set-sizes').onclick=()=>{try{const g=group(),next=model.sizes($('sizes').value);if(g.sizes.some(s=>!next.includes(s))&&!confirm('Los talles quitados perderán sus cantidades. ¿Continuar?'))return;g.sizes=next;for(const row of g.packaging.rows){row.sizePieces=Object.fromEntries(next.map(s=>[s,row.sizePieces?.[s]??null]));delete row.curveText;delete row.pieces;}dirty=true;renderCurve();}catch(e){message(e);}};
$('copy-curve').onclick=()=>{try{const g=group(),first=g.packaging.rows[0];if(!first||!g.sizes.length)throw new Error('Primero agregá colores, talles y completá la primera curva.');g.sizes.forEach(s=>model.quantity(first.sizePieces[s]));for(const row of g.packaging.rows){row.sizePieces=clone(first.sizePieces);delete row.curveText;delete row.pieces;}dirty=true;renderCurve();}catch(e){message(e);}};
$('search').oninput=renderCards;$('collection-filter').onchange=renderCards;
$('login-form').onsubmit=async e=>{e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;try{await api.login($('email').value,$('password').value);$('password').value='';await showCatalog();}catch(e){notice(e.message);}finally{button.disabled=false;}};
$('logout').onclick=async()=>{await api.logout();location.reload();};
async function showCatalog(){await loadRecords();$('login').hidden=true;$('catalog').hidden=false;$('account').textContent=preview?'Vista previa':api.user?.email||'';$('logout').hidden=preview;notice(preview?'Vista previa: podés probar el formulario. Publicar está deshabilitado hasta conectar el proyecto y entrar con una cuenta autorizada.':'');}
(async()=>{try{const r=await fetch('catalog-seed.json');if(!r.ok)throw new Error('No se pudo cargar el catálogo.');seed=await r.json();const values=seed.collections.map(c=>[c.id,c.name]);selectOptions($('collection'),values);selectOptions($('collection-filter'),[['','Todas las colecciones'],...values]);$('categories').replaceChildren(...[...new Set(seed.products.map(p=>p.subcategory).filter(Boolean))].sort().map(s=>{const o=el('option');o.value=s;return o;}));
 if(preview){await showCatalog();return;}if(!api.configured){notice('El panel está preparado. Falta conectar el nuevo proyecto del catálogo.');const link=el('a','Probar el panel en vista previa');link.href='?preview=1';$('notice').append(document.createElement('br'),link);return;}if(api.user){try{await api.authorize();await showCatalog();return;}catch{}}$('login').hidden=false;
}catch(e){notice(e.message);}})();
