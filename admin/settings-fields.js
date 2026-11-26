'use strict';
/* Editor visual · "Datos de las prendas": lo que tu socia quiere AGREGAR a las prendas.
   - Datos propios (settings.productFields): Tela, Temporada, Cuidados… con su tipo (texto, lista, sí/no, número),
     y si se muestran en la ficha, se usan como filtro o se buscan.
   - Etiquetas libres (settings.productTags): se ponen en cada prenda; pueden ser filtro y buscarse.
   - Públicos (settings.audiences): Mujer, Hombre… y los que quiera agregar.
   Lo que cada prenda tiene cargado se completa en Administración (ventana de la prenda o planilla). */
(()=>{
  layerMeta.productData=['Datos de las prendas','Datos'];
  const TYPES=[['text','Texto libre'],['options','Lista de opciones'],['yesno','Sí / No'],['number','Número']];
  const SUGGESTIONS=['Tela','Composición','Temporada','Cuidados','Largo','Calce','Origen','Estampa'];
  const clean=text=>String(text||'').replace(/[<>"`]/g,'').trim();
  const slug=text=>clean(text).toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'dato';
  const used=()=>products.filter(product=>!product.archived);
  const fieldCount=id=>used().filter(product=>{const value=product.fields?.[id];return value!==undefined&&value!==''&&value!==null;}).length;
  const tagCounts=()=>{const counts=new Map();for(const product of used())for(const tag of product.tags||[]){const key=String(tag);counts.set(key,(counts.get(key)||0)+1);}return [...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'es'));};
  function input(value,onInput,placeholder=''){const node=el('input');node.type='text';node.value=value||'';node.placeholder=placeholder;node.oninput=()=>onInput(node.value);node.onfocus=()=>remember();return node;}
  function check(label,checked,onChange,help=''){const wrap=el('label',null,'toggle');const box=el('input');box.type='checkbox';box.checked=!!checked;box.onchange=()=>{remember();onChange(box.checked);setDirty();renderPanel();};wrap.append(el('span',label),box);if(help)wrap.title=help;return wrap;}
  function addField(label){remember();settings.productFields??=[];const taken=new Set(settings.productFields.map(field=>field.id));let id=slug(label),n=2;while(taken.has(id))id=`${slug(label)}-${n++}`;settings.productFields.push({id,label:clean(label)||'Nuevo dato',type:'text',options:[],showInModal:true,filter:false,search:true});setDirty();renderPanel();notify(`Listo: «${clean(label)||'Nuevo dato'}». Ahora completalo en cada prenda desde Administración (ventana de la prenda o Planilla).`);}

  renderers.productData=panel=>{
    settings.productFields??=[];settings.productTags??={enabled:true,filter:false,search:true,label:'Etiquetas'};settings.audiences??=[];
    /* Datos propios */
    let box=group('Datos propios de las prendas','Agregá la información que quieras tener en cada prenda. Después se completa en Administración, en la ventana de la prenda o en la Planilla.');
    if(!settings.productFields.length)box.append(el('p','Todavía no agregaste ningún dato.','panel-empty'));
    settings.productFields.forEach((field,index)=>{
      const card=el('article',null,'item-card field-card'),head=el('div',null,'item-card-head'),actions=el('div',null,'mini-actions');
      head.append(el('strong',field.label||'Sin nombre'),el('small',`${fieldCount(field.id)} prendas lo tienen`,'field-count'));
      const up=button('↑',()=>{remember();const list=settings.productFields;[list[index-1],list[index]]=[list[index],list[index-1]];setDirty();renderPanel();}),down=button('↓',()=>{remember();const list=settings.productFields;[list[index+1],list[index]]=[list[index],list[index+1]];setDirty();renderPanel();});up.disabled=index===0;down.disabled=index===settings.productFields.length-1;up.title='Subir';down.title='Bajar';
      const remove=button('Quitar',()=>{const count=fieldCount(field.id);if(!confirm(count?`«${field.label}» está cargado en ${count} prendas. Si lo quitás deja de mostrarse (lo cargado no se borra de las prendas y vuelve si lo agregás con el mismo nombre). ¿Quitarlo?`:`¿Quitar «${field.label}»?`))return;remember();settings.productFields.splice(index,1);setDirty();renderPanel();},'danger-text');
      actions.append(up,down,remove);head.append(actions);card.append(head);
      const name=el('label',null,'control');name.append(el('span','Nombre del dato'),input(field.label,value=>{field.label=clean(value);head.querySelector('strong').textContent=field.label||'Sin nombre';setDirty();},'Ej. Tela'));card.append(name);
      const type=el('label',null,'control'),select=el('select');for(const [value,text] of TYPES)select.append(new Option(text,value));select.value=field.type||'text';select.onchange=()=>{remember();field.type=select.value;setDirty();renderPanel();};type.append(el('span','Tipo'),select);card.append(type);
      if(field.type==='options'){const list=el('label',null,'control'),area=el('textarea');area.rows=2;area.value=(field.options||[]).join(', ');area.placeholder='Ej. Algodón, Lino, Morley';area.onfocus=()=>remember();area.oninput=()=>{field.options=[...new Set(area.value.split(',').map(clean).filter(Boolean))];setDirty();};list.append(el('span','Opciones, separadas por coma'),area);card.append(list);}
      if(field.type==='number'){const unit=el('label',null,'control');unit.append(el('span','Unidad (opcional)'),input(field.suffix,value=>{field.suffix=clean(value).slice(0,12);setDirty();},'Ej. cm, %'));card.append(unit);}
      card.append(check('Mostrar en la ficha de la prenda',field.showInModal!==false,value=>{field.showInModal=value;}),check('Usar como filtro',field.filter===true,value=>{field.filter=value;},'Aparece en el panel de filtros del catálogo'),check('Que el buscador lo encuentre',field.search!==false,value=>{field.search=value;}));
      box.append(card);
    });
    const add=el('div',null,'field-add'),custom=el('input');custom.type='text';custom.placeholder='Nombre del dato nuevo';const addButton=button('＋ Agregar dato',()=>{if(!clean(custom.value))return custom.focus();addField(custom.value);},'primary');custom.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();addButton.click();}};add.append(custom,addButton);box.append(add);
    const existing=new Set(settings.productFields.map(field=>field.label.toLocaleLowerCase('es'))),chips=el('div',null,'field-suggestions');chips.append(el('span','Ideas:'));for(const label of SUGGESTIONS.filter(label=>!existing.has(label.toLocaleLowerCase('es'))))chips.append(button(`＋ ${label}`,()=>addField(label)));box.append(chips);panel.append(box);

    /* Etiquetas */
    const tags=settings.productTags;box=group('Etiquetas','Palabras libres que se ponen a cada prenda (Oferta, Básicos, Viaje…). Sirven para filtrar, buscar y, pronto, para armar filas de prendas.');
    box.append(check('Usar etiquetas',tags.enabled!==false,value=>{tags.enabled=value;}),check('Mostrarlas como filtro',tags.filter===true,value=>{tags.filter=value;}),check('Que el buscador las encuentre',tags.search!==false,value=>{tags.search=value;}));
    const tagLabel=el('label',null,'control');tagLabel.append(el('span','Título en el panel de filtros'),input(tags.label||'Etiquetas',value=>{tags.label=clean(value)||'Etiquetas';setDirty();}));box.append(tagLabel);
    const counts=tagCounts(),list=el('div',null,'tag-cloud');if(counts.length)for(const [tag,count] of counts)list.append(el('span',`${tag} · ${count}`,'tag-chip'));else list.append(el('small','Todavía ninguna prenda tiene etiquetas. Se ponen en Administración: en la ventana de la prenda, en la Planilla o a varias juntas con «Agregar etiqueta…».'));box.append(list);panel.append(box);

    /* Públicos */
    box=group('Públicos','Para quién es cada prenda (aparece en la tarjeta y como filtro). Podés cambiar los nombres o agregar públicos nuevos.');
    settings.audiences.forEach((audience,index)=>{
      const row=el('div',null,'audience-row'),count=used().filter(product=>product.category===audience.value).length;
      row.append(input(audience.label,value=>{audience.label=clean(value)||audience.value;setDirty();}),el('small',`${count} prendas`,'field-count'));
      const remove=button('Quitar',()=>{if(count)return notify(`No se puede quitar: ${count} prendas usan «${audience.label}». Cambiales el público primero (Planilla o «Cambiar público…»).`);remember();settings.audiences.splice(index,1);setDirty();renderPanel();},'danger-text');row.append(remove);box.append(row);
    });
    const newAudience=el('div',null,'field-add'),audienceName=el('input');audienceName.type='text';audienceName.placeholder='Ej. Bebés, Talles grandes';
    const addAudience=button('＋ Agregar público',()=>{const label=clean(audienceName.value);if(!label)return audienceName.focus();const value=label.toLocaleUpperCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0,30);if(settings.audiences.some(item=>item.value===value))return notify('Ese público ya existe.');remember();settings.audiences.push({value,label});setDirty();renderPanel();notify(`Listo: «${label}». Ya se puede elegir en cada prenda.`);},'primary');
    newAudience.append(audienceName,addAudience);box.append(newAudience);panel.append(box);
    panel.append(el('p','Con «Guardar» los datos nuevos ya aparecen en Administración para completarlos. Para que las clientas los vean, tocá «Publicar».','element-help'));
  };

  const baseGrid=renderers.grid;renderers.grid=panel=>{baseGrid(panel);panel.append(button('Datos de las prendas →',()=>{selectedEditId='';selectedEditLabel='';showLayer('productData');},'panel-link'));};renderers.products=renderers.grid;
  const baseLayers=renderLayers;
  renderLayers=function(panel){baseLayers(panel);const tree=panel.querySelector('.layer-tree');if(!tree||tree.querySelector('[data-data-layer]'))return;const row=el('div',null,`layer-item${selectedLayer==='productData'?' active':''}`);row.dataset.dataLayer='1';row.append(button('Datos de las prendas',()=>showLayer('productData')));const after=[...tree.querySelectorAll('.layer-item')].find(item=>/Funciones para las clientas/.test(item.textContent||''));after?after.after(row):tree.append(row);};
  renderers.layers=renderLayers;
  if(typeof settings!=='undefined'&&settings&&['layers','grid','products'].includes(selectedLayer))renderPanel();
})();
