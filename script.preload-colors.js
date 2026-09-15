/* ================================================
   BYE BYE — Catálogo Verano 2027
   script.js — Catalog, Cart, PDF, WhatsApp
   ================================================ */

// ── PRODUCT DATA ────────────────────────────────
// -- COLLECTIONS ----------------------------------
const collections = [
  { id: "verano-2027", name: "Verano 2027", label: "SS 2027", tagline: "Made for summer." },
  { id: "invierno-2027", name: "Invierno", label: "FW 2027", tagline: "Abrigos y prendas de invierno." },
  { id: "primavera-2027", name: "Primavera", label: "SP 2027", tagline: "Camperas para media estación." }
];

const SPRING_PRODUCT_IDS = [51, 53, 54, 58, 61, 62, 63, 66, 68, 77, 78];

// -- EASY CATALOG CONTROL -------------------------
// Para poner un producto fuera de stock, agregá su número:
// const OUT_OF_STOCK_PRODUCT_IDS = [12, 43];
const OUT_OF_STOCK_PRODUCT_IDS = [3, 6, 8, 9, 12, 13, 14, 16, 17, 20, 24, 25, 27, 28, 33, 46];

// Para sacar un producto de la página sin borrarlo, agregá su número:
// const HIDDEN_PRODUCT_IDS = [7, 18];
const HIDDEN_PRODUCT_IDS = [31, 57, 67];

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
    id: 8, name: "Chaleco Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Chalecos"],
    description: "Chaleco de lino parte del conjunto coordinado. Corte sastrero.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 9, name: "Pantalón Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    description: "Pantalón de lino para combinar con el chaleco del conjunto.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 10, name: "Chaleco Sastrero", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Chalecos"],
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
    id: 13, name: "Camisa Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Camisas"],
    description: "Camisa de lino parte del conjunto con jogger. Corte relajado.",
    colors: ["Blanco", "Crudo", "Khaki", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 14, name: "Jogger Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    description: "Jogger de lino para combinar con la camisa del conjunto.",
    colors: ["Blanco", "Crudo", "Caqui", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 15, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    description: "Pantalón de corte sastrero. Líneas limpias y modernas.",
    colors: ["Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 16, name: "Short Brezo", category: "MUJER", subcategory: "Shorts",
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
    id: 32, name: "Bermuda Lino", category: "HOMBRE", subcategory: "Bermudas",
    description: "Bermuda de lino premium para el verano. Cómoda y sofisticada.",
    colors: ["Oliva", "Khaki", "Gris Oscuro", "Marrón", "Blanco", "Gris Oliva", "Negro", "Crudo", "Beige"],
    sizes: ["30", "32", "34", "36"],
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
    id: 34, name: "Chomba Jersey Lisa Plus", category: "HOMBRE", subcategory: "Chombas",
    description: "Chomba de jersey lisa en talles grandes. Premium comfort.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: ""
  },
  {
    id: 35, name: "Chomba Piqué Lisa", category: "HOMBRE", subcategory: "Chombas",
    description: "Chomba de piqué lisa clásica. Colores neutros y vibrantes.",
    colors: ["Blanco", "Crudo", "Beige", "Melange", "Celeste", "Marino", "Oliva", "Petróleo", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 36, name: "Chomba Piqué Lisa Plus", category: "HOMBRE", subcategory: "Chombas",
    description: "Chomba de piqué lisa en talles grandes. Misma calidad, mayor amplitud.",
    colors: ["Blanco", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: ""
  },
  {
    id: 37, name: "Chomba Piqué Penguin", category: "HOMBRE", subcategory: "Chombas",
    description: "Chomba piqué con detalle tipo penguin. Diseño clásico y deportivo.",
    colors: ["Blanco", "Beige", "Celeste", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 38, name: "Chomba Piqué Vivo", category: "HOMBRE", subcategory: "Chombas",
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
    id: 42, name: "Traje de Baño", category: "HOMBRE", subcategory: "Trajes de baño",
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
    id: 44, name: "Traje de baño surf", category: "HOMBRE", subcategory: "Trajes de baño",
    description: "Traje de baño surf para hombre. Liviano, fresco y listo para el verano.",
    colors: ["Beige", "Gris", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 45, name: "Chomba Jersey Lisa", category: "HOMBRE", subcategory: "Chombas",
    description: "Chomba jersey lisa para hombre. Básica, cómoda y versátil.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 46, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
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
    5
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
    13,
    14
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
    8,
    9
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
  "55": [
    1,
    2,
    3,
    4
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
  ],
  "69": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "70": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "71": [
    1,
    2,
    3,
    4,
    5
  ],
  "72": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "74": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "75": [
    1,
    2,
    3
  ],
  "76": [
    1,
    2,
    3
  ],
  "77": [
    1,
    2,
    3,
    4,
    5
  ],
  "78": [
    1
  ],
  "79": [
    1,
    2,
    3,
    4
  ],
  "80": [
    1,
    2,
    3,
    4
  ],
  "81": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "82": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "84": [
    1,
    2,
    3,
    4
  ]
};

const winterImageAdditionsByProductId = {
  47: [6, 7],
  48: [6, 7],
  49: [6, 7, 8],
  50: [5, 6, 7, 8],
  51: [7, 8],
  52: [2, 3, 4, 5],
  53: [6],
  54: [4, 5, 6],
  55: [5, 6, 7, 8],
  56: [10, 11, 12],
  58: [6, 7],
  59: [7, 8, 9],
  60: [2, 3, 4, 5],
  61: [5, 6],
  62: [6, 7],
  63: [5, 6, 7],
  64: [6, 7, 8, 9],
  65: [8, 9, 10, 11],
  66: [7, 8],
  68: [2, 3],
  70: [8],
  71: [6, 7, 8, 9, 10],
  72: [8, 9, 10],
  75: [4, 5, 6],
  76: [4, 5, 6],
  78: [2, 3, 4],
  79: [5, 6, 7, 8],
  80: [5, 6, 7]
};

Object.entries(winterImageAdditionsByProductId).forEach(([productId, photoNumbers]) => {
  productImagesById[productId] = [...new Set([
    ...(productImagesById[productId] || []),
    ...photoNumbers
  ])].sort((a, b) => a - b);
});

const IMAGE_ASSET_VERSION = "20260730-4";

function versionImageSrc(src) {
  return `${src}?v=${IMAGE_ASSET_VERSION}`;
}

const productImageExtensionByKey = {
  "34_6": "jpeg",
  "34_7": "jpeg",
  "35_4": "jpeg",
  "35_5": "jpeg",
  "35_6": "jpeg",
  "35_9": "jpeg",
  "35_11": "jpeg",
  "35_12": "jpeg",
  "37_7": "jpeg",
  "37_8": "jpeg",
  "37_9": "jpeg",
  "37_10": "jpeg",
  "37_11": "jpeg",
  "38_6": "jpeg",
  "38_7": "jpeg",
  "38_8": "jpeg",
  "38_9": "jpeg"
};

function getProductImagePhotoNumbers(id) {
  return productImagesById[String(id)] || [];
}

function getProductImageSources(id) {
  return getProductImagePhotoNumbers(id).map(photoNumber => {
    const extension = productImageExtensionByKey[`${id}_${photoNumber}`] || "jpg";
    return versionImageSrc(`images/prod_${id}_${photoNumber}.${extension}`);
  });
}

// Foto principal por color. El numero corresponde a prod_ID_NUMERO.
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
  11: { "Negro": 3, "Crudo": 4, "Blanco": 5 },
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

  32: { "Oliva": 5, "Beige": 6, "Crudo": 7, "Negro": 8, "Oliva Oscuro": 9, "Oliva oscuro": 9, "Gris Oliva": 9, "Gris": 10, "Blanco": 11, "Marrón": 12, "Marron": 12, "Gris Oscuro": 13, "Gris oscuro": 13, "Khaki": 14, "Caqui": 14 },
  33: { "Marino": 3, "Blanco": 4, "Gris": 5, "Gris Claro": 5, "Gris claro": 5, "Gris Verdoso": 6, "Verde, petróleo": 6, "Petróleo": 6, "Negro": 7 },
  34: { "Marino": 3, "Blanco": 4, "Melange": 5, "Petróleo": 6, "Petroleo": 6, "Negro": 7 },
  35: { "Oliva": 4, "Negro": 5, "Marino": 6, "Beige": 8, "Celeste": 9, "Blanco": 10, "Petróleo": 11, "Melange": 12, "Crudo": 14 },
  36: { "Petróleo": 6, "Melange": 7, "Blanco": 8, "Negro": 9, "Marino": 10 },
  37: { "Beige vivo negro": 4, "Blanco vivo marino": 5, "Celeste vivo negro": 6, "Melange vivo blanco": 7, "Petróleo vivo blanco": 8, "Marino vivo gris": 9, "Marino vivo blanco": 9, "Negro vivo gris": 10, "Negro vivo blanco": 11 },
  38: { "Blanco vivo marino": 4, "Beige vivo negro": 5, "Melange vivo blanco": 6, "Marino vivo blanco": 7, "Negro vivo blanco": 8, "Negro vivo gris": 9 },
  39: { "Blanco": 4, "Gris": 5, "Marino": 6, "Negro": 7 },
  40: { "Blanco": 4, "Negro": 5 },
  41: { "Negro": 4, "Gris Claro": 5, "Gris claro": 5, "Gris": 6, "Gris Oscuro": 6, "Gris oscuro": 6, "Gris Topo": 7, "Gris topo": 7, "Oliva": 8, "Beige": 9 },
  42: { "Chocolate": 4, "Beige": 5, "Gris": 6, "Celeste": 7, "Petróleo": 8, "Marino": 9, "Negro": 10 },
  43: { "Celeste": 3, "Blanco": 4, "Rosa": 5, "Negro": 6, "Marino": 7 },
  44: { "Negro": 4, "Marino": 5, "Petróleo": 6, "Gris": 7, "Beige": 8 },
  45: { "Negro": 3, "Marino": 4, "Azul marino": 4, "Blanco": 5, "Beige": 6, "Melange": 7, "Gris": 7, "Celeste": 9, "Petróleo": 8 },
  46: { "Negro": 3, "Blanco": 4, "Beige": 5, "Chocolate": 6, "Oliva": 7 },
  47: { "Beige": 6, "Negro": 7 },
  48: { "Negro": 6, "Marino": 7 },
  49: { "Blanco": 6, "Beige": 7, "Negro": 8 },
  50: { "Negro": 5, "Chocolate": 6, "Caqui": 7, "Camel": 8 },
  51: { "Negro": 7, "Marino": 8 },
  52: { "Negro": 2, "Melange oscuro": 3, "Melange": 4, "Caqui": 5 },
  53: { "Negro": 6 },
  54: { "Negro": 4, "Beige": 5, "Camel": 6 },
  55: { "Negro": 6, "Melange oscuro": 7, "Melange": 5, "Caqui": 8 },
  56: { "Negro": 10, "Marrón": 11, "Gris": 12 },
  58: { "Ocre": 6, "Negro": 7 },
  59: { "Negro": 7, "Beige": 8, "Chocolate": 9 },
  60: { "Rosa": 2, "Camel": 3, "Beige": 4, "Negro": 5 },
  61: { "Chocolate": 5, "Camel": 6 },
  62: { "Negro": 6, "Chocolate": 7 },
  63: { "Negro": 5, "Beige": 6, "Gris": 7 },
  64: { "Negro": 6, "Arena": 7, "Melange": 8, "Caqui": 9 },
  65: { "Negro": 8, "Arena": 9, "Melange": 10, "Caqui": 11 },
  66: { "Negro": 8, "Iced Coffee": 7 },
  68: { "Oliva": 2, "Beige": 3 },
  69: { "Negro": 5, "Marino/Negro": 6, "Negro/Oliva 2": 7, "Oliva 2/Marino": 8 },
  70: { "Negro": 8 },
  71: { "Oliva": 6, "Beige": 7, "Camel": 8, "Marino": 9, "Negro": 10 },
  72: { "Negro": 8, "Beige": 9, "Oliva": 10 },
  74: { "Negro": 4, "Oliva oscuro": 5, "Marino": 6, "Marrón claro": 7 },
  75: { "Camel": 4, "Negro": 5, "Café": 6 },
  76: { "Camel": 4, "Negro": 5, "Chocolate": 6 },
  77: { "Chocolate": 4, "Negro": 5 },
  78: { "Negro": 2, "Chocolate": 3, "Camel": 4 },
  79: { "Piedra": 5, "Negro": 6, "Marino": 7, "Rosa": 8 },
  80: { "Negro": 5, "Oliva claro": 6, "Piedra": 7 },
  81: { "Negro": 4, "Marino": 5, "Marrón claro": 6, "Verde militar": 7 },
  82: { "Negro": 3, "Vino": 4, "Leche": 5, "Gris": 6 }
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
    orderNumber: "125-314", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 48, name: "Merano", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera larga de invierno para hombre. Diseño abrigado y urbano.",
    colors: ["Negro", "Marino"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "225-212", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 49, name: "Saluzzo", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de invierno para hombre con capucha. Abrigada y de uso diario.",
    colors: ["Blanco", "Negro", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-088", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 50, name: "Acuto Sanwich", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera inflable de invierno para hombre. Liviana, cómoda y abrigada.",
    colors: ["Negro", "Camel", "Caqui", "Chocolate"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "127-107", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 51, name: "Taft", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera liviana de invierno para hombre. Disponible en colores clásicos.",
    colors: ["Negro", "Marino"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-336", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 52, name: "Harold", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de paño para hombre. Diseño con capucha y combinaciones de invierno.",
    colors: ["Negro", "Negro melange", "Melange oscuro", "Melange", "Caqui"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "124-511", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 53, name: "Bulciago", category: "HOMBRE", subcategory: "Abrigos",
    description: "Campera de cuero para hombre. Clásica, sobria y de abrigo liviano.",
    colors: ["Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "225-204", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 54, name: "Ailano", category: "HOMBRE", subcategory: "Abrigos",
    description: "Trench de invierno para hombre. Corte clásico con cinturón.",
    colors: ["Negro", "Beige", "Camel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "225-155", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 55, name: "Leonel", category: "HOMBRE", subcategory: "Abrigos",
    description: "Tapado de invierno para hombre con capucha. Abrigado y elegante.",
    colors: ["Melange", "Negro", "Melange oscuro", "Caqui"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "224-480", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 56, name: "Juan", category: "HOMBRE", subcategory: "Abrigos",
    description: "Tapado de invierno para hombre. Silueta larga y colores neutros.",
    colors: ["Negro", "Marrón", "Gris"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "225-200", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 57, name: "Felipe Fur Plus", category: "HOMBRE", subcategory: "Abrigos Plus",
    description: "Campera plus size de invierno para hombre. Abrigada y cómoda.",
    colors: ["Negro", "Azul oscuro"],
    sizes: ["5XL", "6XL", "7XL"],
    orderNumber: "225-194", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 58, name: "Lola", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Abrigada, cómoda y de uso diario.",
    colors: ["Negro", "Ocre"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-308", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 59, name: "Clara", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Silueta abrigada con colores neutros.",
    colors: ["Negro", "Chocolate", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-327", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 60, name: "Civita", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer con capucha. Abrigada y versátil.",
    colors: ["Negro", "Beige", "Camel", "Rosa"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-078", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 61, name: "Ana", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Diseño corto con estilo urbano.",
    colors: ["Chocolate", "Camel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-306", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 62, name: "Polesella", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Diseño clásico en cuero y tonos oscuros.",
    colors: ["Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-311", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 63, name: "Micaela", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Abrigo corto en tonos neutros.",
    colors: ["Negro", "Gris", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "225-312", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 64, name: "Liberti", category: "MUJER", subcategory: "Abrigos",
    description: "Tapado de invierno para mujer. Silueta larga y colores combinables.",
    colors: ["Negro", "Arena", "Melange", "Caqui"],
    sizes: ["S", "M", "L", "XL"],
    orderNumber: "124-634", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 65, name: "Dunst Long Castana", category: "MUJER", subcategory: "Abrigos",
    description: "Tapado largo de invierno para mujer. Abrigado, elegante y de uso diario.",
    colors: ["Negro", "Arena", "Melange", "Caqui"],
    sizes: ["S", "M", "L", "XL"],
    orderNumber: "124-655", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 66, name: "Elena", category: "MUJER", subcategory: "Abrigos",
    description: "Piloto de invierno para mujer. Disponible en tonos clásicos de temporada.",
    colors: ["Negro", "Iced Coffee"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-226", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 67, name: "Accadia", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer con capucha. Cómoda y abrigada.",
    colors: ["Beige/Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-547", collection: "invierno-2027",
    driveLink: ""
  },
  {
    id: 68, name: "Tonara", category: "MUJER", subcategory: "Abrigos",
    description: "Campera de invierno para mujer. Disponible en beige, militar y negro.",
    colors: ["Oliva", "Beige", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "125-548", collection: "invierno-2027",
    driveLink: ""
  }
];

products.push(...extraProducts);

// -- INVIERNO: MP087 / WH3007 ---------------------
// Nombres y género: columna Article y Description del CI MP087.
// Colores, talles y curvas: tablas ARTICLE NAME del WH3007.
// No se agregan fotos hasta contar con los archivos correspondientes.
const winterSourceProducts = [
  {
    id: 69, name: "FELIPE PLUS", category: "HOMBRE", subcategory: "Abrigos",
    description: "MEN WOVEN JACKET", orderNumber: "225-156", collection: "invierno-2027",
    colors: ["Negro", "Negro/Oliva 2", "Marino/Negro", "Oliva 2/Marino"], sizes: ["2XL", "3XL", "4XL"], driveLink: "",
    packaging: { totalPieces: 24, rows: [
      { color: "Negro", sizePieces: { "2XL": 2, "3XL": 2, "4XL": 2 } },
      { color: "Negro/Oliva 2", sizePieces: { "2XL": 2, "3XL": 2, "4XL": 2 } },
      { color: "Marino/Negro", sizePieces: { "2XL": 2, "3XL": 2, "4XL": 2 } },
      { color: "Oliva 2/Marino", sizePieces: { "2XL": 2, "3XL": 2, "4XL": 2 } }
    ] }
  },
  {
    id: 70, name: "FELIPE HOOD FUR", category: "HOMBRE", subcategory: "Abrigos",
    description: "MEN WOVEN JACKET", orderNumber: "225-206", collection: "invierno-2027",
    colors: ["Negro"], sizes: ["S", "M", "L", "XL", "2XL"], driveLink: "",
    packaging: { totalPieces: 24, rows: [
      { color: "Negro", sizePieces: { S: 3, M: 3, L: 6, XL: 6, "2XL": 6 } }
    ] }
  },
  {
    id: 71, name: "GABRIELLE", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN JACKET", orderNumber: "125-117", collection: "invierno-2027",
    colors: ["Negro", "Marino", "Beige", "Oliva", "Camel"], sizes: ["S/CH", "M/M", "L/G", "XL/EG"], driveLink: "",
    packaging: { totalPieces: 36, rows: [
      { color: "Negro", sizePieces: { "S/CH": 2, "M/M": 4, "L/G": 4, "XL/EG": 2 } },
      { color: "Marino", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Beige", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Oliva", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Camel", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } }
    ] }
  },
  {
    id: 72, name: "MESSIKA", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN JACKET", orderNumber: "125-345", collection: "invierno-2027",
    colors: ["Negro", "Beige", "Oliva"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "XXL/EEG"], driveLink: "",
    packaging: { totalPieces: 32, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Beige", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Oliva", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } }
    ] }
  },
  {
    id: 74, name: "BILLY", category: "HOMBRE", subcategory: "Abrigos",
    description: "MEN WOVEN VEST", orderNumber: "224-856", collection: "invierno-2027",
    colors: ["Negro", "Oliva oscuro", "Marino", "Marrón claro"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "XXL/EEG"], driveLink: "",
    packaging: { totalPieces: 32, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Oliva oscuro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Marino", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Marrón claro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Marrón claro", sizePieces: { "S/CH": 2, "M/M": 4, "L/G": 4, "XL/EG": 4, "XXL/EEG": 2 } },
      { color: "Marino", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } }
    ] }
  },
  {
    id: 75, name: "PIETRACUPA", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN VEST", orderNumber: "125-472", collection: "invierno-2027",
    colors: ["Negro", "Camel", "Café"], sizes: ["S/CH", "M/M", "L/G", "XL/EG"], driveLink: "",
    packaging: { totalPieces: 18, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Camel", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Café", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } }
    ] }
  },
  {
    id: 76, name: "PIANELLA", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN VEST", orderNumber: "125-473", collection: "invierno-2027",
    colors: ["Negro", "Camel", "Chocolate"], sizes: ["S/CH", "M/M", "L/G", "XL/EG"], driveLink: "",
    packaging: { totalPieces: 18, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Camel", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Chocolate", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } }
    ] }
  },
  {
    id: 77, name: "LINA JERSEY", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN JACKET", orderNumber: "125-411", collection: "invierno-2027",
    colors: ["Negro", "Chocolate"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "XXL/EEG"], driveLink: "",
    packaging: { totalPieces: 24, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Chocolate", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } }
    ] }
  },
  {
    id: 78, name: "BARTAL FUR", category: "HOMBRE", subcategory: "Abrigos",
    description: "MEN WOVEN JACKET", orderNumber: "125-982", collection: "invierno-2027",
    colors: ["Negro", "Chocolate", "Camel"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "XXL/EEG"], driveLink: "",
    packaging: { totalPieces: 32, rows: [
      { color: "Negro", sizePieces: { "S/CH": 2, "M/M": 4, "L/G": 4, "XL/EG": 4, "XXL/EEG": 2 } },
      { color: "Chocolate", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } },
      { color: "Camel", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "XXL/EEG": 1 } }
    ] }
  },
  {
    id: 79, name: "ISADORA TAFFETA", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN VEST", orderNumber: "124-771", collection: "invierno-2027",
    colors: ["Negro", "Marino", "Rosa", "Piedra"], sizes: ["S/CH", "M/M", "L/G", "XL/EG"], driveLink: "",
    packaging: { totalPieces: 30, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Marino", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Rosa", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } },
      { color: "Piedra", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 1 } }
    ] }
  },
  {
    id: 80, name: "SIRENA HOOD", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN JACKET", orderNumber: "124-773", collection: "invierno-2027",
    colors: ["Negro", "Oliva claro", "Piedra"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "2XL/2EG"], driveLink: "",
    packaging: { totalPieces: 32, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Oliva claro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Piedra", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } }
    ] }
  },
  {
    id: 81, name: "MILAN", category: "HOMBRE", subcategory: "Abrigos",
    description: "MEN WOVEN VEST", orderNumber: "224-747", collection: "invierno-2027",
    colors: ["Negro", "Marino", "Marrón claro", "Verde militar"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "2XL/2EG"], driveLink: "",
    packaging: { totalPieces: 40, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Marino", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Marrón claro", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } },
      { color: "Verde militar", sizePieces: { "S/CH": 1, "M/M": 2, "L/G": 2, "XL/EG": 2, "2XL/2EG": 1 } }
    ] }
  },
  {
    id: 82, name: "HEDDA PONGEE", category: "MUJER", subcategory: "Abrigos",
    description: "LADIES WOVEN VEST", orderNumber: "125-318", collection: "invierno-2027",
    colors: ["Negro", "Vino", "Leche", "Gris"], sizes: ["S/CH", "M/M", "L/G", "XL/EG", "2XL/2EG"], driveLink: "",
    packaging: { totalPieces: 30, rows: [
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 1, "L/G": 2, "XL/EG": 1, "2XL/2EG": 1 } },
      { color: "Negro", sizePieces: { "S/CH": 1, "M/M": 1, "L/G": 2, "XL/EG": 1, "2XL/2EG": 1 } },
      { color: "Vino", sizePieces: { "S/CH": 1, "M/M": 1, "L/G": 2, "XL/EG": 1, "2XL/2EG": 1 } },
      { color: "Leche", sizePieces: { "S/CH": 1, "M/M": 1, "L/G": 2, "XL/EG": 1, "2XL/2EG": 1 } },
      { color: "Gris", sizePieces: { "S/CH": 1, "M/M": 1, "L/G": 2, "XL/EG": 1, "2XL/2EG": 1 } }
    ] }
  },
  {
    id: 84, name: "RICHARD HOOD", category: "NINOS", subcategory: "Abrigos",
    description: "KIDS WOVEN JACKET", orderNumber: "225-223", collection: "invierno-2027",
    colors: ["Negro", "Marino"], sizes: ["4", "6", "8", "10", "12", "14", "16", "18"], driveLink: "",
    packaging: { totalPieces: 24, rows: [
      { color: "Negro", sizePieces: { "4": 3, "6": 3, "8": 3, "10": 3, "12": 3, "14": 3, "16": 3, "18": 3 } },
      { color: "Marino", sizePieces: { "4": 3, "6": 3, "8": 3, "10": 3, "12": 3, "14": 3, "16": 3, "18": 3 } }
    ] }
  }
];

