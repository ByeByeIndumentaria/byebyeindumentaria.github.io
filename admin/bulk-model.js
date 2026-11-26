/* Carga masiva · reglas puras (se prueban sin navegador).
   - Planilla: columnas, lectura de cada fila, cambios contra la prenda y prenda nueva.
   - Curva: "S:2 M:3 L:3" o "2,3,3" (en el orden de los talles).
   - Colores y talles: rearma la curva sin perder lo cargado.
   - Fotos: reconoce el código de la prenda (y el color) en el nombre del archivo. */
(function(root){
  const norm=value=>String(value??'').normalize('NFD').replace(/[̀-ͯ]/g,'').trim().toLowerCase().replace(/\s+/g,' ');
  const clean=value=>String(value??'').replace(/[<>"`]/g,'').trim();
  const list=value=>[...new Map(String(value??'').split(/[,;\n]/).map(clean).filter(Boolean).map(item=>[norm(item),item])).values()];
  const yes=value=>/^(si|sí|s|x|1|true|verdadero)$/i.test(norm(value));
  const no=value=>/^(no|n|0|false|falso)$/i.test(norm(value));
  const UNCHANGED='(distinta por color)';
  const BASE_COLUMNS=['Código','Nombre','Público','Tipo de prenda','Colecciones','Colores','Talles','Curva','Con stock','Visible','Precio','Insignia','Etiquetas','Descripción'];

  function parseCurve(text,sizes){
    const raw=String(text??'').trim();if(!raw||raw===UNCHANGED)return null;
    const out={};
    if(/[:=]/.test(raw)){for(const part of raw.split(/[\s,;]+/).filter(Boolean)){const [size,count]=part.split(/[:=]/);const match=sizes.find(item=>norm(item)===norm(size));if(!match)throw new Error(`La curva menciona el talle «${size}», que no está en Talles.`);if(!/^\d+$/.test(String(count||'')))throw new Error(`Cantidad inválida para el talle ${size}.`);out[match]=Number(count);}}
    else{const counts=raw.split(/[\s,;]+/).filter(Boolean);if(counts.length!==sizes.length)throw new Error(`La curva tiene ${counts.length} números y hay ${sizes.length} talles.`);counts.forEach((count,index)=>{if(!/^\d+$/.test(count))throw new Error(`Cantidad inválida: ${count}.`);out[sizes[index]]=Number(count);});}
    for(const size of sizes)out[size]??=0;return out;
  }
  function curveText(p){const rows=p.packaging?.rows||[];if(!rows.length)return'';const first=JSON.stringify(p.sizes.map(size=>rows[0].sizePieces?.[size]??null));if(rows.some(row=>JSON.stringify(p.sizes.map(size=>row.sizePieces?.[size]??null))!==first))return UNCHANGED;return (p.sizes||[]).map(size=>`${size}:${rows[0].sizePieces?.[size]??0}`).join(' ');}

  /* Rearma colores/talles/curva de una prenda con una sola opción de compra, conservando lo que ya tenía. */
  function applyColorsSizes(p,{colors=p.colors,sizes=p.sizes,curve=null}={},recalculate=null){
    const oldRows=new Map((p.packaging?.rows||[]).map(row=>[norm(row.color),row]));
    const keep=new Set(colors.map(norm));
    const hadCurve=(p.packaging?.rows||[]).length>0;
    p.colors=[...colors];p.sizes=[...sizes];
    if(curve||hadCurve){p.packaging??={rows:[]};p.packaging.rows=colors.map(color=>{const old=oldRows.get(norm(color))||{};const pieces={};for(const size of sizes)pieces[size]=curve?curve[size]:Number.isInteger(old.sizePieces?.[size])?old.sizePieces[size]:0;const row={...old,color,sizePieces:pieces};delete row.curveText;delete row.pieces;return row;});}
    p.outOfStockColors=(p.outOfStockColors||[]).filter(color=>keep.has(norm(color)));
    const sizeSet=new Set(sizes.map(norm));
    p.outOfStockVariants=Object.fromEntries(Object.entries(p.outOfStockVariants||{}).filter(([color])=>keep.has(norm(color))).map(([color,list])=>[color,list.filter(size=>sizeSet.has(norm(size)))]).filter(([,list])=>list.length));
    if(p.gallery?.colorGalleryIndexByNormalizedColor)p.gallery.colorGalleryIndexByNormalizedColor=Object.fromEntries(Object.entries(p.gallery.colorGalleryIndexByNormalizedColor).filter(([color])=>keep.has(norm(color))));
    if(recalculate&&p.packaging)recalculate(p.packaging,p.packingType||'mixed-colors');
    return p;
  }

  /* Prenda → fila de la planilla */
  function rowFromProduct(p,{collections=[],audiences=[],fields=[]}={}){
    const collectionName=id=>collections.find(c=>c.id===id)?.name||id,audience=audiences.find(([value])=>value===p.category);
    const row={'Código':p.orderNumber||'','Nombre':p.name||'','Público':audience?audience[1]:p.category||'','Tipo de prenda':(Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories:[p.subcategory].filter(Boolean)).join(', '),'Colecciones':(p.collections||[p.collection]).filter(Boolean).map(collectionName).join(', '),
      'Colores':p.purchaseOptions?.length?'(por opción de compra)':(p.colors||[]).join(', '),'Talles':p.purchaseOptions?.length?'(por opción de compra)':(p.sizes||[]).join(', '),'Curva':p.purchaseOptions?.length?'(por opción de compra)':curveText(p),
      'Con stock':p.inStock===false?'No':'Sí','Visible':p.isHidden?'No':'Sí','Precio':p.price??'','Insignia':p.customBadge?.label||'','Etiquetas':(p.tags||[]).join(', '),'Descripción':p.description||''};
    for(const field of fields){const value=p.fields?.[field.id];row[field.label]=value===true?'Sí':value===false?'No':value??'';}
    return row;
  }

  /* Fila → cambios sobre la prenda (o prenda nueva). Devuelve {payload, changes, errors}. */
  function applyRow(row,original,{collections=[],audiences=[],fields=[],recalculate=null,now=new Date().toISOString()}={}){
    const errors=[],changes=[],isNew=!original;const get=key=>row[key]===undefined||row[key]===null?undefined:String(row[key]).trim();
    const p=isNew?{name:'',orderNumber:'',category:'',subcategory:'',collection:'',collections:[],colors:[],outOfStockColors:[],sizes:[],packaging:{rows:[]},packingType:'mixed-colors',sourcePacking:'CAJA SURTIDA DE COLORES',inStock:true,description:'',gallery:{sources:[],colorGalleryIndexByNormalizedColor:{}},preserveProductName:true,preserveCatalogColors:true,isHidden:true,createdAt:now}:JSON.parse(JSON.stringify(original));
    const before=original?rowFromProduct(original,{collections,audiences,fields}):{};
    const changed=key=>{const value=get(key);return value!==undefined&&(isNew?value!=='':norm(value)!==norm(before[key]));};
    const set=(key,label,fn)=>{if(!changed(key))return;try{fn(get(key));changes.push(label);}catch(error){errors.push(`${label}: ${error.message}`);}};
    set('Código','código',value=>{p.orderNumber=clean(value).slice(0,60);});
    set('Nombre','nombre',value=>{if(!clean(value))throw new Error('no puede quedar vacío');p.name=clean(value).slice(0,120);});
    set('Público','público',value=>{const match=audiences.find(([v,label])=>norm(v)===norm(value)||norm(label)===norm(value));if(!match)throw new Error(`«${value}» no está en la lista de públicos`);p.category=match[0];});
    set('Tipo de prenda','tipo de prenda',value=>{const types=list(value);if(!types.length)throw new Error('no puede quedar vacío');p.subcategory=types[0];if(types.length>1)p.subcategories=types;else delete p.subcategories;});
    set('Colecciones','colecciones',value=>{const ids=list(value).map(item=>{const match=collections.find(c=>norm(c.id)===norm(item)||norm(c.name)===norm(item));if(!match)throw new Error(`no existe la colección «${item}»`);return match.id;});if(!ids.length)throw new Error('elegí al menos una');p.collections=[...new Set(ids)];if(!p.collections.includes(p.collection))p.collection=p.collections[0];});
    const structural=['Colores','Talles','Curva'].filter(key=>changed(key)&&(key!=='Curva'||get('Curva')!==''));
    if(structural.length){
      if(p.purchaseOptions?.length)errors.push('Colores, talles y curva: esta prenda tiene opciones de compra; cambialos en la ventana de la prenda.');
      else try{const colors=changed('Colores')?list(get('Colores')):p.colors,sizes=changed('Talles')?list(get('Talles')):p.sizes;if(!colors.length)throw new Error('Agregá al menos un color.');if(sizes.length>20)throw new Error('Hay más de 20 talles.');
        const curve=changed('Curva')?parseCurve(get('Curva'),sizes):null;applyColorsSizes(p,{colors,sizes,curve},recalculate);changes.push(structural.map(key=>key.toLowerCase()).join(', '));}catch(error){errors.push(error.message);}
    }
    set('Con stock','stock',value=>{if(yes(value))p.inStock=true;else if(no(value))p.inStock=false;else throw new Error('escribí Sí o No');});
    set('Visible','visible',value=>{if(yes(value))p.isHidden=false;else if(no(value))p.isHidden=true;else throw new Error('escribí Sí o No');});
    set('Precio','precio',value=>{const text=value.replace(/[$\s.]/g,'').replace(',','.');if(text===''){delete p.price;return;}const price=Number(text);if(!Number.isFinite(price)||price<0)throw new Error(`«${value}» no es un precio`);p.price=price;});
    set('Insignia','insignia',value=>{const text=clean(value).slice(0,24);if(text)p.customBadge={label:text,color:p.customBadge?.color||'#9d4f38'};else delete p.customBadge;});
    set('Etiquetas','etiquetas',value=>{const tags=list(value).map(tag=>tag.slice(0,30));if(tags.length)p.tags=tags;else delete p.tags;});
    set('Descripción','descripción',value=>{p.description=clean(value).slice(0,2000);});
    for(const field of fields)set(field.label,field.label.toLowerCase(),value=>{let next=clean(value).slice(0,200);if(field.type==='yesno')next=yes(value)?true:no(value)?false:'';if(field.type==='number'){const number=Number(String(value).replace(',','.'));next=value===''?'':Number.isFinite(number)?number:'';}if(next===''){if(p.fields)delete p.fields[field.id];}else{p.fields??={};p.fields[field.id]=next;}});
    if(isNew){for(const [key,label] of [['Nombre','el nombre'],['Público','el público'],['Tipo de prenda','el tipo de prenda'],['Colecciones','la colección'],['Colores','los colores'],['Talles','los talles']])if(!get(key))errors.push(`${/^los /.test(label)?'Faltan':'Falta'} ${label}.`);if(get('Visible')===undefined||get('Visible')==='')p.isHidden=true;}
    return{payload:p,changes,errors,isNew};
  }

  /* Fotos: "125-314.jpg", "125-314_2.jpg", "125-314 negro.jpg", "125-314-negro-3.webp" */
  function matchPhoto(fileName,products){
    const base=norm(String(fileName).replace(/\.[a-z0-9]+$/i,''));let best=null;
    for(const p of products){const code=norm(p.orderNumber);if(!code)continue;if(base===code||(base.startsWith(code)&&/^[\s_\-.(]/.test(base.slice(code.length)))){if(!best||code.length>norm(best.product.orderNumber).length)best={product:p};}}
    if(!best)return null;
    const rest=base.slice(norm(best.product.orderNumber).length).replace(/^[\s_\-.(]+/,'').replace(/[\s_\-.]*\(?\d+\)?$/,'').replace(/[\s_\-.(]+$/,'').replace(/[_\-.]+/g,' ').trim();
    const color=rest?(best.product.colors||[]).find(item=>norm(item)===rest||norm(item)===rest.replace(/\s+\d+$/,'')):null;
    const number=Number((base.match(/(\d+)\s*\)?$/)||[])[1]);
    return{product:best.product,color:color||null,order:Number.isFinite(number)&&base!==norm(best.product.orderNumber)?number:0};
  }

  const api={norm,list,parseCurve,curveText,applyColorsSizes,rowFromProduct,applyRow,matchPhoto,BASE_COLUMNS,UNCHANGED};
  if(typeof module!=='undefined')module.exports=api;else root.BulkModel=api;
})(typeof window==='undefined'?{}:window);
