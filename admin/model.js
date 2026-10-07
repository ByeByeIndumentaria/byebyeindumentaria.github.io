/* Pure helpers shared with the verification suite. */
(function(root) {
  function normalize(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' '); }
  function sizes(value) {
    const result = value.split(',').map(s=>s.trim()).filter(Boolean);
    if (!result.length || result.length > 20 || new Set(result.map(normalize)).size !== result.length) throw new Error('Ingresá talles diferentes, separados por coma.');
    if(result.some(s=>s.length>20 || /[<>"`]/.test(s))) throw new Error('Revisá los nombres de los talles.');
    return result;
  }
  function quantity(value) {
    if (String(value).trim()==='' || !/^\d+$/.test(String(value)) || Number(value)>9999) throw new Error('Usá cantidades enteras entre 0 y 9999; completá todas las celdas.');
    return Number(value);
  }
  function recalculate(packaging, packingType = 'mixed-colors') {
    if(!packaging) return;
    let complete=true,total=0;
    const rowTotals=[];
    for(const row of packaging.rows){
      const explicit = Number.isInteger(row.pieces) ? row.pieces : /^\d+(?: piezas(?: por color)?)?$/.test(String(row.pieces)) ? parseInt(row.pieces,10) : null;
      if(explicit !== null) { total+=explicit; rowTotals.push(explicit); continue; }
      const values=Object.values(row.sizePieces||{});
      if(!values.length || values.some(v=>!Number.isInteger(v)||v<0)) complete=false;
      else {
        row.pieces=values.reduce((a,b)=>a+b,0);
        total+=row.pieces;
        rowTotals.push(row.pieces);
      }
    }
    if(!complete || !rowTotals.length) { packaging.totalPieces=null; packaging.totalLabel=''; return; }
    if(packingType==='single-color') {
      const min=Math.min(...rowTotals),max=Math.max(...rowTotals);
      packaging.totalPieces=min===max?min:null;
      packaging.totalLabel=min===max?`${min} piezas por caja y color`:`${min}–${max} piezas por caja según color`;
      return;
    }
    packaging.totalPieces=total;
    packaging.totalLabel=`${total} piezas por caja`;
  }
  function validate(p, original = null) {
    for(const key of ['name','category','collection','subcategory']) if(!p[key]?.trim()) throw new Error('Completá nombre, colección, género y tipo de prenda.');
    if(!p.colors.length) throw new Error('Agregá al menos un color.');
    if(new Set(p.colors.map(normalize)).size!==p.colors.length) throw new Error('Hay colores repetidos.');
    if(!Array.isArray(p.outOfStockColors)) p.outOfStockColors=[];
    const productColors=new Set(p.colors.map(normalize));
    if(p.outOfStockColors.some(color=>!productColors.has(normalize(color)))) throw new Error('El stock por color incluye un color que ya no existe.');
    // The legacy storefront interpolates labels into HTML. Reject markup in editable text.
    const text=[p.name,p.orderNumber,p.description,p.subcategory,...p.colors,...p.sizes,...(p.purchaseOptions||[]).flatMap(option=>[option.label,option.sourcePacking,...(option.colors||[]),...(option.sizes||[])])];
    if(text.some(s=>/[<>"`]/.test(s||''))) throw new Error('Los textos no pueden incluir <, >, comillas dobles ni acentos invertidos.');
    const groups=p.purchaseOptions?.length?p.purchaseOptions:[p];
    if(p.purchaseOptions?.length) {
      if(p.purchaseOptions.length<2) throw new Error('Agregá al menos dos opciones de compra o usá una sola distribución.');
      if(new Set(p.purchaseOptions.map(option=>option.id)).size!==p.purchaseOptions.length) throw new Error('Las opciones de compra deben ser diferentes.');
      for(const option of p.purchaseOptions) {
        if(!option.id || !option.label?.trim()) throw new Error('Completá el nombre de cada opción de compra.');
        if(option.packingType && !['single-color','mixed-colors'].includes(option.packingType)) throw new Error('Elegí Caja por color o Surtido de colores en cada opción.');
      }
    }
    for(const [index, group] of groups.entries()) {
      const previous = original?.purchaseOptions?.length ? original.purchaseOptions[index] : original;
      if (previous && JSON.stringify(previous.packaging) === JSON.stringify(group.packaging) && JSON.stringify(previous.sizes) === JSON.stringify(group.sizes)) continue;
      if(!group.packaging) continue;
      if(!group.sizes?.length) throw new Error('Definí los talles o marcá curva pendiente.');
      for(const row of group.packaging.rows) {
        // Existing textual curves remain valid until explicitly edited.
        if(row.curveText && !Object.keys(row.sizePieces||{}).length) continue;
        for(const size of group.sizes) quantity(row.sizePieces?.[size]);
      }
    }
    return p;
  }
  function optionId(value, taken = []) {
    const base=normalize(value).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)||'opcion';
    const used=new Set(taken);let id=base,suffix=2;
    while(used.has(id)) id=`${base}-${suffix++}`;
    return id;
  }
  function packingLabel(type) {
    return type==='single-color'?'CAJA POR COLOR':'CAJA SURTIDA DE COLORES';
  }
  function collectionId(value) {
    const id=normalize(value).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    if(!id || id.length>60) throw new Error('Ingresá un nombre válido para la colección.');
    return id;
  }
  function validateCollection(c) {
    if(!c?.name?.trim()) throw new Error('Ingresá el nombre de la colección.');
    if(!['stock','preorder'].includes(c.type)) throw new Error('Elegí Stock o Preventa.');
    if([c.name,c.label,c.tagline].some(value=>/[<>"`]/.test(value||''))) throw new Error('Los textos no pueden incluir <, >, comillas dobles ni acentos invertidos.');
    return c;
  }
  const api={normalize,sizes,quantity,recalculate,validate,collectionId,validateCollection,optionId,packingLabel};
  if(typeof module!=='undefined') module.exports=api; else root.CatalogModel=api;
})(typeof window==='undefined'?{}:window);
