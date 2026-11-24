'use strict';
/* Encuadre de fotos (zoom y posición) sin modificar la foto original.
   Se guarda en la prenda como photoFrames:[{src,zoom,x,y}]:
   - zoom 1 = foto entera dentro del cuadro; más de 1 = acercada.
   - x, y (0–100) = punto que queda fijo al acercar; mover la foto lo cambia.
   El catálogo (catalog-site.js) lo aplica igual: object-fit:contain + scale + transform-origin.
   Se carga en las dos pantallas de administración. */
(()=>{
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const MAX_ZOOM=8;
  const HEX=/^#[0-9a-f]{6}$/i;
  const edgeCache=new Map();
  // Devuelve el color del fondo de la foto mirando sus bordes: los costados si la foto es más angosta que el cuadro, arriba y abajo si es más ancha.
  function edgeColor(url,boxRatio=.75){
    const key=`${url}|${boxRatio}`;if(edgeCache.has(key))return edgeCache.get(key);
    const promise=new Promise(resolve=>{const img=new Image();if(!/^(blob|data):/.test(url))img.crossOrigin='anonymous';
      img.onload=()=>{try{const W=48,H=Math.max(2,Math.round(48*img.naturalHeight/img.naturalWidth)),canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,W,H);const data=ctx.getImageData(0,0,W,H).data,pixels=[],add=(x,y)=>{const i=(y*W+x)*4;pixels.push([data[i],data[i+1],data[i+2]]);};
        if(img.naturalWidth/img.naturalHeight<boxRatio){for(let y=0;y<H;y++){add(0,y);add(1,y);add(W-1,y);add(W-2,y);}}else{for(let x=0;x<W;x++){add(x,0);add(x,1);add(x,H-1);add(x,H-2);}}
        const median=k=>{const values=pixels.map(p=>p[k]).sort((a,b)=>a-b);return values[values.length>>1];};resolve('#'+[0,1,2].map(k=>median(k).toString(16).padStart(2,'0')).join(''));}catch{resolve(null);}};
      img.onerror=()=>resolve(null);img.src=url;});
    edgeCache.set(key,promise);return promise;
  }
  function valid(frame){
    if(!frame||typeof frame!=='object')return null;
    const zoom=Number(frame.zoom),x=Number(frame.x),y=Number(frame.y);
    if(!Number.isFinite(zoom)||!Number.isFinite(x)||!Number.isFinite(y))return null;
    const clean={zoom:clamp(zoom,1,MAX_ZOOM),x:clamp(x,0,100),y:clamp(y,0,100)};if(HEX.test(frame.bg||''))clean.bg=frame.bg.toLowerCase();return clean;
  }
  const list=product=>Array.isArray(product?.photoFrames)?product.photoFrames:[];
  function get(product,src){return valid(list(product).find(item=>item?.src===src));}
  function set(product,src,frame){
    const rest=list(product).filter(item=>item?.src!==src),clean=valid(frame);
    if(clean)rest.push({src,zoom:Math.round(clean.zoom*1000)/1000,x:Math.round(clean.x*10)/10,y:Math.round(clean.y*10)/10,...(clean.bg?{bg:clean.bg}:{})});
    if(rest.length)product.photoFrames=rest;else delete product.photoFrames;
  }
  function remap(product,from,to){for(const item of list(product))if(item?.src===from)item.src=to;}
  function prune(product){
    if(!product||!('photoFrames' in product))return;
    const used=new Set([product,...(product.purchaseOptions||[])].flatMap(target=>target?.gallery?.sources||[]));
    const kept=list(product).filter(item=>used.has(item?.src)&&valid(item));
    if(kept.length)product.photoFrames=kept;else delete product.photoFrames;
  }
  function apply(img,frame){
    const clean=valid(frame);
    if(!clean){if(img.dataset.photoFrame){img.style.removeProperty('object-fit');img.style.removeProperty('scale');img.style.removeProperty('transform-origin');img.style.removeProperty('background-color');delete img.dataset.photoFrame;}return;}
    img.style.setProperty('object-fit','contain','important');
    img.style.setProperty('scale',String(clean.zoom));
    img.style.setProperty('transform-origin',`${clean.x}% ${clean.y}%`);
    if(clean.bg)img.style.setProperty('background-color',clean.bg);else img.style.removeProperty('background-color');
    img.dataset.photoFrame='1';
  }

  /* ——— Ajustes del catálogo publicado (proporción y color de fondo de las fotos) ——— */
  let siteLook=null;
  async function look(){
    if(typeof settings!=='undefined'&&settings?.grid)return{ratio:settings.grid.imageRatio||'3/4',fit:settings.grid.imageFit||'cover',background:settings.colors?.photo||'#d6c8b7'};
    if(!siteLook)siteLook=(async()=>{try{const row=await window.CatalogAPI?.getSiteSettings?.();const value=row?.payload||row?.published_payload||row||{};return{ratio:value.grid?.imageRatio||'3/4',fit:value.grid?.imageFit||'cover',background:value.colors?.photo||'#d6c8b7'};}catch{return{ratio:'3/4',fit:'cover',background:'#d6c8b7'};}})();
    return siteLook;
  }
  const ratioNumber=text=>{const [w,h]=String(text||'3/4').split('/').map(Number);return w>0&&h>0?w/h:.75;};

  /* ——— Ventana para encuadrar ——— */
  function open({url,frame,title='Encuadrar foto'}){
    return look().then(site=>new Promise(resolve=>{
      const node=(tag,text,className)=>{const item=document.createElement(tag);if(text!=null)item.textContent=text;if(className)item.className=className;return item;};
      const dialog=node('dialog',null,'photo-frame-dialog'),stage=node('div',null,'photo-frame-stage'),box=node('div',null,'photo-frame-box'),img=node('img');
      img.alt='';img.draggable=false;box.style.aspectRatio=String(site.ratio).replace('/',' / ');box.style.background=site.background;box.append(img,node('div',null,'photo-frame-grid'));stage.append(box);
      const status=node('p','','photo-frame-status'),zoomLabel=node('output','100 %'),slider=node('input');slider.type='range';slider.min='100';slider.max='400';slider.step='1';slider.setAttribute('aria-label','Acercar o alejar');
      const zoomRow=node('label',null,'photo-frame-zoom');zoomRow.append(node('span','−'),slider,node('span','+'),zoomLabel);
      const quick=node('div',null,'photo-frame-quick'),whole=node('button','Foto entera'),fill=node('button','Llenar el cuadro'),center=node('button','Centrar');
      for(const item of [whole,fill,center])item.type='button';quick.append(whole,fill,center);
      const bgRow=node('div',null,'photo-frame-bg'),bgInput=node('input'),bgAuto=node('button','Igual a la foto');bgInput.type='color';bgInput.setAttribute('aria-label','Color de los bordes');bgAuto.type='button';
      const bgLabel=node('span','Color de los bordes');bgRow.append(bgLabel,bgInput,bgAuto);let autoBg=null;
      const help=node('p','Arrastrá la foto para moverla. Para acercar: usá la barra, pellizcá con dos dedos o la ruedita del mouse.','photo-frame-help');
      const footer=node('div',null,'photo-frame-footer'),reset=node('button','Como estaba al principio','photo-frame-reset'),cancel=node('button','Cancelar'),done=node('button','Listo','primary');
      for(const item of [reset,cancel,done])item.type='button';footer.append(reset,cancel,done);
      const head=node('div',null,'photo-frame-head');head.append(node('strong',title),node('small','Así se va a ver en la grilla del catálogo. La foto original no se modifica.'));
      dialog.append(head,stage,zoomRow,quick,bgRow,status,help,footer);document.body.append(dialog);

      let state=valid(frame),natural=null,cover=1;
      const size=()=>{const rect=box.getBoundingClientRect();return{w:rect.width,h:rect.height};};
      function measure(){const {w,h}=size();if(!natural||!w||!h)return;const fit=Math.min(w/natural.w,h/natural.h);cover=Math.max(w/(natural.w*fit),h/(natural.h*fit));slider.max=String(Math.round(Math.max(400,cover*150)));}
      // Mantiene la foto pegada a los bordes: si es más grande que el cuadro no deja huecos; si es más chica queda centrada.
      function settle(){
        const {w,h}=size();if(!natural||!w||!h)return;const fit=Math.min(w/natural.w,h/natural.h),z=state.zoom;
        const axis=(boxSize,imageSize,origin)=>{const scaled=imageSize*z;if(scaled<boxSize-.5||z<=1.0001)return 50;const a=(boxSize-imageSize)/2,lo=a*z/(z-1),hi=((a+imageSize)*z-boxSize)/(z-1);return clamp(clamp(origin/100*boxSize,lo,hi)/boxSize*100,0,100);};
        state.x=axis(w,natural.w*fit,state.x);state.y=axis(h,natural.h*fit,state.y);
      }
      function draw(){
        settle();apply(img,state);box.style.background=state.bg||site.background;bgInput.value=state.bg||autoBg||'#ffffff';bgAuto.disabled=!autoBg||state.bg===autoBg;slider.value=String(Math.round(state.zoom*100));zoomLabel.textContent=`${Math.round(state.zoom*100)} %`;
        const filled=state.zoom>=cover-.01;status.textContent=filled?'Llena todo el cuadro.':state.zoom<=1.001?'Se ve la foto entera; los bordes se completan con el color del fondo de la foto.':'Acercada, pero todavía se ve parte del fondo. Tocá “Llenar el cuadro” si no querés bordes.';status.dataset.filled=String(filled);
      }
      const setZoom=value=>{state.zoom=clamp(value,1,Number(slider.max)/100);draw();};
      img.onload=()=>{natural={w:img.naturalWidth,h:img.naturalHeight};measure();if(!state)state={zoom:site.fit==='contain'?1:cover,x:50,y:50};draw();
        const {w,h}=size();edgeColor(url,w&&h?w/h:ratioNumber(site.ratio)).then(color=>{autoBg=color;if(color&&!state.bg)state.bg=color;draw();});};
      img.onerror=()=>{status.textContent='No se pudo cargar la foto.';};
      img.src=url;
      slider.oninput=()=>setZoom(Number(slider.value)/100);
      bgInput.oninput=()=>{if(state){state.bg=bgInput.value;draw();}};bgAuto.onclick=()=>{if(state&&autoBg){state.bg=autoBg;draw();}};
      whole.onclick=()=>{state.zoom=1;state.x=50;state.y=50;draw();};
      fill.onclick=()=>{state.zoom=cover;draw();};
      center.onclick=()=>{state.x=50;state.y=50;draw();};
      box.addEventListener('wheel',event=>{if(!state)return;event.preventDefault();setZoom(state.zoom*(event.deltaY<0?1.06:1/1.06));},{passive:false});
      const pointers=new Map();let drag=null,pinch=null;
      box.addEventListener('pointerdown',event=>{if(!state)return;box.setPointerCapture(event.pointerId);pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y)||1,zoom:state.zoom};drag=null;}else drag={x:event.clientX,y:event.clientY,ox:state.x,oy:state.y};event.preventDefault();});
      box.addEventListener('pointermove',event=>{if(!pointers.has(event.pointerId))return;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
        if(pinch&&pointers.size>=2){const [a,b]=[...pointers.values()];setZoom(pinch.zoom*(Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));return;}
        if(!drag)return;const {w,h}=size(),z=state.zoom;if(z<=1.0001)return;
        state.x=drag.ox-(event.clientX-drag.x)/(w*(z-1))*100;state.y=drag.oy-(event.clientY-drag.y)/(h*(z-1))*100;draw();});
      const release=event=>{pointers.delete(event.pointerId);if(pointers.size<2)pinch=null;if(!pointers.size)drag=null;else{const [rest]=[...pointers.values()];drag={x:rest.x,y:rest.y,ox:state.x,oy:state.y};}};
      box.addEventListener('pointerup',release);box.addEventListener('pointercancel',release);
      const resize=()=>{measure();if(state)draw();};addEventListener('resize',resize);
      const finish=value=>{removeEventListener('resize',resize);dialog.close();dialog.remove();resolve(value);};
      done.onclick=()=>finish(state?{...state}:null);cancel.onclick=()=>finish(undefined);reset.onclick=()=>finish(false);
      dialog.addEventListener('cancel',event=>{event.preventDefault();finish(undefined);});
      dialog.showModal();
    }));
  }

  /* ——— Ordenar fotos arrastrando (sirve con mouse y con el dedo) ——— */
  function sortable(container,itemSelector,onMove){
    container.querySelectorAll(itemSelector).forEach((item,index)=>{
      if(item.querySelector('.photo-drag'))return;
      const handle=document.createElement('button');handle.type='button';handle.className='photo-drag';handle.textContent='⠿';handle.title='Arrastrá para cambiar el orden';handle.setAttribute('aria-label',`Arrastrar foto ${index+1} para cambiar el orden`);
      item.prepend(handle);
      handle.addEventListener('pointerdown',event=>{
        event.preventDefault();handle.setPointerCapture(event.pointerId);item.classList.add('photo-dragging');let target=null;
        const move=moveEvent=>{const under=document.elementFromPoint(moveEvent.clientX,moveEvent.clientY)?.closest(itemSelector);container.querySelectorAll('.photo-drop-target').forEach(node=>node.classList.remove('photo-drop-target'));target=under&&under!==item&&container.contains(under)?under:null;target?.classList.add('photo-drop-target');};
        const up=()=>{handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',up);handle.removeEventListener('pointercancel',up);item.classList.remove('photo-dragging');container.querySelectorAll('.photo-drop-target').forEach(node=>node.classList.remove('photo-drop-target'));if(target){const items=[...container.querySelectorAll(itemSelector)];onMove(items.indexOf(item),items.indexOf(target));}};
        handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',up);handle.addEventListener('pointercancel',up);
      });
    });
  }

  window.PhotoFrames={valid,get,set,remap,prune,apply,open,sortable,look,edgeColor};
})();
