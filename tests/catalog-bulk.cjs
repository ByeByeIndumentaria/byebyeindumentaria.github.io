const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const B=require('../admin/bulk-model.js'),M=require('../admin/model.js');
const ctx={collections:[{id:'verano-2027',name:'Verano 2027'}],audiences:[['MUJER','Mujer'],['HOMBRE','Hombre']],fields:[{id:'tela',label:'Tela',type:'text'}],recalculate:M.recalculate};
const product=()=>({name:'Remera',orderNumber:'T01',category:'MUJER',subcategory:'Remeras',collection:'verano-2027',collections:['verano-2027'],colors:['Negro','Blanco'],sizes:['S','M'],packaging:{rows:[{color:'Negro',sizePieces:{S:2,M:3}},{color:'Blanco',sizePieces:{S:2,M:3}}]},packingType:'mixed-colors',outOfStockColors:['Blanco'],inStock:true,gallery:{sources:['a.jpg'],colorGalleryIndexByNormalizedColor:{blanco:0}}});

test('a downloaded sheet uploaded without changes changes nothing',()=>{
  const p=product(),row=B.rowFromProduct(p,ctx);
  assert.equal(row['Curva'],'S:2 M:3');assert.equal(row['Público'],'Mujer');assert.equal(row['Colecciones'],'Verano 2027');
  assert.deepEqual(B.applyRow(row,p,ctx).changes,[]);
});

test('sheet rows change prices, stock, colors, sizes and curve, and keep what was loaded',()=>{
  const p=product(),row={...B.rowFromProduct(p,ctx),'Precio':'$ 25.000','Con stock':'No','Colores':'Negro, Rojo','Talles':'S, M, L','Tela':'Lino'};
  const out=B.applyRow(row,p,ctx);
  assert.deepEqual(out.errors,[]);assert.equal(out.payload.price,25000);assert.equal(out.payload.inStock,false);assert.equal(out.payload.fields.tela,'Lino');
  assert.deepEqual(out.payload.packaging.rows.map(r=>[r.color,r.sizePieces]),[['Negro',{S:2,M:3,L:0}],['Rojo',{S:0,M:0,L:0}]]);
  assert.deepEqual(out.payload.outOfStockColors,[]);assert.deepEqual(out.payload.gallery.colorGalleryIndexByNormalizedColor,{});
  assert.deepEqual(B.applyRow({...B.rowFromProduct(p,ctx),'Curva':'1,2'},p,ctx).payload.packaging.rows[1].sizePieces,{S:1,M:2});
});

test('new products are created hidden and valid; incomplete rows explain what is missing',()=>{
  const ok=B.applyRow({'Código':'N1','Nombre':'Buzo','Público':'Hombre','Tipo de prenda':'Buzos','Colecciones':'verano 2027','Colores':'Negro','Talles':'M, L','Curva':'M:2 L:2'},null,ctx);
  assert.deepEqual(ok.errors,[]);assert.equal(ok.payload.isHidden,true);M.validate(ok.payload);
  const bad=B.applyRow({'Código':'N2','Nombre':'X','Público':'Marciano'},null,ctx);
  assert.ok(bad.errors.some(e=>/Marciano/.test(e)));assert.ok(bad.errors.includes('Faltan los colores.'));
  assert.throws(()=>B.parseCurve('S:2 XL:3',['S','M']),/XL/);assert.throws(()=>B.parseCurve('1,2,3',['S','M']),/3 números/);
});

test('photos find their product (and color) by the file name',()=>{
  const products=[{orderNumber:'125-314',colors:['Negro']},{orderNumber:'125-31',colors:[]},{orderNumber:'T01',colors:['Gris Claro']}];
  const pick=name=>{const m=B.matchPhoto(name,products);return m&&[m.product.orderNumber,m.color,m.order];};
  assert.deepEqual(pick('125-314.jpg'),['125-314',null,0]);assert.deepEqual(pick('125-314_2.JPG'),['125-314',null,2]);
  assert.deepEqual(pick('125-314 negro.jpg'),['125-314','Negro',0]);assert.deepEqual(pick('125-31.png'),['125-31',null,0]);
  assert.deepEqual(pick('T01 gris claro (2).jpg'),['T01','Gris Claro',2]);assert.equal(pick('otra.jpg'),null);
});

test('the products screen offers bulk loading and group size/color changes',()=>{
  const html=fs.readFileSync('admin/index.html','utf8'),bulk=fs.readFileSync('admin/products-bulk.js','utf8');
  assert.ok(html.indexOf('bulk-model.js?v=')<html.indexOf('products-bulk.js?v='));
  for(const text of ['Cargar en cantidad','Descargar planilla con todas las prendas','Subir planilla completada','Fotos por código','Cambiar un nombre en todas','Agregar talle…','Quitar talle…','Agregar color…','Quitar color…'])assert.ok(bulk.includes(text),text);
  assert.match(bulk,/cdnjs\.cloudflare\.com\/ajax\/libs\/xlsx\/0\.18\.5\//);
  assert.match(fs.readFileSync('admin/products-tools.js','utf8'),/ProductBulk\?\.bulkActions/);
});
