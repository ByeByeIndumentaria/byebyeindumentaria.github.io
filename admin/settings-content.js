'use strict';
/* Editor visual · Etapa C: agregar contenido.
   - "Páginas y menú": páginas nuevas (Envíos, Cómo comprar…) armadas con bloques, y el menú del encabezado.
   - "Guías de talles": tablas reutilizables que aparecen en la ficha de las prendas de los tipos elegidos.
   - Pedido: preguntas propias (CUIT, transporte, forma de pago…), obligatorias u opcionales. */
(()=>{
  layerMeta.pages=['Páginas y menú','Páginas'];layerMeta.menu=['Páginas y menú','Menú'];layerMeta.sizeTables=['Guías de talles','Talles'];
  const clean=text=>String(text||'').replace(/[<>"`]/g,'').trim();
  const slug=text=>clean(text).toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'pagina';
  const uid=prefix=>`${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2,5)}`;
  const preview=()=>$('live-preview')?.contentWindow;
  function showInPreview(page){try{const win=preview();if(!win)return;const hash=page?`#pagina-${page.slug}`:'';if(win.location.hash!==hash){if(hash)win.location.hash=hash;else win.history.pushState(null,'',win.location.pathname+win.location.search);win.dispatchEvent(new win.HashChangeEvent('hashchange'));}}catch{}}
  function text(value,onInput,placeholder=''){const node=el('input');node.type='text';node.value=value||'';node.placeholder=placeholder;node.onfocus=()=>remember();node.oninput=()=>{onInput(node.value);setDirty();};return node;}
  function labeled(label,node){const wrap=el('label',null,'control');wrap.append(el('span',label),node);return wrap;}
  function selectNode(options,value,onChange){const node=el('select');for(const [v,t] of options)node.append(new Option(t,v));node.value=value??'';node.onchange=()=>{remember();onChange(node.value);setDirty();renderPanel();};return node;}
  function moveButtons(list,index){const up=button('↑',()=>{remember();[list[index-1],list[index]]=[list[index],list[index-1]];setDirty();renderPanel();}),down=button('↓',()=>{remember();[list[index+1],list[index]]=[list[index],list[index+1]];setDirty();renderPanel();});up.disabled=index===0;down.disabled=index===list.length-1;return [up,down];}
  const typeNames=()=>[...new Set(products.filter(p=>!p.archived).flatMap(p=>Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories:String(p.subcategory||'').split(',').map(part=>part.trim())).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));

  /* ——— Páginas y menú ——— */
  function addPage(){const title=clean(prompt('Nombre de la página nueva (por ejemplo: Envíos, Cómo comprar, Quiénes somos)')||'');if(!title)return;settings.pages??=[];const taken=new Set(settings.pages.map(page=>page.slug));let base=slug(title),value=base,n=2;while(taken.has(value))value=`${base}-${n++}`;remember();const page={id:uid('pagina'),title,slug:value,hidden:false};settings.pages.push(page);addPageBlock(page,false);settings.menu??={enabled:false,items:[]};setDirty();renderPanel();showInPreview(page);notify(`Página «${title}» creada con un bloque de ejemplo. Su enlace es #pagina-${value}.`);}
  function addPageBlock(page,select=true){remember();const section={id:`section-${Date.now()}`,type:'text',title:page.title,text:'Escribí acá el contenido de la página. Podés agregar más bloques: preguntas, pasos, fotos, contacto…',buttonLabel:'',buttonUrl:'',location:`page:${page.id}`,align:'left',hidden:false};settings.sections.push(section);setDirty();if(select){selectManagedSection(section.id);setTimeout(()=>showInPreview(page),50);}}
  function pageBlocks(page){return settings.sections.map((section,index)=>({section,index})).filter(({section})=>section.location===`page:${page.id}`);}
  renderers.pages=panel=>{
    settings.pages??=[];settings.menu??={enabled:false,items:[]};
    let box=group('Páginas','Páginas propias como «Envíos», «Cómo comprar» o «Cambios». Se arman con los mismos bloques que la portada y se abren desde el menú, el pie o un botón.');
    if(!settings.pages.length)box.append(el('p','Todavía no hay páginas.','panel-empty'));
    settings.pages.forEach((page,index)=>{
      const card=el('article',null,'item-card page-card'),head=el('div',null,'item-card-head'),actions=el('div',null,'mini-actions');head.append(el('strong',page.title||'Sin título'));
      actions.append(...moveButtons(settings.pages,index),button('Eliminar',()=>{const blocks=pageBlocks(page);if(!confirm(blocks.length?`Se borra la página «${page.title}» con sus ${blocks.length} bloques. ¿Seguir?`:`¿Borrar la página «${page.title}»?`))return;remember();settings.sections=settings.sections.filter(section=>section.location!==`page:${page.id}`);settings.pages.splice(index,1);for(const item of settings.menu.items||[])if(item.type==='page'&&item.target===page.id)item.hidden=true;setDirty();renderPanel();showInPreview(null);},'danger-text'));
      head.append(actions);card.append(head,labeled('Título',text(page.title,value=>{page.title=clean(value);head.querySelector('strong').textContent=page.title||'Sin título';})));
      const link=el('div',null,'page-link');link.append(el('span','Enlace para botones y el pie:'),el('code',`#pagina-${page.slug}`));card.append(link);
      const hide=el('label',null,'toggle'),box2=el('input');box2.type='checkbox';box2.checked=page.hidden===true;box2.onchange=()=>{remember();page.hidden=box2.checked;setDirty();};hide.append(el('span','Oculta para las clientas (solo se ve en el editor)'),box2);card.append(hide);
      const blocks=pageBlocks(page),list=el('div',null,'page-blocks');list.append(el('small',blocks.length?`${blocks.length} ${blocks.length===1?'bloque':'bloques'}:`:'Sin bloques todavía.'));for(const {section} of blocks)list.append(button(section.title||section.type,()=>{selectManagedSection(section.id);setTimeout(()=>showInPreview(page),50);},'page-block-link'));card.append(list);
      const row=el('div',null,'mini-actions');row.append(button('Ver en la vista previa',()=>showInPreview(page)),button('＋ Agregar contenido',()=>{showInPreview(page);notify('Elegí un bloque y después, en «Ubicación», elegí «Página: '+page.title+'».');showLayer('add');}),button('＋ Texto',()=>addPageBlock(page)));card.append(row);
      box.append(card);
    });
    box.append(button('＋ Nueva página',addPage,'add-card'));panel.append(box);

    const menu=settings.menu;box=group('Menú del encabezado','Una fila de enlaces debajo del encabezado: a páginas, colecciones, tipos de prenda, públicos, etiquetas o una dirección de internet.');
    const on=el('label',null,'toggle'),onBox=el('input');onBox.type='checkbox';onBox.checked=menu.enabled===true;onBox.onchange=()=>{remember();menu.enabled=onBox.checked;if(menu.enabled&&!(menu.items||[]).length)menu.items=[{label:'Inicio',type:'home',target:''},...settings.pages.map(page=>({label:page.title,type:'page',target:page.id}))];setDirty();renderPanel();};on.append(el('span','Mostrar el menú'),onBox);box.append(on);
    menu.items??=[];
    const TYPES=[['home','Inicio (todo el catálogo)'],['page','Una página'],['collection','Una colección'],['category','Un tipo de prenda'],['audience','Un público'],['tag','Una etiqueta'],['url','Una dirección de internet']];
    const targets=type=>type==='page'?settings.pages.map(page=>[page.id,page.title]):type==='collection'?collections.map(row=>[String(row.id),row.payload?.name||row.name||String(row.id)]):type==='category'?typeNames().map(name=>[name,name]):type==='audience'?(settings.audiences||[]).map(item=>[item.value,item.label]):type==='tag'?[...new Set(products.flatMap(p=>p.tags||[]))].sort((a,b)=>a.localeCompare(b,'es')).map(tag=>[tag,tag]):[];
    menu.items.forEach((item,index)=>{
      const card=el('article',null,'item-card menu-card'),head=el('div',null,'item-card-head'),actions=el('div',null,'mini-actions');head.append(el('strong',item.label||'Sin texto'));actions.append(...moveButtons(menu.items,index),button('×',()=>{remember();menu.items.splice(index,1);setDirty();renderPanel();},'danger-text'));head.append(actions);card.append(head);
      card.append(labeled('Texto',text(item.label,value=>{item.label=clean(value).slice(0,40);head.querySelector('strong').textContent=item.label||'Sin texto';})),labeled('Lleva a',selectNode(TYPES,item.type||'home',value=>{item.type=value;item.target='';})));
      if(item.type==='url')card.append(labeled('Dirección (https://…)',text(item.target,value=>{item.target=value.trim();},'https://')));
      else if(item.type!=='home'){const options=targets(item.type);card.append(labeled('Cuál',selectNode([['','Elegí…'],...options],item.target||'',value=>{item.target=value;if(!item.label){const match=options.find(([v])=>v===value);if(match)item.label=match[1];}})));}
      box.append(card);
    });
    if(menu.enabled===true)box.append(button('＋ Agregar enlace al menú',()=>{remember();menu.items.push({label:'Nuevo enlace',type:'page',target:settings.pages[0]?.id||''});setDirty();renderPanel();},'add-card'));
    panel.append(box,el('p','Los cambios se ven al instante en la vista previa. Para que las clientas los vean, tocá «Publicar».','element-help'));
  };
  renderers.menu=renderers.pages;

  /* ——— Guías de talles ——— */
  renderers.sizeTables=panel=>{
    settings.sizeTables??=[];
    const box=group('Guías de talles','Tablas con medidas que aparecen en la ficha de las prendas de los tipos que elijas (botón «Guía de talles» debajo de los talles).');
    if(!settings.sizeTables.length)box.append(el('p','Todavía no hay guías.','panel-empty'));
    const types=typeNames();
    settings.sizeTables.forEach((table,index)=>{
      const card=el('article',null,'item-card size-card'),head=el('div',null,'item-card-head'),actions=el('div',null,'mini-actions');head.append(el('strong',table.title||'Sin título'));
      actions.append(...moveButtons(settings.sizeTables,index),button('Duplicar',()=>{remember();settings.sizeTables.splice(index+1,0,{...JSON.parse(JSON.stringify(table)),id:uid('talles'),title:`${table.title} (copia)`,categories:[]});setDirty();renderPanel();}),button('Eliminar',()=>{if(!confirm(`¿Borrar la guía «${table.title}»?`))return;remember();settings.sizeTables.splice(index,1);setDirty();renderPanel();},'danger-text'));
      head.append(actions);card.append(head,labeled('Título',text(table.title,value=>{table.title=clean(value);head.querySelector('strong').textContent=table.title||'Sin título';})),labeled('Texto del botón',text(table.buttonLabel,value=>{table.buttonLabel=clean(value).slice(0,40);},'Guía de talles')));
      const chips=el('div',null,'size-types');chips.append(el('span',table.categories?.length?'Se muestra en:':'Se muestra en todas las prendas que no tengan otra guía. Elegí tipos para limitarla:'));
      for(const name of types){const on=(table.categories||[]).includes(name);chips.append(button(on?`✓ ${name}`:name,()=>{remember();const set=new Set(table.categories||[]);on?set.delete(name):set.add(name);table.categories=[...set];setDirty();renderPanel();},on?'active':''));}
      card.append(chips);
      table.columns??=['Talle'];table.rows??=[];
      const scroller=el('div',null,'size-editor'),grid=el('table'),headRow=el('tr');
      table.columns.forEach((column,c)=>{const th=el('th');th.append(text(column,value=>{table.columns[c]=clean(value).slice(0,30);}));if(table.columns.length>1)th.append(button('×',()=>{remember();table.columns.splice(c,1);for(const row of table.rows)row.splice(c,1);setDirty();renderPanel();},'size-remove'));headRow.append(th);});
      headRow.append(el('th'));const thead=el('thead');thead.append(headRow);const tbody=el('tbody');
      table.rows.forEach((row,r)=>{const tr=el('tr');table.columns.forEach((_,c)=>{const td=el('td');td.append(text(row[c]??'',value=>{row[c]=clean(value).slice(0,30);}));tr.append(td);});const td=el('td');td.append(button('×',()=>{remember();table.rows.splice(r,1);setDirty();renderPanel();},'size-remove'));tr.append(td);tbody.append(tr);});
      grid.append(thead,tbody);scroller.append(grid);card.append(scroller);
      const tools=el('div',null,'mini-actions');tools.append(button('＋ Fila',()=>{remember();table.rows.push(table.columns.map(()=>''));setDirty();renderPanel();}),button('＋ Columna',()=>{remember();table.columns.push('Medida');for(const row of table.rows)row.push('');setDirty();renderPanel();}));card.append(tools);
      const note=el('label',null,'control'),area=el('textarea');area.rows=2;area.value=table.note||'';area.placeholder='Ej. Medidas en centímetros, tomadas con la prenda apoyada.';area.onfocus=()=>remember();area.oninput=()=>{table.note=clean(area.value).slice(0,300);setDirty();};note.append(el('span','Nota debajo de la tabla (opcional)'),area);card.append(note);
      box.append(card);
    });
    box.append(button('＋ Nueva guía de talles',()=>{remember();settings.sizeTables.push({id:uid('talles'),title:'Guía de talles',buttonLabel:'Guía de talles',categories:[],columns:['Talle','Busto (cm)','Cintura (cm)','Largo (cm)'],rows:[['S','','',''],['M','','',''],['L','','',''],['XL','','','']],note:'Medidas en centímetros.'});setDirty();renderPanel();},'add-card'));
    panel.append(box,el('p','Para verla: abrí una «Ficha de producto» de ese tipo en la vista previa. Recordá tocar «Publicar».','element-help'));
  };

  /* ——— Preguntas propias del pedido ——— */
  const baseCart=renderers.cart;
  renderers.cart=panel=>{
    baseCart(panel);settings.cart.extraQuestions??=[];const list=settings.cart.extraQuestions;
    const box=group('Preguntas propias del pedido','Se agregan al formulario del pedido y salen en el WhatsApp y en el PDF. Si es obligatoria, no deja enviar el pedido sin completarla.');
    const TYPES=[['text','Respuesta corta'],['textarea','Respuesta larga'],['options','Elegir una opción']];
    list.forEach((q,index)=>{
      const card=el('article',null,'item-card'),head=el('div',null,'item-card-head'),actions=el('div',null,'mini-actions');head.append(el('strong',q.label||'Sin texto'));actions.append(...moveButtons(list,index),button('×',()=>{remember();list.splice(index,1);setDirty();renderPanel();},'danger-text'));head.append(actions);card.append(head);
      card.append(labeled('Pregunta',text(q.label,value=>{q.label=clean(value).slice(0,60);head.querySelector('strong').textContent=q.label||'Sin texto';})),labeled('Tipo de respuesta',selectNode(TYPES,q.type||'text',value=>{q.type=value;})));
      if(q.type==='options'){const area=el('textarea');area.rows=2;area.value=(q.options||[]).join(', ');area.placeholder='Ej. Transferencia, Efectivo, Mercado Pago';area.onfocus=()=>remember();area.oninput=()=>{q.options=[...new Set(area.value.split(',').map(clean).filter(Boolean))];setDirty();};card.append(labeled('Opciones, separadas por coma',area));}
      const req=el('label',null,'toggle'),reqBox=el('input');reqBox.type='checkbox';reqBox.checked=q.required===true;reqBox.onchange=()=>{remember();q.required=reqBox.checked;setDirty();};req.append(el('span','Obligatoria'),reqBox);card.append(req);box.append(card);
    });
    const ideas=el('div',null,'field-suggestions');ideas.append(el('span','Agregar:'));
    for(const [label,type,options] of [['CUIT','text'],['Transporte o expreso','text'],['Forma de pago','options',['Transferencia','Efectivo','Mercado Pago']],['Fecha en la que lo necesitás','text'],['Otra pregunta','text']])ideas.append(button(`＋ ${label}`,()=>{remember();list.push({id:uid('pregunta'),label:label==='Otra pregunta'?'Nueva pregunta':label,type,options:options||[],required:false});setDirty();renderPanel();}));
    box.append(ideas);panel.append(box);
  };

  /* ——— Orden de las colecciones (se guarda enseguida en la nube, igual que en Administración → Colecciones) ——— */
  // Las colecciones originales no traen «type» en el editor; la base exige stock o preventa (igual que Administración).
  const LEGACY_PREORDERS=new Set(['verano-2027','produccion-invierno-2027','sweaters-2027','hoodies-2027']);
  let collectionBusy=false;
  async function moveCollection(index,target){
    if(collectionBusy||target<0||target>=collections.length)return;const ordered=[...collections],[moved]=ordered.splice(index,1);ordered.splice(target,0,moved);
    collectionBusy=true;notify('Guardando el orden de las colecciones…');
    try{for(const [position,row] of ordered.entries()){if(row.position===position)continue;const payload={...JSON.parse(JSON.stringify(row.payload||{})),position};payload.name||=row.name||row.id;payload.type||=LEGACY_PREORDERS.has(row.id)?'preorder':'stock';const saved=await api.saveCollection(row.id,row.version||0,payload);Object.assign(row,saved);}
      collections.splice(0,collections.length,...ordered);notify('Listo: el catálogo muestra las colecciones en este orden (la vista previa se actualiza en unos segundos).');}
    catch(error){notify(error.message||'No se pudo guardar el orden. Probá de nuevo.');}finally{collectionBusy=false;renderPanel();}
  }
  const baseOrder=renderers.order;
  renderers.order=panel=>{
    const box=group('Orden de las colecciones','Así aparecen en el catálogo (filtros y pestañas). Se guarda enseguida, sin tocar «Publicar».'),list=el('div',null,'collection-order');
    collections.forEach((row,index)=>{const item=el('div',null,'collection-order-row'),up=button('↑',()=>moveCollection(index,index-1)),down=button('↓',()=>moveCollection(index,index+1)),first=button('Primera',()=>moveCollection(index,0));up.disabled=index===0||collectionBusy;down.disabled=index===collections.length-1||collectionBusy;first.disabled=index===0||collectionBusy;up.setAttribute('aria-label',`Subir ${row.payload?.name||row.id}`);down.setAttribute('aria-label',`Bajar ${row.payload?.name||row.id}`);
      item.append(el('b',String(index+1)),el('span',row.payload?.name||row.name||row.id),first,up,down);list.append(item);});
    box.append(list,el('p','Para ocultar, crear o cambiarle el nombre a una colección: Administración → Colecciones.','element-help'));panel.append(box);
    // «Al final del catálogo», en este orden: públicos (en todas las vistas) y colecciones (en «Todo el catálogo»).
    settings.grid.endOrder??=[{type:'audience',value:'NINOS'},{type:'collection',value:'deportivo'},{type:'collection',value:'accesorios'}];const rules=settings.grid.endOrder,last=el('div',null,'collection-last');
    last.append(el('h4','Al final del catálogo, en este orden','block-list-title'),el('p','Lo de la lista va después de todo lo demás, en este orden. Un público (por ejemplo Niños) va al final en todas las vistas y en cada tipo de prenda; una colección, en «Todo el catálogo».','element-help'));
    const nameOf=rule=>rule.type==='audience'?`Público: ${(settings.audiences||[]).find(item=>item.value===rule.value)?.label||rule.value}`:`Colección: ${collections.find(row=>String(row.id)===rule.value)?.payload?.name||rule.value}`;
    rules.forEach((rule,index)=>{const row=el('div',null,'collection-order-row');const up=button('↑',()=>{remember();[rules[index-1],rules[index]]=[rules[index],rules[index-1]];setDirty();renderPanel();}),down=button('↓',()=>{remember();[rules[index+1],rules[index]]=[rules[index],rules[index+1]];setDirty();renderPanel();}),remove=button('×',()=>{remember();rules.splice(index,1);setDirty();renderPanel();});up.disabled=index===0;down.disabled=index===rules.length-1;row.append(el('b',String(index+1)),el('span',nameOf(rule)),remove,up,down);last.append(row);});
    const options=[...(settings.audiences||[]).map(item=>['audience',item.value,`Público: ${item.label}`]),...collections.map(row=>['collection',String(row.id),`Colección: ${row.payload?.name||row.id}`])].filter(([type,value])=>!rules.some(rule=>rule.type===type&&rule.value===value));
    if(options.length){const select=el('select');select.append(new Option('＋ Agregar al final…',''));for(const [type,value,label] of options)select.append(new Option(label,`${type}|${value}`));select.onchange=()=>{if(!select.value)return;const [type,value]=select.value.split('|');remember();rules.push({type,value});setDirty();renderPanel();};const wrap=el('label',null,'control');wrap.append(select);last.append(wrap);}
    last.append(el('p','Recordá tocar «Publicar».','element-help'));box.append(last);
    baseOrder(panel);
  };

  /* ——— Capas y vista previa ——— */
  const baseLayers=renderLayers;
  renderLayers=function(panel){baseLayers(panel);const tree=panel.querySelector('.layer-tree');if(!tree||tree.querySelector('[data-content-layer]'))return;let after=[...tree.querySelectorAll('.layer-item')].find(item=>/Datos de las prendas/.test(item.textContent||''));
    for(const [id,label] of [['pages','Páginas y menú'],['sizeTables','Guías de talles']]){const row=el('div',null,`layer-item${selectedLayer===id?' active':''}`);row.dataset.contentLayer='1';row.append(button(label,()=>showLayer(id)));after?after.after(row):tree.append(row);after=row;}};
  renderers.layers=renderLayers;
  // Si se está editando un bloque de una página, la vista previa muestra esa página; al salir, vuelve al catálogo.
  const baseRender=renderPanel;
  renderPanel=function(){baseRender();try{if(selectedLayer==='pages')return;const managed=typeof managedSectionSelection==='function'?managedSectionSelection():null,location=managed?.section?.location||'';const page=location.startsWith('page:')?(settings.pages||[]).find(item=>`page:${item.id}`===location):null;showInPreview(page||null);}catch{}};
  if(typeof settings!=='undefined'&&settings&&['layers','cart'].includes(selectedLayer))renderPanel();
})();
