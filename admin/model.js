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
  function recalculate(packaging) {
    if(!packaging) return;
    let complete=true,total=0;
    for(const row of packaging.rows){
      const explicit = Number.isInteger(row.pieces) ? row.pieces : /^\d+(?: piezas(?: por color)?)?$/.test(String(row.pieces)) ? parseInt(row.pieces,10) : null;
      if(explicit !== null) { total+=explicit; continue; }
      const values=Object.values(row.sizePieces||{});
      if(!values.length || values.some(v=>!Number.isInteger(v)||v<0)) complete=false;
      else total+=values.reduce((a,b)=>a+b,0);
    }
    packaging.totalPieces=complete?total:null;
    packaging.totalLabel=complete?`${total} piezas`:'';
  }
  function validate(p, original = null) {
    for(const key of ['name','category','collection','subcategory']) if(!p[key]?.trim()) throw new Error('Completá nombre, colección, género y tipo de prenda.');
    if(!p.colors.length) throw new Error('Agregá al menos un color.');
    if(new Set(p.colors.map(normalize)).size!==p.colors.length) throw new Error('Hay colores repetidos.');
    // The legacy storefront interpolates labels into HTML. Reject markup in editable text.
    const text=[p.name,p.orderNumber,p.description,p.subcategory,...p.colors,...p.sizes];
    if(text.some(s=>/[<>"`]/.test(s||''))) throw new Error('Los textos no pueden incluir <, >, comillas dobles ni acentos invertidos.');
    const groups=p.purchaseOptions?.length?p.purchaseOptions:[p];
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
  const api={normalize,sizes,quantity,recalculate,validate};
  if(typeof module!=='undefined') module.exports=api; else root.CatalogModel=api;
})(typeof window==='undefined'?{}:window);
