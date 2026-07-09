/* ================================================
   BYE BYE — Catálogo Verano 2027
   script.js — Catalog, Cart, PDF, WhatsApp
   ================================================ */

// ── PRODUCT DATA ────────────────────────────────
// -- COLLECTIONS ----------------------------------
const collections = [
  { id: "verano-2027", name: "Verano 2027", label: "SS 2027", tagline: "Made for summer." },
  { id: "invierno-2027", name: "Invierno 2027", label: "FW 2027", tagline: "Próximamente.", disabled: true }
];

// -- EASY CATALOG CONTROL -------------------------
// Para poner un producto fuera de stock, agregá su número:
// const OUT_OF_STOCK_PRODUCT_IDS = [12, 43];
const OUT_OF_STOCK_PRODUCT_IDS = [33];

// Para sacar un producto de la página sin borrarlo, agregá su número:
// const HIDDEN_PRODUCT_IDS = [7, 18];
const HIDDEN_PRODUCT_IDS = [];

const products = [
  // ── MUJER ──
  {
    id: 1, name: "Set Algodón", category: "MUJER", subcategory: "Conjuntos",
    description: "Set de algodón fresco y confortable. Ideal para el verano.",
    colors: ["Blanco", "Melange", "Negro"],
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
    colors: ["Blanco", "Melange", "Negro"],
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
    colors: ["Blanco", "Crudo", "Caqui", "Oliva", "Negro"],
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
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
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
    colors: ["Blanco", "Rojo", "Chocolate", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: "https://drive.google.com/drive/folders/1V5Cf8IhUG2J-N2pUM9HmhV9pULpFSCQv"
  },
  {
    id: 29, name: "Vestido Túnica", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido tipo túnica, cómodo y amplio para el calor.",
    colors: ["Estampa 1", "Estampa 2"],
    sizes: ["M"],
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
    id: 32, name: "Bermuda Lino", category: "HOMBRE", subcategory: "Pantalones",
    description: "Bermuda de lino premium para el verano. Cómoda y sofisticada.",
    colors: ["Oliva", "Khaki", "Gris Oscuro", "Marrón", "Blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/10kCK4b5AHlkQCwhECs1RpcCZNnRoLCf9"
  },
  {
    id: 33, name: "Camisa Lino", category: "HOMBRE", subcategory: "Camisas",
    description: "Camisa de lino con caída natural. Ideal para looks casuales o formales.",
    colors: ["Blanco", "Beige", "Gris", "Gris Verdoso", "Celeste"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/11xJyUmqjSWywSeL4y-HLB83PjulODiwX"
  },
  {
    id: 34, name: "Chomba Jersey Lisa Plus", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba de jersey lisa en talles grandes. Premium comfort.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: "https://drive.google.com/drive/folders/1glaWnOJ2A43-PQm0zG25OvaLgcIYZ_vY"
  },
  {
    id: 35, name: "Chomba Piqué Lisa", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba de piqué lisa clásica. Colores neutros y vibrantes.",
    colors: ["Blanco", "Crudo", "Beige", "Melange", "Celeste", "Marino", "Oliva", "Petróleo", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1SJcTJqm7eDQQhcReg41pG774C4SnLZmO"
  },
  {
    id: 36, name: "Chomba Piqué Lisa Plus", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba de piqué lisa en talles grandes. Misma calidad, mayor amplitud.",
    colors: ["Blanco", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: "https://drive.google.com/drive/folders/17GgLeSQnmV3OOMIVGrPUCm2XewhipPn5"
  },
  {
    id: 37, name: "Chomba Piqué Penguin", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba piqué con detalle tipo penguin. Diseño clásico y deportivo.",
    colors: ["Blanco", "Beige", "Celeste", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1DK20_antntq4DDhPR6WtrdHHTcgN-YOH"
  },
  {
    id: 38, name: "Chomba Piqué Vivo", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba piqué con vivos en contraste. Diseño deportivo elegante.",
    colors: ["Blanco vivo marino", "Beige vivo negro", "Melange vivo blanco", "Marino vivo blanco", "Negro vivo blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1ncEtzgxrHAGSY83mBCuCV2ct-7VxRF-VGdhP".replace('7VxRF', '6famf7')
  },
  {
    id: 39, name: "Remera Deportiva", category: "HOMBRE", subcategory: "Remeras",
    description: "Remera deportiva técnica. Ideal para actividad física y uso casual.",
    colors: ["Blanco", "Gris", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/19bkr0lNHftz7nfY9AGvBlUvtzLmJsl0o"
  },
  {
    id: 40, name: "Remera Algodón", category: "HOMBRE", subcategory: "Remeras",
    description: "Remera de algodón lisa. Del S al 6XL para todos los talles.",
    colors: ["Blanco", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
    driveLink: "https://drive.google.com/drive/folders/1_duIAgMVikz_ik9-e-mSqKSN4XYFJecr"
  },
  {
    id: 41, name: "Pantalón Lino", category: "HOMBRE", subcategory: "Pantalones",
    description: "Pantalón de lino para hombre. Liviano, transpirable y elegante.",
    colors: ["Beige", "Oliva", "Gris Topo", "Gris", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1qJx8DJTUpncHSOJVM7tP96g2V-mGAHPW"
  },
  {
    id: 42, name: "Traje de Baño", category: "HOMBRE", subcategory: "Pantalones",
    description: "Traje de baño liso y surf. Colores actuales de la temporada.",
    colors: ["Beige", "Gris", "Petroleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: "https://drive.google.com/drive/folders/1-VcVfCvNXHHpCajrWZIEHOOIkXQaiB5l"
  },
  {
    id: 43, name: "Camisa", category: "HOMBRE", subcategory: "Camisas",
    description: "Camisa de hombre de verano. Liviana, clásica y fácil de combinar.",
    colors: ["Blanco", "Rosa", "Celeste", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  }
];

// -- PRODUCT IMAGES --------------------------------
// This list is generated from the files inside images/.
const productImagesById = {
  "1": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "2": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "3": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ],
  "4": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "5": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "6": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "7": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "8": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "9": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "10": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "11": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "12": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "13": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "14": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "15": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "16": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "17": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "18": [
    1,
    2,
    3,
    4,
    5
  ],
  "19": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "20": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "21": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "22": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11
  ],
  "23": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ],
  "24": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "25": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "26": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11
  ],
  "27": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "28": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ],
  "29": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "30": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ],
  "31": [
    1,
    2,
    3,
    4
  ],
  "32": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14
  ],
  "33": [
    1,
    2,
    3
  ],
  "34": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "35": [
    1,
    2,
    3,
    4,
    5,
    6,
    8,
    9,
    10,
    11,
    12,
    13
  ],
  "36": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ],
  "37": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11
  ],
  "38": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "39": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "40": [
    1,
    2,
    3,
    4,
    5
  ],
  "41": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "42": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13
  ],
  "43": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ]
};

function getProductImageSources(id) {
  return (productImagesById[String(id)] || []).map(photoNumber => `images/prod_${id}_${photoNumber}.jpg`);
}

// Para sumar productos nuevos rapido, copias este formato, cambias el id,
// nombre, categoria, colores, talles y despues agregas su curva en packagingByProductId.
const extraProducts = [];

products.push(...extraProducts);

// Fix a driveLink that was accidentally corrupted above
products[37].driveLink = "https://drive.google.com/drive/folders/1ncEtzgxrHAGSY83mBCuCV2ct-6famf7";


// -- PACKAGING / SIZE CURVES -----------------------
// Data extracted from the Verano 2027 DAMA and HOMBRE catalogs.
const packagingByProductId = {
  1: { totalPieces: 30, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Gris Melange", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  2: { totalPieces: 60, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Celeste", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Negro", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } }
  ] },
  3: { totalPieces: 60, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Celeste", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Amarillo", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Beige", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  4: { totalPieces: 40, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Gris Melange", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  5: { totalPieces: 40, rows: [
    { color: "Crudo", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Beige", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  6: { totalPieces: 40, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Lino", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  7: { totalPieces: 32, rows: [
    { color: "Crudo", sizePieces: { S: 4, M: 4, L: 4 } },
    { color: "Militar", sizePieces: { S: 2, M: 4, L: 4 } },
    { color: "Negro", sizePieces: { S: 2, M: 4, L: 4 } }
  ] },
  8: { totalPieces: 35, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 4, L: 4 } },
    { color: "Beige", sizePieces: { S: 2, M: 4, L: 4 } },
    { color: "Oliva", sizePieces: { S: 1, M: 2, L: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 4, L: 4 } }
  ] },
  9: { totalPieces: 35, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 4, L: 4 } },
    { color: "Beige", sizePieces: { S: 2, M: 4, L: 4 } },
    { color: "Oliva", sizePieces: { S: 1, M: 2, L: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 4, L: 4 } }
  ] },
  10: { totalPieces: 64, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } },
    { color: "Beige", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } },
    { color: "Oliva", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } }
  ] },
  11: { totalPieces: 30, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Crudo", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  12: { totalPieces: 25, rows: [
    { color: "Blanco", sizePieces: { S: 1, M: 1, L: 1, XL: 1 } },
    { color: "Marrón", sizePieces: { S: 4, M: 4, L: 4, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 2, XL: 1 } }
  ] },
  13: { totalPieces: 48, rows: [
    { color: "Blanco", sizePieces: { S: 3, M: 3, L: 3, XL: 3, XXL: 3 } },
    { color: "Crudo", sizePieces: { S: 3, M: 3, L: 3, XL: 3, XXL: 3 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 2, XL: 2, XXL: 1 } }
  ] },
  14: { totalPieces: 60, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } },
    { color: "Crudo", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 3, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } }
  ] },
  15: { totalPieces: 50, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Crudo", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  16: { totalPieces: 50, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Beige", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Oliva", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  17: { totalPieces: 20, rows: [
    { color: "Crudo", sizePieces: { S: 1, M: 1, L: 1, XL: 1 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 2, L: 1, XL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  18: { totalPieces: 40, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 6, L: 6, XL: 4 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  19: { totalPieces: 40, rows: [
    { color: "Estampa 1", sizePieces: { S: 6, M: 6, L: 3 } },
    { color: "Camel", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Estampa 2", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  20: { totalPieces: 30, rows: [
    { color: "Animal Print", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Chocolate", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  21: { totalPieces: 30, rows: [
    { color: "Estampado", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Rojo", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Chocolate", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  22: { totalPieces: 40, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Oliva", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Estampado", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Chocolate", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  23: { totalPieces: 30, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Crudo", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Estampa", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  24: { totalPieces: 30, rows: [
    { color: "Oliva", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Estampado", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  25: { totalPieces: 40, rows: [
    { color: "Estampado", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Camel", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Marino", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  26: { totalPieces: 30, rows: [
    { color: "Estampa 1", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Estampa 2", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Camel", sizePieces: { S: 2, M: 2, L: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 1 } }
  ] },
  27: { totalPieces: 40, rows: [
    { color: "Crudo", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Blanco", sizePieces: { S: 5, M: 6, L: 5, XL: 4 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  28: { totalPieces: 40, rows: [
    { color: "Crudo", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Beige", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } }
  ] },
  29: { totalPieces: 30, rows: [
    { color: "Estampa 1", sizePieces: { M: 15} },
    { color: "Estampa 2", sizePieces: { M: 15 } }
  ] },
  30: { totalPieces: 30, rows: [
    { color: "Crudo", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Estampa", sizePieces: { S: 4, M: 4, L: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 2 } }
  ] },
  31: { totalPieces: 24, rows: [
    { color: "Estampa 1", sizePieces: { S: 1, M: 2, L: 3, XL: 2 } },
    { color: "Estampa 2", sizePieces: { S: 1, M: 2, L: 3, XL: 2 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2 } }
  ] },
  32: { totalPieces: 42, totalLabel: "42 piezas por color", rows: [
    { color: "Oliva", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Khaki", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Gris Oscuro", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Marrón", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Blanco", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Gris", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Negro", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Crudo", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } },
    { color: "Beige", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 } }
  ] },
  33: { totalPieces: 24, totalLabel: "24 piezas por color", rows: [
    { color: "Blanco", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Beige", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Gris", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Gris Verdoso", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Celeste", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Marino", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } }
  ] },
  34: { totalPieces: 72, rows: [
    { color: "Blanco", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Melange", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Petróleo", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Marino", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Negro", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } }
  ] },
  35: { totalPieces: 100, rows: [
    { color: "Blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Crudo", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Beige", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Melange", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Celeste", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Marino", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Oliva", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Petróleo", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } }
  ] },
  36: { totalPieces: 72, rows: [
    { color: "Blanco", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Melange", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Petróleo", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Marino", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } },
    { color: "Negro", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 } }
  ] },
  37: { totalPieces: 75, rows: [
    { color: "Blanco vivo marino", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Beige vivo negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Celeste vivo negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Melange vivo blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Petróleo vivo blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Marino vivo gris", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro vivo blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } }
  ] },
  38: { totalPieces: 60, rows: [
    { color: "Blanco vivo marino", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Beige vivo negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Melange vivo blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Marino vivo blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro vivo gris", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro vivo blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } }
  ] },
  39: { totalPieces: 48, totalLabel: "48 piezas por color", rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Gris", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Marino", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } }
  ] },
  40: { totalPieces: 90, totalLabel: "90 piezas por color", rows: [
    { color: "Blanco", curveText: "S al 6XL por talle" },
    { color: "Negro", curveText: "S al 6XL por talle" }
  ] },
  41: { totalPieces: 48, totalLabel: "48 piezas por color", rows: [
    { color: "Beige", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 } },
    { color: "Oliva", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 } },
    { color: "Gris Topo", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 } },
    { color: "Gris", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 } },
    { color: "Gris Claro", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 } },
    { color: "Negro", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 } }
  ] },
  42: { totalPieces: 72, rows: [
    { color: "Beige", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Gris", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Petróleo", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Marino", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 6, XL: 6, XXL: 4 } }
  ] },
  43: { totalPieces: 48, totalLabel: "48 piezas por color", rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Rosa", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Celeste", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Marino", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } }
  ] }
};

function applyCatalogData() {
  products.forEach(product => {
    product.collection = product.collection || "verano-2027";
    product.isHidden = HIDDEN_PRODUCT_IDS.includes(product.id);
    product.inStock = !OUT_OF_STOCK_PRODUCT_IDS.includes(product.id);
    const packaging = packagingByProductId[product.id];
    if (!packaging) return;
    product.packaging = packaging;
    product.colors = [...new Set(packaging.rows.map(row => row.color))];
    product.sizes = getPackagingSizes(packaging);
  });
}

function getPackagingSizes(packaging) {
  const sizes = [];
  packaging.rows.forEach(row => {
    Object.keys(row.sizePieces || {}).forEach(size => {
      if (!sizes.includes(size)) sizes.push(size);
    });
  });
  return sizes.length ? sizes : ["Ver curva"];
}

function getTotalPiecesLabel(product) {
  if (!product.packaging) return "Sin dato";
  return product.packaging.totalLabel || `${product.packaging.totalPieces} piezas`;
}

function formatCurve(row) {
  if (row.curveText) return row.curveText;
  return Object.entries(row.sizePieces || {})
    .map(([size, pieces]) => `${size}/${pieces}`)
    .join(" - ");
}

function getActiveCollection() {
  return collections.find(collection => collection.id === activeCollection) || collections[0];
}

function getCollectionProducts() {
  return products.filter(product => product.collection === activeCollection && !product.isHidden);
}

function getStockLabel(product) {
  return product.inStock ? "En stock" : "Sin stock";
}

function buildCollectionFilters() {
  const collectionFilters = document.getElementById("collection-filters");
  if (!collectionFilters) return;
  collectionFilters.innerHTML = collections.map(collection => `
    <button class="pill ${collection.id === activeCollection ? "active" : ""}" data-filter="collection" data-value="${collection.id}">
      ${collection.name}
    </button>
  `).join("");
}

function renderPackagingTable(product) {
  const wrap = document.getElementById("modal-packaging");
  if (!wrap) return;

  if (!product.packaging) {
    wrap.innerHTML = "";
    return;
  }

  const rows = product.packaging.rows.map(row => `
    <tr>
      <td>${row.color}</td>
      <td>${formatCurve(row)}</td>
      <td>${Object.values(row.sizePieces || {}).reduce((sum, value) => sum + Number(value || 0), 0) || row.curveText || "-"}</td>
    </tr>
  `).join("");

  wrap.innerHTML = `
    <div class="packaging-summary">
      <span>Piezas totales</span>
      <strong>${getTotalPiecesLabel(product)}</strong>
    </div>
    <div class="packaging-table-wrap">
      <table class="packaging-table">
        <thead>
          <tr>
            <th>Color</th>
            <th>Curva de talles</th>
            <th>Piezas</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

applyCatalogData();


// ── STATE ────────────────────────────────────────
let cart = [];
let activeCollection = 'verano-2027';
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
  buildCollectionFilters();
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

  const cats = [...new Set(getCollectionProducts().map(p => p.subcategory))].sort();
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
    getCollectionProducts()
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
  return getCollectionProducts().filter(p => {
    const genderOk = activeGender === 'all' || p.category === activeGender;
    const catOk = activeCategory === 'all' || p.subcategory === activeCategory;
    return genderOk && catOk;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  resetProductImageObserver();
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
    card.className = 'product-card' + (p.inStock ? '' : ' out-of-stock');
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="card-img-wrap">
        <span class="card-badge-gender">${p.category === 'MUJER' ? 'Mujer' : 'Hombre'}</span>
        ${p.inStock ? '' : `<span class="card-badge-stock">Sin stock</span>`}
        <img class="card-img" src="" alt="${p.name}" loading="lazy" decoding="async" style="display:none;width:100%;height:100%;object-fit:cover;" />
        <div class="card-placeholder" id="ph-${p.id}">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
          </svg>
          <span class="placeholder-name">${p.name}</span>
        </div>
        <button class="card-add ${inCart ? 'added' : ''}" data-id="${p.id}" aria-label="Agregar al carrito" ${p.inStock ? '' : 'disabled'}>
          ${inCart
            ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
            : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
          }
        </button>
      </div>
      <div class="card-info">
        <p class="card-subcat">${p.subcategory}</p>
        <p class="card-name">${p.name}</p>
        ${p.driveLink ? `<a class="card-drive" href="${p.driveLink}" target="_blank" onclick="event.stopPropagation()">Ver fotos →</a>` : ""}
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

    queueProductImage(
      p.id,
      card.querySelector('.card-img'),
      card.querySelector(`#ph-${p.id}`),
      card.querySelector('.card-img-wrap')
    );
  });
}

// ── IMAGE LOADER ─────────────────────────────────
let productImageObserver = null;
let queuedProductImages = new Map();

function resetProductImageObserver() {
  if (productImageObserver) {
    productImageObserver.disconnect();
    productImageObserver = null;
  }
  queuedProductImages.clear();
}

function getProductImageObserver() {
  if (!('IntersectionObserver' in window)) return null;
  if (!productImageObserver) {
    productImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const targetEl = entry.target;
        observer.unobserve(targetEl);
        const id = parseInt(targetEl.dataset.productId, 10);
        if (!id) return;
        const queued = queuedProductImages.get(id);
        if (!queued) return;
        queuedProductImages.delete(id);
        loadProductImage(id, queued.imgEl, queued.placeholderEl);
      });
    }, { rootMargin: '500px 0px' });
  }
  return productImageObserver;
}