products.push(...winterSourceProducts);


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

  32: {
    totalPieces: 378,
    totalLabel: "42 piezas por color",
    rows: [
      { color: "Oliva", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Khaki", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Gris Oscuro", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Marrón", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Blanco", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Gris Oliva", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Negro", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Crudo", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
      { color: "Beige", sizePieces: { "30": 1, "32": 2, "34": 2, "36": 1 }, pieces: "42 piezas por color" },
    ],
  },
  33: {
    totalPieces: 120,
    totalLabel: "24 piezas por color",
    rows: [
      { color: "Marino", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "24 piezas por color" },
      { color: "Blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "24 piezas por color" },
      { color: "Gris claro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "24 piezas por color" },
      { color: "Gris verdoso", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "24 piezas por color" },
      { color: "Negro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "24 piezas por color" },
    ],
  },
  34: {
    totalPieces: 72,
    totalLabel: "72 piezas totales",
    rows: [
      { color: "Blanco", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Melange", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Petróleo", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Marino", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
    ],
  },
  35: {
    totalPieces: 100,
    totalLabel: "100 piezas totales",
    rows: [
      { color: "Blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Crudo", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Beige", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Melange", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Celeste", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Marino", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Oliva", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Petróleo", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Negro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
      { color: "Negro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 }, pieces: "10 piezas por color" },
    ],
  },
  36: {
    totalPieces: 72,
    totalLabel: "72 piezas totales",
    rows: [
      { color: "Blanco", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Melange", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Petróleo", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Marino", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 1, "4XL": 1, "5XL": 1, "6XL": 1 }, pieces: "12 piezas por color" },
    ],
  },
  37: {
    totalPieces: 75,
    totalLabel: "75 piezas totales",
    rows: [
      { color: "Blanco vivo marino", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Beige vivo negro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Celeste vivo negro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Melange vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Petróleo vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Marino vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Negro vivo gris", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Negro vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
    ],
  },
  38: {
    totalPieces: 60,
    totalLabel: "60 piezas totales",
    rows: [
      { color: "Blanco vivo marino", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Beige vivo negro", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Melange vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Marino vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Negro vivo gris", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
      { color: "Negro vivo blanco", sizePieces: { "S": 1, "M": 2, "L": 3, "XL": 2, "XXL": 2 } },
    ],
  },
  39: {
    totalPieces: 192,
    totalLabel: "48 piezas por color",
    rows: [
      { color: "Blanco", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Gris", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Marino", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Negro", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
    ],
  },
  40: {
    totalPieces: 180,
    totalLabel: "90 piezas por talle por color",
    rows: [
      { color: "Blanco", curveText: "S al 6XL", pieces: "90 por talle" },
      { color: "Negro", curveText: "S al 6XL", pieces: "90 por talle" },
    ],
  },
  41: {
    totalPieces: 288,
    totalLabel: "48 piezas por color",
    rows: [
      { color: "Beige", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 }, pieces: "48 piezas por color" },
      { color: "Oliva", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 }, pieces: "48 piezas por color" },
      { color: "Gris Topo", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 }, pieces: "48 piezas por color" },
      { color: "Gris", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 }, pieces: "48 piezas por color" },
      { color: "Gris Claro", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 }, pieces: "48 piezas por color" },
      { color: "Negro", sizePieces: { "30": 2, "32": 2, "34": 2, "36": 1, "38": 1 }, pieces: "48 piezas por color" },
    ],
  },
  42: {
    totalPieces: 96,
    totalLabel: "96 piezas totales",
    rows: [
      { color: "Beige", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Gris", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Chocolate", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Celeste", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Petróleo", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Marino", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Negro", sizePieces: { "S": 4, "M": 4, "L": 6, "XL": 6, "XXL": 4 } },
    ],
  },
  43: {
    totalPieces: 240,
    totalLabel: "48 piezas por color",
    rows: [
      { color: "Blanco", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Rosa", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Celeste", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Marino", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
      { color: "Negro", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "48 piezas por color" },
    ],
  },
  44: {
    totalPieces: 72,
    totalLabel: "72 piezas totales",
    rows: [
      { color: "Beige", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Gris", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Petróleo", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Marino", sizePieces: { "S": 2, "M": 2, "L": 3, "XL": 3, "XXL": 2 } },
      { color: "Negro", sizePieces: { "S": 4, "M": 4, "L": 6, "XL": 6, "XXL": 4 } },
    ],
  },
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

winterSourceProducts.forEach(product => {
  packagingByProductId[product.id] = product.packaging;
  delete product.packaging;
});

function applyCatalogData() {
  products.forEach(product => {
    product.collection = product.collection || "verano-2027";
    product.collections = SPRING_PRODUCT_IDS.includes(product.id)
      ? ["primavera-2027"]
      : [product.collection];
    product.isHidden = HIDDEN_PRODUCT_IDS.includes(product.id);
    product.inStock = !OUT_OF_STOCK_PRODUCT_IDS.includes(product.id);
    const packaging = packagingByProductId[product.id];
    if (!packaging) return;
    product.packaging = {
      ...packaging,
      rows: packaging.rows.map(row => ({
        ...row,
        sizePieces: Object.fromEntries(
          Object.entries(row.sizePieces || {}).map(([size, pieces]) => [normalizeCatalogSize(size), pieces])
        )
      }))
    };
    product.colors = [...new Set(packaging.rows.map(row => row.color))];
    product.sizes = getPackagingSizes(product.packaging);
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

function normalizeCatalogSize(size) {
  const normalizedSizes = {
    "S/CH": "S",
    "M/M": "M",
    "L/G": "L",
    "XL/EG": "XL",
    "XXL/EEG": "XXL",
    "2XL/2EG": "XXL",
    "2XL": "XXL"
  };
  return normalizedSizes[size] || size;
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
  return products.filter(product => product.collections.includes(activeCollection) && !product.isHidden);
}

const GENDER_LABELS = {
  MUJER: "Mujer",
  HOMBRE: "Hombre",
  NINOS: "Niños"
};

function getGenderLabel(category) {
  return GENDER_LABELS[category] || category;
}

function isWinterCollection() {
  return activeCollection === "invierno-2027";
}

function getProductSubcategories(product) {
  if (Array.isArray(product.subcategories) && product.subcategories.length) {
    return product.subcategories;
  }
  return product.subcategory ? [product.subcategory] : [];
}

function formatProductSubcategory(product) {
  return getProductSubcategories(product).join(" / ");
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
      <td>${row.pieces || (row.sizePieces ? Object.values(row.sizePieces).reduce((sum, value) => sum + Number(value || 0), 0) : "-")}</td>
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
  updateGenderFilters();
  buildCategoryFilters();
  renderProducts();
  bindEvents();
}

function updateGenderFilters() {
  const kidsFilter = genderFilters.querySelector('[data-value="NINOS"]');
  if (!kidsFilter) return;

  const showKids = isWinterCollection();
  kidsFilter.style.display = showKids ? '' : 'none';

  // Nunca dejamos activo Niños al volver a una colección que no lo admite.
  if (!showKids && activeGender === 'NINOS') {
    activeGender = 'all';
    genderFilters.querySelectorAll('.pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === 'all');
    });
  }
}

// ── CATEGORY FILTERS ────────────────────────────
function buildCategoryFilters() {
  const allBtn = document.createElement('button');
  allBtn.className = 'pill active';
  allBtn.dataset.filter = 'category';
  allBtn.dataset.value = 'all';
  allBtn.textContent = 'Todas';
  categoryFilters.appendChild(allBtn);

  const cats = [...new Set(getCollectionProducts().flatMap(getProductSubcategories))].sort();
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
      .flatMap(getProductSubcategories)
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
    const catOk = activeCategory === 'all' || getProductSubcategories(p).includes(activeCategory);
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
        <span class="card-badge-gender">${getGenderLabel(p.category)}</span>
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
        <p class="card-subcat">${formatProductSubcategory(p)}</p>
        <p class="card-name">${p.name}</p>
        ${p.orderNumber ? `<p class="card-code">Cód. ${p.orderNumber}</p>` : ''}
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

const modalImageCache = new Map();

function preloadModalImage(src, priority = 'auto') {
  if (!src) return Promise.resolve(false);
  if (modalImageCache.has(src)) return modalImageCache.get(src);

  const preload = new Image();
  preload.decoding = 'async';
  preload.fetchPriority = priority;
  const ready = new Promise(resolve => {
    preload.onload = () => resolve(true);
    preload.onerror = () => resolve(false);
  });
  modalImageCache.set(src, ready);
  preload.src = src;
  return ready;
}

// ── MODAL ────────────────────────────────────────
function openModal(p) {
  currentModalProduct = p;
  const inCart = cart.some(c => c.id === p.id);
  const modalEl = document.getElementById('product-modal');

  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-gender').textContent = getGenderLabel(p.category);
  document.getElementById('modal-subcat').textContent = formatProductSubcategory(p);
  document.getElementById('modal-collection').textContent = `${getActiveCollection().name.toUpperCase()} · ${getStockLabel(p).toUpperCase()}`;
  const modalCode = document.getElementById('modal-code');
  modalCode.textContent = p.orderNumber ? `Cód. ${p.orderNumber}` : '';
  modalCode.hidden = !p.orderNumber;
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
    [prevIdx, nextIdx].forEach(idx => preloadModalImage(gallerySrcs[idx], 'low'));
  }

  function fitModalToImage() {
    const ratioW = 3;
    const ratioH = 4;
    const ratio = ratioW / ratioH;
    const viewportW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const viewportH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const maxImageH = Math.min(viewportH * 0.86, 760);
    const infoW = 500;
    const gapW = 40;
    const maxModalW = Math.max(320, viewportW - gapW);
    const mediaW = Math.max(320, Math.min(maxImageH * ratio, 620, maxModalW - infoW));
    const modalW = Math.min(maxModalW, mediaW + infoW);

    modalImgWrap.style.aspectRatio = '3 / 4';
    modalEl.style.setProperty('--modal-media-w', `${Math.round(mediaW)}px`);
    modalEl.style.setProperty('--modal-w', `${Math.round(modalW)}px`);
  }

  function showGalleryImage(index) {
    if (!gallerySrcs.length) return;
    galleryIdx = index;
    const targetSrc = gallerySrcs[index];
    const isFirstImage = !modalImg.src || modalImg.style.display === 'none';

    preloadModalImage(targetSrc, 'high').then(loaded => {
      if (!loaded || galleryIdx !== index || currentModalProduct !== p) return;
      modalImg.src = targetSrc;
      fitModalToImage();
      modalImg.style.display = 'block';
      preloadNeighborImages();
    });

    if (isFirstImage) modalImg.style.display = 'none';
    updateDots();
    updateColorChips();
  }

  const colorGalleryIndices = new Set();
  colorsEl.querySelectorAll('.color-chip').forEach((chip, colorIndex) => {
    const galleryIndex = getColorGalleryIndex(p, colorIndex, gallerySrcs.length);
    chip.dataset.galleryIndex = galleryIndex ?? '';
    chip.disabled = galleryIndex === null;
    if (galleryIndex !== null) colorGalleryIndices.add(galleryIndex);
    chip.addEventListener('click', () => {
      if (galleryIndex !== null) showGalleryImage(galleryIndex);
    });
  });

  colorGalleryIndices.forEach(index => preloadModalImage(gallerySrcs[index], 'low'));

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
        <p class="cart-item-subcat">${formatProductSubcategory(p)}</p>
        <p class="cart-item-name">${p.name}</p>
        <p class="cart-item-gender">${getGenderLabel(p.category)}</p>
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
    lines.push(`   Categoría: ${formatProductSubcategory(p)} | ${getGenderLabel(p.category)}`);
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
    doc.text(`${getGenderLabel(p.category)} · ${formatProductSubcategory(p)}`, margin + 12, y);
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
      updateGenderFilters();
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
