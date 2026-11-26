'use strict';
/* Administración · "Cargar en cantidad" (Etapa D).
   1. Planilla de Excel: descargar todas las prendas (o una vacía), cambiarla o completarla y subirla.
      Antes de guardar muestra qué prendas se crean, cuáles cambian y qué filas tienen errores.
   2. Fotos por código: elegir muchas fotos; cada una va a la prenda cuyo código está en el nombre del archivo
      (y al color, si el nombre lo dice: «125-314 negro.jpg»).
   3. Cambiar un nombre en todas: tipo de prenda, etiqueta o talle.
   Además suma a los cambios en grupo: agregar/quitar talle y agregar/quitar color.
   Usa BulkModel (bulk-model.js) y las funciones de admin.js. */
(()=>{
  const B=window.BulkModel;if(!B)return;
  const make=(tag,text,className)=>{const node=document.createElement(tag);if(text!=null)node.textContent=text;if(className)node.className=className;return node;};
  const btn=(text,onClick,className='')=>{const node=make('button',text,className);node.type='button';node.onclick=onClick;return node;};
  const context=()=>({collections:[...collections.values()].map(row=>({id:row.id,name:row.payload?.name||row.id})),audiences:window.ProductFields?window.ProductFields.audienceOptions():[['MUJER','Mujer'],['HOMBRE','Hombre'],['NINOS','Niños / Niñas'],['UNISEX','Unisex']],fields:window.ProductFields?.state?.fields||[],recalculate:model.recalculate});
  const liveRows=()=>[...records.values()].filter(row=>!row.payload?.archived);
  let XLSXReady=null;
  function loadXLSX(){if(window.XLSX)return Promise.resolve(window.XLSX);XLSXReady??=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';script.onload=()=>resolve(window.XLSX);script.onerror=()=>{XLSXReady=null;reject(new Error('No se pudo abrir el lector de Excel. Revisá la conexión y probá de nuevo.'));};document.head.append(script);});return XLSXReady;}
  async function saveProduct(id,version,payload,original){model.validate(payload,original||null);const result=await api.save(id,version,payload);const [persisted]=await api.getProducts([Number(result.id)]);if(!persisted||persisted.version!==result.version)throw new Error('no se pudo verificar');records.set(Number(persisted.id),persisted);return persisted;}

  /* ——— Ventana principal ——— */
  const dialog=make('dialog',null,'bulk-dialog');document.body.append(dialog);
  function open(view){dialog.replaceChildren();const head=make('div',null,'bulk-head');head.append(make('h2','Cargar en cantidad'),btn('×',()=>dialog.close(),'bulk-close'));dialog.append(head);const body=make('div',null,'bulk-body');dialog.append(body);(view||home)(body);if(!dialog.open)dialog.showModal();}
  function home(body){
    const card=(title,text,...actions)=>{const box=make('section',null,'bulk-card');box.append(make('h3',title),make('p',text));const row=make('div',null,'bulk-actions');row.append(...actions);box.append(row);body.append(box);};
    const sheetInput=make('input');sheetInput.type='file';sheetInput.accept='.xlsx,.xls,.csv';sheetInput.hidden=true;sheetInput.onchange=()=>{const file=sheetInput.files?.[0];sheetInput.value='';if(file)readSheet(file);};
    card('1. Planilla de Excel','Descargá la planilla con todas las prendas, cambiá lo que quieras (precios, stock, colores, talles, curva, tipo, etiquetas…) o agregá filas para prendas nuevas, y subila. Antes de guardar te muestra qué va a cambiar.',
      btn('Descargar planilla con todas las prendas',()=>downloadSheet(false),'primary'),btn('Descargar planilla vacía',()=>downloadSheet(true)),btn('Subir planilla completada',()=>sheetInput.click(),'primary'));
    body.lastElementChild.append(sheetInput,make('small','Las prendas se reconocen por el Código. Si el código no existe, se crea una prenda nueva (queda oculta hasta que pongas «Sí» en Visible). Curva: «S:2 M:3 L:3» o «2,3,3» en el orden de los talles.','bulk-help'));
    const photoInput=make('input');photoInput.type='file';photoInput.accept='image/jpeg,image/png,image/webp';photoInput.multiple=true;photoInput.hidden=true;photoInput.onchange=()=>{const files=[...(photoInput.files||[])];photoInput.value='';if(files.length)open(view=>previewPhotos(view,files));};
    card('2. Fotos por código','Elegí muchas fotos juntas. Cada una va a la prenda cuyo código está en el nombre del archivo. Si además dice el color, queda vinculada a ese color.',btn('Elegir fotos',()=>photoInput.click(),'primary'));
    body.lastElementChild.append(photoInput,make('small','Ejemplos: «125-314.jpg», «125-314_2.jpg», «125-314 negro.jpg», «T01 gris claro (3).jpg». El número del final define el orden.','bulk-help'));
    card('3. Cambiar un nombre en todas','Por ejemplo, que todas las «Camperas» pasen a llamarse «Abrigos», o cambiar una etiqueta o un talle en todas las prendas que lo tengan.',btn('Tipo de prenda',()=>renameFlow('type')),btn('Etiqueta',()=>renameFlow('tag')),btn('Talle',()=>renameFlow('size')));
    body.lastElementChild.append(make('small','Los colores no se renombran acá porque el ERP y Notas de pedido los usan por su nombre (ver propuesta P-10).','bulk-help'));
  }

  /* ——— Planilla ——— */
  async function downloadSheet(empty){
    try{const XLSX=await loadXLSX(),ctx=context(),columns=[...B.BASE_COLUMNS,...ctx.fields.map(field=>field.label)];
      const rows=empty?[Object.fromEntries(columns.map(column=>[column,'']))]:liveRows().map(row=>B.rowFromProduct(row.payload,ctx)).sort((a,b)=>String(a['Código']).localeCompare(String(b['Código']),'es',{numeric:true}));
      if(empty)Object.assign(rows[0],{'Código':'EJEMPLO-1','Nombre':'Remera de ejemplo (borrá esta fila)','Público':'Mujer','Tipo de prenda':'Remeras','Colecciones':ctx.collections[0]?.name||'','Colores':'Negro, Blanco','Talles':'S, M, L','Curva':'S:2 M:3 L:3','Con stock':'Sí','Visible':'No'});
      const sheet=XLSX.utils.json_to_sheet(rows,{header:columns});sheet['!cols']=columns.map(column=>({wch:Math.max(10,Math.min(40,column.length+6))}));
      const help=XLSX.utils.aoa_to_sheet([['Cómo completar la planilla'],[''],['Código','Identifica la prenda. Si no existe, se crea una nueva.'],['Público',ctx.audiences.map(([,label])=>label).join(', ')],['Colecciones',`Separadas por coma: ${ctx.collections.map(c=>c.name).join(', ')}`],['Colores / Talles / Etiquetas','Separados por coma.'],['Curva','«S:2 M:3 L:3» o «2,3,3» (piezas por color de cada talle, en el orden de los talles). Igual para todos los colores.'],['Con stock / Visible','Sí o No. Las prendas nuevas quedan ocultas si Visible está vacío.'],['Precio','Número, sin $.'],['Filas que no cambian','No pasa nada: sólo se guardan las diferencias.']]);help['!cols']=[{wch:28},{wch:100}];
      const book=XLSX.utils.book_new();XLSX.utils.book_append_sheet(book,sheet,'Prendas');XLSX.utils.book_append_sheet(book,help,'Cómo completar');
      XLSX.writeFile(book,empty?'ByeBye-prendas-nuevas.xlsx':`ByeBye-prendas-${new Date().toISOString().slice(0,10)}.xlsx`);
    }catch(error){notice(error.message||String(error));}
  }
  async function readSheet(file){
    try{const XLSX=await loadXLSX(),book=XLSX.read(await file.arrayBuffer(),{type:'array'}),sheet=book.Sheets[book.SheetNames.find(name=>/prendas/i.test(name))||book.SheetNames[0]];
      const rows=XLSX.utils.sheet_to_json(sheet,{defval:'',raw:false}).filter(row=>Object.values(row).some(value=>String(value).trim()));
      if(!rows.length)return notice('La planilla está vacía.');if(!('Código' in rows[0])&&!('Nombre' in rows[0]))return notice('No encontré las columnas «Código» y «Nombre». Usá la planilla que se descarga acá.');
      open(view=>previewSheet(view,rows));
    }catch(error){notice(error.message||String(error));}
  }
  function previewSheet(body,rows){
    const ctx=context(),byCode=new Map(liveRows().filter(row=>row.payload.orderNumber).map(row=>[B.norm(row.payload.orderNumber),row])),seen=new Set();
    const plan=rows.map((row,index)=>{const code=B.norm(row['Código']);const line=index+2;if(/^ejemplo-/.test(code))return{line,row,skip:true,status:'skip',text:'Fila de ejemplo: no se carga.'};
      if(code&&seen.has(code))return{line,row,status:'error',errors:['Código repetido en la planilla.']};if(code)seen.add(code);
      const existing=code?byCode.get(code):null;const result=B.applyRow(row,existing?.payload||null,ctx);
      if(!existing&&!code)result.errors.unshift('Falta el código.');
      return{line,row,existing,...result,status:result.errors.length?'error':result.isNew?'new':result.changes.length?'change':'same'};});
    const count=status=>plan.filter(item=>item.status===status).length,ready=plan.filter(item=>item.status==='new'||item.status==='change');
    const summary=make('div',null,'bulk-summary');for(const [status,label] of [['new','Prendas nuevas'],['change','Prendas que cambian'],['same','Sin cambios'],['error','Filas con errores']])summary.append(make('span',`${label}: ${count(status)}`,`bulk-pill ${status}`));body.append(summary);
    const table=make('table',null,'bulk-table'),head=make('tr');for(const text of ['Fila','Código','Prenda','Qué pasa'])head.append(make('th',text));table.append(head);
    for(const item of plan.filter(item=>item.status!=='same')){const tr=make('tr',null,item.status);tr.append(make('td',String(item.line)),make('td',String(item.row['Código']||'—')),make('td',String(item.row['Nombre']||item.existing?.payload?.name||'—')),make('td',item.status==='error'?item.errors.join(' · '):item.status==='new'?`Nueva${item.payload.isHidden?' (oculta)':''}`:item.status==='skip'?item.text:`Cambia: ${item.changes.join(', ')}`));table.append(tr);}
    if(!plan.some(item=>item.status!=='same'))body.append(make('p','No hay nada para cambiar: la planilla es igual a lo que ya está cargado.','bulk-help'));else{const scroll=make('div',null,'bulk-scroll');scroll.append(table);body.append(scroll);}
    const actions=make('div',null,'bulk-actions');actions.append(btn('Volver',()=>open()),btn(ready.length?`Guardar ${ready.length} ${ready.length===1?'prenda':'prendas'}`:'Nada para guardar',()=>applySheet(body,ready),'primary'));actions.lastChild.disabled=!ready.length;
    if(count('error'))body.append(make('p','Las filas con errores no se guardan; corregilas en la planilla y volvé a subirla cuando quieras.','bulk-help'));body.append(actions);
  }
  async function applySheet(body,ready){
    body.replaceChildren(make('p','Guardando…','bulk-progress'));const progress=body.firstChild,failed=[];let done=0;
    for(const item of ready){progress.textContent=`Guardando ${done+failed.length+1} de ${ready.length}…`;try{await saveProduct(item.existing?Number(item.existing.id):null,item.existing?.version||0,item.payload,item.existing?.payload);done++;}catch(error){failed.push(`Fila ${item.line} (${item.row['Código']||item.row['Nombre']}): ${error.code==='EDIT_CONFLICT'?'otra persona la cambió mientras tanto':error.message}`);}}
    renderCards();body.replaceChildren(make('h3',`Listo: ${done} ${done===1?'prenda guardada':'prendas guardadas'}.`));if(failed.length){body.append(make('p','No se pudieron guardar:','bulk-help'));const list=make('ul',null,'bulk-errors');for(const text of failed)list.append(make('li',text));body.append(list);}
    body.append(btn('Cerrar',()=>dialog.close(),'primary'));
  }

  /* ——— Fotos por código ——— */
  function previewPhotos(body,files){
    const products=liveRows().map(row=>row.payload),matches=files.map(file=>({file,match:B.matchPhoto(file.name,products)}));
    const found=matches.filter(item=>item.match),missing=matches.filter(item=>!item.match),targets=new Set(found.map(item=>item.match.product.orderNumber));
    body.append(make('div',`${found.length} ${found.length===1?'foto reconocida':'fotos reconocidas'} para ${targets.size} ${targets.size===1?'prenda':'prendas'}${missing.length?` · ${missing.length} sin prenda`:''}`,'bulk-summary'));
    const table=make('table',null,'bulk-table'),head=make('tr');for(const text of ['Foto','Va a'])head.append(make('th',text));table.append(head);
    for(const item of matches){const tr=make('tr',null,item.match?'new':'error');tr.append(make('td',item.file.name),make('td',item.match?`${item.match.product.name} (${item.match.product.orderNumber})${item.match.color?` · color ${item.match.color}`:''}`:'No encontré una prenda con ese código. Revisá el nombre del archivo.'));table.append(tr);}
    const scroll=make('div',null,'bulk-scroll');scroll.append(table);body.append(scroll);
    const actions=make('div',null,'bulk-actions');actions.append(btn('Volver',()=>open()),btn(found.length?`Subir ${found.length} ${found.length===1?'foto':'fotos'}`:'Nada para subir',()=>uploadPhotos(body,found),'primary'));actions.lastChild.disabled=!found.length;body.append(actions);
  }
  async function uploadPhotos(body,found){
    body.replaceChildren(make('p','Preparando…','bulk-progress'));const progress=body.firstChild,byProduct=new Map(),failed=[];let uploaded=0,saved=0;
    for(const item of found){const row=liveRows().find(row=>row.payload===item.match.product);if(!row)continue;if(!byProduct.has(row.id))byProduct.set(row.id,{row,items:[]});byProduct.get(row.id).items.push(item);}
    for(const {row,items} of byProduct.values()){
      try{const payload=clone(row.payload),g=payload.gallery||={sources:[],colorGalleryIndexByNormalizedColor:{}};g.sources??=[];g.colorGalleryIndexByNormalizedColor??={};
        for(const item of items.sort((a,b)=>a.match.order-b.match.order)){progress.textContent=`Optimizando y subiendo ${uploaded+1} de ${found.length}…`;const result=await imageOptimizer.optimize(item.file);if(result.blob.size>5*1024*1024)throw new Error(`${item.file.name} sigue pesando más de 5 MB`);const url=await api.upload(result.blob);uploaded++;
          g.sources.push(url);const key=item.match.color?model.normalize(item.match.color):null;if(key&&g.colorGalleryIndexByNormalizedColor[key]==null)g.colorGalleryIndexByNormalizedColor[key]=g.sources.length-1;
          for(const option of payload.purchaseOptions||[]){if(key&&!(option.colors||[]).some(color=>model.normalize(color)===key))continue;const og=option.gallery||={sources:[],colorGalleryIndexByNormalizedColor:{}};og.sources.push(url);if(key&&og.colorGalleryIndexByNormalizedColor?.[key]==null)(og.colorGalleryIndexByNormalizedColor||={})[key]=og.sources.length-1;}}
        payload.galleryOrderManaged=true;progress.textContent=`Guardando ${row.payload.name}…`;await saveProduct(Number(row.id),row.version,payload,row.payload);saved++;
      }catch(error){failed.push(`${row.payload.name}: ${error.code==='EDIT_CONFLICT'?'otra persona la cambió mientras tanto':error.message}`);}
    }
    renderCards();body.replaceChildren(make('h3',`Listo: ${uploaded} ${uploaded===1?'foto subida':'fotos subidas'} en ${saved} ${saved===1?'prenda':'prendas'}.`));if(failed.length){const list=make('ul',null,'bulk-errors');for(const text of failed)list.append(make('li',text));body.append(make('p','No se pudo en:','bulk-help'),list);}
    body.append(make('p','Las fotos nuevas quedan al final de cada prenda; para cambiar el orden o la portada usá «Principal» o arrastrá en la ventana de la prenda.','bulk-help'),btn('Cerrar',()=>dialog.close(),'primary'));
  }

  /* ——— Cambiar un nombre en todas ——— */
  function valuesOf(kind){const counts=new Map();for(const row of liveRows()){const p=row.payload,values=kind==='type'?(Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories:[p.subcategory]):kind==='tag'?(p.tags||[]):[...new Set([...(p.sizes||[]),...(p.purchaseOptions||[]).flatMap(o=>o.sizes||[])])];for(const value of values.filter(Boolean))counts.set(value,(counts.get(value)||0)+1);}return [...counts].sort((a,b)=>a[0].localeCompare(b[0],'es',{numeric:true}));}
  function renameIn(p,kind,from,to){
    const same=value=>B.norm(value)===B.norm(from);let touched=false;
    if(kind==='type'){const list=Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories:[p.subcategory];if(list.some(same)){const next=[...new Map(list.map(value=>same(value)?to:value).map(value=>[B.norm(value),value])).values()];p.subcategory=next[0];if(next.length>1)p.subcategories=next;else delete p.subcategories;touched=true;}}
    if(kind==='tag'&&(p.tags||[]).some(same)){p.tags=[...new Map(p.tags.map(value=>same(value)?to:value).map(value=>[B.norm(value),value])).values()];touched=true;}
    if(kind==='size')for(const group of [p,...(p.purchaseOptions||[])]){if(!(group.sizes||[]).some(same))continue;if(group.sizes.some(value=>B.norm(value)===B.norm(to)&&!same(value)))throw new Error(`ya tiene el talle ${to}`);group.sizes=group.sizes.map(value=>same(value)?to:value);for(const row of group.packaging?.rows||[]){const pieces={};for(const [size,count] of Object.entries(row.sizePieces||{}))pieces[same(size)?to:size]=count;row.sizePieces=pieces;}touched=true;}
    if(kind==='size')p.outOfStockVariants=Object.fromEntries(Object.entries(p.outOfStockVariants||{}).map(([color,sizes])=>[color,sizes.map(size=>same(size)?to:size)]));
    return touched;
  }
  function renameFlow(kind){
    const label={type:'tipo de prenda',tag:'etiqueta',size:'talle'}[kind],values=valuesOf(kind);if(!values.length)return notice(`No hay ningún ${label} cargado.`);
    const answer=prompt(`¿Qué ${label} querés cambiar? Escribí el número\n\n${values.map(([value,count],index)=>`${index+1}. ${value} (${count})`).join('\n')}`);if(answer===null)return;const chosen=values[Number(answer)-1];if(!chosen)return notice('Número inválido.');
    const to=B.list(prompt(`Nuevo nombre para «${chosen[0]}» (${chosen[1]} prendas):`,chosen[0])||'')[0];if(!to||to===chosen[0])return;
    const ids=liveRows().filter(row=>renameIn(clone(row.payload),kind,chosen[0],to)).map(row=>Number(row.id));
    window.ProductsTools.bulkFor(ids,`Cambiar ${label} «${chosen[0]}» por «${to}»`,p=>{renameIn(p,kind,chosen[0],to);});dialog.close();
  }

  /* ——— Talles y colores en grupo ——— */
  function singleGroup(p){if(p.purchaseOptions?.length)throw new Error('tiene opciones de compra (cambialo en la ventana de la prenda)');}
  function bulkActions({action,bulk}){return[
    action('Agregar talle…',()=>{const size=B.list(prompt('Talle para agregar a las elegidas (por ejemplo XXL):')||'')[0];if(!size)return;const raw=prompt(`¿Cuántas piezas del talle ${size} por color en cada caja? (0 si todavía no sabés)`,'0');if(raw===null)return;const count=Number(raw);if(!Number.isInteger(count)||count<0)return notice('Escribí un número entero.');bulk(`Agregar el talle ${size} (${count} por color)`,p=>{singleGroup(p);if((p.sizes||[]).some(value=>B.norm(value)===B.norm(size)))return;B.applyColorsSizes(p,{sizes:[...(p.sizes||[]),size]},model.recalculate);for(const row of p.packaging?.rows||[])row.sizePieces[size]=count;model.recalculate(p.packaging,p.packingType||'mixed-colors');});}),
    action('Quitar talle…',()=>{const size=B.list(prompt('Talle para quitar de las elegidas:')||'')[0];if(!size)return;bulk(`Quitar el talle ${size}`,p=>{singleGroup(p);const sizes=(p.sizes||[]).filter(value=>B.norm(value)!==B.norm(size));if(sizes.length===(p.sizes||[]).length)return;if(!sizes.length)throw new Error('quedaría sin talles');B.applyColorsSizes(p,{sizes},model.recalculate);});}),
    action('Agregar color…',()=>{const color=B.list(prompt('Color para agregar a las elegidas (usá el mismo nombre que en las demás prendas):')||'')[0];if(!color)return;bulk(`Agregar el color ${color}`,p=>{singleGroup(p);if((p.colors||[]).some(value=>B.norm(value)===B.norm(color)))return;const first=p.packaging?.rows?.[0]?.sizePieces||null;B.applyColorsSizes(p,{colors:[...(p.colors||[]),color]},null);const row=(p.packaging?.rows||[]).find(item=>item.color===color);if(row&&first)row.sizePieces={...first};model.recalculate(p.packaging,p.packingType||'mixed-colors');});}),
    action('Quitar color…',()=>{const color=B.list(prompt('Color para quitar de las elegidas:')||'')[0];if(!color)return;bulk(`Quitar el color ${color}`,p=>{singleGroup(p);const colors=(p.colors||[]).filter(value=>B.norm(value)!==B.norm(color));if(colors.length===(p.colors||[]).length)return;if(!colors.length)throw new Error('quedaría sin colores');B.applyColorsSizes(p,{colors},model.recalculate);});}),
  ];}
  window.ProductBulk={bulkActions,open};

  /* Botón en la pantalla de prendas */
  const add=$('add-product');if(add){const launcher=make('button','Cargar en cantidad');launcher.type='button';launcher.id='bulk-load';launcher.onclick=()=>open();add.before(launcher);}
})();
