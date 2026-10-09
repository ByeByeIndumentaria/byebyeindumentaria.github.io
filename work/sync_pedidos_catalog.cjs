const fs = require('node:fs');

const htmlPath = 'pedidos/index.html';
const config = fs.readFileSync('catalog-config.js', 'utf8');
const url = config.match(/url:\s*'([^']+)'/)?.[1];
const key = config.match(/publicKey:\s*'([^']+)'/)?.[1];
if (!url || !key) throw new Error('No se pudo leer la configuración pública del catálogo.');

function routeImage(src) {
  if (!src) return src;
  if (/^(?:https?:|data:|blob:|\/)/i.test(src)) return src;
  return src.startsWith('../') ? src : `../${src}`;
}

function orderSizes(product, sizes) {
  if (product.category !== 'MUJER' || product.subcategory !== 'Sweaters') return [...sizes];
  return sizes.map(size => size === 'S/M' ? '1' : size === 'M/L' ? '2' : size);
}

function mapOption(option, product) {
  const colors = option.colors?.length ? option.colors : (product.colors || []);
  const sources = option.gallery?.sources?.length ? option.gallery.sources : (product.gallery?.sources || []);
  return {
    ...option,
    codigo: option.orderNumber || product.orderNumber || '',
    colores: [...colors],
    talles: orderSizes(product, option.sizes || product.sizes || []),
    imagenes: sources.map(routeImage),
    formatoVenta: option.sourcePacking || option.label || 'Formato no informado',
    packingType: option.packingType || 'mixed-colors'
  };
}

function mapProduct(row, previous = null) {
  const product = row.payload || {};
  return {
    ...(previous || {}),
    id: Number(row.id),
    codigo: product.orderNumber || '',
    nombre: product.name,
    categoria: product.category || '',
    subcategoria: product.subcategory || '',
    descripcion: product.description || '',
    colores: [...(product.colors || [])],
    coloresFueraDeStock: [...(product.outOfStockColors || [])],
    talles: orderSizes(product, product.sizes || []),
    imagenes: (product.gallery?.sources || []).map(routeImage),
    packaging: product.packaging || null,
    formatoVenta: product.sourcePacking || (product.packingType === 'single-color' ? 'Caja por color' : 'Caja surtida'),
    packingType: product.packingType || 'mixed-colors',
    purchaseOptions: (product.purchaseOptions || []).map(option => mapOption(option, product)),
    enStock: product.inStock !== false,
    coleccion: product.collection || '',
    cloudManaged: true,
    precioReferencia: previous?.precioReferencia
  };
}

async function main() {
  const response = await fetch(`${url}/rest/v1/catalog_products?select=id,payload&order=id`, { headers: { apikey: key } });
  if (!response.ok) throw new Error(`No se pudo leer Supabase (${response.status}).`);
  const rows = await response.json();
  let html = fs.readFileSync(htmlPath, 'utf8');
  const match = html.match(/const CATALOGO = (\[[\s\S]*?\]);\nconst PRECIOS_BASE =/);
  if (!match) throw new Error('No se encontró el catálogo embebido de Notas.');
  const catalog = JSON.parse(match[1]);
  for (const row of rows) {
    if (!Number.isSafeInteger(Number(row.id)) || !row.payload?.name) continue;
    const index = catalog.findIndex(product => product.id === Number(row.id));
    const updated = mapProduct(row, index >= 0 ? catalog[index] : null);
    if (index >= 0) catalog[index] = updated;
    else catalog.push(updated);
  }
  catalog.sort((a, b) => Number(a.id) - Number(b.id));
  html = html.replace(match[0], `const CATALOGO = ${JSON.stringify(catalog)};\nconst PRECIOS_BASE =`);
  fs.writeFileSync(htmlPath, html);
  console.log(`Notas actualizado con ${catalog.length} productos (${rows.length} administrados).`);
}

main().catch(error => { console.error(error.message); process.exit(1); });
