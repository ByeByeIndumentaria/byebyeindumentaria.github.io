const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

test('preorder dates are optional and keep the current catalog unchanged by default',()=>{
  const schema=require('../catalog-site-schema.js');
  assert.deepEqual(schema.defaults().collectionsConfig.preorderDates,{});
});

test('preorder dates can be edited in both administration surfaces and render publicly',()=>{
  const adminHtml=fs.readFileSync('admin/index.html','utf8');
  const admin=fs.readFileSync('admin/admin.js','utf8');
  const settings=fs.readFileSync('admin/settings.js','utf8');
  const script=fs.readFileSync('script.js','utf8');
  const html=fs.readFileSync('index.html','utf8');
  assert.match(adminHtml,/collection-estimated-date/);
  assert.match(admin,/estimatedDate/);
  assert.match(admin,/showCountdown/);
  assert.match(settings,/Fechas de preventa/);
  assert.match(settings,/collectionsConfig\.preorderDates/);
  assert.match(script,/function preorderSchedule/);
  assert.match(script,/preorder-countdown/);
  assert.match(script,/replaceAll\('\{fecha\}'/);
  assert.match(html,/id="preorder-countdown"/);
});

test('collection validation accepts a date and rejects malformed dates',()=>{
  const model=require('../admin/model.js');
  assert.doesNotThrow(()=>model.validateCollection({name:'Invierno',type:'preorder',estimatedDate:'2027-05-20'}));
  assert.throws(()=>model.validateCollection({name:'Invierno',type:'preorder',estimatedDate:'20/05/2027'}),/fecha estimada válida/);
});
