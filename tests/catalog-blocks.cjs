const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const site=fs.readFileSync('catalog-site.js','utf8');
const css=fs.readFileSync('style.css','utf8');
const blocks=fs.readFileSync('admin/settings-blocks.js','utf8');
const html=fs.readFileSync('admin/settings.html','utf8');

test('the catalog draws real photo, gallery, video, FAQ, steps, contact and column blocks',()=>{
  assert.match(site,/function appendBlockContent\(block,item,id\)/);
  for(const type of ['image','gallery','video','faq','howto','contact','columns','divider','spacer'])assert.match(site,new RegExp(`block\\.type==='${type}'`),type);
  assert.match(site,/appendBlockContent\(block,item,id\);if\(block\.buttonLabel\)/);
  assert.match(site,/youtube-nocookie\.com\/embed/);
  assert.match(site,/player\.vimeo\.com\/video/);
  assert.match(site,/document\.createElement\('details'\)/);
});

test('block media only accepts safe addresses',()=>{
  const source=site.slice(site.indexOf('  const blockImage='),site.indexOf('  function picture('));
  const {blockImage,videoEmbed}=new Function(`${source};return{blockImage,videoEmbed};`)();
  assert.equal(blockImage('javascript:alert(1)'),'');
  assert.equal(blockImage('https://x.com/a.jpg" onerror="x'),'');
  assert.equal(blockImage('images/prod_1_1.jpg'),'images/prod_1_1.jpg');
  assert.equal(videoEmbed('https://youtu.be/dQw4w9WgXcQ').src,'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(videoEmbed('https://vimeo.com/123456789').src,'https://player.vimeo.com/video/123456789');
  assert.equal(videoEmbed('javascript:alert(1)'),null);
});

test('"Arriba del encabezado" really places blocks above the header',()=>{
  assert.match(site,/location==='before-header'&&header\)header\.before\(area\)/);
  assert.match(site,/location==='after-header'&&header\)header\.after\(area\)/);
});

test('block inner styles do not clash with the block type class',()=>{
  assert.match(css,/\.managed-block \.managed-block-video\{/);
  assert.match(css,/\.managed-block \.managed-block-gallery\{/);
  assert.doesNotMatch(css,/\n\.managed-block-video\{/);
});

test('the editor offers every block type with its own editor and image helpers',()=>{
  assert.match(html,/settings-blocks\.js\?v=/);
  for(const name of ['Foto','Galería','Video','Preguntas frecuentes','Cómo comprar','Contacto','Columnas','Separador','Espacio'])assert.ok(blocks.includes(`'${name}'`),name);
  assert.match(blocks,/appendSectionEditor=function/);
  assert.match(blocks,/function listEditor/);
  assert.match(blocks,/'Elegir una ya subida'/);
  assert.match(blocks,/meta\.ogimage/);
  assert.match(blocks,/puede verse borrosa/);
});
