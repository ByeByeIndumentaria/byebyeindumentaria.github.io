'use strict';
/* Editor visual · "Funciones para las clientas" (settings.shop, las dibuja catalog-shop.js en el catálogo). */
(()=>{
  layerMeta.shop=['Funciones para las clientas','Tienda'];
  const goTo=layer=>button('Funciones para las clientas →',()=>{selectedEditId='';selectedEditLabel='';showLayer(layer);},'panel-link');
  renderers.shop=panel=>{
    let box=group('Favoritos ♡','Las clientas guardan prendas con un corazón. Se guardan en su teléfono; desde la lista pueden pasarlas al pedido o mandarlas por WhatsApp.');
    box.append(toggle('Mostrar favoritos','shop.favorites'),control('Nombre de la lista','shop.favoritesTitle'));panel.append(box);
    box=group('Vistos recientemente','Una fila debajo de las prendas con lo último que miró cada clienta. En el editor se muestra con prendas de ejemplo.');
    box.append(toggle('Mostrar vistos recientemente','shop.recent'),control('Título','shop.recentTitle'));panel.append(box);
    box=group('Tarjetas de las prendas','Fotos: se pasan con el dedo en el celular y con flechas en la computadora. Colores: tocar uno muestra su foto; usa el color de “Muestras de color” o, si no tiene, la foto vinculada a ese color.');
    box.append(toggle('Deslizar las fotos dentro de la tarjeta','shop.cardSwipe','Con el dedo en el celular y con flechas en la computadora'),toggle('Colores debajo del nombre','shop.cardColors','Tocar un color muestra su foto. Usa el color de “Muestras de color” o, si no tiene, la foto vinculada a ese color'),toggle('Botones para cambiar la vista (cantidad de columnas)','shop.gridToggle'));panel.append(box);
    box=group('Etiqueta “Nuevo”','Aparece sola en las prendas que se cargaron hace pocos días y se va sola. Para marcar una prenda que ya existía, abrila en Administración y tildá “Novedad”.');
    box.append(toggle('Mostrar la etiqueta','shop.newBadge'),control('Texto','shop.newLabel'),control('Días que dura','shop.newDays',{type:'range',min:3,max:60,number:true,suffix:' días'}));panel.append(box);
    box=group('Buscador','Mientras la clienta escribe aparecen sugerencias con foto, nombre y código, también de otras colecciones.');
    box.append(toggle('Mostrar sugerencias al buscar','shop.searchSuggest'));panel.append(box);
  };
  const baseGrid=renderers.grid;renderers.grid=panel=>{baseGrid(panel);panel.append(goTo('shop'));};renderers.products=renderers.grid;
  const baseLayers=renderLayers;
  renderLayers=function(panel){
    baseLayers(panel);const tree=panel.querySelector('.layer-tree');if(!tree||tree.querySelector('[data-shop-layer]'))return;
    const row=el('div',null,`layer-item${selectedLayer==='shop'?' active':''}`);row.dataset.shopLayer='1';row.append(button('Funciones para las clientas',()=>showLayer('shop')));
    const after=[...tree.querySelectorAll('.layer-item')].find(item=>/Precios/.test(item.firstElementChild?.textContent||''));after?after.after(row):tree.append(row);
  };
  renderers.layers=renderLayers;
  if(typeof settings!=='undefined'&&settings&&['layers','grid','products'].includes(selectedLayer))renderPanel();
})();
