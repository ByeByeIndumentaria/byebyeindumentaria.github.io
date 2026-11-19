'use strict';
/* Editor visual · Etapa 3: buscador de todo el editor y editor completo desde el celular.
   Se carga después de settings.js y settings-elements.js.
   - "¿Qué querés cambiar?" busca en TODAS las secciones (antes sólo filtraba el panel abierto) y lleva a la opción.
   - En el celular, botón "Más": pantallas (ficha, pedido, filtros), Estilo, Textos, Orden, Categorías, Google,
     Historial, Rehacer, Vista previa, Manual y modo Editar/Navegar, que antes no se podían abrir desde el teléfono.
   - Al tocar un elemento en el celular, el panel se abre a media altura para seguir viendo la vista previa. */
(()=>{
  const isPhone=()=>innerWidth<=900;
  const normalize=text=>String(text||'').toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'');
  const synonyms={carrito:'pedido',carro:'pedido',bolsa:'pedido',banner:'flyer',portada:'flyer',slider:'flyer',letra:'texto',tipografia:'fuente',fuente:'tipografia',celu:'celular',telefono:'celular',movil:'celular',logo:'logo',precio:'precio',plata:'precio',boton:'boton',wsp:'whatsapp',whats:'whatsapp',redes:'pie',footer:'pie',cabecera:'encabezado',header:'encabezado',menu:'encabezado',filtro:'filtros',buscador:'busqueda',orden:'orden',fondo:'fondo',color:'color',minimo:'minimo',talle:'talles',foto:'foto',imagen:'foto'};
  const indexedLayers=['announcementBar','header','searchBar','filtersPanel','grid','card','productModal','pricing','colors','cart','whatsapp','footer','theme','text','seo'];
  const staticEntries=[
    ['Flyers, portada y banners','hero','flyer portada banner foto principal carrusel'],
    ['Orden de las prendas','order','orden prendas mover primero ultimo'],
    ['Categorías de prendas','categories','categorias tipos de prenda renombrar unir'],
    ['Agregar una sección o bloque','add','agregar seccion bloque aviso texto boton preguntas contacto'],
    ['Historial de publicaciones','history','historial version anterior recuperar'],
    ['Capas: todas las partes del catálogo','layers','capas partes secciones'],
    ['Editar una prenda (tocala en la vista previa)','layers','prenda producto nombre codigo foto talle color stock'],
    ['Botón del pedido (carrito): texto, ícono y lado','header','carrito pedido boton icono bolsa color colores'],
    ['Logo y nombre de la marca','header','logo marca imagen nombre subir'],
    ['Color, letra o tamaño de un botón o texto: tocalo en la vista previa','layers','color colores boton letra tamano negrita fondo borde esquinas estilo mayusculas']
  ];
  const stopWords=new Set(['de','del','la','el','los','las','en','y','o','un','una','para','con','al','que','a','mi','como','cambiar','quiero','poner']);
  const wordsOf=text=>normalize(text).split(/[^a-z0-9ñ]+/).filter(Boolean);
  const hit=(words,term)=>words.some(word=>word.startsWith(term));
  let searchIndex=null;
  function buildIndex(){
    const entries=staticEntries.map(([label,layer,words])=>({label,layer,area:layerMeta[layer]?.[0]||'',text:normalize(`${label} ${words}`),pinned:true}));
    const keepLayer=selectedLayer,keepId=selectedEditId,keepLabel=selectedEditLabel;
    try{
      selectedEditId='';selectedEditLabel='';
      for(const layer of indexedLayers){
        const render=renderers[layer];if(!render)continue;const temp=el('div');selectedLayer=layer;
        try{render(temp);}catch{continue;}
        const area=layerMeta[layer]?.[0]||layer;
        for(const node of temp.querySelectorAll('[data-search], .control, .toggle')){const label=(node.querySelector(':scope > span')?.textContent||node.querySelector('span')?.textContent||node.textContent||'').trim().slice(0,70);if(label)entries.push({label,layer,area,text:normalize(`${node.dataset.search||''} ${label} ${area}`)});}
        for(const heading of temp.querySelectorAll('h3')){const label=heading.textContent.trim();entries.push({label,layer,area,text:normalize(`${label} ${area}`),heading:true});}
      }
    }finally{selectedLayer=keepLayer;selectedEditId=keepId;selectedEditLabel=keepLabel;}
    const seen=new Set();return entries.filter(entry=>{const key=`${entry.layer}|${entry.label}`;if(seen.has(key))return false;seen.add(key);return true;});
  }
  function search(query){
    const terms=wordsOf(query).filter(word=>!stopWords.has(word)).map(word=>synonyms[word]&&synonyms[word]!==word?[word,synonyms[word]]:[word]);
    if(!terms.length)return[];
    searchIndex??=buildIndex();
    return searchIndex.map(entry=>{const all=wordsOf(entry.text),label=wordsOf(entry.label);if(!terms.every(options=>options.some(term=>hit(all,term))))return{entry,score:0};const inLabel=terms.filter(options=>options.some(term=>hit(label,term))).length;return{entry,score:1+inLabel*2+(entry.heading?1:0)+(entry.pinned?1:0)};}).filter(item=>item.score).sort((a,b)=>b.score-a.score).slice(0,14).map(item=>item.entry);
  }
  function goTo(entry){
    selectedEditId='';selectedEditLabel='';$('selection-path').replaceChildren();$('selection-toolbar').hidden=true;
    $('settings-search').value='';showLayer(entry.layer);if(isPhone())setSheetState('half');
    requestAnimationFrame(()=>{const target=[...document.querySelectorAll('#panel-content [data-search], #panel-content h3')].find(node=>(node.matches('h3')?node.textContent:node.querySelector(':scope > span')?.textContent||node.textContent).trim().startsWith(entry.label));if(target){target.scrollIntoView({block:'center'});target.classList.add('search-flash');setTimeout(()=>target.classList.remove('search-flash'),1800);}});
  }
  function resultsList(query,onPick){
    const list=el('div',null,'search-results'),results=search(query);
    if(!query.trim())return list;
    if(!results.length){list.append(el('p','No encontramos esa opción. Probá con otra palabra, por ejemplo “color”, “logo” o “precio”.','search-empty'));return list;}
    for(const entry of results){const item=button('',()=>onPick(entry),'search-result');item.append(el('strong',entry.label),el('small',entry.area));list.append(item);}
    return list;
  }

  /* ——— Buscador de la barra superior (computadora) ——— */
  const searchBox=$('settings-search'),dropdown=el('div',null,'search-dropdown');dropdown.hidden=true;searchBox.closest('label')?.append(dropdown);
  searchBox.setAttribute('autocomplete','off');
  searchBox.oninput=()=>{const query=searchBox.value;dropdown.replaceChildren(resultsList(query,entry=>{dropdown.hidden=true;goTo(entry);}));dropdown.hidden=!query.trim();};
  searchBox.addEventListener('keydown',event=>{if(event.key==='Escape'){searchBox.value='';dropdown.hidden=true;}if(event.key==='Enter'){event.preventDefault();dropdown.querySelector('.search-result')?.click();}});
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.settings-search'))dropdown.hidden=true;});

  /* El buscador ya no esconde opciones del panel abierto: ahora lleva a la opción en cualquier sección. */
  filterControls=function(){document.querySelectorAll('#panel-content .search-hidden').forEach(node=>node.classList.remove('search-hidden'));};

  /* ——— Menú "Más" del celular ——— */
  function openMoreSheet(){
    const dialog=el('dialog',null,'mobile-more'),box=el('div',null,'mobile-more-box'),close=()=>{dialog.close();};
    dialog.addEventListener('close',()=>dialog.remove());
    const head=el('div',null,'mobile-more-head');head.append(el('h2','Más opciones'),button('×',close,'mobile-more-close'));head.lastChild.setAttribute('aria-label','Cerrar');
    const input=el('input');input.type='search';input.placeholder='¿Qué querés cambiar?';input.className='mobile-more-search';input.setAttribute('aria-label','Buscar una opción');
    const results=el('div');input.oninput=()=>results.replaceChildren(resultsList(input.value,entry=>{close();goTo(entry);}));
    const section=(title,items)=>{const wrap=el('section',null,'mobile-more-section');wrap.append(el('h3',title));const grid=el('div',null,'mobile-more-grid');for(const [label,action,active] of items)grid.append(button(label,()=>{close();action();},active?'active':''));wrap.append(grid);return wrap;};
    const screens=[['catalog','Catálogo'],['product','Ficha de producto'],['filters','Filtros abiertos'],['cart-filled','Pedido con prendas'],['cart-empty','Pedido vacío'],['empty-results','Búsqueda sin resultados']];
    box.append(head,input,results,
      section('Ver en la vista previa',screens.map(([screen,label])=>[label,()=>openPreviewScreen(screen),previewScreen===screen])),
      section('Editar',[['Colores y letras',()=>showLayer('theme')],['Todos los textos',()=>showLayer('text')],['Orden de prendas',()=>showLayer('order')],['Categorías',()=>showLayer('categories')],['Google y compartir',()=>showLayer('seo')],['Historial',()=>showLayer('history')]]),
      section('Acciones',[['Rehacer',()=>redo()],['Vista previa en pestaña nueva ↗',()=>$('preview').click()],[interactionMode==='edit'?'Modo navegar (probar el catálogo)':'Modo editar (tocar para editar)',()=>setInteractionMode(interactionMode==='edit'?'navigate':'edit')],['Manual ↗',()=>window.open('../manual/','_blank','noopener')]]));
    dialog.append(box);document.body.append(dialog);dialog.showModal();
  }
  const bar=document.querySelector('.mobile-actions');
  if(bar&&!bar.querySelector('[data-mobile-action="more"]')){const more=el('button','Más');more.type='button';more.dataset.mobileAction='more';more.onclick=openMoreSheet;bar.insertBefore(more,bar.lastElementChild);}

  /* ——— Al tocar un elemento en el celular, el panel queda a media altura ——— */
  const previousSelect=selectPreviewElement;
  selectPreviewElement=function(message){previousSelect(message);if(isPhone())setSheetState('half');};
  /* El índice se rehace cuando cambian prendas o categorías. */
  const previousSetDirty=setDirty;
  setDirty=function(){searchIndex=null;return previousSetDirty();};
})();