function queueProductImage(id, imgEl, placeholderEl, observeEl) {
  if (!imgEl) return;
  const observer = getProductImageObserver();
  if (observer && observeEl) {
    observeEl.dataset.productId = String(id);
    queuedProductImages.set(id, { imgEl, placeholderEl });
    observer.observe(observeEl);
    return;
  }
  loadProductImage(id, imgEl, placeholderEl);
}

function loadProductImage(id, imgEl, placeholderEl) {
  const [src] = getProductImageSources(id);
  if (!src) return;
  const tester = new Image();
  tester.onload = () => {
    imgEl.src = src;
    imgEl.style.display = 'block';
    if (placeholderEl) placeholderEl.style.display = 'none';
  };
  tester.src = src;
}

// ── MODAL ────────────────────────────────────────
function openModal(p) {
  currentModalProduct = p;
  const inCart = cart.some(c => c.id === p.id);

  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-gender').textContent = p.category === 'MUJER' ? 'Mujer' : 'Hombre';
  document.getElementById('modal-subcat').textContent = p.subcategory;
  document.getElementById('modal-collection').textContent = `${getActiveCollection().name.toUpperCase()} · ${getStockLabel(p).toUpperCase()}`;
  document.getElementById('modal-desc').textContent = p.description;

  // Colors
  const colorsEl = document.getElementById('modal-colors');
  colorsEl.innerHTML = p.colors.map(c => `<span class="color-chip">${c}</span>`).join('');

  // Sizes
  const sizesEl = document.getElementById('modal-sizes');
  sizesEl.innerHTML = p.sizes.map(s => `<span class="size-chip">${s}</span>`).join('');

  // Packaging / curve
  renderPackagingTable(p);

  // Drive link
  const modalDriveWrap = document.getElementById('modal-drive-wrap');
  const modalDriveLink = document.getElementById('modal-drive-link');
  modalDriveWrap.style.display = p.driveLink ? '' : 'none';
  modalDriveLink.href = p.driveLink || '#';

  // Load modal image from local folder
  const modalImg = document.getElementById('modal-img');
  const modalImgWrap = document.querySelector('.modal-image-wrap');
  modalImg.style.display = 'none';
  modalImg.alt = p.name;

  // Remove old gallery dots if any
  const oldDots = modalImgWrap.querySelector('.modal-gallery-dots');
  if (oldDots) oldDots.remove();

  // Build gallery without blocking the modal opening.
  const gallerySrcs = getProductImageSources(p.id);
  let galleryIdx = 0;
  let dots = null;
  modalImg.onclick = null;
  modalImg.style.cursor = '';

  function updateDots() {
    if (!dots) return;
    dots.querySelectorAll('.gallery-dot').forEach((dot, di) => {
      dot.classList.toggle('active', di === galleryIdx);
    });
  }

  function preloadNextImage() {
    if (gallerySrcs.length < 2) return;
    const nextIdx = (galleryIdx + 1) % gallerySrcs.length;
    const preload = new Image();
    preload.src = gallerySrcs[nextIdx];
  }

  function showGalleryImage(index) {
    if (!gallerySrcs.length) return;
    galleryIdx = index;
    modalImg.style.display = 'none';
    modalImg.onload = () => {
      modalImg.style.display = 'block';
      preloadNextImage();
    };
    modalImg.src = gallerySrcs[galleryIdx];
    updateDots();
  }

  if (gallerySrcs.length > 1) {
    dots = document.createElement('div');
    dots.className = 'modal-gallery-dots';
    gallerySrcs.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        showGalleryImage(i);
      });
      dots.appendChild(d);
    });
    modalImgWrap.appendChild(dots);

    modalImg.style.cursor = 'pointer';
    modalImg.onclick = (e) => {
      e.stopPropagation();
      showGalleryImage((galleryIdx + 1) % gallerySrcs.length);
    };
  }

  showGalleryImage(0);

  const addBtn = document.getElementById('modal-add-btn');
  addBtn.disabled = !p.inStock;
  addBtn.textContent = !p.inStock ? 'Fuera de stock' : (inCart ? '✓ En tu selección' : 'Agregar a la selección');
  addBtn.className = 'btn-add-modal' + (inCart ? ' in-cart' : '') + (p.inStock ? '' : ' disabled');

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
  if (!product.inStock) {
    showToast(`"${product.name}" está fuera de stock`);
    return;
  }
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
    addBtn.disabled = !currentModalProduct.inStock;
    addBtn.textContent = !currentModalProduct.inStock ? 'Fuera de stock' : (inCart ? '✓ En tu selección' : 'Agregar a la selección');
    addBtn.className = 'btn-add-modal' + (inCart ? ' in-cart' : '') + (currentModalProduct.inStock ? '' : ' disabled');
  }
}

