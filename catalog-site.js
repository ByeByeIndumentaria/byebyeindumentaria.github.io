/* Published catalog appearance and structure. Draft preview stays in this browser only. */
(() => {
  const safeText = (value, fallback = '') => typeof value === 'string' ? value.slice(0, 300) : fallback;
  const safeUrl = value => {
    if (typeof value !== 'string') return '';
    if (/^images\/[\w./-]+\.(?:jpe?g|png|webp)(?:\?.*)?$/i.test(value)) return value;
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; }
  };
  const safeColor = (value, fallback) => window.CSS?.supports?.('color', value || '') ? value : fallback;
  function applyTheme(settings) {
    const theme = settings.theme || {}, root = document.documentElement;
    const fonts = {montserrat:"'Montserrat', 'DM Sans', Arial, sans-serif",'dm-sans':"'DM Sans', Arial, sans-serif",serif:"Georgia, 'Times New Roman', serif",system:"system-ui, sans-serif"};
    root.style.setProperty('--black', safeColor(theme.text, '#1f1a15'));
    root.style.setProperty('--white', safeColor(theme.surface, '#f4ede3'));
    root.style.setProperty('--catalog-bg', safeColor(theme.background, '#d8cbbb'));
    root.style.setProperty('--accent', safeColor(theme.accent, '#a24f36'));
    root.style.setProperty('--font-display', fonts[theme.displayFont] || fonts.montserrat);
    root.style.setProperty('--radius', `${Math.min(30, Math.max(0, Number(theme.cardRadius) || 0))}px`);
    root.style.setProperty('--site-card-columns', String(Math.min(6, Math.max(2, Number(theme.desktopColumns) || 4))));
    root.style.setProperty('--site-mobile-columns', String(Math.min(2, Math.max(1, Number(theme.mobileColumns) || 1))));
    document.body.classList.toggle('site-compact-cards', theme.compactCards === true);
    const brand = document.querySelector('.brand-name'); if (brand) brand.textContent = safeText(settings.brandName, 'BYE BYE');
    const tag = document.querySelector('.collection-tag'); if (tag) tag.textContent = safeText(settings.headerTagline, 'BYE BYE Mayorista');
    const search = document.getElementById('product-search'); if (search) search.placeholder = safeText(settings.searchPlaceholder, 'Buscar por nombre o código');
    const footerText = document.querySelector('.site-footer p:not(.footer-brand)'); if (footerText) footerText.textContent = safeText(settings.footerText, 'Catálogo mayorista · Pedidos y cotizaciones por WhatsApp');
  }
  function applyBanners(settings) {
    if (!Array.isArray(settings.banners) || !settings.banners.length) return;
    const carousel = document.getElementById('hero-carousel'), track = carousel?.querySelector('.hero-track'), dots = carousel?.querySelector('.hero-dots');
    if (!carousel || !track || !dots) return;
    const banners = settings.banners.filter(item => item && item.hidden !== true && safeUrl(item.desktopImage || item.mobileImage));
    if (!banners.length) { carousel.hidden = true; return; }
    track.replaceChildren(); dots.replaceChildren();
    banners.forEach((banner, index) => {
      const slide = document.createElement('article');
      slide.className = `hero-slide managed-banner${index ? '' : ' active'}`;
      slide.dataset.collection = safeText(banner.collection, 'todos');
      slide.setAttribute('aria-hidden', String(index !== 0));
      const desktop = safeUrl(banner.desktopImage || banner.mobileImage), mobile = safeUrl(banner.mobileImage || banner.desktopImage);
      slide.style.setProperty('--hero-image', `url("${desktop.replace(/["\\]/g, '')}")`);
      slide.style.setProperty('--mobile-hero-image', `url("${mobile.replace(/["\\]/g, '')}")`);
      if (banner.title || banner.subtitle || banner.buttonLabel) {
        const content = document.createElement('div'); content.className = 'hero-content managed-hero-content';
        if (banner.subtitle) { const eyebrow = document.createElement('p'); eyebrow.className = 'hero-eyebrow'; eyebrow.textContent = safeText(banner.subtitle); content.append(eyebrow); }
        if (banner.title) { const title = document.createElement('h2'); title.className = 'hero-title'; title.textContent = safeText(banner.title); content.append(title); }
        const href = safeUrl(banner.buttonUrl);
        if (banner.buttonLabel && href) { const link = document.createElement('a'); link.className = 'hero-cta'; link.textContent = safeText(banner.buttonLabel); link.href = href; content.append(link); }
        else if (banner.buttonLabel && banner.collection) { const link = document.createElement('a'); link.className = 'hero-cta'; link.textContent = safeText(banner.buttonLabel); link.href = '#catalogo'; link.dataset.collection = safeText(banner.collection); content.append(link); }
        slide.append(content);
      }
      track.append(slide); const dot = document.createElement('span'); dot.className = `hero-dot${index ? '' : ' active'}`; dots.append(dot);
    });
    carousel.dataset.activeCollection = banners[0]?.collection || 'todos';
  }
  function applyBlocks(settings) {
    const blocks = Array.isArray(settings.blocks) ? settings.blocks.filter(block => block && block.hidden !== true) : [];
    const filters = document.getElementById('catalogo'); if (!filters || !blocks.length) return;
    document.querySelector('.managed-content-blocks')?.remove();
    const area = document.createElement('section'); area.className = 'managed-content-blocks';
    for (const block of blocks) {
      const item = document.createElement('article'); item.className = `managed-block managed-block-${['announcement','text','button'].includes(block.type) ? block.type : 'text'}`;
      if (block.title) { const title = document.createElement('h2'); title.textContent = safeText(block.title); item.append(title); }
      if (block.text) { const text = document.createElement('p'); text.textContent = safeText(block.text); item.append(text); }
      if (block.buttonLabel) {
        const link = document.createElement('a'); link.className = 'managed-block-button'; link.textContent = safeText(block.buttonLabel);
        const href = safeUrl(block.buttonUrl); link.href = href || '#catalogo'; if (!href && block.collection) link.dataset.collection = safeText(block.collection);
        item.append(link);
      }
      area.append(item);
    }
    filters.before(area);
  }
  function apply(settings) {
    if (!settings || typeof settings !== 'object') settings = {};
    window.CatalogSiteSettings = settings;
    applyTheme(settings); applyBanners(settings); applyBlocks(settings);
    const title = safeText(settings.seo?.title); if (title) document.title = title;
  }
  window.CatalogSiteReady = (async () => {
    let settings = {};
    if (new URLSearchParams(location.search).has('site-preview')) {
      try { settings = JSON.parse(localStorage.getItem('byebye-site-draft-preview') || '{}'); } catch {}
    } else if (window.CatalogAPI?.configured) {
      try { settings = await window.CatalogAPI.getSiteSettings(); } catch (error) { console.warn('Se usa el diseño base del catálogo.', error.message); }
    }
    apply(settings);
    return settings;
  })();
})();
