/* ================================================
   BYE BYE — Catálogo Verano 2027
   script.js — Catalog, Cart, PDF, WhatsApp
   ================================================ */

// ── PRODUCT DATA ────────────────────────────────
const products = [
  // ── MUJER ──
  {
    id: 1, name: "Set Algodón", category: "MUJER", subcategory: "Conjuntos",
    description: "Set de algodón fresco y confortable. Ideal para el verano.",
    colors: ["Blanco", "Gris Melange", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1Z0StXP7Brv6ZxDvTFHA0oXeQZPRN9tMe"
  },
  {
    id: 2, name: "Remera Broderie", category: "MUJER", subcategory: "Remeras",
    description: "Remera con detalle bordado tipo broderie. Diseño delicado y femenino.",
    colors: ["Blanco", "Celeste", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/13Pb6aX6Ahsl0CGxnDRZfos4Xpf0icI2L"
  },
  {
    id: 3, name: "Remera Puntilla", category: "MUJER", subcategory: "Remeras",
    description: "Remera con encaje de puntilla, combinación de textura y feminidad.",
    colors: ["Blanco", "Celeste", "Amarillo", "Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1qZ-cnXV1XjnzzKcC6LLoyxG6Cukm4a1w"
  },
  {
    id: 4, name: "Chomba Algodón", category: "MUJER", subcategory: "Remeras",
    description: "Chomba de algodón clásica, fresca y versátil para el verano.",
    colors: ["Blanco", "Gris Melange", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1TRK8xKRj538h_-gNiw-rbvN5e1WJXBHu"
  },
  {
    id: 5, name: "Chomba Tejida", category: "MUJER", subcategory: "Remeras",
    description: "Chomba de tejido artesanal con textura natural y elegante.",
    colors: ["Crudo", "Beige", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1QdMaj5Qz4rRR585dWSSR-4-4DdDcBlZb"
  },
  {
    id: 6, name: "Set Lino", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto en lino premium. Liviano, transpirable y de líneas limpias.",
    colors: ["Blanco", "Lino", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1kk8tVct1mUJe01hrzWPcsDYqKVfmyQKf"
  },
  {
    id: 7, name: "Vestido Camisero", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido camisero de corte relajado. Estilo atemporal para el verano.",
    colors: ["Crudo", "Militar", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1PodtHSPMdOvt_xbRvUyd1DtqDPcMGUYL"
  },
  {
    id: 8, name: "Chaleco Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Chaleco de lino parte del conjunto coordinado. Corte sastrero.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/19Zl3NQK1Hy0aaZyBrJtzxbpw8NBtYWji"
  },
  {
    id: 9, name: "Pantalón Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Pantalón de lino para combinar con el chaleco del conjunto.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/19Zl3NQK1Hy0aaZyBrJtzxbpw8NBtYWji"
  },
  {
    id: 10, name: "Chaleco Sastrero", category: "MUJER", subcategory: "Conjuntos",
    description: "Chaleco de estilo sastrero. Elegante y estructurado.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1zQcVnGgHlM1veh3PAK3K3SRtMm2pZ83x"
  },
  {
    id: 11, name: "Musculosa Arandelas", category: "MUJER", subcategory: "Remeras",
    description: "Musculosa con detalle de arandelas. Casual y femenina.",
    colors: ["Blanco", "Crudo", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1852OsH07Z6ydKURacb8d4rmlTZa_2x4s"
  },
  {
    id: 12, name: "Enterito Cinto", category: "MUJER", subcategory: "Monos",
    description: "Enterito con cinto ajustable. Prenda única muy versátil.",
    colors: ["Blanco", "Marrón", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1Ia7_ul_P6ncpMv6pJpDtwb8o0B8W54_Q"
  },
  {
    id: 13, name: "Camisa Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Camisa de lino parte del conjunto con jogger. Corte relajado.",
    colors: ["Blanco", "Crudo", "Khaki", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/11ILa9pWzniQ8Gvf3k9YUDOp53OTtMktA"
  },
  {
    id: 14, name: "Jogger Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Jogger de lino para combinar con la camisa del conjunto.",
    colors: ["Blanco", "Crudo", "Khaki", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/11ILa9pWzniQ8Gvf3k9YUDOp53OTtMktA"
  },
  {
    id: 15, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Pantalones",
    description: "Pantalón de corte sastrero. Líneas limpias y modernas.",
    colors: ["Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/17ScAv--Yk098pnmBBN1fV3lFl0Xhy4pa"
  },
  {
    id: 16, name: "Short Brezo", category: "MUJER", subcategory: "Pantalones",
    description: "Short fresco ideal para los días de calor.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1-ggL38EPIJG_qDWy3PEPXeRW4I6Rmmqw"
  },
  {
    id: 17, name: "Enterito Escote V", category: "MUJER", subcategory: "Monos",
    description: "Enterito con escote en V, estilizado y moderno.",
    colors: ["Estampa 1", "Beige", "Estampa 2", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1nLX5VuR3Wq-vuvx9yOGa8IVtY9fa67Iw"
  },
  {
    id: 18, name: "Pantalón Broderie", category: "MUJER", subcategory: "Pantalones",
    description: "Pantalón con detalle bordado tipo broderie.",
    colors: ["Blanco", "Celeste", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/13Pb6aX6Ahsl0CGxnDRZfos4Xpf0icI2L"
  },
  {
    id: 19, name: "Vestido Gasa", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido en gasa liviana. Fluido y romántico para el verano.",
    colors: ["Estampa 1", "Estampa 2", "Camel", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1IvabM_fQrJ_YHH6yrfcX9ePaqmo-41dH"
  },
  {
    id: 20, name: "Vestido Gasa Largo", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido largo en gasa, ideal para eventos o salidas nocturnas.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1_vDH_KQa_Rq6AmUltU8sLUbRZAczXbsd"
  },
  {
    id: 21, name: "Vestido Gasa Corto", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido corto en gasa para looks veraniegos.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/168T1Drp0K4iQEQQW1cNMkxbfn-L4CMhy"
  },
  {
    id: 22, name: "Vestido Nudo", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido con detalle de nudo. Ajuste perfecto y estilo definido.",
    colors: ["Blanco", "Rojo", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1UC18Dml0K-Z-cwiIxWpTZBHpUmBnNlDe"
  },
  {
    id: 23, name: "Vestido Básico", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido básico esencial. Corte limpio y atemporal.",
    colors: ["Blanco", "Negro", "Varios"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1uZdeu22QjteZvTrDnCRrL3bck6Q2k8Ze"
  },
  {
    id: 24, name: "Vestido Camisero Largo", category: "MUJER", subcategory: "Vestidos",
    description: "Versión larga del vestido camisero. Ideal para el día a día.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1ay7bTpnbX5Q9aDu_9p1A5MEL6Lnjs27R"
  },
  {
    id: 25, name: "Vestido Camisero Corto", category: "MUJER", subcategory: "Vestidos",
    description: "Versión corta del vestido camisero. Fresco y fácil de combinar.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1AW7qaYrllrxMGPXGrwDr-7VxRF-VGdhP"
  },
  {
    id: 26, name: "Set Lino Estampado", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto de lino con estampados originales de la temporada.",
    colors: ["Estampa 1", "Estampa 2", "Camel", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1LA0lcgqctXeFnmM3oFB--7jkZbz1iviI"
  },
  {
    id: 27, name: "Musculosa Nudo", category: "MUJER", subcategory: "Remeras",
    description: "Musculosa con nudo frontal. Casual y femenina para el verano.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1S_j38nYai1u9IX4vs0agrfVpHeSHRpVY"
  },
  {
    id: 28, name: "Vestido Escote V", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido con escote en V profundo. Elegante y sensual.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1V5Cf8IhUG2J-N2pUM9HmhV9pULpFSCQv"
  },
  {
    id: 29, name: "Vestido Túnica", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido tipo túnica, cómodo y amplio para el calor.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/11OXMrrwRXoawPBDPFoex_9CpPj-zKquy"
  },
  {
    id: 30, name: "Vestido Trenza", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido con detalle de trenza. Acabado artesanal y único.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/11K5C02_jXz1b69YSvfwwLjXOV_dR09F-"
  },
  {
    id: 31, name: "Set Estampado", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto con estampados de temporada. Diseño fresco y moderno.",
    colors: ["Varios estampados"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: "https://drive.google.com/drive/folders/1uHtUDsgqLAMcYyIaBoapJykcI1rwGoCe"
  },

  // ── HOMBRE ──
  {
    id: 32, name: "Bermuda Lino", category: "HOMBRE", subcategory: "Partes de abajo",
    description: "Bermuda de lino premium para el verano. Cómoda y sofisticada.",
    colors: ["Oliva", "Khaki", "Gris Oscuro", "Marrón", "Blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/10kCK4b5AHlkQCwhECs1RpcCZNnRoLCf9"
  },
  {
    id: 33, name: "Camisa Lino", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Camisa de lino con caída natural. Ideal para looks casuales o formales.",
    colors: ["Blanco", "Beige", "Gris", "Gris Verdoso", "Celeste"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/11xJyUmqjSWywSeL4y-HLB83PjulODiwX"
  },
  {
    id: 34, name: "Chomba Jersey Lisa Plus", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Chomba de jersey lisa en talles grandes. Premium comfort.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: "https://drive.google.com/drive/folders/1glaWnOJ2A43-PQm0zG25OvaLgcIYZ_vY"
  },
  {
    id: 35, name: "Chomba Piqué Lisa", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Chomba de piqué lisa clásica. Colores neutros y vibrantes.",
    colors: ["Blanco", "Crudo", "Beige", "Melange", "Celeste", "Marino", "Oliva", "Petróleo", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1SJcTJqm7eDQQhcReg41pG774C4SnLZmO"
  },
  {
    id: 36, name: "Chomba Piqué Lisa Plus", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Chomba de piqué lisa en talles grandes. Misma calidad, mayor amplitud.",
    colors: ["Blanco", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: "https://drive.google.com/drive/folders/17GgLeSQnmV3OOMIVGrPUCm2XewhipPn5"
  },
  {
    id: 37, name: "Chomba Piqué Penguin", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Chomba piqué con detalle tipo penguin. Diseño clásico y deportivo.",
    colors: ["Blanco", "Beige", "Celeste", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1DK20_antntq4DDhPR6WtrdHHTcgN-YOH"
  },
  {
    id: 38, name: "Chomba Piqué Vivo", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Chomba piqué con vivos en contraste. Diseño deportivo elegante.",
    colors: ["Blanco vivo marino", "Beige vivo negro", "Melange vivo blanco", "Marino vivo blanco", "Negro vivo blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1ncEtzgxrHAGSY83mBCuCV2ct-7VxRF-VGdhP".replace('7VxRF', '6famf7')
  },
  {
    id: 39, name: "Remera Deportiva", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Remera deportiva técnica. Ideal para actividad física y uso casual.",
    colors: ["Blanco", "Gris", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/19bkr0lNHftz7nfY9AGvBlUvtzLmJsl0o"
  },
  {
    id: 40, name: "Remera Algodón", category: "HOMBRE", subcategory: "Partes de arriba",
    description: "Remera de algodón lisa. Del S al 6XL para todos los talles.",
    colors: ["Blanco", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
    driveLink: "https://drive.google.com/drive/folders/1_duIAgMVikz_ik9-e-mSqKSN4XYFJecr"
  },
  {
    id: 41, name: "Pantalón Lino", category: "HOMBRE", subcategory: "Partes de abajo",
    description: "Pantalón de lino para hombre. Liviano, transpirable y elegante.",
    colors: ["Beige", "Oliva", "Gris Topo", "Gris", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1qJx8DJTUpncHSOJVM7tP96g2V-mGAHPW"
  },
  {
    id: 42, name: "Traje de Baño", category: "HOMBRE", subcategory: "Partes de abajo",
    description: "Traje de baño liso y surf. Colores actuales de la temporada.",
    colors: ["Beige", "Celeste", "Chocolate", "Gris", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1-VcVfCvNXHHpCajrWZIEHOOIkXQaiB5l"
  }
];

// Fix a driveLink that was accidentally corrupted above
products[37].driveLink = "https://drive.google.com/drive/folders/1ncEtzgxrHAGSY83mBCuCV2ct-6famf7";

// ── STATE ────────────────────────────────────────
let cart = [];
let activeGender = 'all';
let activeCategory = 'all';
let currentModalProduct = null;

// ── DOM REFS ─────────────────────────────────────
const productGrid = document.getElementById('product-grid');
const emptyState = document.getElementById('empty-state');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const cartActionsEl = document.getElementById('cart-actions');
const cartCountEl = document.getElementById('cart-count');
const categoryFilters = document.getElementById('category-filters');
const genderFilters = document.getElementById('gender-filters');
const resultsCountEl = document.getElementById('results-count');
const modalOverlay = document.getElementById('modal-overlay');
const productModal = document.getElementById('product-modal');
const toast = document.getElementById('toast');

// ── INIT ─────────────────────────────────────────
function init() {
  buildCategoryFilters();
  renderProducts();
  bindEvents();
}

// ── CATEGORY FILTERS ────────────────────────────
function buildCategoryFilters() {
  const allBtn = document.createElement('button');
  allBtn.className = 'pill active';
  allBtn.dataset.filter = 'category';
  allBtn.dataset.value = 'all';
  allBtn.textContent = 'Todas';
  categoryFilters.appendChild(allBtn);

  const cats = [...new Set(products.map(p => p.subcategory))].sort();
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.dataset.filter = 'category';
    btn.dataset.value = cat;
    btn.textContent = cat;
    categoryFilters.appendChild(btn);
  });
}

function updateCategoryFilters() {
  const available = new Set(
    products
      .filter(p => activeGender === 'all' || p.category === activeGender)
      .map(p => p.subcategory)
  );

  categoryFilters.querySelectorAll('.pill').forEach(btn => {
    const v = btn.dataset.value;
    if (v === 'all') { btn.style.display = ''; return; }
    btn.style.display = available.has(v) ? '' : 'none';
  });

  if (activeCategory !== 'all' && !available.has(activeCategory)) {
    activeCategory = 'all';
    categoryFilters.querySelectorAll('.pill').forEach(b => {
      b.classList.toggle('active', b.dataset.value === 'all');
    });
  }
}

// ── RENDER PRODUCTS ──────────────────────────────
function getFilteredProducts() {
  return products.filter(p => {
    const genderOk = activeGender === 'all' || p.category === activeGender;
    const catOk = activeCategory === 'all' || p.subcategory === activeCategory;
    return genderOk && catOk;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productGrid.innerHTML = '';

  resultsCountEl.textContent = `${filtered.length} prenda${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  filtered.forEach(p => {
    const inCart = cart.some(c => c.id === p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="card-img-wrap">
        <span class="card-badge-gender">${p.category === 'MUJER' ? 'Mujer' : 'Hombre'}</span>
        <div class="card-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
          </svg>
          <span class="placeholder-name">${p.name}</span>
          <span style="font-size:10px;color:#bbb">Ver fotos en Drive</span>
        </div>
        <button class="card-add ${inCart ? 'added' : ''}" data-id="${p.id}" aria-label="Agregar al carrito">
          ${inCart
            ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
            : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
          }
        </button>
      </div>
      <div class="card-info">
        <p class="card-subcat">${p.subcategory}</p>
        <p class="card-name">${p.name}</p>
        <a class="card-drive" href="${p.driveLink}" target="_blank" onclick="event.stopPropagation()">Ver fotos →</a>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-add') || e.target.closest('.card-drive')) return;
      openModal(p);
    });

    card.querySelector('.card-add').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCart(p);
    });

    productGrid.appendChild(card);
  });
}

// ── MODAL ────────────────────────────────────────
function openModal(p) {
  currentModalProduct = p;
  const inCart = cart.some(c => c.id === p.id);

  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-gender').textContent = p.category === 'MUJER' ? 'Mujer' : 'Hombre';
  document.getElementById('modal-subcat').textContent = p.subcategory;
  document.getElementById('modal-collection').textContent = 'VERANO 2027';
  document.getElementById('modal-desc').textContent = p.description;

  // Colors
  const colorsEl = document.getElementById('modal-colors');
  colorsEl.innerHTML = p.colors.map(c => `<span class="color-chip">${c}</span>`).join('');

  // Sizes
  const sizesEl = document.getElementById('modal-sizes');
  sizesEl.innerHTML = p.sizes.map(s => `<span class="size-chip">${s}</span>`).join('');

  // Drive link
  document.getElementById('modal-drive-link').href = p.driveLink;

  // Placeholder image in modal
  document.getElementById('modal-img').src = '';
  document.getElementById('modal-img').alt = p.name;
  document.getElementById('modal-img').style.display = 'none';

  const addBtn = document.getElementById('modal-add-btn');
  addBtn.textContent = inCart ? '✓ En tu selección' : 'Agregar a la selección';
  addBtn.className = 'btn-add-modal' + (inCart ? ' in-cart' : '');

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

// ── CART ─────────────────────────────────────────
function toggleCart(product) {
  const idx = cart.findIndex(c => c.id === product.id);
  if (idx === -1) {
    cart.push(product);
    showToast(`"${product.name}" agregada`);
  } else {
    cart.splice(idx, 1);
    showToast(`"${product.name}" quitada`);
  }
  updateCartUI();
  updateCardStates();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
  updateCardStates();
}

function clearCart() {
  cart = [];
  updateCartUI();
  updateCardStates();
}

function updateCartUI() {
  const count = cart.length;

  // Count badge
  cartCountEl.textContent = count;
  cartCountEl.classList.add('bump');
  setTimeout(() => cartCountEl.classList.remove('bump'), 250);

  // Empty / filled state
  cartEmptyEl.style.display = count === 0 ? 'flex' : 'none';
  cartItemsEl.style.display = count === 0 ? 'none' : 'block';
  cartActionsEl.style.display = count === 0 ? 'none' : 'flex';

  // Render cart items
  cartItemsEl.innerHTML = '';
  cart.forEach(p => {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <div class="cart-item-img">
        <div class="cart-item-img-placeholder">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
          </svg>
        </div>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-subcat">${p.subcategory}</p>
        <p class="cart-item-name">${p.name}</p>
        <p class="cart-item-gender">${p.category === 'MUJER' ? 'Mujer' : 'Hombre'}</p>
      </div>
      <button class="cart-item-remove" data-id="${p.id}" aria-label="Eliminar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;
    item.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(p.id));
    cartItemsEl.appendChild(item);
  });

  // Update modal add button if open
  if (currentModalProduct) {
    const inCart = cart.some(c => c.id === currentModalProduct.id);
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.textContent = inCart ? '✓ En tu selección' : 'Agregar a la selección';
    addBtn.className = 'btn-add-modal' + (inCart ? ' in-cart' : '');
  }
}

function updateCardStates() {
  document.querySelectorAll('.card-add').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const inCart = cart.some(c => c.id === id);
    btn.classList.toggle('added', inCart);
    btn.innerHTML = inCart
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  });
}

// ── WHATSAPP ─────────────────────────────────────
function sendWhatsApp() {
  if (cart.length === 0) { showToast('Tu selección está vacía'); return; }

  const lines = ['🛍️ *Mi selección — BYE BYE Verano 2027*', ''];
  cart.forEach((p, i) => {
    lines.push(`${i + 1}. *${p.name}*`);
    lines.push(`   Categoría: ${p.subcategory} | ${p.category === 'MUJER' ? 'Mujer' : 'Hombre'}`);
    lines.push(`   Colores disponibles: ${p.colors.join(', ')}`);
    lines.push(`   Talles: ${p.sizes.join(' - ')}`);
    lines.push('');
  });
  lines.push(`Total prendas seleccionadas: ${cart.length}`);
  lines.push('');
  lines.push('📸 ¡Hola! Quisiera hacer un pedido con estas prendas.');

  const msg = encodeURIComponent(lines.join('\n'));
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// ── PDF ───────────────────────────────────────────
function downloadPDF() {
  if (cart.length === 0) { showToast('Tu selección está vacía'); return; }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const pageW = 210;
  const margin = 20;
  let y = margin;

  // Header bar
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageW, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BYE BYE', margin, 17);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 169, 110);
  doc.text('CATÁLOGO VERANO 2027', pageW - margin, 10, { align: 'right' });
  doc.setTextColor(180, 180, 180);
  doc.text('Made for summer.', pageW - margin, 17, { align: 'right' });

  y = 40;

  // Title
  doc.setTextColor(10, 10, 10);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('MI SELECCIÓN', margin, y);

  const date = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text(date, pageW - margin, y, { align: 'right' });

  y += 4;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  // Products
  cart.forEach((p, i) => {
    if (y > 255) {
      doc.addPage();
      y = margin;
    }

    // Item number circle
    doc.setFillColor(10, 10, 10);
    doc.circle(margin + 4, y + 3, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(String(i + 1), margin + 4, y + 4.5, { align: 'center' });

    // Product name
    doc.setTextColor(10, 10, 10);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(p.name, margin + 12, y + 5);

    y += 12;

    // Category / gender
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`${p.category === 'MUJER' ? 'Mujer' : 'Hombre'} · ${p.subcategory}`, margin + 12, y);
    y += 6;

    // Colors
    doc.setTextColor(150, 100, 50);
    doc.text('Colores: ', margin + 12, y);
    doc.setTextColor(60, 60, 60);
    const colText = p.colors.join(', ');
    const colLines = doc.splitTextToSize(colText, pageW - margin * 2 - 30);
    doc.text(colLines, margin + 28, y);
    y += colLines.length * 5 + 2;

    // Sizes
    doc.setTextColor(150, 100, 50);
    doc.text('Talles: ', margin + 12, y);
    doc.setTextColor(60, 60, 60);
    doc.text(p.sizes.join(' — '), margin + 28, y);
    y += 6;

    // Drive link
    doc.setTextColor(100, 120, 200);
    doc.setFontSize(7.5);
    doc.text('Ver fotos: ' + p.driveLink, margin + 12, y);

    y += 4;
    doc.setDrawColor(235, 235, 235);
    doc.line(margin, y, pageW - margin, y);
    y += 8;
  });

  // Summary
  if (y > 255) { doc.addPage(); y = margin; }
  y += 4;
  doc.setFillColor(245, 242, 238);
  doc.roundedRect(margin, y, pageW - margin * 2, 18, 2, 2, 'F');
  doc.setTextColor(10, 10, 10);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total de prendas seleccionadas: ${cart.length}`, margin + 8, y + 11);

  // Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let pg = 1; pg <= totalPages; pg++) {
    doc.setPage(pg);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text(`BYE BYE — Catálogo Verano 2027`, margin, 292);
    doc.text(`Pág. ${pg} / ${totalPages}`, pageW - margin, 292, { align: 'right' });
  }

  doc.save('ByeBye_Seleccion_Verano2027.pdf');
  showToast('PDF descargado');
}

// ── TOAST ─────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── EVENTS ───────────────────────────────────────
function bindEvents() {
  // Cart open/close
  document.getElementById('cart-toggle').addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  const closeCart = () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  document.getElementById('close-cart').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Gender filters
  genderFilters.addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    activeGender = btn.dataset.value;
    genderFilters.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b === btn));
    updateCategoryFilters();
    renderProducts();
  });

  // Category filters
  categoryFilters.addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    activeCategory = btn.dataset.value;
    categoryFilters.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b === btn));
    renderProducts();
  });

  // Cart actions
  document.getElementById('btn-whatsapp').addEventListener('click', sendWhatsApp);
  document.getElementById('btn-pdf').addEventListener('click', downloadPDF);
  document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm('¿Vaciar toda la selección?')) clearCart();
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.getElementById('modal-add-btn').addEventListener('click', () => {
    if (currentModalProduct) toggleCart(currentModalProduct);
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
    }
  });
}

// ── START ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
