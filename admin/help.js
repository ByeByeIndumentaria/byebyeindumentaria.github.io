'use strict';
/* Ayuda dentro del panel (Etapa E), en Administración y en el editor visual.
   - «¿Cómo hago…?»: buscador de tareas con pasos cortos y «Llevarme ahí».
   - Administración: «Pendientes» (prendas sin foto, sin curva, sin código, códigos repetidos, tipos escritos distinto…),
     cada uno con «Ver» que filtra esas prendas.
   - Editor visual: «Revisar el diseño» (menú que apunta a una página oculta, filas de prendas vacías, enlaces mal escritos…).
   Una tarea de la otra pantalla abre esa pantalla con la ayuda en esa tarea (#ayuda-<id>). */
(()=>{
  const isEditor=typeof renderPanel==='function'&&typeof showLayer==='function';
  const isAdmin=!isEditor&&typeof renderCards==='function'&&typeof records!=='undefined';
  if(!isEditor&&!isAdmin)return;
  const make=(tag,text,className)=>{const node=document.createElement(tag);if(text!=null)node.textContent=text;if(className)node.className=className;return node;};
  const btn=(text,onClick,className='')=>{const node=make('button',text,className);node.type='button';node.onclick=onClick;return node;};
  const norm=value=>String(value??'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
  const editorGo=layer=>()=>{close();selectedEditId='';selectedEditLabel='';showLayer(layer);};
  const adminGo=fn=>()=>{close();fn();};
  const sheetView=()=>document.querySelectorAll('.view-switch button')[1]?.click();

  /* ——— Tareas ——— */
  const TASKS=[
    /* Administración */
    {id:'nueva-prenda',page:'admin',q:'Agregar una prenda nueva',keys:'cargar crear producto',steps:['Tocá «＋ Agregar producto».','Completá nombre, código, público, tipo y colección.','Agregá colores, talles y la curva; subí las fotos.','Tocá «Publicar producto».'],go:adminGo(()=>$('add-product')?.click())},
    {id:'excel',page:'admin',q:'Cargar o cambiar muchas prendas con Excel',keys:'planilla masiva importar exportar',steps:['Tocá «Cargar en cantidad».','«Descargar planilla con todas las prendas».','Cambiá lo que quieras o agregá filas nuevas en Excel.','«Subir planilla completada», revisá el resumen y tocá «Guardar».'],go:adminGo(()=>window.ProductBulk?.open())},
    {id:'fotos-codigo',page:'admin',q:'Subir muchas fotos juntas',keys:'imagenes masiva codigo archivo',steps:['Poné el código de la prenda en el nombre de cada foto (ej. «125-314.jpg», «125-314 negro.jpg»).','Tocá «Cargar en cantidad» → «Elegir fotos».','Revisá a qué prenda va cada una y tocá «Subir».'],go:adminGo(()=>window.ProductBulk?.open())},
    {id:'precios',page:'admin',q:'Cambiar el precio de muchas prendas',keys:'aumento porcentaje inflacion',steps:['Tildá las prendas (o «Elegir todas» con un filtro).','Tocá «Cambiar precio…».','Escribí +10%, -15%, +1500 o un precio fijo como 25000.','Confirmá: se redondea a la centena.'],go:adminGo(()=>{sheetView();})},
    {id:'stock',page:'admin',q:'Marcar prendas sin stock o con stock',keys:'agotado disponible',steps:['Una: abrila y destildá el stock del color o talle, o usá la Planilla («Con stock»).','Varias: tildalas y tocá «Marcar sin stock» o «Marcar con stock».'],go:adminGo(sheetView)},
    {id:'planilla',page:'admin',q:'Editar muchas prendas como en una tabla',keys:'planilla rapido nombre codigo',steps:['Arriba de las prendas tocá «☰ Planilla».','Cambiá las celdas: lo cambiado queda en amarillo.','Tocá «Guardar cambios» abajo.'],go:adminGo(sheetView)},
    {id:'ocultar-prenda',page:'admin',q:'Ocultar una prenda del catálogo',keys:'esconder sacar',steps:['Abrila y tildá «Ocultar del catálogo», o en la Planilla destildá «Visible».','Para borrarla del todo: «Archivar» (queda en la Papelera y se puede recuperar).'],go:adminGo(sheetView)},
    {id:'duplicar',page:'admin',q:'Duplicar una prenda',keys:'copiar parecida',steps:['En la tarjeta de la prenda tocá «Duplicar».','Cambiá nombre y código.','La copia queda oculta hasta que la revises.'],go:null},
    {id:'encuadrar',page:'admin',q:'Encuadrar una foto o elegir la portada',keys:'recortar zoom foto principal',steps:['Abrí la prenda y bajá a las fotos.','«Encuadrar»: arrastrá y acercá; «Llenar el cuadro» o «Foto entera».','«Principal» la pone como portada; ⠿ las ordena arrastrando.'],go:null},
    {id:'talles-grupo',page:'admin',q:'Agregar o quitar un talle o un color a varias prendas',keys:'xxl curva masivo',steps:['Tildá las prendas.','Tocá «Agregar talle…», «Quitar talle…», «Agregar color…» o «Quitar color…».'],go:null},
    {id:'renombrar',page:'admin',q:'Cambiar un tipo de prenda, etiqueta o talle en todas',keys:'renombrar reemplazar',steps:['Tocá «Cargar en cantidad».','En «Cambiar un nombre en todas» elegí Tipo de prenda, Etiqueta o Talle.','Elegí cuál y escribí el nombre nuevo.'],go:adminGo(()=>window.ProductBulk?.open())},
    {id:'etiquetas',page:'admin',q:'Poner una etiqueta (Oferta, Básicos…) a varias prendas',keys:'tag oferta',steps:['Tildá las prendas.','Tocá «Agregar etiqueta…» y escribila.','Para que se vea como filtro o en una fila: editor visual → «Datos de las prendas» y «Fila de prendas».'],go:null},
    {id:'nuevo',page:'admin',q:'Marcar una prenda como «Nuevo»',keys:'novedad etiqueta nueva',steps:['Abrí la prenda.','Tildá «Novedad».','La etiqueta se va sola después de los días elegidos.'],go:null},
    {id:'recuperar',page:'admin',q:'Recuperar una prenda borrada o volver a como estaba',keys:'papelera historial deshacer',steps:['Archivada: tildá «Papelera (archivadas)» y tocá «Restaurar».','Cambios: en la tarjeta tocá «Historial» y elegí la versión.'],go:adminGo(()=>{const box=[...document.querySelectorAll('label.check')].find(label=>/Papelera/.test(label.textContent))?.querySelector('input');if(box&&!box.checked)box.click();})},
    {id:'colecciones',page:'admin',q:'Crear, renombrar u ocultar una colección',keys:'temporada',steps:['Tocá «Colecciones».','«Agregar colección» o «Editar colección».','El orden se cambia con las flechas (o en el editor visual → Orden).'],go:adminGo(()=>$('manage-collections')?.click())},
    /* Editor visual */
    {id:'colores-letra',page:'editor',q:'Cambiar los colores y la letra del catálogo',keys:'estilo tema fuente tipografia',steps:['Tocá «Estilo» en la barra de la izquierda.','Cambiá colores, letras y esquinas: se ve al instante.','«Publicar» cuando te guste.'],go:editorGo('theme')},
    {id:'texto',page:'editor',q:'Cambiar un texto',keys:'escribir palabra frase',steps:['Tocá dos veces el texto en la vista previa y escribí ahí, o','tocalo una vez y cambialo en el panel, o buscá en «Textos».'],go:editorGo('text')},
    {id:'ocultar',page:'editor',q:'Ocultar o sacar cualquier cosa',keys:'borrar esconder quitar boton',steps:['Tocá eso en la vista previa.','En la barrita violeta tocá «Ocultar» (o «Dónde se ve» para sólo compu o sólo celular).','Oculto se ve transparente en el editor: tocalo y «Mostrar» para volver.'],go:null},
    {id:'estilo-elemento',page:'editor',q:'Cambiar el color o el tamaño de un elemento',keys:'boton titulo grande chico',steps:['Tocá el elemento en la vista previa.','En «Este elemento» elegí color, tamaño, grosor, esquinas…'],go:null},
    {id:'flyers',page:'editor',q:'Cambiar los flyers de la portada',keys:'banner portada imagen hero',steps:['Tocá «Flyers y portada» (o el flyer en la vista previa).','Subí la foto de compu y la de celular, el texto y el botón.','Arrastrá el texto en la vista previa para ubicarlo.'],go:editorGo('hero')},
    {id:'anuncio',page:'editor',q:'Poner un aviso arriba de todo',keys:'barra anuncio envios feriado',steps:['Abrí «Barra de anuncio».','Prendela y escribí los mensajes.','Podés programar cada mensaje por fecha.'],go:editorGo('announcementBar')},
    {id:'agregar-seccion',page:'editor',q:'Agregar una sección (preguntas, fotos, video, pasos…)',keys:'bloque agregar contenido',steps:['Tocá «Agregar».','Elegí el tipo: aparece con un ejemplo.','Cambiá el texto y elegí la «Ubicación».'],go:editorGo('add')},
    {id:'fila-ofertas',page:'editor',q:'Mostrar una fila de Ofertas o de Nuevas',keys:'fila prendas destacadas',steps:['Poné la etiqueta «Oferta» a esas prendas en Administración.','Editor → «Agregar» → «Fila de prendas».','Elegí «Con una etiqueta» → «Oferta».'],go:editorGo('add')},
    {id:'pagina',page:'editor',q:'Crear una página (Envíos, Cómo comprar…)',keys:'pagina nueva informacion',steps:['Abrí «Páginas y menú».','«＋ Nueva página» y escribí el nombre.','Agregá bloques eligiendo la ubicación «Página: …».'],go:editorGo('pages')},
    {id:'menu',page:'editor',q:'Armar el menú de arriba',keys:'navegacion enlaces links',steps:['Abrí «Páginas y menú».','Prendé «Mostrar el menú».','Agregá enlaces a páginas, colecciones, tipos o etiquetas.'],go:editorGo('pages')},
    {id:'guia-talles',page:'editor',q:'Agregar una guía de talles',keys:'medidas tabla',steps:['Abrí «Guías de talles».','«＋ Nueva guía»: completá la tabla.','Elegí a qué tipos de prenda se aplica.'],go:editorGo('sizeTables')},
    {id:'preguntas-pedido',page:'editor',q:'Pedir CUIT, transporte u otros datos en el pedido',keys:'formulario pedido cliente',steps:['Abrí «Pedido».','En «Preguntas propias del pedido» agregá las que quieras.','Marcá cuáles son obligatorias.'],go:editorGo('cart')},
    {id:'orden-prendas',page:'editor',q:'Cambiar el orden de las prendas',keys:'ordenar posicion primero',steps:['Tocá «Orden».','Elegí colección y categoría.','Arrastrá las fotos o usá Primero / Último.'],go:editorGo('order')},
    {id:'orden-colecciones',page:'editor',q:'Cambiar el orden de las colecciones',keys:'ordenar colecciones',steps:['Tocá «Orden».','Arriba, en «Orden de las colecciones», usá ↑ ↓ o «Primera».','Se guarda enseguida.'],go:editorGo('order')},
    {id:'datos',page:'editor',q:'Agregar datos a las prendas (Tela, Temporada…) o filtros nuevos',keys:'campo dato filtro publico',steps:['Abrí «Datos de las prendas».','«＋ Agregar dato»: elegí tipo y si es filtro.','Completalo en Administración (prenda, Planilla o en grupo).'],go:editorGo('productData')},
    {id:'funciones',page:'editor',q:'Prender o apagar favoritos, colores en tarjeta, Nuevo…',keys:'funciones clientas corazon',steps:['Abrí «Funciones para las clientas».','Prendé o apagá cada una.'],go:editorGo('shop')},
    {id:'whatsapp',page:'editor',q:'Cambiar el número de WhatsApp',keys:'telefono numero',steps:['Abrí «WhatsApp».','Escribí el número con código de país (ej. 5491112345678).'],go:editorGo('whatsapp')},
    {id:'programar',page:'editor',q:'Que algo aparezca sólo entre dos fechas',keys:'programar fecha hot sale black friday',steps:['En flyers, bloques y mensajes del aviso: «Mostrar desde / hasta».','Fuera de fecha se ve con borde punteado en el editor.'],go:null},
    {id:'celular',page:'editor',q:'Ver cómo queda en el celular',keys:'movil telefono',steps:['Arriba tocá «Celular».'],go:()=>{close();setDevice('mobile');}},
    {id:'version',page:'editor',q:'Volver a una versión anterior del diseño',keys:'historial deshacer recuperar',steps:['«Deshacer» para lo último.','Para versiones publicadas: «Historial».'],go:editorGo('history')},
    {id:'guardar-publicar',page:'both',q:'¿Qué diferencia hay entre Guardar y Publicar?',keys:'borrador clientas',steps:['«Guardar» (y el guardado automático) guarda un borrador que sólo ves vos.','«Publicar» hace que las clientas vean los cambios.','En Administración, cada prenda se publica al tocar «Guardar cambios».'],go:null},
  ];

  /* ——— Ventana de ayuda ——— */
  const dialog=make('dialog',null,'help-dialog');document.body.append(dialog);
  function close(){if(dialog.open)dialog.close();}
  function open(focusId=''){
    dialog.replaceChildren();const head=make('div',null,'help-head');head.append(make('h2','Ayuda'),btn('×',close,'help-close'));dialog.append(head);
    const tabs=make('div',null,'help-tabs'),body=make('div',null,'help-body');dialog.append(tabs,body);
    const views=[['Cómo hago…',howTo],...(isAdmin?[['Pendientes',pendingView]]:[['Revisar el diseño',reviewView]])];
    const show=index=>{tabs.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===index));body.replaceChildren();views[index][1](body,focusId);focusId='';};
    views.forEach(([label],index)=>tabs.append(btn(label,()=>show(index))));show(0);if(!dialog.open)dialog.showModal();
  }
  function howTo(body,focusId){
    const search=make('input');search.type='search';search.placeholder='¿Qué querés hacer? (ej. precio, foto, menú, ocultar)';search.className='help-search';const list=make('div',null,'help-list');body.append(search,list);
    const here=isAdmin?'admin':'editor';
    const draw=()=>{const words=norm(search.value).split(/\s+/).filter(Boolean);list.replaceChildren();
      const items=TASKS.filter(task=>{const text=norm(`${task.q} ${task.keys} ${task.steps.join(' ')}`);return words.every(word=>text.includes(word));}).sort((a,b)=>(a.page===here||a.page==='both'?0:1)-(b.page===here||b.page==='both'?0:1));
      if(!items.length)list.append(make('p','No encontré esa tarea. Probá con otra palabra (ej. «foto», «precio», «ocultar»).','help-empty'));
      for(const task of items){const item=make('details',null,'help-item');if(task.id===focusId)item.open=true;const summary=make('summary',task.q);if(task.page!==here&&task.page!=='both')summary.append(make('small',task.page==='admin'?' · en Administración':' · en el editor visual','help-where'));item.append(summary);
        const steps=make('ol');for(const step of task.steps)steps.append(make('li',step));item.append(steps);
        if(task.page!==here&&task.page!=='both')item.append(btn(task.page==='admin'?'Ir a Administración':'Ir al editor visual',()=>{location.href=`${task.page==='admin'?'./':'settings.html'}#ayuda-${task.id}`;},'help-go'));
        else if(task.go)item.append(btn('Llevarme ahí',task.go,'help-go'));
        list.append(item);if(task.id===focusId)setTimeout(()=>item.scrollIntoView({block:'center'}),50);}
    };
    search.oninput=draw;draw();setTimeout(()=>search.focus(),50);
  }

  /* ——— Administración: pendientes ——— */
  let pendingFilter=null;
  function pendingChecks(){
    const rows=[...records.values()].filter(row=>!row.payload?.archived),p=row=>row.payload;
    const usesPrices=rows.some(row=>p(row).price!=null&&p(row).price!==''||(p(row).purchaseOptions||[]).some(o=>o.price!=null&&o.price!==''));
    const codes=new Map();for(const row of rows){const code=norm(p(row).orderNumber);if(code)codes.set(code,(codes.get(code)||0)+1);}
    const fields=window.ProductFields?.state?.fields||[];
    const types=[...new Set(rows.flatMap(row=>Array.isArray(p(row).subcategories)&&p(row).subcategories.length?p(row).subcategories:[p(row).subcategory]).filter(Boolean))];
    const similar=new Set();for(const a of types)for(const b of types)if(a<b&&(norm(a)===norm(b)||norm(a).replace(/e?s$/,'')===norm(b).replace(/e?s$/,'')))similar.add(a).add(b);
    const checks=[
      ['sin-foto','Sin fotos','Subí fotos (o usá «Fotos por código»).',row=>!(p(row).gallery?.sources||[]).length],
      ['sin-curva','Curva pendiente','Completá la curva de talles.',row=>!((p(row).packaging?.rows||[]).length||(p(row).purchaseOptions||[]).some(o=>o.packaging?.rows?.length))],
      ['sin-codigo','Sin código','El código sirve para buscar, la planilla y las fotos por código.',row=>!String(p(row).orderNumber||'').trim()],
      ['codigo-repetido','Código repetido','Dos prendas con el mismo código se confunden en la planilla y las fotos.',row=>codes.get(norm(p(row).orderNumber))>1],
      ['colores-sin-foto','Colores sin foto vinculada','Al elegir el color, la clienta no ve su foto.',row=>{const g=p(row).gallery||{};return (p(row).colors||[]).length>1&&(g.sources||[]).length>1&&(p(row).colors||[]).some(color=>g.colorGalleryIndexByNormalizedColor?.[norm(color)]==null);}],
      ['tipos-parecidos','Tipos de prenda escritos distinto',`Hay nombres parecidos: ${[...similar].join(', ')}. Unificalos con «Cambiar un nombre en todas».`,row=>[p(row).subcategory,...(p(row).subcategories||[])].some(type=>similar.has(type))],
      ['sin-descripcion','Sin descripción','Opcional, pero ayuda a vender y a que el buscador la encuentre.',row=>!String(p(row).description||'').trim()],
      ...(usesPrices?[['sin-precio','Sin precio','Hay prendas con precio y otras sin.',row=>!(p(row).price!=null&&p(row).price!=='')&&!(p(row).purchaseOptions||[]).some(o=>o.price!=null&&o.price!=='')]]:[]),
      ...fields.map(field=>[`dato-${field.id}`,`Sin «${field.label}»`,'Dato propio sin completar (Planilla o «Completar un dato…»).',row=>{const value=p(row).fields?.[field.id];return value===undefined||value===''||value===null;}]),
    ];
    return checks.map(([id,label,help,test])=>({id,label,help,test,count:rows.filter(test).length}));
  }
  function pendingView(body){
    const checks=pendingChecks().filter(check=>check.count);if(!checks.length){body.append(make('p','Todo completo ✓ No hay prendas con datos pendientes.','help-empty'));return;}
    body.append(make('p','Tocá «Ver» para mostrar sólo esas prendas.','help-intro'));
    for(const check of checks){const row=make('div',null,'help-pending');const text=make('div');text.append(make('strong',`${check.label} · ${check.count}`),make('small',check.help));row.append(text,btn('Ver',()=>{applyPending(check);close();},'help-go'));body.append(row);}
  }
  function applyPending(check){pendingFilter=check;renderCards();document.getElementById('products')?.scrollIntoView({behavior:'smooth',block:'start'});}
  if(isAdmin){
    // Filtro de pendientes: products-tools usa ProductsTools.extraFilter si existe.
    window.ProductsTools&&(window.ProductsTools.extraFilter=row=>!pendingFilter||pendingFilter.test(row));
    const chip=make('div',null,'pending-chip');chip.hidden=true;document.querySelector('.product-filters')?.after(chip);
    const bar=make('button',null,'pending-bar');bar.type='button';bar.onclick=()=>{open();dialog.querySelectorAll('.help-tabs button')[1]?.click();};document.querySelector('.title-row')?.after(bar);
    const baseRender=renderCards;renderCards=function(...args){const result=baseRender.apply(this,args);try{const checks=pendingChecks().filter(check=>check.count&&!['sin-descripcion','colores-sin-foto'].includes(check.id)),total=checks.reduce((sum,check)=>sum+check.count,0);bar.hidden=!records?.size;bar.replaceChildren(make('strong',total?`Pendientes: ${checks.map(check=>`${check.label.toLowerCase()} (${check.count})`).join(' · ')}`:'Todo completo ✓'),make('span',total?'Ver y resolver →':''));bar.classList.toggle('done',!total);
        chip.hidden=!pendingFilter;chip.replaceChildren();if(pendingFilter){chip.append(make('span',`Mostrando: ${pendingFilter.label}`),btn('Quitar ×',()=>{pendingFilter=null;renderCards();}));}}catch(error){console.warn(error);}return result;};
    if(records?.size)renderCards();
  }

  /* ——— Editor: revisar el diseño ——— */
  function reviewChecks(){
    const s=settings,issues=[],ok=url=>!url||/^#[\w-]+$/.test(url)||/^(tel:|mailto:)/i.test(url)||/^https:\/\/\S+$/i.test(url);
    const pages=s.pages||[];
    if(s.announcementBar?.enabled&&!(s.announcementBar.messages||[]).length)issues.push(['La barra de anuncio está prendida pero no tiene mensajes.','announcementBar']);
    for(const [index,banner] of (s.hero?.banners||[]).entries())if(!banner.desktopImage&&!banner.mobileImage)issues.push([`El flyer ${index+1} no tiene foto.`,'hero']);
    for(const section of s.sections||[]){const name=section.title||section.type,goSection=()=>selectManagedSection(section.id);if(section.buttonLabel&&!ok(section.buttonUrl))issues.push([`El botón de «${name}» tiene un enlace mal escrito (tiene que empezar con https:// o #).`,goSection]);
      if(section.type==='products'&&['tag','category','audience','collection'].includes(section.rule)&&!section.value)issues.push([`La fila «${name}» no tiene elegida la etiqueta, tipo, público o colección.`,goSection]);
      if(String(section.location||'').startsWith('page:')&&!pages.some(page=>`page:${page.id}`===section.location))issues.push([`El bloque «${name}» está en una página que ya no existe.`,goSection]);}
    for(const page of pages)if(!(s.sections||[]).some(section=>section.location===`page:${page.id}`))issues.push([`La página «${page.title}» no tiene bloques.`,'pages']);
    if(s.menu?.enabled)for(const item of s.menu.items||[]){if(item.hidden)continue;if(item.type==='page'){const page=pages.find(entry=>entry.id===item.target);if(!page)issues.push([`El enlace del menú «${item.label}» apunta a una página que no existe.`,'pages']);else if(page.hidden)issues.push([`El enlace del menú «${item.label}» lleva a una página oculta.`,'pages']);}else if(item.type!=='home'&&!item.target)issues.push([`El enlace del menú «${item.label}» no tiene destino.`,'pages']);if(item.type==='url'&&item.target&&!/^https:\/\//i.test(item.target))issues.push([`El enlace del menú «${item.label}» tiene que empezar con https://.`,'pages']);}
    for(const table of s.sizeTables||[])if(!(table.rows||[]).length||(table.rows||[]).every(row=>row.slice(1).every(cell=>!String(cell||'').trim())))issues.push([`La guía «${table.title}» no tiene medidas cargadas.`,'sizeTables']);
    for(const q of s.cart?.extraQuestions||[])if(q.type==='options'&&!(q.options||[]).length)issues.push([`La pregunta del pedido «${q.label}» no tiene opciones.`,'cart']);
    for(const field of s.productFields||[])if(field.type==='options'&&!(field.options||[]).length)issues.push([`El dato «${field.label}» es una lista pero no tiene opciones.`,'productData']);
    for(const link of s.footer?.links||[])if(!link.hidden&&!ok(link.url))issues.push([`El enlace del pie «${link.label}» está mal escrito.`,'footer']);
    if(s.whatsapp?.floating&&!String(s.whatsapp.number||'').replace(/\D/g,''))issues.push(['El botón flotante de WhatsApp está prendido pero falta el número.','whatsapp']);
    return issues;
  }
  function reviewView(body){
    const issues=reviewChecks();if(!issues.length){body.append(make('p','Todo en orden ✓ No encontré nada para corregir en el diseño.','help-empty'));return;}
    body.append(make('p','Revisá esto antes de publicar:','help-intro'));for(const [text,layer] of issues){const row=make('div',null,'help-pending');row.append(make('span',text),btn('Ir',typeof layer==='function'?()=>{close();layer();}:editorGo(layer),'help-go'));body.append(row);}
  }

  /* ——— Botón de ayuda ——— */
  const launcher=btn('? Ayuda',()=>open(),'help-launcher');launcher.setAttribute('aria-label','Ayuda: cómo hacer cada cosa');
  if(isEditor){const undo=$('undo');undo?.parentElement?.insertBefore(launcher,undo);}else{const header=document.querySelector('header > div');header?header.prepend(launcher):document.body.append(launcher);}
  const fromHash=location.hash.match(/^#ayuda-([\w-]+)$/);if(fromHash)setTimeout(()=>{history.replaceState(null,'',location.pathname+location.search);open(fromHash[1]);},isEditor?2500:1200);
  window.CatalogHelp={open,tasks:TASKS,reviewChecks:isEditor?reviewChecks:null,pendingChecks:isAdmin?pendingChecks:null};
})();
