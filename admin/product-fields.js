'use strict';
/* Administración · datos propios, etiquetas y públicos en cada prenda (los define el editor visual, "Datos de las prendas").
   - Ventana de la prenda: sección "Más datos" con los datos propios y las etiquetas; el público usa la lista editable.
   - Planilla y cambios en grupo usan window.ProductFields.
   Se guarda en la prenda como fields:{id:valor} y tags:[...]. Usa el borrador del diseño (lo guardado), así no hace falta publicar. */
(()=>{
  const DEFAULT_AUDIENCES=[{value:'MUJER',label:'Mujer'},{value:'HOMBRE',label:'Hombre'},{value:'NINOS',label:'Niños / Niñas'},{value:'UNISEX',label:'Unisex'}];
  const state={fields:[],tags:{enabled:true},audiences:DEFAULT_AUDIENCES,ready:false};
  const clean=text=>String(text??'').replace(/[<>"`]/g,'').trim();
  const make=(tag,text,className)=>{const node=document.createElement(tag);if(text!=null)node.textContent=text;if(className)node.className=className;return node;};
  const allTags=()=>[...new Set([...records.values()].flatMap(row=>row.payload?.tags||[]).map(String))].sort((a,b)=>a.localeCompare(b,'es'));
  const fieldValue=(p,field)=>p?.fields?.[field.id];
  function setField(p,field,value){
    let next=value;if(field.type==='number'){const text=String(value).replace(',','.').trim();next=text===''?'':Number(text);if(next!==''&&!Number.isFinite(next))next='';}
    else if(field.type==='yesno')next=value==='si'?true:value==='no'?false:'';else next=clean(value).slice(0,200);
    if(next===''||next===null||next===undefined){if(p.fields){delete p.fields[field.id];if(!Object.keys(p.fields).length)delete p.fields;}}else{p.fields??={};p.fields[field.id]=next;}
  }
  function setTags(p,list){const tags=[...new Set(list.map(tag=>clean(tag).slice(0,30)).filter(Boolean))];if(tags.length)p.tags=tags;else delete p.tags;}
  const audienceOptions=()=>{const list=new Map(state.audiences.map(item=>[item.value,item.label]));for(const row of records.values()){const value=row.payload?.category;if(value&&!list.has(value))list.set(value,value);}return [...list];};

  /* Selector de un valor según el tipo del dato (sirve para la ventana, la planilla y el cambio en grupo). */
  function control(field,value,onChange){
    let input;
    if(field.type==='options'){input=make('select');input.append(new Option('—',''));for(const option of field.options||[])input.append(new Option(option,option));if(value&&!(field.options||[]).includes(value))input.append(new Option(String(value),String(value)));input.value=value??'';input.onchange=()=>onChange(input.value);}
    else if(field.type==='yesno'){input=make('select');for(const [v,t] of [['','—'],['si','Sí'],['no','No']])input.append(new Option(t,v));input.value=value===true?'si':value===false?'no':'';input.onchange=()=>onChange(input.value);}
    else{input=make('input');input.type='text';if(field.type==='number')input.inputMode='decimal';input.value=value??'';input.oninput=()=>onChange(input.value);}
    return input;
  }
  function tagEditor(p,onChange){
    const box=make('div',null,'tag-editor'),chips=make('div',null,'tag-editor-chips'),entry=make('input'),listId='product-tag-options';entry.type='text';entry.placeholder='Escribí una etiqueta y tocá Enter';entry.setAttribute('list',listId);
    let datalist=document.getElementById(listId);if(!datalist){datalist=make('datalist');datalist.id=listId;document.body.append(datalist);}datalist.replaceChildren(...allTags().map(tag=>new Option(tag)));
    const draw=()=>{chips.replaceChildren(...(p.tags||[]).map(tag=>{const chip=make('span',null,'tag-editor-chip'),remove=make('button','×');remove.type='button';remove.setAttribute('aria-label',`Quitar ${tag}`);remove.onclick=()=>{setTags(p,(p.tags||[]).filter(item=>item!==tag));draw();onChange();};chip.append(make('span',tag),remove);return chip;}));};
    const add=()=>{const parts=entry.value.split(',').map(clean).filter(Boolean);if(!parts.length)return;const existing=allTags(),fixed=parts.map(part=>existing.find(tag=>tag.toLocaleLowerCase('es')===part.toLocaleLowerCase('es'))||part);setTags(p,[...(p.tags||[]),...fixed]);entry.value='';draw();onChange();};
    entry.onkeydown=event=>{if(event.key==='Enter'||event.key===','){event.preventDefault();add();}};entry.onchange=add;entry.onblur=add;
    draw();box.append(chips,entry);return box;
  }

  /* Ventana de la prenda */
  function refreshGenderSelect(){const select=$('gender');if(!select)return;const current=select.value;select.replaceChildren(...audienceOptions().map(([value,label])=>new Option(label,value)));if(current)select.value=current;}
  function renderProductExtras(){
    if(!editing)return;const section=document.querySelector('#product-form .editor-body section');if(!section)return;
    document.getElementById('product-extras')?.remove();
    const box=make('fieldset',null,'product-extras wide');box.id='product-extras';box.append(make('legend','Más datos'));
    if(!state.fields.length&&state.tags.enabled===false)return;
    const grid=make('div',null,'product-extras-grid');
    for(const field of state.fields){const label=make('label');label.append(make('span',field.label+(field.suffix?` (${field.suffix})`:'')),control(field,fieldValue(editing,field),value=>{setField(editing,field,value);dirty=true;}));grid.append(label);}
    if(state.fields.length)box.append(grid);else box.append(make('p','Podés agregar datos propios (Tela, Temporada…) desde el editor visual, en «Datos de las prendas».','product-extras-help'));
    if(state.tags.enabled!==false){const label=make('div',null,'product-extras-tags');label.append(make('span','Etiquetas'),tagEditor(editing,()=>{dirty=true;}));box.append(label);}
    section.append(box);
  }
  const baseOpen=openEditor;
  openEditor=async function(...args){refreshGenderSelect();const result=await baseOpen.apply(this,args);try{if(editing&&$('gender').value!==editing.category){refreshGenderSelect();$('gender').value=editing.category||'';}renderProductExtras();}catch(error){console.warn(error);}return result;};

  /* Cambios en grupo (los agrega products-tools.js a su barra) */
  function bulkActions({action,bulk}){
    const out=[];
    if(state.tags.enabled!==false){
      out.push(action('Agregar etiqueta…',()=>{const value=clean(prompt(`Etiqueta para agregar a las elegidas${allTags().length?`\n\nYa usadas: ${allTags().join(', ')}`:''}`)||'');if(!value)return;const match=allTags().find(tag=>tag.toLocaleLowerCase('es')===value.toLocaleLowerCase('es'))||value;bulk(`Agregar la etiqueta «${match}»`,p=>setTags(p,[...(p.tags||[]),match]));}));
      out.push(action('Quitar etiqueta…',()=>{const tags=allTags();if(!tags.length)return notice('Ninguna prenda tiene etiquetas.');const answer=prompt(`Etiqueta para quitar: escribí el número\n\n${tags.map((tag,i)=>`${i+1}. ${tag}`).join('\n')}`);if(answer===null)return;const tag=tags[Number(answer)-1];if(!tag)return notice('Número inválido.');bulk(`Quitar la etiqueta «${tag}»`,p=>setTags(p,(p.tags||[]).filter(item=>item!==tag)));}));
    }
    if(state.fields.length)out.push(action('Completar un dato…',()=>{const answer=prompt(`¿Qué dato querés completar? Escribí el número\n\n${state.fields.map((f,i)=>`${i+1}. ${f.label}`).join('\n')}`);if(answer===null)return;const field=state.fields[Number(answer)-1];if(!field)return notice('Número inválido.');
      const hint=field.type==='options'?`\n\nOpciones: ${(field.options||[]).join(', ')}`:field.type==='yesno'?'\n\nEscribí Sí o No':'';const raw=prompt(`Valor de «${field.label}» para las elegidas (dejalo vacío para borrarlo)${hint}`);if(raw===null)return;
      let value=raw.trim();if(field.type==='yesno')value=/^s[ií]/i.test(value)?'si':/^no/i.test(value)?'no':'';if(field.type==='options'&&value){const match=(field.options||[]).find(option=>option.toLocaleLowerCase('es')===value.toLocaleLowerCase('es'));if(!match&&!confirm(`«${value}» no está en las opciones de ${field.label}. ¿Usarlo igual?`))return;value=match||value;}
      bulk(value?`Poner ${field.label}: «${raw.trim()}»`:`Borrar ${field.label}`,p=>setField(p,field,value));}));
    return out;
  }

  /* Cargar las definiciones (borrador del editor visual; si no hay, lo publicado) */
  async function load(){
    try{let settings=null;try{const row=await api.getEditorSiteSettings?.();settings=row?.draft_payload||row?.published_payload||null;}catch{}if(!settings)settings=await api.getSiteSettings();
      state.fields=(Array.isArray(settings?.productFields)?settings.productFields:[]).filter(field=>field&&field.id&&field.label);
      state.tags={enabled:true,...(settings?.productTags||{})};
      state.audiences=Array.isArray(settings?.audiences)&&settings.audiences.length?settings.audiences:DEFAULT_AUDIENCES;
    }catch(error){console.warn('Datos de las prendas: se usan los valores base.',error);}
    state.ready=true;refreshGenderSelect();if(editing&&document.getElementById('editor')?.open)renderProductExtras();if(records?.size)renderCards();
  }
  window.ProductFields={state,setField,setTags,fieldValue,control,audienceOptions,bulkActions,allTags,clean};
  load();
})();
