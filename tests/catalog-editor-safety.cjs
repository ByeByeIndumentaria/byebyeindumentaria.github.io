const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const settings=fs.readFileSync('admin/settings.js','utf8');
const html=fs.readFileSync('admin/settings.html','utf8');
const css=fs.readFileSync('admin/editor-polish.css','utf8');
const api=fs.readFileSync('catalog-api.js','utf8');

test('the visual editor never loses unsaved work silently',()=>{
  assert.match(settings,/addEventListener\('beforeunload'/);
  assert.match(settings,/BACKUP_KEY='byebye-editor-backup'/);
  assert.match(settings,/function offerBackupRecovery\(\)/);
  assert.match(settings,/await offerBackupRecovery\(\)/);
  assert.match(settings,/function scheduleAutosave\(\)/);
  assert.match(settings,/saveDraft\(\{quiet:true\}\)/);
  assert.match(settings,/visibilityState==='hidden'\)writeBackup\(\)/);
});

test('saving keeps the undo history and detects changes made while saving',()=>{
  const save=settings.slice(settings.indexOf('async function saveDraft'),settings.indexOf('const publishAreaLabels'));
  assert.doesNotMatch(save,/updateState\(next\)/);
  assert.match(save,/markSaved\(next,seq,payload\)/);
  assert.match(settings,/dirty=changeSeq!==seq/);
});

test('undo groups typing in the same field and leaves text fields to the browser',()=>{
  assert.match(settings,/lastRemember\.node===active&&now-lastRemember\.time<1500/);
  assert.match(settings,/closest\?\.\('input:not\(\[type=checkbox\]\)/);
  assert.match(settings,/key==='s'/);
});

test('design conflicts explain the situation and offer both versions',()=>{
  assert.match(api,/conflict\.code = 'EDIT_CONFLICT'/);
  assert.match(api,/path\.includes\('catalog_site'\)/);
  assert.match(settings,/function resolveDraftConflict/);
  assert.match(settings,/'Quedarme con la mía'/);
  assert.match(settings,/'Ver la otra versión'/);
});

test('publishing shows which parts of the catalog will change',()=>{
  const publish=settings.slice(settings.indexOf('async function publish()'),settings.indexOf('async function offerBackupRecovery'));
  assert.match(publish,/changedAreas\(\)/);
  assert.match(publish,/askDialog\(/);
  assert.doesNotMatch(publish,/confirm\(/);
  assert.match(settings,/function stableJson/);
});

test('editor layout fixes: breadcrumb, layers, uploads, loading',()=>{
  assert.match(css,/\.panel-heading \.selection-path button\{[^}]*width:auto;height:auto/);
  assert.match(css,/\.layer-item\{display:flex/);
  assert.match(settings,/selectedEditLabel\.trim\(\)\.toLocaleLowerCase\('es'\)!==root/);
  assert.match(settings,/'upload-button'/);
  assert.match(html,/id="editor-loading"/);
  assert.match(html,/editor-polish\.css\?v=/);
  assert.match(settings,/\$\('editor-loading'\)\.hidden=true/);
});

test('design conflicts carry a code the editor can act on',async()=>{
  global.window={CATALOG_CONFIG:{url:'https://example.supabase.co',publicKey:'k'}};
  global.sessionStorage={getItem:()=>JSON.stringify({access_token:'a',refresh_token:'r',expires_at:Date.now()/1000+3600,user:{id:'u'}}),setItem(){},removeItem(){}};
  global.fetch=async()=>({ok:false,status:400,text:async()=>JSON.stringify({message:'EDIT_CONFLICT'})});
  const original=console.error;console.error=()=>{};
  try{
    new Function(api)();
    await assert.rejects(window.CatalogAPI.saveSiteDraft(3,{}),error=>error.code==='EDIT_CONFLICT'&&/diseño/.test(error.message));
    await assert.rejects(window.CatalogAPI.save(1,3,{}),error=>error.code==='EDIT_CONFLICT'&&/Tu socia/.test(error.message));
  }finally{console.error=original;}
});
