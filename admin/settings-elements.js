'use strict';
/* Editor visual · Etapa 2: tocar un elemento y editar exactamente ese.
   Se carga después de settings.js y usa sus funciones globales (settings, remember, setDirty, showLayer, etc.).
   - Panel "Este elemento": texto, color de letra, fondo, borde, tamaño, grosor, mayúsculas, alineación, esquinas, mostrar/ocultar y restaurar.
   - Tocar el nombre o la foto de una prenda permite editar esa prenda.
   - Paneles cortos: Grilla, Tarjeta, Pedido, Pie, Precios y Muestras de color por separado.
   - Abrir una sección lleva la vista previa a esa parte del catálogo.
   - "Restaurar esta sección" vuelve una sección al diseño original. */
(()=>{
  Object.assign(layerMeta,{pricing:['Precios','Precios'],colors:['Muestras de color','Colores'],product:['Prenda','Prenda']});
  Object.assign(publishAreaLabels,{elementStyles:'Colores y estilos de elementos'});
  /* Ocultar un botón oculta sólo ese botón (antes "Ocultar" en el botón de WhatsApp apagaba todo el pedido). */
  const exactVisibility={...visibilityPaths,'cart.whatsappButton':'cart.showWhatsapp','cart.pdfButton':'cart.showPdf','cart.clearButton':'cart.showClear','header.cartButton':'header.showCart','header.tagline':'header.showTagline','grid.customerSort':'grid.customerSort','relatedProducts':'relatedProducts.enabled'};
  const neverHide=new Set(['grid','card','productModal','filtersPanel','card.image','productModal.image','productModal.title']);
  const containerIds=new Set(['announcementBar','header','hero','searchBar','filtersPanel','grid','card','productModal','cart','whatsapp','footer','relatedProducts','cart.customerFields','cart.quantities','productModal.curve','productModal.colors','productModal.sizes']);
  let selectingFromPreview=false,selectedComputed=null,selectedProductName='';

  function elementKind(id){
    if(containerIds.has(id)||/^section\.[^.]+$/.test(id)||/^hero\.banners\.\d+$/.test(id))return'container';
    if(/^(card\.image|productModal\.image|productModal\.video)$/.test(id))return'image';
    if(/(Button|Badge|\.buttonLabel)$/.test(id)||id==='searchBar.placeholder'||id==='grid.customerSort')return'button';
    return'text';
  }
  function scopeHint(id){
    if(id.startsWith('card'))return'Se aplica a todas las tarjetas de prendas.';
    if(id.startsWith('productModal'))return'Se aplica a la ficha de todas las prendas.';
    if(id.startsWith('hero.banners.'))return'Sólo este flyer.';
    return'Los cambios se ven al instante en la vista previa.';
  }
  const styleOf=id=>settings.elementStyles?.[id]||{};
  function styleSet(id,prop,value){
    remember();settings.elementStyles??={};const style=settings.elementStyles[id]??={};
    if(value===''||value===null||value===undefined)delete style[prop];else style[prop]=value;
    if(!Object.keys(style).length)delete settings.elementStyles[id];
    setDirty();
  }
  function toHex(value){
    const match=String(value||'').match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/i);
    if(!match||(match[4]!==undefined&&Number(match[4])===0))return null;
    return'#'+[match[1],match[2],match[3]].map(part=>Number(part).toString(16).padStart(2,'0')).join('');
  }
  const hidePathFor=id=>exactVisibility[id]||null;
  const canHide=id=>!!id&&!neverHide.has(id)&&!id.startsWith('texts.');
  function isHidden(id){const path=hidePathFor(id);return path?pathGet(path)===false:styleOf(id).hidden===true;}
  function toggleHidden(id){const path=hidePathFor(id);if(path)mutate(path,pathGet(path)===false);else styleSet(id,'hidden',isHidden(id)?'':true);}
  function clearSelection(){selectedEditId='';selectedEditLabel='';selectedComputed=null;$('selection-path').replaceChildren();$('selection-toolbar').hidden=true;}

  /* ——— Controles del panel "Este elemento" ——— */
  function colorField(label,id,prop,fallback){
    const wrap=el('div',null,'control element-field');wrap.dataset.search=label.toLocaleLowerCase('es');wrap.append(el('span',label));
    const current=styleOf(id)[prop],row=el('div',null,'element-color-row'),input=el('input'),state=el('small',current?'Color propio':'Automático','element-state');
    input.type='color';input.value=current||fallback||'#000000';input.setAttribute('aria-label',label);
    const reset=button('Quitar',()=>{styleSet(id,prop,'');renderPanel();},'reset-button');reset.hidden=!current;
    input.oninput=()=>{styleSet(id,prop,input.value);state.textContent='Color propio';reset.hidden=false;};
    row.append(input,state,reset);wrap.append(row);return wrap;
  }
  function rangeField(label,id,prop,min,max,fallback){
    const wrap=el('div',null,'control element-field');wrap.dataset.search=label.toLocaleLowerCase('es');
    const current=styleOf(id)[prop],title=el('span',label),row=el('div',null,'element-range-row'),input=el('input'),value=el('small','','element-state');
    const show=number=>{value.textContent=current===undefined&&Number(number)===Number(fallback)?`Automático (${Math.round(number)} px)`:`${Math.round(number)} px`;};
    input.type='range';input.min=min;input.max=max;input.step=1;input.value=current??Math.round(fallback||min);input.setAttribute('aria-label',label);show(input.value);
    const reset=button('Quitar',()=>{styleSet(id,prop,'');renderPanel();},'reset-button');reset.hidden=current===undefined;
    input.oninput=()=>{styleSet(id,prop,Number(input.value));value.textContent=`${input.value} px`;reset.hidden=false;};
    row.append(input,value,reset);wrap.append(title,row);return wrap;
  }
  function choiceField(label,id,prop,choices){
    const wrap=el('div',null,'control');wrap.dataset.search=label.toLocaleLowerCase('es');wrap.append(el('span',label));
    const row=el('div',null,'segmented'),current=styleOf(id)[prop]||'';
    for(const [value,text] of choices){const option=button(text,()=>{styleSet(id,prop,value);renderPanel();},current===value?'active':'');row.append(option);}
    wrap.append(row);return wrap;
  }
  function visibilityField(id){
    const wrap=el('label',null,'toggle element-visibility'),input=el('input');wrap.dataset.search='mostrar ocultar';
    input.type='checkbox';input.checked=!isHidden(id);input.onchange=()=>{toggleHidden(id);configureSelectionActions();renderPanel();};
    wrap.append(el('span','Mostrar este elemento'),input);
    const help=el('p',hidePathFor(id)?'':'Oculto se ve transparente en el editor para que puedas volver a mostrarlo. Las clientas no lo ven.','element-help');
    const box=el('div');box.append(wrap);if(help.textContent)box.append(help);return box;
  }
  function elementGroup(id){
    const kind=elementKind(id),computed=selectedComputed||{},box=group(`Este elemento · ${selectedEditLabel||id}`,scopeHint(id));box.classList.add('element-group');
    const text=pathGet(id);
    if(typeof text==='string'&&kind!=='container'&&kind!=='image'){const field=control('Texto',id,text.length>60?{type:'textarea',rows:3}:{});box.append(field);}
    if(selectedProductId&&/^(card|productModal)/.test(id)){
      const name=selectedProductName||products.find(item=>Number(item.id)===Number(selectedProductId))?.name||'esta prenda';
      box.append(button(`✎ Editar la prenda «${name}»: nombre, fotos, colores, talles`,()=>{showLayer('product');},'element-product-button'));
    }
    if(kind!=='image')box.append(colorField(kind==='container'?'Color de las letras':'Color de letra',id,'color',toHex(computed.color)));
    if(kind==='button'||kind==='container')box.append(colorField(kind==='container'?'Color de fondo':'Color del botón',id,'background',toHex(computed.background)||'#ffffff'));
    if(kind==='button')box.append(colorField('Color del borde',id,'borderColor',toHex(computed.color)));
    if(kind==='text'||kind==='button'){
      box.append(rangeField('Tamaño de letra',id,'fontSize',9,64,computed.fontSize||14));
      box.append(choiceField('Grosor',id,'fontWeight',[['','Como está'],['normal','Fino'],['medium','Medio'],['bold','Negrita']]));
      box.append(choiceField('Mayúsculas',id,'textTransform',[['','Como está'],['upper','MAYÚS'],['lower','minús'],['title','Título']]));
      box.append(choiceField('Alineación',id,'textAlign',[['','Como está'],['left','Izq.'],['center','Centro'],['right','Der.']]));
    }
    if(kind==='button'||kind==='image')box.append(rangeField('Esquinas redondeadas',id,'radius',0,60,computed.radius||0));
    if(kind==='text'||kind==='button')box.append(rangeField('Tamaño de letra en celular',id,'fontSizeMobile',9,64,styleOf(id).fontSize??computed.fontSize??14));
    if(canHide(id)){box.append(visibilityField(id));box.append(choiceField('Dónde se ve',id,'showOn',[['','Compu y celular'],['desktop','Solo compu'],['mobile','Solo celular']]));}
    if(settings.elementStyles?.[id])box.append(button('↺ Restaurar este elemento como estaba',()=>{remember();delete settings.elementStyles[id];setDirty();configureSelectionActions();renderPanel();notify('Elemento restaurado.');},'element-reset'));
    return box;
  }

  /* ——— Paneles cortos y separados ——— */
  function pick(render,titles){const temp=el('div');render(temp);return [...temp.querySelectorAll(':scope > section.field-group, :scope > .field-group')].filter(node=>titles.includes(node.querySelector('h3')?.textContent?.trim()));}
  function panelLink(label,layer){return button(`${label} →`,()=>{clearSelection();showLayer(layer);},'panel-link');}
  function links(...items){const box=el('div',null,'panel-links');box.append(el('span','También podés editar','panel-links-title'),...items);return box;}
  renderers.grid=panel=>{panel.append(...pick(renderProducts,['Grilla','Orden para las clientas','Colección inicial','Fechas de preventa']),links(panelLink('Tarjeta de producto','card'),panelLink('Orden de las prendas','order'),panelLink('Categorías','categories')));};
  renderers.products=renderers.grid;
  renderers.card=panel=>{panel.append(...pick(renderProducts,['Tarjeta']),links(panelLink('Precios','pricing'),panelLink('Grilla de productos','grid'),panelLink('Ficha de producto','productModal')));};
  renderers.colors=panel=>{renderColorLibrary(panel);};
  renderers.pricing=panel=>{renderPricing(panel);};
  renderers.cart=panel=>{panel.append(...pick(renderFunctionsWithPricing,['Pedido','Condiciones mayoristas','Cantidad de cajas','Datos de la clienta','PDF del pedido']),links(panelLink('WhatsApp del pedido','whatsapp'),panelLink('Precios','pricing')));};
  renderers.footer=panel=>{renderFooterEditor(panel);};
  renderers.productModal=panel=>{renderModal(panel);const pdf=pick(renderFunctions,['Ficha PDF de producto']);const editor=[...panel.children].find(node=>/^(Producto ·|Editar una prenda)/.test(node.querySelector('h3')?.textContent||''));editor?panel.insertBefore(links(panelLink('Muestras de color','colors'),panelLink('Precios','pricing')),editor):panel.append(links(panelLink('Muestras de color','colors'),panelLink('Precios','pricing')));pdf.forEach(node=>editor?panel.insertBefore(node,editor):panel.append(node));};
  function productBasics(product){
    const box=group('Datos de la prenda','Se ven al instante en la vista previa. Al tocar “Guardar producto” (abajo de todo) la prenda se actualiza enseguida en el catálogo.');
    const field=(label,key,type='text')=>{const wrap=el('label',null,'control'),input=type==='textarea'?el('textarea'):el('input');if(type==='textarea')input.rows=4;else input.type=type;input.value=product[key]??'';input.oninput=()=>{product[key]=input.value;changeEmbeddedProduct(product);};wrap.append(el('span',label),input);return wrap;};
    const gender=el('label',null,'control'),select=el('select');for(const [value,text] of [['MUJER','Mujer'],['HOMBRE','Hombre'],['NINOS','Niños / Niñas'],['UNISEX','Unisex']]){const option=el('option',text);option.value=value;select.append(option);}select.value=product.category||'MUJER';select.onchange=()=>{product.category=select.value;changeEmbeddedProduct(product);};gender.append(el('span','Género'),select);
    box.append(field('Nombre','name'),field('Código','orderNumber'),gender,field('Descripción','description','textarea'));
    return box;
  }
  renderers.product=panel=>{panel.append(button('← Volver al elemento',()=>showLayer(layerForEditId(selectedEditId)||'layers'),'panel-link back-link'));const product=embeddedProductDraft();if(product)panel.append(productBasics(product));renderEmbeddedProductEditor(panel);const name=product?.name;if(name){$('panel-title').textContent=name;$('panel-kicker').textContent='PRENDA';}};

  /* ——— Restaurar una sección al diseño original ——— */
  const restoreKeys={announcementBar:['announcementBar'],header:['header'],searchBar:['searchBar'],filtersPanel:['filtersPanel'],grid:['grid'],card:['card'],productModal:['productModal'],cart:['cart'],whatsapp:['whatsapp'],footer:['footer'],pricing:['pricing'],theme:['tokens']};
  const keepContent={header:['logoUrl','logoAlt','brandName'],grid:['productOrder','orderByCollection'],footer:['links'],whatsapp:['number','template'],announcementBar:['messages'],cart:['termsText']};
  async function restoreSection(layer){
    const label=layerMeta[layer]?.[0]||layer;
    const choice=await askDialog({title:`¿Restaurar «${label}»?`,text:'Vuelve los colores, tamaños y opciones de esta sección a como venían originalmente. Se conservan los textos importantes, el logo, los enlaces y el orden de las prendas. Si te arrepentís, tocá “Deshacer”.',actions:[{label:'Cancelar',value:'cancel'},{label:'Restaurar',value:'restore',className:'primary'}]});
    if(choice!=='restore')return;
    remember();const defaults=schema.defaults({products});
    for(const key of restoreKeys[layer]){const kept={};for(const field of keepContent[key]||[])if(settings[key]?.[field]!==undefined)kept[field]=settings[key][field];settings[key]={...clone(defaults[key]),...kept};}
    for(const id of Object.keys(settings.elementStyles||{}))if(restoreKeys[layer].some(key=>id===key||id.startsWith(`${key}.`)))delete settings.elementStyles[id];
    setDirty();renderPanel();notify(`«${label}» volvió al diseño original.`);
  }

  /* ——— Reemplazos de funciones del editor ——— */
  const baseRenderPanel=renderPanel;
  renderPanel=function(){
    baseRenderPanel();
    const panel=$('panel-content');
    if(selectedEditId&&selectedLayer==='text'&&selectedEditId.startsWith('texts.')){
      panel.replaceChildren(elementGroup(selectedEditId),links(button('Ver todos los textos →',()=>{clearSelection();showLayer('text');},'panel-link')));
    }else if(selectedEditId&&selectedLayer!=='product'&&layerForEditId(selectedEditId)===selectedLayer){
      const divider=el('h4','Opciones de toda la sección','section-divider');
      panel.prepend(elementGroup(selectedEditId),divider);
    }
    if(restoreKeys[selectedLayer]&&!(selectedEditId&&selectedLayer==='text')){
      panel.append(button(`↺ Restaurar «${layerMeta[selectedLayer][0]}» al diseño original`,()=>restoreSection(selectedLayer),'section-restore'));
    }
    filterControls();
  };
  const layerScreens={productModal:'product',colors:'product',cart:'cart-filled',filtersPanel:'filters'};
  const catalogLayers=new Set(['announcementBar','header','hero','searchBar','grid','card','whatsapp','footer','pricing','functions']);
  const baseShowLayer=showLayer;
  showLayer=function(layer){
    if(!selectingFromPreview){
      if(selectedEditId&&layer!=='product'&&layer!==layerForEditId(selectedEditId))clearSelection();
      const wanted=layerScreens[layer]||(catalogLayers.has(layer)?'catalog':null);
      if(wanted&&wanted!==previewScreen&&!(wanted==='cart-filled'&&previewScreen==='cart-empty'))openPreviewScreen(wanted);
    }
    baseShowLayer(layer);
    if(!selectingFromPreview&&layer!=='product'){const id=selectedEditId||layer;setTimeout(()=>$('live-preview').contentWindow?.postMessage({type:'catalog-site-highlight',id,scroll:true},location.origin),350);}
  };
  const baseSelect=selectPreviewElement;
  selectPreviewElement=function(message){
    selectedComputed=message.styles||null;selectedProductName=String(message.productName||'');
    selectingFromPreview=true;try{baseSelect(message);}finally{selectingFromPreview=false;}
  };
  const baseConfigure=configureSelectionActions;
  configureSelectionActions=function(){
    baseConfigure();
    if(managedSectionSelection()||footerLinkSelection())return;
    const hide=$('hide-selected');hide.hidden=!canHide(selectedEditId);if(!hide.hidden)hide.textContent=isHidden(selectedEditId)?'Mostrar':'Ocultar';
  };
  const baseHide=$('hide-selected').onclick;
  $('hide-selected').onclick=()=>{if(managedSectionSelection()||footerLinkSelection())return baseHide();if(!canHide(selectedEditId))return;toggleHidden(selectedEditId);configureSelectionActions();renderPanel();};
  const baseRenderLayers=renderLayers;
  renderLayers=function(panel){
    baseRenderLayers(panel);
    const after=[...panel.querySelectorAll('.layer-item')].find(row=>row.firstElementChild?.textContent==='Ficha de producto');
    for(const [id,label] of [['colors','Muestras de color'],['pricing','Precios']].reverse()){
      const row=el('div',null,`layer-item${selectedLayer===id?' active':''}`);row.append(button(label,()=>showLayer(id)));
      after?after.after(row):panel.querySelector('.layer-tree')?.append(row);
    }
  };
  renderers.layers=renderLayers;
  /* Prendas editadas acá y sin guardar: también avisa antes de cerrar. */
  const unsavedProducts=()=>[...embeddedProductDrafts.entries()].filter(([id,draft])=>{const saved=products.find(item=>Number(item.id)===Number(id));return saved&&stableJson(saved)!==stableJson(draft);});
  window.addEventListener('beforeunload',event=>{if(!unsavedProducts().length)return;event.preventDefault();event.returnValue='';});
  /* La burbuja de selección no queda flotando en un lugar viejo cuando se desplaza la vista previa. */
  const watchPreviewScroll=()=>{try{$('live-preview').contentWindow.addEventListener('scroll',()=>{$('selection-toolbar').hidden=true;$('hover-label').hidden=true;},{passive:true});}catch{}};
  $('live-preview').addEventListener('load',watchPreviewScroll);watchPreviewScroll();
  /* Si la vista previa terminó de cargar antes que el editor, su aviso de "lista" se perdía y los cambios no se veían. */
  const catchUpPreview=()=>{try{const ready=$('live-preview').contentWindow?.CatalogSiteReady;if(!previewReady&&ready)ready.then(()=>{if(!previewReady)window.postMessage({type:'catalog-site-preview-ready'},location.origin);});}catch{}};
  catchUpPreview();$('live-preview').addEventListener('load',catchUpPreview);
  if(settings)renderPanel();
})();
