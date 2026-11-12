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
      cache: options.method ? 'default' : 'no-store',
      ...options, headers: { apikey: config.publicKey,
        ...(!options.method ? { 'Cache-Control': 'no-cache' } : {}),
        ...(authenticated ? { Authorization: 'Bearer ' + session.access_token } : {}),
        'Content-Type': 'application/json', ...options.headers }, signal: AbortSignal.timeout(30000)
    });
    const data = await response.text();
    let result; try { result = data ? JSON.parse(data) : null; } catch { result = null; }
    if (!response.ok) {
      if (result?.message?.includes('EDIT_CONFLICT')) throw new Error('Tu socia modificó este producto. Cerrá y volvé a abrirlo para ver la última versión antes de guardar.');
      if (result?.message?.includes('REVISION_NOT_FOUND')) throw new Error('Esa versión ya no está disponible. Cerrá el historial y volvé a abrirlo.');
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
    async requestPasswordReset(email, redirectTo) {
      await request('/auth/v1/recover?redirect_to=' + encodeURIComponent(redirectTo), {
        method: 'POST', body: JSON.stringify({ email })
      });
    },
    async acceptPasswordRecovery() {
      const params = new URLSearchParams(location.hash.replace(/^#/, ''));
      if (params.get('type') !== 'recovery' || !params.get('access_token')) return false;
      remember({
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
        expires_at: Number(params.get('expires_at')) || Math.floor(Date.now() / 1000) + Number(params.get('expires_in') || 3600)
      });
      session.user = await request('/auth/v1/user', {}, true);
      remember(session);
      return true;
    },
    async updatePassword(password) {
      const user = await request('/auth/v1/user', { method: 'PUT', body: JSON.stringify({ password }) }, true);
      session.user = user;
      remember(session);
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
    async listCollections() {
      return request('/rest/v1/catalog_collections?select=*&order=position,id');
    },
    async getSiteSettings() {
      return await request('/rest/v1/rpc/get_catalog_site_settings', { method: 'POST', body: '{}' }) || {};
    },
    async getEditorSiteSettings() {
      const rows = await request('/rest/v1/rpc/get_catalog_site_editor_settings', { method: 'POST', body: '{}' }, true);
      return Array.isArray(rows) ? rows[0] : rows;
    },
    async saveSiteDraft(expectedVersion, payload) {
      const rows = await request('/rest/v1/rpc/save_catalog_site_draft', { method: 'POST', body: JSON.stringify({ expected_version: expectedVersion, settings_data: payload }) }, true);
      return Array.isArray(rows) ? rows[0] : rows;
    },
    async publishSiteSettings(expectedVersion) {
      const rows = await request('/rest/v1/rpc/publish_catalog_site_settings', { method: 'POST', body: JSON.stringify({ expected_version: expectedVersion }) }, true);
      return Array.isArray(rows) ? rows[0] : rows;
    },
    async siteSettingsHistory() {
      return request('/rest/v1/rpc/list_catalog_site_revisions', { method: 'POST', body: '{}' }, true);
    },
    async restoreSiteSettings(targetVersion, expectedVersion) {
      const rows = await request('/rest/v1/rpc/restore_catalog_site_revision', { method: 'POST', body: JSON.stringify({ target_version: targetVersion, expected_version: expectedVersion }) }, true);
      return Array.isArray(rows) ? rows[0] : rows;
    },
    saveCollection(id, expectedVersion, payload) {
      return request('/rest/v1/rpc/save_catalog_collection', { method: 'POST', body: JSON.stringify({ collection_id: id, expected_version: expectedVersion, collection_data: payload }) }, true);
    },
    save(id, expectedVersion, payload) {
      return request('/rest/v1/rpc/save_catalog_product', { method: 'POST', body: JSON.stringify({ product_id: id, expected_version: expectedVersion, product_data: payload }) }, true);
    },
    history(id) {
      if (!Number.isSafeInteger(id)) throw new Error('ID inválido.');
      return request('/rest/v1/catalog_product_revisions?select=id,product_id,version,payload,changed_at&product_id=eq.' + id + '&order=version.desc', {}, true);
    },
    restore(id, targetVersion, expectedVersion) {
      return request('/rest/v1/rpc/restore_catalog_product', { method: 'POST', body: JSON.stringify({ p_product_id: id, p_target_version: targetVersion, p_expected_version: expectedVersion }) }, true);
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
