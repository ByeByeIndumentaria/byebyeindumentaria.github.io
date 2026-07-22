/* ================================================
   BYE BYE — Catálogo Verano 2027
   script.js — Catalog, Cart, PDF, WhatsApp
   ================================================ */

// ── PRODUCT DATA ────────────────────────────────
// -- COLLECTIONS ----------------------------------
const collections = [
  { id: "verano-2027", name: "Verano 2027", label: "SS 2027", tagline: "Made for summer." },
  { id: "invierno-2027", name: "Invierno", label: "FW 2027", tagline: "Abrigos y prendas de invierno." }
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
    driveLink: ""
  },
  {
    id: 2, name: "Remera Broderie", category: "MUJER", subcategory: "Remeras",
    description: "Remera con detalle bordado tipo broderie. Diseño delicado y femenino.",
    colors: ["Blanco", "Celeste", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 3, name: "Remera Puntilla", category: "MUJER", subcategory: "Remeras",
    description: "Remera con encaje de puntilla, combinación de textura y feminidad.",
    colors: ["Blanco", "Celeste", "Amarillo", "Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 4, name: "Chomba Algodón", category: "MUJER", subcategory: "Remeras",
    description: "Chomba de algodón clásica, fresca y versátil para el verano.",
    colors: ["Blanco", "Melange", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 5, name: "Chomba Tejida", category: "MUJER", subcategory: "Remeras",
    description: "Chomba de tejido artesanal con textura natural y elegante.",
    colors: ["Crudo", "Beige", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 6, name: "Set Lino", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto en lino premium. Liviano, transpirable y de líneas limpias.",
    colors: ["Blanco", "Lino", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 7, name: "Vestido Camisero", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido camisero de corte relajado. Estilo atemporal para el verano.",
    colors: ["Crudo", "Militar", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 8, name: "Chaleco Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Chaleco de lino parte del conjunto coordinado. Corte sastrero.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 9, name: "Pantalón Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Pantalón de lino para combinar con el chaleco del conjunto.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 10, name: "Chaleco Sastrero", category: "MUJER", subcategory: "Conjuntos",
    description: "Chaleco de estilo sastrero. Elegante y estructurado.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 11, name: "Musculosa Arandelas", category: "MUJER", subcategory: "Remeras",
    description: "Musculosa con detalle de arandelas. Casual y femenina.",
    colors: ["Blanco", "Crudo", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 12, name: "Enterito Cinto", category: "MUJER", subcategory: "Monos",
    description: "Enterito con cinto ajustable. Prenda única muy versátil.",
    colors: ["Blanco", "Marrón", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 13, name: "Camisa Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Camisa de lino parte del conjunto con jogger. Corte relajado.",
    colors: ["Blanco", "Crudo", "Khaki", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 14, name: "Jogger Lino Conjunto", category: "MUJER", subcategory: "Conjuntos",
    description: "Jogger de lino para combinar con la camisa del conjunto.",
    colors: ["Blanco", "Crudo", "Caqui", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 15, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Pantalones",
    description: "Pantalón de corte sastrero. Líneas limpias y modernas.",
    colors: ["Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 16, name: "Short Brezo", category: "MUJER", subcategory: "Pantalones",
    description: "Short fresco ideal para los días de calor.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 17, name: "Enterito Escote V", category: "MUJER", subcategory: "Monos",
    description: "Enterito con escote en V, estilizado y moderno.",
    colors: ["Estampa 1", "Beige", "Estampa 2", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 18, name: "Pantalón Broderie", category: "MUJER", subcategory: "Pantalones",
    description: "Pantalón con detalle bordado tipo broderie.",
    colors: ["Blanco", "Celeste", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 19, name: "Vestido Gasa", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido en gasa liviana. Fluido y romántico para el verano.",
    colors: ["Estampa 1", "Estampa 2", "Camel", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 20, name: "Vestido Gasa Largo", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido largo en gasa, ideal para eventos o salidas nocturnas.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 21, name: "Vestido Gasa Corto", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido corto en gasa para looks veraniegos.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 22, name: "Vestido Nudo", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido con detalle de nudo. Ajuste perfecto y estilo definido.",
    colors: ["Blanco", "Rojo", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 23, name: "Vestido Básico", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido básico esencial. Corte limpio y atemporal.",
    colors: ["Blanco", "Negro", "Varios"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 24, name: "Vestido Camisero Largo", category: "MUJER", subcategory: "Vestidos",
    description: "Versión larga del vestido camisero. Ideal para el día a día.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 25, name: "Vestido Camisero Corto", category: "MUJER", subcategory: "Vestidos",
    description: "Versión corta del vestido camisero. Fresco y fácil de combinar.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 26, name: "Set Lino Estampado", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto de lino con estampados originales de la temporada.",
    colors: ["Estampa 1", "Estampa 2", "Camel", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 27, name: "Musculosa Nudo", category: "MUJER", subcategory: "Remeras",
    description: "Musculosa con nudo frontal. Casual y femenina para el verano.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 28, name: "Vestido Escote V", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido con escote en V profundo. Elegante y sensual.",
    colors: ["Blanco", "Rojo", "Chocolate", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 29, name: "Vestido Túnica", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido tipo túnica, cómodo y amplio para el calor.",
    colors: ["Estampa 1", "Estampa 2"],
    sizes: ["M"],
    driveLink: ""
  },
  {
    id: 30, name: "Vestido Trenza", category: "MUJER", subcategory: "Vestidos",
    description: "Vestido con detalle de trenza. Acabado artesanal y único.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 31, name: "Set Estampado", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto con estampados de temporada. Diseño fresco y moderno.",
    colors: ["Varios estampados"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },

  // ── HOMBRE ──
  {
    id: 32, name: "Bermuda Lino", category: "HOMBRE", subcategory: "Pantalones",
    description: "Bermuda de lino premium para el verano. Cómoda y sofisticada.",
    colors: ["Oliva", "Khaki", "Gris Oscuro", "Marrón", "Blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 33, name: "Camisa Lino", category: "HOMBRE", subcategory: "Camisas",
    description: "Camisa de lino con caída natural. Ideal para looks casuales o formales.",
    colors: ["Blanco", "Beige", "Gris", "Gris Verdoso", "Celeste"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 34, name: "Chomba Jersey Lisa Plus", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba de jersey lisa en talles grandes. Premium comfort.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: ""
  },
  {
    id: 35, name: "Chomba Piqué Lisa", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba de piqué lisa clásica. Colores neutros y vibrantes.",
    colors: ["Blanco", "Crudo", "Beige", "Melange", "Celeste", "Marino", "Oliva", "Petróleo", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 36, name: "Chomba Piqué Lisa Plus", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba de piqué lisa en talles grandes. Misma calidad, mayor amplitud.",
    colors: ["Blanco", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: ""
  },
  {
    id: 37, name: "Chomba Piqué Penguin", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba piqué con detalle tipo penguin. Diseño clásico y deportivo.",
    colors: ["Blanco", "Beige", "Celeste", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 38, name: "Chomba Piqué Vivo", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba piqué con vivos en contraste. Diseño deportivo elegante.",
    colors: ["Blanco vivo marino", "Beige vivo negro", "Melange vivo blanco", "Marino vivo blanco", "Negro vivo blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 39, name: "Remera Deportiva", category: "HOMBRE", subcategory: "Remeras",
    description: "Remera deportiva técnica. Ideal para actividad física y uso casual.",
    colors: ["Blanco", "Gris", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 40, name: "Remera Algodón", category: "HOMBRE", subcategory: "Remeras",
    description: "Remera de algodón lisa. Del S al 6XL para todos los talles.",
    colors: ["Blanco", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
    driveLink: ""
  },
  {
    id: 41, name: "Pantalón Lino", category: "HOMBRE", subcategory: "Pantalones",
    description: "Pantalón de lino para hombre. Liviano, transpirable y elegante.",
    colors: ["Beige", "Oliva", "Gris Topo", "Gris", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 42, name: "Traje de Baño", category: "HOMBRE", subcategory: "Pantalones",
    description: "Traje de baño liso y surf. Colores actuales de la temporada.",
    colors: ["Beige", "Gris", "Petroleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 43, name: "Camisa", category: "HOMBRE", subcategory: "Camisas",
    description: "Camisa de hombre de verano. Liviana, clásica y fácil de combinar.",
    colors: ["Blanco", "Rosa", "Celeste", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 44, name: "Traje de baño surf", category: "HOMBRE", subcategory: "Pantalones",
    description: "Traje de baño surf para hombre. Liviano, fresco y listo para el verano.",
    colors: ["Beige", "Gris", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 45, name: "Chomba Jersey Lisa", category: "HOMBRE", subcategory: "Remeras",
    description: "Chomba jersey lisa para hombre. Básica, cómoda y versátil.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 46, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Pantalones",
    description: "Pantalón sastrero de mujer. Clásico, amplio y fácil de combinar.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
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
    4,
    5,
    6
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
    10
  ],
  "43": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "44": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "45": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "46": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "47": [
    1,
    2,
    3,
    4,
    5
  ],
  "48": [
    1,
    2,
    3,
    4,
    5
  ],
  "49": [
    1,
    2,
    3,
    4,
    5
  ],
  "50": [
    1,
    2,
    3,
    4
  ],
  "51": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "52": [
    1
  ],
  "53": [
    1,
    2,
    3,
    4,
    5
  ],
  "54": [
    1,
    2,
    3
  ],
  "56": [
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
  "58": [
    1,
    2,
    3,
    4,
    5
  ],
  "59": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "60": [
    1
  ],
  "61": [
    1,
    2,
    3,
    4
  ],
  "62": [
    1,
    2,
    3,
    4,
    5
  ],
  "63": [
    1,
    2,
    3,
    4
  ],
  "64": [
    1,
    2,
    3,
    4,
    5
  ],
  "65": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "66": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "68": [
    1
  ]
};

function getProductImagePhotoNumbers(id) {
  return productImagesById[String(id)] || [];
}

function getProductImageSources(id) {
  return getProductImagePhotoNumbers(id).map(photoNumber => `images/prod_${id}_${photoNumber}.jpg`);
}

// Foto principal por color. El numero corresponde a prod_ID_NUMERO.jpg.
const colorImageByProductId = {
  1: { "Blanco": 6, "Gris Melange": 7, "Negro": 8 },
  2: { "Blanco": 4, "Celeste": 5, "Negro": 6 },
  3: { "Beige": 6, "Amarillo": 7, "Blanco": 8, "Celeste": 9, "Negro": 10 },
  4: { "Blanco": 6, "Gris Melange": 7, "Negro": 8 },
  5: { "Beige": 5, "Negro": 6, "Crudo": 7, "Chocolate": 8 },
  6: { "Lino": 5, "Chocolate": 6, "Blanco": 7, "Negro": 8 },
  7: { "Crudo": 5, "Blanco": 6, "Militar": 7, "Negro": 8 },
  8: { "Negro": 5, "Beige": 6, "Oliva": 7, "Verde": 7, "Blanco": 8 },
  9: { "Beige": 5, "Negro": 6, "Oliva": 7, "Blanco": 8 },
  10: { "Negro": 4, "Blanco": 5, "Oliva": 6, "Beige": 7, "Chocolate": 8 },
  11: { "Negro": 4, "Crudo": 5, "Blanco": 6 },
  12: { "Marrón": 4, "Marron": 4, "Negro": 5, "Blanco": 6 },
  13: { "Negro": 5, "Chocolate": 6, "Blanco": 7, "Crudo": 8 },
  14: { "Negro": 5, "Blanco": 6, "Crudo": 7, "Chocolate": 8 },
  15: { "Crudo": 4, "Blanco": 5, "Negro": 6 },
  16: { "Negro": 4, "Beige": 5, "Blanco": 6, "Oliva": 7, "Chocolate": 8 },
  17: { "Negro": 4, "Chocolate": 5, "Crudo": 6 },
  18: { "Blanco": 4, "Negro": 5 },
  19: { "Camel": 6, "Negro": 7, "Estampa 1": 8, "Estampa 2": 9 },
  20: { "Animal Print": 6, "Anima Print": 6, "Negro": 7, "Chocolate": 8 },
  21: { "Estampado": 3, "Chocolate": 4, "Negro": 5, "Rojo": 6 },
  22: { "Estampado": 7, "Blanco": 8, "Negro": 9, "Chocolate": 10, "Oliva": 11 },
  23: { "Crudo": 7, "Blanco": 8, "Negro": 9, "Estampa": 10 },
  24: { "Estampado": 7, "Estampa": 7, "Negro": 8, "Oliva": 9 },
  25: { "Marino": 3, "Negro": 4, "Estampado": 5, "Estampa": 5, "Camel": 6 },
  26: { "Estampa 1": 8, "Estampa 2": 9, "Camel": 10, "Negro": 11 },
  27: { "Blanco": 5, "Negro": 6, "Crudo": 7 },
  28: { "Rojo": 7, "Negro": 8, "Chocolate": 9, "Blanco": 10 },
  29: { "Estampa 1": 8, "Estampa 2": 9 },
  30: { "Estampa": 8, "Negro": 9, "Crudo": 10 },
  31: { "Estampa 1": 4, "Estampa 2": 5, "Negro": 6 },
  32: { "Oliva": 5, "Beige": 6, "Crudo": 7, "Negro": 8, "Oliva Oscuro": 9, "Oliva oscuro": 9, "Gris": 10, "Blanco": 11, "Marrón": 12, "Marron": 12, "Gris Oscuro": 13, "Gris oscuro": 13, "Khaki": 14, "Caqui": 14 },
  33: { "Marino": 3, "Blanco": 4, "Gris": 5, "Gris Claro": 5, "Gris claro": 5, "Gris Verdoso": 6, "Verde, petróleo": 6, "Petróleo": 6, "Negro": 7 },
  35: { "Oliva": 4, "Negro": 5, "Marino": 6, "Beige": 8, "Celeste": 9, "Blanco": 10, "Petróleo": 11, "Melange": 12, "Crudo": 13 },
  36: { "Petróleo": 6, "Melange": 7, "Blanco": 8, "Negro": 9, "Marino": 10 },
  37: { "Beige vivo negro": 4, "Blanco vivo marino": 5, "Celeste vivo negro": 6, "Melange vivo blanco": 7, "Petróleo vivo blanco": 8, "Marino vivo gris": 9, "Marino vivo blanco": 9, "Negro vivo gris": 10, "Negro vivo blanco": 11 },
  38: { "Blanco vivo marino": 4, "Beige vivo negro": 5, "Melange vivo blanco": 6, "Marino vivo blanco": 7, "Negro vivo blanco": 8, "Negro vivo gris": 9 },
  39: { "Blanco": 4, "Gris": 5, "Marino": 6, "Negro": 7 },
  40: { "Blanco": 4, "Negro": 5 },
  41: { "Negro": 4, "Gris Claro": 5, "Gris claro": 5, "Gris": 6, "Gris Oscuro": 6, "Gris oscuro": 6, "Gris Topo": 7, "Gris topo": 7, "Oliva": 8, "Beige": 9 },
  42: { "Chocolate": 4, "Beige": 5, "Gris": 6, "Celeste": 7, "Petróleo": 8, "Marino": 9, "Negro": 10 },
  43: { "Celeste": 3, "Blanco": 4, "Rosa": 5, "Negro": 6, "Marino": 7 },
  44: { "Negro": 4, "Marino": 5, "Petróleo": 6, "Gris": 7, "Beige": 8 },
  45: { "Negro": 3, "Marino": 4, "Azul marino": 4, "Blanco": 5, "Beige": 6, "Melange": 7, "Gris": 7, "Celeste": 7, "Petróleo": 8 },
  46: { "Negro": 3, "Blanco": 4, "Beige": 5, "Chocolate": 6, "Oliva": 7 },
  47: { "Beige": 1 },
  48: { "Negro": 1 },
  49: { "Blanco": 1 },
  50: { "Negro": 1 },
  51: { "Negro": 1 },
  52: { "Negro": 1, "Negro melange": 1, "Melange oscuro": 1, "Melange": 1 },
  53: { "Negro": 1 },
  54: { "Camel": 1 },
  56: { "Marrón": 1 },
  58: { "Ocre": 1 },
  59: { "Negro": 1 },
  60: { "Rosa": 1 },
  61: { "Chocolate": 1 },
  62: { "Negro": 1 },
  63: { "Negro": 1 },
  64: { "Negro": 1 },
  65: { "Negro": 1 },
  66: { "Iced Coffee": 1 },
  68: { "Beige/Oliva": 1, "Oliva": 1, "Beige": 1 }
};

function normalizeColorName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function getColorPhotoNumber(product, color) {
  const customMap = colorImageByProductId[product.id] || {};
  if (customMap[color]) return customMap[color];

  const normalizedColor = normalizeColorName(color);
  const matchingEntry = Object.entries(customMap).find(([mappedColor]) => {
    return normalizeColorName(mappedColor) === normalizedColor;
  });

  return matchingEntry ? matchingEntry[1] : null;
}

function getColorGalleryIndex(product, colorIndex, galleryLength) {
  const color = product.colors[colorIndex];
  const customPhotoNumber = getColorPhotoNumber(product, color);

  if (!customPhotoNumber) return null;

  const mappedIndex = getProductImagePhotoNumbers(product.id).indexOf(Number(customPhotoNumber));
  return mappedIndex >= 0 && mappedIndex < galleryLength ? mappedIndex : null;
}

// Para sumar productos nuevos rapido, copias este formato, cambias el id,
// nombre, categoria, colores, talles y despues agregas su curva en packagingByProductId.
const extraProducts = [
  {
    id: 47, name: "Barzio", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de invierno para hombre. Abrigada, versátil y preparada para bajas temperaturas.",
    colors: ["Negro", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 48, name: "Merano", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera larga de invierno para hombre. Diseño abrigado y urbano.",
    colors: ["Negro", "Marino"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 49, name: "Saluzzo", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de invierno para hombre con capucha. Abrigada y de uso diario.",
    colors: ["Blanco", "Negro", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 50, name: "Acuto Sanwich", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera inflable de invierno para hombre. Liviana, cómoda y abrigada.",
    colors: ["Negro", "Camel", "Caqui", "Chocolate"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 51, name: "Taft", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera liviana de invierno para hombre. Disponible en colores clásicos.",
    colors: ["Negro", "Marino"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 52, name: "Harold", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de paño para hombre. Diseño con capucha y combinaciones de invierno.",
    colors: ["Negro", "Negro melange", "Melange oscuro", "Melange", "Caqui"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 53, name: "Bulciago", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de cuero para hombre. Clásica, sobria y de abrigo liviano.",
    colors: ["Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 54, name: "Ailano", category: "HOMBRE", subcategory: "Abrigos",
    description: "Trench de invierno para hombre. Corte clásico con cinturón.",
    colors: ["Negro", "Beige", "Camel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 55, name: "Leonel", category: "HOMBRE", subcategory: "Abrigos",
    description: "Tapado de invierno para hombre con capucha. Abrigado y elegante.",
    colors: ["Melange", "Negro", "Melange oscuro", "Caqui"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 56, name: "Juan", category: "HOMBRE", subcategory: "Abrigos",
    description: "Tapado de invierno para hombre. Silueta larga y colores neutros.",
    colors: ["Negro", "Marrón", "Gris"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 57, name: "Felipe Fur Plus", category: "HOMBRE", subcategory: "Abrigos Plus",
    description: "Campera plus size de invierno para hombre. Abrigada y cómoda.",
    colors: ["Negro", "Azul oscuro"],
    sizes: ["5XL", "6XL", "7XL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 58, name: "Lola", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Abrigada, cómoda y de uso diario.",
    colors: ["Negro", "Ocre"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 59, name: "Clara", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Silueta abrigada con colores neutros.",
    colors: ["Negro", "Chocolate", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 60, name: "Civita", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer con capucha. Abrigada y versátil.",
    colors: ["Negro", "Beige", "Camel", "Rosa"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 61, name: "Ana", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Diseño corto con estilo urbano.",
    colors: ["Chocolate", "Camel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 62, name: "Polesella", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Diseño clásico en cuero y tonos oscuros.",
    colors: ["Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 63, name: "Micaela", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Abrigo corto en tonos neutros.",
    colors: ["Negro", "Gris", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 64, name: "Liberti", category: "MUJER", subcategory: "Abrigos",
    description: "Tapado de invierno para mujer. Silueta larga y colores combinables.",
    colors: ["Negro", "Arena", "Melange", "Caqui"],
    sizes: ["S", "M", "L", "XL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 65, name: "Dunst Long Castana", category: "MUJER", subcategory: "Abrigos",
    description: "Tapado largo de invierno para mujer. Abrigado, elegante y de uso diario.",
    colors: ["Negro", "Arena", "Melange", "Caqui"],
    sizes: ["S", "M", "L", "XL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 66, name: "Elena", category: "MUJER", subcategory: "Abrigos",
    description: "Piloto de invierno para mujer. Disponible en tonos clásicos de temporada.",
    colors: ["Negro", "Iced Coffee"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 67, name: "Accadia", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer con capucha. Cómoda y abrigada.",
    colors: ["Beige/Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 68, name: "Tonara", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Disponible en beige, militar y negro.",
    colors: ["Beige/Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "invierno-2027",
    driveLink: ""
  }
];

products.push(...extraProducts);


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
    { color: "Blanco", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
    { color: "Rojo", sizePieces: { S: 2, M: 3, L: 3, XL: 2 } },
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
  32: { totalPieces: 378, rows: [
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
  33: { totalPieces: 168, rows: [
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
  39: { totalPieces: 192, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Gris", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Marino", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } }
  ] },
  40: { totalPieces: 180, rows: [
    { color: "Blanco", curveText: "S al 6XL por talle" },
    { color: "Negro", curveText: "S al 6XL por talle" }
  ] },
  41: { totalPieces: 288, rows: [
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
  43: { totalPieces: 240, rows: [
    { color: "Blanco", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Rosa", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Celeste", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Marino", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } }
  ] },
  44: { totalPieces: 60, rows: [
    { color: "Beige", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Gris", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Petróleo", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Marino", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 3, XL: 3, XXL: 2 } }
  ] },
  45: { totalPieces: 80, rows: [
    { color: "Blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Beige", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Melange", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Celeste", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Petróleo", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Marino", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } }
  ] },
  46: { totalPieces: 64, rows: [
    { color: "Blanco", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } },
    { color: "Beige", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } },
    { color: "Oliva", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Chocolate", sizePieces: { S: 2, M: 2, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 4, M: 4, L: 3, XL: 3, XXL: 2 } }
  ] },
  47: { totalPieces: 36, rows: [
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 4, XL: 4, XXL: 4 } },
    { color: "Beige", sizePieces: { S: 2, M: 2, L: 4, XL: 4, XXL: 4 } }
  ] },
  48: { totalPieces: 48, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Marino", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  49: { totalPieces: 24, rows: [
    { color: "Blanco", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Beige", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } }
  ] },
  50: { totalPieces: 30, rows: [
    { color: "Negro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Camel", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Camel", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Caqui", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Chocolate", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } }
  ] },
  51: { totalPieces: 48, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Marino", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  52: { totalPieces: 30, rows: [
    { color: "Negro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Melange oscuro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Melange", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Caqui", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } }
  ] },
  53: { totalPieces: 24, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  54: { totalPieces: 24, rows: [
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Beige", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } },
    { color: "Camel", sizePieces: { S: 1, M: 2, L: 2, XL: 2, XXL: 1 } }
  ] },
  55: { totalPieces: 30, rows: [
    { color: "Melange", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Negro", sizePieces: { S: 2, M: 2, L: 4, XL: 2, XXL: 2 } },
    { color: "Melange oscuro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Caqui", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } }
  ] },
  56: { totalPieces: 72, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Marrón", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Gris", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  57: { totalPieces: 36, rows: [
    { color: "Negro", sizePieces: { "5XL": 6, "6XL": 6, "7XL": 6 } },
    { color: "Azul oscuro", sizePieces: { "5XL": 6, "6XL": 6, "7XL": 6 } }
  ] },
  58: { totalPieces: 48, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Ocre", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  59: { totalPieces: 72, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Beige", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Chocolate", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  60: { totalPieces: 24, rows: [
    { color: "Negro", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Beige", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Camel", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } },
    { color: "Rosa", sizePieces: { S: 1, M: 1, L: 2, XL: 1, XXL: 1 } }
  ] },
  61: { totalPieces: 48, rows: [
    { color: "Chocolate", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Camel", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  62: { totalPieces: 48, rows: [
    { color: "Chocolate", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  63: { totalPieces: 72, rows: [
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Beige", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } },
    { color: "Gris", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }
  ] },
  64: { totalPieces: 30, rows: [
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Arena", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Melange", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Caqui", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } }
  ] },
  65: { totalPieces: 30, rows: [
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Negro", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Arena", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Melange", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } },
    { color: "Caqui", sizePieces: { S: 1, M: 2, L: 2, XL: 1 } }
  ] },
  66: { totalPieces: 40, rows: [
    { color: "Negro", sizePieces: { S: 2, M: 4, L: 6, XL: 6, XXL: 2 } },
    { color: "Iced Coffee", sizePieces: { S: 2, M: 4, L: 6, XL: 6, XXL: 2 } }
  ] },
  67: { totalPieces: 40, rows: [
    { color: "Beige/Oliva", sizePieces: { S: 2, M: 4, L: 4, XL: 4, XXL: 2 }, pieces: 16 },
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 }, pieces: 24 }
  ] },
  68: { totalPieces: 40, rows: [
    { color: "Beige/Oliva", sizePieces: { S: 2, M: 4, L: 4, XL: 4, XXL: 2 }, pieces: 16 },
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 }, pieces: 24 }
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
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-add')) return;
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
  const modalEl = document.getElementById('product-modal');

  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-gender').textContent = p.category === 'MUJER' ? 'Mujer' : 'Hombre';
  document.getElementById('modal-subcat').textContent = p.subcategory;
  document.getElementById('modal-collection').textContent = `${getActiveCollection().name.toUpperCase()} · ${getStockLabel(p).toUpperCase()}`;
  document.getElementById('modal-desc').textContent = p.description;

  // Colors
  const colorsEl = document.getElementById('modal-colors');
  colorsEl.innerHTML = p.colors.map((c, i) => `<button type="button" class="color-chip" data-color-index="${i}">${c}</button>`).join('');

  // Sizes
  const sizesEl = document.getElementById('modal-sizes');
  sizesEl.innerHTML = p.sizes.map(s => `<span class="size-chip">${s}</span>`).join('');

  // Packaging / curve
  renderPackagingTable(p);

  // Load modal image from local folder
  const modalImg = document.getElementById('modal-img');
  const modalImgWrap = document.querySelector('.modal-image-wrap');
  modalImg.style.display = 'none';
  modalImg.alt = p.name;
  modalImgWrap.style.aspectRatio = '3 / 4';
  modalEl.style.removeProperty('--modal-media-w');
  modalEl.style.removeProperty('--modal-w');

  // Remove old gallery controls if any
  modalImgWrap.querySelectorAll('.modal-gallery-dots, .gallery-arrow, .modal-empty-image').forEach(el => el.remove());

  // Build gallery without blocking the modal opening.
  const gallerySrcs = getProductImageSources(p.id);
  let galleryIdx = 0;
  let dots = null;
  modalImg.onclick = null;
  modalImg.style.cursor = '';

  if (!gallerySrcs.length) {
    const emptyImage = document.createElement('div');
    emptyImage.className = 'modal-empty-image';
    emptyImage.innerHTML = `
      <span class="modal-empty-kicker">Foto pendiente</span>
      <strong>${p.name}</strong>
    `;
    modalImgWrap.appendChild(emptyImage);
  }

  function updateDots() {
    if (!dots) return;
    dots.querySelectorAll('.gallery-dot').forEach((dot, di) => {
      dot.classList.toggle('active', di === galleryIdx);
    });
  }

  function updateColorChips() {
    colorsEl.querySelectorAll('.color-chip').forEach(chip => {
      chip.classList.toggle('active', Number(chip.dataset.galleryIndex) === galleryIdx);
    });
  }

  function preloadNeighborImages() {
    if (gallerySrcs.length < 2) return;
    const nextIdx = (galleryIdx + 1) % gallerySrcs.length;
    const prevIdx = (galleryIdx - 1 + gallerySrcs.length) % gallerySrcs.length;
    [prevIdx, nextIdx].forEach(idx => {
      const preload = new Image();
      preload.src = gallerySrcs[idx];
    });
  }

  function fitModalToImage() {
    const ratioW = modalImg.naturalWidth || 3;
    const ratioH = modalImg.naturalHeight || 4;
    const ratio = ratioW / ratioH;
    const viewportW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const viewportH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const maxImageH = Math.min(viewportH * 0.86, 760);
    const infoW = 500;
    const gapW = 40;
    const maxModalW = Math.max(320, viewportW - gapW);
    const mediaW = Math.max(320, Math.min(maxImageH * ratio, 620, maxModalW - infoW));
    const modalW = Math.min(maxModalW, mediaW + infoW);

    modalImgWrap.style.aspectRatio = `${ratioW} / ${ratioH}`;
    modalEl.style.setProperty('--modal-media-w', `${Math.round(mediaW)}px`);
    modalEl.style.setProperty('--modal-w', `${Math.round(modalW)}px`);
  }

  function showGalleryImage(index) {
    if (!gallerySrcs.length) return;
    galleryIdx = index;
    modalImg.style.display = 'none';
    modalImg.onload = () => {
      fitModalToImage();
      modalImg.style.display = 'block';
      preloadNeighborImages();
    };
    modalImg.src = gallerySrcs[galleryIdx];
    updateDots();
    updateColorChips();
  }

  colorsEl.querySelectorAll('.color-chip').forEach((chip, colorIndex) => {
    const galleryIndex = getColorGalleryIndex(p, colorIndex, gallerySrcs.length);
    chip.dataset.galleryIndex = galleryIndex ?? '';
    chip.disabled = galleryIndex === null;
    chip.addEventListener('click', () => {
      if (galleryIndex !== null) showGalleryImage(galleryIndex);
    });
  });

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

    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-arrow gallery-arrow-prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Foto anterior');
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showGalleryImage((galleryIdx - 1 + gallerySrcs.length) % gallerySrcs.length);
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-arrow gallery-arrow-next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Foto siguiente');
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showGalleryImage((galleryIdx + 1) % gallerySrcs.length);
    });

    modalImgWrap.appendChild(prevBtn);
    modalImgWrap.appendChild(nextBtn);
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
    const cartImageSrc = getProductImageSources(p.id)[0] || '';
    const placeholderDisplay = cartImageSrc ? 'none' : 'flex';
    item.className = 'cart-item';
    item.innerHTML = `
      <div class="cart-item-img">
        ${cartImageSrc ? `<img src="${cartImageSrc}" alt="${p.name}" loading="lazy" decoding="async" />` : ''}
        <div class="cart-item-img-placeholder" style="display:${placeholderDisplay};">
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
    const cartImg = item.querySelector('.cart-item-img img');
    if (cartImg) {
      cartImg.addEventListener('error', () => {
        cartImg.style.display = 'none';
        const placeholder = item.querySelector('.cart-item-img-placeholder');
        if (placeholder) placeholder.style.display = 'flex';
      });
    }
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
