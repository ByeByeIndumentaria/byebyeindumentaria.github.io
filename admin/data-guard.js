'use strict';
/* Editor del catálogo · Etapa 4: que los datos no se ensucien solos.
   Funciona en las dos pantallas de administración (prendas y editor visual):
   - Al escribir tipos de prenda, colores o talles avisa si el valor ya existe escrito de otra forma
     ("Gris Claro" / "Gris claro") o si parece un error de tipeo ("Remera" / "Remeras"), con un botón para usar el existente.
   - Avisa cuando un enlace no va a funcionar (antes el botón llevaba al catálogo sin explicar por qué).
   No modifica datos por su cuenta: sólo sugiere. */
(()=>{
  const normalize=text=>String(text||'').toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,' ').trim();
  function distance(a,b){if(Math.abs(a.length-b.length)>2)return 9;const row=Array.from({length:b.length+1},(_,index)=>index);for(let i=1;i<=a.length;i++){let previous=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const current=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,previous+(a[i-1]===b[j-1]?0:1));previous=current;}}return row[b.length];}
  function allProducts(){
    try{if(typeof products!=='undefined'&&Array.isArray(products))return products;}catch{}
    try{if(typeof records!=='undefined'&&records instanceof Map)return [...records.values()].map(row=>row?.payload||row).filter(Boolean);}catch{}
    return [];
  }
  function knownValues(kind){
    const counts=new Map();
    const add=value=>{const text=String(value||'').trim();if(text)counts.set(text,(counts.get(text)||0)+1);};
    for(const product of allProducts()){
      if(kind==='category')String(product.subcategory||'').split(',').forEach(add),(product.categories||[]).forEach(add);
      if(kind==='color'){(product.colors||[]).forEach(add);(product.purchaseOptions||[]).forEach(option=>(option.colors||[]).forEach(add));}
      if(kind==='size'){(product.sizes||[]).forEach(add);(product.purchaseOptions||[]).forEach(option=>(option.sizes||[]).forEach(add));}
    }
    return counts;
  }
  /* Devuelve la sugerencia para un valor nuevo, o null si está bien. */
  function suggestion(kind,value){
    const text=String(value||'').trim();if(!text)return null;
    const known=knownValues(kind);if(!known.size||known.has(text))return null;
    const key=normalize(text),entries=[...known.entries()].sort((a,b)=>b[1]-a[1]);
    const sameSpelling=entries.find(([name])=>normalize(name)===key);
    if(sameSpelling)return{type:'spelling',value:text,use:sameSpelling[0],count:sameSpelling[1]};
    if(kind==='size')return{type:'new',value:text};
    const plural=entries.find(([name])=>{const other=normalize(name);return other===`${key}s`||other===`${key}es`||`${other}s`===key||`${other}es`===key;});
    if(plural)return{type:'similar',value:text,use:plural[0],count:plural[1]};
    if(key.length>=4){const close=entries.map(([name,count])=>({name,count,d:distance(key,normalize(name))})).filter(item=>item.d<=(key.length>=7?2:1)).sort((a,b)=>a.d-b.d||b.count-a.count)[0];if(close)return{type:'similar',value:text,use:close.name,count:close.count};}
    return{type:'new',value:text};
  }
  const kindLabels={category:'tipo de prenda',color:'color',size:'talle'};
  function fieldKind(input){
    if(input.placeholder==='Nombre del color')return{kind:'color',list:false};
    const label=input.closest('label')?.textContent||'';
    if(/^\s*Tipos de prenda/i.test(label)||input.id==='subcategory')return{kind:'category',list:true};
    if(/^\s*Colores/i.test(label)||input.id==='colors')return{kind:'color',list:true};
    if(/^\s*Talles/i.test(label)||input.id==='sizes')return{kind:'size',list:true};
    return null;
  }
  function replaceToken(input,list,oldValue,newValue){
    if(!list){input.value=newValue;}else{input.value=input.value.split(',').map(part=>part.trim()===oldValue?(part.match(/^\s*/)[0]+newValue):part).join(',');}
    input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));
  }
  function noteFor(input){/* Dentro de un <label> va debajo del campo; en una fila (campo + botón) va debajo de la fila. */const anchor=input.parentElement?.tagName==='LABEL'?input:input.parentElement;let note=anchor.nextElementSibling;if(!note?.classList?.contains('data-guard')){note=document.createElement('div');note.className='data-guard';note.setAttribute('role','status');anchor.after(note);}return note;}
  function check(input){
    const field=fieldKind(input);if(!field)return;
    const tokens=field.list?input.value.split(',').map(part=>part.trim()).filter(Boolean):[input.value.trim()].filter(Boolean);
    const issues=[...new Set(tokens)].map(token=>suggestion(field.kind,token)).filter(Boolean);
    const note=noteFor(input);note.replaceChildren();
    for(const issue of issues){
      const line=document.createElement('p');line.className=`data-guard-line ${issue.type}`;
      if(issue.type==='new'){line.textContent=`«${issue.value}» es un ${kindLabels[field.kind]} nuevo: se va a crear al guardar.`;}
      else{
        line.textContent=issue.type==='spelling'?`«${issue.value}» ya existe escrito como «${issue.use}» (${issue.count} ${issue.count===1?'vez':'veces'}). `:`¿Quisiste decir «${issue.use}»? (se usa ${issue.count} ${issue.count===1?'vez':'veces'}) `;
        const use=document.createElement('button');use.type='button';use.textContent=`Usar «${issue.use}»`;use.onclick=()=>{replaceToken(input,field.list,issue.value,issue.use);check(input);};line.append(use);
      }
      note.append(line);
    }
    note.hidden=!issues.length;
  }
  /* Enlaces: avisa si no van a funcionar y ofrece arreglarlos. */
  function linkInput(input){const label=input.closest('label')?.querySelector('span')?.textContent||input.closest('label')?.textContent||'';return /^(Enlace|Enlace o sección|Link)/i.test(label.trim());}
  function checkLink(input){
    const note=noteFor(input);note.replaceChildren();const value=input.value.trim();
    const ok=!value||/^(https?:\/\/[^\s.]+\.[^\s]+|#[\w-]+|mailto:\S+@\S+|tel:\+?[\d\s-]+|https?:\/\/wa\.me\/\d+)/i.test(value);
    if(!ok){
      const line=document.createElement('p');line.className='data-guard-line similar';
      const domain=/^(www\.)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(value),phone=/^\+?[\d\s-]{8,}$/.test(value);
      line.textContent=domain?'Falta https:// al principio: así el botón no va a funcionar. ':phone?'Parece un teléfono: para abrir WhatsApp tiene que ser un enlace. ':'Este enlace no va a funcionar: el botón llevará al inicio del catálogo. Usá https://…, #catalogo, mailto: o tel:. ';
      if(domain||phone){const fix=document.createElement('button');fix.type='button';fix.textContent=domain?`Usar https://${value.replace(/^https?:\/\//,'')}`:'Convertir en enlace de WhatsApp';fix.onclick=()=>{input.value=domain?`https://${value}`:`https://wa.me/${value.replace(/\D/g,'')}`;input.dispatchEvent(new Event('input',{bubbles:true}));checkLink(input);};line.append(fix);}
      note.append(line);
    }
    note.hidden=ok;
  }
  let timer=null;
  document.addEventListener('input',event=>{const input=event.target;if(!(input instanceof HTMLInputElement))return;clearTimeout(timer);timer=setTimeout(()=>{if(fieldKind(input))check(input);else if(linkInput(input))checkLink(input);},350);},true);
  document.addEventListener('focusout',event=>{const input=event.target;if(!(input instanceof HTMLInputElement))return;if(fieldKind(input))check(input);else if(linkInput(input))checkLink(input);},true);
  window.CatalogDataGuard={suggestion,normalize};
})();
