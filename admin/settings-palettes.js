'use strict';
/* Editor visual · «Paletas sugeridas» en Estilo: combinaciones de colores pensadas como conjunto
   (fondos, texto, acentos, pie, barra de anuncio, avisos y WhatsApp) que se prueban con un toque.
   Se aplican al borrador: se ven en la vista previa, se deshacen con «Deshacer» y llegan a las clientas sólo con «Publicar». */
(()=>{
  const PALETTES=[
    {id:'arena',name:'Arena',text:'Cálida y luminosa: la de siempre, pero pareja. Fotos que resaltan sobre fondos claros.',
      colors:{page:'#efe9e1',catalog:'#f3eee7',surface:'#fbf8f3',surfaceAlt:'#f4eee6',filters:'#fffdf9',header:'#fbf8f3',text:'#2a2420',muted:'#6b6058',subtle:'#93877c',border:'#ddd3c7',photo:'#ece6de',accent:'#9a5a43',accentAlt:'#8a4e39',secondary:'#6f7559',available:'#4b6b4f',unavailable:'#a0473a',footerBg:'#2a2420',footerText:'#efe9e1',overlay:'#2a2420'},
      extra:{announce:['#2a2420','#f3eee7'],toast:['#2a2420','#fbf8f3'],whatsapp:['#4b6b4f','#ffffff'],theme:'#fbf8f3'}},
    {id:'galeria',name:'Blanco galería',text:'Blanco y negro, minimalista, como las grandes marcas. Lo único con color son las fotos.',
      colors:{page:'#ffffff',catalog:'#ffffff',surface:'#ffffff',surfaceAlt:'#f6f6f4',filters:'#ffffff',header:'#ffffff',text:'#141414',muted:'#555555',subtle:'#8a8a8a',border:'#e4e4e1',photo:'#f2f2f0',accent:'#141414',accentAlt:'#333333',secondary:'#6b6b6b',available:'#2f6b3f',unavailable:'#b0362b',footerBg:'#141414',footerText:'#f2f2f0',overlay:'#000000'},
      extra:{announce:['#141414','#ffffff'],toast:['#141414','#ffffff'],whatsapp:['#141414','#ffffff'],theme:'#ffffff'}},
    {id:'lino',name:'Lino y oliva',text:'Natural y serena: blancos rotos con detalles verde oliva.',
      colors:{page:'#f1efe8',catalog:'#f5f3ee',surface:'#fcfbf8',surfaceAlt:'#eeebe2',filters:'#fcfbf8',header:'#fcfbf8',text:'#23261f',muted:'#5d6156',subtle:'#8b8f82',border:'#d9d7cc',photo:'#e9e7df',accent:'#5e6b4e',accentAlt:'#4f5b41',secondary:'#8a6f4e',available:'#4e6b47',unavailable:'#a04a3b',footerBg:'#2c3227',footerText:'#ecebe3',overlay:'#23261f'},
      extra:{announce:['#5e6b4e','#fcfbf8'],toast:['#2c3227','#fcfbf8'],whatsapp:['#5e6b4e','#ffffff'],theme:'#fcfbf8'}},
    {id:'rosa',name:'Rosa empolvado',text:'Suave y femenina: rosados muy claros con un acento rosa viejo.',
      colors:{page:'#f6eeea',catalog:'#f8f2ef',surface:'#fffbf9',surfaceAlt:'#f3e9e4',filters:'#fffbf9',header:'#fffbf9',text:'#2e2428',muted:'#6e5f64',subtle:'#9a8a8f',border:'#e5d6d0',photo:'#efe5e0',accent:'#a55b53',accentAlt:'#934d46',secondary:'#7d7a6a',available:'#4f6b55',unavailable:'#a33f38',footerBg:'#2e2428',footerText:'#f6eeea',overlay:'#2e2428'},
      extra:{announce:['#a55b53','#fffbf9'],toast:['#2e2428','#fffbf9'],whatsapp:['#4f6b55','#ffffff'],theme:'#fffbf9'}},
    {id:'noche',name:'Piedra',text:'Grises tibios y elegantes, con negro suave. Sobria y moderna.',
      colors:{page:'#eceae6',catalog:'#f2f1ee',surface:'#faf9f7',surfaceAlt:'#ebe9e4',filters:'#faf9f7',header:'#faf9f7',text:'#1f1f1d',muted:'#5c5b57',subtle:'#8d8b86',border:'#d8d6d0',photo:'#e6e4df',accent:'#3d3b37',accentAlt:'#2c2a27',secondary:'#77735f',available:'#456b4c',unavailable:'#a1443a',footerBg:'#1f1f1d',footerText:'#eceae6',overlay:'#1f1f1d'},
      extra:{announce:['#1f1f1d','#f2f1ee'],toast:['#1f1f1d','#faf9f7'],whatsapp:['#456b4c','#ffffff'],theme:'#faf9f7'}},
  ];
  const isCurrent=palette=>Object.entries(palette.colors).every(([key,value])=>String(settings.tokens?.colors?.[key]||'').toLowerCase()===value);
  // Colores puestos a mano en «Este elemento» mandan sobre la paleta; al cambiar de paleta se ofrece quitarlos.
  const manualColors=()=>Object.entries(settings.elementStyles||{}).filter(([,style])=>style&&['color','background','borderColor'].some(key=>style[key]));
  const LABELS={searchBar:'Búsqueda y filtros','card.name':'Nombre de la prenda','header.tagline':'Texto de arriba del encabezado','card.code':'Código de la prenda','card.category':'Categoría de la prenda',header:'Encabezado',footer:'Pie',hero:'Flyers'};
  function apply(palette){
    const manual=manualColors();let clear=false;
    if(manual.length)clear=confirm(`Tenés colores puestos a mano en ${manual.length} ${manual.length===1?'elemento':'elementos'} (${manual.slice(0,4).map(([id])=>LABELS[id]||id).join(', ')}${manual.length>4?'…':''}). Esos no cambian con la paleta.\n\n¿Los quito para que todo siga la paleta nueva?\n(Aceptar = quitarlos · Cancelar = dejarlos)`);
    remember();settings.tokens.colors={...settings.tokens.colors,...palette.colors};
    if(clear)for(const [id,style] of manual){for(const key of ['color','background','borderColor','borderWidth'])delete style[key];if(!Object.keys(style).length)delete settings.elementStyles[id];}
    const [announceBg,announceText]=palette.extra.announce,[toastBg,toastText]=palette.extra.toast,[waBg,waText]=palette.extra.whatsapp;
    Object.assign(settings.announcementBar??={},{background:announceBg,textColor:announceText});
    Object.assign(settings.toast??={},{background:toastBg,textColor:toastText});
    Object.assign(settings.whatsapp??={},{floatingColor:waBg,floatingTextColor:waText});
    Object.assign(settings.footer??={},{background:palette.colors.footerBg,textColor:palette.colors.footerText});
    settings.meta??={};settings.meta.themeColor=palette.extra.theme;
    setDirty();renderPanel();notify(`Paleta «${palette.name}» aplicada en la vista previa. Si no te gusta, tocá «Deshacer». Para que la vean las clientas, «Publicar».`);
  }
  function card(palette){
    const box=el('article',null,`palette-card${isCurrent(palette)?' active':''}`),strip=el('div',null,'palette-strip');
    for(const key of ['page','surface','photo','text','accent','footerBg'])strip.append(Object.assign(el('span'),{title:key,style:`background:${palette.colors[key]}`}));
    const sample=el('div',null,'palette-sample');sample.style.background=palette.colors.catalog;sample.style.color=palette.colors.text;
    const fake=el('div',null,'palette-fake-card');fake.style.background=palette.colors.photo;const info=el('div',null,'palette-fake-info');info.append(Object.assign(el('small','REMERAS'),{style:`color:${palette.colors.muted}`}),el('strong','Remera broderie'),Object.assign(el('em','Cód. T02'),{style:`color:${palette.colors.subtle}`}));
    const pill=el('span','Agregar al pedido','palette-fake-button');pill.style.background=palette.colors.accent;pill.style.color='#fff';sample.append(fake,info,pill);
    const head=el('div',null,'palette-head');head.append(el('strong',palette.name),isCurrent(palette)?el('small','En uso','palette-current'):button('Usar esta',()=>apply(palette),'palette-use'));
    box.append(strip,sample,head,el('p',palette.text));return box;
  }
  const base=renderers.theme;
  renderers.theme=panel=>{
    const box=group('Paletas sugeridas','Combinaciones pensadas para que todo combine: fondos, textos, botones, pie, barra de anuncio y avisos. Probalas: se ven al instante y se deshacen con «Deshacer».');
    const grid=el('div',null,'palette-grid');for(const palette of PALETTES)grid.append(card(palette));box.append(grid);panel.append(box);
    base(panel);
  };
  window.CatalogPalettes=PALETTES;
  if(typeof settings!=='undefined'&&settings&&selectedLayer==='theme')renderPanel();
})();
