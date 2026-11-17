const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('the announcement bar is a real editable catalog feature',()=>{
  const schema=fs.readFileSync('catalog-site-schema.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),admin=fs.readFileSync('admin/settings.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.match(schema,/announcementBar:\{enabled:false,messages:\[\],closable:true,rotationSeconds:5/);
  assert.match(site,/function applyAnnouncementBar/);
  assert.match(site,/applyAnnouncementBar\(settings,\{preview\}\)/);
  assert.match(site,/announcementBar\.messages\.\$\{index\}\.text/);
  assert.match(site,/sessionStorage\.setItem\('byebye-announcement-dismissed'/);
  assert.match(admin,/function renderAnnouncement/);
  assert.match(admin,/announcementBar\.rotationSeconds/);
  assert.match(admin,/announcementBar\.messages\.push/);
  assert.match(admin,/\['announcementBar','Barra de anuncio','announcementBar\.enabled'\]/);
  assert.match(css,/\.announcement-bar/);
});

test('the announcement bar is absent by default so the public catalog stays unchanged',()=>{
  const schema=fs.readFileSync('catalog-site-schema.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8');
  assert.match(schema,/announcementBar:\{enabled:false/);
  assert.match(site,/if\(config\.enabled!==true\|\|!messages\.length\)return/);
});
