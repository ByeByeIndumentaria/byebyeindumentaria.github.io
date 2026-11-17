const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('filter panel position, size, option style and footer controls are connected',()=>{
  const admin=fs.readFileSync('admin/settings.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),css=fs.readFileSync('style.css','utf8');
  for(const path of ['filtersPanel.sideDesktop','filtersPanel.sideMobile','filtersPanel.width','filtersPanel.mobileHeight','filtersPanel.optionStyle','filtersPanel.showFooterDesktop','filtersPanel.showFooterMobile'])assert.match(admin,new RegExp(path.replace('.','\\.')));
  for(const data of ['filtersSide','filtersMobile','filtersOptions','filtersFooterDesktop','filtersFooterMobile'])assert.match(site,new RegExp(data));
  assert.match(site,/--filters-mobile-height/);
  for(const value of ['data-filters-side="center"','data-filters-mobile="left"','data-filters-mobile="right"','data-filters-options="pills"','data-filters-options="checks"'])assert.match(css,new RegExp(value));
});

test('filter groups can be renamed, hidden and reordered',()=>{
  const html=fs.readFileSync('index.html','utf8'),admin=fs.readFileSync('admin/settings.js','utf8'),site=fs.readFileSync('catalog-site.js','utf8'),schema=fs.readFileSync('catalog-site-schema.js','utf8');
  for(const id of ['collections','genders','categories'])assert.match(html,new RegExp(`data-filter-group="${id}"`));
  assert.match(schema,/hiddenGroups:\[\]/);
  assert.match(admin,/filtersPanel\.hiddenGroups/);
  assert.match(admin,/settings\.texts\[textKey\]=input\.value/);
  assert.match(site,/body\.querySelectorAll\('\[data-filter-group\]'\)/);
  assert.match(site,/node\.hidden=hidden\.has\(id\)/);
  assert.match(site,/body\.append\(node\)/);
  assert.match(fs.readFileSync('style.css','utf8'),/\[data-filter-group\]\[hidden\][\s\S]*?display: none !important/);
});