function updateCardStates() {
  document.querySelectorAll('.card-add').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const product = products.find(p => p.id === id);
    const inCart = cart.some(c => c.id === id);
    btn.disabled = product ? !product.inStock : false;
    btn.classList.toggle('added', inCart);
    btn.innerHTML = inCart
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  });
}

// ── WHATSAPP ─────────────────────────────────────
function sendWhatsApp() {
  if (cart.length === 0) { showToast('Tu selección está vacía'); return; }

  const collection = getActiveCollection();
  const lines = [`*Mi selección — BYE BYE ${collection.name}*`, ''];
  cart.forEach((p, i) => {
    lines.push(`${i + 1}. *${p.name}*`);
    lines.push(`   Categoría: ${p.subcategory} | ${p.category === 'MUJER' ? 'Mujer' : 'Hombre'}`);
    lines.push(`   Colores disponibles: ${p.colors.join(', ')}`);
    lines.push(`   Piezas por caja: ${getTotalPiecesLabel(p)}`);
    lines.push('');
  });
  lines.push(`Total prendas seleccionadas: ${cart.length}`);
  lines.push('');
  lines.push('¡Hola! Quisiera pedir cotizacion de estas prendas.');

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
  const collection = getActiveCollection();
  doc.text(`CATÁLOGO ${collection.name.toUpperCase()}`, pageW - margin, 10, { align: 'right' });
  doc.setTextColor(180, 180, 180);
  doc.text(collection.tagline, pageW - margin, 17, { align: 'right' });

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

    // Total pieces
    doc.setTextColor(150, 100, 50);
    doc.text('Piezas por caja: ', margin + 12, y);
    doc.setTextColor(60, 60, 60);
    doc.text(getTotalPiecesLabel(p), margin + 42, y);
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
    doc.text(`BYE BYE — Catálogo ${collection.name}`, margin, 292);
    doc.text(`Pág. ${pg} / ${totalPages}`, pageW - margin, 292, { align: 'right' });
  }

  doc.save(`ByeBye_Seleccion_${collection.name.replace(/\s+/g, '')}.pdf`);
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

  // Collection filters
  const collectionFilters = document.getElementById('collection-filters');
  if (collectionFilters) {
    collectionFilters.addEventListener('click', e => {
      const btn = e.target.closest('.pill');
      if (!btn) return;
      activeCollection = btn.dataset.value;
      collectionFilters.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b === btn));
      activeGender = 'all';
      activeCategory = 'all';
      genderFilters.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b.dataset.value === 'all'));
      categoryFilters.innerHTML = '';
      buildCategoryFilters();
      renderProducts();
    });
  }

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
