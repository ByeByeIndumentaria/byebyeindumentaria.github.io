/* Shared schema, defaults and v1 -> v2 migration for the catalog studio. */
(function(root){
  'use strict';
  const clone=value=>JSON.parse(JSON.stringify(value));
  const isObject=value=>value&&typeof value==='object'&&!Array.isArray(value);
  function merge(base,source){
    if(!isObject(source))return clone(base);
    const result=clone(base);
    for(const [key,value] of Object.entries(source))result[key]=isObject(value)&&isObject(result[key])?merge(result[key],value):clone(value);
    return result;
  }
  const DEFAULT_TEXTS={
    'filters.open':'Filtros','filters.title':'Explorar catálogo','filters.collections':'Colecciones','filters.genders':'Géneros','filters.categories':'Prendas','filters.allCategories':'Todas las prendas','filters.clear':'Limpiar','filters.apply':'Ver {n} prendas',
    'results.count':'{n} prendas','results.countOne':'{n} prenda','results.empty':'No hay productos para los filtros seleccionados.','results.emptySearch':'No encontramos productos con ese nombre o código.',
    'preorder.label':'Preventa','preorder.notice':'Próximamente · No disponible para pedidos.','cart.title':'Pedido mayorista','cart.empty':'Aún no agregaste prendas.','cart.emptyHint':'Explorá el catálogo y sumá lo que te gusta.','cart.whatsapp':'Pedir cotización por WhatsApp','cart.pdf':'Descargar PDF','cart.clear':'Vaciar selección','cart.clearConfirm':'¿Vaciar toda la selección?',
    'modal.zoom':'Ampliar','modal.reduce':'Reducir','modal.add':'Agregar a la selección','modal.addOption':'Agregar esta opción','modal.added':'✓ Opción en tu selección','modal.outOfStock':'Fuera de stock','modal.noColors':'Sin colores en stock','modal.soon':'Próximamente','modal.downloadPdf':'Descargar ficha PDF',
    'toast.empty':'Tu selección está vacía','toast.pdf':'PDF descargado','toast.productPdf':'Ficha PDF descargada','toast.pdfError':'No se pudo generar el PDF',
    'footer.back':'Volver al catálogo','footer.admin':'Administrar catálogo','accessibility.cart':'Ver carrito','accessibility.search':'Buscar productos por nombre o código','accessibility.clearSearch':'Limpiar búsqueda'
  };
  function defaults(context={}){
    const products=context.products||[],categories=context.categories||[...new Set(products.map(product=>product.subcategory).filter(Boolean))].sort().map(name=>({name,label:name,hidden:false}));
    return {
      schemaVersion:2,
      meta:{title:'BYE BYE — Catálogo',description:'Catálogo mayorista BYE BYE. Explorá las colecciones, armá tu pedido y solicitá una cotización por WhatsApp.',ogTitle:'BYE BYE — Catálogo mayorista',ogDescription:'Explorá las colecciones BYE BYE y armá tu pedido mayorista.',ogImage:'',themeColor:'#f4ede3'},
      tokens:{
        colors:{page:'#d8c9b8',catalog:'#d8cbbb',surface:'#f4ede3',surfaceAlt:'#f5f1eb',filters:'#fffdf9',header:'#f4ede3',text:'#1f1a15',muted:'#564b3e',subtle:'#7d7162',border:'#bcae9b',photo:'#d6c8b7',accent:'#9d4f38',accentAlt:'#a24f36',secondary:'#7e8765',available:'#3e6844',unavailable:'#9b352c',footerBg:'#302219',footerText:'#dfe6c5',overlay:'#2d1c0f'},
        opacity:{header:92,search:90,overlay:56},typography:{display:'montserrat',body:'dm-sans',baseSize:15,lineHeight:1.6,displayWeight:400},radii:{card:6,photo:8,button:999,chip:8,search:999,modal:10,panel:14},shadow:'medium',motion:{enabled:true,speed:.22},layout:{maxWidth:1400,gutterDesktop:24,gutterMobile:12}
      },
      header:{visible:true,tagline:'BYE BYE Mayorista',showTagline:true,showTaglineMobile:false,brandName:'BYE BYE',logoUrl:'',logoAlt:'BYE BYE',brandMode:'text',heightDesktop:64,heightMobile:52,stickyDesktop:true,stickyMobile:false,brandAlign:'center',cartSide:'right',showCart:true,cartLabel:'',cartIcon:'bag'},
      announcementBar:{enabled:false,messages:[],closable:true,background:'#9d4f38',textColor:'#ffffff'},
      hero:{visible:true,managed:false,banners:[],desktopHeight:500,mobileRatio:'1013/1800',showTextMobile:false,autoplay:true,autoplaySeconds:7,transition:'fade',showDots:true,showArrows:false,swipe:true,hideOnMobileScroll:true},
      sections:[],
      searchBar:{visible:true,sticky:true,placeholder:'Buscar por nombre o código',showFilterLabel:false,filterIcon:'lines',filterSide:'left',width:520,searchDescription:false,searchColors:false,searchCategory:false,showActiveChips:true,showResultCount:true,resultTemplate:'{n} prendas',resultTemplateOne:'{n} prenda',compactMobile:true,compactAfter:72},
      filtersPanel:{sideDesktop:'left',sideMobile:'bottom',width:440,mobileHeight:55,title:'Explorar catálogo',eyebrow:'BYE BYE',showEyebrow:true,groups:['collections','genders','categories'],allCategoriesLabel:'Todas las prendas',showFooterDesktop:false,showFooterMobile:true,optionStyle:'list',extraFilters:{color:false,size:false,packing:false,availability:false}},
      collectionsConfig:{initial:'verano-2027',rememberLast:true,showAll:false,allLabel:'Todo el catálogo',showTabs:false},
      categories:clone(categories),
      grid:{desktopColumns:4,tabletColumns:3,mobileColumns:1,compactCards:false,stockFirst:true,gapX:24,gapY:32,gapMobile:22,imageRatio:'3/4',imageFit:'cover',hover:'lift',maxItems:0,productOrder:products.map(product=>Number(product.id)),orderByCollection:{}},
      card:{showGender:true,showPreorder:true,showStock:true,showCategory:true,showName:true,showCode:true,showAdd:true,addAlwaysVisible:false,textAlign:'left',outOfStockOpacity:58,infoOrder:['category','name','code']},
      productModal:{mediaSide:'left',mobileMode:'stack',imageRatio:'3/4',desktopFit:'cover',mobileFit:'contain',showArrows:true,showDots:true,showThumbnails:false,showZoom:true,zoomLevel:2.25,showGender:true,showCategory:true,showPdf:true,parts:['collection','title','code','description','notice','colors','sizes','curve','pdf','add']},
      cart:{enabled:true,side:'right',width:400,title:'Pedido mayorista',term:'Pedido',showWhatsapp:true,showPdf:true,showClear:true,quantities:false,customerFields:false,notes:false},
      whatsapp:{number:'',template:'¡Hola! Quisiera pedir cotización de estas prendas.\n\n{items}\n\nTotal de prendas seleccionadas: {n}',floating:false},
      selectionPdf:{enabled:true,includePhotos:false},productPdf:{enabled:true},
      toast:{position:'bottom-center',duration:2.2,background:'#9d4f38',textColor:'#fffaf1'},
      footer:{visible:true,brand:'BYE BYE',text:'Catálogo mayorista · Pedidos y cotizaciones por WhatsApp',showBack:true,showAdmin:true,background:'#302219',textColor:'#dfe6c5',links:[]},
      texts:clone(DEFAULT_TEXTS),
      features:{announcementBar:false,collectionTabs:false,floatingWhatsapp:false,productSharing:false,extraFilters:false,customerSort:false,relatedProducts:false,maintenance:false},
      behavior:{refreshSeconds:10,rememberFilters:true,rememberCart:true,smoothScroll:true},
      responsive:{},themes:[]
    };
  }
  function migrateV1(source,context){
    const result=defaults(context),theme=source.theme||{};
    result.header.brandName=source.brandName||result.header.brandName;result.header.tagline=source.headerTagline||result.header.tagline;
    result.searchBar.placeholder=source.searchPlaceholder||result.searchBar.placeholder;result.footer.text=source.footerText||result.footer.text;
    result.meta.title=source.seo?.title||result.meta.title;
    result.tokens.colors.catalog=theme.background||result.tokens.colors.catalog;result.tokens.colors.surface=theme.surface||result.tokens.colors.surface;result.tokens.colors.text=theme.text||result.tokens.colors.text;result.tokens.colors.accentAlt=theme.accent||result.tokens.colors.accentAlt;
    result.tokens.typography.display=theme.displayFont||result.tokens.typography.display;result.tokens.radii.card=Number(theme.cardRadius??result.tokens.radii.card);
    result.grid.desktopColumns=Number(theme.desktopColumns||result.grid.desktopColumns);result.grid.mobileColumns=Number(theme.mobileColumns||result.grid.mobileColumns);result.grid.compactCards=theme.compactCards===true;
    if(Array.isArray(source.banners)){result.hero.managed=true;result.hero.banners=clone(source.banners);}
    if(Array.isArray(source.blocks))result.sections=source.blocks.map((block,index)=>({id:block.id||`legacy-${index+1}`,type:block.type||'text',location:'after-hero',...clone(block)}));
    if(Array.isArray(source.categories))result.categories=clone(source.categories);
    if(Array.isArray(source.productOrder))result.grid.productOrder=source.productOrder.map(Number);
    result.grid.stockFirst=source.stockFirst!==false;
    return result;
  }
  function migrate(source,context={}){
    if(!source||!Object.keys(source).length)return defaults(context);
    if(Number(source.schemaVersion)>=2)return merge(defaults(context),source);
    return migrateV1(source,context);
  }
  function text(settings,key,vars={}){let value=settings?.texts?.[key]??DEFAULT_TEXTS[key]??key;for(const [name,replacement] of Object.entries(vars))value=String(value).replaceAll(`{${name}}`,String(replacement));return value;}
  const api={DEFAULT_TEXTS,defaults,migrate,merge,text,clone};root.CatalogSiteSchema=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
