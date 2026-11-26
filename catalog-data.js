'use strict';
/* Catálogo · datos propios, etiquetas y públicos definidos en el editor visual ("Datos de las prendas").
   - Ficha: muestra los datos marcados "Mostrar en la ficha" (Tela: Algodón…).
   - Filtros: cada dato marcado "Usar como filtro" y las etiquetas (si están prendidas) suman un grupo al panel.
   - Buscador: script.js suma CatalogData.searchValues(p).
   - Públicos: nombres editables y públicos nuevos en el filtro y en la tarjeta.
   Se carga después de script.js. */
(()=>{
  const decoder=document.createElement('textarea');
  const plain=value=>{decoder.innerHTML=String(value??'');return decoder.value;};
  const norm=value=>plain(value).toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
  const settings=()=>window.CatalogSiteSettings||{};
  const fields=()=>(Array.isArray(settings().productFields)?settings().productFields:[]).filter(field=>field&&field.id&&field.label);
  const tagsConfig=()=>({enabled:true,filter:false,search:true,label:'Etiquetas',...(settings().productTags||{})});
  const display=(field,value)=>{if(value===true)return'Sí';if(value===false)return'No';if(value===''||value===null||value===undefined)return'';return `${plain(value)}${field.type==='number'&&field.suffix?` ${plain(field.suffix)}`:''}`;};
  const valueOf=(p,field)=>p?.fields?.[field.id];

  /* Buscador */
  function searchValues(p){const out=[];for(const field of fields())if(field.search!==false){const value=display(field,valueOf(p,field));if(value)out.push(value);}if(tagsConfig().enabled!==false&&tagsConfig().search!==false)out.push(...(p?.tags||[]).map(plain));return out;}

  /* Filtros */
  const filterTypes=()=>{const list=fields().filter(field=>field.filter===true).map(field=>({type:`field:${field.id}`,label:plain(field.label),values:p=>{const value=display(field,valueOf(p,field));return value?[norm(value)]:[];},labelOf:p=>display(field,valueOf(p,field)),order:field.type==='options'?(field.options||[]).map(norm):null}));
    const tags=tagsConfig();if(tags.enabled!==false&&tags.filter===true)list.push({type:'tags',label:plain(tags.label||'Etiquetas'),values:p=>(p.tags||[]).map(norm),labelsOf:p=>(p.tags||[]).map(plain)});return list;};
  if(typeof productExtraFilterValues==='function'){const base=productExtraFilterValues;productExtraFilterValues=function(product,type){const custom=filterTypes().find(item=>item.type===type);return custom?custom.values(product):base(product,type);};}
  function buildCustomFilters(){
    const panel=document.querySelector('#filters-panel .filters-drawer-body, #filters-panel')||null;const anchor=document.getElementById('availability-filter-group')||document.getElementById('packing-filter-group');if(!anchor||typeof activeExtraFilters==='undefined')return;
    const types=filterTypes(),wanted=new Set(types.map(item=>item.type));
    document.querySelectorAll('.custom-filter-group').forEach(node=>{if(!wanted.has(node.dataset.customType)){delete activeExtraFilters[node.dataset.customType];node.remove();}});
    for(const key of Object.keys(activeExtraFilters))if((key==='tags'||key.startsWith('field:'))&&!wanted.has(key))delete activeExtraFilters[key];
    const base=getCollectionProducts().filter(product=>(activeGender==='all'||product.category===activeGender)&&(activeCategory==='all'||getProductSubcategories(product).includes(activeCategory)));
    let after=anchor;
    for(const item of types){
      activeExtraFilters[item.type]??=new Set();
      let group=document.querySelector(`.custom-filter-group[data-custom-type="${CSS.escape(item.type)}"]`);
      if(!group){group=document.createElement('div');group.className='filter-group filter-menu-level extra-filter-group custom-filter-group';group.dataset.customType=item.type;group.dataset.filterGroup=item.type;const label=document.createElement('span');label.className='filter-label';const pills=document.createElement('div');pills.className='filter-pills';group.append(label,pills);}
      after.after(group);after=group;group.querySelector('.filter-label').textContent=item.label;
      const labels=new Map();for(const product of base){const values=item.values(product),names=item.labelsOf?item.labelsOf(product):[item.labelOf(product)];values.forEach((value,index)=>{if(value&&!labels.has(value))labels.set(value,names[index]||value);});}
      let options=[...labels];if(item.order)options.sort((a,b)=>{const ia=item.order.indexOf(a[0]),ib=item.order.indexOf(b[0]);return (ia<0?999:ia)-(ib<0?999:ib)||a[1].localeCompare(b[1],'es',{numeric:true});});else options.sort((a,b)=>a[1].localeCompare(b[1],'es',{numeric:true,sensitivity:'base'}));
      const selected=activeExtraFilters[item.type];for(const value of [...selected])if(!labels.has(value))selected.delete(value);
      group.hidden=!options.length;
      group.querySelector('.filter-pills').replaceChildren(...options.map(([value,label])=>{const button=document.createElement('button');button.type='button';button.className=`pill${selected.has(value)?' active':''}`;button.dataset.extraFilter=item.type;button.dataset.value=value;button.textContent=label;return button;}));
    }
  }
  if(typeof buildExtraFilters==='function'){const base=buildExtraFilters;buildExtraFilters=function(...args){const result=base.apply(this,args);try{buildCustomFilters();updateAudiences();}catch(error){console.warn('Filtros propios:',error);}return result;};}

  /* Públicos: nombres editables y públicos nuevos */
  const audiences=()=>Array.isArray(settings().audiences)&&settings().audiences.length?settings().audiences:null;
  if(typeof getGenderLabel==='function'){const base=getGenderLabel;getGenderLabel=function(category){const match=audiences()?.find(item=>item.value===category);return match?plain(match.label):base(category);};}
  function updateAudiences(){
    const container=document.getElementById('gender-filters'),list=audiences();if(!container||!list)return;
    const present=new Set(getCollectionProducts().map(product=>product.category));
    for(const item of list){let pill=container.querySelector(`.pill[data-value="${CSS.escape(item.value)}"]`);
      if(!pill){pill=document.createElement('button');pill.className='pill custom-audience';pill.dataset.filter='gender';pill.dataset.value=item.value;container.append(pill);}
      pill.textContent=plain(item.label);if(pill.classList.contains('custom-audience'))pill.style.display=present.has(item.value)?'':'none';pill.classList.toggle('active',typeof activeGender!=='undefined'&&activeGender===item.value);}
  }

  /* Ficha de la prenda */
  function decorateModal(p){
    document.getElementById('product-fields')?.remove();if(!p)return;
    const rows=fields().filter(field=>field.showInModal!==false).map(field=>[plain(field.label),display(field,valueOf(p,field))]).filter(([,value])=>value);
    if(!rows.length)return;const list=document.createElement('dl');list.id='product-fields';list.className='product-fields';list.dataset.editId='productData';list.dataset.editLabel='Datos de la prenda';
    for(const [label,value] of rows){const term=document.createElement('dt'),detail=document.createElement('dd');term.textContent=label;detail.textContent=value;list.append(term,detail);}
    // La ficha ordena sus partes con CSS (order); el bloque toma el mismo lugar que la descripción y va justo después.
    const anchor=document.getElementById('modal-desc')||document.getElementById('modal-name');if(!anchor)return;anchor.after(list);const order=getComputedStyle(anchor).order;if(order&&order!=='0')list.style.order=order;
  }
  if(typeof openModal==='function'){const base=openModal;openModal=function(p,...args){const result=base.call(this,p,...args);try{decorateModal(p);}catch(error){console.warn(error);}return result;};}
  window.addEventListener('catalog-site-settings-applied',()=>setTimeout(()=>{try{if(typeof currentModalProduct!=='undefined'&&currentModalProduct)decorateModal(currentModalProduct);updateAudiences();}catch{}},0));

  window.CatalogData={searchValues,fields,display};
})();
