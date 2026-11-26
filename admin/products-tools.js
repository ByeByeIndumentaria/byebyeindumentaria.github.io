'use strict';
/* Pantalla de prendas · Etapa 6.
   - Filtros: tipo de prenda, estado (visibles, ocultas, sin stock, sin fotos, curva pendiente, con insignia) y orden.
   - Tocar la foto abre la prenda.
   - "Duplicar": abre una prenda nueva con todo copiado (queda oculta hasta que la revises).
   - Selección de varias prendas: ocultar, mostrar, poner o quitar insignia, agregar o quitar de una colección, archivar.
   - "Ver archivados" pasa a llamarse "Papelera (archivadas)".
   Se carga después de admin.js y usa sus funciones (records, renderCards, openEditor, api…). */
(()=>{
  const selected=new Set();
  let bulkBusy=false;
  const toolbar=$('search').parentElement;
  const select=(label,options)=>{const node=el('select');node.setAttribute('aria-label',label);for(const [value,text] of options){const option=el('option',text);option.value=value;node.append(option);}return node;};
  const stateFilter=select('Filtrar por estado',[['','Todos los estados'],['visible','Visibles'],['hidden','Ocultas'],['nostock','Sin stock'],['nophoto','Sin fotos'],['nocurve','Curva pendiente'],['badge','Con insignia']]);
  const categoryFilter=select('Filtrar por tipo de prenda',[['','Todos los tipos']]);
  const sortSelect=select('Ordenar',[['','Orden del catálogo'],['name','Nombre A–Z'],['code','Código'],['recent','Editadas recientemente']]);
  const filters=el('div',null,'product-filters');filters.append(categoryFilter,stateFilter,sortSelect);toolbar.after(filters);
  const bulkBar=el('div',null,'bulk-bar');bulkBar.hidden=true;filters.after(bulkBar);
  for(const node of [stateFilter,categoryFilter,sortSelect])node.onchange=()=>renderCards();
  $('search').oninput=()=>renderCards();$('collection-filter').onchange=()=>renderCards();
  const archivedText=[...document.querySelectorAll('label.check')].map(label=>[...label.childNodes].find(node=>node.nodeType===3&&/Ver archivados/.test(node.textContent))).find(Boolean);
  if(archivedText)archivedText.textContent='Papelera (archivadas)';

  const categoriesOf=p=>Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories.map(String):String(p.subcategory||'').split(',').map(part=>part.trim()).filter(Boolean);
  const hasPhoto=p=>!!galleryFor(p).sources[0];
  const hasCurve=p=>!!(p.packaging?.rows?.length||p.purchaseOptions?.some(option=>option.packaging?.rows?.length));
  function refreshCategoryOptions(){
    const current=categoryFilter.value,names=[...new Set([...records.values()].flatMap(row=>categoriesOf(row.payload)))].sort((a,b)=>a.localeCompare(b,'es'));
    categoryFilter.replaceChildren(...[['','Todos los tipos'],...names.map(name=>[name,name])].map(([value,text])=>{const option=el('option',text);option.value=value;return option;}));
    categoryFilter.value=names.includes(current)?current:'';
  }
  function filteredRows(){
    const q=model.normalize($('search').value),collection=$('collection-filter').value,category=categoryFilter.value,state=stateFilter.value;
    const rows=[...records.values()].filter(r=>{const p=r.payload;
      if(Boolean(p.archived)!==showArchived)return false;
      if(collection&&!(p.collections||[p.collection]).includes(collection))return false;
      if(!model.normalize(`${p.name} ${p.orderNumber||''}`).includes(q))return false;
      if(category&&!categoriesOf(p).includes(category))return false;
      if(state==='visible'&&p.isHidden)return false;if(state==='hidden'&&!p.isHidden)return false;
      if(state==='nostock'&&p.inStock!==false)return false;if(state==='nophoto'&&hasPhoto(p))return false;
      if(state==='nocurve'&&hasCurve(p))return false;if(state==='badge'&&!p.customBadge?.label)return false;
      return true;});
    const sort=sortSelect.value;
    if(sort==='name')rows.sort((a,b)=>String(a.payload.name).localeCompare(String(b.payload.name),'es'));
    if(sort==='code')rows.sort((a,b)=>String(a.payload.orderNumber||'').localeCompare(String(b.payload.orderNumber||''),'es',{numeric:true}));
    if(sort==='recent')rows.sort((a,b)=>String(b.updated_at||'').localeCompare(String(a.updated_at||'')));
    return rows;
  }
  renderCards=function(){
    cardImageObserver?.disconnect();refreshCategoryOptions();
    const list=filteredRows();
    for(const id of [...selected])if(!list.some(row=>Number(row.id)===id))selected.delete(id);
    $('count').textContent=`${list.length} ${list.length===1?'producto':'productos'}`;
    $('products').replaceChildren();
    for(const r of list){
      const p=r.payload,id=Number(r.id),card=el('article',null,`card${selected.has(id)?' selected':''}`),img=el('img');img.alt=p.name;
      const src=galleryFor(p).sources[0];if(src)queueCardImage(img,asset(src));else img.alt='Sin foto · '+p.name;
      img.classList.add('card-open');img.title='Abrir prenda';img.onclick=()=>openEditor(r.id,false);
      const photo=el('div',null,'card-photo');photo.append(img);if(src)window.PhotoFrames?.apply(img,window.PhotoFrames.get(p,src));
      if(!preview){const check=el('label',null,'card-select'),box=el('input');box.type='checkbox';box.checked=selected.has(id);box.setAttribute('aria-label',`Seleccionar ${p.name}`);box.onchange=()=>{box.checked?selected.add(id):selected.delete(id);card.classList.toggle('selected',box.checked);renderBulkBar();};check.append(box);card.append(check);}
      const badgeText=p.isHidden?'Oculto':p.inStock===false?'Sin stock':categoriesOf(p)[0]||'';
      const body=el('div',null,'card-info');body.append(el('span',badgeText,'badge'),el('h3',p.name),el('p',p.orderNumber||'Sin código'),el('p',`${(p.colors||[]).length} colores · ${hasCurve(p)?'Curva cargada':'Curva pendiente'}${hasPhoto(p)?'':' · Sin fotos'}`));
      const actions=el('div',null,'actions');
      for(const [label,curve] of [['Editar',false],['Editar curva',true]]){const b=el('button',label);b.type='button';b.onclick=()=>openEditor(r.id,curve);actions.append(b);}
      if(!preview){const copy=el('button','Duplicar');copy.type='button';copy.onclick=()=>duplicateProduct(id);actions.append(copy);}
      if(!preview&&r.version>0){const history=el('button','Historial');history.type='button';history.onclick=()=>openHistory(id);actions.append(history);const archive=el('button',p.archived?'Restaurar':'Archivar');archive.type='button';archive.onclick=()=>setArchived(id,!p.archived);actions.append(archive);}
      body.append(actions);card.append(photo,body);$('products').append(card);
    }
    renderBulkBar();
  };

  /* ——— Duplicar ——— */
  async function duplicateProduct(id){
    const row=records.get(id);if(!row)return;
    const copy=clone(row.payload);delete copy.id;copy.name=`${row.payload.name} (copia)`;copy.orderNumber='';copy.archived=false;copy.isHidden=true;delete copy.createdAt;
    const temporary=-Date.now();records.set(temporary,{id:temporary,version:0,payload:copy});
    try{await openEditor(temporary,false);}finally{records.delete(temporary);}
    editingId=null;version=0;dirty=true;
    notice('Copia lista: cambiá el nombre y el código. Queda oculta del catálogo hasta que destildes “Ocultar del catálogo”.');
  }

  /* ——— Varias prendas a la vez ——— */
  function renderBulkBar(){
    bulkBar.replaceChildren();bulkBar.hidden=!selected.size;if(!selected.size)return;
    const action=(label,run,className='')=>{const b=el('button',label,className);b.type='button';b.disabled=bulkBusy;b.onclick=run;return b;};
    const collectionOptions=[...collections.values()].map(row=>[row.id,row.payload?.name||row.name||row.id]);
    bulkBar.append(el('strong',`${selected.size} ${selected.size===1?'seleccionada':'seleccionadas'}`),
      action('Ocultar',()=>bulk('Ocultar del catálogo',p=>{p.isHidden=true;})),
      action('Mostrar',()=>bulk('Mostrar en el catálogo',p=>{p.isHidden=false;})),
      action('Marcar sin stock',()=>bulk('Marcar sin stock',p=>{p.inStock=false;})),
      action('Marcar con stock',()=>bulk('Marcar con stock',p=>{p.inStock=true;})),
      action('Cambiar tipo de prenda…',()=>{const value=prompt('Nuevo tipo de prenda para todas las elegidas (si son varios, separalos con coma):');if(value===null)return;const text=value.split(',').map(part=>part.trim()).filter(Boolean);if(!text.length)return;bulk(`Cambiar el tipo de prenda a «${text.join(', ')}»`,p=>{p.subcategory=text[0];if(text.length>1)p.subcategories=text;else delete p.subcategories;});}),
      action('Cambiar público…',()=>{const options=audienceOptions(),answer=prompt(`Público para todas las elegidas: escribí el número\n\n${options.map(([,label],index)=>`${index+1}. ${label}`).join('\n')}`);if(answer===null)return;const choice=options[Number(answer)-1];if(!choice)return notice('Número inválido.');bulk(`Cambiar el público a «${choice[1]}»`,p=>{p.category=choice[0];});}),
      action('Cambiar precio…',()=>changePrices()),
      action('Poner insignia…',()=>{const label=prompt('Texto de la insignia (por ejemplo: Nuevo, Oferta, Últimas unidades)');if(label===null)return;const text=label.trim().slice(0,24);if(!text)return;bulk(`Poner la insignia «${text}»`,p=>{p.customBadge={label:text,color:p.customBadge?.color||'#9d4f38'};});}),
      action('Quitar insignia',()=>bulk('Quitar la insignia',p=>{delete p.customBadge;})),
      action('Agregar a colección…',()=>chooseCollection(collectionOptions,'Agregar a la colección',(id,name)=>bulk(`Agregar a «${name}»`,p=>{const list=new Set(p.collections||[p.collection].filter(Boolean));list.add(id);p.collections=[...list];p.collection||=id;}))),
      action('Quitar de colección…',()=>chooseCollection(collectionOptions,'Quitar de la colección',(id,name)=>bulk(`Quitar de «${name}»`,p=>{const list=(p.collections||[p.collection]).filter(item=>item&&item!==id);if(!list.length)throw new Error(`«${p.name}» quedaría sin colección`);p.collections=list;if(p.collection===id)p.collection=list[0];}))),
      action(showArchived?'Restaurar':'Archivar',()=>bulk(showArchived?'Restaurar':'Archivar (se puede recuperar desde la Papelera)',p=>{p.archived=!showArchived;}),showArchived?'':'danger'),
      ...(window.ProductFields?.bulkActions({action,bulk})||[]),
      action('Elegir todas',()=>{for(const row of filteredRows())selected.add(Number(row.id));renderCards();}),
      action('Cancelar',()=>{selected.clear();renderCards();}));
  }
  function audienceOptions(){if(window.ProductFields)return window.ProductFields.audienceOptions();const labels={MUJER:'Mujer',HOMBRE:'Hombre',NINOS:'Niños / Niñas',UNISEX:'Unisex'};for(const row of records.values()){const value=row.payload?.category;if(value&&!labels[value])labels[value]=value;}return Object.entries(labels);}
  const money=value=>Number(value).toLocaleString('es-AR',{maximumFractionDigits:2});
  // "+10%", "-5 %", "+1500", "-300" o un precio fijo "25000". Redondea a la centena cuando el precio pasa de $1.000.
  function priceRule(text){const clean=String(text||'').replace(/\s/g,'').replace(/\./g,'').replace(',','.');let match=clean.match(/^([+-])(\d+(?:\.\d+)?)%$/);if(match){const factor=1+(match[1]==='-'?-1:1)*Number(match[2])/100;return{label:`${match[1]}${match[2]} %`,apply:price=>round(price*factor)};}
    match=clean.match(/^([+-])(\d+(?:\.\d+)?)$/);if(match){const delta=(match[1]==='-'?-1:1)*Number(match[2]);return{label:`${match[1]}$${money(match[2])}`,apply:price=>Math.max(0,round(price+delta))};}
    match=clean.match(/^\$?(\d+(?:\.\d+)?)$/);if(match){const fixed=Number(match[1]);return{label:`precio fijo $${money(fixed)}`,apply:()=>fixed,fixed:true};}return null;}
  const round=value=>value>=1000?Math.round(value/100)*100:Math.round(value);
  function changePrices(){
    const answer=prompt('¿Cómo cambia el precio?\n\n• +10%  → sube 10 %\n• -15%  → baja 15 %\n• +1500 → suma $1.500\n• 25000 → todas a $25.000\n\nSe redondea a la centena. Si una prenda tiene precio por opción de compra, cambia cada opción.');if(answer===null)return;
    const rule=priceRule(answer);if(!rule)return notice('No entendí el cambio. Escribí, por ejemplo, +10% o 25000.');
    const sample=[...selected].map(id=>records.get(id)?.payload).find(p=>p&&(p.price!=null&&p.price!==''||(p.purchaseOptions||[]).some(o=>o.price!=null&&o.price!=='')));
    const example=sample?`\n\nEjemplo: «${sample.name}» $${money(Number(sample.price??sample.purchaseOptions.find(o=>o.price!=null&&o.price!=='').price))} → $${money(rule.apply(Number(sample.price??sample.purchaseOptions.find(o=>o.price!=null&&o.price!=='').price)))}`:'';
    if(!rule.fixed&&!sample)return notice('Las prendas elegidas no tienen precio cargado. Para ponerles uno, escribí el precio fijo (por ejemplo 25000).');
    bulk(`Cambiar precio (${rule.label})${example}`,p=>{const has=v=>v!=null&&v!=='';if(rule.fixed){p.price=rule.apply();for(const option of p.purchaseOptions||[])if(has(option.price))option.price=rule.apply();return;}if(has(p.price))p.price=rule.apply(Number(p.price));for(const option of p.purchaseOptions||[])if(has(option.price))option.price=rule.apply(Number(option.price));});
  }
  function chooseCollection(options,title,done){
    if(!options.length)return notice('No hay colecciones cargadas.');
    const list=options.map(([,name],index)=>`${index+1}. ${name}`).join('\n'),answer=prompt(`${title}: escribí el número\n\n${list}`);if(answer===null)return;
    const choice=options[Number(answer)-1];if(!choice)return notice('Número de colección inválido.');done(choice[0],choice[1]);
  }
  async function bulk(label,mutate){
    if(bulkBusy)return;const ids=[...selected];
    if(!confirm(`${label}: ${ids.length} ${ids.length===1?'prenda':'prendas'}. Se aplica enseguida en el catálogo. ¿Continuar?`))return;
    bulkBusy=true;renderBulkBar();let done=0;const failed=[];
    try{
      for(const id of ids){
        const row=records.get(id);if(!row)continue;notice(`${label}… ${done+failed.length+1} de ${ids.length}`);
        try{const payload=clone(row.payload);mutate(payload);const result=await api.save(id,row.version,payload);const [persisted]=await api.getProducts([id]);if(!persisted||persisted.version!==result.version)throw new Error('no se pudo verificar');records.set(id,persisted);done++;}
        catch(error){failed.push(`${row.payload.name}: ${error.message}`);}
      }
    }finally{bulkBusy=false;}
    selected.clear();renderCards();
    notice(failed.length?`Listo en ${done} de ${ids.length}. No se pudo en: ${failed.join(' · ')}`:`Listo: ${done} ${done===1?'prenda actualizada':'prendas actualizadas'}.`);
  }
  /* ——— Novedad: la etiqueta «Nuevo» del catálogo usa la fecha de alta (createdAt) ——— */
  let newDays=21;window.CatalogAPI?.getSiteSettings?.().then(site=>{newDays=Math.max(1,Number(site?.shop?.newDays)||21);}).catch(()=>{});
  const longDate=time=>new Date(time).toLocaleDateString('es-AR',{day:'numeric',month:'long'});
  function renderNovelty(){
    let box=document.getElementById('novelty-field');const fields=document.querySelector('#product-form .fields');if(!fields||!editing)return;
    if(!box){box=el('label',null,'check novelty-field wide');box.id='novelty-field';const input=el('input');input.type='checkbox';input.id='novelty';box.append(input,el('span'));fields.append(box);
      input.onchange=()=>{if(input.checked)editing.createdAt=new Date().toISOString();else editing.createdAt=new Date(Date.now()-(newDays+1)*864e5).toISOString();dirty=true;renderNovelty();};}
    const created=Date.parse(editing.createdAt||''),until=created+newDays*864e5,on=Number.isFinite(created)&&Date.now()<until;
    box.querySelector('input').checked=on;
    box.querySelector('span').textContent=on?`Novedad: el catálogo muestra «Nuevo» hasta el ${longDate(until)}`:editingId==null?'Novedad: al publicarla se muestra «Nuevo» durante '+newDays+' días':'Novedad: mostrar la etiqueta «Nuevo» desde hoy, durante '+newDays+' días';
  }
  const baseOpenEditor=openEditor;
  openEditor=async function(...args){const result=await baseOpenEditor.apply(this,args);try{renderNovelty();}catch(error){console.warn(error);}return result;};
  window.ProductsTools={filteredRows,audienceOptions,priceRule,selected,renderBulkBar:()=>renderBulkBar()};
  if(records?.size)renderCards();
})();
