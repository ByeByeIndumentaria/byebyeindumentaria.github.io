'use strict';
/* Editor visual · Etapa 4: panel "Muestras de color" ordenado.
   - Buscador de colores.
   - Una sola fila por color aunque esté escrito de varias formas ("Gris claro" / "Gris Claro"): ya compartían la misma muestra.
   - Segundo tono para colores combinados ("Azul/Negro", "Beige con Caqui").
   - Aviso de los colores escritos de más de una forma, sin renombrarlos: el ERP y Notas de pedido usan esos nombres. */
(()=>{
  const mixed=name=>/\/|\scon\s|\sy\s|vivo/i.test(name);
  function colorGroups(){
    const groups=new Map();
    for(const product of products){
      const names=[...(product.colors||[]),...(product.purchaseOptions||[]).flatMap(option=>option.colors||[])];
      for(const name of new Set(names)){const key=model.normalize(name);if(!key)continue;const group=groups.get(key)||{key,spellings:new Map(),products:new Set()};group.spellings.set(name,(group.spellings.get(name)||0)+1);group.products.add(product.name||`#${product.id}`);groups.set(key,group);}
    }
    return [...groups.values()].map(group=>{const spellings=[...group.spellings.entries()].sort((a,b)=>b[1]-a[1]);return{...group,name:spellings[0][0],others:spellings.slice(1).map(([name])=>name),count:group.products.size};}).sort((a,b)=>a.name.localeCompare(b.name,'es'));
  }
  function swatchInput(label,map,key,fallback){
    const input=el('input');input.type='color';input.setAttribute('aria-label',label);input.title=label;
    input.value=/^#[0-9a-f]{6}$/i.test(settings.colorSwatches[map]?.[key]||'')?settings.colorSwatches[map][key]:fallback;
    input.oninput=()=>{remember();settings.colorSwatches[map]??={};settings.colorSwatches[map][key]=input.value;if(map==='second')settings.colorSwatches.values[key]??='#777777';setDirty();};
    return input;
  }
  renderers.colors=panel=>{
    settings.colorSwatches.values??={};settings.colorSwatches.second??={};
    const intro=group('Muestras de color','Elegí el color real de cada nombre. Se muestra como un circulito en la ficha de la prenda.');
    intro.append(toggle('Mostrar muestras de color','colorSwatches.enabled'),toggle('Mostrar también el nombre','colorSwatches.showLabels'));
    panel.append(intro);
    const groups=colorGroups(),duplicates=groups.filter(group=>group.others.length);
    if(duplicates.length){
      const warn=el('div',null,'color-duplicates');
      warn.append(el('strong',`${duplicates.length} colores están escritos de más de una forma`),el('p','Comparten la misma muestra, así que acá aparecen una sola vez. En las prendas siguen escritos distinto. Para unificarlos, avisale a la persona que administra el sistema: también hay que revisar el stock y Notas de pedido.'));
      const list=el('ul');for(const group of duplicates.slice(0,8))list.append(el('li',[group.name,...group.others].map(name=>`«${name}»`).join(' · ')));if(duplicates.length>8)list.append(el('li',`y ${duplicates.length-8} más…`));
      warn.append(list);panel.append(warn);
    }
    const search=el('input');search.type='search';search.placeholder=`Buscar entre ${groups.length} colores`;search.className='color-search';search.setAttribute('aria-label','Buscar color');
    const list=el('div',null,'color-library');
    const draw=()=>{
      const query=model.normalize(search.value||'');list.replaceChildren();
      const visible=groups.filter(group=>!query||group.key.includes(query)||group.others.some(name=>model.normalize(name).includes(query)));
      for(const group of visible){
        const row=el('div',null,'color-row'),copy=el('div',null,'color-row-copy');
        copy.append(el('strong',group.name),el('small',`${group.count} ${group.count===1?'prenda':'prendas'}${group.others.length?` · también «${group.others.join('», «')}»`:''}`));
        const tones=el('div',null,'color-row-tones');tones.append(swatchInput(`Color de ${group.name}`,'values',group.key,'#777777'));
        const hasSecond=!!settings.colorSwatches.second[group.key];
        if(hasSecond||mixed(group.name)){tones.append(swatchInput(`Segundo tono de ${group.name}`,'second',group.key,hasSecond?settings.colorSwatches.second[group.key]:'#ffffff'));if(hasSecond)tones.append(button('×',()=>{remember();delete settings.colorSwatches.second[group.key];setDirty();draw();},'color-remove-second'));}
        else tones.append(button('+ 2.º tono',()=>{remember();settings.colorSwatches.second[group.key]='#ffffff';settings.colorSwatches.values[group.key]??='#777777';setDirty();draw();},'color-add-second'));
        row.append(copy,tones);list.append(row);
      }
      if(!visible.length)list.append(el('p','No hay colores con ese nombre.','panel-empty'));
    };
    search.oninput=draw;draw();
    panel.append(search,list);
  };
})();
