const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('the existing card effect stays unchanged by default',()=>{
  const schema=require('../catalog-site-schema.js');
  assert.equal(schema.defaults().grid.hover,'lift');
});

test('editors can enable a real second-photo hover effect',()=>{
  const settings=fs.readFileSync('admin/settings.js','utf8');
  const script=fs.readFileSync('script.js','utf8');
  const css=fs.readFileSync('style.css','utf8');
  assert.match(settings,/\['second','Segunda foto'\]/);
  assert.match(script,/showSecondPhoto/);
  assert.match(script,/card-img-secondary/);
  assert.match(script,/sources\.filter\(source=>source!==primarySource\)/);
  assert.match(css,/data-card-hover="second"/);
  assert.match(css,/\.card-img-secondary/);
});
