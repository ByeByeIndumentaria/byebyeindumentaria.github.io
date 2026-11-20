'use strict';
/* Fotos de las prendas: "Encuadrar" (zoom y posición), "Principal" y ordenar arrastrando.
   Funciona en la ventana de la prenda (admin/index.html) y en "Ficha de producto" del editor visual.
   Usa window.PhotoFrames (photo-frame.js). */
(()=>{
  const frames=window.PhotoFrames;if(!frames)return;
  const make=(tag,text,className)=>{const node=document.createElement(tag);if(text!=null)node.textContent=text;if(className)node.className=className;return node;};
  let ratio='3/4',background='#d6c8b7';
  frames.look().then(site=>{ratio=site.ratio;background=site.background;document.querySelectorAll('.photo-frame-thumb').forEach(node=>{node.style.aspectRatio=String(ratio).replace('/',' / ');node.style.background=background;});});

  // Pone la foto dentro de un marco con la proporción de la grilla, para ver el encuadre real.
  function framedThumb(img,frame,onOpen){
    let wrap=img.parentElement;
    if(!wrap?.classList.contains('photo-frame-thumb')){wrap=make('div',null,'photo-frame-thumb');img.replaceWith(wrap);wrap.append(img);}
    wrap.style.aspectRatio=String(ratio).replace('/',' / ');wrap.style.background=background;
    frames.apply(img,frame);
    wrap.title='Tocá para encuadrar';wrap.onclick=onOpen;
    const badge=wrap.querySelector('.photo-frame-badge')||make('span',null,'photo-frame-badge');badge.textContent=frame?'Encuadrada':'';badge.hidden=!frame;wrap.append(badge);
  }
  async function chooseFrame(product,src,url,index,done){
    const result=await frames.open({url,frame:frames.get(product,src),title:`Encuadrar foto ${index+1}`});
    if(result===undefined||result===null)return;
    frames.set(product,src,result===false?null:result);done();
  }
  function decorate(card,{product,src,url,index,total,img,actions,move,changed,removeLabel}){
    framedThumb(img,frames.get(product,src),()=>chooseFrame(product,src,url,index,changed));
    if(actions.querySelector('.photo-frame-button'))return;
    const frameButton=make('button','Encuadrar','photo-frame-button');frameButton.type='button';frameButton.onclick=()=>chooseFrame(product,src,url,index,changed);
    actions.prepend(frameButton);
    if(index>0){const first=make('button','Principal','photo-first-button');first.type='button';first.title='Usar como foto de portada (la que se ve en la grilla)';first.onclick=()=>move(index,0);frameButton.after(first);}
    else card.classList.add('photo-is-first');
    if(index===0&&!card.querySelector('.photo-cover-label'))card.append(Object.assign(make('span','Portada','photo-cover-label'),{title:'Esta es la foto que se ve en la grilla del catálogo'}));
  }

  /* ——— Ventana de la prenda (admin/index.html) ——— */
  if(typeof renderPhotos==='function'&&typeof normalizeGallery==='function'){
    const base=renderPhotos;
    renderPhotos=function(){
      base();
      const list=document.getElementById('photos'),g=normalizeGallery(editing),cards=[...list.querySelectorAll('.photo-item')];
      cards.forEach((card,index)=>{const src=g.sources[index],img=card.querySelector('img');if(!src||!img)return;
        decorate(card,{product:editing,src,url:photoSrc(src),index,total:cards.length,img,actions:card.querySelector('.photo-actions'),move:(from,to)=>movePhoto(from,to),changed:()=>{dirty=true;renderPhotos();}});});
      frames.sortable(list,'.photo-item',(from,to)=>movePhoto(from,to));
    };
  }

  /* ——— "Ficha de producto" del editor visual (admin/settings.html) ——— */
  if(typeof renderPanel==='function'&&typeof embeddedProductDraft==='function'){
    const base=renderPanel;
    renderPanel=function(){
      base();
      const grid=document.querySelector('#panel-content .embedded-photo-grid');if(!grid)return;
      const product=embeddedProductDraft();if(!product)return;const group=embeddedProductGroup(product),gallery=embeddedGallery(group),cards=[...grid.querySelectorAll('.embedded-photo-card')];
      const move=(from,to)=>moveEmbeddedPhoto(product,group,from,to);
      cards.forEach((card,index)=>{const src=gallery.sources[index],img=card.querySelector('img');if(!src||!img)return;
        decorate(card,{product,src,url:embeddedPhotoSrc(src),index,total:cards.length,img,actions:card.querySelector('.embedded-photo-actions'),move,changed:()=>changeEmbeddedProduct(product,{redraw:true})});});
      frames.sortable(grid,'.embedded-photo-card',move);
    };
    if(typeof settings!=='undefined'&&settings)renderPanel();
  }
})();
