'use strict';
/* Editor visual · Etapa 6.
   - Botones Negrita, Cursiva y Enlace sobre los textos de los bloques (se guardan como **negrita**, *cursiva*, [texto](enlace)).
   - Textos con variables como {n}: avisa si se borró una y ofrece volver al texto original.
   - "Mostrar desde / hasta" en flyers, bloques y mensajes del anuncio, con el estado (se ve ahora, programado, vencido). */
(()=>{
  /* ——— Formato de texto ——— */
  function formatToolbar(textarea){
    const bar=el('div',null,'format-bar');
    const wrap=(before,after,placeholder)=>{const start=textarea.selectionStart??textarea.value.length,end=textarea.selectionEnd??start,chosen=textarea.value.slice(start,end)||placeholder;textarea.value=`${textarea.value.slice(0,start)}${before}${chosen}${after}${textarea.value.slice(end)}`;textarea.focus();textarea.setSelectionRange(start+before.length,start+before.length+chosen.length);textarea.dispatchEvent(new Event('input',{bubbles:true}));};
    const bold=button('N',()=>wrap('**','**','texto'),'format-bold'),italic=button('C',()=>wrap('*','*','texto'),'format-italic');
    bold.title='Negrita';italic.title='Cursiva';bold.setAttribute('aria-label','Negrita');italic.setAttribute('aria-label','Cursiva');
    const link=button('Enlace',()=>{const url=prompt('Pegá el enlace (https://…, #catalogo, mailto: o tel:)','https://');if(!url||url==='https://')return;wrap('[',`](${url.trim()})`,'texto del enlace');});
    bar.append(bold,italic,link,el('small','Seleccioná palabras y tocá un botón.','format-help'));
    textarea.before(bar);
  }

  /* ——— Variables de los textos ——— */
  const variableHelp={n:'el número',coleccion:'el nombre de la colección',pagina:'el número de página',total:'el total de páginas',producto:'el nombre de la prenda',items:'la lista de prendas',cajas:'la cantidad de cajas',cliente:'los datos de la clienta',marca:'el nombre de la marca',fecha:'la fecha'};
  const defaultsByLower=new Map(Object.entries(schema.DEFAULT_TEXTS||{}).map(([key,value])=>[`texts.${key}`.toLocaleLowerCase('es'),{key,value}]));
  function textKeyOf(node){const search=node?.closest?.('[data-search]')?.dataset.search||'';const path=search.split(' ').reverse().find(part=>part.startsWith('texts.'));return path?defaultsByLower.get(path):null;}
  function checkVariables(input){
    const info=textKeyOf(input);if(!info)return;const required=info.value.match(/\{\w+\}/g)||[],missing=required.filter(token=>!input.value.includes(token));
    let note=input.nextElementSibling;if(!note?.classList?.contains('variable-note')){note=el('div',null,'variable-note');input.after(note);}
    note.replaceChildren();note.hidden=!missing.length;if(!missing.length)return;
    note.append(el('span',`Falta ${missing.join(' y ')}: ahí el catálogo pone ${missing.map(token=>variableHelp[token.slice(1,-1)]||'un dato').join(' y ')}. Sin eso el texto queda incompleto. `),button('Volver al texto original',()=>{input.value=info.value;input.dispatchEvent(new Event('input',{bubbles:true}));checkVariables(input);}));
  }
  document.addEventListener('input',event=>{if(event.target.closest?.('#panel-content')&&textKeyOf(event.target))checkVariables(event.target);},true);

  /* ——— Programar por fecha ——— */
  const toLocalInput=value=>value?String(value).slice(0,16):'';
  function scheduleState(target){const now=Date.now(),from=Date.parse(target.showFrom||''),until=Date.parse(target.showUntil||''),format=time=>new Date(time).toLocaleString('es-AR',{day:'numeric',month:'long',year:new Date(time).getFullYear()===new Date().getFullYear()?undefined:'numeric',hour:'2-digit',minute:'2-digit'});
    if(Number.isFinite(until)&&now>=until)return['expired',`Ya no se ve (terminó el ${format(until)})`];
    if(Number.isFinite(from)&&now<from)return['scheduled',`Programado: aparece el ${format(from)}`];
    if(Number.isFinite(until))return['live',`Se ve ahora, hasta el ${format(until)}`];
    return['live',Number.isFinite(from)?'Se ve ahora':'Se ve siempre'];}
  function scheduleFields(target,title='Programar'){
    const box=el('div',null,'schedule-box'),state=el('small','','schedule-state'),row=el('div',null,'schedule-row');
    const refresh=()=>{const [kind,text]=scheduleState(target);state.textContent=text;state.dataset.state=kind;clear.hidden=!target.showFrom&&!target.showUntil;};
    const input=(label,key)=>{const wrap=el('label',null,'control'),field=el('input');field.type='datetime-local';field.value=toLocalInput(target[key]);field.oninput=()=>{remember();if(field.value)target[key]=field.value;else delete target[key];setDirty();refresh();};wrap.append(el('span',label),field);return wrap;};
    const clear=button('Quitar fechas',()=>{remember();delete target.showFrom;delete target.showUntil;setDirty();renderPanel();},'reset-button');
    row.append(input('Mostrar desde','showFrom'),input('Hasta','showUntil'));
    box.append(el('strong',title),row,state,clear);refresh();
    box.append(el('p','Las clientas lo ven sólo entre esas fechas (al entrar o recargar el catálogo). En el editor se ve siempre, marcado con borde punteado si está fuera de fecha. Recordá tocar “Publicar”.','element-help'));
    return box;
  }
  const baseSectionEditor=appendSectionEditor;
  appendSectionEditor=function(panel,section,index){baseSectionEditor(panel,section,index);const box=panel.lastElementChild;const actions=box?.querySelector(':scope > .mini-actions');const schedule=scheduleFields(section,'Programar este bloque');actions?box.insertBefore(schedule,actions):panel.append(schedule);};

  const previousRender=renderPanel;
  renderPanel=function(){
    previousRender();
    const panel=$('panel-content');
    if(selectedLayer==='functions')for(const textarea of panel.querySelectorAll('textarea')){const label=textarea.closest('label')?.querySelector('span')?.textContent?.trim();if(['Texto','Respuesta','Explicación'].includes(label))formatToolbar(textarea);}
    if(['hero','images'].includes(selectedLayer)){const cards=[...panel.querySelectorAll('article.item-card')].slice(0,settings.hero.banners.length);cards.forEach((card,index)=>card.append(scheduleFields(settings.hero.banners[index],'Programar este flyer')));}
    if(selectedLayer==='announcementBar'){const messages=settings.announcementBar.messages||[];const cards=[...panel.querySelectorAll('article.item-card')].slice(0,messages.length);cards.forEach((card,index)=>{if(typeof messages[index]==='object')card.append(scheduleFields(messages[index],'Programar este mensaje'));});}
    for(const input of panel.querySelectorAll('input, textarea'))if(textKeyOf(input))checkVariables(input);
  };
  if(settings)renderPanel();
})();
