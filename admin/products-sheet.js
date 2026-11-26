'use strict';
/* Pantalla de prendas · "Planilla": editar muchas prendas en una tabla, sin abrir una por una.
   Nombre, código, tipo de prenda, público, con stock, visible, insignia y precio.
   Los cambios quedan marcados en amarillo hasta tocar "Guardar cambios"; cada prenda se guarda
   con su versión (si otra persona la cambió, avisa y no pisa nada). Usa products-tools.js. */
(()=>{
  const tools=window.ProductsTools;if(!tools)return;
  const VIEW_KEY='byebye-admin-vista';
  let mode=(()=>{try{return localStorage.getItem(VIEW_KEY)==='sheet'?'sheet':'cards';}catch{return'cards';}})();
  const drafts=new Map(),errors=new Map();let saving=false;
  const products=$('products');
  const sheet=el('div',null,'product-sheet');sheet.hidden=true;products.after(sheet);
  const bar=el('div',null,'sheet-bar');bar.hidden=true;document.body.append(bar);

  // Selector Tarjetas / Planilla
  const switcher=el('div',null,'view-switch');switcher.setAttribute('role','group');switcher.setAttribute('aria-label','Cómo ver las prendas');
  const cardsButton=el('button','▦ Tarjetas'),sheetButton=el('button','☰ Planilla');cardsButton.type=sheetButton.type='button';
  cardsButton.onclick=()=>setMode('cards');sheetButton.onclick=()=>setMode('sheet');switcher.append(cardsButton,sheetButton);
  document.querySelector('.product-filters')?.after(switcher);
  function setMode(next){if(next==='cards'&&drafts.size&&!confirm('Hay cambios sin guardar en la planilla. ¿Descartarlos?'))return;if(next==='cards'){drafts.clear();errors.clear();}mode=next;try{localStorage.setItem(VIEW_KEY,mode);}catch{}renderCards();}

  const extras=()=>window.ProductFields?.state||{fields:[],tags:{enabled:false}};
  const value=(p,key)=>key==='tags'?(p.tags||[]).join(', '):key.startsWith('field:')?window.ProductFields.fieldValue(p,extras().fields.find(f=>`field:${f.id}`===key)||{}):key==='subcategory'?(Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories.join(', '):p.subcategory||''):key==='badge'?p.customBadge?.label||'':key==='price'?(p.price??''):key==='visible'?!p.isHidden:key==='inStock'?p.inStock!==false:p[key]??'';
  function setValue(p,key,input){
    if(key==='tags'){window.ProductFields.setTags(p,String(input).split(','));return;}
    if(key.startsWith('field:')){const field=extras().fields.find(f=>`field:${f.id}`===key);if(field)window.ProductFields.setField(p,field,input);return;}
    if(key==='subcategory'){const list=String(input).split(',').map(part=>part.trim()).filter(Boolean);p.subcategory=list[0]||'';if(list.length>1)p.subcategories=list;else delete p.subcategories;return;}
    if(key==='badge'){const text=String(input).trim().slice(0,24);if(text)p.customBadge={label:text,color:p.customBadge?.color||'#9d4f38'};else delete p.customBadge;return;}
    if(key==='price'){const clean=String(input).replace(/\s/g,'').replace(/\./g,'').replace(',','.');if(clean==='')delete p.price;else p.price=Number(clean);return;}
    if(key==='visible'){p.isHidden=!input;return;}
    if(key==='inStock'){p.inStock=!!input;return;}
    p[key]=String(input).trim();
  }
  const baseColumns=[['name','Nombre','text'],['orderNumber','Código','text'],['subcategory','Tipo de prenda','text'],['category','Público','select'],['inStock','Con stock','check'],['visible','Visible','check'],['badge','Insignia','text'],['price','Precio','number']];
  let columns=baseColumns;
  const buildColumns=()=>{const {fields,tags}=extras();columns=[...baseColumns,...(tags.enabled!==false?[['tags','Etiquetas','text']]:[]),...fields.map(field=>[`field:${field.id}`,field.label,'extra',field])];};

  function renderSheet(rows){
    sheet.replaceChildren();buildColumns();
    const help=el('p','Tocá una celda para cambiarla. Tildá la casilla de la izquierda para hacer cambios en grupo (stock, precio, tipo, insignia…). Lo que cambies queda en amarillo hasta que toques «Guardar cambios». Enter baja a la fila siguiente.','sheet-help');
    const scroller=el('div',null,'sheet-scroll'),table=el('table'),head=el('tr');
    const all=el('input');all.type='checkbox';all.setAttribute('aria-label','Elegir todas para cambios en grupo');all.checked=rows.length>0&&rows.every(row=>tools.selected.has(Number(row.id)));all.onchange=()=>{for(const row of rows)all.checked?tools.selected.add(Number(row.id)):tools.selected.delete(Number(row.id));renderCards();};const allCell=el('th',null,'sheet-select');allCell.append(all);
    head.append(allCell,el('th','Foto'),...columns.map(([,label])=>el('th',label)),el('th',''));table.append(Object.assign(el('thead'),{}));table.tHead.append(head);
    const body=el('tbody');const audiences=tools.audienceOptions();
    const datalist=el('datalist');datalist.id='sheet-types';for(const name of [...new Set([...records.values()].flatMap(row=>String(row.payload?.subcategory||'').split(',').map(part=>part.trim())).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es')))datalist.append(new Option(name));
    rows.forEach((row,rowIndex)=>{
      const id=Number(row.id),draft=drafts.get(id),p=draft||row.payload,tr=el('tr');tr.dataset.id=id;if(draft)tr.classList.add('changed');if(errors.has(id))tr.classList.add('failed');
      const pick=el('input');pick.type='checkbox';pick.checked=tools.selected.has(id);pick.setAttribute('aria-label',`Elegir ${row.payload.name} para cambios en grupo`);pick.onchange=()=>{pick.checked?tools.selected.add(id):tools.selected.delete(id);tr.classList.toggle('picked',pick.checked);tools.renderBulkBar();};const pickCell=el('td',null,'sheet-select');pickCell.append(pick);tr.append(pickCell);if(pick.checked)tr.classList.add('picked');
      const photoCell=el('td',null,'sheet-photo'),img=el('img'),src=galleryFor(row.payload).sources[0];img.alt='';if(src){img.loading='lazy';img.src=asset(src);}photoCell.append(img);photoCell.title='Abrir la prenda completa';photoCell.onclick=()=>{if(drafts.has(id)&&!confirm('Esta prenda tiene cambios sin guardar en la planilla. ¿Abrirla igual? Los cambios de la planilla se descartan.'))return;drafts.delete(id);openEditor(id,false);};tr.append(photoCell);
      columns.forEach(([key,label,type],columnIndex)=>{
        const cell=el('td');cell.dataset.label=label;let input;
        if(type==='extra'){const field=columns[columnIndex][3];input=window.ProductFields.control(field,value(p,key),()=>{});if(input.tagName==='SELECT')type='select-extra';}
        else if(type==='select'){input=el('select');for(const [option,text] of audiences)input.append(new Option(text,option));input.value=value(p,key);}
        else if(type==='check'){input=el('input');input.type='checkbox';input.checked=!!value(p,key);}
        else{input=el('input');input.type='text';input.value=value(p,key);if(type==='number'){input.inputMode='decimal';input.placeholder='—';}if(key==='subcategory')input.setAttribute('list','sheet-types');}
        input.setAttribute('aria-label',`${label} de ${row.payload.name}`);input.dataset.row=rowIndex;input.dataset.col=columnIndex;
        const changed=()=>{const next=drafts.get(id)||clone(row.payload);setValue(next,key,type==='check'?input.checked:input.value);if(stableJson(next)===stableJson(row.payload))drafts.delete(id);else drafts.set(id,next);errors.delete(id);tr.classList.toggle('changed',drafts.has(id));tr.classList.remove('failed');tr.querySelector('.sheet-error')?.remove();updateBar();};
        input.addEventListener(type==='text'||type==='number'||type==='extra'?'input':'change',changed);
        input.addEventListener('keydown',event=>{if(event.key!=='Enter')return;event.preventDefault();sheet.querySelector(`[data-row="${rowIndex+(event.shiftKey?-1:1)}"][data-col="${columnIndex}"]`)?.focus();});
        cell.append(input);tr.append(cell);
      });
      const undo=el('button','↺','sheet-undo');undo.type='button';undo.title='Deshacer los cambios de esta prenda';undo.hidden=!draft;undo.onclick=()=>{drafts.delete(id);errors.delete(id);renderCards();};
      const last=el('td');last.append(undo);if(errors.has(id))last.append(el('span',errors.get(id),'sheet-error'));tr.append(last);body.append(tr);
    });
    table.append(body);scroller.append(table,datalist);sheet.append(help,scroller);updateBar();
  }
  const stableJson=value=>JSON.stringify(value,Object.keys(flatKeys(value)).sort());
  function flatKeys(value,out={}){if(value&&typeof value==='object')for(const [key,item] of Object.entries(value)){out[key]=1;flatKeys(item,out);}return out;}

  function updateBar(){
    bar.replaceChildren();bar.hidden=mode!=='sheet'||!drafts.size;if(bar.hidden)return;
    const discard=el('button','Descartar'),save=el('button',saving?'Guardando…':'Guardar cambios','primary');discard.type=save.type='button';discard.disabled=save.disabled=saving;
    discard.onclick=()=>{if(!confirm(`¿Descartar los cambios de ${drafts.size} ${drafts.size===1?'prenda':'prendas'}?`))return;drafts.clear();errors.clear();renderCards();};save.onclick=saveAll;
    bar.append(el('strong',`${drafts.size} ${drafts.size===1?'prenda con cambios':'prendas con cambios'}`),discard,save);
  }
  async function saveAll(){
    if(saving||!drafts.size)return;saving=true;updateBar();let done=0;
    for(const [id,draft] of [...drafts]){
      const row=records.get(id);if(!row){drafts.delete(id);continue;}
      try{const payload=clone(draft);model.validate(payload,row.payload);const result=await api.save(id,row.version,payload);const [persisted]=await api.getProducts([id]);if(!persisted||persisted.version!==result.version)throw new Error('No se pudo verificar. Probá de nuevo.');records.set(id,persisted);drafts.delete(id);errors.delete(id);done++;}
      catch(error){errors.set(id,error.code==='EDIT_CONFLICT'?'Otra persona cambió esta prenda. Tocá ↺ y volvé a hacer el cambio.':error.message||String(error));}
    }
    saving=false;renderCards();
    notice(errors.size?`Se guardaron ${done}. ${errors.size} ${errors.size===1?'prenda no se pudo guardar':'prendas no se pudieron guardar'}: están marcadas en rojo con el motivo.`:`Listo: ${done} ${done===1?'prenda guardada':'prendas guardadas'}.`);
  }
  addEventListener('beforeunload',event=>{if(!drafts.size)return;event.preventDefault();event.returnValue='';});

  const baseRender=renderCards;
  renderCards=function(...args){
    baseRender.apply(this,args);
    cardsButton.classList.toggle('active',mode==='cards');sheetButton.classList.toggle('active',mode==='sheet');cardsButton.setAttribute('aria-pressed',String(mode==='cards'));sheetButton.setAttribute('aria-pressed',String(mode==='sheet'));
    products.hidden=mode==='sheet';sheet.hidden=mode!=='sheet';
    if(mode==='sheet')renderSheet(tools.filteredRows());else updateBar();
  };
  if(records?.size)renderCards();
})();
