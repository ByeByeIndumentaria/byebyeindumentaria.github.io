/* =============================================
   BASE DE DATOS DE PRODUCTOS
   ============================================= */

const PRODUCTS_DATABASE = [
    // ========== COLECCIÓN VERANO - DAMA ==========

    // Tops/Remeras - Dama
    {
        id: 'dama_001',
        name: 'SET ALGODÓN',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f0f0f0" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3ESet Algodón%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Gris Melange', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Conjunto de algodón puro, perfecto para el verano. Disponible en tres colores neutrales.'
    },
    {
        id: 'dama_002',
        name: 'REMERA BRODERÍE',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 60,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f5f5f5" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3ERéméra Broderíe%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Celeste', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Remera de algodón con detalles en broderie, ideal para looks elegantes y frescos.'
    },
    {
        id: 'dama_003',
        name: 'REMERA PUNTILLA',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 60,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23fafafa" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3ERéméra Puntilla%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Celeste', 'Amarillo', 'Beige', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Remera con puntilla, versátil y cómoda para cualquier ocasión.'
    },
    {
        id: 'dama_004',
        name: 'CHOMBA ALGODÓN',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f8f8f8" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EChomba Algodón%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Gris Melange', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Chomba de algodón premium, perfecta para días relajados.'
    },
    {
        id: 'dama_005',
        name: 'CHOMBA TEJIDA',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23efefef" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EChomba Tejida%3C/text%3E%3C/svg%3E',
        colors: ['Crudo', 'Beige', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Chomba tejida con textura especial, elegante y sofisticada.'
    },
    {
        id: 'dama_006',
        name: 'MUSCULOSA ARANDELAS',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f3f3f3" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EMusculosa Arandelas%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Crudo', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Musculosa con detalles en arandelas, perfecta para el calor.'
    },
    {
        id: 'dama_007',
        name: 'MUSCULOSA NUDO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Tops',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f9f9f9" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EMusculosa Nudo%3C/text%3E%3C/svg%3E',
        colors: ['Crudo', 'Blanco', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Musculosa con nudo, práctica y moderna.'
    },

    // Estructurados - Dama
    {
        id: 'dama_008',
        name: 'CAMISA LINO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Camisas',
        pcs: 48,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f7f7f7" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3ECamisa Lino%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Crudo', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Camisa de lino puro, versátil y elegante para cualquier ocasión.'
    },
    {
        id: 'dama_009',
        name: 'VESTIDO CAMISERO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 32,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23fafafa" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Camisero%3C/text%3E%3C/svg%3E',
        colors: ['Crudo', 'Militar', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido camisero clásico, perfecto para looks frescos.'
    },
    {
        id: 'dama_010',
        name: 'VESTIDO CAMISERO LARGO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f6f6f6" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Camisero Largo%3C/text%3E%3C/svg%3E',
        colors: ['Oliva', 'Estampado', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido camisero largo, elegante y sofisticado.'
    },
    {
        id: 'dama_011',
        name: 'VESTIDO CAMISERO CORTO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f4f4f4" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Camisero Corto%3C/text%3E%3C/svg%3E',
        colors: ['Estampado', 'Camel', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido camisero corto, ideal para looks casuales.'
    },
    {
        id: 'dama_012',
        name: 'ENTERITO CINTO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Enteritos',
        pcs: 25,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f2f2f2" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EEnterito Cinto%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Marrón', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Enterito con cinto, moderno y versátil.'
    },
    {
        id: 'dama_013',
        name: 'ENTERITO ESCOTE V',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Enteritos',
        pcs: 20,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23ececec" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EEnterito Escote V%3C/text%3E%3C/svg%3E',
        colors: ['Crudo', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Enterito con escote en V, sofisticado y elegante.'
    },

    // Vestidos - Dama
    {
        id: 'dama_014',
        name: 'VESTIDO GASA',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23fbfbfb" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Gasa%3C/text%3E%3C/svg%3E',
        colors: ['Estampa 1', 'Beige', 'Estampa 2', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido de gasa, ligero y romántico.'
    },
    {
        id: 'dama_015',
        name: 'VESTIDO GASA LARGO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23ffffff" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Gasa Largo%3C/text%3E%3C/svg%3E',
        colors: ['Animal Print', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido de gasa largo, para ocasiones especiales.'
    },
    {
        id: 'dama_016',
        name: 'VESTIDO GASA CORTO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23fefefe" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Gasa Corto%3C/text%3E%3C/svg%3E',
        colors: ['Estampado', 'Rojo', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido de gasa corto, perfecto para looks frescos.'
    },
    {
        id: 'dama_017',
        name: 'VESTIDO NUDO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23fdfdfd" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Nudo%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Oliva', 'Estampa', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido con escote nudo, moderno y sofisticado.'
    },
    {
        id: 'dama_018',
        name: 'VESTIDO BÁSICO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23f1f1f1" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Básico%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Crudo', 'Estampa', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido básico versátil, ideal para cualquier ocasión.'
    },
    {
        id: 'dama_019',
        name: 'VESTIDO ESCOTE V',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23eaeaea" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Escote V%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Rojo', 'Chocolate', 'Negro', 'Crudo', 'Beige'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Vestido con escote en V, elegante y sofisticado.'
    },
    {
        id: 'dama_020',
        name: 'TÚNICA',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23ddd" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3ETúnica%3C/text%3E%3C/svg%3E',
        colors: ['Estampa 1', 'Estampa 2', 'Crudo'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Túnica cómoda y versátil, perfecta para días relajados.'
    },
    {
        id: 'dama_021',
        name: 'VESTIDO TRENZA',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Vestidos',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23ccc" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23999"%3EVestido Trenza%3C/text%3E%3C/svg%3E',
        colors: ['Crudo', 'Estampa', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Vestido con detalles de trenza, bohemio y elegante.'
    },

    // Pantalones y Shorts - Dama
    {
        id: 'dama_022',
        name: 'PANTALÓN SASTRERO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Pantalones',
        pcs: 50,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23b0b0b0" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EPantalón Sastrero%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Crudo', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Pantalón sastrero clásico, perfecto para looks formales.'
    },
    {
        id: 'dama_023',
        name: 'PANTALÓN SASTRERO LINO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Pantalones',
        pcs: 64,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%239a9a9a" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EPantalón Lino%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Oliva', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Pantalón de lino, fresco y cómodo para el verano.'
    },
    {
        id: 'dama_024',
        name: 'SHORT',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Shorts',
        pcs: 50,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23888" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EShort%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Chocolate', 'Oliva', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Short clásico y versátil, perfecto para el verano.'
    },
    {
        id: 'dama_025',
        name: 'PANTALÓN BOLSILLOS BRODERIE',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Pantalones',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23777" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EPantalón Broderie%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Pantalón con bolsillos de broderie, único y elegante.'
    },
    {
        id: 'dama_026',
        name: 'JOGGER LINO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Pantalones',
        pcs: 60,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23666" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EJogger Lino%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Crudo', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Jogger de lino, cómodo y moderno.'
    },

    // Sets y Conjuntos - Dama
    {
        id: 'dama_027',
        name: 'SET LINO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 40,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23555" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3ESet Lino%3C/text%3E%3C/svg%3E',
        colors: ['Lino', 'Blanco', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Conjunto de lino, perfecto para looks frescos y coordinados.'
    },
    {
        id: 'dama_028',
        name: 'SET LINO (Estampado)',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 30,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23444" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3ESet Lino Est.%3C/text%3E%3C/svg%3E',
        colors: ['Estampa 1', 'Estampa 2', 'Camel', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Conjunto de lino estampado, moderno y versátil.'
    },
    {
        id: 'dama_029',
        name: 'CHALECO LINO CONJUNTO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 35,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23333" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EChaleco Lino%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Oliva', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Chaleco de lino, perfecto para capas sofisticadas.'
    },
    {
        id: 'dama_030',
        name: 'PANTALÓN LINO CONJUNTO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 35,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23222" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EPantalón Lino%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Oliva', 'Negro'],
        sizes: ['S', 'M', 'L'],
        description: 'Pantalón de lino para conjunto.'
    },
    {
        id: 'dama_031',
        name: 'CHALECO SASTRERO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 64,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23111" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3EChaleco Sastrero%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Oliva', 'Chocolate', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Chaleco sastrero, clásico y elegante.'
    },
    {
        id: 'dama_032',
        name: 'SET ESTAMPADO',
        collection: 'Verano 2027',
        gender: 'Dama',
        category: 'Sets',
        pcs: 24,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23505050" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14" fill="%23fff"%3ESet Estampado%3C/text%3E%3C/svg%3E',
        colors: ['Estampa 1', 'Estampa 2', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Conjunto estampado, moderno y colorido.'
    },

    // ========== COLECCIÓN VERANO - HOMBRE ==========

    // Chombas - Hombre
    {
        id: 'hombre_001',
        name: 'CHOMBA PIQUÉ LISA',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Chombas',
        pcs: 100,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23404040" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EChomba Piqué%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Crudo', 'Beige', 'Melange', 'Celeste', 'Marino', 'Oliva', 'Petróleo', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Chomba piqué lisa, clásica y versátil.'
    },
    {
        id: 'hombre_002',
        name: 'CHOMBA PIQUÉ VIVO',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Chombas',
        pcs: 60,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23353535" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EChomba Piqué Vivo%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Melange', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Chomba piqué con detalles de vivo, moderna y sofisticada.'
    },
    {
        id: 'hombre_003',
        name: 'CHOMBA PIQUÉ PENGUIN',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Chombas',
        pcs: 75,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%232a2a2a" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EChomba Penguin%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Celeste', 'Melange', 'Petróleo', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Chomba piqué con logo penguin, clásica y atemporal.'
    },
    {
        id: 'hombre_004',
        name: 'CHOMBA JERSEY LISA',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Chombas',
        pcs: 80,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23202020" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EChomba Jersey%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Beige', 'Melange', 'Celeste', 'Petróleo', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Chomba de jersey, cómoda y elegante.'
    },
    {
        id: 'hombre_005',
        name: 'CHOMBA PIQUÉ LISA PLUS',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Chombas',
        pcs: 72,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23151515" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EChomba Plus%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Melange', 'Petróleo', 'Marino', 'Negro'],
        sizes: ['3XL', '4XL', '5XL', '6XL'],
        description: 'Chomba piqué lisa en tallas grandes.'
    },
    {
        id: 'hombre_006',
        name: 'CHOMBA JERSEY LISA PLUS',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Chombas',
        pcs: 72,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23000" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EChomba Jersey Plus%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Melange', 'Petróleo', 'Marino', 'Negro'],
        sizes: ['3XL', '4XL', '5XL', '6XL'],
        description: 'Chomba de jersey en tallas grandes.'
    },

    // Remeras - Hombre
    {
        id: 'hombre_007',
        name: 'REMERA DEPORTIVA',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Remeras',
        pcs: 48,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23707070" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3ERemera Deportiva%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Gris', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Remera deportiva, cómoda y funcional.'
    },
    {
        id: 'hombre_008',
        name: 'REMERA ALGODÓN',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Remeras',
        pcs: 90,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23606060" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3ERemera Algodón%3C/text%3E%3C/svg%3E',
        colors: ['Blanco', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'],
        description: 'Remera de algodón puro, clásica y versátil.'
    },

    // Traje de Baño - Hombre
    {
        id: 'hombre_009',
        name: 'TRAJE DE BAÑO LISO',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Trajes de Baño',
        pcs: 96,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23505050" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3ETraje Baño Liso%3C/text%3E%3C/svg%3E',
        colors: ['Beige', 'Gris', 'Chocolate', 'Celeste', 'Petróleo', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Traje de baño liso, clásico y elegante.'
    },
    {
        id: 'hombre_010',
        name: 'TRAJE DE BAÑO SURF',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Trajes de Baño',
        pcs: 60,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23404040" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3ETraje Baño Surf%3C/text%3E%3C/svg%3E',
        colors: ['Beige', 'Gris', 'Petróleo', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Traje de baño con estilo surf, moderno y deportivo.'
    },

    // Camisas - Hombre
    {
        id: 'hombre_011',
        name: 'CAMISA LINO',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Camisas',
        pcs: 24,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23303030" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3ECamisa Lino%3C/text%3E%3C/svg%3E',
        colors: ['Gris', 'Beige', 'Blanco', 'Gris Verdoso', 'Celeste', 'Marino', 'Negro'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Camisa de lino, perfecta para el verano.'
    },

    // Pantalones y Bermudas - Hombre
    {
        id: 'hombre_012',
        name: 'BERMUDA LINO',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Shorts',
        pcs: 42,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23202020" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EBermuda Lino%3C/text%3E%3C/svg%3E',
        colors: ['Oliva', 'Khaki', 'Gris Oscuro', 'Marrón', 'Blanco', 'Gris', 'Negro', 'Crudo', 'Beige'],
        sizes: ['30', '32', '34', '36'],
        description: 'Bermuda de lino, fresca y versátil.'
    },
    {
        id: 'hombre_013',
        name: 'PANTALÓN LINO',
        collection: 'Verano 2027',
        gender: 'Hombre',
        category: 'Pantalones',
        pcs: 48,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23101010" width="200" height="250"/%3E%3Ctext x="100" y="125" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="13" fill="%23fff"%3EPantalón Lino%3C/text%3E%3C/svg%3E',
        colors: ['Beige', 'Oliva', 'Gris Topo', 'Gris', 'Gris Claro', 'Negro'],
        sizes: ['30', '32', '34', '36', '38'],
        description: 'Pantalón de lino, cómodo y elegante.'
    }
];

/* =============================================
   ESTADO DE LA APLICACIÓN
   ============================================= */

let currentFilters = {
    collection: 'all',
    gender: 'all',
    category: 'all'
};

let cart = [];

/* =============================================
   FUNCIONES AUXILIARES
   ============================================= */

// Obtener colecciones únicas
function getUniqueCollections() {
    return [...new Set(PRODUCTS_DATABASE.map(p => p.collection))].sort();
}

// Obtener géneros únicos
function getUniqueGenders() {
    return [...new Set(PRODUCTS_DATABASE.map(p => p.gender))].sort();
}

// Obtener categorías únicas
function getUniqueCategories() {
    return [...new Set(PRODUCTS_DATABASE.map(p => p.category))].sort();
}

// Filtrar productos basado en los filtros actuales
function getFilteredProducts() {
    return PRODUCTS_DATABASE.filter(product => {
        const collectionMatch = currentFilters.collection === 'all' || product.collection === currentFilters.collection;
        const genderMatch = currentFilters.gender === 'all' || product.gender === currentFilters.gender;
        const categoryMatch = currentFilters.category === 'all' || product.category === currentFilters.category;
        return collectionMatch && genderMatch && categoryMatch;
    });
}

// Generar color hexadecimal aleatorio para muestras
function getColorFromName(colorName) {
    const colorMap = {
        'Blanco': '#ffffff',
        'Crudo': '#f5deb3',
        'Negro': '#000000',
        'Beige': '#c9a961',
        'Gris': '#888888',
        'Gris Melange': '#a8a8a8',
        'Celeste': '#87ceeb',
        'Marino': '#000080',
        'Oliva': '#556b2f',
        'Petróleo': '#003d5c',
        'Melange': '#a8a8a8',
        'Chocolate': '#3d2817',
        'Marrón': '#8b4513',
        'Rojo': '#ff0000',
        'Amarillo': '#ffff00',
        'Camel': '#c19a6b',
        'Estampado': '#e8e8e8',
        'Animal Print': '#c9a961',
        'Estampa 1': '#e8e8e8',
        'Estampa 2': '#d3d3d3',
        'Estampa': '#e8e8e8',
        'Gris Oscuro': '#545454',
        'Gris Topo': '#6b6b6b',
        'Gris Claro': '#c0c0c0',
        'Khaki': '#f0e68c',
        'Gris Verdoso': '#808080'
    };
    return colorMap[colorName] || '#e8e8e8';
}

/* =============================================
   FUNCIONES DE RENDERIZADO
   ============================================= */

// Renderizar filtros de colecciones
function renderCollectionFilters() {
    const container = document.getElementById('collectionFilters');
    const collections = getUniqueCollections();
    
    container.innerHTML = '';
    collections.forEach(collection => {
        const button = document.createElement('button');
        button.className = 'collection-btn';
        button.dataset.collection = collection;
        button.textContent = collection;
        
        button.addEventListener('click', () => {
            setFilter('collection', collection);
        });
        
        container.appendChild(button);
    });
}

// Renderizar filtros de género
function renderGenderFilters() {
    const container = document.getElementById('genderFilters');
    const genders = getUniqueGenders();
    
    container.innerHTML = `<button class="gender-btn active" data-gender="all">Todos</button>`;
    
    genders.forEach(gender => {
        const button = document.createElement('button');
        button.className = 'gender-btn';
        button.dataset.gender = gender;
        button.textContent = gender;
        
        button.addEventListener('click', () => {
            setFilter('gender', gender);
        });
        
        container.appendChild(button);
    });
}

// Renderizar filtros de categoría
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const categories = getUniqueCategories();
    
    container.innerHTML = `<button class="category-btn active" data-category="all">Todas las categorías</button>`;
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.dataset.category = category;
        button.textContent = category;
        
        button.addEventListener('click', () => {
            setFilter('category', category);
        });
        
        container.appendChild(button);
    });
}

// Establecer filtro y actualizar vista
function setFilter(filterType, value) {
    currentFilters[filterType] = value;
    
    // Actualizar botones activos
    document.querySelectorAll('.collection-btn, .gender-btn, .category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll(`[data-${filterType}="${value}"]`).forEach(btn => {
        btn.classList.add('active');
    });
    
    // Renderizar productos
    renderProducts();
    updateBreadcrumb();
}

// Actualizar breadcrumb
function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const parts = ['Inicio'];
    
    if (currentFilters.collection !== 'all') {
        parts.push(currentFilters.collection);
    }
    if (currentFilters.gender !== 'all') {
        parts.push(currentFilters.gender);
    }
    if (currentFilters.category !== 'all') {
        parts.push(currentFilters.category);
    }
    
    breadcrumb.innerHTML = parts.map((part, i) => 
        i === parts.length - 1 ? `<span>${part}</span>` : `<span>${part}</span>`
    ).join(' / ');
}

// Renderizar grid de productos
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const products = getFilteredProducts();
    
    grid.innerHTML = '';
    
    if (products.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 50}ms`;
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-details-mini">
                    <strong>${product.pcs} PCS</strong><br>
                    <small>${product.gender}</small>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            openProductModal(product);
        });
        
        grid.appendChild(card);
    });
}

// Abrir modal de producto
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductCollection').textContent = product.collection;
    document.getElementById('modalProductGender').textContent = product.gender;
    document.getElementById('modalProductPCS').textContent = `${product.pcs} piezas`;
    
    // Renderizar colores
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = '';
    
    product.colors.forEach((color, index) => {
        const option = document.createElement('label');
        option.className = 'color-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'color';
        input.value = color;
        if (index === 0) input.checked = true;
        
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = getColorFromName(color);
        
        const label = document.createElement('span');
        label.className = 'color-label';
        label.textContent = color;
        
        option.appendChild(input);
        option.appendChild(swatch);
        option.appendChild(label);
        colorOptions.appendChild(option);
    });
    
    // Renderizar talles
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';
    
    product.sizes.forEach((size, index) => {
        const option = document.createElement('label');
        option.className = 'size-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'size';
        input.value = size;
        if (index === 0) input.checked = true;
        
        const label = document.createElement('span');
        label.textContent = size;
        
        option.appendChild(input);
        option.appendChild(label);
        sizeOptions.appendChild(option);
    });
    
    // Botón agregar al carrito
    document.getElementById('addToCartBtn').onclick = () => {
        const selectedColor = document.querySelector('input[name="color"]:checked').value;
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        
        addToCart(product, selectedColor, selectedSize);
        closeProductModal();
    };
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Cerrar modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

/* =============================================
   FUNCIONES DEL CARRITO
   ============================================= */

function addToCart(product, color, size) {
    const cartItem = {
        id: `${product.id}-${color}-${size}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        collection: product.collection,
        gender: product.gender,
        category: product.category,
        color: color,
        size: size,
        pcs: product.pcs
    };
    
    cart.push(cartItem);
    updateCartUI();
    
    // Mostrar notificación
    showNotification(`${product.name} agregado a tu selección`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const downloadBtn = document.getElementById('downloadPdfBtn');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        cartItems.innerHTML = '';
        downloadBtn.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        downloadBtn.style.display = 'block';
        
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-content">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">
                        <strong>${item.color}</strong> - Talle ${item.size}
                    </div>
                    <div class="cart-item-details">
                        ${item.pcs} piezas • ${item.gender}
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">×</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}

function toggleCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('active');
    if (cart.length > 0) {
        overlay.classList.toggle('active');
    }
}

/* =============================================
   FUNCIONES DE PDF Y WHATSAPP
   ============================================= */

async function downloadPdfAndShare() {
    if (cart.length === 0) return;
    
    // Crear contenido HTML para el PDF
    const htmlContent = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Selección de Productos</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; color: #333; }
                .header { text-align: center; border-bottom: 2px solid #000; padding: 20px; margin-bottom: 30px; }
                .header h1 { font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; }
                .header p { color: #666; font-size: 14px; }
                .content { padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; background-color: #f5f5f5; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
                td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
                .footer { text-align: center; color: #999; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; }
                .product-name { font-weight: 600; }
                .details { font-size: 13px; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Catálogo Digital</h1>
                <p>Made for summer. SS 2027</p>
            </div>
            <div class="content">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Colección</th>
                            <th>Género</th>
                            <th>Color</th>
                            <th>Talle</th>
                            <th>PCS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td class="product-name">${item.name}</td>
                                <td class="details">${item.collection}</td>
                                <td class="details">${item.gender}</td>
                                <td class="details">${item.color}</td>
                                <td class="details">${item.size}</td>
                                <td class="details">${item.pcs}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="footer">
                    <p><strong>Total de artículos:</strong> ${cart.length}</p>
                    <p style="margin-top: 10px; font-size: 11px;">Generado desde Catálogo Digital SS 2027</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Generar PDF usando html2pdf
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    
    const opt = {
        margin: 10,
        filename: 'seleccion-productos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    // Cargar html2pdf desde CDN si no está disponible
    if (typeof html2pdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
            html2pdf().set(opt).from(element).save().then(() => {
                sendWhatsAppMessage();
            });
        };
        document.head.appendChild(script);
    } else {
        await new Promise(resolve => {
            html2pdf().set(opt).from(element).save().then(() => {
                resolve();
            });
        });
        sendWhatsAppMessage();
    }
}

function sendWhatsAppMessage() {
    const message = `Hola, quiero cotizar la siguiente selección de productos del catálogo SS 2027:\n\n${cart.map(item => `• ${item.name} - ${item.color} (Talle ${item.size})`).join('\n')}\n\nAdjunto envío el PDF con los detalles.`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abre WhatsApp con el mensaje (sin número específico, así el usuario elige)
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    
    showNotification('Abriendo WhatsApp...');
}

/* =============================================
   NOTIFICACIONES
   ============================================= */

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/* =============================================
   EVENT LISTENERS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Cargar librerías
    const html2pdfScript = document.createElement('script');
    html2pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    document.head.appendChild(html2pdfScript);
    
    // Inicializar filtros
    renderCollectionFilters();
    renderGenderFilters();
    renderCategoryFilters();
    renderProducts();
    updateBreadcrumb();
    updateCartUI();
    
    // Evento del carrito
    document.getElementById('cartBtn').addEventListener('click', toggleCartSidebar);
    document.getElementById('closeCart').addEventListener('click', toggleCartSidebar);
    document.getElementById('overlay').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('productModal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });
    
    // Evento del modal
    document.getElementById('closeModal').addEventListener('click', closeProductModal);
    
    // Evento del PDF
    document.getElementById('downloadPdfBtn').addEventListener('click', downloadPdfAndShare);
});
