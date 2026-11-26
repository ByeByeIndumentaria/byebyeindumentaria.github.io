const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

function palettes(){const window={};const source=fs.readFileSync('admin/settings-palettes.js','utf8');new Function('window','renderers','group','el','button','settings','selectedLayer','renderPanel',source)(window,{theme(){}},()=>{},()=>{},()=>{},undefined,'',()=>{});return window.CatalogPalettes;}
const luminance=hex=>{const [r,g,b]=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b;};
const contrast=(a,b)=>{const [x,y]=[luminance(a),luminance(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05);};

test('every suggested palette sets every catalog color',()=>{
  const keys=Object.keys(require('../catalog-site-schema.js').defaults().tokens.colors);
  for(const palette of palettes())for(const key of keys)assert.match(palette.colors[key]||'',/^#[0-9a-f]{6}$/,`${palette.name}: ${key}`);
});

test('text and buttons stay readable in every palette',()=>{
  for(const p of palettes()){
    assert.ok(contrast(p.colors.text,p.colors.catalog)>=7,`${p.name}: texto`);
    assert.ok(contrast(p.colors.muted,p.colors.catalog)>=4.5,`${p.name}: texto secundario`);
    assert.ok(contrast('#ffffff',p.colors.accent)>=4.5,`${p.name}: botones`);
    assert.ok(contrast(p.colors.footerText,p.colors.footerBg)>=7,`${p.name}: pie`);
    assert.ok(contrast(p.extra.announce[1],p.extra.announce[0])>=4.5,`${p.name}: barra de anuncio`);
  }
});

test('the search bar follows the palette and palettes offer to clear hand-picked colors',()=>{
  const css=fs.readFileSync('catalog-shop.css','utf8');
  assert.match(css,/\.filters-section\{background:var\(--search-bg\)\}/);assert.match(css,/\.catalog-search-input\{background:var\(--white\)/);
  const source=fs.readFileSync('admin/settings-palettes.js','utf8');assert.match(source,/colores puestos a mano/);assert.match(fs.readFileSync('admin/settings.html','utf8'),/settings-palettes\.js\?v=/);
});

test('the Editorial full style switches the catalog to a clean Zara-like look and can be undone',()=>{
  const source=fs.readFileSync('admin/settings-palettes.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('catalog-shop.css','utf8');
  assert.match(source,/settings\.look='editorial'/);assert.match(source,/Editorial \(onda Zara\)/);assert.match(source,/remember\(\);settings\.look='editorial'/);
  assert.match(site,/document\.body\.dataset\.look=\['editorial'\]\.includes\(settings\.look\)/);
  assert.equal(require('../catalog-site-schema.js').defaults().look,'');
  assert.match(css,/body\[data-look="editorial"\] \.card-img-wrap/);
});

test('modern fonts are offered in the editor and only downloaded when used',()=>{
  const site=fs.readFileSync('catalog-site.js','utf8'),settings=fs.readFileSync('admin/settings.js','utf8');
  for(const key of ['archivo','inter-tight','space-grotesk','syne','bricolage','fraunces']){assert.ok(site.includes(`'${key}':`),key);assert.ok(settings.includes(`['${key}',`),key);}
  assert.match(site,/function ensureFonts\(ty\)/);assert.match(site,/ensureFonts\(ty\);/);
});
