/* ================================================
   BYE BYE — Catálogo Verano 2027
   script.js — Catalog, Cart, PDF, WhatsApp
   ================================================ */

// ── PRODUCT DATA ────────────────────────────────
// -- COLLECTIONS ----------------------------------
const collections = [
  { id: "invierno-2027", name: "Invierno", label: "FW 2027", tagline: "Abrigos y prendas de invierno.", type: "stock" },
  { id: "primavera-2027", name: "Primavera", label: "SP 2027", tagline: "Camperas para media estación.", type: "stock" },
  { id: "accesorios", name: "Accesorios", label: "ACCESSORIES", tagline: "Gorros, bolsos y mochilas.", type: "stock" },
  { id: "deportivo", name: "Deportivo", label: "SPORT", tagline: "Indumentaria deportiva.", type: "stock" },
  { id: "verano-2027", name: "Verano 2027", label: "SS 2027", tagline: "Made for summer.", type: "preorder" },
  { id: "produccion-invierno-2027", name: "Invierno 2027", label: "FW 2027", tagline: "Producción Invierno 2027.", type: "preorder" },
  { id: "sweaters-2027", name: "Sweaters 2027", label: "SWEATERS 2027", tagline: "Sweaters 2027.", type: "preorder" },
  { id: "hoodies-2027", name: "Hoodies 2027", label: "HOODIES 2027", tagline: "Hoodies 2027.", type: "preorder" }
];

const PREORDER_COLLECTION_IDS = new Set([
  "verano-2027",
  "produccion-invierno-2027",
  "sweaters-2027",
  "hoodies-2027"
]);

const SPRING_PRODUCT_IDS = [51, 53, 54, 58, 61, 62, 63, 66, 68, 77, 78];
const SPORTS_PRODUCT_IDS = [39, 51, 85, 86, 87];

const OUTERWEAR_SUBCATEGORY_BY_PRODUCT_ID = {
  47: "Camperas",
  48: "Camperas",
  49: "Camperas",
  50: "Camperas",
  52: "Tapados",
  53: "Camperas de cuero",
  54: "Trench",
  55: "Tapados",
  56: "Tapados",
  58: "Cazadoras",
  59: "Camperas",
  60: "Camperas",
  61: "Cazadoras",
  62: "Camperas de cuero",
  63: "Trench",
  64: "Tapados",
  65: "Tapados",
  66: "Trench",
  69: "Camperas",
  70: "Camperas",
  71: "Camperas",
  72: "Camperas",
  74: "Chalecos",
  75: "Chalecos",
  76: "Chalecos",
  77: "Camperas de cuero",
  78: "Camperas de cuero",
  79: "Chalecos",
  80: "Camperas",
  81: "Chalecos",
  82: "Chalecos",
  51: "Rompevientos"
};

const PRODUCT_DESCRIPTION_BY_ID = {
  47: "Parka acolchada de largo medio, con capucha, cierre frontal y bolsillos laterales.",
  48: "Parka matelaseada de corte recto, largo por encima de la rodilla, capucha y cierre frontal.",
  49: "Parka bicolor de largo a la cadera, con capucha, borde de pelo, cierre frontal y bolsillos amplios.",
  50: "Campera puffer corta con capucha, matelaseado horizontal, cierre frontal y bolsillos laterales.",
  51: "Rompevientos liviano con capucha, cierre frontal, puños y cintura elastizados.",
  52: "Tapado corto de paño, corte recto, capucha, botonadura frontal y bolsillos aplicados.",
  53: "Campera de cuero de corte recto, largo a la cadera, cuello camisero, cierre frontal y bolsillos laterales.",
  54: "Trench largo con solapas, cinturón regulable, cierre frontal y bolsillos laterales.",
  55: "Tapado de largo medio y corte recto, con capucha, botonadura frontal y bolsillos amplios.",
  56: "Tapado largo de corte recto, con cuello alto, cierre frontal y bolsillos laterales.",
  57: "Campera acolchada de calce amplio, con capucha, cierre frontal y bolsillos laterales.",
  58: "Cazadora liviana de corte corto, con cuello camisero en contraste y bolsillos frontales.",
  59: "Campera puffer de largo medio, con cuello alto, matelaseado horizontal, cierre frontal y bolsillos laterales.",
  60: "Parka larga con capucha, borde de pelo, cierre frontal y bolsillos amplios.",
  61: "Cazadora corta de tacto gamuzado, con cuello camisero, botonadura y bolsillos frontales.",
  62: "Campera de cuero oversize, con hombros amplios, cuello camisero y bolsillos frontales.",
  63: "Trench corto de estructura definida, con solapas y doble botonadura.",
  64: "Tapado largo con cuello envolvente, cinturón regulable y bolsillos laterales.",
  65: "Tapado extra largo con cuello amplio, cinturón regulable y bolsillos laterales.",
  66: "Trench largo con capucha, cinturón regulable, cierre frontal y bolsillos frontales.",
  67: "Campera de largo a la cadera, con capucha, cierre frontal y bolsillos laterales.",
  68: "Campera liviana de corte entallado y largo a la cadera, con cuello alto y cierre frontal.",
  69: "Campera puffer liviana de calce amplio, con cuello alto, cierre frontal, bolsillos laterales e interior contrastante.",
  70: "Campera puffer corta con capucha, cierre frontal y matelaseado horizontal.",
  71: "Campera puffer corta de largo a la cadera, con cuello alto, cierre frontal y bolsillos laterales.",
  72: "Campera puffer corta, de volumen compacto, con cuello alto y cierre frontal.",
  74: "Chaleco acolchado con cuello camisero en contraste, cierre frontal y bolsillos amplios.",
  75: "Chaleco de efecto cuero con cuello de corderito, cierre frontal y bolsillos laterales.",
  76: "Chaleco de efecto cuero de corte recto, con cuello de corderito y cierre frontal.",
  77: "Campera de cuero entallada, con cuello redondo, cierre frontal y largo a la cadera.",
  78: "Campera de cuero para hombre, de corte recto y largo a la cadera, con cuello alto y cierre frontal.",
  79: "Chaleco acolchado liviano con cuello alto, cierre frontal y bolsillos laterales.",
  80: "Campera puffer entallada de largo a la cadera, con capucha, cierre frontal y bolsillos laterales.",
  81: "Chaleco matelaseado de corte recto, con cuello alto, cierre frontal y bolsillos laterales.",
  82: "Chaleco acolchado con capucha, cierre frontal y ajuste regulable en el bajo.",
  84: "Campera puffer infantil con capucha, cierre frontal y bolsillos laterales.",
};

// -- EASY CATALOG CONTROL -------------------------
// Para poner un producto fuera de stock, agregá su número:
// const OUT_OF_STOCK_PRODUCT_IDS = [12, 43];
const OUT_OF_STOCK_PRODUCT_IDS = [1, 3, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 20, 21, 24, 25, 27, 28, 30, 33, 45, 46, 50, 51, 59, 78, 81, 85, 86, 101, 174];

// Stock agotado por variante. Los talles que no figuran acá continúan disponibles.
const OUT_OF_STOCK_COLORS = { 68: ["Negro"] };

const OUT_OF_STOCK_VARIANTS = {
  40: {
    Negro: ["S", "M", "L", "XL", "3XL"]
  },
  66: {
    Negro: ["S", "M", "L", "XL", "XXL"]
  }
};

// Para sacar un producto de la página sin borrarlo, agregá su número:
// const HIDDEN_PRODUCT_IDS = [7, 18];
const HIDDEN_PRODUCT_IDS = [31, 33, 57, 67, 239, 242, 246];

