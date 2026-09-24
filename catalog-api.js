/* Shared API: public catalog reads; authenticated, authorized writes. */
window.CatalogAPI = (() => {
  const config = window.CATALOG_CONFIG || {};
  let session = null;
  try { session = JSON.parse(sessionStorage.getItem('byebye-admin-session') || 'null'); } catch {}
  const configured = /^https:\/\/[^/]+\.supabase\.co$/.test(config.url || '') && !!config.publicKey;
  function remember(value) {
    session = value;
    if (value) sessionStorage.setItem('byebye-admin-session', JSON.stringify(value));
    else sessionStorage.removeItem('byebye-admin-session');
  }
  async function request(path, options = {}, authenticated = false) {
    if (!configured) throw new Error('Falta conectar el proyecto del catálogo.');
    if (authenticated && !session) throw new Error('Ingresá con tu cuenta para guardar.');
    if (authenticated && session.expires_at * 1000 < Date.now() + 60000) {
      const r = await fetch(config.url + '/auth/v1/token?grant_type=refresh_token', {
        method: 'POST', headers: { apikey: config.publicKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: session.refresh_token })
      });
      if (!r.ok) { remember(null); throw new Error('Tu sesión venció. Volvé a ingresar; tus cambios siguen en el formulario.'); }
      remember(await r.json());
    }
    const response = await fetch(config.url + path, {
      ...options, headers: { apikey: config.publicKey,
        ...(authenticated ? { Authorization: 'Bearer ' + session.access_token } : {}),
        'Content-Type': 'application/json', ...options.headers }, signal: AbortSignal.timeout(30000)
    });
    const data = await response.text();
    let result; try { result = data ? JSON.parse(data) : null; } catch { result = null; }
    if (!response.ok) {
      if (result?.message?.includes('EDIT_CONFLICT')) throw new Error('Tu socia modificó este producto. Cerrá y volvé a abrirlo para ver la última versión antes de guardar.');
      if (response.status === 401 || response.status === 403) throw new Error('No tenés permiso o tu sesión venció. Volvé a ingresar.');
      throw new Error(result?.msg || result?.message || result?.error_description || 'No se pudo guardar. Revisá la conexión e intentá nuevamente.');
    }
    return result;
  }
  return {
    configured,
    get user() { return session?.user || null; },
    async login(email, password) {
      remember(await request('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email, password }) }));
      try { await this.authorize(); } catch (e) { remember(null); throw e; }
    },
    async authorize() {
      const rows = await request('/rest/v1/catalog_editors?select=user_id', {}, true);
      if (!rows.length) throw new Error('Esta cuenta no está habilitada para administrar el catálogo.');
    },
    async logout() { try { await request('/auth/v1/logout', {method:'POST'}, true); } finally { remember(null); } },
    async list(columns = '*') {
      let rows = [], offset = 0;
      for (;;) {
        const page = await request('/rest/v1/catalog_products?select=' + encodeURIComponent(columns) + '&order=id&limit=500&offset=' + offset);
        rows.push(...page); if (page.length < 500) return rows; offset += 500;
      }
    },
    async getProducts(ids) {
      if (!ids.length) return [];
      if (!ids.every(Number.isSafeInteger)) throw new Error('ID inválido.');
      const rows=[];
      for(let i=0;i<ids.length;i+=100) rows.push(...await request('/rest/v1/catalog_products?select=*&id=in.(' + ids.slice(i,i+100).join(',') + ')'));
      return rows;
    },
    save(id, expectedVersion, payload) {
      return request('/rest/v1/rpc/save_catalog_product', { method: 'POST', body: JSON.stringify({ product_id: id, expected_version: expectedVersion, product_data: payload }) }, true);
    },
    async upload(blob) {
      const extensions = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp'};
      const extension = extensions[blob.type];
      if (!extension) throw new Error('La foto debe ser JPG, PNG o WebP.');
      const path = session.user.id + '/' + crypto.randomUUID() + '.' + extension;
      await request('/storage/v1/object/catalog-photos/' + path, { method:'POST', body: blob, headers: { 'Content-Type': blob.type, 'Cache-Control': '31536000' } }, true);
      return config.url + '/storage/v1/object/public/catalog-photos/' + path;
    }
  };
})();
