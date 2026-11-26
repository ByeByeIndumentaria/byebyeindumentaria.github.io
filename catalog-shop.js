'use strict';
/* Funciones para las clientas (Paquete 1), se prenden o apagan desde el editor visual (settings.shop):
   - Favoritos ♡: se guardan en el teléfono de la clienta; lista con "Agregar todas al pedido" y "Enviar por WhatsApp".
   - Vistos recientemente: fila debajo de la grilla.
   - Cambiar la vista de la grilla (columnas).
   - Deslizar fotos dentro de la tarjeta (dedo en celular, flechas en computadora).
   - Colores en la tarjeta: tocar uno muestra la foto de ese color.
   - Buscador con sugerencias (foto, nombre, código; también de otras colecciones).
   - Etiqueta "Nuevo" automática según la fecha de alta de la prenda (createdAt).
   Se carga después de script.js y usa sus funciones globales (products, renderProducts, openModal, toggleCart…). */
(()=>{
  const DEFAULTS={favorites:true,recent:true,gridToggle:true,cardSwipe:true,cardColors:true,searchSuggest:true,newBadge:true,newDays:21,newLabel:'Nuevo',favoritesTitle:'Favoritos',recentTitle:'Vistos recientemente'};
  const cfg=()=>({...DEFAULTS,...(window.CatalogSiteSettings?.shop||{})});
  const editorPreview=new URLSearchParams(location.search).has('site-preview');
  const KEYS={fav:'byebye-favoritos',recent:'byebye-vistos',view:'byebye-vista-grilla'};
  const read=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key)||'null');return value??fallback;}catch{return fallback;}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
  const ids=key=>{const list=read(key,[]);return Array.isArray(list)?list.map(Number).filter(Number.isSafeInteger):[];};
  const decoder=document.createElement('textarea');
  const plain=value=>{decoder.innerHTML=String(value??'');return decoder.value;};
  const make=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!=null)node.textContent=text;return node;};
  const norm=value=>typeof normalizeColorName==='function'?normalizeColorName(plain(value)):plain(value).toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  const visibleProducts=()=>(typeof products!=='undefined'?products:[]).filter(p=>p&&p.name&&!p.isHidden&&!p.archived);
  const productById=id=>visibleProducts().find(p=>Number(p.id)===Number(id));
  const photosOf=p=>{try{return [...new Set(getDisplayProductImageSources(p).filter(Boolean))];}catch{return[];}};
  const toast=message=>{try{showToast(message);}catch{}};
  // Miniatura que prueba las fotos de la prenda en orden hasta encontrar una que cargue.
  function thumbFor(p,className='shop-thumb'){const box=make('span',className),sources=photosOf(p);if(!sources.length)return box;const img=make('img');img.alt='';img.loading='lazy';img.decoding='async';let index=0;img.onerror=()=>{index++;if(index<sources.length)img.src=sources[index];else img.remove();};img.src=sources[0];box.append(img);return box;}
  const heartSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>';

  // Abre la ficha aunque la prenda sea de otra colección (como un enlace ?p=).
  function openProduct(p){
    const inView=typeof activeCollection==='undefined'||activeCollection==='todos'||(p.collections||[]).includes(activeCollection);
    if(!inView&&typeof openProductFromUrl==='function'){const url=new URL(location.href);url.searchParams.set('p',p.id);history.replaceState(history.state,'',url);if(openProductFromUrl())return;}
    openModal(p);
  }

  /* ——— Favoritos ——— */
  let favorites=ids(KEYS.fav);
  const isFavorite=id=>favorites.includes(Number(id));
  function heartButton(p,className){
    const button=make('button',`shop-fav ${className||''}`);button.type='button';button.dataset.favId=p.id;button.dataset.editId='shop.favorites';button.dataset.editLabel='Corazón de favoritos';button.innerHTML=heartSvg;syncHeart(button);
    button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();toggleFavorite(p);});
    return button;
  }
  function syncHeart(button){const on=isFavorite(button.dataset.favId);button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',on?'Quitar de favoritos':'Guardar en favoritos');button.title=on?'Quitar de favoritos':'Guardar en favoritos';}
  function toggleFavorite(p){
    const id=Number(p.id),adding=!isFavorite(id);
    favorites=adding?[id,...favorites.filter(item=>item!==id)]:favorites.filter(item=>item!==id);write(KEYS.fav,favorites);
    document.querySelectorAll('.shop-fav[data-fav-id]').forEach(syncHeart);updateFavoriteCount();if(drawer&&!drawer.hidden)renderFavorites();
    toast(adding?`«${plain(p.name)}» quedó en ${cfg().favoritesTitle.toLocaleLowerCase('es')}`:`Quitaste «${plain(p.name)}» de ${cfg().favoritesTitle.toLocaleLowerCase('es')}`);
  }
  const favoriteProducts=()=>favorites.map(productById).filter(Boolean);
  let headerButton=null,drawer=null,overlay=null;
  function ensureHeaderButton(){
    if(headerButton)return headerButton;const cartButton=document.getElementById('cart-toggle');if(!cartButton)return null;
    headerButton=make('button','shop-fav-toggle');headerButton.type='button';headerButton.id='favorites-toggle';headerButton.dataset.editId='shop.favorites';headerButton.dataset.editLabel='Favoritos (corazón)';headerButton.innerHTML=`${heartSvg}<span class="shop-fav-count" hidden>0</span>`;
    headerButton.addEventListener('click',openFavorites);cartButton.before(headerButton);return headerButton;
  }
  function updateFavoriteCount(){
    const button=ensureHeaderButton();if(!button)return;const on=cfg().favorites!==false;button.hidden=!on;
    const count=favoriteProducts().length,badge=button.querySelector('.shop-fav-count');badge.textContent=String(count);badge.hidden=!count;button.setAttribute('aria-label',`${cfg().favoritesTitle}${count?` (${count})`:''}`);
  }
  function ensureDrawer(){
    if(drawer)return;
    overlay=make('div','shop-overlay');overlay.hidden=true;overlay.addEventListener('click',closeFavorites);
    drawer=make('aside','shop-drawer');drawer.hidden=true;drawer.setAttribute('role','dialog');drawer.setAttribute('aria-modal','true');drawer.setAttribute('aria-labelledby','shop-drawer-title');
    const head=make('div','shop-drawer-head'),title=make('h2',null,'');title.id='shop-drawer-title';const close=make('button','shop-drawer-close','×');close.type='button';close.setAttribute('aria-label','Cerrar');close.onclick=closeFavorites;head.append(title,close);
    drawer.append(head,make('div','shop-drawer-list'),make('div','shop-drawer-foot'));document.body.append(overlay,drawer);
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!drawer.hidden)closeFavorites();});
  }
  function openFavorites(){ensureDrawer();renderFavorites();overlay.hidden=false;drawer.hidden=false;document.body.classList.add('shop-drawer-open');requestAnimationFrame(()=>drawer.classList.add('open'));drawer.querySelector('.shop-drawer-close').focus();}
  function closeFavorites(){if(!drawer)return;drawer.classList.remove('open');overlay.hidden=true;document.body.classList.remove('shop-drawer-open');setTimeout(()=>{if(!drawer.classList.contains('open'))drawer.hidden=true;},250);}
  function renderFavorites(){
    const settings=cfg(),list=drawer.querySelector('.shop-drawer-list'),foot=drawer.querySelector('.shop-drawer-foot'),items=favoriteProducts();
    drawer.querySelector('h2').textContent=`${settings.favoritesTitle}${items.length?` · ${items.length}`:''}`;list.replaceChildren();foot.replaceChildren();
    if(!items.length){list.append(make('p','shop-empty','Tocá el corazón ♡ de una prenda para guardarla acá. Quedan guardadas en este teléfono.'));return;}
    for(const p of items){
      const row=make('div','shop-fav-item'),open=make('button','shop-fav-open'),photo=thumbFor(p);
      open.type='button';
      const info=make('span','shop-fav-info');info.append(make('strong',null,plain(p.name)),make('small',null,p.orderNumber?`Cód. ${plain(p.orderNumber)}`:''));
      if(typeof cart!=='undefined'&&cart.some(item=>item.id===p.id))info.append(make('em',null,'Ya está en el pedido'));
      open.append(photo,info);open.onclick=()=>{closeFavorites();openProduct(p);};
      const remove=make('button','shop-fav-remove','×');remove.type='button';remove.setAttribute('aria-label',`Quitar ${plain(p.name)} de favoritos`);remove.onclick=()=>toggleFavorite(p);
      row.append(open,remove);list.append(row);
    }
    const addAll=make('button','shop-primary','Agregar todas al pedido');addAll.type='button';addAll.onclick=addFavoritesToCart;
    const send=make('button','shop-secondary','Enviar la lista por WhatsApp');send.type='button';send.onclick=shareFavorites;
    foot.append(addAll,send,make('small',null,'Los favoritos quedan guardados en este teléfono o computadora.'));
  }
  function addFavoritesToCart(){
    let added=0;const choose=[],unavailable=[];
    for(const p of favoriteProducts()){
      if(typeof cart!=='undefined'&&cart.some(item=>item.id===p.id))continue;
      if(p.purchaseOptions?.length>1){choose.push(plain(p.name));continue;}
      let can=true;try{can=canOrderProduct(p);}catch{}
      if(!can||p.inStock===false){unavailable.push(plain(p.name));continue;}
      const before=cart.length;toggleCart(p);if(cart.length>before)added++;else unavailable.push(plain(p.name));
    }
    const parts=[];if(added)parts.push(`${added} ${added===1?'prenda agregada':'prendas agregadas'} al pedido`);if(choose.length)parts.push(`elegí la opción de compra en: ${choose.join(', ')}`);if(unavailable.length)parts.push(`no se pueden pedir ahora: ${unavailable.join(', ')}`);
    toast(parts.length?parts.join(' · '):'Todas tus favoritas ya están en el pedido');renderFavorites();
  }
  function shareFavorites(){
    const base=`${location.origin}${location.pathname}`,lines=favoriteProducts().map(p=>`• ${plain(p.name)}${p.orderNumber?` (Cód. ${plain(p.orderNumber)})`:''}\n  ${base}?p=${p.id}`);
    const text=`¡Hola! Me interesan estas prendas:\n\n${lines.join('\n')}`,number=String(window.CatalogSiteSettings?.whatsapp?.number||'').replace(/\D/g,'');
    window.open(number?`https://wa.me/${number}?text=${encodeURIComponent(text)}`:`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank','noopener');
  }

  /* ——— Vistos recientemente ——— */
  let recent=ids(KEYS.recent);
  function remember(p){if(!p?.id||editorPreview)return;const id=Number(p.id);recent=[id,...recent.filter(item=>item!==id)].slice(0,16);write(KEYS.recent,recent);}
  function renderRecent(){
    const grid=document.getElementById('product-grid');if(!grid)return;let section=document.getElementById('shop-recent');
    const settings=cfg();let items=recent.map(productById).filter(Boolean);if(editorPreview&&!items.length)items=visibleProducts().slice(0,6);
    if(settings.recent===false||!items.length){section?.remove();return;}
    if(!section){section=make('section','shop-recent');section.id='shop-recent';section.dataset.editId='shop.recent';section.dataset.editLabel='Vistos recientemente';grid.after(section);}
    const head=make('div','shop-recent-head'),clear=make('button','shop-link','Borrar');clear.type='button';clear.onclick=()=>{recent=[];write(KEYS.recent,recent);renderRecent();};
    head.append(make('h2',null,settings.recentTitle),clear);const row=make('div','shop-recent-row');
    for(const p of items){const item=make('button','shop-recent-item'),photo=thumbFor(p);item.type='button';item.append(photo,make('strong',null,plain(p.name)),make('small',null,p.orderNumber?`Cód. ${plain(p.orderNumber)}`:''));item.onclick=()=>openProduct(p);row.append(item);}
    section.replaceChildren(head,row);
  }

  /* ——— Vista de la grilla ——— */
  const mobile=()=>matchMedia('(max-width: 768px)').matches;
  function applyView(){
    const settings=cfg(),saved=read(KEYS.view,{}),body=document.body;
    body.style.removeProperty('--site-card-columns');body.style.removeProperty('--site-mobile-columns');body.style.removeProperty('--site-tablet-columns');
    if(settings.gridToggle===false)return;
    if(saved.desktop){body.style.setProperty('--site-card-columns',String(saved.desktop));body.style.setProperty('--site-tablet-columns',String(Math.min(saved.desktop,4)));}
    if(saved.mobile)body.style.setProperty('--site-mobile-columns',String(saved.mobile));
  }
  function currentColumns(){const style=getComputedStyle(document.body);return Number(style.getPropertyValue(mobile()?'--site-mobile-columns':'--site-card-columns'))||(mobile()?1:4);}
  function renderViewToggle(){
    const info=document.querySelector('.results-info');if(!info)return;let box=info.querySelector('.shop-view');
    if(cfg().gridToggle===false){box?.remove();info.classList.remove('has-shop-view');return;}
    if(!box){box=make('div','shop-view');box.dataset.editId='shop.gridToggle';box.dataset.editLabel='Botones para cambiar la vista';box.setAttribute('role','group');box.setAttribute('aria-label','Cambiar la vista');info.append(box);}
    info.classList.add('has-shop-view');
    const options=mobile()?[1,2]:[2,4,6],current=currentColumns();box.replaceChildren();
    for(const n of options){const button=make('button','shop-view-button');button.type='button';button.setAttribute('aria-label',`Ver ${n} ${n===1?'prenda':'prendas'} por fila`);button.title=button.getAttribute('aria-label');button.setAttribute('aria-pressed',String(n===current));
      const icon=make('span','shop-view-icon');icon.style.setProperty('--n',String(n));for(let i=0;i<n;i++)icon.append(make('i'));button.append(icon);
      button.onclick=()=>{const saved=read(KEYS.view,{});saved[mobile()?'mobile':'desktop']=n;write(KEYS.view,saved);applyView();renderViewToggle();document.body.dataset.cardColumns=String(currentColumns());};box.append(button);}
  }

  /* ——— Tarjetas: Nuevo, corazón, colores y fotos deslizables ——— */
  function isNew(p){const settings=cfg(),days=Math.max(1,Number(settings.newDays)||21),created=Date.parse(p.createdAt||'');return Number.isFinite(created)&&Date.now()-created<days*864e5&&created<=Date.now()+864e5;}
  function drawDots(card){const dots=card.querySelector('.shop-dots');if(!dots)return;const total=(card._shopPhotos||[]).length;dots.replaceChildren(...Array.from({length:Math.min(total,8)},(_,i)=>make('i',i===card._shopIndex?'on':'')));dots.hidden=total<2;card.querySelectorAll('.shop-arrow').forEach(arrow=>arrow.hidden=total<2);}
  // Prueba la foto antes de mostrarla; si no carga, la saca de la lista y sigue con la próxima.
  function setCardPhoto(card,index,step=1){
    const sources=card._shopPhotos||[];if(!sources.length)return;const next=(index+sources.length)%sources.length,src=sources[next],img=card.querySelector('.card-img:not(.card-img-secondary)');if(!img)return;
    const tester=new Image();
    tester.onload=()=>{card._shopIndex=next;img.src=src;img.style.display='block';card.querySelector('.card-placeholder')?.style.setProperty('display','none');card.classList.toggle('shop-moved',next!==0);drawDots(card);};
    tester.onerror=()=>{sources.splice(next,1);if(card._shopIndex>next)card._shopIndex--;drawDots(card);if(sources.length>1)setCardPhoto(card,step>0?next:next-1,step);};
    tester.src=src;
  }
  function addSwipe(card,wrap,sources){
    card._shopPhotos=sources;card._shopIndex=0;card.classList.add('shop-swipe');
    const dotsNode=make('span','shop-dots');dotsNode.dataset.editId='shop.cardSwipe';dotsNode.dataset.editLabel='Fotos deslizables';wrap.append(dotsNode);
    for(const [className,step,label] of [['shop-prev',-1,'Foto anterior'],['shop-next',1,'Foto siguiente']]){const arrow=make('button',`shop-arrow ${className}`);arrow.type='button';arrow.dataset.editId='shop.cardSwipe';arrow.dataset.editLabel='Fotos deslizables';arrow.setAttribute('aria-label',label);arrow.addEventListener('click',event=>{event.stopPropagation();setCardPhoto(card,card._shopIndex+step,step);});wrap.append(arrow);}
    drawDots(card);
    let start=null,swiped=0;
    wrap.addEventListener('touchstart',event=>{const t=event.touches[0];start=event.touches.length===1?{x:t.clientX,y:t.clientY}:null;},{passive:true});
    wrap.addEventListener('touchend',event=>{if(!start)return;const t=event.changedTouches[0],dx=t.clientX-start.x,dy=t.clientY-start.y;start=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.4){swiped=Date.now();const step=dx<0?1:-1;setCardPhoto(card,card._shopIndex+step,step);}},{passive:true});
    card.addEventListener('click',event=>{if(Date.now()-swiped<400){event.stopPropagation();event.preventDefault();}},true);
  }
  function addColors(card,p,info){
    const colors=[...new Set([...(p.colors||[]),...(p.purchaseOptions||[]).flatMap(option=>option.colors||[])])];if(colors.length<2)return;
    const values=window.CatalogSiteSettings?.colorSwatches?.values||{},gallery=p.gallery||{},sources=gallery.sources||[],indexes=gallery.colorGalleryIndexByNormalizedColor||{};
    const chips=colors.map(color=>{const key=norm(color);return{color,hex:/^#[0-9a-f]{6}$/i.test(values[key]||'')?values[key]:'',photo:sources[indexes[key]]||''};});
    const useDots=chips.every(chip=>chip.hex),row=make('div',`shop-colors${useDots?'':' shop-colors-names'}`),limit=useDots?6:3;row.dataset.editId='shop.cardColors';row.dataset.editLabel='Colores de la tarjeta';
    for(const chip of chips.slice(0,limit)){const dot=make('button',useDots?'shop-color':'shop-color-name');dot.type='button';dot.title=plain(chip.color);dot.setAttribute('aria-label',`Ver en ${plain(chip.color)}`);
      if(useDots)dot.style.background=chip.hex;else dot.textContent=plain(chip.color);
      dot.addEventListener('click',event=>{event.stopPropagation();row.querySelectorAll('.shop-color,.shop-color-name').forEach(node=>node.classList.toggle('on',node===dot));if(!chip.photo)return;const list=card._shopPhotos||photosOf(p);let index=list.indexOf(chip.photo);if(index<0){card._shopPhotos=[chip.photo,...list];index=0;}else card._shopPhotos=list;setCardPhoto(card,index);});
      row.append(dot);}
    if(colors.length>limit)row.append(make('span','shop-colors-count',`+${colors.length-limit}`));
    info.querySelector('.card-name')?.after(row);
  }
  function decorateCards(){
    const settings=cfg();
    for(const card of document.querySelectorAll('#product-grid .product-card')){
      if(card.dataset.shopReady)continue;card.dataset.shopReady='1';const p=productById(card.dataset.id);if(!p)continue;
      const wrap=card.querySelector('.card-img-wrap'),info=card.querySelector('.card-info');if(!wrap||!info)continue;
      if(settings.newBadge!==false&&!String(p.customBadge?.label||'').trim()&&isNew(p)){const badge=make('span','card-badge-new',settings.newLabel||'Nuevo');badge.dataset.editId='shop.newBadge';badge.dataset.editLabel='Etiqueta Nuevo';wrap.append(badge);}
      if(settings.favorites!==false){info.classList.add('shop-has-fav');info.append(heartButton(p,'shop-fav-card'));}
      if(settings.cardColors!==false)addColors(card,p,info);
      if(settings.cardSwipe!==false){const sources=photosOf(p);if(sources.length>1)addSwipe(card,wrap,sources);}
    }
  }

  /* ——— Buscador con sugerencias ——— */
  function setupSuggestions(){
    const input=document.getElementById('product-search');if(!input||input.dataset.shopSuggest)return;input.dataset.shopSuggest='1';
    const field=input.closest('.catalog-search-field')||input.parentElement,box=make('div','shop-suggest');box.dataset.editId='shop.searchSuggest';box.dataset.editLabel='Sugerencias del buscador';box.hidden=true;box.setAttribute('role','listbox');box.id='shop-suggest';field.append(box);
    input.setAttribute('aria-controls','shop-suggest');input.setAttribute('aria-autocomplete','list');
    let active=-1;
    const hide=()=>{box.hidden=true;active=-1;input.setAttribute('aria-expanded','false');};
    function matches(query){
      const q=norm(query);if(q.length<2)return[];const words=q.split(/\s+/).filter(Boolean);
      return visibleProducts().map(p=>{const name=norm(p.name),code=norm(p.orderNumber),category=norm(p.subcategory),text=`${name} ${code} ${category}`;
        if(!words.every(word=>text.includes(word)))return null;
        const score=code.startsWith(q)?0:name.startsWith(q)?1:name.split(/\s+/).some(part=>part.startsWith(words[0]))?2:3;return{p,score};})
        .filter(Boolean).sort((a,b)=>a.score-b.score||plain(a.p.name).localeCompare(plain(b.p.name),'es')).slice(0,6).map(item=>item.p);
    }
    function render(){
      if(cfg().searchSuggest===false){hide();return;}
      let list=matches(input.value);box.replaceChildren();active=-1;
      // Buscador vacío: muestra lo último que miró la clienta.
      if(!input.value.trim()&&cfg().recent!==false){list=recent.map(productById).filter(Boolean).slice(0,5);if(list.length)box.append(make('p','shop-suggest-title',cfg().recentTitle));}
      if(!list.length){hide();return;}
      list.forEach((p,index)=>{const item=make('button','shop-suggest-item'),photo=thumbFor(p);item.type='button';item.setAttribute('role','option');item.id=`shop-suggest-${index}`;
        const text=make('span','shop-suggest-text');text.append(make('strong',null,plain(p.name)));
        const detail=[p.orderNumber?`Cód. ${plain(p.orderNumber)}`:'',plain(p.subcategory||'')].filter(Boolean).join(' · ');
        const elsewhere=typeof activeCollection!=='undefined'&&activeCollection!=='todos'&&!(p.collections||[]).includes(activeCollection);
        const collectionName=elsewhere?plain((typeof collections!=='undefined'?collections:[]).find(c=>(p.collections||[]).includes(c.id))?.name||''):'';
        text.append(make('small',null,detail),...(collectionName?[make('em',null,`En ${collectionName}`)]:[]));
        item.append(photo,text);item.addEventListener('pointerdown',event=>event.preventDefault());item.onclick=()=>{hide();input.blur();openProduct(p);};box.append(item);});
      box.hidden=false;input.setAttribute('aria-expanded','true');
    }
    input.addEventListener('input',render);input.addEventListener('focus',render);input.addEventListener('blur',()=>setTimeout(hide,120));
    input.addEventListener('keydown',event=>{if(box.hidden)return;const items=[...box.querySelectorAll('.shop-suggest-item')];
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();if(!items.length)return;active=(active+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((item,i)=>item.classList.toggle('active',i===active));input.setAttribute('aria-activedescendant',items[active].id);}
      else if(event.key==='Enter'&&active>=0){event.preventDefault();items[active].click();}
      else if(event.key==='Escape')hide();});
  }

  /* ——— Ficha de producto: corazón junto al nombre ——— */
  function decorateModal(p){
    const title=document.getElementById('modal-name');if(!title)return;document.querySelector('.shop-fav-modal')?.remove();
    if(cfg().favorites===false||!p)return;title.append(heartButton(p,'shop-fav-modal'));
  }

  /* ——— Enganches con el catálogo ——— */
  function refresh(){try{applyView();document.body.dataset.cardColumns=String(currentColumns());updateFavoriteCount();renderViewToggle();decorateCards();renderRecent();}catch(error){console.warn('Funciones de la tienda:',error);}}
  if(typeof renderProducts==='function'){const base=renderProducts;renderProducts=function(...args){const result=base.apply(this,args);refresh();return result;};}
  if(typeof openModal==='function'){const base=openModal;openModal=function(p,...args){const result=base.call(this,p,...args);remember(p);decorateModal(p);return result;};}
  // El catálogo ya vuelve a dibujar las tarjetas al aplicar el diseño; acá sólo se completan (antes se agregaban de nuevo y quedaban colores repetidos).
  window.addEventListener('catalog-site-settings-applied',()=>setTimeout(()=>{refresh();if(typeof currentModalProduct!=='undefined'&&currentModalProduct)decorateModal(currentModalProduct);},0));
  matchMedia('(max-width: 768px)').addEventListener?.('change',()=>{applyView();renderViewToggle();});
  window.addEventListener('storage',event=>{if(event.key===KEYS.fav){favorites=ids(KEYS.fav);document.querySelectorAll('.shop-fav[data-fav-id]').forEach(syncHeart);updateFavoriteCount();}});
  document.addEventListener('DOMContentLoaded',()=>{setupSuggestions();ensureHeaderButton();applyView();updateFavoriteCount();});
  window.CatalogShop={favorites:()=>[...favorites],recent:()=>[...recent],refresh,isNew};
})();
