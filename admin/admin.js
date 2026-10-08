'use strict';
const $=id=>document.getElementById(id), api=window.CatalogAPI, model=window.CatalogModel, imageOptimizer=window.CatalogImageOptimizer;
const preview=new URLSearchParams(location.search).has('preview');
const clone=value=>JSON.parse(JSON.stringify(value));
const asset=src=>src?new URL(src, new URL('../',location.href)).href:'';
let seed, records=new Map(), editing=null, editingId=null, version=0, dirty=false, busy=false, uploads=0;
let pendingPhotos=new Map(), currentGroup=0, savedPackaging=new Map(), galleryDirty=false;
let collections=new Map(), editingCollectionId=null, collectionVersion=0, collectionBusy=false;
let photoMaintenanceBusy=false;
const legacyPreorders=new Set(['verano-2027','produccion-invierno-2027','sweaters-2027','hoodies-2027']);
function el(tag,text,className){const e=document.createElement(tag);if(text!=null)e.textContent=text;if(className)e.className=className;return e;}
function notice(text){$('notice').textContent=text;}
function message(error){$('save-status').textContent=error.message||String(error);}
function group(){return editing.purchaseOptions?.length?editing.purchaseOptions[currentGroup]:editing;}
function inferredPackingType(value=''){return /POR COLOR|SOLID COLOR/i.test(value)?'single-color':'mixed-colors';}
function optionLabel(type){return type==='single-color'?'Caja por color':'Surtido de colores';}
function normalizeOption(option,index){
  option.id||=model.optionId(option.label||`opcion-${index+1}`,editing.purchaseOptions?.map(item=>item.id).filter(Boolean)||[]);
  option.label||=optionLabel(inferredPackingType(option.sourcePacking));
  option.packingType||=inferredPackingType(option.sourcePacking||option.label);
  option.sourcePacking||=model.packingLabel(option.packingType);
  option.colors||=clone(editing.colors||[]);option.sizes||=[];
  option.packaging&&=clone(option.packaging);
  return option;
}
function colorIsInStock(color){return !(editing.outOfStockColors||[]).some(item=>model.normalize(item)===model.normalize(color));}
function setColorStock(color,inStock){
  const current=(editing.outOfStockColors||[]).filter(item=>model.normalize(item)!==model.normalize(color));
  editing.outOfStockColors=inStock?current:[...current,color];dirty=true;renderColors();
}
function syncColorAcrossOptions(color,remove=false){
  for(const option of editing.purchaseOptions||[]){
    option.colors||=[];
    if(remove){option.colors=option.colors.filter(item=>model.normalize(item)!==model.normalize(color));if(option.packaging)option.packaging.rows=option.packaging.rows.filter(row=>model.normalize(row.color)!==model.normalize(color));continue;}
    if(!option.colors.some(item=>model.normalize(item)===model.normalize(color)))option.colors.push(color);
    if(option.packaging&&!option.packaging.rows.some(row=>model.normalize(row.color)===model.normalize(color)))option.packaging.rows.push({color,sizePieces:Object.fromEntries((option.sizes||[]).map(size=>[size,null]))});
  }
}
function refreshOptionEditor(){
  const multiple=!!editing.purchaseOptions?.length;$('purchase-mode').value=multiple?'multiple':'single';$('purchase-options-editor').hidden=!multiple;$('variants-note').hidden=!multiple;
  $('packing-type').value=group().packingType||inferredPackingType(group().sourcePacking);
  if(!multiple)return;
  editing.purchaseOptions.forEach(normalizeOption);currentGroup=Math.min(currentGroup,editing.purchaseOptions.length-1);
  selectOptions($('option'),editing.purchaseOptions.map((option,index)=>[String(index),option.label]));$('option').value=String(currentGroup);
  const current=group();$('option-name').value=current.label;$('packing-type').value=current.packingType;$('remove-option').disabled=editing.purchaseOptions.length<=2;
}
function makeOption(source,type,label){
  const taken=(editing.purchaseOptions||[]).map(option=>option.id),option=clone(source);
  option.label=label;option.id=model.optionId(label,taken);option.packingType=type;option.sourcePacking=model.packingLabel(type);option.colors=clone(editing.colors);option.gallery=clone(editing.gallery||{sources:[],colorGalleryIndexByNormalizedColor:{}});
  if(option.packaging)option.packaging.rows=(editing.colors||[]).map(color=>clone(option.packaging.rows.find(row=>model.normalize(row.color)===model.normalize(color))||{color,sizePieces:Object.fromEntries((option.sizes||[]).map(size=>[size,null]))}));
  return option;
}
function enableMultipleOptions(){
  const base=clone(editing),firstType=editing.packingType||inferredPackingType(editing.sourcePacking),secondType=firstType==='single-color'?'mixed-colors':'single-color';
  delete base.purchaseOptions;const first=makeOption(base,firstType,editing.sourcePacking||optionLabel(firstType)),second=makeOption(base,secondType,optionLabel(secondType));
  editing.purchaseOptions=[first,second];currentGroup=0;dirty=true;refreshOptionEditor();renderCurve();
}
function disableMultipleOptions(){
  const selected=clone(group());editing.sizes=selected.sizes||[];editing.packaging=selected.packaging;editing.sourcePacking=selected.sourcePacking;editing.packingType=selected.packingType;delete editing.purchaseOptions;currentGroup=0;dirty=true;refreshOptionEditor();renderCurve();
}
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
function refreshCollectionControls(){
  const values=[...collections.values()].sort((a,b)=>(a.position??999)-(b.position??999)).map(r=>[r.id,r.payload.name]);
  selectOptions($('collection'),values);selectOptions($('collection-filter'),[['','Todas las colecciones'],...values]);renderCollections();
}
async function loadCollections(){
  collections=new Map(seed.collections.map((payload,position)=>[payload.id,{id:payload.id,payload:{...payload,type:payload.type||(legacyPreorders.has(payload.id)?'preorder':'stock')},position,version:0}]));
  if(api.configured&&!preview){
    try{for(const row of await api.listCollections())collections.set(row.id,row);}
    catch(error){notice('Los productos están disponibles, pero falta activar la administración de colecciones. Ejecutá la actualización SQL.');}
  }
  refreshCollectionControls();
}
function renderCollections(){
  const list=$('collections-list');list.replaceChildren();
  for(const row of [...collections.values()].sort((a,b)=>(a.position??999)-(b.position??999))){const c=row.payload,card=el('article',null,'collection-card'),kind=el('span',c.type==='preorder'?'Preventa':'Stock','collection-kind'+(c.type==='preorder'?' preorder':''));card.append(kind,el('h3',c.name),el('p',c.label||c.tagline||'Sin descripción'));const edit=el('button','Editar colección');edit.type='button';edit.onclick=()=>openCollectionEditor(row.id);card.append(edit);list.append(card);}
}
function openCollectionEditor(id=null){
  editingCollectionId=id;const row=id?collections.get(id):null;collectionVersion=row?.version||0;const c=row?.payload||{name:'',label:'',tagline:'',type:'stock'};
  $('collection-editor-title').textContent=id?'Editar colección':'Agregar colección';$('collection-name').value=c.name||'';$('collection-label').value=c.label||'';$('collection-tagline').value=c.tagline||'';
  const radio=document.querySelector(`input[name="collection-type"][value="${c.type||'stock'}"]`);if(radio)radio.checked=true;$('collection-save-status').textContent='';$('save-collection').disabled=preview;$('save-collection').textContent=preview?'Vista previa · sin publicar':'Guardar colección';$('collection-editor').showModal();
}
function closeCollectionEditor(){if(collectionBusy)return;$('collection-editor').close();editingCollectionId=null;}
async function saveCollection(event){
  event.preventDefault();if(preview||collectionBusy)return;
  const payload={name:$('collection-name').value.trim(),label:$('collection-label').value.trim(),tagline:$('collection-tagline').value.trim(),type:document.querySelector('input[name="collection-type"]:checked')?.value};
  try{model.validateCollection(payload);}catch(error){$('collection-save-status').textContent=error.message;return;}
  const id=editingCollectionId||model.collectionId(payload.name);if(!editingCollectionId&&collections.has(id)){$('collection-save-status').textContent='Ya existe una colección con ese nombre.';return;}
  payload.id=id;payload.position=editingCollectionId?(collections.get(id).position??collections.size):collections.size;collectionBusy=true;$('save-collection').disabled=true;$('collection-save-status').textContent='Guardando colección…';
  try{const result=await api.saveCollection(id,collectionVersion,payload);collections.set(result.id,result);refreshCollectionControls();$('collection-editor').close();editingCollectionId=null;notice('Colección publicada. El catálogo se actualizará en unos segundos.');}
  catch(error){$('collection-save-status').textContent=error.message;}finally{collectionBusy=false;$('save-collection').disabled=preview;}
}
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
  editing=id==null?{name:'',orderNumber:'',category:'MUJER',subcategory:'Camperas',collection:'produccion-invierno-2027',colors:[],outOfStockColors:[],sizes:[],packaging:{rows:[]},packingType:'mixed-colors',sourcePacking:'CAJA SURTIDA DE COLORES',inStock:true,description:'',gallery:{sources:[],colorGalleryIndexByNormalizedColor:{}},preserveProductName:true,preserveCatalogColors:true}:clone(records.get(id).payload);
  editing.outOfStockColors=Array.isArray(editing.outOfStockColors)?editing.outOfStockColors:[];
  editing.packingType||=inferredPackingType(editing.sourcePacking);if(editing.purchaseOptions?.length)editing.purchaseOptions.forEach(normalizeOption);
  normalizeGallery(editing);
  dirty=false;$('save-status').textContent='';$('editor-title').textContent=id==null?'Agregar producto':editing.name;$('save').textContent=preview?'Vista previa · sin publicar':id==null?'Publicar producto':'Guardar cambios';$('save').disabled=preview;
  for(const [input,key] of [['name','name'],['code','orderNumber'],['collection','collection'],['gender','category'],['subcategory','subcategory'],['description','description']])$(input).value=editing[key]||'';
  $('stock').checked=editing.inStock!==false;
  $('new-color').disabled=false;$('add-color').disabled=false;refreshOptionEditor();
  renderColors();renderPhotos();renderCurve();$('editor').showModal();if(curve)$('curve-section').scrollIntoView({block:'start'});
}
function closeEditor(){if(busy||uploads)return;if(dirty&&!confirm('¿Cerrar sin guardar los cambios?'))return;$('editor').close();resetPhotos();editing=null;dirty=false;}
function renderColors(){
  $('colors').replaceChildren();
  for(const color of editing.colors){const row=el('div',null,'color-row'),src=colorPhoto(editing,color),img=el('img');img.alt=src?'Foto vinculada a '+color:'Sin foto vinculada';if(src)img.src=photoSrc(src);
    const title=el('strong',color,'color-name'),status=el('span',src?'Foto vinculada':'Sin foto vinculada','color-photo-status'),stock=el('label',null,'color-stock-toggle'+(colorIsInStock(color)?'':' out')),checkbox=el('input');checkbox.type='checkbox';checkbox.checked=colorIsInStock(color);checkbox.setAttribute('aria-label',`${color} en stock`);checkbox.onchange=()=>setColorStock(color,checkbox.checked);stock.append(checkbox,document.createTextNode(checkbox.checked?'En stock':'Fuera de stock'));row.append(img,title,status,stock);
    const remove=el('button','Quitar');remove.type='button';remove.onclick=()=>{if(!confirm('¿Quitar el color '+color+' y sus curvas?'))return;removeColorPhoto(editing,color);editing.colors=editing.colors.filter(c=>c!==color);editing.outOfStockColors=editing.outOfStockColors.filter(c=>model.normalize(c)!==model.normalize(color));if(editing.packaging)editing.packaging.rows=editing.packaging.rows.filter(r=>r.color!==color);syncColorAcrossOptions(color,true);galleryDirty=true;dirty=true;renderColors();renderPhotos();renderCurve();};row.append(remove);
    $('colors').append(row);
  }
}
function bytes(value){return value<1024*1024?`${Math.max(1,Math.round(value/1024))} KB`:`${(value/1024/1024).toFixed(1)} MB`;}
async function addPhotos(files){
  uploads++;$('add-photos').disabled=true;$('save').disabled=true;$('save-status').textContent='Optimizando fotos…';let before=0,after=0,added=0,lastError='';
  try{
    for(const file of files){try{const result=await imageOptimizer.optimize(file);if(result.blob.size>5*1024*1024)throw new Error('La foto sigue pesando más de 5 MB después de optimizarla.');const key='pending:'+crypto.randomUUID();pendingPhotos.set(key,{blob:result.blob,url:URL.createObjectURL(result.blob),name:file.name,originalBytes:result.originalBytes});normalizeGallery(editing).sources.push(key);before+=result.originalBytes;after+=result.optimizedBytes;added++;galleryDirty=true;dirty=true;}catch(error){lastError=error.message||String(error);}}
    renderPhotos();renderColors();if(added)$('save-status').textContent=`${added} foto${added===1?'':'s'} optimizada${added===1?'':'s'} y lista${added===1?'':'s'} para publicar (${bytes(before)} → ${bytes(after)}).`;else if(lastError)message(new Error(lastError));
  }finally{uploads--;$('add-photos').value='';$('add-photos').disabled=false;$('save').disabled=preview||busy||uploads>0;}
}

