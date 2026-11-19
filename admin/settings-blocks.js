'use strict';
/* Editor visual · Etapa 5: bloques de verdad e imágenes.
   - Agregar: Foto, Galería, Video, Preguntas frecuentes (desplegables), Cómo comprar (pasos), Contacto (con enlaces),
     Columnas, Separador y Espacio, además de Aviso, Texto y Botón. Cada uno trae un ejemplo para editar.
   - Editor propio de cada tipo, con listas para agregar, ordenar y quitar ítems.
   - Ubicación "Debajo del encabezado" y alineación.
   - "Elegir una foto ya subida" en todos los campos de imagen; imagen para compartir con botón de subir.
   - Aviso si la foto subida es chica y puede verse borrosa. */
(()=>{
  const blockTypes=[
    ['image','Foto','Una imagen con texto y enlace'],['gallery','Galería','Varias fotos en grilla'],['video','Video','YouTube, Vimeo o archivo'],
    ['faq','Preguntas frecuentes','Preguntas que se despliegan'],['howto','Cómo comprar','Pasos numerados'],['contact','Contacto','Horario, WhatsApp, Instagram, dirección'],
    ['columns','Columnas','Dos o tres columnas con foto y texto'],['announcement','Aviso','Un mensaje destacado'],['text','Texto','Título y párrafo'],
    ['button','Botón','Una llamada a la acción'],['divider','Separador','Una línea fina'],['spacer','Espacio','Aire entre secciones']];
  const typeNames=Object.fromEntries(blockTypes.map(([type,name])=>[type,name]));
  layerMeta.functions=['Bloque','Bloque'];
  function starter(type){
    const base={id:`section-${Date.now()}`,type,title:typeNames[type]||'Bloque',text:'',buttonLabel:'',buttonUrl:'',location:'after-hero',align:'center',hidden:false};
    if(type==='faq')Object.assign(base,{items:[{question:'¿Cuál es el pedido mínimo?',answer:'Escribí acá la respuesta.'},{question:'¿Hacen envíos?',answer:'Escribí acá la respuesta.'}]});
    if(type==='howto')Object.assign(base,{items:[{title:'Elegí las prendas',text:'Tocá el + en las que te gusten.'},{title:'Revisá tu pedido',text:'Elegí la cantidad de cajas.'},{title:'Envialo por WhatsApp',text:'Te respondemos con la cotización.'}]});
    if(type==='contact')Object.assign(base,{hours:'Lunes a viernes de 9 a 18 h',whatsapp:settings.whatsapp?.number||'',phone:'',email:'',instagram:'',address:''});
    if(type==='columns')Object.assign(base,{items:[{title:'Calidad',text:'Escribí un texto corto.',image:''},{title:'Envíos',text:'Escribí un texto corto.',image:''},{title:'Atención',text:'Escribí un texto corto.',image:''}]});
    if(type==='gallery')Object.assign(base,{images:[],columns:3});
    if(type==='image')Object.assign(base,{image:'',imageAlt:'',imageUrl:'',caption:'',title:''});
    if(type==='video')Object.assign(base,{videoUrl:'',title:''});
    if(type==='divider'||type==='spacer')Object.assign(base,{title:'',height:40});
    return base;
  }

  /* ——— Agregar ——— */
  renderers.add=panel=>{
    const temp=el('div');renderAdd(temp);const fixed=[...temp.querySelectorAll('.add-grid > button')].slice(0,2);
    const grid=el('div',null,'add-grid');grid.append(...fixed);
    for(const [type,title,description] of blockTypes)grid.append(button(`${title}\n${description}`,()=>{remember();const section=starter(type);settings.sections.push(section);setDirty();selectManagedSection(section.id);},'add-card'));
    panel.append(el('p','Elegí qué agregar. Aparece con un ejemplo que podés cambiar; después lo movés con “Subir” y “Bajar” o cambiando la ubicación.','panel-empty'),grid);
  };

  /* ——— Controles reutilizables ——— */
  function field(label,target,key,{type='text',rows=3,placeholder=''}={}){
    const wrap=el('label',null,'control'),input=type==='textarea'?el('textarea'):el('input');
    if(type==='textarea')input.rows=rows;else input.type=type;if(placeholder)input.placeholder=placeholder;
    input.value=target[key]??'';input.oninput=()=>{remember();target[key]=type==='number'?Number(input.value):input.value;setDirty();};
    wrap.dataset.search=label.toLocaleLowerCase('es');wrap.append(el('span',label),input);return wrap;
  }
  function choice(label,target,key,options){
    const wrap=el('div',null,'control');wrap.append(el('span',label));const row=el('div',null,'segmented');
    for(const [value,text] of options)row.append(button(text,()=>{remember();target[key]=value;setDirty();renderPanel();},String(target[key]??options[0][0])===String(value)?'active':''));
    wrap.append(row);return wrap;
  }
  function listEditor(title,owner,key,fields,blank,max){
    owner[key]??=[];const list=owner[key],box=el('div',null,'block-list');box.append(el('h4',title,'block-list-title'));
    list.forEach((entry,index)=>{
      const card=el('article',null,'item-card block-item'),head=el('div',null,'item-card-head'),actions=el('div',null,'mini-actions');
      head.append(el('strong',`${index+1}`));
      actions.append(button('↑',()=>{if(index>0){remember();[list[index-1],list[index]]=[list[index],list[index-1]];setDirty();renderPanel();}}),button('↓',()=>{if(index<list.length-1){remember();[list[index+1],list[index]]=[list[index],list[index+1]];setDirty();renderPanel();}}),button('×',()=>{remember();list.splice(index,1);setDirty();renderPanel();},'danger-text'));
      head.append(actions);card.append(head);
      for(const [label,prop,kind] of fields)card.append(kind==='image'?imageField(label,entry,prop):field(label,entry,prop,kind==='textarea'?{type:'textarea'}:{}));
      box.append(card);
    });
    if(list.length<max)box.append(button(`＋ Agregar ${blank.label}`,()=>{remember();list.push({...blank.value});setDirty();renderPanel();},'add-card'));
    return box;
  }

  /* ——— Editor de cada bloque ——— */
  appendSectionEditor=function(panel,section,index){
    const type=typeNames[section.type]?section.type:'text',box=group(section.title||typeNames[type]||'Bloque',`Tipo: ${typeNames[type]}. Los cambios se ven al instante en la vista previa.`);
    if(!['divider','spacer'].includes(type)){box.append(field('Título',section,'title'),field('Texto',section,'text',{type:'textarea'}));}
    if(type==='image')box.append(imageField('Foto',section,'image'),field('Descripción de la foto (para quien no ve)',section,'imageAlt'),field('Epígrafe (texto debajo)',section,'caption'),field('Enlace al tocar la foto',section,'imageUrl',{placeholder:'https://… o #catalogo'}));
    if(type==='gallery')box.append(choice('Columnas',section,'columns',[[2,'2'],[3,'3'],[4,'4']]),listEditor('Fotos',section,'images',[['Foto','src','image'],['Descripción','alt']],{label:'foto',value:{src:'',alt:''}},24));
    if(type==='video'){box.append(field('Enlace del video',section,'videoUrl',{placeholder:'https://www.youtube.com/watch?v=…'}));box.append(el('p','Funciona con YouTube, Vimeo o un archivo .mp4 publicado en internet.','element-help'));}
    if(type==='faq')box.append(listEditor('Preguntas',section,'items',[['Pregunta','question'],['Respuesta','answer','textarea']],{label:'pregunta',value:{question:'Nueva pregunta',answer:''}},40));
    if(type==='howto')box.append(listEditor('Pasos',section,'items',[['Título del paso','title'],['Explicación','text','textarea']],{label:'paso',value:{title:'Nuevo paso',text:''}},12));
    if(type==='contact')box.append(field('Horario',section,'hours'),field('WhatsApp (con código de país)',section,'whatsapp',{placeholder:'5491112345678'}),field('Teléfono',section,'phone'),field('Correo',section,'email',{type:'email'}),field('Instagram',section,'instagram',{placeholder:'@byebye'}),field('Dirección',section,'address'));
    if(type==='columns')box.append(listEditor('Columnas',section,'items',[['Foto','image','image'],['Título','title'],['Texto','text','textarea']],{label:'columna',value:{title:'Nueva columna',text:'',image:''}},4));
    if(type==='spacer')box.append(field('Alto del espacio (px)',section,'height',{type:'number'}));
    if(!['divider','spacer','gallery'].includes(type))box.append(field('Texto del botón (opcional)',section,'buttonLabel'),field('Enlace del botón',section,'buttonUrl',{placeholder:'https://…, #catalogo, mailto: o tel:'}));
    if(!['divider','spacer'].includes(type))box.append(choice('Alineación',section,'align',[['center','Centrado'],['left','A la izquierda']]));
    box.append(itemInput('Ubicación',section,'location','select',[['before-header','Arriba del encabezado'],['after-header','Debajo del encabezado'],['after-hero','Después de los flyers'],['after-search','Después del buscador'],['before-footer','Antes del pie']]),itemToggle('Oculto',section,'hidden'));
    const actions=el('div',null,'mini-actions');actions.append(button('Subir',()=>moveManagedSection(index,-1)),button('Bajar',()=>moveManagedSection(index,1)),button('Duplicar',()=>duplicateManagedSection(index)),button('Eliminar',()=>deleteManagedSection(index),'danger-text'));
    box.append(actions);panel.append(box);
  };

  /* ——— Fotos ya subidas ——— */
  function usedImages(){
    const found=new Set();
    const walk=value=>{if(typeof value==='string'){if(/^(https:\/\/\S+\.(jpe?g|png|webp)(\?\S*)?|images\/\S+\.(jpe?g|png|webp)(\?\S*)?)$/i.test(value))found.add(value);}else if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')Object.values(value).forEach(walk);};
    walk(settings);return [...found];
  }
  const previewSrc=src=>/^https?:/i.test(src)?src:`../${src}`;
  function chooseImage(target,key){
    const images=usedImages(),dialog=el('dialog',null,'mobile-more image-picker'),box=el('div',null,'mobile-more-box');
    const head=el('div',null,'mobile-more-head');head.append(el('h2','Fotos ya subidas'),button('×',()=>dialog.close(),'mobile-more-close'));box.append(head);
    if(!images.length)box.append(el('p','Todavía no hay fotos subidas en el diseño. Usá “Subir imagen”.','panel-empty'));
    const grid=el('div',null,'image-picker-grid');
    for(const src of images){const choiceButton=button('',()=>{remember();target[key]=src;setDirty();dialog.close();renderPanel();notify('Foto elegida.');},'image-picker-item');const img=el('img');img.src=previewSrc(src);img.alt='';img.loading='lazy';choiceButton.append(img);grid.append(choiceButton);}
    box.append(grid);dialog.append(box);dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);dialog.showModal();
  }
  const baseImageField=imageField;
  imageField=function(label,target,key){
    const wrap=baseImageField(label,target,key),side=wrap.querySelector(':scope > div');
    if(side)side.append(button('Elegir una ya subida',()=>chooseImage(target,key),'upload-button secondary-upload'));
    return wrap;
  };
  /* Imagen para compartir en WhatsApp/Google: subir en lugar de pegar un enlace. */
  const previousRender=renderPanel;
  renderPanel=function(){
    previousRender();
    const og=[...document.querySelectorAll('#panel-content [data-search]')].find(node=>node.dataset.search.includes('meta.ogimage'));
    if(og){const replacement=imageField('Imagen al compartir (ideal 1200 × 630)',settings.meta,'ogImage');og.replaceWith(replacement);}
  };
  /* Aviso de foto chica. */
  if(optimizer&&!optimizer.__sizeWarning){
    const baseOptimize=optimizer.optimize.bind(optimizer);
    optimizer.optimize=async(...args)=>{const result=await baseOptimize(...args);const width=Number(result?.width)||0;if(width&&width<900)setTimeout(()=>notify(`Ojo: la foto mide ${width} px de ancho y en pantallas grandes puede verse borrosa. Lo ideal es 1600 px o más.`),1600);return result;};
    optimizer.__sizeWarning=true;
  }
  /* En Capas, cada bloque muestra su tipo (antes los separadores o fotos sin título decían "Bloque sin título"). */
  const previousLayers=renderLayers;
  renderLayers=function(panel){previousLayers(panel);const divider=panel.querySelector('.layer-divider');if(!divider)return;let node=divider.nextElementSibling,index=0;while(node&&node.classList.contains('layer-item')){const section=settings.sections[index],name=node.firstElementChild;if(section&&name){const kind=typeNames[section.type]||'Texto';const label=section.title||section.text;name.textContent=!label?`${kind} (sin título)`:label===kind?label:`${label} · ${kind}`;}node=node.nextElementSibling;index++;}};
  renderers.layers=renderLayers;
  if(settings&&['add','functions'].includes(selectedLayer))renderPanel();
})();
