'use strict';
const $=id=>document.getElementById(id), api=window.CatalogAPI, model=window.CatalogModel;
const preview=new URLSearchParams(location.search).has('preview');
const clone=value=>JSON.parse(JSON.stringify(value));
const asset=src=>src?new URL(src, new URL('../',location.href)).href:'';
let seed, records=new Map(), editing=null, editingId=null, version=0, dirty=false, busy=false, uploads=0;
let pendingPhotos=new Map(), currentGroup=0, savedPackaging=new Map();
function el(tag,text,className){const e=document.createElement(tag);if(text!=null)e.textContent=text;if(className)e.className=className;return e;}
function notice(text){$('notice').textContent=text;}
function message(error){$('save-status').textContent=error.message||String(error);}
function group(){return editing.purchaseOptions?.length?editing.purchaseOptions[currentGroup]:editing;}
function selectOptions(select,values){select.replaceChildren(...values.map(([value,label])=>{const o=el('option',label);o.value=value;return o;}));}
function galleryFor(p){return p.gallery||{sources:[],colorGalleryIndexByNormalizedColor:{}};}
function colorPhoto(p,color){const g=galleryFor(p);const n=model.normalize(color);const idx=g.colorGalleryIndexByNormalizedColor?.[n];if(idx!=null)return g.sources[idx];const match=Object.entries(g.colorMap||{}).find(([c])=>model.normalize(c)===n);if(match){const i=(g.photoNumbers||[]).indexOf(Number(match[1]));if(i>=0)return g.sources[i];}return '';}
function removeColorPhoto(p,color){
  const g=p.gallery;if(!g)return;
  const removed=colorPhoto(p,color),otherColors=p.colors.filter(c=>c!==color);
  const otherPhotos=new Map(otherColors.map(c=>[model.normalize(c),colorPhoto(p,c)]));
  const index=g.sources.indexOf(removed);
  if(index>=0&&![...otherPhotos.values()].includes(removed)){
    g.sources.splice(index,1);if(g.photoNumbers)g.photoNumbers.splice(index,1);
  }
  g.colorGalleryIndexByNormalizedColor=Object.fromEntries([...otherPhotos].map(([c,src])=>[c,g.sources.indexOf(src)]).filter(([,i])=>i>=0));
  for(const key of Object.keys(g.colorMap||{}))if(model.normalize(key)===model.normalize(color))delete g.colorMap[key];
}
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
  resetPhotos();savedPackaging.clear();currentGroup=0;editingId=id;version=id==null?0:records.get(id).version;
  editing=id==null?{name:'',orderNumber:'',category:'MUJER',subcategory:'Camperas',collection:'produccion-invierno-2027',colors:[],sizes:[],packaging:{rows:[]},inStock:true,description:'',gallery:{sources:[],colorGalleryIndexByNormalizedColor:{}},preserveProductName:true,preserveCatalogColors:true}:clone(records.get(id).payload);
  dirty=false;$('save-status').textContent='';$('editor-title').textContent=id==null?'Agregar producto':editing.name;$('save').textContent=preview?'Vista previa · sin publicar':id==null?'Publicar producto':'Guardar cambios';$('save').disabled=preview;
  for(const [input,key] of [['name','name'],['code','orderNumber'],['collection','collection'],['gender','category'],['subcategory','subcategory'],['description','description']])$(input).value=editing[key]||'';
  $('stock').checked=editing.inStock!==false;
  const hasOptions=!!editing.purchaseOptions?.length;$('option-label').hidden=!hasOptions;$('variants-note').hidden=!hasOptions;
  $('new-color').disabled=hasOptions;$('add-color').disabled=hasOptions;
  if(hasOptions)selectOptions($('option'),editing.purchaseOptions.map((o,i)=>[String(i),o.label]));
  renderColors();renderCurve();$('editor').showModal();if(curve)$('curve-section').scrollIntoView({block:'start'});
}
function closeEditor(){if(busy||uploads)return;if(dirty&&!confirm('¿Cerrar sin guardar los cambios?'))return;$('editor').close();resetPhotos();editing=null;dirty=false;}
function renderColors(){
  $('colors').replaceChildren();
  for(const color of editing.colors){const row=el('div',null,'color-row');const img=el('img');img.alt=color;const pending=pendingPhotos.get(color);const src=pending?.url||colorPhoto(editing,color);if(src)img.src=src.startsWith('blob:')?src:asset(src);
    const title=el('strong',color,'color-name'),label=el('label','Cambiar / subir foto'),input=el('input');input.type='file';input.accept='image/png,image/jpeg,image/webp';input.setAttribute('aria-label','Foto '+color);input.onchange=()=>optimizePhoto(color,input.files[0]);label.append(input);if(pending)label.append(el('small',`Lista · ${Math.round(pending.blob.size/1024)} KB`));
    row.append(img,title,label);
    if(!editing.purchaseOptions?.length){const remove=el('button','Quitar');remove.type='button';remove.onclick=()=>{if(!confirm('¿Quitar el color '+color+' y su curva?'))return;removeColorPhoto(editing,color);editing.colors=editing.colors.filter(c=>c!==color);if(editing.packaging)editing.packaging.rows=editing.packaging.rows.filter(r=>r.color!==color);const pending=pendingPhotos.get(color);if(pending)URL.revokeObjectURL(pending.url);pendingPhotos.delete(color);dirty=true;renderColors();renderCurve();};row.append(remove);}
    $('colors').append(row);
  }
}
async function optimizePhoto(color,file){
  if(!file)return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>25*1024*1024){message('Elegí una imagen JPG, PNG o WebP de hasta 25 MB.');return;}
  uploads++;$('save').disabled=true;$('save-status').textContent='Optimizando foto…';
  try{const bitmap=await createImageBitmap(file);if(bitmap.width*bitmap.height>50000000){bitmap.close();throw new Error('La foto es demasiado grande. Usá una de menos de 50 megapíxeles.');}
    const ratio=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*ratio);canvas.height=Math.round(bitmap.height*ratio);const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.88));if(!blob||blob.type!=='image/webp'||blob.size>5242880)throw new Error('No se pudo optimizar esta foto. Probá con otra imagen.');
    const previous=pendingPhotos.get(color);if(previous)URL.revokeObjectURL(previous.url);pendingPhotos.set(color,{blob,url:URL.createObjectURL(blob)});dirty=true;renderColors();$('save-status').textContent='Foto optimizada y lista para guardar.';
  }catch(e){message(e);}finally{uploads--;$('save').disabled=preview||busy||uploads>0;}
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
  return p;
}
function installPhoto(p,color,url){
  const g=p.gallery||={sources:[],colorGalleryIndexByNormalizedColor:{}};
  const existing=colorPhoto(p,color),idx=g.sources.indexOf(existing);
  if(idx>=0){g.sources[idx]=url;}else g.sources.push(url);
  g.colorGalleryIndexByNormalizedColor||={};g.colorGalleryIndexByNormalizedColor[model.normalize(color)]=idx>=0?idx:g.sources.length-1;
}
async function save(event){event.preventDefault();if(preview||busy||uploads)return;let payload;
  try{payload=preparePayload();for(const c of payload.colors)if(!pendingPhotos.has(c)&&!colorPhoto(payload,c)&&editingId==null)throw new Error('Agregá una foto para '+c+'.');}catch(e){message(e);return;}
  busy=true;$('save').disabled=true;$('save-status').textContent='Guardando fotos y producto…';
  try{
    for(const [color,photo] of pendingPhotos){photo.remoteUrl||=await api.upload(photo.blob);installPhoto(payload,color,photo.remoteUrl);for(const o of payload.purchaseOptions||[])if(o.colors.includes(color))installPhoto(o,color,photo.remoteUrl);}
    const result=await api.save(editingId,version,payload);records.set(Number(result.id),result);dirty=false;$('editor').close();resetPhotos();editing=null;renderCards();notice('Publicado. El catálogo de tus clientes se actualizará en unos segundos.');
  }catch(e){message(e);}finally{busy=false;$('save').disabled=preview;}
}
$('add-product').onclick=()=>openEditor(null);$('close-editor').onclick=closeEditor;$('cancel').onclick=closeEditor;
$('editor').addEventListener('cancel',e=>{e.preventDefault();closeEditor();});$('product-form').addEventListener('submit',save);
$('product-form').addEventListener('input',()=>{dirty=true;});window.addEventListener('beforeunload',e=>{if(dirty||busy){e.preventDefault();e.returnValue='';}});
$('add-color').onclick=()=>{const color=$('new-color').value.trim();if(!color)return;if(editing.colors.some(c=>model.normalize(c)===model.normalize(color))){message('Ese color ya existe.');return;}editing.colors.push(color);if(editing.packaging)editing.packaging.rows.push({color,sizePieces:Object.fromEntries(editing.sizes.map(s=>[s,null]))});$('new-color').value='';dirty=true;renderColors();renderCurve();};
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