function adminPhotoUrls(payload){return [...new Set([...(payload.gallery?.sources||[]),...(payload.purchaseOptions||[]).flatMap(option=>option.gallery?.sources||[])].filter(src=>String(src).includes('/storage/v1/object/public/catalog-photos/')))];}
function replacePhotoUrl(payload,from,to){for(const target of [payload,...(payload.purchaseOptions||[])])if(target.gallery)target.gallery.sources=target.gallery.sources.map(src=>src===from?to:src);}
async function optimizeExistingPhotos(){
  if(preview||photoMaintenanceBusy)return;const affected=[...records.values()].filter(row=>adminPhotoUrls(row.payload).length);const total=[...new Set(affected.flatMap(row=>adminPhotoUrls(row.payload)))].length;
  if(!total){notice('No hay fotos de Administración para optimizar.');return;}
  if(!confirm(`Se revisarán ${total} fotos de ${affected.length} productos. Sólo se reemplazarán las que queden más livianas. ¿Continuar?`))return;
  photoMaintenanceBusy=true;$('optimize-photos').disabled=true;$('add-product').disabled=true;const replacements=new Map();let reviewed=0,optimized=0,before=0,after=0;
  try{
    for(const url of [...new Set(affected.flatMap(row=>adminPhotoUrls(row.payload)))]){notice(`Optimizando fotos… ${reviewed+1} de ${total}`);const response=await fetch(url);if(!response.ok)throw new Error('No se pudo descargar una foto existente.');const original=await response.blob(),result=await imageOptimizer.optimize(original);before+=original.size;
      if(result.changed&&result.blob.type==='image/webp'&&result.blob.size<original.size*.95){const next=await api.upload(result.blob);replacements.set(url,next);after+=result.blob.size;optimized++;}else after+=original.size;reviewed++;
    }
    let saved=0;for(const row of affected){const payload=clone(row.payload);let changed=false;for(const from of adminPhotoUrls(payload)){const to=replacements.get(from);if(to){replacePhotoUrl(payload,from,to);changed=true;}}if(!changed)continue;notice(`Actualizando productos… ${saved+1}`);const result=await api.save(Number(row.id),row.version,payload);records.set(Number(result.id),result);saved++;}
    renderCards();notice(`Listo: ${optimized} fotos optimizadas en ${saved} productos (${bytes(before)} → ${bytes(after)}).`);
  }catch(error){notice(`La optimización se detuvo después de revisar ${reviewed} fotos. ${error.message||error}`);}
  finally{photoMaintenanceBusy=false;$('optimize-photos').disabled=false;$('add-product').disabled=false;}
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
  const note=el('p',g.packingType==='single-color'?'Cada fila representa una caja completa del color elegido.':'La caja combina las cantidades de todos los colores de esta opción.','curve-packaging-note');$('curve-table').append(note);
  const table=el('table'),head=el('tr');head.append(el('th','Color'));for(const size of g.sizes||[])head.append(el('th',size));head.append(el('th',g.packingType==='single-color'?'Piezas por caja':'Subtotal'));const thead=el('thead');thead.append(head);table.append(thead);const tbody=el('tbody');
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
  p.outOfStockColors=(p.outOfStockColors||[]).filter(color=>p.colors.some(item=>model.normalize(item)===model.normalize(color)));
  if(p.purchaseOptions?.length){p.sizes=[...new Set(p.purchaseOptions.flatMap(o=>o.sizes||[]))];p.packaging=clone(p.purchaseOptions[0].packaging);p.sourcePacking='';p.purchaseOptions.forEach(option=>{option.outOfStockColors=clone(p.outOfStockColors);option.sourcePacking=model.packingLabel(option.packingType);});}
  else p.sourcePacking=model.packingLabel(p.packingType);
  model.validate(p, editingId == null ? null : records.get(editingId).payload);
  for(const g of groups)model.recalculate(g.packaging,g.packingType);
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
$('add-photos').onchange=()=>addPhotos([...$('add-photos').files]);
$('add-color').onclick=()=>{const color=$('new-color').value.trim();if(!color)return;if(editing.colors.some(c=>model.normalize(c)===model.normalize(color))){message('Ese color ya existe.');return;}editing.colors.push(color);if(editing.packaging)editing.packaging.rows.push({color,sizePieces:Object.fromEntries(editing.sizes.map(s=>[s,null]))});syncColorAcrossOptions(color);$('new-color').value='';dirty=true;renderColors();renderPhotos();renderCurve();};
$('new-color').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('add-color').click();}};
$('purchase-mode').onchange=()=>{$('purchase-mode').value==='multiple'?enableMultipleOptions():disableMultipleOptions();};
$('option').onchange=()=>{currentGroup=Number($('option').value);refreshOptionEditor();renderCurve();};
$('option-name').oninput=()=>{const value=$('option-name').value.trim();if(value){group().label=value;$('option').options[currentGroup].textContent=value;dirty=true;}};
$('packing-type').onchange=()=>{const g=group();g.packingType=$('packing-type').value;g.sourcePacking=model.packingLabel(g.packingType);dirty=true;renderCurve();};
$('add-option').onclick=()=>{const source=group(),type=source.packingType==='single-color'?'mixed-colors':'single-color',next=makeOption(source,type,optionLabel(type));editing.purchaseOptions.push(next);currentGroup=editing.purchaseOptions.length-1;dirty=true;refreshOptionEditor();renderCurve();};
$('duplicate-option').onclick=()=>{const source=group(),next=makeOption(source,source.packingType,`${source.label} copia`);editing.purchaseOptions.push(next);currentGroup=editing.purchaseOptions.length-1;dirty=true;refreshOptionEditor();renderCurve();};
$('remove-option').onclick=()=>{if(editing.purchaseOptions.length<=2){message('Para usar varias opciones de compra necesitás al menos dos.');return;}editing.purchaseOptions.splice(currentGroup,1);currentGroup=Math.max(0,currentGroup-1);dirty=true;refreshOptionEditor();renderCurve();};
$('pending').onchange=()=>{const g=group();if($('pending').checked){savedPackaging.set(currentGroup,clone({packaging:g.packaging,sizes:g.sizes}));delete g.packaging;g.sizes=[];}else{const saved=savedPackaging.get(currentGroup);if(saved){g.packaging=saved.packaging;g.sizes=saved.sizes;}else{g.sizes=[];g.packaging={rows:(g.colors||editing.colors).map(color=>({color,sizePieces:{}}))};}}dirty=true;renderCurve();};
$('set-sizes').onclick=()=>{try{const g=group(),next=model.sizes($('sizes').value);if(g.sizes.some(s=>!next.includes(s))&&!confirm('Los talles quitados perderán sus cantidades. ¿Continuar?'))return;g.sizes=next;for(const row of g.packaging.rows){row.sizePieces=Object.fromEntries(next.map(s=>[s,row.sizePieces?.[s]??null]));delete row.curveText;delete row.pieces;}dirty=true;renderCurve();}catch(e){message(e);}};
$('copy-curve').onclick=()=>{try{const g=group(),first=g.packaging.rows[0];if(!first||!g.sizes.length)throw new Error('Primero agregá colores, talles y completá la primera curva.');g.sizes.forEach(s=>model.quantity(first.sizePieces[s]));for(const row of g.packaging.rows){row.sizePieces=clone(first.sizePieces);delete row.curveText;delete row.pieces;}dirty=true;renderCurve();}catch(e){message(e);}};
$('search').oninput=renderCards;$('collection-filter').onchange=renderCards;
$('optimize-photos').onclick=optimizeExistingPhotos;
$('manage-collections').onclick=()=>{$('collections-panel').hidden=!$('collections-panel').hidden;if(!$('collections-panel').hidden)$('collections-panel').scrollIntoView({behavior:'smooth',block:'start'});};
$('add-collection').onclick=()=>openCollectionEditor();$('close-collection-editor').onclick=closeCollectionEditor;$('cancel-collection').onclick=closeCollectionEditor;$('collection-form').addEventListener('submit',saveCollection);$('collection-editor').addEventListener('cancel',event=>{event.preventDefault();closeCollectionEditor();});
$('login-form').onsubmit=async e=>{e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;try{await api.login($('email').value,$('password').value);$('password').value='';await showCatalog();}catch(e){notice(e.message);}finally{button.disabled=false;}};
$('logout').onclick=async()=>{await api.logout();location.reload();};
async function showCatalog(){await loadCollections();await loadRecords();$('login').hidden=true;$('catalog').hidden=false;$('account').textContent=preview?'Vista previa':api.user?.email||'';$('logout').hidden=preview;if(preview)notice('Vista previa: podés probar los formularios. Publicar está deshabilitado hasta conectar el proyecto y entrar con una cuenta autorizada.');}
(async()=>{try{const r=await fetch('catalog-seed.json');if(!r.ok)throw new Error('No se pudo cargar el catálogo.');seed=await r.json();$('categories').replaceChildren(...[...new Set(seed.products.map(p=>p.subcategory).filter(Boolean))].sort().map(s=>{const o=el('option');o.value=s;return o;}));
 if(preview){await showCatalog();return;}if(!api.configured){notice('El panel está preparado. Falta conectar el nuevo proyecto del catálogo.');const link=el('a','Probar el panel en vista previa');link.href='?preview=1';$('notice').append(document.createElement('br'),link);return;}if(api.user){try{await api.authorize();await showCatalog();return;}catch{}}$('login').hidden=false;
}catch(e){notice(e.message);}})();
