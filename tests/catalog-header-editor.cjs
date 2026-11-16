const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('header logo, label, icon, sizing and layout controls are connected',()=>{
  const admin=fs.readFileSync('admin/settings.js','utf8'),schema=fs.readFileSync('catalog-site-schema.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  assert.match(admin,/imageField\('Subir logo',settings\.header,'logoUrl'\)/);
  for(const path of ['header.brandMode','header.logoAlt','header.logoHeightDesktop','header.logoHeightMobile','header.brandAlign','header.cartSide','header.showCart','header.cartLabel','header.cartIcon','header.stickyDesktop','header.stickyMobile'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  assert.match(schema,/logoHeightDesktop:36,logoHeightMobile:28/);
  assert.match(site,/className='brand-logo'/);
  assert.match(site,/mode=logoSource\?requestedMode:'text'/);
  assert.match(site,/className='cart-label'/);
  for(const icon of ['bag','cart','box','list'])assert.match(site,new RegExp(`${icon}:`));
  assert.match(site,/--header-logo-h/);
  assert.match(css,/\.brand-logo/);
  assert.match(css,/data-header-brand="left"/);
  assert.match(css,/data-header-brand="right"/);
});

test('uploaded header and flyer images can be removed without code',()=>{
  const admin=fs.readFileSync('admin/settings.js','utf8');
  assert.match(admin,/Quitar imagen/);
  assert.match(admin,/target\[key\]=''/);
});