const products = [
  // ── MUJER ──
  {
    id: 1, name: "Set Algodón", category: "MUJER", subcategory: "Conjuntos",
    orderNumber: "T01",
    description: "Set de algodón de dos piezas y calce relajado.",
    colors: ["Blanco", "Melange", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 2, name: "Remera Broderie", category: "MUJER", subcategory: "Remeras",
    orderNumber: "T02",
    description: "Remera con detalle bordado tipo broderie.",
    colors: ["Blanco", "Celeste", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 3, name: "Remera Puntilla", category: "MUJER", subcategory: "Remeras",
    orderNumber: "T03",
    description: "Remera con terminaciones de encaje de puntilla.",
    colors: ["Blanco", "Celeste", "Amarillo", "Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 4, name: "Chomba Algodón", category: "MUJER", subcategory: "Remeras",
    orderNumber: "T04",
    description: "Chomba de algodón de manga corta con cuello camisero.",
    colors: ["Blanco", "Melange", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 5, name: "Chomba Tejida", category: "MUJER", subcategory: "Remeras",
    orderNumber: "T05",
    description: "Chomba tejida de manga corta con textura marcada.",
    colors: ["Crudo", "Beige", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 6, name: "Set Lino", category: "MUJER", subcategory: "Conjuntos",
    orderNumber: "T06",
    description: "Conjunto en lino premium. Liviano, transpirable y de líneas limpias.",
    colors: ["Blanco", "Lino", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 7, name: "Vestido Camisero", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "BZD0401",
    description: "Vestido camisero de corte relajado con botonadura frontal.",
    colors: ["Crudo", "Militar", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 8, name: "Chaleco Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Chalecos"],
    orderNumber: "D206",
    description: "Chaleco de lino parte del conjunto coordinado. Corte sastrero.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 9, name: "Pantalón Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    orderNumber: "D206P",
    description: "Pantalón de lino de pierna recta, parte del conjunto con chaleco.",
    colors: ["Blanco", "Beige", "Oliva", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 10, name: "Chaleco Sastrero", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Chalecos"],
    orderNumber: "S5280087",
    description: "Chaleco sastrero de estructura definida.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 11, name: "Musculosa Arandelas", category: "MUJER", subcategory: "Remeras",
    orderNumber: "S5280075",
    description: "Musculosa con detalle de arandelas metálicas.",
    colors: ["Blanco", "Crudo", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 12, name: "Enterito Cinto", category: "MUJER", subcategory: "Monos",
    orderNumber: "BZD0403",
    description: "Enterito de una pieza con cinto ajustable.",
    colors: ["Blanco", "Marrón", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 13, name: "Camisa Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Camisas"],
    orderNumber: "S5280050",
    description: "Camisa de lino parte del conjunto con jogger. Corte relajado.",
    colors: ["Blanco", "Crudo", "Khaki", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 14, name: "Jogger Lino Conjunto", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    orderNumber: "BZD0413",
    description: "Jogger de lino, parte del conjunto con camisa.",
    colors: ["Blanco", "Crudo", "Caqui", "Oliva", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 15, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    orderNumber: "BZD0421",
    description: "Pantalón de corte sastrero y pierna recta.",
    colors: ["Beige", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 16, name: "Short Brezo", category: "MUJER", subcategory: "Shorts",
    orderNumber: "BZD0426",
    description: "Short liviano de corte recto.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 17, name: "Enterito Escote V", category: "MUJER", subcategory: "Monos",
    orderNumber: "L620170",
    description: "Enterito de una pieza con escote en V.",
    colors: ["Estampa 1", "Beige", "Estampa 2", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 18, name: "Pantalón Broderie", category: "MUJER", subcategory: "Pantalones",
    orderNumber: "T88605",
    description: "Pantalón con detalle bordado tipo broderie.",
    colors: ["Blanco", "Celeste", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 19, name: "Vestido Volados", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "SL6004",
    description: "Vestido de gasa liviana con caída fluida.",
    colors: ["Estampa 1", "Estampa 2", "Camel", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 20, name: "Vestido Gasa Largo", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "TD1413",
    description: "Vestido largo confeccionado en gasa liviana.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 21, name: "Vestido Gasa Corto", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "TD1413",
    description: "Vestido corto confeccionado en gasa liviana.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 22, name: "Vestido Nudo", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "SL6010",
    description: "Vestido con detalle de nudo y calce ajustado.",
    colors: ["Blanco", "Rojo", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 23, name: "Vestido Básico", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "Z8099",
    description: "Vestido básico de corte recto y líneas simples.",
    colors: ["Blanco", "Negro", "Varios"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 24, name: "Vestido Camisero Largo", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "Z8069",
    description: "Vestido camisero largo con botonadura frontal.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 25, name: "Vestido Camisero Corto", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "Z8069",
    description: "Vestido camisero corto con botonadura frontal.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 26, name: "Set Lino Estampado", category: "MUJER", subcategory: "Conjuntos",
    orderNumber: "Z8166",
    description: "Conjunto de lino con estampados originales de la temporada.",
    colors: ["Estampa 1", "Estampa 2", "Camel", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 27, name: "Musculosa Nudo", category: "MUJER", subcategory: "Remeras",
    description: "Musculosa con detalle de nudo frontal.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },
  {
    id: 28, name: "Vestido Escote V", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "TD1008-R",
    description: "Vestido con escote en V profundo.",
    colors: ["Blanco", "Rojo", "Chocolate", "Negro"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 29, name: "Vestido Túnica", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "SL682-D",
    description: "Vestido tipo túnica de calce amplio.",
    colors: ["Estampa 1", "Estampa 2"],
    sizes: ["M"],
    driveLink: ""
  },
  {
    id: 30, name: "Vestido Trenza", category: "MUJER", subcategory: "Vestidos",
    orderNumber: "M26Z",
    description: "Vestido con detalle de trenza aplicada.",
    colors: ["Varios colores"],
    sizes: ["S", "M", "L"],
    driveLink: ""
  },
  {
    id: 31, name: "Set Estampado", category: "MUJER", subcategory: "Conjuntos",
    description: "Conjunto de dos piezas con estampado integral.",
    colors: ["Varios estampados"],
    sizes: ["S", "M", "L", "XL"],
    driveLink: ""
  },

  // ── HOMBRE ──
  {
    id: 32, name: "Bermuda Lino", category: "HOMBRE", subcategory: "Bermudas",
    orderNumber: "TE61092",
    description: "Bermuda de lino de corte recto.",
    colors: ["Oliva", "Khaki", "Gris Oscuro", "Marrón", "Blanco", "Gris Oliva", "Negro", "Crudo", "Beige"],
    sizes: ["30", "32", "34", "36"],
    driveLink: ""
  },
  {
    id: 33, name: "Camisa Lino", category: "HOMBRE", subcategory: "Camisas",
    orderNumber: "TE61091",
    description: "Camisa de lino de manga larga y caída natural.",
    colors: ["Blanco", "Beige", "Gris", "Gris Verdoso", "Celeste"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 34, name: "Chomba Jersey Lisa Plus", category: "HOMBRE", subcategory: "Chombas",
    orderNumber: "TE11814-BB PLUS",
    description: "Chomba lisa de jersey en talles XL a 4XL.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: ""
  },
  {
    id: 35, name: "Chomba Piqué Lisa", category: "HOMBRE", subcategory: "Chombas",
    orderNumber: "TE11810-BB",
    description: "Chomba de piqué lisa clásica. Colores neutros y vibrantes.",
    colors: ["Blanco", "Crudo", "Beige", "Melange", "Celeste", "Marino", "Oliva", "Petróleo", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 36, name: "Chomba Piqué Lisa Plus", category: "HOMBRE", subcategory: "Chombas",
    orderNumber: "TE11810-BB PLUS",
    description: "Chomba de piqué lisa en talles grandes. Misma calidad, mayor amplitud.",
    colors: ["Blanco", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["XL", "XXL", "3XL", "4XL"],
    driveLink: ""
  },
  {
    id: 37, name: "Chomba Piqué Penguin", category: "HOMBRE", subcategory: "Chombas",
    orderNumber: "TE11812-BB",
    description: "Chomba piqué con detalle tipo penguin. Diseño clásico y deportivo.",
    colors: ["Blanco", "Beige", "Celeste", "Melange", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 38, name: "Chomba Piqué Vivo", category: "HOMBRE", subcategory: "Chombas",
    orderNumber: "TE11811-BB",
    description: "Chomba piqué con vivos en contraste. Diseño deportivo elegante.",
    colors: ["Blanco vivo marino", "Beige vivo negro", "Melange vivo blanco", "Marino vivo blanco", "Negro vivo blanco"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 39, name: "Remera Deportiva", category: "HOMBRE", subcategory: "Remeras",
    orderNumber: "TE11038",
    description: "Remera técnica liviana de manga corta, cuello redondo y calce recto.",
    colors: ["Blanco", "Gris", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 40, name: "Remera Algodón", category: "HOMBRE", subcategory: "Remeras",
    orderNumber: "TT06",
    description: "Remera de algodón lisa. Del S al 6XL para todos los talles.",
    colors: ["Blanco", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
    driveLink: ""
  },
  {
    id: 41, name: "Pantalón Lino", category: "HOMBRE", subcategory: "Pantalones",
    orderNumber: "TE61093",
    description: "Pantalón de lino para hombre. Liviano, transpirable y elegante.",
    colors: ["Beige", "Oliva", "Gris Topo", "Gris", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 42, name: "Traje de Baño", category: "HOMBRE", subcategory: "Trajes de baño",
    orderNumber: "TE11915-BB",
    description: "Traje de baño liso y surf. Colores actuales de la temporada.",
    colors: ["Beige", "Gris", "Petroleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 43, name: "Camisa", category: "HOMBRE", subcategory: "Camisas",
    orderNumber: "CM0026",
    description: "Camisa liviana de hombre con cuello camisero y botonadura frontal.",
    colors: ["Blanco", "Rosa", "Celeste", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 44, name: "Traje de baño surf", category: "HOMBRE", subcategory: "Trajes de baño",
    orderNumber: "TE11918-BB",
    description: "Traje de baño surf liviano, con cintura elastizada y largo medio.",
    colors: ["Beige", "Gris", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 45, name: "Chomba Jersey Lisa", category: "HOMBRE", subcategory: "Chombas",
    orderNumber: "TE11814BB",
    description: "Chomba lisa de jersey con cuello camisero y manga corta.",
    colors: ["Blanco", "Beige", "Melange", "Celeste", "Petróleo", "Marino", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 46, name: "Pantalón Sastrero", category: "MUJER", subcategory: "Conjuntos", subcategories: ["Conjuntos", "Pantalones"],
    orderNumber: "BZD0415",
    description: "Pantalón sastrero de mujer, de pierna amplia y tiro alto.",
    colors: ["Blanco", "Beige", "Oliva", "Chocolate", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 85, name: "Buzo Deportivo Medio Cierre", category: "HOMBRE", subcategory: "Buzos",
    description: "Buzo deportivo de manga larga con cuello alto, medio cierre y detalles reflectivos en los antebrazos.",
    orderNumber: "10950",
    colors: ["Marino", "Gris Claro", "Blanco", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 86, name: "Short Deportivo Reflex", category: "HOMBRE", subcategory: "Shorts",
    description: "Short deportivo con cintura elastizada y bolsillos con cierre reflectivo.",
    orderNumber: "10942",
    colors: ["Marino", "Gris Claro", "Negro"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 87, name: "Short Deportivo Waterproof", category: "HOMBRE", subcategory: "Shorts",
    description: "Short deportivo con cintura elastizada, cordón ajustable y bolsillos con cierre waterproof.",
    orderNumber: "10945",
    colors: ["Negro", "Blanco", "Marino"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    driveLink: ""
  },
  {
    id: 249, name: "RICHARD HOOD BLOCK BOYS", category: "NINOS", subcategory: "Abrigos",
    description: "Campera puffer infantil con capucha y diseño en bloques de color.",
    colors: ["Beige/Negro", "Verde/Negro", "Azul/Negro"], sizes: ["6", "8", "10", "12", "14", "16"],
    orderNumber: "225-228", collection: "produccion-invierno-2027", images: ["images/prod_249_1.jpg"],
    packaging: { totalPieces: 18, totalLabel: "6 piezas por color · 18 piezas totales", rows: [
      { color: "Beige/Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Verde/Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Azul/Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } }
    ] }, driveLink: ""
  },
  {
    id: 250, name: "RICHARD HOOD BOYS", category: "NINOS", subcategory: "Abrigos",
    description: "Campera puffer infantil lisa con capucha.",
    colors: ["Negro", "Azul Marino", "Verde Oscuro"], sizes: ["6", "8", "10", "12", "14", "16"],
    orderNumber: "225-224", collection: "produccion-invierno-2027", images: ["images/prod_250_1.jpg"],
    packaging: { totalPieces: 18, totalLabel: "6 piezas por color · 18 piezas totales", rows: [
      { color: "Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Azul Marino", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Verde Oscuro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } }
    ] }, driveLink: ""
  },
  {
    id: 251, name: "MILAN HOOD TAFFETA BOYS", category: "NINOS", subcategory: "Abrigos",
    description: "Chaleco puffer infantil de tafeta con capucha.",
    colors: ["Negro", "Beige", "Azul Marino", "Gris Oscuro"], sizes: ["6", "8", "10", "12", "14", "16"],
    orderNumber: "226-264", collection: "produccion-invierno-2027", images: ["images/prod_251_1.jpg"],
    packaging: { totalPieces: 24, totalLabel: "6 piezas por color · 24 piezas totales", rows: [
      { color: "Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Beige", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Azul Marino", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Gris Oscuro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } }
    ] }, driveLink: ""
  },
  {
    id: 252, name: "HARRY HOOD JACKET BOYS", category: "NINOS", subcategory: "Abrigos",
    description: "Campera puffer infantil liviana con capucha y combinaciones de color.",
    colors: ["Verde/Azul", "Negro/Mostaza", "Azul/Rojo", "Verde/Gris"], sizes: ["6", "8", "10", "12", "14", "16"],
    orderNumber: "224-357", collection: "produccion-invierno-2027", images: ["images/prod_252_1.jpg", "images/prod_252_2.jpg", "images/prod_252_3.jpg", "images/prod_252_4.jpg"],
    packaging: { totalPieces: 24, totalLabel: "6 piezas por color · 24 piezas totales", rows: [
      { color: "Verde/Azul", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Negro/Mostaza", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Azul/Rojo", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Verde/Gris", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } }
    ] }, driveLink: ""
  },
  {
    id: 253, name: "CORVEL KIDS UNISEX SCHOOL", category: "NINOS", subcategory: "Abrigos",
    description: "Campera puffer escolar infantil unisex con capucha.",
    colors: ["Azul Marino", "Negro"], sizes: ["6", "8", "10", "12", "14", "16"],
    orderNumber: "226-198", collection: "produccion-invierno-2027", images: ["images/prod_253_1.jpg"],
    packaging: { totalPieces: 12, totalLabel: "6 piezas por color · 12 piezas totales", rows: [
      { color: "Azul Marino", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } }
    ] }, driveLink: ""
  },
  {
    id: 254, name: "LUSTRA GIRLS", category: "NINOS", subcategory: "Abrigos",
    description: "Campera puffer larga infantil para niña con capucha.",
    colors: ["Rosa", "Negro", "Gris Claro", "Violeta"], sizes: ["6", "8", "10", "12", "14", "16"],
    orderNumber: "125-379", collection: "produccion-invierno-2027", images: ["images/prod_254_1.jpg", "images/prod_254_2.jpg", "images/prod_254_3.jpg", "images/prod_254_4.jpg"],
    packaging: { totalPieces: 24, totalLabel: "6 piezas por color · 24 piezas totales", rows: [
      { color: "Rosa", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Negro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Gris Claro", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } },
      { color: "Violeta", sizePieces: { "6": 1, "8": 1, "10": 1, "12": 1, "14": 1, "16": 1 } }
    ] }, driveLink: ""
  }
];

const accessoryProducts = [
  { id: 88, name: "Gorro de Lana Acanalado", category: "UNISEX", subcategory: "Gorros", description: "Gorro de lana tejido en punto acanalado, de 20 cm de ancho por 29 cm de largo.", orderNumber: "10984", colors: ["Gris Claro", "Azul", "Marrón", "Chocolate", "Negro"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 89, name: "Gorro de Lana Corto", category: "UNISEX", subcategory: "Gorros", description: "Gorro de lana tejido en punto acanalado, de 17 cm de ancho por 27,5 cm de largo.", orderNumber: "10981", colors: ["Crema", "Beige", "Chocolate", "Celeste", "Azul Marino", "Gris Oscuro", "Negro"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 90, name: "Gorro de Lana Liso", category: "UNISEX", subcategory: "Gorros", description: "Gorro de lana de tejido liso, de 20 cm de ancho por 29 cm de largo.", orderNumber: "10923", colors: ["Gris Claro", "Beige", "Chocolate", "Azul Marino", "Negro"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 91, name: "Bolso Bandolera con Bolsillos Laterales", category: "UNISEX", subcategory: "Bolsos", description: "Bolso bandolera de 33 x 27 cm, con tres cierres y bolsillos laterales.", orderNumber: "10000", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 92, name: "Bolso Bandolera USB", category: "UNISEX", subcategory: "Bolsos", description: "Bolso bandolera de 32 x 23 cm, con tres cierres, entrada USB y salida para auriculares.", orderNumber: "9988", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 93, name: "Bolso Bandolera Compacto", category: "UNISEX", subcategory: "Bolsos", description: "Bolso bandolera de 32 x 26 cm con correa regulable y tres cierres.", orderNumber: "9991", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 94, name: "Bandolera de Cuatro Cierres", category: "UNISEX", subcategory: "Bandoleras", description: "Bandolera de 28 x 25 cm, con cuatro cierres y bolsillo trasero.", orderNumber: "9993", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 95, name: "Bandolera Vertical", category: "UNISEX", subcategory: "Bandoleras", description: "Bandolera vertical de 28 x 25 cm, con cuatro cierres y bolsillo trasero.", orderNumber: "9994", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 96, name: "Bandolera Amplia", category: "UNISEX", subcategory: "Bandoleras", description: "Bandolera de 48 x 36 cm, con tres cierres y bolsillo trasero.", orderNumber: "9995", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 97, name: "Bolso Bandolera TSA", category: "UNISEX", subcategory: "Bolsos", description: "Bolso bandolera de 42 x 27 cm, con tres cierres, cerradura TSA y entrada USB.", orderNumber: "9996", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 98, name: "Bolso Bandolera con Broche", category: "UNISEX", subcategory: "Bolsos", description: "Bolso bandolera de 42 x 27 cm, con cierre de broche, tres cierres y bolsillo interno.", orderNumber: "9998", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 99, name: "Riñonera de Tres Cierres", category: "UNISEX", subcategory: "Riñoneras", description: "Riñonera de 19 x 38 cm, con tres cierres, correa regulable y bolsillo interno.", orderNumber: "10004", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 100, name: "Mochila con Hebillas", category: "UNISEX", subcategory: "Mochilas", description: "Mochila con solapa y hebillas, dos cierres, bolsillos laterales, compartimento para notebook y 13 cm de profundidad.", orderNumber: "10010", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 101, name: "Mochila Porta Notebook", category: "UNISEX", subcategory: "Mochilas", description: "Mochila de 49 x 34 x 10 cm, con dos cierres, bolsillo lateral y compartimento para notebook.", orderNumber: "10014", colors: ["Negro"], sizes: ["Único"], collection: "accesorios", driveLink: "" },
  { id: 145, name: "Gorra Lavada", category: "UNISEX", subcategory: "Gorras", description: "", orderNumber: "TE11897", colors: ["Bordó", "Beige", "Verde", "Azul Marino", "Azul", "Celeste", "Negro", "Gris", "Marrón"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 146, name: "Gorra Cuadrille", category: "UNISEX", subcategory: "Gorras", description: "", orderNumber: "TE11900", colors: ["Rosa", "Celeste", "Azul", "Marrón", "Rosa Claro"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 147, name: "Gorra Rallas", category: "UNISEX", subcategory: "Gorras", description: "", orderNumber: "TE11901", colors: ["Rosa", "Celeste", "Azul", "Gris", "Beige"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 148, name: "Gorra Plush", category: "UNISEX", subcategory: "Gorras", description: "", orderNumber: "TE11902", colors: ["Blanco", "Negro", "Gris", "Rosa", "Beige"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 149, name: "Gorra Print", category: "UNISEX", subcategory: "Gorras", description: "", orderNumber: "TE11903", colors: ["Leopardo", "Chita"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" },
  { id: 150, name: "Gorra Corderito", category: "UNISEX", subcategory: "Gorras", description: "", orderNumber: "TE11904", colors: ["Crudo"], sizes: ["Único"], collection: "accesorios", preserveCatalogColors: true, driveLink: "" }
];

products.push(...accessoryProducts);

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
    5,
    6,
    7,
    8,
    9,
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
    4,
    5,
    6,
    8,
    9,
    10,
    11,
    12,
    14
  ],
  "36": [
    1,
    2,
    6,
    7,
    8,
    9,
    10
  ],
  "37": [
    1,
    2,
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
    4,
    5
  ],
  "41": [
    1,
    2,
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
  "173": [
    1,
    2,
    3
  ],
  "174": [
    1,
    2,
    3,
    4
  ],
  "175": [
    1,
    2,
    3
  ],
  "176": [
    1,
    2,
    3,
    4
  ],
  "177": [
    1,
    2,
    3
  ],
  "178": [
    1,
    2,
    3
  ],
  "179": [
    1,
    2,
    3
  ],
  "180": [
    1,
    2,
    3,
    4
  ],
  "181": [
    1,
    2,
    3
  ],
  "84": [
    1,
    2,
    3,
    4
  ],
  "85": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "86": [
    1,
    2,
    3,
    4,
    5
  ],
  "87": [
    1,
    2,
    3,
    4,
    5
  ]
};

Object.assign(productImagesById, {
  "88": [1, 2, 3, 4, 5, 6], "89": [1, 2, 3, 4, 5, 6, 7, 8], "90": [1, 2, 3, 4, 5, 6],
  "91": [1], "92": [1], "93": [1], "94": [1], "95": [1], "96": [1],
  "97": [1], "98": [1], "99": [1], "100": [1], "101": [1],
  "110": [1, 2],
  "111": [1, 2, 3],
  "112": [1, 2, 3],
  "114": [1, 2],
  "115": [1, 2],
  "116": [1, 2],
  "117": [1, 2, 3, 4],
  "119": [1, 2, 3],
  "120": [1, 2, 3],
  "121": [1, 2, 3],
  "123": [1, 2],
  "124": [1, 2],
  "126": [1, 2],
  "127": [1],
  "128": [1, 2],
  "129": [1, 2],
  "130": [1, 2, 3],
  "131": [1, 2, 3],
  "134": [1, 2, 3],
  "135": [1, 2],
  "145": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "146": [1, 2, 3, 4, 5],
  "147": [1, 2, 3, 4, 5],
  "148": [1, 2, 3, 4, 5, 6],
  "149": [1, 2],
  "150": [1],
  "151": [1, 2, 3],
  "152": [1, 2, 3],
  "153": [1, 2],
  "154": [1, 2, 3],
  "155": [1, 2, 3, 4],
  "156": [1, 2, 3],
  "157": [1, 2, 3],
  "158": [1, 2, 3, 4],
  "159": [1, 2, 3],
  "160": [1, 2],
  "161": [1, 2, 3],
  "162": [1, 2, 3, 4],
  "163": [1, 2, 3, 4],
  "164": [1, 2, 3, 4],
  "165": [1, 2, 3],
  "166": [1, 2, 3],
  "167": [1, 2],
  "168": [1, 2, 3],
  "169": [1, 2, 3, 4],
  "170": [1, 2, 3, 4],
  "171": [1, 2, 3],
  "172": [1, 2, 3, 4],
  "182": [1, 2, 3, 4],
  "183": [1, 2, 3],
  "184": [1],
  "185": [1, 2, 3],
  "186": [1, 2, 3, 4],
  "187": [1, 2, 3, 4],
  "188": [1, 2, 3, 4],
  "189": [1, 2, 3],
  "190": [1, 2, 3],
  "191": [1, 2, 3, 4],
  "192": [1, 2],
  "193": [1, 2, 3, 4],
  "194": [1, 2, 3, 4],
  "195": [1, 2, 3, 4],
  "196": [1, 2],
  "197": [1, 2, 3, 4],
  "198": [1, 2, 3, 4],
  "199": [1, 2, 3, 4],
  "200": [1, 2, 3, 4],
  "201": [1, 2, 3, 4],
  "202": [1, 2, 3, 4],
  "203": [1, 2, 3, 4],
  "205": [1, 2, 3, 4],
  "206": [1, 2, 3, 4],
  "208": [1, 2, 3, 4],
  "209": [1, 2, 3, 4, 5, 6],
  "210": [1, 2, 3],
  "255": [1, 2, 3],
  "256": [1, 2, 3],
  "257": [1, 2, 3],
  "258": [1, 2, 3],
  "259": [1, 2, 3],
  "260": [1, 2, 3, 4],
  "261": [1, 2, 3, 4],
  "262": [1, 2, 3, 4],
  "263": [1, 2, 3, 4],
  "264": [1, 2, 3],
  "265": [1, 2, 3],
  "211": [1, 2, 3],
  "212": [1, 2, 3],
  "213": [1, 2, 3],
  "214": [1, 2, 3],
  "215": [1, 2, 3],
  "216": [1, 2, 3],
  "217": [1, 2, 3],
  "218": [1, 2],
  "219": [1, 2, 3, 4, 5, 6, 7, 8, 9],
  "220": [1, 2, 3, 4, 5, 6],
  "221": [1, 2, 3, 4],
  "222": [1, 2, 3],
  "223": [1, 2, 3, 4],
  "224": [1, 2, 3, 4, 5],
  "225": [1, 2, 3, 4],
  "226": [1, 2, 3, 4],
  "227": [1, 2, 3, 4],
  "228": [3, 1, 2, 4],
  "229": [2, 1, 3, 4],
  "230": [1, 2, 3],
  "231": [1, 2, 3, 4],
  "232": [1, 2, 3, 4],
  "233": [1, 2, 3, 4],
  "234": [1, 2, 3, 4],
  "235": [1, 3, 4, 5, 6, 7],
  "236": [1, 2, 3, 4, 5, 6],
  "237": [1, 2, 3, 4, 5, 6],
  "238": [1, 2, 3, 4, 5, 6, 7, 8, 9],
  "239": [1, 2, 3, 4, 5, 6, 7, 8],
  "240": [1, 2, 3, 4, 5],
  "241": [1, 2, 3, 4, 5],
  "242": [1, 2, 3, 4],
  "243": [1, 2, 3, 4, 5, 6, 7, 8, 9],
  "244": [1, 2, 3, 4, 5],
  "245": [1, 2, 3],
  "246": [1, 2, 3],
  "247": [1, 2, 3, 4],
  "248": [1, 2, 3, 4],
  "249": [1, 2, 3],
  "250": [1, 2, 3],
  "251": [1, 2, 3, 4],
  "252": [1, 2, 3, 4],
  "253": [1, 2],
  "254": [1, 2, 3, 4]
});

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

const IMAGE_ASSET_VERSION = "20261103-modelos-seleccionados-01";
const MODEL_IMAGES_BY_PRODUCT_ID = {"156":["images/prod_156_model_1.jpg","images/prod_156_model_2.jpg","images/prod_156_model_3.jpg"],"162":["images/prod_162_model_1.jpg","images/prod_162_model_2.jpg","images/prod_162_model_3.jpg"],"159":["images/prod_159_model_1.jpg","images/prod_159_model_2.jpg","images/prod_159_model_3.jpg"],"124":["images/prod_124_model_1.jpg","images/prod_124_model_2.jpg","images/prod_124_model_3.jpg"],"110":["images/prod_110_model_1.jpg","images/prod_110_model_2.jpg","images/prod_110_model_3.jpg"],"117":["images/prod_117_model_1.jpg","images/prod_117_model_2.jpg","images/prod_117_model_3.jpg"],"111":["images/prod_111_model_1.jpg","images/prod_111_model_2.jpg","images/prod_111_model_3.jpg"],"157":["images/prod_157_model_1.jpg","images/prod_157_model_2.jpg","images/prod_157_model_3.jpg"],"154":["images/prod_154_model_1.jpg","images/prod_154_model_2.jpg","images/prod_154_model_3.jpg"],"166":["images/prod_166_model_1.jpg","images/prod_166_model_2.jpg","images/prod_166_model_3.jpg"],"205":["images/prod_205_model_1.jpg","images/prod_205_model_2.jpg","images/prod_205_model_3.jpg"],"206":["images/prod_206_model_1.jpg","images/prod_206_model_2.jpg","images/prod_206_model_3.jpg"],"202":["images/prod_202_model_1.jpg","images/prod_202_model_2.jpg","images/prod_202_model_3.jpg"],"171":["images/prod_171_model_1.jpg","images/prod_171_model_2.jpg","images/prod_171_model_3.jpg"],"158":["images/prod_158_model_1.jpg","images/prod_158_model_2.jpg","images/prod_158_model_3.jpg"],"152":["images/prod_152_model_1.jpg","images/prod_152_model_2.jpg","images/prod_152_model_3.jpg"],"121":["images/prod_121_model_1.jpg","images/prod_121_model_2.jpg","images/prod_121_model_3.jpg"],"197":["images/prod_197_model_1.jpg","images/prod_197_model_2.jpg","images/prod_197_model_3.jpg"],"208":["images/prod_208_model_1.jpg","images/prod_208_model_2.jpg","images/prod_208_model_3.jpg"],"203":["images/prod_203_model_1.jpg","images/prod_203_model_2.jpg","images/prod_203_model_3.jpg"],"161":["images/prod_161_model_1.jpg","images/prod_161_model_2.jpg","images/prod_161_model_3.jpg"],"114":["images/prod_114_model_1.jpg","images/prod_114_model_2.jpg","images/prod_114_model_3.jpg"],"168":["images/prod_168_model_1.jpg","images/prod_168_model_2.jpg","images/prod_168_model_3.jpg"],"118":["images/prod_118_model_1.jpg","images/prod_118_model_2.jpg","images/prod_118_model_3.jpg"],"167":["images/prod_167_model_1.jpg","images/prod_167_model_2.jpg","images/prod_167_model_3.jpg"],"119":["images/prod_119_model_1.jpg","images/prod_119_model_2.jpg","images/prod_119_model_3.jpg"],"160":["images/prod_160_model_1.jpg","images/prod_160_model_2.jpg","images/prod_160_model_3.jpg"],"165":["images/prod_165_model_1.jpg","images/prod_165_model_2.jpg","images/prod_165_model_3.jpg"],"155":["images/prod_155_model_1.jpg","images/prod_155_model_2.jpg","images/prod_155_model_3.jpg"],"260":["images/prod_260_model_1.jpg","images/prod_260_model_2.jpg","images/prod_260_model_3.jpg"],"164":["images/prod_164_model_1.jpg","images/prod_164_model_2.jpg","images/prod_164_model_3.jpg"],"151":["images/prod_151_model_1.jpg","images/prod_151_model_2.jpg","images/prod_151_model_3.jpg"],"120":["images/prod_120_model_1.jpg","images/prod_120_model_2.jpg","images/prod_120_model_3.jpg"],"112":["images/prod_112_model_1.jpg","images/prod_112_model_2.jpg","images/prod_112_model_3.jpg"],"163":["images/prod_163_model_1.jpg","images/prod_163_model_2.jpg","images/prod_163_model_3.jpg"],"172":["images/prod_172_model_1.jpg","images/prod_172_model_2.jpg","images/prod_172_model_3.jpg"],"215":["images/prod_215_model_1.jpg","images/prod_215_model_2.jpg","images/prod_215_model_3.jpg"],"212":["images/prod_212_model_1.jpg","images/prod_212_model_2.jpg","images/prod_212_model_3.jpg"],"10000":["images/prod_10000_model_1.jpg","images/prod_10000_model_2.jpg","images/prod_10000_model_3.jpg"],"264":["images/prod_264_model_1.jpg","images/prod_264_model_2.jpg","images/prod_264_model_3.jpg"],"183":["images/prod_183_model_1.jpg","images/prod_183_model_2.jpg","images/prod_183_model_3.jpg"],"243":["images/prod_243_model_1.jpg","images/prod_243_model_2.jpg","images/prod_243_model_3.jpg"],"188":["images/prod_188_model_1.jpg","images/prod_188_model_2.jpg","images/prod_188_model_3.jpg"],"240":["images/prod_240_model_1.jpg","images/prod_240_model_2.jpg","images/prod_240_model_3.jpg"],"237":["images/prod_237_model_1.jpg","images/prod_237_model_2.jpg","images/prod_237_model_3.jpg"],"236":["images/prod_236_model_1.jpg","images/prod_236_model_2.jpg","images/prod_236_model_3.jpg"],"135":["images/prod_135_model_1.jpg","images/prod_135_model_2.jpg","images/prod_135_model_3.jpg"],"129":["images/prod_129_model_1.jpg","images/prod_129_model_2.jpg","images/prod_129_model_3.jpg"],"80":["images/prod_80_model_1.jpg","images/prod_80_model_2.jpg","images/prod_80_model_3.jpg"],"134":["images/prod_134_model_1.jpg","images/prod_134_model_2.jpg","images/prod_134_model_3.jpg"],"142":["images/prod_142_model_1.jpg","images/prod_142_model_2.jpg","images/prod_142_model_3.jpg"],"190":["images/prod_190_model_1.jpg","images/prod_190_model_2.jpg","images/prod_190_model_3.jpg"],"176":["images/prod_176_model_1.jpg","images/prod_176_model_2.jpg","images/prod_176_model_3.jpg"],"174":["images/prod_174_model_1.jpg","images/prod_174_model_2.jpg","images/prod_174_model_3.jpg"],"144":["images/prod_144_model_1.jpg","images/prod_144_model_2.jpg","images/prod_144_model_3.jpg"],"259":["images/prod_259_model_1.jpg","images/prod_259_model_2.jpg","images/prod_259_model_3.jpg"],"130":["images/prod_130_model_1.jpg","images/prod_130_model_2.jpg","images/prod_130_model_3.jpg"],"185":["images/prod_185_model_1.jpg","images/prod_185_model_2.jpg","images/prod_185_model_3.jpg"],"184":["images/prod_184_model_1.jpg","images/prod_184_model_2.jpg","images/prod_184_model_3.jpg"],"180":["images/prod_180_model_1.jpg","images/prod_180_model_2.jpg","images/prod_180_model_3.jpg"],"219":["images/prod_219_model_1.jpg","images/prod_219_model_2.jpg","images/prod_219_model_3.jpg"],"223":["images/prod_223_model_1.jpg","images/prod_223_model_2.jpg","images/prod_223_model_3.jpg"],"222":["images/prod_222_model_1.jpg","images/prod_222_model_2.jpg","images/prod_222_model_3.jpg"],"127":["images/prod_127_model_1.jpg","images/prod_127_model_2.jpg","images/prod_127_model_3.jpg"],"143":["images/prod_143_model_1.jpg","images/prod_143_model_2.jpg","images/prod_143_model_3.jpg"],"265":["images/prod_265_model_1.jpg","images/prod_265_model_2.jpg","images/prod_265_model_3.jpg"],"136":["images/prod_136_model_1.jpg","images/prod_136_model_2.jpg","images/prod_136_model_3.jpg"],"191":["images/prod_191_model_1.jpg","images/prod_191_model_2.jpg","images/prod_191_model_3.jpg"],"220":["images/prod_220_model_1.jpg","images/prod_220_model_2.jpg","images/prod_220_model_3.jpg"],"244":["images/prod_244_model_1.jpg","images/prod_244_model_2.jpg","images/prod_244_model_3.jpg"],"248":["images/prod_248_model_1.jpg","images/prod_248_model_2.jpg","images/prod_248_model_3.jpg"],"232":["images/prod_232_model_1.jpg","images/prod_232_model_2.jpg","images/prod_232_model_3.jpg"],"128":["images/prod_128_model_1.jpg","images/prod_128_model_2.jpg","images/prod_128_model_3.jpg"],"226":["images/prod_226_model_1.jpg","images/prod_226_model_2.jpg","images/prod_226_model_3.jpg"],"153":["images/prod_153_model_1.jpg","images/prod_153_model_2.jpg","images/prod_153_model_3.jpg"],"221":["images/prod_221_model_1.jpg","images/prod_221_model_2.jpg","images/prod_221_model_3.jpg"],"182":["images/prod_182_model_1.jpg","images/prod_182_model_2.jpg","images/prod_182_model_3.jpg"],"178":["images/prod_178_model_1.jpg","images/prod_178_model_2.jpg","images/prod_178_model_3.jpg"],"177":["images/prod_177_model_1.jpg","images/prod_177_model_2.jpg","images/prod_177_model_3.jpg"],"193":["images/prod_193_model_1.jpg","images/prod_193_model_2.jpg","images/prod_193_model_3.jpg"],"140":["images/prod_140_model_1.jpg","images/prod_140_model_2.jpg","images/prod_140_model_3.jpg"],"189":["images/prod_189_model_1.jpg","images/prod_189_model_2.jpg","images/prod_189_model_3.jpg"],"75":["images/prod_75_model_1.jpg","images/prod_75_model_2.jpg","images/prod_75_model_3.jpg"],"76":["images/prod_76_model_1.jpg","images/prod_76_model_2.jpg","images/prod_76_model_3.jpg"],"210":["images/prod_210_model_1.jpg","images/prod_210_model_2.jpg","images/prod_210_model_3.jpg"],"179":["images/prod_179_model_1.jpg","images/prod_179_model_2.jpg","images/prod_179_model_3.jpg"],"175":["images/prod_175_model_1.jpg","images/prod_175_model_2.jpg","images/prod_175_model_3.jpg"],"186":["images/prod_186_model_1.jpg","images/prod_186_model_2.jpg","images/prod_186_model_3.jpg"],"173":["images/prod_173_model_1.jpg","images/prod_173_model_2.jpg","images/prod_173_model_3.jpg"],"231":["images/prod_231_model_1.jpg","images/prod_231_model_2.jpg","images/prod_231_model_3.jpg"],"224":["images/prod_224_model_1.jpg","images/prod_224_model_2.jpg","images/prod_224_model_3.jpg"],"234":["images/prod_234_model_1.jpg","images/prod_234_model_2.jpg","images/prod_234_model_3.jpg"],"238":["images/prod_238_model_1.jpg","images/prod_238_model_2.jpg","images/prod_238_model_3.jpg"],"227":["images/prod_227_model_1.jpg","images/prod_227_model_2.jpg","images/prod_227_model_3.jpg"],"195":["images/prod_195_model_1.jpg","images/prod_195_model_2.jpg","images/prod_195_model_3.jpg"],"196":["images/prod_196_model_1.jpg","images/prod_196_model_2.jpg","images/prod_196_model_3.jpg"],"132":["images/prod_132_model_1.jpg","images/prod_132_model_2.jpg","images/prod_132_model_3.jpg"],"194":["images/prod_194_model_1.jpg","images/prod_194_model_2.jpg","images/prod_194_model_3.jpg"],"235":["images/prod_235_model_1.jpg","images/prod_235_model_2.jpg","images/prod_235_model_3.jpg"],"233":["images/prod_233_model_1.jpg","images/prod_233_model_2.jpg","images/prod_233_model_3.jpg"],"187":["images/prod_187_model_1.jpg","images/prod_187_model_2.jpg","images/prod_187_model_3.jpg"],"228":["images/prod_228_model_1.jpg","images/prod_228_model_2.jpg","images/prod_228_model_3.jpg"],"229":["images/prod_229_model_1.jpg","images/prod_229_model_2.jpg","images/prod_229_model_3.jpg"],"230":["images/prod_230_model_1.jpg","images/prod_230_model_2.jpg","images/prod_230_model_3.jpg"]};

function prependModelImagesToGallery(productId, gallery = {}) {
  const modelSources = (MODEL_IMAGES_BY_PRODUCT_ID[productId] || []).map(versionImageSrc);
  if (!modelSources.length) return gallery;

  const existingSources = (gallery.sources || []).filter(source => {
    const path = String(source).split("?")[0];
    return !modelSources.some(modelSource => modelSource.split("?")[0] === path);
  });
  const offset = modelSources.length;
  const photoNumbers = gallery.photoNumbers || [];
  const colorMap = gallery.colorMap || {};
  const colorGalleryIndexByNormalizedColor = {};

  Object.entries(colorMap).forEach(([color, photoNumber]) => {
    const existingIndex = gallery.colorGalleryIndexByNormalizedColor?.[normalizeColorName(color)];
    const baseIndex = existingIndex != null ? existingIndex : photoNumbers.indexOf(Number(photoNumber));
    if (baseIndex >= 0) colorGalleryIndexByNormalizedColor[normalizeColorName(color)] = baseIndex + offset;
  });

  Object.entries(gallery.colorGalleryIndexByNormalizedColor || {}).forEach(([color, index]) => {
    colorGalleryIndexByNormalizedColor[color] = Number(index) + offset;
  });

  return {
    ...gallery,
    sources: [...modelSources, ...existingSources],
    colorGalleryIndexByNormalizedColor
  };
}


const PRODUCTION_2027_IMAGE_SOURCE_BY_PRODUCT_ID = {
  118: 48,  // Merano
  125: 70,  // Felipe Hood con Piel Fina
  132: 72,  // Messika
  138: 80,  // Sirena Hood
  142: 66   // Trench Elena
};

const PRODUCTION_2027_ADDITIONAL_IMAGES_BY_PRODUCT_ID = {
  125: [1, 2, 3],
  132: [1],
  133: [1, 2, 3],
  136: [1, 2, 3, 4],
  137: [1, 2],
  138: [1, 2, 3],
  139: [1, 2],
  140: [1, 2, 3],
  142: [1, 2, 3],
  143: [1, 2],
  144: [1, 2, 3],
  153: [1, 2]
};

const PRODUCTION_2027_ADDITIONAL_COLOR_IMAGES_BY_PRODUCT_ID = {
  125: { "Marino": 1, "Chocolate": 2, "Beige": 3 },
  132: { "Chocolate": 1 },
  133: { "Negro": 1, "Militar Oscuro": 2, "Chocolate": 3 },
  136: { "Caqui": 1, "Caqui Claro": 2, "Negro": 3, "Militar": 4 },
  137: { "Negro": 1, "Caqui": 2 },
  138: { "Negro con Oliva": 1, "Oliva con Beige": 2, "Beige con Caqui": 3 },
  139: { "Chocolate": 1, "Negro": 2 },
  140: { "Camel": 1, "Negro": 2, "Chocolate": 3 },
  142: { "Camel": 1, "Chocolate": 2, "Piedra": 3 },
  143: { "Negro": 1, "Chocolate": 2 },
  144: { "Caqui": 1, "Negro": 2, "Chocolate": 3 },
  153: { "Negro": 1, "Chocolate": 2 },
  172: { "Negro": 1, "Oliva": 2, "Chocolate": 3, "Piedra": 4 }
};

function versionImageSrc(src) {
  return `${src}?v=${IMAGE_ASSET_VERSION}`;
}

const productImageExtensionByKey = {
  "155_1": "png",
  "155_2": "png",
  "155_3": "png",
  "155_4": "png",

  "154_1": "png",
  "154_2": "png",
  "154_3": "png",
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
  "38_9": "jpeg",
  "182_1": "png",
  "182_2": "png",
  "182_3": "png",
  "182_4": "png",
  "183_1": "png",
  "183_2": "png",
  "183_3": "png",
  "184_1": "png",
  "185_1": "png",
  "185_2": "png",
  "185_3": "png"
};

function getProductImagePhotoNumbers(id) {
  return productImagesById[String(id)] || [];
}

function getProductImageSources(id) {
  const cloudProduct = products.find(item => item.id === id && item.cloudManaged);
  if (cloudProduct?.gallery) return cloudProduct.gallery.sources || [];
  const sourceProductId = PRODUCTION_2027_IMAGE_SOURCE_BY_PRODUCT_ID[id] || id;
  return getProductImagePhotoNumbers(sourceProductId).map(photoNumber => {
    const extension = productImageExtensionByKey[`${sourceProductId}_${photoNumber}`] || "jpg";
    return versionImageSrc(`images/prod_${sourceProductId}_${photoNumber}.${extension}`);
  });
}

// Foto principal por color. El numero corresponde a prod_ID_NUMERO.
const colorImageByProductId = {
  124: { "Negro": 1, "Marino": 2 },
  259: { "Oliva": 1, "Negro": 2, "Caqui": 3 },
  260: { "Negro": 1, "Marino": 2, "Oliva": 3, "Chocolate": 4 },
  261: { "Negro": 1, "Marino": 2, "Oliva": 3, "Chocolate": 4 },
  262: { "Negro": 1, "Marino": 2, "Caqui": 3, "Rosa": 4 },
  263: { "Negro": 1, "Marino": 2, "Rosa": 3, "Caqui": 4 },
  264: { "Negro": 1, "Verde Menta": 2, "Beige": 3 },
  265: { "Negro": 1, "Verde Menta": 2, "Malva": 3 },
  158: { "Negro/Camel": 1, "Oliva/Azul": 2, "Marino/Rojo": 3, "Beige/Oliva": 4 },
  160: { "Marrón": 1, "Negro": 2 },
  161: { "Camel": 1, "Negro": 2, "Chocolate": 3 },
  162: { "Camel": 1, "Chocolate": 2, "Negro": 3, "Marrón": 4 },
  163: { "Negro/Bordó": 1, "Negro": 2, "Gris/Negro": 3, "Beige/Negro": 4 },
  164: { "Beige": 1, "Chocolate": 2, "Camel": 3, "Negro": 4 },
  159: { "Oliva": 1, "Negro": 2, "Gris": 3 },
  165: { "Gris Oscuro": 1, "Beige": 2, "Negro": 3 },
  166: { "Negro/Beige": 1, "Azul/Blanco": 2, "Rojo/Azul": 3 },
  167: { "Negro": 1, "Chocolate": 2 },
  169: { "Chocolate": 1, "Marrón": 2, "Camel": 3, "Negro": 4 },
  170: { "Crudo/Marino": 1, "Negro/Marino": 2, "Marino": 3, "Negro": 4 },
  171: { "Negro": 1, "Beige/Negro": 2, "Oliva/Negro": 3 },
  168: { "Camel/Crudo": 1, "Chocolate/Crudo": 2, "Negro/Crudo": 3 },
  157: { "Negro": 1, "Camel": 2, "Oliva": 3 },
  156: { "Negro": 1, "Gris": 2, "Oliva": 3 },
  155: { "Negro": 1, "Melange claro": 2, "Melange oscuro": 3, "Beige": 4 },
  154: { "Negro": 1, "Chocolate": 2, "Camel": 3 },
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
  82: { "Negro": 3, "Vino": 4, "Leche": 5, "Gris": 6 },
  85: { "Blanco": 3, "Gris Claro": 4, "Negro": 5, "Marino": 6, "Azul Marino": 6 },
  86: { "Gris": 3, "Gris Claro": 3, "Marino": 4, "Negro": 5 },
  87: { "Negro": 3, "Blanco": 4, "Marino": 5 },
  88: { "Gris Claro": 2, "Azul": 3, "Marrón": 4, "Chocolate": 5, "Negro": 6 },
  89: { "Crema": 2, "Beige": 3, "Chocolate": 4, "Celeste": 5, "Azul Marino": 6, "Gris Oscuro": 7, "Negro": 8 },
  90: { "Gris Claro": 2, "Beige": 3, "Chocolate": 4, "Azul Marino": 5, "Negro": 6 },
  145: { "Bordó": 1, "Beige": 3, "Verde": 4, "Azul Marino": 5, "Azul": 6, "Celeste": 7, "Negro": 8, "Gris": 9, "Marrón": 10 },
  146: { "Rosa": 1, "Celeste": 2, "Azul": 3, "Marrón": 4, "Rosa Claro": 5 },
  147: { "Rosa": 1, "Celeste": 2, "Azul": 3, "Gris": 4, "Beige": 5 },
  148: { "Blanco": 1, "Negro": 2, "Gris": 4, "Rosa": 5, "Beige": 6 },
  149: { "Leopardo": 1, "Chita": 2 },
  150: { "Crudo": 1 },
  110: { "Negro": 1, "Marino": 2, "Azul": 2 },
  111: { "Negro": 1, "Chocolate": 2, "Gris Oscuro": 3 },
  112: { "Gris Oscuro": 1, "Chocolate": 2, "Negro": 3 },
  114: { "Negro": 1, "Chocolate": 2 },
  115: { "Negro": 1, "Gris Oscuro": 2 },
  116: { "Gris Oscuro": 1, "Negro": 2 },
  117: { "Gris": 1, "Negro": 2, "Caqui": 3, "Marino": 4 },
  119: { "Negro": 1, "Gris Oscuro": 2, "Oliva": 3 },
  120: { "Negro": 1, "Gris Oscuro": 2, "Oliva": 3 },
  121: { "Negro": 1, "Marino": 2, "Gris Oscuro": 3 },
  123: { "Negro": 1, "Marino": 2 },
  126: { "Negro": 1, "Marino": 2 },
  127: { "Negro": 1 },
  128: { "Chocolate": 1, "Negro": 2 },
  129: { "Chocolate": 1, "Negro": 2 },
  130: { "Negro": 1, "Beige": 2, "Caqui": 3 },
  131: { "Caqui": 1, "Negro": 2, "Beige": 3 },
  134: { "Negro": 1, "Chocolate": 2, "Beige": 3 },
  135: { "Negro": 1, "Chocolate": 2 },
  151: { "Negro": 1, "Marino": 2, "Gris Oscuro": 3 },
  152: { "Negro": 1, "Marino": 2, "Gris Oscuro": 3 },
  153: { "Negro": 1, "Chocolate": 2 },
  172: { "Negro": 1, "Oliva": 2, "Chocolate": 3, "Piedra": 4 },
  173: { "Camel": 1, "Chocolate": 2, "Negro": 3 },
  174: { "Negro": 1, "Oliva": 2, "Café": 3, "Caqui": 4 },
  175: { "Camel": 1, "Negro": 2, "Marrón": 3 },
  176: { "Beige": 1, "Camel": 2, "Melange": 3, "Negro": 4 },
  177: { "Marrón": 1, "Negro": 2, "Camel": 3 },
  178: { "Chocolate": 1, "Camel": 2, "Negro": 3 },
  179: { "Negro": 1, "Marrón": 2, "Camel": 3 },
  180: { "Chocolate": 1, "Negro": 2, "Beige": 3, "Camel": 4 },
  181: { "Negro": 1, "Piedra": 2, "Marrón": 3 },
  182: { "Negro": 1, "Camel": 2, "Marrón": 3, "Bronce": 4 },
  183: { "Camel": 1, "Marfil": 2, "Negro": 3 },
  184: { "Crudo": 1 },
  185: { "Negro": 1, "Chocolate": 2, "Champagne": 3 },
  186: { "Negro": 1, "Camel": 2, "Chocolate": 3, "Caqui": 4 },
  187: { "Negro": 1, "Caqui": 2, "Arena": 3, "Oliva": 4 },
  188: { "Negro": 1, "Arena": 2, "Bordó": 3, "Oliva": 4 },
  189: { "Negro": 1, "Marrón": 2, "Chocolate": 3 },
  190: { "Negro": 1, "Crudo": 2, "Camel": 3 },
  191: { "Negro": 1, "Rosa Pálido": 2, "Marrón Claro": 3, "Beige": 4 },
  192: { "Negro": 1, "Chocolate": 2 },
  193: { "Negro": 1, "Caqui": 2, "Marrón": 3, "Camel": 4 },
  194: { "Negro": 1, "Militar": 2, "Caqui": 3, "Café": 4 },
  195: { "Negro": 1, "Marino": 2, "Arena": 3, "Oliva": 4 },
  196: { "Avena": 1, "Arena": 2 },
  197: { "Negro": 1, "Azul Marino": 2, "Gris": 3, "Beige": 4 },
  198: { "Negro": 1, "Celeste": 2, "Chocolate": 3, "Militar": 4 },
  199: { "Azul Marino": 1, "Negro": 2, "Gris": 3, "Beige": 4 },
  200: { "Celeste": 1, "Negro": 2, "Chocolate": 3, "Militar": 4 },
  201: { "Negro": 1, "Gris": 2, "Azul Marino": 3, "Beige": 4 },
  202: { "Azul Marino": 1, "Negro": 2, "Gris": 3, "Beige": 4 },
  203: { "Negro": 1, "Azul Marino": 2, "Gris": 3, "Beige": 4 },
  205: { "Beige": 1, "Negro": 2, "Azul Marino": 3, "Gris": 4 },
  206: { "Negro": 1, "Azul Marino": 2, "Gris": 3, "Beige": 4 },
  208: { "Negro": 1, "Azul Marino": 2, "Gris": 3, "Beige": 4 },
  209: { "Chocolate": 5, "Negro": 6 },
  210: { "Melange": 1, "Negro": 2, "Beige": 3 },
  255: { "Negro": 1, "Azul Marino": 2, "Gris": 3 },
  256: { "Negro": 1, "Azul Marino": 2, "Gris": 3 },
  257: { "Negro": 1, "Azul Marino": 2, "Gris": 3 },
  258: { "Negro": 1, "Azul Marino": 2, "Gris": 3 },
  211: { "Melange Oscuro": 1, "Negro": 2, "Azul Marino": 3 },
  212: { "Negro": 1, "Melange Claro": 2, "Chocolate": 3 },
  213: { "Azul Marino": 1, "Negro": 2, "Melange Claro": 3 },
  214: { "Negro": 1, "Azul Marino": 2, "Melange Oscuro": 3 },
  215: { "Melange Claro": 1, "Chocolate": 2, "Negro": 3 },
  219: { "Negro": 1, "Chocolate": 2, "Melange": 3, "Avena Oscuro": 4, "Avena": 5, "Marfil": 6, "Celeste": 7, "Rojo": 8 },
  220: { "Melange Oscuro": 1, "Café": 2, "Avena Oscuro": 3, "Avena": 4, "Marfil": 5, "Negro": 6 },
  221: { "Negro": 1, "Chocolate": 2, "Avena": 3, "Marfil": 4 },
  222: { "Negro": 1, "Chocolate": 2, "Marfil": 3 },
  223: { "Chocolate": 1, "Avena": 2, "Marfil": 3, "Negro": 4 },
  224: { "Negro": 1, "Chocolate": 2, "Avena": 3, "Verde": 4, "Avena Oscuro": 5 },
  225: { "Chocolate": 1, "Negro": 2, "Avena": 3, "Marfil": 4 },
  226: { "Marino": 1, "Marfil": 2, "Negro": 3, "Gris": 4 },
  227: { "Avena / Marfil / Rosa": 1, "Chocolate / Avena / Marfil": 2, "Camel / Avena / Marfil": 3, "Avena / Chocolate / Celeste": 4 },
  228: { "Gris": 1, "Negro": 2, "Chocolate": 3, "Avena": 4 },
  229: { "Avena Oscuro": 1, "Chocolate": 2, "Melange": 3, "Negro": 4 },
  230: { "Chocolate": 1, "Negro": 2, "Avena": 3 },
  231: { "Avena Claro": 1, "Negro": 2, "Chocolate": 3, "Marfil": 4 },
  232: { "Avena Claro": 1, "Negro": 2, "Chocolate Oscuro": 3, "Marfil": 4 },
  233: { "Avena Claro": 1, "Negro": 2, "Chocolate Oscuro": 3, "Marfil": 4 },
  234: { "Avena Claro": 1, "Negro": 2, "Chocolate": 3, "Marfil": 4 },
  235: { "Marfil": 1, "Chocolate": 3, "Crudo": 4, "Avena Claro": 5, "Celeste": 6, "Negro": 7 },
  236: { "Avena Claro": 1, "Negro": 2, "Chocolate": 3, "Marfil": 4, "Pistacho": 5, "Gris": 6 },
  237: { "Crudo": 1, "Avena": 2, "Chocolate": 3, "Negro": 4, "Avena Oscuro": 5, "Celeste": 6 },
  238: { "Avena Claro": 1, "Negro": 2, "Marfil": 3, "Pistacho": 4, "Gris": 5, "Avena Oscuro": 6, "Chocolate": 7, "Celeste": 8, "Chocolate Oscuro": 9 },
  239: { "Marfil": 1, "Gris": 2, "Chocolate": 3, "Latte": 4, "Negro": 5, "Rojo": 6, "Azul Marino": 7, "Avena": 8 },
  240: { "Beige": 1, "Visón": 2, "Negro": 4, "Marfil": 5 },
  241: { "Crudo": 1, "Marrón": 2, "Negro": 3, "Visón": 4, "Beige": 5 },
  242: { "Marfil": 1, "Chocolate": 2, "Negro": 3, "Gris": 4 },
  243: { "Marfil": 1, "Avena": 2, "Tostado": 3, "Negro": 4, "Azul Marino": 5, "Gris Oscuro": 6, "Celeste": 7, "Lima": 8, "Chocolate": 9 },
  244: { "Chocolate": 1, "Azul Marino": 2, "Marfil": 3, "Beige Muestra": 4, "Negro": 5 },
  216: { "Azul Marino": 1, "Melange Oscuro": 2, "Negro": 3 },
  217: { "Negro": 1, "Melange Claro": 2, "Azul Marino": 3 },
  218: { "Negro": 1, "Chocolate": 2 },
  245: { "Marfil": 1, "Chocolate": 2, "Negro": 3 },
  246: { "Chocolate con Vivo Marfil": 1, "Negro con Vivo Marfil": 2, "Avena con Vivo Chocolate": 3 },
  247: { "Negro": 1, "Marfil": 2, "Chocolate": 3, "Gris": 4 },
  248: { "Chocolate con Amarillo": 1, "Marfil con Beige y Chocolate": 2, "Marfil con Beige y Lima": 3, "Negro y Blanco": 4 },
  249: { "Verde/Negro": 1, "Beige/Negro": 2, "Azul/Negro": 3 },
  250: { "Verde Oscuro": 1, "Negro": 2, "Azul Marino": 3 },
  251: { "Beige": 1, "Azul Marino": 2, "Gris Oscuro": 3, "Negro": 4 },
  252: { "Verde/Azul": 1, "Negro/Mostaza": 2, "Verde/Gris": 3, "Azul/Rojo": 4 },
  253: { "Azul Marino": 1, "Negro": 2 },
  254: { "Negro": 1, "Gris Claro": 2, "Violeta": 3, "Rosa": 4 }
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

function getProduction2027Gallery(product, colors, option = null) {
  if (product.cloudManaged && (option?.gallery || product.gallery)) {
    const savedGallery = { colorMap: {}, photoNumbers: [], ...((option?.gallery) || product.gallery) };
    const alreadyContainsImportedModels = (savedGallery.sources || []).some(source => /\/prod_\d+_model_\d+\.(?:jpg|jpeg|png|webp)(?:\?|$)/i.test(String(source)));
    if (product.galleryOrderManaged || alreadyContainsImportedModels) return savedGallery;
    return prependModelImagesToGallery(
      product.id,
      savedGallery
    );
  }
  const onlyColorLinkedPhotos = (product.collection === "produccion-invierno-2027" || product.onlyColorLinkedPhotos || option?.imageProductId) && colors.length > 0;
  const optionImageProductId = option?.imageProductId || product.id;
  const mappedSourceProductId = PRODUCTION_2027_IMAGE_SOURCE_BY_PRODUCT_ID[optionImageProductId];
  const sourceProductId = mappedSourceProductId || optionImageProductId;
  const allPhotoNumbers = getProductImagePhotoNumbers(sourceProductId);
  const colorMap = colorImageByProductId[sourceProductId] || {};
  if (!mappedSourceProductId && !onlyColorLinkedPhotos) {
    return prependModelImagesToGallery(product.id, {
      sourceProductId,
      photoNumbers: allPhotoNumbers,
      sources: getProductImageSources(sourceProductId),
      colorMap
    });
  }
  const assignedPhotoNumbers = new Set(Object.values(colorMap).map(Number));
  const matchingPhotoNumbers = new Set();

  colors.forEach(color => {
    const normalizedColor = normalizeColorName(color);
    const match = Object.entries(colorMap).find(([mappedColor]) => {
      return normalizeColorName(mappedColor) === normalizedColor;
    });
    if (match) matchingPhotoNumbers.add(Number(match[1]));
  });

  const photoNumbers = allPhotoNumbers.filter(photoNumber => {
    if (onlyColorLinkedPhotos) return matchingPhotoNumbers.has(Number(photoNumber));
    return !assignedPhotoNumbers.has(Number(photoNumber)) || matchingPhotoNumbers.has(Number(photoNumber));
  });
  const sources = photoNumbers.map(photoNumber => {
    const extension = productImageExtensionByKey[`${sourceProductId}_${photoNumber}`] || "jpg";
    return versionImageSrc(`images/prod_${sourceProductId}_${photoNumber}.${extension}`);
  });

  const colorGalleryIndexByNormalizedColor = {};
  colors.forEach(color => {
    const normalizedColor = normalizeColorName(color);
    const match = Object.entries(colorMap).find(([mappedColor]) => {
      return normalizeColorName(mappedColor) === normalizedColor;
    });
    if (!match) return;
    const index = photoNumbers.indexOf(Number(match[1]));
    if (index >= 0) colorGalleryIndexByNormalizedColor[normalizedColor] = index;
  });

  const allAdditionalPhotoNumbers = PRODUCTION_2027_ADDITIONAL_IMAGES_BY_PRODUCT_ID[product.id] || [];
  const additionalColorMap = PRODUCTION_2027_ADDITIONAL_COLOR_IMAGES_BY_PRODUCT_ID[product.id] || {};
  const assignedAdditionalPhotoNumbers = new Set(Object.values(additionalColorMap).map(Number));
  const matchingAdditionalPhotoNumbers = new Set();
  colors.forEach(color => {
    const normalizedColor = normalizeColorName(color);
    const match = Object.entries(additionalColorMap).find(([mappedColor]) => {
      return normalizeColorName(mappedColor) === normalizedColor;
    });
    if (match) matchingAdditionalPhotoNumbers.add(Number(match[1]));
  });
  const additionalPhotoNumbers = allAdditionalPhotoNumbers.filter(photoNumber => {
    if (onlyColorLinkedPhotos) return matchingAdditionalPhotoNumbers.has(Number(photoNumber));
    return !assignedAdditionalPhotoNumbers.has(Number(photoNumber)) || matchingAdditionalPhotoNumbers.has(Number(photoNumber));
  });
  additionalPhotoNumbers.forEach(photoNumber => {
    const extension = productImageExtensionByKey[`${product.id}_${photoNumber}`] || "jpg";
    sources.push(versionImageSrc(`images/prod_${product.id}_${photoNumber}.${extension}`));
  });
  Object.entries(additionalColorMap).forEach(([color, photoNumber]) => {
    if (!colors.some(optionColor => normalizeColorName(optionColor) === normalizeColorName(color))) return;
    const additionalIndex = additionalPhotoNumbers.indexOf(Number(photoNumber));
    if (additionalIndex >= 0) {
      colorGalleryIndexByNormalizedColor[normalizeColorName(color)] = photoNumbers.length + additionalIndex;
    }
  });

  return prependModelImagesToGallery(product.id, {
    sourceProductId, photoNumbers, sources, colorMap, colorGalleryIndexByNormalizedColor
  });
}

function getDisplayProductImageSources(product) {
  const selectedOption = product?.selectedPurchaseOption || null;
  if (selectedOption) {
    return getProduction2027Gallery(product, selectedOption.colors || [], selectedOption).sources;
  }
  if (MODEL_IMAGES_BY_PRODUCT_ID[product?.id] || product?.collection === "produccion-invierno-2027") {
    return getProduction2027Gallery(product, product.colors || []).sources;
  }
  return getProductImageSources(product?.id);
}

function getProduction2027ColorGalleryIndex(gallery, color) {
  const normalizedColor = normalizeColorName(color);
  if (gallery.colorGalleryIndexByNormalizedColor?.[normalizedColor] != null) {
    return gallery.colorGalleryIndexByNormalizedColor[normalizedColor];
  }
  const match = Object.entries(gallery.colorMap).find(([mappedColor]) => {
    return normalizeColorName(mappedColor) === normalizedColor;
  });
  if (!match) return null;
  const index = gallery.photoNumbers.indexOf(Number(match[1]));
  return index >= 0 ? index : null;
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
    purchaseOptions: [
      {
        id: "ana-caja-camel",
        label: "Caja Camel",
        colors: ["Camel"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        packaging: {
          totalPieces: 48,
          rows: [{ color: "Camel", sizePieces: { S: 6, M: 12, L: 12, XL: 12, XXL: 6 } }]
        }
      },
      {
        id: "ana-caja-chocolate",
        label: "Caja Chocolate",
        colors: ["Chocolate"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        packaging: {
          totalPieces: 24,
          rows: [{ color: "Chocolate", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 } }]
        }
      }
    ],
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
  },
  {
    id: 209, name: "Ebele", category: "MUJER", subcategory: "Abrigos",
    description: "Campera larga de invierno para mujer, con diseño sastrero y acabado efecto cuero.",
    colors: ["Negro", "Chocolate"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    orderNumber: "225-203", collection: "invierno-2027",
    packaging: {
      totalPieces: 48,
      totalLabel: "24 piezas por color",
      rows: [
        { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 }, pieces: "24 piezas por color" },
        { color: "Chocolate", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 }, pieces: "24 piezas por color" }
      ]
    },
    driveLink: ""
  },
  {
    id: 210, name: "VERONA", category: "MUJER", subcategory: "Abrigos",
    description: "Tapado sastrero de invierno para mujer, con solapas, tres botones y bolsillos laterales.",
    colors: ["Melange", "Beige", "Negro"],
    sizes: ["M", "L", "XL", "XXL"],
    orderNumber: "224-512", collection: "produccion-invierno-2027",
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

// -- INVIERNO 2027: PRODUCCIÓN BYE BYE 2027 -----------------
// Cada entrada conserva los datos comerciales del Excel. Los artículos con el
// mismo nombre que una producción anterior reciben un id nuevo si cambia
// cualquier color, talle, curva, empaque, cantidad, precio u orden.
const PRODUCTION_2027_REGULAR_SIZES = ["S", "M", "L", "XL", "XXL"];
const PRODUCTION_2027_PLUS_SIZES = ["3XL", "4XL", "5XL", "6XL"];
const PRODUCTION_2027_KIDS_SIZES = ["4", "6", "8", "10", "12", "14", "16"];
const PRODUCTION_2027_LADIES_STOCK_SIZES = ["S", "M", "L", "XL"];

function production2027Rows(color, curve, options = {}) {
  const sizes = options.sizes || PRODUCTION_2027_REGULAR_SIZES;
  const repeat = options.repeat || 1;
  return Array.from({ length: repeat }, () => ({
    color,
    sizePieces: curve ? Object.fromEntries(sizes.map((size, index) => [size, curve[index]])) : {},
    ...(options.curveText ? { curveText: options.curveText } : {})
  }));
}

function production2027Product(spec) {
  const rows = spec.rows || [];
  const calculatedTotal = rows.reduce((total, row) => {
    return total + Object.values(row.sizePieces || {}).reduce((sum, pieces) => sum + (Number(pieces) || 0), 0);
  }, 0);
  return {
    id: spec.id,
    name: spec.name,
    category: spec.category,
    subcategory: spec.subcategory || "Camperas",
    description: "",
    orderNumber: spec.orderNumber || "",
    collection: "produccion-invierno-2027",
    colors: [...new Set(rows.map(row => row.color))],
    sizes: spec.sizes || [...new Set(rows.flatMap(row => Object.keys(row.sizePieces || {})))],
    driveLink: "",
    sourcePacking: spec.sourcePacking || "",
    sourceWorkbook: spec.sourceWorkbook || "MP088 BYE BYE",
    packaging: {
      totalPieces: spec.totalPieces ?? calculatedTotal,
      ...(spec.totalLabel ? { totalLabel: spec.totalLabel } : {}),
      rows
    }
  };
}

function production2027StockProduct(spec) {
  return {
    id: spec.id,
    name: spec.name,
    category: spec.category,
    subcategory: spec.subcategory || "Camperas",
    description: "",
    orderNumber: spec.orderNumber,
    collection: "produccion-invierno-2027",
    colors: spec.colors || [],
    sizes: spec.sizes || [],
    driveLink: "",
    sourceWorkbook: spec.sourceWorkbook
  };
}

function production2027PurchaseOption(id, label, sourcePacking, rows, orderNumber = "", imageProductId = null) {
  const totalPieces = rows.reduce((total, row) => {
    return total + Object.values(row.sizePieces || {}).reduce((sum, pieces) => sum + (Number(pieces) || 0), 0);
  }, 0);
  return {
    id,
    label,
    orderNumber,
    sourcePacking,
    ...(imageProductId ? { imageProductId } : {}),
    colors: [...new Set(rows.map(row => row.color))],
    sizes: [...new Set(rows.flatMap(row => Object.keys(row.sizePieces || {})))],
    packaging: { totalPieces, rows }
  };
}

// -- SWEATERS 2027 ----------------------------------------------------------
// Datos tomados exclusivamente de Order, Colors, Curve y Box. Cada curva suma
// 12 prendas; las cajas surtidas incluyen una curva por color y las cajas por
// color repiten la curva hasta completar las 24 piezas indicadas en origen.
function sweater2027Product(id, code, name, colors, boxType, repeatsPerColor = 1) {
  const rows = colors.flatMap(color => production2027Rows(
    color,
    [1, 3, 3, 3, 2],
    { repeat: repeatsPerColor }
  ));
  const totalPieces = boxType === "CAJA 24 POR COLOR" ? 24 : 48;
  return {
    id,
    name,
    preserveProductName: true,
    category: "HOMBRE",
    subcategory: "Sweaters",
    description: "",
    orderNumber: code,
    collection: "sweaters-2027",
    colors,
    sizes: PRODUCTION_2027_REGULAR_SIZES,
    driveLink: "",
    sourcePacking: boxType,
    sourceWorkbook: "ORDER SWEATERS 2027",
    packaging: {
      totalPieces,
      totalLabel: `${totalPieces} piezas por caja`,
      rows
    }
  };
}

function sweater2027PackOption(id, label, code, colors, boxType, repeatsPerColor = 1, imageProductId = null) {
  const rows = colors.flatMap(color => production2027Rows(
    color,
    [1, 3, 3, 3, 2],
    { repeat: repeatsPerColor }
  ));
  const option = production2027PurchaseOption(id, label, boxType, rows, code, imageProductId);
  option.packaging.totalLabel = `${option.packaging.totalPieces} piezas por caja`;
  return option;
}

function sweater2027ProductWithPacks(id, code, name, optionSpecs) {
  const purchaseOptions = optionSpecs.map(spec => sweater2027PackOption(
    spec.id,
    spec.label,
    spec.code || code,
    spec.colors,
    spec.boxType,
    spec.repeatsPerColor || 1,
    spec.imageProductId
  ));
  const product = sweater2027Product(id, code, name, purchaseOptions[0].colors, purchaseOptions[0].sourcePacking);
  product.purchaseOptions = purchaseOptions;
  product.sourcePacking = "";
  product.packaging = purchaseOptions[0].packaging;
  return product;
}

const SWEATER_2027_WOMEN_SIZES = ["1", "2"];
const THREAD_PANTS_SIZES = ["S/M", "M/L"];

function sweater2027WomenRow(entry, sizes = SWEATER_2027_WOMEN_SIZES) {
  const row = {
    color: entry.color,
    sizePieces: entry.curve
      ? Object.fromEntries(sizes.map((size, index) => [size, entry.curve[index]]))
      : {}
  };
  if (entry.pieces) row.pieces = entry.pieces;
  return row;
}

function sweater2027WomenRows(entries, sizes = SWEATER_2027_WOMEN_SIZES) {
  return entries.map(entry => sweater2027WomenRow(entry, sizes));
}

function sweater2027WomenBoxLabel(boxPieces) {
  return `CAJA ${boxPieces} SURTIDA`;
}

function sweater2027WomenProduct(id, code, name, entries, boxPieces, sizes = SWEATER_2027_WOMEN_SIZES) {
  const rows = sweater2027WomenRows(entries, sizes);
  const sourcePacking = sweater2027WomenBoxLabel(boxPieces);
  return {
    id,
    name,
    preserveProductName: true,
    category: "MUJER",
    subcategory: "Sweaters",
    description: "",
    orderNumber: code,
    collection: "sweaters-2027",
    colors: [...new Set(rows.map(row => row.color))],
    sizes,
    driveLink: "",
    sourcePacking,
    sourceWorkbook: "OJT SWEATERS 26-8",
    packaging: {
      totalPieces: boxPieces,
      totalLabel: `${boxPieces} piezas por caja`,
      rows
    }
  };
}

function sweater2027WomenPackOption(id, label, code, entries, boxPieces, imageProductId = null) {
  const rows = sweater2027WomenRows(entries);
  const sourcePacking = sweater2027WomenBoxLabel(boxPieces);
  const option = production2027PurchaseOption(id, label, sourcePacking, rows, code);
  if (imageProductId) option.imageProductId = imageProductId;
  option.sizes = rows.some(row => Object.keys(row.sizePieces || {}).length)
    ? SWEATER_2027_WOMEN_SIZES
    : [];
  option.packaging.totalPieces = boxPieces;
  option.packaging.totalLabel = `${boxPieces} piezas por caja`;
  return option;
}

function sweater2027WomenProductWithPacks(id, code, name, optionSpecs) {
  const purchaseOptions = optionSpecs.map(spec => sweater2027WomenPackOption(
    spec.id,
    spec.label,
    spec.code || code,
    spec.entries,
    spec.boxPieces,
    spec.imageProductId
  ));
  const firstOption = purchaseOptions[0];
  return {
    id,
    name,
    preserveProductName: true,
    category: "MUJER",
    subcategory: "Sweaters",
    description: "",
    orderNumber: code,
    collection: "sweaters-2027",
    colors: firstOption.colors,
    sizes: firstOption.sizes,
    driveLink: "",
    sourcePacking: "",
    sourceWorkbook: "OJT SWEATERS 26-8",
    packaging: firstOption.packaging,
    purchaseOptions
  };
}

const sweater2027Products = [
  sweater2027ProductWithPacks(197, "NB 21-51", "Sweater Benicio", [
    { id: "nb-21-51-pack-a", label: "Pack A", colors: ["Negro", "Azul Marino", "Gris", "Beige"], boxType: "CAJA 48 SURTIDA", imageProductId: 197 },
    { id: "nb-21-51-pack-b", label: "Pack B", colors: ["Negro", "Celeste", "Chocolate", "Militar"], boxType: "CAJA 48 SURTIDA", imageProductId: 198 }
  ]),
  sweater2027ProductWithPacks(199, "NB 21-50", "Sweater Mateo", [
    { id: "nb-21-50-pack-a", label: "Pack A", colors: ["Negro", "Azul Marino", "Gris", "Beige"], boxType: "CAJA 48 SURTIDA", imageProductId: 199 },
    { id: "nb-21-50-pack-b", label: "Pack B", colors: ["Negro", "Celeste", "Chocolate", "Militar"], boxType: "CAJA 48 SURTIDA", imageProductId: 200 }
  ]),
  sweater2027Product(201, "NB 24-02", "Sweater Gael", ["Negro", "Azul Marino", "Gris", "Beige"], "CAJA 48 SURTIDA"),
  sweater2027Product(202, "NB 24-52", "Sweater Lorenzo", ["Negro", "Azul Marino", "Gris", "Beige"], "CAJA 48 SURTIDA"),
  sweater2027ProductWithPacks(203, "NB 21-56", "Sweater Dante", [
    { id: "nb-21-56-pack-a", label: "Pack A", colors: ["Negro", "Azul Marino", "Gris", "Beige"], boxType: "CAJA 48 SURTIDA", imageProductId: 203 },
    { id: "nb-21-56-pack-b", label: "Pack B", colors: ["Negro"], boxType: "CAJA 24 POR COLOR", repeatsPerColor: 2, imageProductId: 203 }
  ]),
  sweater2027Product(205, "NB 21-58", "Sweater Tomas", ["Negro", "Azul Marino", "Gris", "Beige"], "CAJA 48 SURTIDA"),
  sweater2027ProductWithPacks(206, "NB 21-58 V", "Sweater Bruno", [
    { id: "nb-21-58-v-pack-a", label: "Pack A", colors: ["Negro", "Azul Marino", "Gris", "Beige"], boxType: "CAJA 48 SURTIDA", imageProductId: 206 },
    { id: "nb-21-58-v-pack-b", label: "Pack B", colors: ["Negro"], boxType: "CAJA 24 POR COLOR", repeatsPerColor: 2, imageProductId: 206 }
  ]),
  sweater2027Product(208, "NB 21-59", "Sweater Simon", ["Negro", "Azul Marino", "Gris", "Beige"], "CAJA 48 SURTIDA"),
  sweater2027WomenProduct(219, "NL0071 223020", "Sweater Amelie", [
    { color: "Negro", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Melange", curve: [3, 3] },
    { color: "Avena Oscuro", curve: [3, 3] },
    { color: "Avena", curve: [3, 3] },
    { color: "Marfil", curve: [3, 3] },
    { color: "Celeste", curve: [2, 2] },
    { color: "Rojo", curve: [2, 2] }
  ], 44),
  sweater2027WomenProduct(220, "26-873", "Sweater Brisa", [
    { color: "Melange Oscuro", curve: [2, 2] },
    { color: "Café", curve: [3, 3] },
    { color: "Avena Oscuro", curve: [3, 3] },
    { color: "Avena", curve: [3, 3] },
    { color: "Marfil", curve: [3, 3] },
    { color: "Negro", curve: [4, 4] }
  ], 36),
  sweater2027WomenProduct(221, "266229Y", "Sweater Bianca", [
    { color: "Negro", curve: [6, 6] },
    { color: "Chocolate", curve: [6, 6] },
    { color: "Avena", curve: [5, 5] },
    { color: "Marfil", curve: [3, 3] }
  ], 40),
  sweater2027WomenProduct(222, "PAU 02", "Sweater Vera", [
    { color: "Negro", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Marfil", curve: [2, 2] }
  ], 20),
  sweater2027WomenProduct(223, "266124J", "Sweater Ambar", [
    { color: "Chocolate", curve: [4, 4] },
    { color: "Avena", curve: [2, 2] },
    { color: "Marfil", curve: [2, 2] },
    { color: "Negro", curve: [4, 4] }
  ], 24),
  sweater2027WomenProduct(224, "263036L", "Sweater Roma", [
    { color: "Negro", curve: [4, 4] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Avena", curve: [2, 2] },
    { color: "Verde", curve: [1, 1] },
    { color: "Avena Oscuro", curve: [2, 2] }
  ], 24),
  sweater2027WomenProduct(225, "PAU01", "Sweater Viena", [
    { color: "Chocolate", curve: [2, 2] },
    { color: "Negro", curve: [4, 4] },
    { color: "Avena", curve: [2, 2] },
    { color: "Marfil", curve: [2, 2] }
  ], 20),
  Object.assign(sweater2027WomenProduct(226, "263098L", "Sweater Mora", [
    { color: "Marfil", curve: [3, 3] },
    { color: "Negro", curve: [6, 6] },
    { color: "Gris", curve: [2, 2] }
  ], 22), { onlyColorLinkedPhotos: true }),
  sweater2027WomenProduct(227, "PAU04", "Sweater Nala", [
    { color: "Avena / Marfil / Rosa" },
    { color: "Chocolate / Avena / Marfil" },
    { color: "Camel / Avena / Marfil" },
    { color: "Avena / Chocolate / Celeste" }
  ], 30),
  sweater2027WomenProduct(228, "26-5041", "Sweater Luma", [
    { color: "Gris", curve: [2, 2] },
    { color: "Negro", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Avena", curve: [2, 2] }
  ], 20),
  Object.assign(sweater2027WomenProduct(229, "23-499", "Pantalón Luma", [
    { color: "Avena Oscuro", curve: [2, 2] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Melange", curve: [2, 2] },
    { color: "Negro", curve: [3, 3] }
  ], 20, THREAD_PANTS_SIZES), { subcategory: "Pantalón de hilo" }),
  sweater2027WomenProduct(230, "265604", "Sweater Uma", [
    { color: "Chocolate", curve: [3, 3] },
    { color: "Negro", curve: [4, 4] },
    { color: "Avena", curve: [3, 3] }
  ], 20),
  sweater2027WomenProduct(231, "", "Sweater Aurelia", [
    { color: "Avena Claro", curve: [3, 3] },
    { color: "Negro", curve: [5, 5] },
    { color: "Chocolate", curve: [4, 4] },
    { color: "Marfil", curve: [3, 3] }
  ], 30),
  sweater2027WomenProduct(232, "6266", "Sweater Avelina", [
    { color: "Avena Claro", curve: [3, 3] },
    { color: "Negro", curve: [5, 5] },
    { color: "Chocolate Oscuro", curve: [4, 4] },
    { color: "Marfil", curve: [3, 4] }
  ], 30),
  sweater2027WomenProduct(233, "8711", "Sweater Calista", [
    { color: "Avena Claro", curve: [3, 3] },
    { color: "Negro", curve: [3, 3] },
    { color: "Chocolate Oscuro", curve: [3, 3] },
    { color: "Marfil", curve: [3, 3] }
  ], 24),
  sweater2027WomenProduct(234, "929", "Sweater Magnolia", [
    { color: "Avena Claro", curve: [3, 3] },
    { color: "Negro", curve: [5, 5] },
    { color: "Chocolate", curve: [4, 4] },
    { color: "Marfil", curve: [3, 4] }
  ], 30),
  sweater2027WomenProduct(235, "", "Sweater Allegra", [
    { color: "Marfil", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Crudo", curve: [2, 2] },
    { color: "Avena Claro", curve: [3, 3] },
    { color: "Celeste", curve: [1, 1] },
    { color: "Negro", curve: [3, 3] }
  ], 30),
  sweater2027WomenProduct(236, "", "Sweater Violeta", [
    { color: "Avena Claro", curve: [3, 3] },
    { color: "Negro", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Marfil", curve: [3, 3] },
    { color: "Pistacho", curve: [2, 2] },
    { color: "Gris", curve: [1, 1] }
  ], 30),
  sweater2027WomenProduct(237, "", "Sweater Serena", [
    { color: "Crudo", curve: [3, 3] },
    { color: "Avena", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Negro", curve: [3, 3] },
    { color: "Avena Oscuro", curve: [2, 2] },
    { color: "Celeste", curve: [1, 1] }
  ], 30),
  sweater2027WomenProduct(238, "9029", "Sweater India", [
    { color: "Avena Claro", curve: [4, 4] },
    { color: "Negro", curve: [5, 5] },
    { color: "Chocolate Oscuro", curve: [4, 4] },
    { color: "Marfil", curve: [3, 3] },
    { color: "Pistacho", curve: [2, 2] },
    { color: "Gris", curve: [2, 2] },
    { color: "Avena Oscuro", curve: [3, 3] },
    { color: "Chocolate", curve: [4, 4] },
    { color: "Celeste", curve: [3, 3] }
  ], 60),
  sweater2027WomenProduct(239, "9011", "Sweater Justina", [
    { color: "Marfil", curve: [4, 4] },
    { color: "Gris", curve: [2, 2] },
    { color: "Chocolate", curve: [4, 4] },
    { color: "Latte", curve: [3, 3] },
    { color: "Negro", curve: [2, 2] },
    { color: "Rojo", curve: [2, 2] },
    { color: "Azul Marino", curve: [3, 3] },
    { color: "Avena", curve: [4, 4] }
  ], 60),
  sweater2027WomenProduct(240, "F74-620", "Sweater Pola", [
    { color: "Marfil", curve: [4, 4] },
    { color: "Beige", curve: [3, 3] },
    { color: "Visón", curve: [3, 3] },
    { color: "Negro", curve: [5, 5] }
  ], 30),
  sweater2027WomenProduct(241, "F74-617", "Sweater Teza", [
    { color: "Crudo", curve: [3, 3] },
    { color: "Beige", curve: [2, 2] },
    { color: "Visón", curve: [2, 2] },
    { color: "Marrón", curve: [4, 4] },
    { color: "Negro", curve: [4, 4] }
  ], 30),
  sweater2027WomenProduct(242, "", "Sweater Renata", [
    { color: "Marfil", curve: [4, 4] },
    { color: "Chocolate", curve: [4, 4] },
    { color: "Negro", curve: [4, 4] },
    { color: "Gris", curve: [3, 3] }
  ], 30),
  sweater2027WomenProduct(243, "", "Sweater Aurora", [
    { color: "Marfil", curve: [4, 4] },
    { color: "Avena", curve: [4, 4] },
    { color: "Tostado", curve: [4, 4] },
    { color: "Negro", curve: [6, 6] },
    { color: "Azul Marino", curve: [4, 4] },
    { color: "Gris Oscuro", curve: [4, 4] },
    { color: "Celeste", curve: [2, 2] },
    { color: "Lima", curve: [2, 2] },
    { color: "Chocolate", curve: [4, 4] }
  ], 68),
  sweater2027WomenProduct(244, "MIYAQI", "Sweater Dana", [
    { color: "Beige Muestra", curve: [3, 3] },
    { color: "Negro", curve: [3, 3] },
    { color: "Marfil", curve: [3, 3] },
    { color: "Chocolate", curve: [3, 3] },
    { color: "Azul Marino", curve: [3, 3] }
  ], 30),
  sweater2027WomenProduct(245, "2620", "Sweater Guillermina", [
    { color: "Marfil", curve: [5, 5] },
    { color: "Chocolate", curve: [5, 5] },
    { color: "Negro", curve: [5, 5] }
  ], 30),
  sweater2027WomenProduct(246, "7251", "Sweater Bela", [
    { color: "Avena con Vivo Chocolate", curve: [5, 5] },
    { color: "Negro con Vivo Marfil", curve: [5, 5] },
    { color: "Chocolate con Vivo Marfil", curve: [5, 5] }
  ], 30),
  sweater2027WomenProduct(247, "7250", "Sweater Tainy", [
    { color: "Marfil", curve: [4, 4] },
    { color: "Negro", curve: [4, 4] },
    { color: "Chocolate", curve: [4, 4] },
    { color: "Gris", curve: [3, 3] }
  ], 30),
  sweater2027WomenProduct(248, "", "Sweater Donna", [
    { color: "Chocolate con Amarillo", curve: [4, 4] },
    { color: "Marfil con Beige y Chocolate", curve: [4, 4] },
    { color: "Marfil con Beige y Lima", curve: [2, 2] },
    { color: "Negro y Blanco", curve: [5, 5] }
  ], 30)
];

// Sweaters plus: caja indicada por el proveedor; curva pendiente de confirmación.
const sweater2027PlusSpecs = [
  [255, "NB 21-51 BIG", "Sweater Benicio Plus"],
  [256, "NB 21-50 BIG", "Sweater Mateo Plus"],
  [257, "NB 21-56 BIG", "Sweater Dante Plus"],
  [258, "NB 21-58 G BIG", "Sweater Bruno Plus"]
];
sweater2027PlusSpecs.forEach(([id, code, name]) => {
  sweater2027Products.push({
    id, name, preserveProductName: true,
    category: "HOMBRE", subcategory: "Sweaters", description: "",
    orderNumber: code, collection: "sweaters-2027",
    colors: ["Negro", "Azul Marino", "Gris"], sizes: ["3XL", "4XL", "5XL"],
    driveLink: "", sourcePacking: "CAJA 48 SURTIDA",
    sourceWorkbook: "ORDER SWEATERS 2027 - BIG SIZES",
    packaging: {
      totalPieces: 48, totalLabel: "48 piezas por caja",
      rows: ["Negro", "Negro", "Azul Marino", "Gris"].map(color => ({
        color, sizePieces: { "3XL": null, "4XL": null, "5XL": null },
        curveText: "3XL / 4XL / 5XL · Curva a confirmar", pieces: "A confirmar"
      }))
    }
  });
});

products.push(...sweater2027Products);

// -- HOODIES 2027 -----------------------------------------------------------
function hoodie2027Product(spec) {
  const rows = spec.rows || [];
  const calculatedTotal = rows.reduce((total, row) => {
    return total + Object.values(row.sizePieces || {}).reduce((sum, pieces) => sum + (Number(pieces) || 0), 0);
  }, 0);
  return {
    id: spec.id,
    name: spec.name,
    preserveProductName: true,
    category: spec.category,
    subcategory: "Buzos",
    description: "",
    orderNumber: spec.orderNumber || "",
    collection: "hoodies-2027",
    colors: [...new Set(rows.map(row => row.color))],
    sizes: spec.sizes || [...new Set(rows.flatMap(row => Object.keys(row.sizePieces || {})))],
    driveLink: "",
    sourcePacking: "ASSORTED SIZE / ASSORTED COLOR",
    sourceWorkbook: "HOODIES 2027",
    packaging: {
      totalPieces: spec.totalPieces ?? calculatedTotal,
      ...(spec.totalLabel ? { totalLabel: spec.totalLabel } : {}),
      rows
    }
  };
}

const hoodie2027Products = [
  hoodie2027Product({ id: 211, name: "Kangaroo Hombre", category: "HOMBRE", orderNumber: "3JA7507", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]),
    ...production2027Rows("Azul Marino", [1, 2, 2, 2, 1]),
    ...production2027Rows("Melange Oscuro", [1, 2, 2, 2, 1])
  ] }),
  hoodie2027Product({ id: 212, name: "Kangaroo Mujer", category: "MUJER", orderNumber: "3VT8056", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1]),
    ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]),
    ...production2027Rows("Melange Claro", [2, 2, 2, 2, 1])
  ] }),
  hoodie2027Product({ id: 213, name: "Kangaroo Niños", category: "NINOS", orderNumber: "226-223", sizes: PRODUCTION_2027_KIDS_SIZES, totalLabel: "Cantidad no informada", rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "4 a 16" }),
    ...production2027Rows("Azul Marino", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "4 a 16" }),
    ...production2027Rows("Melange Claro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "4 a 16" })
  ] }),
  hoodie2027Product({ id: 214, name: "Fiesco", category: "HOMBRE", orderNumber: "3VT8067-1", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]),
    ...production2027Rows("Azul Marino", [1, 2, 2, 2, 1]),
    ...production2027Rows("Melange Oscuro", [1, 2, 2, 2, 1])
  ] }),
  hoodie2027Product({ id: 215, name: "Pedara", category: "MUJER", orderNumber: "3VT8068-1", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1]),
    ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]),
    ...production2027Rows("Melange Claro", [2, 2, 2, 2, 1])
  ] }),
  hoodie2027Product({ id: 216, name: "Fiesco Plus", category: "UNISEX", orderNumber: "3VT8067-1", sizes: PRODUCTION_2027_PLUS_SIZES, totalLabel: "Cantidad no informada", rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL" }),
    ...production2027Rows("Azul Marino", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL" }),
    ...production2027Rows("Melange Oscuro", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL" })
  ] }),
  hoodie2027Product({ id: 217, name: "Fiesco Pedara Unisex", category: "NINOS", orderNumber: "226-320", sizes: PRODUCTION_2027_KIDS_SIZES, totalLabel: "Cantidad no informada", rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "4 a 16" }),
    ...production2027Rows("Azul Marino", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "4 a 16" }),
    ...production2027Rows("Melange Claro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "4 a 16" })
  ] }),
  hoodie2027Product({ id: 218, name: "Ventura Reversible", category: "UNISEX", orderNumber: "226-326", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [1, 3, 2, 2], { sizes: ["S", "M", "L", "XL"] }),
    ...production2027Rows("Chocolate", [1, 3, 2, 2], { sizes: ["S", "M", "L", "XL"] })
  ] })
];

products.push(...hoodie2027Products);

const legacyProduction2027Products = [
  production2027Product({ id: 102, name: "Kangaroo Men", category: "HOMBRE", subcategory: "Buzos", orderNumber: "3JA7507", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Melange Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 103, name: "Kangaroo Ladies", category: "MUJER", subcategory: "Buzos", orderNumber: "3VT8056", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Gris Melange Claro", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 104, name: "Kangaroo Kids Unisex", category: "NINOS", subcategory: "Buzos", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", sizes: PRODUCTION_2027_KIDS_SIZES, totalLabel: "Cantidad no informada", rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "Talles 4 a 16 · cantidad no informada" }),
    ...production2027Rows("Marino", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "Talles 4 a 16 · cantidad no informada" }),
    ...production2027Rows("Gris Melange Claro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "Talles 4 a 16 · cantidad no informada" })
  ] }),
  production2027Product({ id: 105, name: "Fiesco sin Forro", category: "HOMBRE", subcategory: "Buzos", orderNumber: "3VT8067-1", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Melange Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 106, name: "Pedara sin Forro", category: "MUJER", subcategory: "Buzos", orderNumber: "3VT8068-1", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Gris Melange Claro", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 107, name: "Fiesco Plus sin Forro", category: "UNISEX", subcategory: "Buzos", orderNumber: "3VT8067-1", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", sizes: PRODUCTION_2027_PLUS_SIZES, totalLabel: "Cantidad no informada", rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL · cantidad no informada" }),
    ...production2027Rows("Marino", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL · cantidad no informada" }),
    ...production2027Rows("Gris Melange Oscuro", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL · cantidad no informada" })
  ] }),
  production2027Product({ id: 108, name: "Fiesco Pedara Kids Unisex", category: "NINOS", subcategory: "Buzos", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", sizes: PRODUCTION_2027_KIDS_SIZES, totalLabel: "Cantidad no informada", rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "Talles 4 a 16 · cantidad no informada" }),
    ...production2027Rows("Marino", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "Talles 4 a 16 · cantidad no informada" }),
    ...production2027Rows("Gris Melange Claro", null, { sizes: PRODUCTION_2027_KIDS_SIZES, curveText: "Talles 4 a 16 · cantidad no informada" })
  ] }),
  production2027Product({ id: 109, name: "Ventura Reversible con Piel", category: "UNISEX", sourcePacking: "ASSORTED SIZE / ASSORTED COLOR", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [1, 3, 2, 2], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Chocolate", [1, 3, 2, 2], { sizes: ["S", "M", "L", "XL"] })
  ] }),

  production2027Product({ id: 110, name: "Morino 3VT8222", category: "HOMBRE", sourcePacking: "CAJA POR COLOR", rows: [...production2027Rows("Negro", [1, 2, 2, 2, 2])] }),
  production2027Product({ id: 111, name: "Luca Jacket", category: "HOMBRE", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 3 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 112, name: "Luca Vest", category: "HOMBRE", subcategory: "Chalecos", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 113, name: "Cornelio Paño Básico", category: "HOMBRE", subcategory: "Tapados", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1]), ...production2027Rows("Café", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 114, name: "Bartal PU Básica", category: "HOMBRE", subcategory: "Camperas de cuero", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 1, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 1, 1])
  ] }),
  production2027Product({ id: 115, name: "Pascal Polar con Piel", category: "HOMBRE", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 116, name: "Pascal Vest", category: "HOMBRE", subcategory: "Chalecos", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 117, name: "JASON", category: "HOMBRE", sourcePacking: "CAJA SURTIDA", totalLabel: "Curva incompleta en origen", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, null]), ...production2027Rows("Caqui", [1, 2, 2, 2, null]), ...production2027Rows("Marino", [1, 2, 2, 2, null]), ...production2027Rows("Gris", [1, 2, 2, 2, null])
  ] }),
  production2027Product({ id: 118, name: "Merano", category: "HOMBRE", sourcePacking: "CAJA POR COLOR", rows: [...production2027Rows("Negro", [1, 1, 2, 2, 2])] }),
  production2027Product({ id: 119, name: "Cervaro Jacket", category: "HOMBRE", sourcePacking: "CAJA SURTIDA 32 PCS", totalPieces: 32, rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Oliva", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 120, name: "Cervaro Vest", category: "HOMBRE", subcategory: "Chalecos", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Oliva", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 121, name: "Milan Taffeta", category: "HOMBRE", orderNumber: "3JA9021", sourcePacking: "CAJA POR COLOR", rows: [...production2027Rows("Negro", [1, 2, 2, 2, 2])] }),
  production2027Product({ id: 122, name: "Milan Taffeta", category: "HOMBRE", orderNumber: "3JA9022", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2]), ...production2027Rows("Marino", [1, 2, 2, 2, 2]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 123, name: "Milan Taffeta Plus Size", category: "HOMBRE", orderNumber: "3JA9023", sourcePacking: "CAJA SURTIDA", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Marino", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 124, name: "Taft Rompeviento", category: "HOMBRE", subcategory: "Rompevientos", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Marino", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 125, name: "Felipe Hood con Piel Fina", category: "HOMBRE", sourcePacking: "CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Beige", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 126, name: "Felipe Hood con Piel Fina Plus Size", category: "HOMBRE", sourcePacking: "CAJA POR COLOR", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Marino", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),

  production2027Product({ id: 127, name: "Tonara Hood", category: "MUJER", sourcePacking: "SOLID COLOR / CAJA POR COLOR", description: "Tonara Hood con tirador de cierre al tono. Producción Invierno 2027.", rows: [...production2027Rows("Negro", [1, 2, 2, 2, 1])] }),
  production2027Product({ id: 128, name: "Lettie Vest", category: "MUJER", subcategory: "Chalecos", sourcePacking: "SURTIDO", description: "Chaleco sin piel, con cordón al tono y sin metal.", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 129, name: "Lettie Jacket", category: "MUJER", sourcePacking: "SURTIDO", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 130, name: "Lily Jacket", category: "MUJER", sourcePacking: "SURTIDO", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2], { repeat: 2 }), ...production2027Rows("Caqui", [1, 2, 2, 2, 2]), ...production2027Rows("Beige", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 131, name: "Lily Vest", category: "MUJER", subcategory: "Chalecos", sourcePacking: "SURTIDO", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2], { repeat: 2 }), ...production2027Rows("Caqui", [1, 2, 2, 2, 2]), ...production2027Rows("Beige", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 132, name: "Messika", category: "MUJER", sourcePacking: "SURTIDO", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"], repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })
  ] }),
  production2027Product({ id: 133, name: "Croviana Plus Size", category: "MUJER", sourcePacking: "SURTIDO", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Chocolate", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES }), ...production2027Rows("Militar Oscuro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 134, name: "Cumiana Vest", category: "MUJER", subcategory: "Chalecos", sourcePacking: "SURTIDO + CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 3 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Beige", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 135, name: "Cumiana Long", category: "MUJER", subcategory: "Chalecos", sourcePacking: "SURTIDO", description: "Chaleco largo Cumiana. Producción Invierno 2027.", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 136, name: "Isadora Taffeta", category: "MUJER", subcategory: "Chalecos", sourcePacking: "SURTIDO + CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 1, 1], { repeat: 2 }), ...production2027Rows("Caqui", [1, 2, 2, 1, 1]), ...production2027Rows("Caqui Claro", [1, 2, 2, 1, 1])
  ] }),
  production2027Product({ id: 137, name: "Isadora Taffeta Plus Size", category: "MUJER", subcategory: "Chalecos", sourcePacking: "SURTIDO", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Caqui", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 138, name: "Sirena Hood", category: "MUJER", sourcePacking: "SURTIDO + CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 3, 2, 1], { repeat: 3 }), ...production2027Rows("Chocolate", [1, 2, 3, 2, 1]), ...production2027Rows("Beige", [1, 2, 3, 2, 1])
  ] }),
  production2027Product({ id: 139, name: "Sirena Hood Plus Size", category: "MUJER", sourcePacking: "SURTIDO", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Chocolate", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 140, name: "Marciana", category: "MUJER", sourcePacking: "SURTIDO", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Chocolate", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Camel", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })
  ] }),
  production2027Product({ id: 141, name: "Jayleen Parka Reversible", category: "MUJER", sourcePacking: "SURTIDO", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Militar", [2, 2, 2, 2, 1]), ...production2027Rows("Beige", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 142, name: "Trench Elena", category: "MUJER", subcategory: "Trench", sourcePacking: "SURTIDO + CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Camel", [2, 2, 2, 2, 1]), ...production2027Rows("Piedra", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 143, name: "Lustra", category: "MUJER", sourcePacking: "SURTIDO", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 144, name: "Mila", category: "MUJER", sourcePacking: "SURTIDO", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2]), ...production2027Rows("Caqui", [1, 2, 2, 2, 2]), ...production2027Rows("Chocolate", [1, 2, 2, 2, 2]), ...production2027Rows("Beige", [1, 2, 2, 2, 2])
  ] })
];

// Ingreso MP088 definitivo. Solo incluye artículos BYE BYE con precio y
// cantidad informados en los cuatro listados finales. QTY no se usa.
const production2027Products = [
  production2027Product({ id: 110, name: "Morino", category: "HOMBRE", orderNumber: "226-290", sourcePacking: "CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2]), ...production2027Rows("Marino", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 111, name: "Campera Luca", category: "HOMBRE", orderNumber: "226-337", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 112, name: "Chaleco Luca", category: "HOMBRE", subcategory: "Chalecos", orderNumber: "226-335", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 114, name: "Bartal", category: "HOMBRE", subcategory: "Camperas de cuero", orderNumber: "126-436", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 1, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 1, 1])
  ] }),
  production2027Product({ id: 115, name: "Campera Pascal", category: "HOMBRE", orderNumber: "226-310", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 116, name: "Chaleco Pascal", category: "HOMBRE", subcategory: "Chalecos", orderNumber: "226-312", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 117, name: "JASON", category: "HOMBRE", orderNumber: "226-331", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Caqui", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1]), ...production2027Rows("Gris", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 118, name: "Merano", category: "HOMBRE", orderNumber: "226-308", sourcePacking: "CAJA POR COLOR", rows: [...production2027Rows("Negro", [1, 1, 2, 2, 2])] }),
  production2027Product({ id: 124, name: "Taft", category: "HOMBRE", subcategory: "Rompevientos", orderNumber: "126-484", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Marino", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 121, name: "Milan", category: "HOMBRE", subcategory: "Chalecos", orderNumber: "226-292", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2], { repeat: 2 }), ...production2027Rows("Marino", [1, 2, 2, 2, 2]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 123, name: "Milan Plus Size", category: "HOMBRE", subcategory: "Chalecos", orderNumber: "226-294", sourcePacking: "CAJA SURTIDA", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Marino", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 125, name: "Fez", category: "HOMBRE", orderNumber: "226-303", sourcePacking: "CAJA POR COLOR", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Beige", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 126, name: "Fez Plus Size", category: "HOMBRE", orderNumber: "226-304", sourcePacking: "CAJA SURTIDA", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Marino", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 151, name: "Fez Waterproof", category: "HOMBRE", orderNumber: "226-333", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 120, name: "Chaleco Cervaro", category: "HOMBRE", subcategory: "Chalecos", orderNumber: "226-305", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Oliva", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 119, name: "Campera Cervaro", category: "HOMBRE", orderNumber: "226-306", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Oliva", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 152, name: "Milan con Capucha", category: "HOMBRE", subcategory: "Chalecos", orderNumber: "226-261", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2], { repeat: 2 }), ...production2027Rows("Marino", [1, 2, 2, 2, 2]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 2])
  ] }),

  production2027Product({ id: 127, name: "Tonara", category: "MUJER", orderNumber: "126-441", sourcePacking: "CAJA POR COLOR", rows: [...production2027Rows("Negro", [1, 2, 2, 2, 1])] }),
  production2027Product({ id: 128, name: "Chaleco Lettie", category: "MUJER", subcategory: "Chalecos", orderNumber: "126-458", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 129, name: "Campera Lettie", category: "MUJER", orderNumber: "126-460", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 130, name: "Campera Lynn", category: "MUJER", orderNumber: "226-265", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2], { repeat: 2 }), ...production2027Rows("Caqui", [1, 2, 2, 2, 2]), ...production2027Rows("Beige", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 131, name: "Chaleco Lynn", category: "MUJER", subcategory: "Chalecos", orderNumber: "226-268", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 2], { repeat: 2 }), ...production2027Rows("Caqui", [1, 2, 2, 2, 2]), ...production2027Rows("Beige", [1, 2, 2, 2, 2])
  ] }),
  production2027Product({ id: 132, name: "Viena", category: "MUJER", orderNumber: "126-456", sourcePacking: "CAJA SURTIDA", sizes: ["S", "M", "L", "XL"], totalPieces: 24, rows: [
    ...production2027Rows("Negro", [2, 4, 4, 2], { sizes: ["S", "M", "L", "XL"] }),
    ...production2027Rows("Caqui", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }),
    ...production2027Rows("Militar", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })
  ] }),
  production2027Product({ id: 133, name: "Croviana Plus Size", category: "MUJER", orderNumber: "126-479", sourcePacking: "CAJA SURTIDA", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", null, { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2, curveText: "3XL a 6XL · 1/1/1" }), ...production2027Rows("Chocolate", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL · 1/1/1" }), ...production2027Rows("Militar Oscuro", null, { sizes: PRODUCTION_2027_PLUS_SIZES, curveText: "3XL a 6XL · 1/1/1" })
  ] }),
  production2027Product({ id: 134, name: "Cumiana Vest", category: "MUJER", subcategory: "Chalecos", orderNumber: "126-452", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Beige", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 135, name: "Cumiana Largo", category: "MUJER", subcategory: "Chalecos", orderNumber: "126-454", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 136, name: "Isadora", category: "MUJER", subcategory: "Chalecos", orderNumber: "126-443", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 1, 1], { repeat: 2 }), ...production2027Rows("Caqui", [1, 2, 2, 1, 1]), ...production2027Rows("Caqui Claro", [1, 2, 2, 1, 1]), ...production2027Rows("Militar", [1, 2, 2, 1, 1])
  ] }),
  production2027Product({ id: 137, name: "Isadora Plus Size", category: "MUJER", subcategory: "Chalecos", orderNumber: "126-445", sourcePacking: "CAJA SURTIDA", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Caqui", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 138, name: "Sindy", category: "MUJER", orderNumber: "126-446", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 3, 2, 1], { repeat: 2 }), ...production2027Rows("Negro con Oliva", [1, 2, 3, 2, 1]), ...production2027Rows("Oliva con Beige", [1, 2, 3, 2, 1]), ...production2027Rows("Beige con Caqui", [1, 2, 3, 2, 1])
  ] }),
  production2027Product({ id: 139, name: "Sindy Plus Size", category: "MUJER", orderNumber: "126-448", sourcePacking: "CAJA SURTIDA", sizes: PRODUCTION_2027_PLUS_SIZES, rows: [
    ...production2027Rows("Negro", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES, repeat: 2 }), ...production2027Rows("Chocolate", [1, 1, 1, 1], { sizes: PRODUCTION_2027_PLUS_SIZES })
  ] }),
  production2027Product({ id: 140, name: "Marciana", category: "MUJER", subcategory: "Cazadoras", orderNumber: "126-437", sourcePacking: "CAJA SURTIDA", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Camel", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Chocolate", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })
  ] }),
  production2027Product({ id: 144, name: "Mila", category: "MUJER", orderNumber: "126-488", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"], repeat: 2 }), ...production2027Rows("Caqui", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Chocolate", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Beige", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })
  ] }),
  production2027Product({ id: 142, name: "Elena", category: "MUJER", subcategory: "Trench", orderNumber: "126-473", sourcePacking: "CAJA POR COLOR + CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [2, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Camel", [2, 2, 2, 2, 1]), ...production2027Rows("Piedra", [2, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 143, name: "Lustra", category: "MUJER", orderNumber: "126-467", sourcePacking: "CAJA SURTIDA", rows: [
    ...production2027Rows("Negro", [1, 2, 2, 2, 1], { repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1])
  ] }),
  production2027Product({ id: 153, name: "Zara", category: "MUJER", subcategory: "Camperas de cuero", orderNumber: "126-421", sourcePacking: "CAJA SURTIDA", sizes: ["S", "M", "L", "XL"], rows: [
    ...production2027Rows("Negro", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"], repeat: 2 }), ...production2027Rows("Chocolate", [1, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })
  ], images: ["images/prod_153_1.jpg", "images/prod_153_2.jpg"], colorImages: {
    "Negro": "images/prod_153_1.jpg",
    "Chocolate": "images/prod_153_2.jpg"
  } }),

  ...[
    [154, "Comiso", "126-311", "Camperas de cuero"], [155, "Ketan", "126-016", "Cazadoras"], [156, "Curtis", "125-600"], [157, "Dobby", "125-587", "Cazadoras"], [158, "Parker", "125-420"], [159, "Malvito", "126-050"], [160, "Carl-Aldeno", "125-293", "Cazadoras"], [161, "Floyd", "126-313", "Cazadoras"], [162, "Stephen", "225-597", "Cazadoras"], [163, "Doyle", "225-506"], [164, "Curno", "225-500", "Camperas de cuero"], [165, "Odinga", "126-308", "Cazadoras"], [166, "Aidone", "225-181", "Cazadoras"], [167, "Carpino", "225-505", "Camperas de cuero"], [168, "Gesico", "225-061", "Cazadoras"], [169, "Jamal", "124-919", "Cazadoras"], [170, "Mikey", "225-512"], [171, "Ubon", "125-319"]
  ].map(([id, name, orderNumber, subcategory]) => production2027StockProduct({ id, name, orderNumber, category: "HOMBRE", subcategory, sourceWorkbook: "Stock Men MP088.pdf" })),
  ...[
    [172, "Aimmen", "125-627"], [173, "Licata", "225-052", "Cazadoras"], [174, "Sabina", "125-607"], [175, "Rennell", "126-312", "Cazadoras"], [176, "Hephzibah", "126-309", "Cazadoras"], [177, "Jules", "125-680", "Cazadoras"], [178, "Greta", "125-598", "Camperas de cuero"], [179, "Randit", "125-596", "Camperas de cuero"], [180, "Blyss", "225-553", "Cazadoras"], [181, "Maicyn", "126-306", "Cazadoras"], [182, "Simone", "125-594", "Cazadoras"], [183, "Peri", "125-599"], [184, "Gina", "125-367"], [185, "Magasa", "125-274"]
  ].map(([id, name, orderNumber, subcategory]) => production2027StockProduct({ id, name, orderNumber, category: "MUJER", subcategory, sourceWorkbook: "Stock Ladies MP088.pdf" })),
  ...[
    [186, "Vetralia", "124-890", "Camperas", ["Negro", "Chocolate", "Camel", "Caqui"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [187, "Cassola Fur", "125-448", "Camperas", ["Negro", "Caqui", "Arena", "Oliva"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [188, "Rayna", "126-310", "Camperas", ["Negro", "Arena", "Bordó", "Oliva"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [189, "Holly", "126-134", "Cazadoras", ["Negro", "Marrón", "Chocolate"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [190, "Jabrielle", "126-307", "Camperas", ["Negro", "Crudo", "Camel"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [191, "Keniya", "126-330", "Camperas", ["Negro", "Rosa Pálido", "Marrón Claro", "Beige"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [192, "Lina Plus", "125-429", "Camperas", ["Negro", "Chocolate"], PRODUCTION_2027_PLUS_SIZES],
    [193, "Aveleen", "226-024", "Cazadoras", ["Negro", "Caqui", "Marrón", "Camel"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [194, "Aliciana", "125-656", "Camperas", ["Negro", "Militar", "Caqui", "Café"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [195, "Lesina", "125-164", "Camperas", ["Negro", "Arena", "Oliva", "Marino"], PRODUCTION_2027_LADIES_STOCK_SIZES],
    [196, "Nola", "225-260", "Camperas", ["Arena", "Avena"], PRODUCTION_2027_LADIES_STOCK_SIZES]
  ].map(([id, name, orderNumber, subcategory, colors, sizes]) => production2027StockProduct({
    id,
    name,
    orderNumber,
    category: "MUJER",
    subcategory,
    colors,
    sizes,
    sourceWorkbook: "Stock Ladies MP088 2.pdf"
  })),
  {
    id: 259,
    name: "Cumiana",
    category: "MUJER",
    subcategory: "Camperas",
    description: "Campera inflable para mujer. Producción Invierno 2027.",
    orderNumber: "",
    collection: "produccion-invierno-2027",
    colors: ["Oliva", "Negro", "Caqui"],
    sizes: [],
    driveLink: "",
    preserveCatalogColors: true
  },
  {
    id: 260,
    name: "Keith",
    category: "HOMBRE",
    subcategory: "Camperas",
    description: "Campera inflable con cuello alto y cierre frontal. Producción Invierno 2027.",
    orderNumber: "",
    collection: "produccion-invierno-2027",
    colors: ["Negro", "Marino", "Oliva", "Chocolate"],
    sizes: [],
    driveLink: "",
    preserveCatalogColors: true
  },
  {
    id: 261,
    name: "Keith boys",
    category: "NINOS",
    subcategory: "Camperas",
    description: "Campera inflable para niños con cuello alto y cierre frontal. Producción Invierno 2027.",
    orderNumber: "",
    collection: "produccion-invierno-2027",
    colors: ["Negro", "Marino", "Oliva", "Chocolate"],
    sizes: [],
    driveLink: "",
    preserveCatalogColors: true
  },
  {
    id: 262,
    name: "Cumiana Vest Girls",
    preserveProductName: true,
    category: "NINOS",
    subcategory: "Chalecos",
    description: "Chaleco inflable para niñas con cuello alto y cierre frontal. Producción Invierno 2027.",
    orderNumber: "",
    collection: "produccion-invierno-2027",
    colors: ["Negro", "Marino", "Caqui", "Rosa"],
    sizes: [...PRODUCTION_2027_KIDS_SIZES],
    packaging: {
      rows: [
        ...production2027Rows("Negro", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
        ...production2027Rows("Marino", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
        ...production2027Rows("Caqui", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
        ...production2027Rows("Rosa", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
      ]
    },
    driveLink: "",
    preserveCatalogColors: true
  },
  {
    id: 263,
    name: "Cumiana Girls",
    preserveProductName: true,
    category: "NINOS",
    subcategory: "Chalecos",
    description: "Prenda inflable para niñas con cuello alto y cierre frontal. Producción Invierno 2027.",
    orderNumber: "",
    collection: "produccion-invierno-2027",
    colors: ["Negro", "Marino", "Rosa", "Caqui"],
    sizes: [...PRODUCTION_2027_KIDS_SIZES],
    packaging: {
      rows: [
        ...production2027Rows("Negro", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
        ...production2027Rows("Marino", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
        ...production2027Rows("Rosa", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
        ...production2027Rows("Caqui", [1, 1, 1, 1, 1, 1, 1], { sizes: PRODUCTION_2027_KIDS_SIZES }),
      ]
    },
    driveLink: "",
    preserveCatalogColors: true
  },
  {
    id: 264,
    name: "Zoelyes",
    category: "MUJER",
    subcategory: "Polares",
    description: "Polar para mujer con cuello alto, cierre frontal y bolsillos con cierre. Producción Invierno 2027.",
    orderNumber: "126-532",
    collection: "produccion-invierno-2027",
    colors: ["Negro", "Verde Menta", "Beige"],
    sizes: [],
    driveLink: "",
    preserveCatalogColors: true
  },
  {
    id: 265,
    name: "Mesh",
    category: "MUJER",
    subcategory: "Rompevientos",
    description: "Rompevientos para mujer con capucha, cierre frontal y bolsillos con cierre. Producción Invierno 2027.",
    orderNumber: "126-283",
    collection: "produccion-invierno-2027",
    colors: ["Negro", "Verde Menta", "Malva"],
    sizes: [],
    driveLink: "",
    preserveCatalogColors: true
  }
];

const dobbyProduct = production2027Products.find(product => product.id === 157);
if (dobbyProduct) {
  dobbyProduct.colors = ["Negro", "Camel", "Oliva"];
  dobbyProduct.preserveCatalogColors = true;
}

const curtisProduct = production2027Products.find(product => product.id === 156);
if (curtisProduct) {
  curtisProduct.colors = ["Negro", "Gris", "Oliva"];
  curtisProduct.preserveCatalogColors = true;
}

const ketanProduct = production2027Products.find(product => product.id === 155);
if (ketanProduct) {
  ketanProduct.colors = ["Negro", "Melange claro", "Melange oscuro", "Beige"];
  ketanProduct.preserveCatalogColors = true;
}

const comisoProduct = production2027Products.find(product => product.id === 154);
if (comisoProduct) {
  comisoProduct.colors = ["Negro", "Chocolate", "Camel"];
  comisoProduct.preserveCatalogColors = true;
}

const parkerProduct = production2027Products.find(product => product.id === 158);
if (parkerProduct) {
  parkerProduct.colors = ["Negro/Camel", "Oliva/Azul", "Marino/Rojo", "Beige/Oliva"];
  parkerProduct.preserveCatalogColors = true;
}

const carlAldenoProduct = production2027Products.find(product => product.id === 160);
if (carlAldenoProduct) {
  carlAldenoProduct.colors = ["Marrón", "Negro"];
  carlAldenoProduct.preserveCatalogColors = true;
}

const floydProduct = production2027Products.find(product => product.id === 161);
if (floydProduct) {
  floydProduct.colors = ["Camel", "Negro", "Chocolate"];
  floydProduct.preserveCatalogColors = true;
}

const stephenProduct = production2027Products.find(product => product.id === 162);
if (stephenProduct) {
  stephenProduct.colors = ["Camel", "Chocolate", "Negro", "Marrón"];
  stephenProduct.preserveCatalogColors = true;
}

const doyleProduct = production2027Products.find(product => product.id === 163);
if (doyleProduct) {
  doyleProduct.colors = ["Negro/Bordó", "Negro", "Gris/Negro", "Beige/Negro"];
  doyleProduct.preserveCatalogColors = true;
}

const curnoProduct = production2027Products.find(product => product.id === 164);
if (curnoProduct) {
  curnoProduct.colors = ["Beige", "Chocolate", "Camel", "Negro"];
  curnoProduct.preserveCatalogColors = true;
}

const malvitoProduct = production2027Products.find(product => product.id === 159);
if (malvitoProduct) {
  malvitoProduct.colors = ["Oliva", "Negro", "Gris"];
  malvitoProduct.preserveCatalogColors = true;
}

const odingaProduct = production2027Products.find(product => product.id === 165);
if (odingaProduct) {
  odingaProduct.colors = ["Gris Oscuro", "Beige", "Negro"];
  odingaProduct.preserveCatalogColors = true;
}

const aidoneProduct = production2027Products.find(product => product.id === 166);
if (aidoneProduct) {
  aidoneProduct.colors = ["Negro/Beige", "Azul/Blanco", "Rojo/Azul"];
  aidoneProduct.preserveCatalogColors = true;
}

const carpinoProduct = production2027Products.find(product => product.id === 167);
if (carpinoProduct) {
  carpinoProduct.colors = ["Negro", "Chocolate"];
  carpinoProduct.preserveCatalogColors = true;
}

const jamalProduct = production2027Products.find(product => product.id === 169);
if (jamalProduct) {
  jamalProduct.colors = ["Chocolate", "Marrón", "Camel", "Negro"];
  jamalProduct.preserveCatalogColors = true;
}

const mikeyProduct = production2027Products.find(product => product.id === 170);
if (mikeyProduct) {
  mikeyProduct.colors = ["Crudo/Marino", "Negro/Marino", "Marino", "Negro"];
  mikeyProduct.preserveCatalogColors = true;
}

const ubonProduct = production2027Products.find(product => product.id === 171);
if (ubonProduct) {
  ubonProduct.colors = ["Negro", "Beige/Negro", "Oliva/Negro"];
  ubonProduct.preserveCatalogColors = true;
}

const gesicoProduct = production2027Products.find(product => product.id === 168);
if (gesicoProduct) {
  gesicoProduct.colors = ["Camel/Crudo", "Chocolate/Crudo", "Negro/Crudo"];
  gesicoProduct.preserveCatalogColors = true;
}

const aimmenProduct = production2027Products.find(product => product.id === 172);
if (aimmenProduct) aimmenProduct.colors = ["Negro", "Oliva", "Chocolate", "Piedra"];

const licataProduct = production2027Products.find(product => product.id === 173);
if (licataProduct) {
  licataProduct.colors = ["Camel", "Chocolate", "Negro"];
  licataProduct.images = [
    "images/prod_173_1.jpg",
    "images/prod_173_2.jpg",
    "images/prod_173_3.jpg"
  ];
  licataProduct.colorImages = {
    "Camel": "images/prod_173_1.jpg",
    "Chocolate": "images/prod_173_2.jpg",
    "Negro": "images/prod_173_3.jpg"
  };
}

const sabinaTaffetaProduct = production2027Products.find(product => product.id === 174);
if (sabinaTaffetaProduct) {
  sabinaTaffetaProduct.colors = ["Negro", "Oliva", "Café", "Caqui"];
  sabinaTaffetaProduct.images = [
    "images/prod_174_1.jpg",
    "images/prod_174_2.jpg",
    "images/prod_174_3.jpg",
    "images/prod_174_4.jpg"
  ];
  sabinaTaffetaProduct.colorImages = {
    "Negro": "images/prod_174_1.jpg",
    "Oliva": "images/prod_174_2.jpg",
    "Café": "images/prod_174_3.jpg",
    "Caqui": "images/prod_174_4.jpg"
  };
}

const rennellProduct = production2027Products.find(product => product.id === 175);
if (rennellProduct) {
  rennellProduct.colors = ["Negro", "Camel", "Marrón"];
  rennellProduct.images = [
    "images/prod_175_1.jpg",
    "images/prod_175_2.jpg",
    "images/prod_175_3.jpg"
  ];
  rennellProduct.colorImages = {
    "Negro": "images/prod_175_2.jpg",
    "Camel": "images/prod_175_1.jpg",
    "Marrón": "images/prod_175_3.jpg"
  };
}

const hephzibahProduct = production2027Products.find(product => product.id === 176);
if (hephzibahProduct) {
  hephzibahProduct.colors = ["Negro", "Beige", "Camel", "Melange"];
  hephzibahProduct.images = [
    "images/prod_176_1.jpg",
    "images/prod_176_2.jpg",
    "images/prod_176_3.jpg",
    "images/prod_176_4.jpg"
  ];
  hephzibahProduct.colorImages = {
    "Negro": "images/prod_176_4.jpg",
    "Beige": "images/prod_176_1.jpg",
    "Camel": "images/prod_176_2.jpg",
    "Melange": "images/prod_176_3.jpg"
  };
}

const julesProduct = production2027Products.find(product => product.id === 177);
if (julesProduct) {
  julesProduct.colors = ["Negro", "Marrón", "Camel"];
  julesProduct.images = [
    "images/prod_177_1.jpg",
    "images/prod_177_2.jpg",
    "images/prod_177_3.jpg"
  ];
  julesProduct.colorImages = {
    "Negro": "images/prod_177_2.jpg",
    "Marrón": "images/prod_177_1.jpg",
    "Camel": "images/prod_177_3.jpg"
  };
}

const gretaProduct = production2027Products.find(product => product.id === 178);
if (gretaProduct) {
  gretaProduct.colors = ["Negro", "Chocolate", "Camel"];
  gretaProduct.images = [
    "images/prod_178_1.jpg",
    "images/prod_178_2.jpg",
    "images/prod_178_3.jpg"
  ];
  gretaProduct.colorImages = {
    "Negro": "images/prod_178_3.jpg",
    "Chocolate": "images/prod_178_1.jpg",
    "Camel": "images/prod_178_2.jpg"
  };
}

const randiTProduct = production2027Products.find(product => product.id === 179);
if (randiTProduct) {
  randiTProduct.colors = ["Negro", "Marrón", "Camel"];
  randiTProduct.images = [
    "images/prod_179_1.jpg",
    "images/prod_179_2.jpg",
    "images/prod_179_3.jpg"
  ];
  randiTProduct.colorImages = {
    "Negro": "images/prod_179_1.jpg",
    "Marrón": "images/prod_179_2.jpg",
    "Camel": "images/prod_179_3.jpg"
  };
}

const blyssProduct = production2027Products.find(product => product.id === 180);
if (blyssProduct) {
  blyssProduct.colors = ["Negro", "Chocolate", "Camel", "Beige"];
  blyssProduct.images = [
    "images/prod_180_1.jpg",
    "images/prod_180_2.jpg",
    "images/prod_180_3.jpg",
    "images/prod_180_4.jpg"
  ];
  blyssProduct.colorImages = {
    "Negro": "images/prod_180_2.jpg",
    "Chocolate": "images/prod_180_1.jpg",
    "Camel": "images/prod_180_4.jpg",
    "Beige": "images/prod_180_3.jpg"
  };
}

const maicynProduct = production2027Products.find(product => product.id === 181);
if (maicynProduct) {
  maicynProduct.colors = ["Piedra", "Negro", "Marrón"];
  maicynProduct.images = [
    "images/prod_181_1.jpg",
    "images/prod_181_2.jpg",
    "images/prod_181_3.jpg"
  ];
  maicynProduct.colorImages = {
    "Piedra": "images/prod_181_2.jpg",
    "Negro": "images/prod_181_1.jpg",
    "Marrón": "images/prod_181_3.jpg"
  };
}

const simoneProduct = production2027Products.find(product => product.id === 182);
if (simoneProduct) {
  simoneProduct.colors = ["Marrón", "Negro", "Camel", "Bronce"];
  simoneProduct.images = [
    "images/prod_182_3.png",
    "images/prod_182_1.png",
    "images/prod_182_2.png",
    "images/prod_182_4.png"
  ];
  simoneProduct.colorImages = {
    "Marrón": "images/prod_182_3.png",
    "Negro": "images/prod_182_1.png",
    "Camel": "images/prod_182_2.png",
    "Bronce": "images/prod_182_4.png"
  };
}

const periProduct = production2027Products.find(product => product.id === 183);
if (periProduct) {
  periProduct.colors = ["Camel", "Marfil", "Negro"];
  periProduct.images = [
    "images/prod_183_1.png",
    "images/prod_183_2.png",
    "images/prod_183_3.png"
  ];
  periProduct.colorImages = {
    "Camel": "images/prod_183_1.png",
    "Marfil": "images/prod_183_2.png",
    "Negro": "images/prod_183_3.png"
  };
}

const ginaProduct = production2027Products.find(product => product.id === 184);
if (ginaProduct) {
  ginaProduct.colors = ["Crudo"];
  ginaProduct.images = ["images/prod_184_1.png"];
  ginaProduct.colorImages = {
    "Crudo": "images/prod_184_1.png"
  };
}

const magasaProduct = production2027Products.find(product => product.id === 185);
if (magasaProduct) {
  magasaProduct.colors = ["Negro", "Chocolate", "Champagne"];
  magasaProduct.images = [
    "images/prod_185_1.png",
    "images/prod_185_2.png",
    "images/prod_185_3.png"
  ];
  magasaProduct.colorImages = {
    "Negro": "images/prod_185_1.png",
    "Chocolate": "images/prod_185_2.png",
    "Champagne": "images/prod_185_3.png"
  };
}

function setProduction2027PurchaseOptions(productId, optionSpecs) {
  const product = production2027Products.find(item => item.id === productId);
  if (!product) return;
  product.purchaseOptions = optionSpecs.map(spec => production2027PurchaseOption(
    spec.id,
    spec.label,
    spec.sourcePacking,
    spec.rows,
    spec.orderNumber || product.orderNumber
  ));
  product.purchaseOptions.forEach(option => {
    option.packingType = /POR COLOR|SOLID COLOR/i.test(option.sourcePacking || "") ? "single-color" : "mixed-colors";
    normalizePackagingTotals(option.packaging, option.packingType);
  });
}

function configureProduction2027PurchaseOptions(productId, key, colorRows, assortedRows) {
  setProduction2027PurchaseOptions(productId, [
    { id: `${key}-caja-color`, label: "Caja por color", sourcePacking: "CAJA POR COLOR", rows: colorRows },
    { id: `${key}-caja-surtida`, label: "Caja surtida", sourcePacking: "CAJA SURTIDA", rows: assortedRows }
  ]);
}

configureProduction2027PurchaseOptions(111, "luca-jacket",
  production2027Rows("Negro", [1, 2, 2, 2, 1]),
  [...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1])]);
configureProduction2027PurchaseOptions(124, "taft",
  production2027Rows("Negro", [1, 2, 2, 2, 1]),
  [...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1])]);
configureProduction2027PurchaseOptions(121, "milan-taffeta",
  production2027Rows("Negro", [1, 2, 2, 2, 2]),
  [...production2027Rows("Negro", [1, 2, 2, 2, 2]), ...production2027Rows("Marino", [1, 2, 2, 2, 2]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 2])]);
configureProduction2027PurchaseOptions(151, "felipe-det-hood",
  production2027Rows("Negro", [1, 2, 2, 2, 1]),
  [...production2027Rows("Negro", [1, 2, 2, 2, 1]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 1]), ...production2027Rows("Marino", [1, 2, 2, 2, 1])]);
configureProduction2027PurchaseOptions(152, "milan-fixed-hood",
  production2027Rows("Negro", [1, 2, 2, 2, 2]),
  [...production2027Rows("Negro", [1, 2, 2, 2, 2]), ...production2027Rows("Marino", [1, 2, 2, 2, 2]), ...production2027Rows("Gris Oscuro", [1, 2, 2, 2, 2])]);
configureProduction2027PurchaseOptions(134, "cumiana",
  production2027Rows("Negro", [2, 2, 2, 2, 1]),
  [...production2027Rows("Negro", [2, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Beige", [2, 2, 2, 2, 1])]);
configureProduction2027PurchaseOptions(136, "isadora-taffeta",
  production2027Rows("Negro", [1, 2, 2, 1, 1]),
  [...production2027Rows("Negro", [1, 2, 2, 1, 1]), ...production2027Rows("Caqui", [1, 2, 2, 1, 1]), ...production2027Rows("Caqui Claro", [1, 2, 2, 1, 1]), ...production2027Rows("Militar", [1, 2, 2, 1, 1])]);
configureProduction2027PurchaseOptions(138, "sirena-hood",
  production2027Rows("Negro", [1, 2, 3, 2, 1]),
  [...production2027Rows("Negro", [1, 2, 3, 2, 1]), ...production2027Rows("Negro con Oliva", [1, 2, 3, 2, 1]), ...production2027Rows("Oliva con Beige", [1, 2, 3, 2, 1]), ...production2027Rows("Beige con Caqui", [1, 2, 3, 2, 1])]);
configureProduction2027PurchaseOptions(144, "mila",
  production2027Rows("Negro", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }),
  [...production2027Rows("Negro", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Caqui", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Chocolate", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] }), ...production2027Rows("Beige", [2, 2, 2, 1], { sizes: ["S", "M", "L", "XL"] })]);
configureProduction2027PurchaseOptions(142, "trench-elena",
  production2027Rows("Negro", [2, 2, 2, 2, 1]),
  [...production2027Rows("Negro", [2, 2, 2, 2, 1]), ...production2027Rows("Chocolate", [2, 2, 2, 2, 1]), ...production2027Rows("Camel", [2, 2, 2, 2, 1]), ...production2027Rows("Piedra", [2, 2, 2, 2, 1])]);

configureProduction2027PurchaseOptions(192, "lina-plus",
  [...production2027Rows("Negro", [3, 3, 3], { sizes: ["G1", "G2", "G3"] }), ...production2027Rows("Chocolate", [3, 3, 3], { sizes: ["G1", "G2", "G3"] })],
  [...production2027Rows("Negro", [3, 3, 3], { sizes: ["G1", "G2", "G3"], repeat: 2 }), ...production2027Rows("Chocolate", [3, 3, 3], { sizes: ["G1", "G2", "G3"] })]);

// Stock recibido en WH3125.xlsx. Las cantidades de cada fila describen la
// curva de una caja; cartons/pieces conservan además el total del embarque.
const wh3125Stock = {
  154: { sizes: ["S", "M", "L", "XL", "XXL"], cartons: 43, pieces: 774, rows: [["Negro", [1, 1, 2, 1, 1]], ["Chocolate", [1, 1, 2, 1, 1]], ["Camel", [1, 1, 2, 1, 1]]] },
  155: { sizes: ["S", "M", "L", "XL", "XXL"], cartons: 33, pieces: 784, rows: [["Negro", [1, 1, 2, 1, 1]], ["Melange claro", [1, 1, 2, 1, 1]], ["Melange oscuro", [1, 1, 2, 1, 1]], ["Beige", [1, 1, 2, 1, 1]]] },
  162: { sizes: ["S", "M", "L", "XL", "XXL"], cartons: 16, pieces: 512, rows: [["Camel", [1, 2, 2, 2, 1]], ["Chocolate", [1, 2, 2, 2, 1]], ["Negro", [1, 2, 2, 2, 1]], ["Marrón", [1, 2, 2, 2, 1]]] },
  163: { sizes: ["S", "M", "L", "XL"], cartons: 42, pieces: 1008, rows: [["Negro/Bordó", [1, 2, 2, 1]], ["Negro", [1, 2, 2, 1]], ["Gris/Negro", [1, 2, 2, 1]], ["Beige/Negro", [1, 2, 2, 1]]] },
  164: { sizes: ["S", "M", "L", "XL", "XXL"], cartons: 24, pieces: 768, rows: [["Beige", [1, 2, 2, 2, 1]], ["Chocolate", [1, 2, 2, 2, 1]], ["Camel", [1, 2, 2, 2, 1]], ["Negro", [1, 2, 2, 2, 1]]] },
  172: { sizes: ["S", "M", "L", "XL", "XXL"], cartons: 14, pieces: 420, rows: [["Negro", [2, 2, 4, 2, 2]], ["Oliva", [1, 1, 2, 1, 1]], ["Chocolate", [1, 1, 2, 1, 1]], ["Piedra", [1, 1, 2, 1, 1]]] },
  175: { sizes: ["S", "M", "L", "XL"], cartons: 43, pieces: 774, rows: [["Camel", [1, 2, 2, 1]], ["Negro", [1, 2, 2, 1]], ["Marrón", [1, 2, 2, 1]]] },
  178: { sizes: ["S", "M", "L", "XL"], cartons: 51, pieces: 1224, rows: [["Chocolate", [1, 2, 2, 1]], ["Camel", [1, 2, 2, 1]], ["Negro", [2, 4, 4, 2]]] },
  188: { sizes: ["S", "M", "L", "XL"], cartons: 47, pieces: 1128, rows: [["Negro", [1, 2, 2, 1]], ["Arena", [1, 2, 2, 1]], ["Bordó", [1, 2, 2, 1]], ["Oliva", [1, 2, 2, 1]]] },
  190: { sizes: ["S", "M", "L", "XL"], cartons: 33, pieces: 594, rows: [["Negro", [1, 2, 2, 1]], ["Crudo", [1, 2, 2, 1]], ["Camel", [1, 2, 2, 1]]] },
  193: { sizes: ["S", "M", "L", "XL"], cartons: 25, pieces: 600, rows: [["Negro", [1, 2, 2, 1]], ["Caqui", [1, 2, 2, 1]], ["Marrón", [1, 2, 2, 1]], ["Camel", [1, 2, 2, 1]]] },
  252: { sizes: ["4", "6", "8", "10", "12", "14", "16"], cartons: 29, pieces: 812, rows: [["Verde/Azul", [1, 1, 1, 1, 1, 1, 1]], ["Negro/Mostaza", [1, 1, 1, 1, 1, 1, 1]], ["Azul/Rojo", [1, 1, 1, 1, 1, 1, 1]], ["Verde/Gris", [1, 1, 1, 1, 1, 1, 1]]] }
};

for (const [idText, stock] of Object.entries(wh3125Stock)) {
  const product = production2027Products.find(item => item.id === Number(idText));
  if (!product) continue;
  product.colors = stock.rows.map(([color]) => color);
  product.sizes = [...stock.sizes];
  product.packaging = {
    rows: stock.rows.map(([color, quantities]) => ({
      color,
      sizePieces: Object.fromEntries(stock.sizes.map((size, index) => [size, quantities[index]]))
    }))
  };
  product.sourcePacking = "CAJA SURTIDA DE COLORES";
  product.packingType = "mixed-colors";
  product.inStock = true;
  product.outOfStockColors = [];
  product.preserveCatalogColors = true;
  product.warehouseStock = { source: "WH3125.xlsx", cartons: stock.cartons, pieces: stock.pieces };
}

products.push(...production2027Products);

// Estas dos prendas también están incluidas en la producción Invierno 2027.
[75, 76].forEach(productId => {
  const product = products.find(item => item.id === productId);
  if (!product) return;
  product.collection = "produccion-invierno-2027";
  product.collections = ["produccion-invierno-2027"];
});


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
      { color: "Blanco", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Melange", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Petróleo", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Marino", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
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
      { color: "Blanco", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Melange", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Petróleo", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Marino", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
      { color: "Negro", sizePieces: { "3XL": 3, "4XL": 3, "5XL": 3, "6XL": 3 }, pieces: "12 piezas por color" },
    ],
  },
  37: {
    totalPieces: 80,
    totalLabel: "80 piezas totales",
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
    totalLabel: "90 piezas por talle disponible y por color",
    rows: [
      { color: "Blanco", curveText: "S al 6XL", pieces: "90 por talle" },
      { color: "Negro", curveText: "Disponibles: XXL, 4XL, 5XL y 6XL", pieces: "90 por talle disponible" },
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
    totalLabel: "60 piezas por color",
    rows: [
      { color: "Blanco", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "60 piezas por color" },
      { color: "Rosa", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "60 piezas por color" },
      { color: "Celeste", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "60 piezas por color" },
      { color: "Marino", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "60 piezas por color" },
      { color: "Negro", sizePieces: { "S": 2, "M": 2, "L": 2, "XL": 1, "XXL": 1 }, pieces: "60 piezas por color" },
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
  66: { totalPieces: 20, totalLabel: "20 piezas por color", rows: [
    { color: "Negro", sizePieces: { S: 2, M: 4, L: 6, XL: 6, XXL: 2 }, pieces: "20 piezas por color" },
    { color: "Iced Coffee", sizePieces: { S: 2, M: 4, L: 6, XL: 6, XXL: 2 }, pieces: "20 piezas por color" }
  ] },
  67: { totalPieces: 40, rows: [
    { color: "Beige/Oliva", sizePieces: { S: 2, M: 4, L: 4, XL: 4, XXL: 2 }, pieces: 16 },
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 }, pieces: 24 }
  ] },
  68: { totalPieces: 40, rows: [
    { color: "Beige/Oliva", sizePieces: { S: 2, M: 4, L: 4, XL: 4, XXL: 2 }, pieces: 16 },
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 6, XL: 6, XXL: 3 }, pieces: 24 }
  ] },
  85: { totalPieces: 60, totalLabel: "60 piezas totales", rows: [
    { color: "Marino", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Gris Claro", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Blanco", sizePieces: { S: 1, M: 2, L: 3, XL: 2, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 3, M: 6, L: 9, XL: 6, XXL: 6 } }
  ] },
  86: { totalPieces: 81, totalLabel: "81 piezas totales", rows: [
    { color: "Marino", sizePieces: { S: 2, M: 4, L: 6, XL: 4, XXL: 2 } },
    { color: "Gris Claro", sizePieces: { S: 2, M: 4, L: 6, XL: 4, XXL: 2 } },
    { color: "Negro", sizePieces: { S: 5, M: 10, L: 15, XL: 10, XXL: 5 } }
  ] },
  87: { totalPieces: 81, totalLabel: "81 piezas totales", rows: [
    { color: "Negro", sizePieces: { S: 5, M: 10, L: 15, XL: 10, XXL: 5 } },
    { color: "Blanco", sizePieces: { S: 2, M: 4, L: 6, XL: 4, XXL: 2 } },
    { color: "Marino", sizePieces: { S: 2, M: 4, L: 6, XL: 4, XXL: 2 } }
  ] }
};

Object.assign(packagingByProductId, {
  88: { totalPieces: 200, totalLabel: "200 piezas surtidas", rows: [{ color: "Surtido", sizePieces: { "Único": 200 } }] },
  89: { totalPieces: 180, totalLabel: "180 piezas surtidas", rows: [{ color: "Surtido", sizePieces: { "Único": 180 } }] },
  90: { totalPieces: 100, totalLabel: "100 piezas surtidas", rows: [{ color: "Surtido", sizePieces: { "Único": 100 } }] },
  91: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  92: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  93: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  94: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  95: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  96: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  97: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  98: { totalPieces: 12, rows: [{ color: "Negro", sizePieces: { "Único": 12 } }] },
  99: { totalPieces: 6, rows: [{ color: "Negro", sizePieces: { "Único": 6 } }] },
  100: { totalPieces: 6, rows: [{ color: "Negro", sizePieces: { "Único": 6 } }] },
  101: { totalPieces: 6, rows: [{ color: "Negro", sizePieces: { "Único": 6 } }] },
  145: { totalPieces: 400, totalLabel: "400 piezas por caja", rows: [{ color: "Colores surtidos", sizePieces: { "Único": 400 } }] },
  146: { totalPieces: 300, totalLabel: "300 piezas por caja", rows: [{ color: "Colores surtidos", sizePieces: { "Único": 300 } }] },
  147: { totalPieces: 300, totalLabel: "300 piezas por caja", rows: [{ color: "Colores surtidos", sizePieces: { "Único": 300 } }] },
  148: { totalPieces: 314, totalLabel: "314 piezas por caja", rows: [{ color: "Colores surtidos", sizePieces: { "Único": 314 } }] },
  149: { totalPieces: 300, totalLabel: "300 piezas por caja", rows: [{ color: "Colores surtidos", sizePieces: { "Único": 300 } }] },
  150: { totalPieces: 276, totalLabel: "276 piezas por caja", rows: [{ color: "Colores surtidos", sizePieces: { "Único": 276 } }] },
  210: { totalPieces: 21, totalLabel: "7 piezas por color · 21 piezas totales", rows: [
    { color: "Melange", sizePieces: { M: 1, L: 2, XL: 2, XXL: 2 }, pieces: "7 piezas por color" },
    { color: "Beige", sizePieces: { M: 1, L: 2, XL: 2, XXL: 2 }, pieces: "7 piezas por color" },
    { color: "Negro", sizePieces: { M: 1, L: 2, XL: 2, XXL: 2 }, pieces: "7 piezas por color" }
  ] }
});

winterSourceProducts.forEach(product => {
  packagingByProductId[product.id] = product.packaging;
  delete product.packaging;
});

sweater2027Products.forEach(product => {
  packagingByProductId[product.id] = product.packaging;
  delete product.packaging;
});

hoodie2027Products.forEach(product => {
  packagingByProductId[product.id] = product.packaging;
  delete product.packaging;
});

production2027Products.forEach(product => {
  packagingByProductId[product.id] = product.packaging;
  delete product.packaging;
});

// Una cantidad por color explícita puede representar varias curvas.
// Sin cantidades completas no se publica un total parcial ni se supone cero.
function getRowPieces(row) {
  if (Number.isInteger(row.pieces) && row.pieces > 0) return row.pieces;
  const explicit = typeof row.pieces === "string"
    ? row.pieces.trim().match(/^(\d+)(?: piezas(?: por color)?)?$/i)
    : null;
  if (explicit && Number(explicit[1]) > 0) return Number(explicit[1]);
  const quantities = Object.values(row.sizePieces || {});
  if (!quantities.length || !quantities.every(value => Number.isInteger(value) && value >= 0)) return null;
  const total = quantities.reduce((sum, value) => sum + value, 0);
  return total > 0 ? total : null;
}

function getRowPiecesLabel(row) {
  const pieces = getRowPieces(row);
  if (pieces !== null) return pieces;
  // Una cantidad por talle no equivale a un total por color.
  if (typeof row.pieces === "string" && /^\d+ por talle(?: disponible)?$/.test(row.pieces)) return row.pieces;
  return "-";
}

function normalizePackagingTotals(packaging, packingType = "mixed-colors") {
  const quantities = packaging.rows.map(getRowPieces);
  if (!quantities.length || quantities.some(value => value === null)) {
    packaging.totalPieces = null;
    packaging.totalLabel = "";
    return;
  }
  if (packingType === "single-color") {
    const min = Math.min(...quantities);
    const max = Math.max(...quantities);
    packaging.totalPieces = min === max ? min : null;
    packaging.totalLabel = min === max
      ? `${min} piezas por caja y color`
      : `${min}–${max} piezas por caja según color`;
    return;
  }
  packaging.totalPieces = quantities.reduce((sum, value) => sum + value, 0);
  packaging.totalLabel = `${packaging.totalPieces} piezas por caja`;
}

function applyCatalogData() {
  products.forEach(product => {
    product.name = product.name && !product.preserveProductName
      ? product.name.charAt(0).toLocaleUpperCase("es-AR") + product.name.slice(1).toLocaleLowerCase("es-AR")
      : product.name;
    product.collection = product.collection || "verano-2027";
    const explicitCollections = Array.isArray(product.collections)
      ? product.collections
      : null;
    const baseCollections = explicitCollections || [...new Set([
      ...(SPRING_PRODUCT_IDS.includes(product.id) ? ["primavera-2027"] : []),
      ...(SPORTS_PRODUCT_IDS.includes(product.id) ? ["deportivo"] : []),
      ...(!SPRING_PRODUCT_IDS.includes(product.id) && !SPORTS_PRODUCT_IDS.includes(product.id)
        ? [product.collection]
        : [])
    ])];
    product.collections = [...new Set([
      ...baseCollections,
      ...(baseCollections.includes("primavera-2027") ? ["invierno-2027"] : []),
      ...(baseCollections.some(id => id === "sweaters-2027" || id === "hoodies-2027")
        ? ["produccion-invierno-2027"]
        : [])
    ])];
    product.subcategory = product.subcategory || OUTERWEAR_SUBCATEGORY_BY_PRODUCT_ID[product.id];
    product.description = product.description || PRODUCT_DESCRIPTION_BY_ID[product.id] || '';
    product.isHidden ??= HIDDEN_PRODUCT_IDS.includes(product.id);
    product.inStock ??= !OUT_OF_STOCK_PRODUCT_IDS.includes(product.id);
    product.outOfStockColors ??= [...(OUT_OF_STOCK_COLORS[product.id] || [])];
    product.outOfStockVariants ??= Object.fromEntries(Object.entries(OUT_OF_STOCK_VARIANTS[product.id] || {}).map(([color, sizes]) => [color, [...sizes]]));
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
    normalizePackagingTotals(product.packaging, product.packingType);
    if (!product.preserveCatalogColors) {
      product.colors = [...new Set(packaging.rows.map(row => row.color))];
    }
    product.sizes = getPackagingSizes(product.packaging);

    if (Array.isArray(product.purchaseOptions)) {
      product.purchaseOptions = product.purchaseOptions.map(option => ({
        ...option,
        packaging: {
          ...option.packaging,
          rows: option.packaging.rows.map(row => ({
            ...row,
            sizePieces: Object.fromEntries(
              Object.entries(row.sizePieces || {}).map(([size, pieces]) => [normalizeCatalogSize(size), pieces])
            )
          }))
        }
      }));
      product.purchaseOptions.forEach(option => normalizePackagingTotals(option.packaging, option.packingType || (/POR COLOR|SOLID COLOR/i.test(option.sourcePacking || "") ? "single-color" : "mixed-colors")));
      product.colors = [...new Set(product.purchaseOptions.flatMap(option => option.colors))];
      product.sizes = [...new Set(product.purchaseOptions.flatMap(option => option.sizes.map(normalizeCatalogSize)))];
    }
  });
}

function getPackagingSizes(packaging) {
  const sizes = [];
  packaging.rows.forEach(row => {
    Object.keys(row.sizePieces || {}).forEach(size => {
      if (!sizes.includes(size)) sizes.push(size);
    });
  });
  return sizes;
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
  return product.packaging?.totalLabel || "-";
}

function formatCurve(row, sizeOrder = []) {
  if (row.curveText) return row.curveText;
  const entries = Object.entries(row.sizePieces || {});
  const orderedSizes = [];
  for (const preferred of sizeOrder || []) {
    const match = entries.find(([size]) => size === preferred || normalizeCatalogSize(size) === normalizeCatalogSize(preferred));
    if (match && !orderedSizes.includes(match[0])) orderedSizes.push(match[0]);
  }
  for (const [size] of entries) if (!orderedSizes.includes(size)) orderedSizes.push(size);
  const quantities = Object.fromEntries(entries);
  return orderedSizes
    .map(size => `${normalizeCatalogSize(size)}/${quantities[size] == null ? "-" : quantities[size]}`)
    .join(" - ");
}

function getActiveCollection() {
  return collections.find(collection => collection.id === activeCollection) || collections[0];
}

function isPreorderCollection(collection = getActiveCollection()) {
  return collection.type === 'preorder' || (!collection.type && PREORDER_COLLECTION_IDS.has(collection.id));
}

function getUnavailableColors(product, selectedOption = null) {
  return new Set([
    ...(product.outOfStockColors || []),
    ...(selectedOption?.outOfStockColors || [])
  ].map(normalizeColorName));
}

function isColorExhaustedBySizes(product, color, selectedOption = null) {
  const variants = product.outOfStockVariants || {};
  const matchedColor = Object.keys(variants).find(item => normalizeColorName(item) === normalizeColorName(color));
  if (!matchedColor) return false;
  const unavailableSizes = new Set((variants[matchedColor] || []).map(normalizeCatalogSize));
  const packaging = selectedOption?.packaging || product.packaging;
  const sizes = selectedOption?.sizes?.length
    ? selectedOption.sizes
    : product.sizes?.length
      ? product.sizes
      : packaging
        ? getPackagingSizes(packaging)
        : [];
  return sizes.length > 0 && sizes.every(size => unavailableSizes.has(normalizeCatalogSize(size)));
}

function isColorUnavailable(product, color, selectedOption = null) {
  return product.inStock === false
    || getUnavailableColors(product, selectedOption).has(normalizeColorName(color))
    || isColorExhaustedBySizes(product, color, selectedOption);
}

function showsStockByColor(product, selectedOption = null) {
  const sourcePacking = selectedOption?.sourcePacking || product.sourcePacking || "";
  const packingType = selectedOption?.packingType
    || product.packingType
    || (/POR COLOR|SOLID COLOR/i.test(sourcePacking) ? "single-color" : "mixed-colors");
  return packingType === "single-color";
}

function hasAvailableColor(product, selectedOption = null) {
  if (!product.inStock) return false;
  if (!selectedOption && product.purchaseOptions?.length) return product.purchaseOptions.some(option => hasAvailableColor(product, option));
  const colors = selectedOption?.colors || product.colors || [];
  return colors.length ? colors.some(color => !isColorUnavailable(product, color, selectedOption)) : true;
}

function canOrderProduct(product, collection = getActiveCollection(), selectedOption = null) {
  return hasAvailableColor(product, selectedOption) && !isPreorderCollection(collection);
}

function catalogText(key,vars={}) {
  const fallback={'modal.outOfStock':'Fuera de stock','modal.noColors':'Sin colores en stock','modal.soon':'Próximamente','modal.added':'✓ Opción en tu selección','modal.addOption':'Agregar esta opción','modal.add':'Agregar a la selección','toast.empty':'Tu selección está vacía','toast.pdf':'PDF descargado','toast.productPdf':'Ficha PDF descargada','toast.pdfError':'No se pudo generar el PDF','cart.clearConfirm':'¿Vaciar toda la selección?'};
  let value=(typeof window!=='undefined'?window.CatalogSiteSettings?.texts?.[key]:null)||fallback[key]||key;
  for(const [name,replacement] of Object.entries(vars))value=String(value).replaceAll(`{${name}}`,String(replacement));
  return value;
}

function pdfColor(value,fallback){const match=String(value||fallback).match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);return match?match.slice(1).map(part=>parseInt(part,16)):fallback;}
function managedPdfFilename(pattern,vars,fallback){let value=String(pattern||fallback);for(const [name,replacement]of Object.entries(vars))value=value.replaceAll(`{${name}}`,safePdfFilename(replacement));return value.toLowerCase().endsWith('.pdf')?value:`${value}.pdf`;}

function getModalAddButtonLabel(product, selectedOption, inCart) {
  if (!product.inStock) return catalogText('modal.outOfStock');
  if (!hasAvailableColor(product, selectedOption)) return catalogText('modal.noColors');
  if (isPreorderCollection()) return catalogText('modal.soon');
  if (inCart) return catalogText('modal.added');
  return selectedOption ? catalogText('modal.addOption') : catalogText('modal.add');
}

function getCollectionProducts() {
  return products.filter(product => (
    activeCollection === "todos" || product.collections.includes(activeCollection)
  ) && !product.isHidden && !product.archived);
}

function getCollectionsConfig(){return window.CatalogSiteSettings?.collectionsConfig||{};}
function productCollectionIds(product){return [...new Set([...(Array.isArray(product?.collections)?product.collections:[]),product?.collection].filter(Boolean))];}
function collectionCanBeSelected(id){
  const config=getCollectionsConfig();
  if(id==='todos')return config.showAll===true;
  return collections.some(collection=>collection.id===id&&!collection.hidden);
}
function getInitialCollectionId(){
  const config=getCollectionsConfig(),requested=config.initial||'verano-2027';
  if(collectionCanBeSelected(requested))return requested;
  return collections.find(collection=>!collection.hidden)?.id||collections[0]?.id||'todos';
}

const GENDER_LABELS = {
  MUJER: "Mujer",
  HOMBRE: "Hombre",
  NINOS: "Niños",
  UNISEX: "Unisex"
};

function getGenderLabel(category) {
  return GENDER_LABELS[category] || category;
}

function isWinterCollection() {
  return activeCollection === "invierno-2027" || activeCollection === "produccion-invierno-2027";
}

function getProductSubcategories(product) {
  if (Array.isArray(product.subcategories) && product.subcategories.length) {
    return product.subcategories;
  }
  return product.subcategory ? [product.subcategory] : [];
}

function getManagedCategory(name) {
  return (window.CatalogSiteSettings?.categories || []).find(category => category?.name === name);
}

function getCategoryLabel(name) {
  return getManagedCategory(name)?.label || name;
}

function formatProductSubcategory(product) {
  return getProductSubcategories(product).filter(name => getManagedCategory(name)?.hidden !== true).map(getCategoryLabel).join(" / ");
}

function getStockLabel(product) {
  return hasAvailableColor(product) ? "En stock" : "Sin stock";
}

function buildCollectionFilters() {
  const collectionFilters = document.getElementById("collection-filters");
  if (!collectionFilters) return;
  const config=getCollectionsConfig();
  const visibleCollections = collections.filter(collection => !collection.hidden);
  const options=[...(config.showAll===true?[{id:'todos',name:config.allLabel||'Todo el catálogo',type:'all'}]:[]),...visibleCollections];
  const markup=options.map(collection => `
      <button class="pill ${collection.id === activeCollection ? "active" : ""}" data-filter="collection" data-value="${collection.id}">
        <span>${collection.name}</span>
        ${collection.type!=='all'&&isPreorderCollection(collection) ? '<small class="pill-preorder">Preventa</small>' : ''}
      </button>
    `).join("");
  collectionFilters.innerHTML=markup;
  let tabs=document.getElementById('catalog-collection-tabs');
  if(!tabs){tabs=document.createElement('nav');tabs.id='catalog-collection-tabs';tabs.className='catalog-collection-tabs';tabs.setAttribute('aria-label','Colecciones');document.querySelector('.catalog-search')?.after(tabs);}
  tabs.hidden=config.showTabs!==true;
  tabs.innerHTML=config.showTabs===true?markup:'';
}

function renderPackagingTable(product) {
  const wrap = document.getElementById("modal-packaging");
  if (!wrap) return;

  const purchaseOptions = product.purchaseOptions || [];
  const selectedOption = purchaseOptions.find(option => option.id === currentPurchaseOptionId) || purchaseOptions[0] || null;
  const packaging = selectedOption?.packaging || product.packaging;
  const showStockByColor = showsStockByColor(product, selectedOption);

  if (!packaging) {
    wrap.innerHTML = "";
    return;
  }

  const showQuantities = packaging.totalPieces !== null && packaging.totalPieces !== undefined
    || packaging.rows.some(row => getRowPiecesLabel(row) !== "-");

  const modalSettings = (typeof window === 'undefined' ? null : window.CatalogSiteSettings?.productModal) || {};
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const format = ['inline','table','chips'].includes(modalSettings.curveFormat) ? modalSettings.curveFormat : 'inline';
  const separator = String(modalSettings.curveSeparator ?? ' - ');
  const hiddenColumns = new Set(modalSettings.hiddenCurveColumns || []);
  const configuredColumns = (modalSettings.curveColumns || ['color','stock','curve','pieces']).filter(column => ['color','stock','curve','pieces'].includes(column));
  const visibleColumns = configuredColumns.filter(column => !hiddenColumns.has(column) && (column !== 'stock' || showStockByColor) && (column !== 'pieces' || showQuantities));
  const labels = {color:'Color',stock:'Stock',curve:'Curva de talles',pieces:'Piezas',...(modalSettings.curveLabels || {})};
  const sizeOrder = selectedOption?.sizes || product.sizes || [];
  const allSizes = [...new Set(sizeOrder.map(normalizeCatalogSize))];
  const orderedEntries = row => {
    const entries = Object.entries(row.sizePieces || {}),result=[];
    for (const size of sizeOrder) {
      const match = entries.find(([key]) => normalizeCatalogSize(key) === normalizeCatalogSize(size));
      if (match && !result.some(([key]) => key === match[0])) result.push(match);
    }
    for (const entry of entries) if (!result.some(([key]) => key === entry[0])) result.push(entry);
    return result;
  };
  const curveCell = row => {
    const entries = orderedEntries(row);
    if (format === 'chips') return `<td class="curve-chip-cell">${entries.length ? entries.map(([size,value]) => `<span class="curve-size-chip"><strong>${escapeText(normalizeCatalogSize(size))}</strong>${escapeText(value ?? '-')}</span>`).join('') : escapeText(row.curveText || '-')}</td>`;
    const text = row.curveText || entries.map(([size,value]) => `${normalizeCatalogSize(size)}/${value == null ? '-' : value}`).join(separator);
    return `<td>${escapeText(text || '-')}</td>`;
  };
  const rowCells = (row,unavailable) => visibleColumns.map(column => {
    if (column === 'color') return `<td>${escapeText(row.color)}</td>`;
    if (column === 'stock') return `<td><span class="curve-stock-badge ${unavailable ? 'out-of-stock' : 'in-stock'}">${escapeText(unavailable ? (modalSettings.unavailableLabel || 'Agotado') : (modalSettings.availableLabel || 'Disponible'))}</span></td>`;
    if (column === 'pieces') return `<td>${escapeText(getRowPiecesLabel(row))}</td>`;
    if (format === 'table') {const quantities=Object.fromEntries(orderedEntries(row).map(([size,value])=>[normalizeCatalogSize(size),value]));return allSizes.map(size=>`<td class="curve-size-value">${escapeText(quantities[size] ?? '-')}</td>`).join('');}
    return curveCell(row);
  }).join('');
  const rows = packaging.rows.map(row => {
    const unavailable = showStockByColor && isColorUnavailable(product, row.color, selectedOption);
    return `<tr class="packaging-row${showStockByColor ? ` ${unavailable ? 'out-of-stock' : 'in-stock'}` : ''}">${rowCells(row,unavailable)}</tr>`;
  }).join('');
  const headers = visibleColumns.map(column => column === 'curve' && format === 'table'
    ? allSizes.map(size => `<th>${escapeText(size)}</th>`).join('')
    : `<th>${escapeText(labels[column])}</th>`).join('');

  const optionSelector = purchaseOptions.length > 1 ? `
    <div class="purchase-options" role="group" aria-label="Opciones de compra">
      <span class="purchase-options-label">Elegí una opción de compra</span>
      <div class="purchase-options-buttons">
        ${purchaseOptions.map(option => `
          <button type="button" class="purchase-option-btn ${option.id === selectedOption.id ? "active" : ""}" data-purchase-option="${option.id}">
            ${option.label}
          </button>
        `).join("")}
      </div>
    </div>
  ` : "";

  const displayedPacking = selectedOption?.sourcePacking || product.sourcePacking || "";
  const optionDetails = displayedPacking ? `
    <div class="purchase-option-details">
      <span>Empaque: <strong>${displayedPacking}</strong></span>
    </div>
  ` : "";

  wrap.innerHTML = `
    ${optionSelector}
    ${optionDetails}
    ${modalSettings.showCurveSummary === false || packaging.totalPieces === null || packaging.totalPieces === undefined ? "" : `<div class="packaging-summary">
      <span>Piezas totales</span>
      <strong>${packaging.totalLabel || `${packaging.totalPieces} piezas`}</strong>
    </div>`}
    <div class="packaging-table-wrap">
      <table class="packaging-table">
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  wrap.querySelectorAll("[data-purchase-option]").forEach(button => {
    button.addEventListener("click", () => selectPurchaseOption(product, button.dataset.purchaseOption));
  });
}

applyCatalogData();


// ── STATE ────────────────────────────────────────
let cart = [];
let activeCollection = 'verano-2027';
let activeGender = 'all';
let activeCategory = 'all';
let productSearchQuery = '';
let customerProductSort = '';
const activeExtraFilters = { color:new Set(), size:new Set(), packing:new Set(), availability:new Set() };
let currentModalProduct = null;
let currentPurchaseOptionId = null;
let lastFocusedElement = null;
let cartCustomer = { name:'', business:'', city:'', phone:'', note:'' };
let previewExampleCart = false;
const CART_STORAGE_KEY = 'byebye-cart-v1';
const CATALOG_STORAGE_KEY = 'byebye-catalog-state-v1';
const CART_CUSTOMER_STORAGE_KEY = 'byebye-cart-customer-v1';

function loadPersistedState() {
  try {
    const config=getCollectionsConfig();
    activeCollection=getInitialCollectionId();
    const savedCatalog = JSON.parse(localStorage.getItem(CATALOG_STORAGE_KEY) || 'null');
    if (savedCatalog) {
      if(config.rememberLast!==false&&collectionCanBeSelected(savedCatalog.collection))activeCollection=savedCatalog.collection;
      activeGender = savedCatalog.gender || activeGender;
      activeCategory = savedCatalog.category || activeCategory;
      productSearchQuery = savedCatalog.search || '';
      customerProductSort = savedCatalog.sort || '';
      for(const key of Object.keys(activeExtraFilters))for(const value of savedCatalog.extraFilters?.[key]||[])activeExtraFilters[key].add(String(value));
    }

    const savedCustomer=JSON.parse(localStorage.getItem(CART_CUSTOMER_STORAGE_KEY)||'null');
    if(savedCustomer&&typeof savedCustomer==='object')cartCustomer={...cartCustomer,...Object.fromEntries(Object.entries(savedCustomer).map(([key,value])=>[key,String(value||'').slice(0,key==='note'?500:120)]))};
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    cart = savedCart.map(saved => {
      const product = products.find(item => item.id === saved.id);
      if (!product || !product.inStock) return null;
      const cartCollectionId = saved.collectionId || product.collection;
      const cartCollection = collections.find(item => item.id === cartCollectionId);
      if (cartCollection && isPreorderCollection(cartCollection)) return null;
      const selectedPurchaseOption = saved.optionId
        ? product.purchaseOptions?.find(option => option.id === saved.optionId) || null
        : null;
      return {
        ...product,
        cartKey: getCartKey(product, selectedPurchaseOption?.id || null),
        cartCollectionId,
        selectedPurchaseOption,
        quantity: Math.max(1,Math.min(99,Number(saved.quantity)||1))
      };
    }).filter(Boolean);
  } catch (error) {
    cart = [];
  }
}

function persistCart() {
  if (previewExampleCart && document.body?.dataset.preview === 'true') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map(item => ({
      id: item.id,
      optionId: item.selectedPurchaseOption?.id || null,
      collectionId: item.cartCollectionId || item.collection,
      quantity: Math.max(1,Number(item.quantity)||1)
    }))));
  } catch (error) {}
}

function persistCartCustomer() {
  try { localStorage.setItem(CART_CUSTOMER_STORAGE_KEY,JSON.stringify(cartCustomer)); } catch (error) {}
}

function persistCatalogState() {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify({
      collection: activeCollection,
      gender: activeGender,
      category: activeCategory,
      search: productSearchQuery,
      sort: customerProductSort,
      extraFilters:Object.fromEntries(Object.entries(activeExtraFilters).map(([key,values])=>[key,[...values]]))
    }));
  } catch (error) {}
}

// ── DOM REFS ─────────────────────────────────────
const productGrid = document.getElementById('product-grid');
const emptyState = document.getElementById('empty-state');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const cartActionsEl = document.getElementById('cart-actions');
const cartCountEl = document.getElementById('cart-count');
const cartSummaryEl = document.getElementById('cart-summary');
const cartCustomerEl = document.getElementById('cart-customer');
const categoryFilters = document.getElementById('category-filters');
const genderFilters = document.getElementById('gender-filters');
const resultsCountEl = document.getElementById('results-count');
const productSortControl = document.getElementById('product-sort-control');
const productSortSelect = document.getElementById('product-sort');
const productSearchInput = document.getElementById('product-search');
const productSearchClear = document.getElementById('product-search-clear');
const filtersSection = document.getElementById('catalogo');
const filtersPanel = document.getElementById('filters-panel');
const filtersToggle = document.getElementById('filters-toggle');
const filtersScrollSentinel = document.getElementById('filters-scroll-sentinel');
const filtersClose = document.getElementById('filters-close');
const filtersDrawerOverlay = document.getElementById('filters-drawer-overlay');
const filtersToggleCount = document.getElementById('filters-toggle-count');
const activeFilterChips = document.getElementById('active-filter-chips');
const filtersReset = document.getElementById('filters-reset');
const filtersApply = document.getElementById('filters-apply');
const modalOverlay = document.getElementById('modal-overlay');
const productModal = document.getElementById('product-modal');
const toast = document.getElementById('toast');

// ── INIT ─────────────────────────────────────────
function init() {
  loadPersistedState();
  buildCollectionFilters();
  updateGenderFilters();
  buildCategoryFilters();
  if (productSearchInput) {
    productSearchInput.value = productSearchQuery;
    productSearchClear.hidden = !productSearchQuery;
  }
  updateCustomerSortControl();
  renderProducts();
  updateCartUI();
  bindEvents();
  openProductFromUrl();
}

window.addEventListener('catalog-site-preview-screen',event=>{
  if(document.body?.dataset.preview!=='true')return;
  const screen=event.detail?.screen||'catalog';
  if(screen!=='empty-results'&&productSearchQuery==='__vista_sin_resultados__'){
    productSearchQuery='';if(productSearchInput)productSearchInput.value='';if(productSearchClear)productSearchClear.hidden=true;renderProducts();
  }
  if(screen==='empty-results'){
    productSearchQuery='__vista_sin_resultados__';if(productSearchInput)productSearchInput.value='Búsqueda de ejemplo';if(productSearchClear)productSearchClear.hidden=false;renderProducts();
  }
  if(screen==='cart-empty'){
    previewExampleCart=true;cart=[];updateCartUI();
  }
  if(screen==='cart-filled'){
    const product=products.find(item=>!item.isHidden&&!item.archived&&item.inStock&&hasAvailableColor(item)&&item.collections?.some(id=>{const collection=collections.find(row=>row.id===id);return collection&&!isPreorderCollection(collection);}));
    if(product){const collectionId=(product.collections||[product.collection]).find(id=>{const collection=collections.find(row=>row.id===id);return collection&&!isPreorderCollection(collection);})||product.collection,selectedOption=product.purchaseOptions?.find(option=>hasAvailableColor(product,option))||null;previewExampleCart=true;cart=[{...product,cartKey:getCartKey(product,selectedOption?.id||null),cartCollectionId:collectionId,selectedPurchaseOption:selectedOption,quantity:1}];updateCartUI();}
  }
});

function updateGenderFilters() {
  const kidsFilter = genderFilters.querySelector('[data-value="NINOS"]');
  const unisexFilter = genderFilters.querySelector('[data-value="UNISEX"]');
  if (!kidsFilter || !unisexFilter) return;

  const isHoodiesCollection = activeCollection === "hoodies-2027";
  const showKids = activeCollection === "todos" || isWinterCollection() || isHoodiesCollection;
  const showUnisex = activeCollection === "todos" || activeCollection === "accesorios" || isHoodiesCollection;
  kidsFilter.style.display = showKids ? '' : 'none';
  unisexFilter.style.display = showUnisex ? '' : 'none';

  // Nunca dejamos activo Niños al volver a una colección que no lo admite.
  if ((!showKids && activeGender === 'NINOS') || (!showUnisex && activeGender === 'UNISEX')) {
    activeGender = 'all';
    genderFilters.querySelectorAll('.pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === 'all');
    });
  }
}

// ── CATEGORY FILTERS ────────────────────────────
function buildCategoryFilters() {
  const allBtn = document.createElement('button');
  allBtn.className = `pill ${activeCategory === 'all' ? 'active' : ''}`;
  allBtn.dataset.filter = 'category';
  allBtn.dataset.value = 'all';
  allBtn.textContent = window.CatalogSiteSettings?.filtersPanel?.allCategoriesLabel || window.CatalogSiteSettings?.texts?.['filters.allCategories'] || 'Todas las prendas';
  categoryFilters.appendChild(allBtn);

  const managedOrder = new Map((window.CatalogSiteSettings?.categories || []).map((category,index) => [category.name,index]));
  const cats = [...new Set(getCollectionProducts().flatMap(getProductSubcategories))]
    .filter(cat => getManagedCategory(cat)?.hidden !== true)
    .sort((a,b) => (managedOrder.get(a) ?? 9999) - (managedOrder.get(b) ?? 9999) || a.localeCompare(b));
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `pill ${activeCategory === cat ? 'active' : ''}`;
    btn.dataset.filter = 'category';
    btn.dataset.value = cat;
    btn.textContent = getCategoryLabel(cat);
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

function productExtraFilterValues(product,type) {
  const groups=product.purchaseOptions?.length?product.purchaseOptions:[product];
  if(type==='color')return [...new Set([...(product.colors||[]),...groups.flatMap(group=>group.colors||[])].map(value=>normalizeColorName(value)).filter(Boolean))];
  if(type==='size')return [...new Set([...(product.sizes||[]),...groups.flatMap(group=>group.sizes||[])].map(value=>String(value).trim()).filter(Boolean))];
  if(type==='packing')return [...new Set(groups.map(group=>group.packingType||(/POR COLOR|SOLID COLOR/i.test(group.sourcePacking||'')&&!/SURTID|ASSORT/i.test(group.sourcePacking||'')?'single-color':'mixed-colors')))];
  if(type==='availability')return[product.inStock===false?'unavailable':'available'];
  return[];
}

function buildExtraFilters() {
  const config=window.CatalogSiteSettings?.filtersPanel?.extraFilters||{},texts=window.CatalogSiteSettings?.texts||{},baseProducts=getCollectionProducts().filter(product=>(activeGender==='all'||product.category===activeGender)&&(activeCategory==='all'||getProductSubcategories(product).includes(activeCategory))),definitions={
    color:{enabled:config.color===true,group:'color-filter-group',container:'color-filters',label:texts['filters.colors']||'Colores'},
    size:{enabled:config.size===true,group:'size-filter-group',container:'size-filters',label:texts['filters.sizes']||'Talles'},
    packing:{enabled:config.packing===true,group:'packing-filter-group',container:'packing-filters',label:texts['filters.packing']||'Formato de caja'},
    availability:{enabled:config.availability===true,group:'availability-filter-group',container:'availability-filters',label:texts['filters.availability']||'Disponibilidad'}
  };
  for(const [type,definition]of Object.entries(definitions)){const group=document.getElementById(definition.group),container=document.getElementById(definition.container);if(!group||!container)continue;group.hidden=!definition.enabled;group.querySelector('.filter-label').textContent=definition.label;if(!definition.enabled){activeExtraFilters[type].clear();container.replaceChildren();continue;}let options=[];if(type==='availability')options=[['available',texts['filters.available']||'Disponible'],['unavailable',texts['filters.unavailable']||'Sin stock']];else if(type==='packing')options=[['mixed-colors',texts['filters.mixedPacking']||'Caja surtida'],['single-color',texts['filters.singlePacking']||'Caja por color']].filter(([value])=>baseProducts.some(product=>productExtraFilterValues(product,type).includes(value)));else{const labels=new Map();for(const product of baseProducts){const raw=type==='color'?[...(product.colors||[]),...(product.purchaseOptions||[]).flatMap(option=>option.colors||[])]:[...(product.sizes||[]),...(product.purchaseOptions||[]).flatMap(option=>option.sizes||[])];for(const value of raw){const token=type==='color'?normalizeColorName(value):String(value).trim();if(token&&!labels.has(token))labels.set(token,String(value).trim());}}options=[...labels].sort((a,b)=>a[1].localeCompare(b[1],'es',{numeric:true,sensitivity:'base'}));}const available=new Set(options.map(([value])=>value));for(const value of [...activeExtraFilters[type]])if(!available.has(value))activeExtraFilters[type].delete(value);container.replaceChildren(...options.map(([value,label])=>{const button=document.createElement('button');button.type='button';button.className=`pill${activeExtraFilters[type].has(value)?' active':''}`;button.dataset.extraFilter=type;button.dataset.value=value;button.textContent=label;return button;}));}
}

function productMatchesExtraFilters(product) {
  return Object.entries(activeExtraFilters).every(([type,selected])=>!selected.size||productExtraFilterValues(product,type).some(value=>selected.has(value)));
}

function updateFilterSummary(resultCount = getFilteredProducts().length) {
  const activeFilters = [];
  const collection = collections.find(item => item.id === activeCollection);
  if (collection && activeCollection !== getInitialCollectionId()) {
    activeFilters.push({ type: 'collection', label: collection.name });
  } else if(activeCollection==='todos'&&activeCollection!==getInitialCollectionId()){
    activeFilters.push({type:'collection',label:getCollectionsConfig().allLabel||'Todo el catálogo'});
  }
  if (activeGender !== 'all') activeFilters.push({ type: 'gender', label: getGenderLabel(activeGender) });
  if (activeCategory !== 'all') activeFilters.push({ type: 'category', label: activeCategory });
  for(const [type,values]of Object.entries(activeExtraFilters))for(const value of values){const button=[...document.querySelectorAll(`[data-extra-filter="${type}"]`)].find(node=>node.dataset.value===value);activeFilters.push({type:`extra-${type}`,value,label:button?.textContent||value});}

  if (filtersToggleCount) {
    filtersToggleCount.textContent = String(activeFilters.length);
    filtersToggleCount.hidden = activeFilters.length === 0;
  }
  if (filtersApply) {
    filtersApply.textContent = `Ver ${resultCount} prenda${resultCount === 1 ? '' : 's'}`;
  }
  if (!activeFilterChips) return;

  activeFilterChips.replaceChildren(...activeFilters.map(filter => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'active-filter-chip';
    button.dataset.clearFilter = filter.type;
    if(filter.value)button.dataset.clearValue=filter.value;
    button.textContent = `${filter.label} ×`;
    button.setAttribute('aria-label', `Quitar filtro ${filter.label}`);
    return button;
  }));
  activeFilterChips.hidden = activeFilters.length === 0;
}

function refreshFilterControls() {
  buildCollectionFilters();
  updateGenderFilters();
  genderFilters.querySelectorAll('.pill').forEach(button => {
    button.classList.toggle('active', button.dataset.value === activeGender);
  });
  categoryFilters.innerHTML = '';
  buildCategoryFilters();
  updateCategoryFilters();
}

function resetCatalogFilters() {
  activeCollection = getInitialCollectionId();
  activeGender = 'all';
  activeCategory = 'all';
  productSearchQuery = '';
  for(const values of Object.values(activeExtraFilters))values.clear();
  if (productSearchInput) productSearchInput.value = '';
  if (productSearchClear) productSearchClear.hidden = true;
  refreshFilterControls();
  renderProducts();
}

function clearActiveFilter(type,value='') {
  if (type === 'collection') activeCollection = getInitialCollectionId();
  if (type === 'gender') activeGender = 'all';
  if (type === 'category') activeCategory = 'all';
  if(type.startsWith('extra-'))activeExtraFilters[type.slice(6)]?.delete(value);
  refreshFilterControls();
  renderProducts();
}

function getCustomerSortOptions() {
  const grid=window.CatalogSiteSettings?.grid||{},definitions=[['featured','sortFeatured','sort.featured','Destacados'],['name','sortName','sort.name','Nombre A–Z'],['code','sortCode','sort.code','Código'],['stock','sortStock','sort.stock','Disponibles primero']];
  return definitions.filter(([,flag])=>grid[flag]!==false).map(([value,,textKey,fallback])=>({value,label:window.CatalogSiteSettings?.texts?.[textKey]||fallback}));
}

function updateCustomerSortControl() {
  if(!productSortControl||!productSortSelect)return;
  const grid=window.CatalogSiteSettings?.grid||{},enabled=grid.customerSort===true,options=getCustomerSortOptions();
  productSortControl.hidden=!enabled;productSortControl.closest('.results-info')?.classList.toggle('has-customer-sort',enabled);
  if(!options.length){productSortControl.hidden=true;return;}
  const allowed=options.map(option=>option.value),preferred=allowed.includes(grid.customerSortDefault)?grid.customerSortDefault:allowed[0];if(!allowed.includes(customerProductSort))customerProductSort=preferred;
  document.getElementById('product-sort-label').textContent=window.CatalogSiteSettings?.texts?.['sort.label']||'Ordenar';
  productSortSelect.replaceChildren(...options.map(item=>{const option=document.createElement('option');option.value=item.value;option.textContent=item.label;return option;}));productSortSelect.value=customerProductSort;
}

// ── RENDER PRODUCTS ──────────────────────────────
function getFilteredProducts() {
  const siteSettings = window.CatalogSiteSettings || {};
  const sortMode=siteSettings.grid?.customerSort===true?customerProductSort:'featured';
  const managedOrder = new Map((siteSettings.grid?.productOrder || siteSettings.productOrder || []).map((id,index) => [Number(id),index]));
  const categoryOrder = new Map((siteSettings.categories || []).map((category,index) => [category.name,index]));
  const orderByCollection = siteSettings.grid?.orderByCollection || {};
  const orderMaps = new Map();
  const orderMapFor = category => {
    const key = `${activeCollection}::${category}`;
    if (!orderMaps.has(key)) orderMaps.set(key,new Map((orderByCollection[key] || []).map((id,index) => [Number(id),index])));
    return orderMaps.get(key);
  };
  return getCollectionProducts().filter(p => {
    const genderOk = activeGender === 'all' || p.category === activeGender;
    const catOk = activeCategory === 'all' || getProductSubcategories(p).includes(activeCategory);
    const searchSettings=siteSettings.searchBar||{};
    const searchableValues=[];
    if(searchSettings.searchName!==false)searchableValues.push(p.name);
    if(searchSettings.searchCode!==false)searchableValues.push(p.orderNumber);
    if(searchSettings.searchDescription===true)searchableValues.push(p.description);
    if(searchSettings.searchColors===true)searchableValues.push(...(p.colors||[]),...(p.purchaseOptions||[]).flatMap(option=>option.colors||[]));
    if(searchSettings.searchCategory===true)searchableValues.push(p.category,...getProductSubcategories(p));
    if(searchSettings.searchCollection===true)searchableValues.push(p.collection,...(p.collections||[]));
    if(searchSettings.searchPurchaseOptions!==false)searchableValues.push(...(p.purchaseOptions||[]).flatMap(option=>[option.label,option.orderNumber]));
    const searchableText = normalizeColorName(searchableValues.filter(Boolean).join(' '));
    const searchOk = !productSearchQuery || searchableText.includes(productSearchQuery);
    return genderOk && catOk && searchOk && productMatchesExtraFilters(p);
  }).sort((a, b) => {
    const categoryA = activeCategory === 'all' ? (a.subcategory || getProductSubcategories(a)[0] || '') : activeCategory;
    const categoryB = activeCategory === 'all' ? (b.subcategory || getProductSubcategories(b)[0] || '') : activeCategory;
    if (activeCategory === 'all' && sortMode==='featured') {
      const groupDifference = (categoryOrder.get(categoryA) ?? 9999) - (categoryOrder.get(categoryB) ?? 9999) || categoryA.localeCompare(categoryB,'es');
      if (groupDifference) return groupDifference;
    }
    if(sortMode==='name'){const difference=String(a.name||'').localeCompare(String(b.name||''),'es',{sensitivity:'base',numeric:true});if(difference)return difference;}
    if(sortMode==='code'){const difference=String(a.orderNumber||'').localeCompare(String(b.orderNumber||''),'es',{sensitivity:'base',numeric:true});if(difference)return difference;}
    if(sortMode==='stock'){const difference=Number(b.inStock)-Number(a.inStock);if(difference)return difference;}
    const stockDifference = sortMode!=='featured'||siteSettings.grid?.stockFirst === false || siteSettings.stockFirst === false ? 0 : Number(b.inStock) - Number(a.inStock);
    if (stockDifference) return stockDifference;
    const categoryMapA = orderMapFor(categoryA),categoryMapB = orderMapFor(categoryB);
    return (categoryMapA.get(Number(a.id)) ?? 999999) - (categoryMapB.get(Number(b.id)) ?? 999999)
      || (managedOrder.get(Number(a.id)) ?? 999999) - (managedOrder.get(Number(b.id)) ?? 999999);
  });
}

function productPriceValue(product,option=null){if(option?.price!=null&&option.price!==''){const direct=Number(option.price);if(Number.isFinite(direct)&&direct>=0)return direct;}if(product?.price!=null&&product.price!==''){const base=Number(product.price);if(Number.isFinite(base)&&base>=0)return base;}return null;}
function productCardPrice(product){const values=(product.purchaseOptions?.length?product.purchaseOptions:[null]).map(option=>productPriceValue(product,option)).filter(value=>value!==null);if(!values.length)return null;return{value:Math.min(...values),from:new Set(values).size>1};}
function formatPublicPrice(value,{from=false}={}){if(value===null||value===undefined)return'';const config=window.CatalogSiteSettings?.pricing||{},decimals=Number(config.decimals)===2?2:0,amount=Number(value).toLocaleString('es-AR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});return`${from?'Desde ':''}${config.currency||'$'} ${amount}`;}
function renderProducts() {
  buildExtraFilters();
  persistCatalogState();
  window.dispatchEvent(new CustomEvent('catalog-hero-audience-change',{detail:{collection:activeCollection,gender:activeGender}}));
  const filtered = getFilteredProducts();
  const preorderCollection = isPreorderCollection();
  resetProductImageObserver();
  productGrid.innerHTML = '';

  const searchSettings=window.CatalogSiteSettings?.searchBar||{},resultTemplate=filtered.length===1?(searchSettings.resultTemplateOne||'{n} prenda'):(searchSettings.resultTemplate||'{n} prendas');
  resultsCountEl.textContent = resultTemplate.replaceAll('{n}',String(filtered.length));
  updateFilterSummary(filtered.length);
  const preorderNotice = document.getElementById('preorder-notice');
  if (preorderNotice) preorderNotice.hidden = !preorderCollection;

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    const emptyMessage = emptyState.querySelector('p');
    if (emptyMessage) {
      emptyMessage.textContent = productSearchQuery
        ? (window.CatalogSiteSettings?.texts?.['results.emptySearch']||'No encontramos productos con ese nombre o código.')
        : (window.CatalogSiteSettings?.texts?.['results.empty']||'No hay productos para los filtros seleccionados.');
    }
    return;
  }
  emptyState.style.display = 'none';

  filtered.forEach(p => {
    const inCart = cart.some(c => c.id === p.id);
    const card = document.createElement('div');
    card.className = 'product-card' + (preorderCollection ? ' preorder' : '') + (p.inStock ? '' : ' out-of-stock');
    card.dataset.editId = 'card';
    card.dataset.id = p.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver ${p.name}${p.inStock ? (preorderCollection ? ', preventa' : '') : ', sin stock'}`);
    const customBadgeLabel=String(p.customBadge?.label||'').trim();
    const customBadgeColor=/^#[0-9a-f]{6}$/i.test(p.customBadge?.color||'')?p.customBadge.color:'#9d4f38';
    const cardPrice=productCardPrice(p);

    card.innerHTML = `
      <div class="card-img-wrap">
        <span class="card-badge-gender">${getGenderLabel(p.category)}</span>
        ${preorderCollection && p.inStock ? `<span class="card-badge-preorder">Preventa · Próximamente</span>` : ''}
        ${p.inStock ? '' : `<span class="card-badge-stock">Sin stock</span>`}
        ${customBadgeLabel ? `<span class="card-badge-custom" style="--product-badge-color:${customBadgeColor}">${escapeText(customBadgeLabel)}</span>` : ''}
        <img class="card-img" src="" alt="${p.name}" loading="lazy" decoding="async" style="display:none;width:100%;height:100%;object-fit:cover;" />
        <div class="card-placeholder" id="ph-${p.id}">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
          </svg>
          <span class="placeholder-name">${p.name}</span>
        </div>
        <button class="card-add ${inCart ? 'added' : ''}" data-id="${p.id}" aria-label="Agregar al carrito" ${canOrderProduct(p) ? '' : 'disabled'}>
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
        ${cardPrice ? `<p class="card-price" data-price="${cardPrice.value}" data-price-from="${cardPrice.from}">${formatPublicPrice(cardPrice.value,{from:cardPrice.from})}</p>` : ''}
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-add')) return;
      openModal(p);
    });
    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openModal(p);
    });

    card.querySelector('.card-add').addEventListener('click', (e) => {
      e.stopPropagation();
      if (p.purchaseOptions?.length > 1) {
        openModal(p);
        return;
      }
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
  window.CatalogSiteMarkEditable?.();
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
  const product = products.find(item => item.id === id);
  const sources = getDisplayProductImageSources(product);
  loadFirstAvailableImage(sources, imgEl, placeholderEl);
}

// Prueba todas las fotos del producto en orden. De esta manera, si se borra
// prod_ID_1 pero quedan prod_ID_2, prod_ID_3, etc., el producto sigue teniendo
// una imagen visible en las tarjetas y en la selección.
function loadFirstAvailableImage(sources, imgEl, placeholderEl) {
  let sourceIndex = 0;

  const showPlaceholder = () => {
    imgEl.removeAttribute('src');
    imgEl.style.display = 'none';
    if (placeholderEl) placeholderEl.style.display = 'flex';
  };

  const tryNextSource = () => {
    if (sourceIndex >= sources.length) {
      showPlaceholder();
      return;
    }

    const src = sources[sourceIndex++];
    const tester = new Image();
    tester.onload = () => {
      imgEl.src = src;
      imgEl.style.display = 'block';
      if (placeholderEl) placeholderEl.style.display = 'none';
    };
    tester.onerror = tryNextSource;
    tester.src = src;
  };

  tryNextSource();
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
function getSelectedPurchaseOption(product) {
  return product.purchaseOptions?.find(option => option.id === currentPurchaseOptionId) || product.purchaseOptions?.[0] || null;
}

function getCartKey(product, optionId = null) {
  return optionId ? `${product.id}:${optionId}` : String(product.id);
}

function selectPurchaseOption(product, optionId) {
  openModal(product, optionId);
}

function getProductModalSettings() {
  return window.CatalogSiteSettings?.productModal || {};
}

function applyProductModalSettings() {
  const config = getProductModalSettings();
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  const imageWrap = modal.querySelector('.modal-image-wrap');
  const info = modal.querySelector('.modal-info');
  modal.dataset.mediaSide = config.mediaSide === 'right' ? 'right' : 'left';
  modal.dataset.mobileMode = config.mobileMode === 'full' ? 'full' : 'stack';
  modal.style.setProperty('--modal-image-ratio', String(config.imageRatio || '3/4').replace('/', ' / '));
  modal.style.setProperty('--modal-zoom-level', String(Number(config.zoomLevel) || 2.25));
  if (imageWrap) imageWrap.style.aspectRatio = String(config.imageRatio || '3/4').replace('/', ' / ');
  const image = document.getElementById('modal-img');
  if (image) image.style.objectFit = window.matchMedia('(max-width: 768px)').matches ? (config.mobileFit || 'contain') : (config.desktopFit || 'cover');
  if (imageWrap) imageWrap.style.order = config.mediaSide === 'right' ? '2' : '1';
  if (info) info.style.order = config.mediaSide === 'right' ? '1' : '2';
  const hiddenParts = new Set(config.hiddenParts || []);
  const parts = [...(config.parts || ['collection','title','code','description','notice','colors','sizes','curve','related','share','pdf','add'])];
  if(!parts.includes('price'))parts.splice(Math.max(0,parts.indexOf('description')),0,'price');
  if(!parts.includes('video'))parts.splice(Math.max(0,parts.indexOf('notice')),0,'video');
  if(!parts.includes('share'))parts.splice(Math.max(0,parts.indexOf('pdf')),0,'share');
  if(!parts.includes('related'))parts.splice(Math.max(0,parts.indexOf('share')),0,'related');
  const nodes = {collection:'modal-collection',title:'modal-name',code:'modal-code',price:'modal-price',description:'modal-desc',video:'modal-product-video',notice:'modal-preorder-notice',colors:'modal-colors',sizes:'modal-sizes',curve:'modal-packaging',related:'modal-related',share:'modal-share-btn',pdf:'modal-pdf-btn',add:'modal-add-btn'};
  for (const [part,id] of Object.entries(nodes)) {
    const node = document.getElementById(id);
    if (!node) continue;
    node.style.order = String(Math.max(0,parts.indexOf(part)) + 1);
    node.classList.toggle('site-part-hidden', hiddenParts.has(part) || (part === 'pdf' && config.showPdf === false) || (part === 'share' && config.showShare !== true));
  }
  document.getElementById('modal-gender')?.classList.toggle('site-part-hidden', config.showGender === false);
  document.getElementById('modal-subcat')?.classList.toggle('site-part-hidden', config.showCategory === false);
  document.getElementById('modal-zoom-toggle')?.classList.toggle('site-part-hidden', config.showZoom === false);
  modal.querySelectorAll('.gallery-arrow').forEach(node => node.classList.toggle('site-part-hidden', config.showArrows === false));
  modal.querySelectorAll('.modal-gallery-dots').forEach(node => node.classList.toggle('site-part-hidden', config.showDots === false));
  modal.querySelectorAll('.modal-gallery-thumbnails').forEach(node => node.classList.toggle('site-part-hidden', config.showThumbnails !== true));
}

function productPublicUrl(productId) {
  const url=new URL(location.pathname,location.origin);url.searchParams.set('p',String(productId));return url.href;
}

function syncProductUrl(productId=null) {
  if(document.body.dataset.preview==='true')return;
  const url=new URL(location.href);if(productId===null)url.searchParams.delete('p');else url.searchParams.set('p',String(productId));history.replaceState(history.state,'',url);
}

function openProductFromUrl() {
  const id=Number(new URLSearchParams(location.search).get('p'));if(!Number.isSafeInteger(id)||id<1)return false;
  const product=products.find(item=>Number(item.id)===id&&!item.isHidden&&!item.archived);if(!product)return false;
  const memberships=productCollectionIds(product),matchingCollection=memberships.find(collectionCanBeSelected);if(activeCollection!=='todos'&&!memberships.includes(activeCollection)&&matchingCollection){activeCollection=matchingCollection;buildCollectionFilters();updateGenderFilters();buildCategoryFilters();renderProducts();}
  if(!currentModalProduct||Number(currentModalProduct.id)!==id)openModal(product);return true;
}

async function shareCurrentProduct() {
  if(!currentModalProduct)return;
  const url=productPublicUrl(currentModalProduct.id),data={title:currentModalProduct.name,text:`${currentModalProduct.name} · BYE BYE`,url};
  if(navigator.share){try{await navigator.share(data);return;}catch(error){if(error?.name==='AbortError')return;}}
  try{await navigator.clipboard.writeText(url);showToast(catalogText('toast.linkCopied'));}catch(error){window.prompt('Copiá este enlace',url);}
}

function relatedProductsFor(product) {
  const config=window.CatalogSiteSettings?.relatedProducts||{};
  if(config.enabled!==true)return[];
  const limit=Math.max(1,Math.min(8,Number(config.limit)||4));
  const available=products.filter(item=>Number(item.id)!==Number(product.id)&&!item.isHidden&&!item.archived);
  if(config.mode==='manual'){
    const byId=new Map(available.map(item=>[Number(item.id),item]));
    return (product.relatedProductIds||[]).map(Number).map(id=>byId.get(id)).filter(Boolean).slice(0,limit);
  }
  const categories=new Set(getProductSubcategories(product).map(normalizeColorName));
  return available.filter(item=>getProductSubcategories(item).some(category=>categories.has(normalizeColorName(category)))).sort((a,b)=>Number(productCollectionIds(b).includes(activeCollection))-Number(productCollectionIds(a).includes(activeCollection))||Number(b.inStock!==false)-Number(a.inStock!==false)||String(a.name).localeCompare(String(b.name),'es')).slice(0,limit);
}

function renderRelatedProducts(product) {
  const section=document.getElementById('modal-related'),grid=document.getElementById('modal-related-grid'),title=document.getElementById('modal-related-title');
  if(!section||!grid||!title)return;
  const config=window.CatalogSiteSettings?.relatedProducts||{},related=relatedProductsFor(product);grid.replaceChildren();title.textContent=String(config.title||'Completá el conjunto');section.hidden=!related.length;
  for(const item of related){const card=document.createElement('button'),imageWrap=document.createElement('span'),name=document.createElement('strong'),code=document.createElement('small'),source=getDisplayProductImageSources(item)[0];card.type='button';card.className='modal-related-card';card.setAttribute('aria-label',`Ver ${item.name}`);imageWrap.className='modal-related-image';if(source){const image=document.createElement('img');image.src=source;image.alt='';image.loading='lazy';imageWrap.append(image);}name.textContent=item.name;code.textContent=item.orderNumber?`Cód. ${item.orderNumber}`:'';card.append(imageWrap,name,code);card.onclick=()=>openModal(item);grid.append(card);}
}

function openModal(p, initialPurchaseOptionId = null) {
  lastFocusedElement = document.activeElement;
  currentModalProduct = p;
  currentPurchaseOptionId = initialPurchaseOptionId || p.purchaseOptions?.[0]?.id || null;
  const selectedOption = getSelectedPurchaseOption(p);
  const inCart = cart.some(c => c.cartKey === getCartKey(p, selectedOption?.id));
  const modalEl = document.getElementById('product-modal');
  modalEl.dataset.productId = String(p.id);
  syncProductUrl(p.id);

  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-gender').textContent = getGenderLabel(p.category);
  document.getElementById('modal-subcat').textContent = formatProductSubcategory(p);
  const modalAvailability = isPreorderCollection() && p.inStock
    ? 'PREVENTA · PRÓXIMAMENTE'
    : getStockLabel(p).toUpperCase();
  document.getElementById('modal-collection').textContent = `${getActiveCollection().name.toUpperCase()} · ${modalAvailability}`;
  const modalCode = document.getElementById('modal-code');
  const displayedOrderNumber = selectedOption?.orderNumber || p.orderNumber;
  modalCode.textContent = displayedOrderNumber ? `Cód. ${displayedOrderNumber}` : '';
  modalCode.hidden = !displayedOrderNumber;
  const modalPrice=document.getElementById('modal-price'),displayedPrice=productPriceValue(p,selectedOption);modalPrice.dataset.price=displayedPrice??'';modalPrice.textContent=formatPublicPrice(displayedPrice);modalPrice.hidden=displayedPrice===null;
  const modalDescription = document.getElementById('modal-desc');
  modalDescription.textContent = p.description || '';
  modalDescription.hidden = !p.description;
  const modalVideo=document.getElementById('modal-product-video'),videoUrl=/^https:\/\/[^\s<>"`]+$/i.test(p.videoUrl||'')?p.videoUrl:'';if(videoUrl){if(modalVideo.src!==videoUrl)modalVideo.src=videoUrl;modalVideo.hidden=false;}else{modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();modalVideo.hidden=true;}
  const modalPreorderNotice = document.getElementById('modal-preorder-notice');
  modalPreorderNotice.hidden = !isPreorderCollection() || !p.inStock;
  window.CatalogSiteMarkEditable?.();

  // Colors
  const colorsEl = document.getElementById('modal-colors');
  const displayedColors = selectedOption?.colors || p.colors;
  const showStockByColor = showsStockByColor(p, selectedOption);
  const swatchSettings=window.CatalogSiteSettings?.colorSwatches||{},swatchValues=swatchSettings.values||{};
  colorsEl.innerHTML = displayedColors.map((c, i) => {
    const unavailable = showStockByColor && isColorUnavailable(p, c, selectedOption);
    const status = unavailable ? 'Agotado' : 'Disponible';
    const stockClass = showStockByColor ? ` ${unavailable ? 'out-of-stock' : 'in-stock'}` : '';
    const stockLabel = showStockByColor ? `<span class="color-stock-label">${status}</span>` : '';
    const ariaLabel = showStockByColor ? `${c}: ${status}` : c;
    const swatchColor=swatchValues[normalizeColorName(c)],validSwatch=/^#[0-9a-f]{6}$/i.test(swatchColor||'')?swatchColor:'#777777';
    return `<span class="color-option${stockClass}"><button type="button" class="color-chip${unavailable ? ' out-of-stock' : ''}" data-color-index="${i}" data-color-key="${normalizeColorName(c)}" aria-label="${ariaLabel}" aria-pressed="${i === 0 ? 'true' : 'false'}"><span class="color-swatch" style="--swatch-color:${validSwatch}" aria-hidden="true"></span><span class="color-name">${c}</span>${stockLabel}</button></span>`;
  }).join('');

  // Sizes
  const sizesEl = document.getElementById('modal-sizes');
  const displayedSizes = selectedOption?.sizes || p.sizes;
  function renderSizeAvailability(color) {
    const unavailableSizes = new Set(p.outOfStockVariants?.[color] || []);
    sizesEl.innerHTML = displayedSizes.map(size => {
      const normalizedSize = normalizeCatalogSize(size);
      const isUnavailable = showStockByColor && (isColorUnavailable(p, color, selectedOption) || unavailableSizes.has(normalizedSize));
      const stockLabel = isUnavailable ? ' · Agotado' : '';
      return `<span class="size-chip${isUnavailable ? ' out-of-stock' : ''}"${isUnavailable ? ` title="${color} ${normalizedSize}: agotado" aria-label="${color} ${normalizedSize}: agotado"` : ''}>${normalizedSize}${stockLabel}</span>`;
    }).join('');
  }
  renderSizeAvailability(displayedColors[0]);

  // Packaging / curve
  renderPackagingTable(p);

  // Load modal image from local folder
  const modalImg = document.getElementById('modal-img');
  const modalImgWrap = document.querySelector('.modal-image-wrap');
  modalImgWrap.classList.remove('no-image');
  modalImg.style.display = 'none';
  modalImg.alt = p.name;
  const modalSettings = getProductModalSettings();
  modalImg.style.objectFit = window.matchMedia('(max-width: 768px)').matches ? (modalSettings.mobileFit || 'contain') : (modalSettings.desktopFit || 'cover');
  modalImgWrap.style.background = '#d6c8b7';
  modalImgWrap.style.aspectRatio = String(modalSettings.imageRatio || '3/4').replace('/', ' / ');
  modalEl.style.removeProperty('--modal-media-w');
  modalEl.style.removeProperty('--modal-w');

  // Remove old gallery controls if any
  modalImgWrap.querySelectorAll('.modal-gallery-dots, .modal-gallery-thumbnails, .gallery-arrow, .modal-empty-image').forEach(el => el.remove());

  // Build gallery without blocking the modal opening.
  const gallery = getProduction2027Gallery(p, displayedColors, selectedOption);
  const gallerySrcs = gallery.sources;
  let galleryIdx = 0;
  let dots = null;
  let thumbnails = null;
  let didSwipe = false;
  modalImg.onclick = null;
  modalImg.style.cursor = '';

  const zoomToggle = document.getElementById('modal-zoom-toggle');
  function setModalZoom(isZoomed, clientX = null, clientY = null) {
    if (!gallerySrcs.length) isZoomed = false;
    if (isZoomed && clientX !== null && clientY !== null) {
      const rect = modalImgWrap.getBoundingClientRect();
      const originX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const originY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      modalImg.style.transformOrigin = `${originX}% ${originY}%`;
    } else if (!isZoomed) {
      modalImg.style.transformOrigin = '50% 50%';
    }
    modalImgWrap.classList.toggle('is-zoomed', isZoomed);
    zoomToggle.setAttribute('aria-pressed', String(isZoomed));
    zoomToggle.setAttribute('aria-label', isZoomed ? 'Reducir imagen' : 'Ampliar imagen');
    const zoomLabel = zoomToggle.querySelector('.modal-zoom-label');
    if (zoomLabel) zoomLabel.textContent = isZoomed ? 'Reducir' : 'Ampliar';
  }

  setModalZoom(false);
  zoomToggle.onclick = (event) => {
    event.stopPropagation();
    setModalZoom(!modalImgWrap.classList.contains('is-zoomed'));
  };
  modalImg.onclick = (event) => {
    if (didSwipe) {
      didSwipe = false;
      return;
    }
    const isZoomed = modalImgWrap.classList.contains('is-zoomed');
    setModalZoom(!isZoomed, event.clientX, event.clientY);
  };
  modalImg.onmousemove = (event) => {
    if (!modalImgWrap.classList.contains('is-zoomed')) return;
    const rect = modalImgWrap.getBoundingClientRect();
    const originX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const originY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    modalImg.style.transformOrigin = `${originX}% ${originY}%`;
  };

  if (!gallerySrcs.length) {
    modalImgWrap.classList.add('no-image');
    const emptyImage = document.createElement('div');
    emptyImage.className = 'modal-empty-image';
    emptyImage.innerHTML = `
      <span class="modal-empty-kicker">Foto pendiente</span>
      <strong>${p.name}</strong>
    `;
    modalImgWrap.appendChild(emptyImage);
  }

  function updateDots() {
    dots?.querySelectorAll('.gallery-dot').forEach((dot, di) => dot.classList.toggle('active', di === galleryIdx));
    thumbnails?.querySelectorAll('.gallery-thumbnail').forEach((thumb, di) => {thumb.classList.toggle('active',di===galleryIdx);thumb.setAttribute('aria-pressed',String(di===galleryIdx));});
  }

  function updateColorChips() {
    colorsEl.querySelectorAll('.color-chip').forEach(chip => {
      const active = chip.dataset.galleryIndex !== '' && Number(chip.dataset.galleryIndex) === galleryIdx;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  function preloadNeighborImages() {
    if (gallerySrcs.length < 2) return;
    const nextIdx = (galleryIdx + 1) % gallerySrcs.length;
    const prevIdx = (galleryIdx - 1 + gallerySrcs.length) % gallerySrcs.length;
    [prevIdx, nextIdx].forEach(idx => preloadModalImage(gallerySrcs[idx], 'low'));
  }

  function fitModalToImage() {
    const ratioParts = String(modalSettings.imageRatio || '3/4').split('/').map(Number);
    const ratioW = ratioParts[0] > 0 ? ratioParts[0] : 3;
    const ratioH = ratioParts[1] > 0 ? ratioParts[1] : 4;
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

  function showGalleryFallback() {
    modalImg.removeAttribute('src');
    modalImg.style.display = 'none';
    modalImgWrap.classList.add('no-image');
    modalImgWrap.querySelectorAll('.modal-empty-image').forEach(el => el.remove());
    const emptyImage = document.createElement('div');
    emptyImage.className = 'modal-empty-image';
    emptyImage.innerHTML = `<span class="modal-empty-kicker">Foto no disponible</span><strong>${p.name}</strong>`;
    modalImgWrap.appendChild(emptyImage);
  }

  function showGalleryImage(index, attempts = 0) {
    if (!gallerySrcs.length) return;
    setModalZoom(false);
    galleryIdx = index;
    const targetSrc = gallerySrcs[index];
    modalImg.style.objectFit = window.matchMedia('(max-width: 768px)').matches ? (modalSettings.mobileFit || 'contain') : (modalSettings.desktopFit || 'cover');
    modalImgWrap.style.background = '#d6c8b7';
    const isFirstImage = !modalImg.src || modalImg.style.display === 'none';

    preloadModalImage(targetSrc, 'high').then(loaded => {
      if (galleryIdx !== index || currentModalProduct !== p) return;
      if (!loaded) {
        if (attempts + 1 < gallerySrcs.length) {
          showGalleryImage((index + 1) % gallerySrcs.length, attempts + 1);
        } else {
          showGalleryFallback();
        }
        return;
      }
      modalImgWrap.classList.remove('no-image');
      modalImgWrap.querySelectorAll('.modal-empty-image').forEach(el => el.remove());
      modalImg.src = targetSrc;
      fitModalToImage();
      modalImg.style.display = 'block';
      preloadNeighborImages();
    });

    if (isFirstImage) modalImg.style.display = 'none';
    updateDots();
    updateColorChips();
  }

  let swipeStartX = 0;
  let swipeStartY = 0;
  let touchSwipeStarted = false;
  modalImgWrap.dataset.swipeEnabled = gallerySrcs.length > 1 ? 'true' : 'false';
  modalImgWrap.onpointerdown = (event) => {
    if (modalImgWrap.classList.contains('is-zoomed') || !event.isPrimary || event.target.closest('button')) return;
    didSwipe = false;
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
    if (event.pointerType !== 'touch' && modalImgWrap.setPointerCapture) {
      modalImgWrap.setPointerCapture(event.pointerId);
    }
  };
  modalImgWrap.onpointerup = (event) => {
    if (event.pointerType === 'touch') return;
    if (modalImgWrap.classList.contains('is-zoomed') || gallerySrcs.length < 2 || !event.isPrimary || event.target.closest('button')) return;
    const deltaX = event.clientX - swipeStartX;
    const deltaY = event.clientY - swipeStartY;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    didSwipe = true;
    showGalleryImage(deltaX < 0
      ? (galleryIdx + 1) % gallerySrcs.length
      : (galleryIdx - 1 + gallerySrcs.length) % gallerySrcs.length);
  };
  modalImgWrap.ontouchstart = (event) => {
    if (modalImgWrap.classList.contains('is-zoomed') || gallerySrcs.length < 2 || event.target.closest('button')) return;
    const touch = event.touches[0];
    if (!touch) return;
    didSwipe = false;
    touchSwipeStarted = true;
    swipeStartX = touch.clientX;
    swipeStartY = touch.clientY;
  };
  modalImgWrap.ontouchend = (event) => {
    if (!touchSwipeStarted || modalImgWrap.classList.contains('is-zoomed') || event.target.closest('button')) return;
    touchSwipeStarted = false;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - swipeStartX;
    const deltaY = touch.clientY - swipeStartY;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    didSwipe = true;
    showGalleryImage(deltaX < 0
      ? (galleryIdx + 1) % gallerySrcs.length
      : (galleryIdx - 1 + gallerySrcs.length) % gallerySrcs.length);
  };
  modalImgWrap.ontouchcancel = () => {
    touchSwipeStarted = false;
  };

  const colorGalleryIndices = new Set();
  colorsEl.querySelectorAll('.color-chip').forEach((chip, colorIndex) => {
    const galleryIndex = getProduction2027ColorGalleryIndex(gallery, displayedColors[colorIndex]);
    chip.dataset.galleryIndex = galleryIndex ?? '';
    chip.classList.toggle('no-photo', galleryIndex === null);
    if (galleryIndex !== null) colorGalleryIndices.add(galleryIndex);
    chip.addEventListener('click', () => {
      colorsEl.querySelectorAll('.color-chip').forEach(item => {
        item.classList.toggle('active', item === chip);
        item.setAttribute('aria-pressed', String(item === chip));
      });
      renderSizeAvailability(displayedColors[colorIndex]);
      if (galleryIndex !== null) showGalleryImage(galleryIndex);
    });
  });

  colorGalleryIndices.forEach(index => preloadModalImage(gallerySrcs[index], 'low'));

  if (gallerySrcs.length > 1) {
    dots = document.createElement('div');
    dots.className = 'modal-gallery-dots';
    gallerySrcs.forEach((_, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Ver foto ${i + 1} de ${gallerySrcs.length}`);
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

    thumbnails = document.createElement('div');
    thumbnails.className = 'modal-gallery-thumbnails';
    gallerySrcs.forEach((source,index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = `gallery-thumbnail${index===0?' active':''}`;
      thumb.setAttribute('aria-label',`Ver miniatura ${index+1}`);
      thumb.setAttribute('aria-pressed',String(index===0));
      const image = document.createElement('img');image.src=source;image.alt='';image.loading='lazy';
      thumb.append(image);thumb.addEventListener('click',event=>{event.stopPropagation();showGalleryImage(index);});
      thumbnails.append(thumb);
    });
    modalImgWrap.appendChild(thumbnails);
  }

  showGalleryImage(0);

  const addBtn = document.getElementById('modal-add-btn');
  addBtn.disabled = !canOrderProduct(p, getActiveCollection(), selectedOption);
  addBtn.textContent = getModalAddButtonLabel(p, selectedOption, inCart);
  addBtn.className = 'btn-add-modal' + (inCart ? ' in-cart' : '') + (canOrderProduct(p, getActiveCollection(), selectedOption) ? '' : ' disabled');

  renderRelatedProducts(p);
  applyProductModalSettings();

  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => productModal.focus());
}

function closeModal() {
  if (!modalOverlay.classList.contains('active')) return;
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const modalImgWrap = document.querySelector('.modal-image-wrap');
  const zoomToggle = document.getElementById('modal-zoom-toggle');
  document.getElementById('modal-product-video')?.pause();
  modalImgWrap?.classList.remove('is-zoomed');
  if (zoomToggle) zoomToggle.setAttribute('aria-pressed', 'false');
  currentModalProduct = null;
  currentPurchaseOptionId = null;
  syncProductUrl(null);
  lastFocusedElement?.focus?.();
}

// ── CART ─────────────────────────────────────────
function toggleCart(product, optionId = null) {
  if (!product.inStock) {
    showToast(`"${product.name}" está fuera de stock`);
    return;
  }
  if (isPreorderCollection()) {
    showToast(`"${product.name}" todavía no está disponible para pedir`);
    return;
  }
  const selectedOption = optionId ? product.purchaseOptions?.find(option => option.id === optionId) : null;
  if (!hasAvailableColor(product, selectedOption)) {
    showToast(`"${product.name}" no tiene colores disponibles en esta opción`);
    return;
  }
  const cartKey = getCartKey(product, selectedOption?.id || null);
  const idx = cart.findIndex(item => item.cartKey === cartKey);
  if (idx === -1) {
    cart.push({ ...product, cartKey, cartCollectionId: activeCollection, selectedPurchaseOption: selectedOption || null, quantity: 1 });
    showToast(`"${product.name}"${selectedOption ? ` · ${selectedOption.label}` : ''} agregada`);
  } else {
    cart.splice(idx, 1);
    showToast(`"${product.name}"${selectedOption ? ` · ${selectedOption.label}` : ''} quitada`);
  }
  updateCartUI();
  updateCardStates();
}

function removeFromCart(cartKey) {
  cart = cart.filter(item => item.cartKey !== cartKey);
  updateCartUI();
  updateCardStates();
}

function clearCart() {
  cart = [];
  updateCartUI();
  updateCardStates();
}

function getCartProductColors(product) {
  const option=product.selectedPurchaseOption||null;
  return (option?.colors || product.colors).filter(color=>!isColorUnavailable(product,color,option));
}

function getCartProductTotalLabel(product) {
  const packaging = product.selectedPurchaseOption?.packaging || product.packaging;
  return packaging?.totalLabel || "-";
}

function getCartSettings() {
  return window.CatalogSiteSettings?.cart || {};
}

function getCartProductPieceRange(product) {
  const packaging=product.selectedPurchaseOption?.packaging||product.packaging||{};
  if(Number.isInteger(packaging.totalPieces))return{min:packaging.totalPieces,max:packaging.totalPieces};
  const totals=(packaging.rows||[]).map(row=>Number.isInteger(row.pieces)?row.pieces:Object.values(row.sizePieces||{}).every(Number.isInteger)?Object.values(row.sizePieces||{}).reduce((sum,value)=>sum+value,0):null).filter(Number.isInteger);
  if(!totals.length)return null;
  return{min:Math.min(...totals),max:Math.max(...totals)};
}

function cartPiecesLabel(product,quantity=1) {
  const range=getCartProductPieceRange(product);if(!range)return'';
  const min=range.min*quantity,max=range.max*quantity;
  return min===max?`${min} piezas`:`${min}–${max} piezas`;
}

function setCartQuantity(cartKey,quantity) {
  const item=cart.find(entry=>entry.cartKey===cartKey);if(!item)return;
  const max=Math.max(1,Math.min(999,Number(getCartSettings().maxQuantity)||99));
  item.quantity=Math.max(1,Math.min(max,Number(quantity)||1));
  updateCartUI();
}

function getCartTotals() {
  const boxes=cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0),ranges=cart.map(item=>{const range=getCartProductPieceRange(item),quantity=Number(item.quantity)||1;return range?{min:range.min*quantity,max:range.max*quantity}:null;}).filter(Boolean);
  return{boxes,minPieces:ranges.reduce((sum,range)=>sum+range.min,0),maxPieces:ranges.reduce((sum,range)=>sum+range.max,0),complete:ranges.length===cart.length};
}

function updateCartSummary() {
  const config=getCartSettings(),minimum=Math.max(0,Number(config.minimumBoxes)||0),terms=String(config.termsText||'').trim(),enabled=cart.length>0&&(config.quantities===true||minimum>0||terms);
  if(!cartSummaryEl)return;
  cartSummaryEl.hidden=!enabled;
  if(!enabled){cartSummaryEl.replaceChildren();const whatsapp=document.getElementById('btn-whatsapp');if(whatsapp)whatsapp.disabled=false;return;}
  const {boxes,minPieces,maxPieces,complete}=getCartTotals();
  cartSummaryEl.replaceChildren();
  if(config.quantities===true){const boxesRow=document.createElement('p'),boxesLabel=document.createElement('span'),boxesValue=document.createElement('strong');boxesLabel.textContent=config.totalBoxesLabel||'Total de cajas';boxesValue.textContent=String(boxes);boxesRow.append(boxesLabel,boxesValue);cartSummaryEl.append(boxesRow);if(config.showPieceTotals!==false&&complete){const piecesRow=document.createElement('p'),piecesLabel=document.createElement('span'),piecesValue=document.createElement('strong');piecesLabel.textContent=config.totalPiecesLabel||'Total de piezas';piecesValue.textContent=String(minPieces===maxPieces?minPieces:`${minPieces}–${maxPieces}`);piecesRow.append(piecesLabel,piecesValue);cartSummaryEl.append(piecesRow);}}
  const belowMinimum=minimum>0&&boxes<minimum;if(minimum>0){const warning=document.createElement('p');warning.className=`cart-minimum${belowMinimum?' unmet':' met'}`;warning.textContent=belowMinimum?String(config.minimumMessage||'El pedido mínimo es de {n} cajas.').replaceAll('{n}',String(minimum)):`Mínimo alcanzado · ${minimum} cajas`;cartSummaryEl.append(warning);}if(terms){const conditions=document.createElement('p');conditions.className='cart-terms';conditions.textContent=terms;cartSummaryEl.append(conditions);}const whatsapp=document.getElementById('btn-whatsapp');if(whatsapp)whatsapp.disabled=belowMinimum;
}

function getCartCustomerLines() {
  const config=getCartSettings(),lines=[];
  if(config.customerFields===true){
    if(config.showCustomerName!==false&&cartCustomer.name.trim())lines.push([config.customerNameLabel||'Nombre',cartCustomer.name.trim()]);
    if(config.showCustomerBusiness!==false&&cartCustomer.business.trim())lines.push([config.customerBusinessLabel||'Comercio',cartCustomer.business.trim()]);
    if(config.showCustomerCity!==false&&cartCustomer.city.trim())lines.push([config.customerCityLabel||'Ciudad',cartCustomer.city.trim()]);
    if(config.showCustomerPhone!==false&&cartCustomer.phone.trim())lines.push([config.customerPhoneLabel||'Teléfono',cartCustomer.phone.trim()]);
  }
  if(config.notes===true&&cartCustomer.note.trim())lines.push([config.noteLabel||'Nota para el pedido',cartCustomer.note.trim()]);
  return lines;
}

function getCartCustomerText() {
  return getCartCustomerLines().map(([label,value])=>`${label}: ${value}`).join('\n');
}

function updateCartCustomerForm() {
  if(!cartCustomerEl)return;
  const config=getCartSettings(),showFields=config.customerFields===true,showNote=config.notes===true;
  cartCustomerEl.hidden=!(showFields||showNote);
  cartCustomerEl.replaceChildren();
  if(cartCustomerEl.hidden)return;
  const addField=(key,label,type='text')=>{const wrap=document.createElement('label'),caption=document.createElement('span'),input=type==='textarea'?document.createElement('textarea'):document.createElement('input');caption.textContent=label;input.value=cartCustomer[key]||'';if(type!=='textarea')input.type=type;input.maxLength=key==='note'?500:120;input.autocomplete=key==='name'?'name':key==='phone'?'tel':key==='business'?'organization':key==='city'?'address-level2':'off';input.addEventListener('input',()=>{cartCustomer[key]=input.value;persistCartCustomer();});wrap.append(caption,input);cartCustomerEl.append(wrap);};
  if(showFields){if(config.showCustomerName!==false)addField('name',config.customerNameLabel||'Nombre');if(config.showCustomerBusiness!==false)addField('business',config.customerBusinessLabel||'Comercio');if(config.showCustomerCity!==false)addField('city',config.customerCityLabel||'Ciudad');if(config.showCustomerPhone!==false)addField('phone',config.customerPhoneLabel||'Teléfono','tel');}
  if(showNote)addField('note',config.noteLabel||'Nota para el pedido','textarea');
}

function updateCartUI() {
  persistCart();
  const count = cart.length;
  const cartConfig=getCartSettings(),quantityEnabled=cartConfig.quantities===true;

  // Count badge
  cartCountEl.textContent = count;
  cartCountEl.classList.add('bump');
  setTimeout(() => cartCountEl.classList.remove('bump'), 250);

  // Empty / filled state
  cartEmptyEl.style.display = count === 0 ? 'flex' : 'none';
  cartItemsEl.style.display = count === 0 ? 'none' : 'block';
  cartActionsEl.style.display = count === 0 ? 'none' : 'flex';
  updateCartCustomerForm();
  updateCartSummary();

  // Render cart items
  cartItemsEl.innerHTML = '';
  cart.forEach(p => {
    const item = document.createElement('div');
    const cartImageSources = getDisplayProductImageSources(p);
    const cartImageSrc = cartImageSources[0] || '';
    const placeholderDisplay = cartImageSources.length ? 'none' : 'flex';
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
        ${p.selectedPurchaseOption ? `<p class="cart-item-gender">${p.selectedPurchaseOption.label}</p>` : ''}
        ${quantityEnabled?'<div class="cart-item-quantity"></div>':''}
      </div>
      <button class="cart-item-remove" data-cart-key="${p.cartKey}" aria-label="Eliminar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;
    const cartImg = item.querySelector('.cart-item-img img');
    if (cartImg) {
      const placeholder = item.querySelector('.cart-item-img-placeholder');
      loadFirstAvailableImage(cartImageSources, cartImg, placeholder);
    }
    item.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(p.cartKey));
    if(quantityEnabled){const quantity=Math.max(1,Number(p.quantity)||1),wrap=item.querySelector('.cart-item-quantity'),label=document.createElement('span'),controls=document.createElement('span'),minus=document.createElement('button'),value=document.createElement('strong'),plus=document.createElement('button'),pieces=document.createElement('small');label.textContent=cartConfig.quantityLabel||'Cajas';minus.type=plus.type='button';minus.textContent='−';plus.textContent='+';minus.setAttribute('aria-label',`Quitar una caja de ${p.name}`);plus.setAttribute('aria-label',`Agregar una caja de ${p.name}`);minus.disabled=quantity<=1;plus.disabled=quantity>=Math.max(1,Number(cartConfig.maxQuantity)||99);value.textContent=String(quantity);minus.onclick=()=>setCartQuantity(p.cartKey,quantity-1);plus.onclick=()=>setCartQuantity(p.cartKey,quantity+1);controls.append(minus,value,plus);wrap.append(label,controls);if(cartConfig.showPieceTotals!==false){pieces.textContent=cartPiecesLabel(p,quantity);if(pieces.textContent)wrap.append(pieces);}}
    cartItemsEl.appendChild(item);
  });
  window.CatalogSiteMarkEditable?.();

  // Update modal add button if open
  if (currentModalProduct) {
    const option = getSelectedPurchaseOption(currentModalProduct);
    const inCart = cart.some(c => c.cartKey === getCartKey(currentModalProduct, option?.id));
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.disabled = !canOrderProduct(currentModalProduct, getActiveCollection(), option);
    addBtn.textContent = getModalAddButtonLabel(currentModalProduct, option, inCart);
    addBtn.className = 'btn-add-modal' + (inCart ? ' in-cart' : '') + (canOrderProduct(currentModalProduct, getActiveCollection(), option) ? '' : ' disabled');
  }
}

function updateCardStates() {
  document.querySelectorAll('.card-add').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const product = products.find(p => p.id === id);
    const inCart = cart.some(c => c.id === id);
    btn.disabled = product ? !canOrderProduct(product) : false;
    btn.classList.toggle('added', inCart);
    btn.innerHTML = inCart
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  });
}

// ── WHATSAPP ─────────────────────────────────────
function sendWhatsApp() {
  if (cart.length === 0) { showToast(catalogText('toast.empty')); return; }

  const collection = getActiveCollection();
  const lines = [`*Mi selección — BYE BYE ${collection.name}*`, ''];
  cart.forEach((p, i) => {
    lines.push(`${i + 1}. *${p.name}*`);
    if (p.selectedPurchaseOption) lines.push(`   Opción: ${p.selectedPurchaseOption.label}`);
    lines.push(`   Categoría: ${formatProductSubcategory(p)} | ${getGenderLabel(p.category)}`);
    lines.push(`   Colores disponibles: ${getCartProductColors(p).join(', ')}`);
    lines.push(`   Piezas por caja: ${getCartProductTotalLabel(p)}`);
    if(getCartSettings().quantities===true){const quantity=Number(p.quantity)||1;lines.push(`   ${getCartSettings().quantityLabel||'Cajas'}: ${quantity}`);const totalPieces=cartPiecesLabel(p,quantity);if(totalPieces)lines.push(`   ${getCartSettings().totalPiecesLabel||'Total de piezas'}: ${totalPieces.replace(/ piezas$/,'')}`);}
    lines.push('');
  });
  const items=lines.join('\n').trim(),template=window.CatalogSiteSettings?.whatsapp?.template||'¡Hola! Quisiera pedir cotización de estas prendas.\n\n{items}\n\nTotal de prendas seleccionadas: {n}';
  const totalBoxes=cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0),customerText=getCartCustomerText(),hasCustomerVariable=template.includes('{cliente}');let message=template.replaceAll('{marca}',window.CatalogSiteSettings?.header?.brandName||'BYE BYE').replaceAll('{coleccion}',collection.name).replaceAll('{items}',items).replaceAll('{n}',String(cart.length)).replaceAll('{cajas}',String(totalBoxes)).replaceAll('{cliente}',customerText);if(customerText&&!hasCustomerVariable)message=`${message}\n\n${customerText}`;
  const msg = encodeURIComponent(message);
  const whatsappNumber = String(window.CatalogSiteSettings?.whatsapp?.number || '').replace(/\D/g, '');
  window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
}

// ── PDF ───────────────────────────────────────────
function downloadPDF() {
  if (cart.length === 0) { showToast(catalogText('toast.empty')); return; }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const pageW = 210;
  const margin = 20;
  let y = margin;

  // Header bar
  const selectionSettings=window.CatalogSiteSettings?.selectionPdf||{},selectionHeader=pdfColor(selectionSettings.headerColor,[10,10,10]),selectionAccent=pdfColor(selectionSettings.accentColor,[200,169,110]);
  doc.setFillColor(...selectionHeader);
  doc.rect(0, 0, pageW, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(catalogText('selectionPdf.brand'), margin, 17);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...selectionAccent);
  const collection = getActiveCollection();
  doc.text(catalogText('selectionPdf.catalog',{coleccion:collection.name}).toUpperCase(), pageW - margin, 10, { align: 'right' });
  doc.setTextColor(180, 180, 180);
  doc.text(collection.tagline, pageW - margin, 17, { align: 'right' });

  y = 40;

  // Title
  doc.setTextColor(10, 10, 10);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(catalogText('selectionPdf.title'), margin, y);

  const date = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text(date, pageW - margin, y, { align: 'right' });

  y += 4;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  const customerPdfLines=getCartCustomerLines().flatMap(([label,value])=>doc.splitTextToSize(`${label}: ${value}`,pageW-margin*2-12));
  if(customerPdfLines.length){const customerHeight=Math.max(16,customerPdfLines.length*5+9);doc.setFillColor(245,242,238);doc.roundedRect(margin,y,pageW-margin*2,customerHeight,2,2,'F');doc.setFontSize(8.5);doc.setFont('helvetica','normal');doc.setTextColor(70,70,70);doc.text(customerPdfLines,margin+6,y+7);y+=customerHeight+8;}

  // Products
  cart.forEach((p, i) => {
    if (y > 255) {
      doc.addPage();
      y = margin;
    }

    // Item number circle
    doc.setFillColor(...selectionHeader);
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
    doc.setTextColor(...selectionAccent);
    doc.text(`${catalogText('selectionPdf.colors')} `, margin + 12, y);
    doc.setTextColor(60, 60, 60);
    const colText = getCartProductColors(p).join(', ');
    const colLines = doc.splitTextToSize(colText, pageW - margin * 2 - 30);
    doc.text(colLines, margin + 28, y);
    y += colLines.length * 5 + 2;

    // Total pieces
    doc.setTextColor(...selectionAccent);
    doc.text(`${catalogText('selectionPdf.pieces')} `, margin + 12, y);
    doc.setTextColor(60, 60, 60);
    doc.text(getCartProductTotalLabel(p), margin + 42, y);
    y += 6;

    if(getCartSettings().quantities===true){const quantity=Number(p.quantity)||1;doc.setTextColor(...selectionAccent);doc.text(`${getCartSettings().quantityLabel||'Cajas'}: `,margin+12,y);doc.setTextColor(60,60,60);doc.text(String(quantity),margin+30,y);const pieces=cartPiecesLabel(p,quantity);if(pieces){doc.setTextColor(...selectionAccent);doc.text(`${getCartSettings().totalPiecesLabel||'Total de piezas'}: `,margin+42,y);doc.setTextColor(60,60,60);doc.text(pieces.replace(/ piezas$/,''),margin+76,y);}y+=6;}

    doc.setDrawColor(235, 235, 235);
    doc.line(margin, y, pageW - margin, y);
    y += 8;
  });

  // Summary
  if (y > 255) { doc.addPage(); y = margin; }
  y += 4;
  doc.setFillColor(245, 242, 238);
  const quantitySummary=getCartSettings().quantities===true,summaryHeight=quantitySummary?30:18;
  doc.roundedRect(margin, y, pageW - margin * 2, summaryHeight, 2, 2, 'F');
  doc.setTextColor(10, 10, 10);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(catalogText('selectionPdf.total',{n:cart.length}), margin + 8, y + 11);
  if(quantitySummary){const totals=getCartTotals();doc.setFontSize(8.5);doc.setFont('helvetica','normal');doc.setTextColor(70,70,70);doc.text(`${getCartSettings().totalBoxesLabel||'Total de cajas'}: ${totals.boxes}`,margin+8,y+19);if(getCartSettings().showPieceTotals!==false&&totals.complete)doc.text(`${getCartSettings().totalPiecesLabel||'Total de piezas'}: ${totals.minPieces===totals.maxPieces?totals.minPieces:`${totals.minPieces}–${totals.maxPieces}`}`,margin+8,y+25);}

  // Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let pg = 1; pg <= totalPages; pg++) {
    doc.setPage(pg);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text(catalogText('selectionPdf.footer',{coleccion:collection.name}), margin, 292);
    doc.text(catalogText('selectionPdf.page',{pagina:pg,total:totalPages}), pageW - margin, 292, { align: 'right' });
  }

  const selectionFilename=managedPdfFilename(selectionSettings.filename,{coleccion:collection.name.replace(/\s+/g,'')},`ByeBye_Seleccion_${collection.name.replace(/\s+/g, '')}.pdf`);
  doc.save(selectionFilename||`ByeBye_Seleccion_${collection.name.replace(/\s+/g, '')}.pdf`);
  showToast(catalogText('toast.pdf'));
}

function loadPdfImage(src) {
  return new Promise(resolve => {
    const image = new Image();
    // Las fotos administradas viven en el almacenamiento público de Supabase.
    // Cargarlas con CORS permite dibujarlas en canvas y conservarlas en el PDF.
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      try {
        const maxSide = 1800;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        context.fillStyle = '#fffaf1';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // The catalog cards use a 3:4 frame with object-fit: cover. Prepare the
        // same crop once so PDF frames are completely filled without borders.
        const coverCanvas = document.createElement('canvas');
        coverCanvas.width = 900;
        coverCanvas.height = 1200;
        const coverContext = coverCanvas.getContext('2d');
        const targetRatio = coverCanvas.width / coverCanvas.height;
        const sourceRatio = image.naturalWidth / image.naturalHeight;
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = image.naturalWidth;
        let sourceHeight = image.naturalHeight;
        if (sourceRatio > targetRatio) {
          sourceWidth = image.naturalHeight * targetRatio;
          sourceX = (image.naturalWidth - sourceWidth) / 2;
        } else if (sourceRatio < targetRatio) {
          sourceHeight = image.naturalWidth / targetRatio;
          sourceY = (image.naturalHeight - sourceHeight) / 2;
        }
        coverContext.drawImage(
          image,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          coverCanvas.width,
          coverCanvas.height
        );
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', .88),
          coverDataUrl: coverCanvas.toDataURL('image/jpeg', .9),
          width: canvas.width,
          height: canvas.height
        });
      } catch (error) {
        resolve(null);
      }
    };
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function getPdfPhotoLabel(product, gallery, imageIndex, colors) {
  const linkedColors = colors.filter(color => {
    return getProduction2027ColorGalleryIndex(gallery, color) === imageIndex;
  });
  return linkedColors.join(' / ');
}

function groupPdfPhotos(images) {
  return {
    model: images.filter(image => !image.label),
    color: images.filter(image => image.label)
  };
}

function safePdfFilename(value) {
  return String(value || 'Producto')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

async function downloadProductPDF(product, optionId = null) {
  if (!product) return;
  const button = document.getElementById('modal-pdf-btn');
  const originalButtonHtml = button?.innerHTML;
  if (button) {
    button.disabled = true;
    button.textContent = catalogText('productPdf.preparing');
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    const selectedOption = optionId
      ? product.purchaseOptions?.find(option => option.id === optionId)
      : product.purchaseOptions?.[0] || null;
    const colors = selectedOption?.colors || product.colors || [];
    const sizes = selectedOption?.sizes || product.sizes || [];
    const packaging = selectedOption?.packaging || product.packaging || null;
    const packingLabel = selectedOption?.sourcePacking || product.sourcePacking || '';
    const orderNumber = selectedOption?.orderNumber || product.orderNumber || '';
    const gallery = getProduction2027Gallery(product, colors, selectedOption);
    const loadedImages = (await Promise.all(gallery.sources.map(loadPdfImage)))
      .map((image, index) => image ? {
        ...image,
        label: getPdfPhotoLabel(product, gallery, index, colors)
      } : null)
      .filter(Boolean);

    const pageW = 210;
    const pageH = 297;
    const margin = 16;
    const productPdfSettings=window.CatalogSiteSettings?.productPdf||{};
    const beige = pdfColor(productPdfSettings.background,[246, 239, 228]);
    const ink = pdfColor(productPdfSettings.textColor,[31, 26, 21]);
    const terracotta = pdfColor(productPdfSettings.accentColor,[157, 79, 56]);
    const muted = [108, 96, 82];

    function paintPageHeader(kicker) {
      doc.setFillColor(...beige);
      doc.rect(0, 0, pageW, pageH, 'F');
      doc.setTextColor(...ink);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(17);
      doc.text(catalogText('productPdf.brand'), margin, 17);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...terracotta);
      doc.text(kicker.toUpperCase(), pageW - margin, 16, { align: 'right' });
      doc.setDrawColor(199, 181, 160);
      doc.line(margin, 23, pageW - margin, 23);
    }

    function addFooter() {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...muted);
      doc.text(catalogText('productPdf.footer'), margin, 289);
      doc.text(catalogText('productPdf.page',{pagina:doc.internal.getCurrentPageInfo().pageNumber}), pageW - margin, 289, { align: 'right' });
    }

    function drawCoverImage(image, x, y, width, height) {
      doc.addImage(image.coverDataUrl, 'JPEG', x, y, width, height, undefined, 'FAST');
    }

    function drawPhotoPage(title, images) {
      if(title==='Fotos de modelo')title=catalogText('productPdf.modelPhotos');
      if(title==='Fotos por color')title=catalogText('productPdf.colorPhotos');
      paintPageHeader(`${product.name} · ${title}`);
      doc.setTextColor(...ink);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(title.toUpperCase(), margin, 34);

      const gap = 4;
      const labelH = 7;
      const contentTop = 40;
      const contentBottom = 280;
      const contentWidth = pageW - margin * 2;
      const contentHeight = contentBottom - contentTop;
      let best = null;
      for (let columns = 1; columns <= images.length; columns += 1) {
        const rows = Math.ceil(images.length / columns);
        const cellWidth = (contentWidth - gap * (columns - 1)) / columns;
        const cellHeight = (contentHeight - gap * (rows - 1)) / rows;
        const frameWidth = Math.min(cellWidth, (cellHeight - labelH) * .75);
        const frameHeight = frameWidth / .75;
        const score = frameWidth * frameHeight;
        if (!best || score > best.score) best = { columns, rows, cellWidth, cellHeight, frameWidth, frameHeight, score };
      }

      const gridHeight = best.rows * best.cellHeight + gap * (best.rows - 1);
      const startY = contentTop + Math.max(0, (contentHeight - gridHeight) / 2);
      images.forEach((image, index) => {
        const row = Math.floor(index / best.columns);
        const column = index % best.columns;
        const rowCount = Math.min(best.columns, images.length - row * best.columns);
        const rowWidth = rowCount * best.cellWidth + gap * (rowCount - 1);
        const rowStartX = margin + (contentWidth - rowWidth) / 2;
        const cellX = rowStartX + column * (best.cellWidth + gap);
        const cellY = startY + row * (best.cellHeight + gap);
        const imageX = cellX + (best.cellWidth - best.frameWidth) / 2;
        const imageY = cellY;
        doc.setDrawColor(199, 181, 160);
        doc.roundedRect(imageX, imageY, best.frameWidth, best.frameHeight, 1.5, 1.5, 'S');
        drawCoverImage(image, imageX, imageY, best.frameWidth, best.frameHeight);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(Math.max(6.5, Math.min(9, best.frameWidth / 9)));
        doc.setTextColor(...terracotta);
        doc.text(
          image.label || catalogText('productPdf.modelPhoto',{n:index+1}),
          cellX + best.cellWidth / 2,
          imageY + best.frameHeight + 4.8,
          { align: 'center', maxWidth: best.cellWidth }
        );
      });
    }

    const photoGroups = groupPdfPhotos(loadedImages);
    let pageStarted = false;
    function startSectionPage() {
      if (pageStarted) doc.addPage();
      pageStarted = true;
    }
    if (photoGroups.model.length) {
      startSectionPage();
      drawPhotoPage('Fotos de modelo', photoGroups.model);
    }
    if (photoGroups.color.length) {
      startSectionPage();
      drawPhotoPage('Fotos por color', photoGroups.color);
    }

    // Product information deliberately comes after every photo page.
    startSectionPage();
    paintPageHeader(`${getActiveCollection().name} · ${catalogText('productPdf.info')||'Información del producto'}`);
    let y = 34;
    doc.setTextColor(...ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    const titleLines = doc.splitTextToSize(product.name, pageW - margin * 2);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 9 + 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(`${getGenderLabel(product.category)} · ${formatProductSubcategory(product)}`, margin, y);
    doc.setTextColor(...(product.inStock ? [76, 105, 75] : terracotta));
    doc.text(getStockLabel(product), pageW - margin, y, { align: 'right' });
    y += 10;

    function drawInfoBlock(label, value) {
      if (!value) return;
      const valueLines = doc.splitTextToSize(String(value), pageW - margin * 2 - 40);
      const blockH = Math.max(12, valueLines.length * 4.5 + 6);
      doc.setFillColor(255, 250, 241);
      doc.roundedRect(margin, y, pageW - margin * 2, blockH, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...terracotta);
      doc.text(label.toUpperCase(), margin + 5, y + 7.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...ink);
      doc.text(valueLines, margin + 40, y + 7.5);
      y += blockH + 3;
    }

    drawInfoBlock(catalogText('productPdf.code'), orderNumber);
    drawInfoBlock(catalogText('productPdf.colors'), colors.join(', '));
    drawInfoBlock(catalogText('productPdf.sizes'), sizes.map(normalizeCatalogSize).join(', '));
    drawInfoBlock(catalogText('productPdf.packing'), packingLabel);
    if (packaging?.totalLabel) drawInfoBlock(catalogText('productPdf.quantity'), packaging.totalLabel);
    if (product.description) drawInfoBlock(catalogText('productPdf.detail'), product.description);

    if (packaging?.rows?.length) {
      y += 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...ink);
      doc.text(catalogText('productPdf.curveTitle'), margin, y + 5);
      y += 11;

      function drawTableHeader() {
        doc.setFillColor(...ink);
        doc.rect(margin, y, pageW - margin * 2, 9, 'F');
        doc.setTextColor(255, 250, 241);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.text(catalogText('productPdf.curveColor'), margin + 4, y + 6);
        doc.text(catalogText('productPdf.curveSizes'), margin + 55, y + 6);
        doc.text(catalogText('productPdf.curvePieces'), pageW - margin - 4, y + 6, { align: 'right' });
        y += 9;
      }

      drawTableHeader();
      packaging.rows.forEach((row, index) => {
        const curve = formatCurve(row, sizes);
        const curveLines = doc.splitTextToSize(curve, 92);
        const rowH = Math.max(10, curveLines.length * 4 + 4);
        if (y + rowH > 280) {
          doc.addPage();
          paintPageHeader(`${product.name} · ${catalogText('productPdf.continued')}`);
          y = 32;
          drawTableHeader();
        }
        if (index % 2 === 0) {
          doc.setFillColor(255, 250, 241);
          doc.rect(margin, y, pageW - margin * 2, rowH, 'F');
        }
        const pieces = getRowPiecesLabel(row);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...ink);
        doc.text(row.color || '-', margin + 4, y + 6);
        doc.text(curveLines, margin + 55, y + 6);
        doc.text(String(pieces || '-'), pageW - margin - 4, y + 6, { align: 'right' });
        y += rowH;
      });
    }

    const totalPages = doc.internal.getNumberOfPages();
    for (let page = 1; page <= totalPages; page += 1) {
      doc.setPage(page);
      addFooter();
    }

    doc.setProperties({
      title: product.name,
      subject: catalogText('productPdf.subject',{producto:product.name}),
      author: catalogText('productPdf.brand'),
      creator: catalogText('productPdf.brand')
    });
    const productFilename=managedPdfFilename(productPdfSettings.filename,{producto:product.name},`ByeBye_${safePdfFilename(product.name)}.pdf`);
    doc.save(productFilename||`ByeBye_${safePdfFilename(product.name)}.pdf`);
    showToast(catalogText('toast.productPdf'));
  } catch (error) {
    console.error('No se pudo generar la ficha PDF', error);
    showToast(catalogText('toast.pdfError'));
  } finally {
    if (button) {
      button.disabled = false;
      button.innerHTML = originalButtonHtml;
    }
  }
}

// ── TOAST ─────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function keepFocusInside(container, event) {
  const focusable = [...container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(element => element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function activateCatalogCollection(collectionId) {
  if (!collectionCanBeSelected(collectionId)) return;
  activeCollection = collectionId;
  activeGender = 'all';
  activeCategory = 'all';
  productSearchQuery = '';
  if (productSearchInput) productSearchInput.value = '';
  if (productSearchClear) productSearchClear.hidden = true;
  document.querySelectorAll('#collection-filters .pill,#catalog-collection-tabs .pill').forEach(button => {
    button.classList.toggle('active', button.dataset.value === activeCollection);
  });
  genderFilters.querySelectorAll('.pill').forEach(button => {
    button.classList.toggle('active', button.dataset.value === 'all');
  });
  updateGenderFilters();
  categoryFilters.innerHTML = '';
  buildCategoryFilters();
  renderProducts();
}

function initHeroCarousel() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;
  const allSlides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = [...carousel.querySelectorAll('.hero-dot')];
  if (!allSlides.length) return;

  let activeIndex = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;

  let audience={collection:activeCollection,gender:activeGender};
  const eligibleSlides=()=>{const matches=allSlides.filter(slide=>{const rule=slide.dataset.audience||'all';if(rule==='all')return true;if(rule.startsWith('gender:'))return audience.gender===rule.slice(7);if(rule.startsWith('collection:'))return audience.collection===rule.slice(11);return true;});return matches.length?matches:allSlides;};
  const showSlide = index => {
    const slides=eligibleSlides();
    activeIndex = (index + slides.length) % slides.length;
    const activeSlide=slides[activeIndex];
    carousel.dataset.activeCollection = activeSlide.dataset.collection;
    allSlides.forEach((slide, slideIndex) => {
      const active = slide === activeSlide;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.querySelectorAll('a, button').forEach(control => {
        control.tabIndex = active ? 0 : -1;
      });
    });
    dots.forEach((dot, dotIndex) => {dot.hidden=!slides.includes(allSlides[dotIndex]);dot.classList.toggle('active',allSlides[dotIndex]===activeSlide);});
  };

  const restartAutoplay = () => {
    window.clearInterval(carousel._autoplayTimer);
    if (carousel.dataset.autoplay === 'false') return;
    carousel._autoplayTimer = window.setInterval(() => {
      if (!document.hidden) showSlide(activeIndex + 1);
    }, Math.max(2, Number(carousel.dataset.autoplaySeconds) || 7) * 1000);
  };

  if(carousel._pointerDown)carousel.removeEventListener('pointerdown',carousel._pointerDown);
  if(carousel._pointerUp)carousel.removeEventListener('pointerup',carousel._pointerUp);
  carousel._pointerDown=event => {
    if (carousel.dataset.swipe === 'false') return;
    if (!event.isPrimary || event.target.closest('a, button')) return;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
  };
  carousel._pointerUp=event => {
    if (carousel.dataset.swipe === 'false') return;
    if (!event.isPrimary || event.target.closest('a, button')) return;
    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    showSlide(activeIndex + (deltaX > 0 ? 1 : -1));
    restartAutoplay();
  };
  carousel.addEventListener('pointerdown',carousel._pointerDown);
  carousel.addEventListener('pointerup',carousel._pointerUp);
  if(carousel._ctaHandler)carousel.removeEventListener('click',carousel._ctaHandler);
  carousel._ctaHandler=event=>{const link=event.target.closest('.hero-cta[data-collection]');if(link)activateCatalogCollection(link.dataset.collection);};
  carousel.addEventListener('click',carousel._ctaHandler);

  showSlide(0);
  restartAutoplay();
  if(carousel._audienceHandler)window.removeEventListener('catalog-hero-audience-change',carousel._audienceHandler);
  carousel._audienceHandler=event=>{audience=event.detail||audience;showSlide(0);restartAutoplay();};
  window.addEventListener('catalog-hero-audience-change',carousel._audienceHandler);
}

window.addEventListener('catalog-managed-hero-replaced', initHeroCarousel);

// ── EVENTS ───────────────────────────────────────
function bindEvents() {
  initHeroCarousel();
  let filterMenuLastFocus = null;
  const openFiltersDrawer = () => {
    if (!filtersPanel || !filtersDrawerOverlay || !filtersToggle) return;
    filterMenuLastFocus = document.activeElement;
    filtersPanel.classList.add('open');
    filtersPanel.setAttribute('aria-hidden', 'false');
    filtersDrawerOverlay.classList.add('active');
    filtersToggle.setAttribute('aria-expanded', 'true');
    filtersToggle.setAttribute('aria-label', 'Cerrar menú de filtros');
    document.body.classList.add('filter-menu-open');
    requestAnimationFrame(() => filtersClose?.focus());
  };
  const closeFiltersDrawer = () => {
    if (!filtersPanel?.classList.contains('open')) return;
    filtersPanel.classList.remove('open');
    filtersPanel.setAttribute('aria-hidden', 'true');
    filtersDrawerOverlay?.classList.remove('active');
    filtersToggle?.setAttribute('aria-expanded', 'false');
    filtersToggle?.setAttribute('aria-label', 'Abrir menú de filtros');
    document.body.classList.remove('filter-menu-open');
    filterMenuLastFocus?.focus?.();
  };
  document.querySelectorAll('.managed-block-button[data-collection]').forEach(link => {
    link.addEventListener('click', () => activateCatalogCollection(link.dataset.collection));
  });

  filtersToggle?.addEventListener('click', openFiltersDrawer);
  filtersClose?.addEventListener('click', closeFiltersDrawer);
  filtersDrawerOverlay?.addEventListener('click', closeFiltersDrawer);
  filtersApply?.addEventListener('click', closeFiltersDrawer);
  filtersReset?.addEventListener('click', resetCatalogFilters);
  activeFilterChips?.addEventListener('click', event => {
    const button = event.target.closest('[data-clear-filter]');
    if (button) clearActiveFilter(button.dataset.clearFilter,button.dataset.clearValue||'');
  });
  filtersPanel?.addEventListener('click',event=>{const button=event.target.closest('[data-extra-filter]');if(!button)return;const selected=activeExtraFilters[button.dataset.extraFilter];if(!selected)return;selected.has(button.dataset.value)?selected.delete(button.dataset.value):selected.add(button.dataset.value);renderProducts();});

  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const dismissMobileHero = () => {
    if (mobileQuery.matches && window.scrollY > 24) {
      document.body.classList.add('mobile-hero-dismissed');
    }
  };
  const updateMobileCatalogChrome = () => {
    const compact = mobileQuery.matches && window.scrollY > 72;
    filtersSection?.classList.toggle('mobile-compact', compact);
  };
  const updateMobileScrollState = () => {
    dismissMobileHero();
    updateMobileCatalogChrome();
  };
  window.addEventListener('scroll', updateMobileScrollState, { passive: true });
  mobileQuery.addEventListener?.('change', updateMobileCatalogChrome);
  updateMobileCatalogChrome();

  // Product search
  productSearchInput?.addEventListener('input', () => {
    productSearchQuery = normalizeColorName(productSearchInput.value);
    productSearchClear.hidden = !productSearchInput.value;
    renderProducts();
  });
  productSearchClear?.addEventListener('click', () => {
    productSearchInput.value = '';
    productSearchQuery = '';
    productSearchClear.hidden = true;
    productSearchInput.focus();
    renderProducts();
  });
  productSortSelect?.addEventListener('change',()=>{customerProductSort=productSortSelect.value;renderProducts();});

  // Cart open/close
  document.getElementById('cart-toggle').addEventListener('click', () => {
    lastFocusedElement = document.activeElement;
    cartSidebar.classList.add('open');
    cartSidebar.setAttribute('aria-hidden', 'false');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => document.getElementById('close-cart').focus());
  });
  const closeCart = () => {
    if (!cartSidebar.classList.contains('open')) return;
    cartSidebar.classList.remove('open');
    cartSidebar.setAttribute('aria-hidden', 'true');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
    lastFocusedElement?.focus?.();
  };
  document.getElementById('close-cart').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Collection filters
  document.querySelectorAll('#collection-filters,#catalog-collection-tabs').forEach(collectionFilters => {
    collectionFilters.addEventListener('click', e => {
      const btn = e.target.closest('.pill');
      if (!btn) return;
      activeCollection = btn.dataset.value;
      document.querySelectorAll('#collection-filters .pill,#catalog-collection-tabs .pill').forEach(b => b.classList.toggle('active', b.dataset.value===activeCollection));
      activeGender = 'all';
      activeCategory = 'all';
      updateGenderFilters();
      genderFilters.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b.dataset.value === 'all'));
      categoryFilters.innerHTML = '';
      buildCategoryFilters();
      renderProducts();
    });
  });

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
    if (confirm(catalogText('cart.clearConfirm'))) clearCart();
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.getElementById('modal-add-btn').addEventListener('click', () => {
    if (currentModalProduct) toggleCart(currentModalProduct, currentPurchaseOptionId);
  });
  document.getElementById('modal-pdf-btn').addEventListener('click', () => {
    if (currentModalProduct) downloadProductPDF(currentModalProduct, currentPurchaseOptionId);
  });
  document.getElementById('modal-share-btn').addEventListener('click', shareCurrentProduct);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
      keepFocusInside(productModal, e);
    } else if (e.key === 'Tab' && cartSidebar.classList.contains('open')) {
      keepFocusInside(cartSidebar, e);
    } else if (e.key === 'Tab' && filtersPanel?.classList.contains('open')) {
      keepFocusInside(filtersPanel, e);
    }
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
      closeFiltersDrawer();
    }
  });
}

// ── START ─────────────────────────────────────────
window.addEventListener('catalog-site-settings-applied', () => {
  if (document.readyState === 'loading') return;
  if(!collectionCanBeSelected(activeCollection)||getCollectionsConfig().rememberLast===false)activeCollection=getInitialCollectionId();
  buildCollectionFilters();
  updateCustomerSortControl();
  if (currentModalProduct) {
    renderPackagingTable(currentModalProduct);
    applyProductModalSettings();
  }
  updateCartUI();
  if (productGrid?.childElementCount) renderProducts();
});
window.addEventListener('catalog-site-preview-product', event => {
  const product = event.detail;
  if (!product || !Number.isSafeInteger(Number(product.id))) return;
  const index = products.findIndex(item => Number(item.id) === Number(product.id));
  if (index >= 0) products[index] = product;
  if (currentModalProduct && Number(currentModalProduct.id) === Number(product.id)) openModal(product,currentPurchaseOptionId);
  else if (productGrid?.childElementCount) renderProducts();
});
document.addEventListener('DOMContentLoaded', async () => { await (window.CatalogSiteReady || Promise.resolve()); init(); });
