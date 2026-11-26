'use strict';
/* Catálogo · contenido que tu socia agrega desde el editor visual (Etapa C):
   - "Fila de prendas": prendas elegidas por regla (etiqueta, tipo, público, colección, nuevas o por código).
   - Páginas nuevas (settings.pages): se abren con #pagina-<nombre> y muestran sus bloques.
   - Menú del encabezado (settings.menu).
   - Guías de talles (settings.sizeTables) en la ficha de las prendas de ese tipo.
   - Preguntas propias en el pedido (settings.cart.extraQuestions), incluidas en el WhatsApp y el PDF.
   Se carga después de script.js. */
(()=>{
  const decoder=document.createElement('textarea');
  const plain=value=>{decoder.innerHTML=String(value??'');return decoder.value;};
  const norm=value=>plain(value).toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
  const make=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!=null)node.textContent=text;return node;};
  const settings=()=>window.CatalogSiteSettings||{};
  const editor=new URLSearchParams(location.search).has('editor');
  const visible=()=>(typeof products!=='undefined'?products:[]).filter(p=>p&&p.name&&!p.isHidden&&!p.archived);
  const typesOf=p=>Array.isArray(p.subcategories)&&p.subcategories.length?p.subcategories:String(p.subcategory||'').split(',').map(part=>part.trim()).filter(Boolean);
  const photos=p=>{try{return [...new Set(getDisplayProductImageSources(p).filter(Boolean))];}catch{return[];}};
  function thumb(p){const box=make('span','content-thumb'),list=photos(p);if(!list.length)return box;const img=make('img');img.alt='';img.loading='lazy';let index=0;img.onerror=()=>{index++;if(index<list.length)img.src=list[index];else img.remove();};img.src=list[0];box.append(img);return box;}
  function openProduct(p){leavePage(false);const inView=typeof activeCollection==='undefined'||activeCollection==='todos'||(p.collections||[]).includes(activeCollection);if(!inView&&typeof openProductFromUrl==='function'){const url=new URL(location.href);url.searchParams.set('p',p.id);history.replaceState(history.state,'',url);if(openProductFromUrl())return;}openModal(p);}

  /* ——— Fila de prendas ——— */
  function productsFor(rule){
    const value=norm(rule.value);let list=visible();if(rule.inStockOnly!==false)list=list.filter(p=>p.inStock!==false);
    if(rule.rule==='tag')list=value?list.filter(p=>(p.tags||[]).some(tag=>norm(tag)===value)):[];
    else if(rule.rule==='category')list=value?list.filter(p=>typesOf(p).some(name=>norm(name)===value)):[];
    else if(rule.rule==='audience')list=list.filter(p=>norm(p.category)===value);
    else if(rule.rule==='collection')list=list.filter(p=>(p.collections||[p.collection]).map(String).includes(String(rule.value)));
    else if(rule.rule==='new'){const days=Number(settings().shop?.newDays)||21;list=list.filter(p=>{const time=Date.parse(p.createdAt||'');return Number.isFinite(time)&&Date.now()-time<days*864e5;}).sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt));}
    else if(rule.rule==='manual'){const codes=String(rule.codes||'').split(',').map(norm).filter(Boolean);const byCode=new Map(list.map(p=>[norm(p.orderNumber),p]));list=codes.map(code=>byCode.get(code)).filter(Boolean);}
    return list.slice(0,Math.max(1,Math.min(24,Number(rule.limit)||8)));
  }
  function renderRows(){
    for(const row of document.querySelectorAll('.managed-block-products[data-rule]')){
      let rule={};try{rule=JSON.parse(row.dataset.rule);}catch{}const list=productsFor(rule),block=row.closest('.managed-block');
      row.replaceChildren(...list.map(p=>{const item=make('button','content-product');item.type='button';item.append(thumb(p),make('strong',null,plain(p.name)),make('small',null,p.orderNumber?`Cód. ${plain(p.orderNumber)}`:''));item.onclick=()=>openProduct(p);return item;}));
      if(block)block.hidden=!list.length&&!editor;if(!list.length&&editor)row.append(make('p','content-empty','Esta fila todavía no tiene prendas (revisá la regla en el editor). Las clientas no la ven.'));
    }
  }

  /* ——— Páginas nuevas (#pagina-envios) ——— */
  const pages=()=>(Array.isArray(settings().pages)?settings().pages:[]).filter(page=>page&&page.id&&page.slug);
  let baseTitle='';
  const pageFromHash=()=>{const match=location.hash.match(/^#pagina-([\w-]+)$/);return match?pages().find(page=>page.slug===match[1]&&(page.hidden!==true||editor)):null;};
  function showPage(){
    const page=pageFromHash(),host=document.getElementById('site-pages');document.body.toggleAttribute('data-site-page',!!page);
    document.querySelectorAll('.site-menu a[data-page]').forEach(link=>link.classList.toggle('active',page&&link.dataset.page===page.id));
    if(!host){if(page)renderPageShell(page);return;}
    renderPageShell(page);
    host.querySelectorAll('.managed-content-blocks[data-page]').forEach(area=>{area.hidden=!page||area.dataset.page!==page.id;});
    if(page){if(!baseTitle)baseTitle=document.title;document.title=`${plain(page.title)} · ${baseTitle}`;scrollTo({top:0,behavior:'instant'});}else if(baseTitle){document.title=baseTitle;baseTitle='';}
  }
  function renderPageShell(page){
    let host=document.getElementById('site-pages');if(!host){if(!page)return;host=make('main','site-pages');host.id='site-pages';(document.querySelector('.site-footer')||document.body.lastElementChild).before(host);}
    let head=host.querySelector('.site-page-head');if(!head){head=make('div','site-page-head');host.prepend(head);}
    head.replaceChildren();if(!page)return;
    const back=make('a','site-page-back','← Volver al catálogo');back.href='#catalogo';back.onclick=event=>{event.preventDefault();leavePage(true);};
    const title=make('h1',null,plain(page.title));title.dataset.editId='pages';title.dataset.editLabel=`Página · ${plain(page.title)}`;head.append(back,title);
    if(!host.querySelector(`.managed-content-blocks[data-page="${CSS.escape(page.id)}"]`))head.append(make('p','content-empty',editor?'Esta página todavía no tiene bloques. En el editor: «Páginas y menú» → «Agregar contenido».':'Pronto vas a encontrar información acá.'));
  }
  function leavePage(scroll){if(!document.body.hasAttribute('data-site-page'))return;history.pushState(history.state,'',`${location.pathname}${location.search}`);showPage();if(scroll)document.getElementById('catalogo')?.scrollIntoView({behavior:'instant'});}
  addEventListener('hashchange',showPage);addEventListener('popstate',showPage);

  /* ——— Menú del encabezado ——— */
  function renderMenu(){
    document.querySelector('.site-menu')?.remove();const menu=settings().menu||{},items=(menu.items||[]).filter(item=>item&&item.label&&item.hidden!==true);
    if(menu.enabled!==true||!items.length)return;const header=document.getElementById('site-header');if(!header)return;
    const nav=make('nav','site-menu');nav.setAttribute('aria-label','Menú');nav.dataset.editId='menu';nav.dataset.editLabel='Menú';const list=make('div','site-menu-items');
    for(const item of items){const link=make('a',null,plain(item.label));link.href='#catalogo';
      if(item.type==='page'){const page=pages().find(entry=>entry.id===item.target);if(!page)continue;link.href=`#pagina-${page.slug}`;link.dataset.page=page.id;}
      else if(item.type==='url'){const url=String(item.target||'');if(!/^https:\/\//i.test(url))continue;link.href=url;link.target='_blank';link.rel='noopener';}
      else link.onclick=event=>{event.preventDefault();applyMenuFilter(item);};
      list.append(link);}
    nav.append(list);header.after(nav);
  }
  function applyMenuFilter(item){
    leavePage(false);const target=String(item.target||'');
    try{
      if(item.type==='home'){activeCollection=getInitialCollectionId();activeGender='all';activeCategory='all';}
      if(item.type==='collection'&&typeof collectionCanBeSelected==='function'&&collectionCanBeSelected(target)){activeCollection=target;activeCategory='all';}
      if(item.type==='category')activeCategory=target;
      if(item.type==='audience')activeGender=target;
      if(item.type==='tag'){const input=document.getElementById('product-search');if(input){input.value=target;input.dispatchEvent(new Event('input',{bubbles:true}));}}
      if(typeof buildCollectionFilters==='function')buildCollectionFilters();if(typeof refreshFilterControls==='function')refreshFilterControls();
      document.querySelectorAll('#gender-filters .pill').forEach(pill=>pill.classList.toggle('active',pill.dataset.value===activeGender));
      renderProducts();
    }catch(error){console.warn('Menú:',error);}
    document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'});
  }

  /* ——— Guía de talles en la ficha ——— */
  const tables=()=>(Array.isArray(settings().sizeTables)?settings().sizeTables:[]).filter(table=>table&&table.title&&Array.isArray(table.rows)&&table.rows.length);
  function tableFor(p){const types=typesOf(p).map(norm);return tables().find(table=>(table.categories||[]).some(name=>types.includes(norm(name))))||tables().find(table=>(table.categories||[]).length===0)||null;}
  function decorateModal(p){
    document.querySelector('.size-guide-button')?.remove();const table=p&&tableFor(p);if(!table)return;
    const anchor=document.getElementById('modal-sizes');if(!anchor)return;const button=make('button','size-guide-button',plain(table.buttonLabel||'Guía de talles'));button.type='button';button.dataset.editId='sizeTables';button.dataset.editLabel='Guía de talles';button.onclick=()=>openGuide(table);anchor.after(button);
    const order=getComputedStyle(anchor).order;if(order&&order!=='0')button.style.order=order;
  }
  function openGuide(table){
    document.querySelector('.size-guide')?.remove();const dialog=make('dialog','size-guide'),box=make('div','size-guide-box'),head=make('div','size-guide-head'),close=make('button','size-guide-close','×');close.type='button';close.setAttribute('aria-label','Cerrar');close.onclick=()=>dialog.close();
    head.append(make('h2',null,plain(table.title)),close);box.append(head);
    const scroller=make('div','size-guide-scroll'),grid=make('table'),thead=make('thead'),headRow=make('tr');for(const column of table.columns||[])headRow.append(make('th',null,plain(column)));thead.append(headRow);const tbody=make('tbody');
    for(const row of table.rows){const tr=make('tr');(table.columns||[]).forEach((_,index)=>tr.append(make('td',null,plain(row[index]??''))));tbody.append(tr);}grid.append(thead,tbody);scroller.append(grid);box.append(scroller);
    if(table.note)box.append(make('p','size-guide-note',plain(table.note)));
    dialog.append(box);dialog.addEventListener('close',()=>dialog.remove());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});document.body.append(dialog);dialog.showModal();
  }

  /* ——— Preguntas propias en el pedido ——— */
  const QUESTIONS_KEY='byebye-cart-preguntas';
  const questions=()=>(Array.isArray(settings().cart?.extraQuestions)?settings().cart.extraQuestions:[]).filter(q=>q&&q.id&&q.label);
  let answers={};try{answers=JSON.parse(localStorage.getItem(QUESTIONS_KEY)||'{}')||{};}catch{answers={};}
  const saveAnswers=()=>{try{localStorage.setItem(QUESTIONS_KEY,JSON.stringify(answers));}catch{}};
  const answerOf=q=>String(answers[q.id]??'').trim();
  if(typeof updateCartCustomerForm==='function'){const base=updateCartCustomerForm;updateCartCustomerForm=function(...args){const result=base.apply(this,args);try{renderQuestions();}catch(error){console.warn(error);}return result;};}
  function renderQuestions(){
    const box=document.getElementById('cart-customer'),list=questions();if(!box)return;box.querySelectorAll('.cart-question').forEach(node=>node.remove());if(!list.length)return;box.hidden=false;
    for(const q of list){const wrap=make('label','cart-question');wrap.dataset.editId='cart.extraQuestions';wrap.dataset.editLabel=`Pregunta del pedido · ${plain(q.label)}`;constcaption=make('span',null,`${plain(q.label)}${q.required?' *':''}`);let input;
      if(q.type==='options'){input=make('select');input.append(new Option('Elegí una opción',''));for(const option of q.options||[])input.append(new Option(plain(option),plain(option)));}
      else if(q.type==='textarea'){input=make('textarea');input.rows=2;}else{input=make('input');input.type='text';}
      input.value=answers[q.id]||'';input.maxLength=300;input.dataset.question=q.id;if(q.required)input.required=true;
      input.addEventListener(input.tagName==='SELECT'?'change':'input',()=>{answers[q.id]=input.value;saveAnswers();wrap.classList.remove('missing');});wrap.append(caption,input);box.append(wrap);}
  }
  if(typeof getCartCustomerLines==='function'){const base=getCartCustomerLines;getCartCustomerLines=function(...args){const lines=base.apply(this,args);for(const q of questions()){const value=answerOf(q);if(value)lines.push([plain(q.label),value]);}return lines;};}
  // Antes de mandar por WhatsApp: si falta una pregunta obligatoria, la marca y no envía.
  document.addEventListener('click',event=>{if(!event.target.closest('#btn-whatsapp'))return;const missing=questions().filter(q=>q.required&&!answerOf(q));if(!missing.length)return;event.preventDefault();event.stopImmediatePropagation();
    for(const q of missing)document.querySelector(`[data-question="${CSS.escape(q.id)}"]`)?.closest('.cart-question')?.classList.add('missing');
    document.querySelector('.cart-question.missing input, .cart-question.missing select, .cart-question.missing textarea')?.focus();
    try{showToast(`Completá: ${missing.map(q=>plain(q.label)).join(', ')}`);}catch{}},true);

  /* ——— Enganches ——— */
  function refresh(){try{renderMenu();renderRows();showPage();}catch(error){console.warn('Contenido:',error);}}
  if(typeof renderProducts==='function'){const base=renderProducts;renderProducts=function(...args){const result=base.apply(this,args);try{renderRows();}catch{}return result;};}
  // La galería de la ficha se arma un instante después: se vuelven a marcar sus partes para que se puedan tocar en el editor.
  if(typeof openModal==='function'){const base=openModal;openModal=function(p,...args){const result=base.call(this,p,...args);try{decorateModal(p);if(editor)for(const delay of [150,700])setTimeout(()=>window.CatalogSiteMarkEditable?.(),delay);}catch(error){console.warn(error);}return result;};}
  addEventListener('catalog-site-settings-applied',()=>setTimeout(()=>{refresh();try{if(typeof updateCartCustomerForm==='function')updateCartCustomerForm();if(typeof currentModalProduct!=='undefined'&&currentModalProduct)decorateModal(currentModalProduct);}catch{}},0));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(refresh,0));
  window.CatalogContent={refresh,productsFor,showPage};
})();
