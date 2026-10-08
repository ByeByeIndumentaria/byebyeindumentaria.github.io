/* Browser-side image optimization for catalog uploads and maintenance. */
(function(root) {
  const MAX_DIMENSION = 1800;
  const WEBP_QUALITY = 0.82;
  const MAX_SOURCE_BYTES = 25 * 1024 * 1024;
  const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

  function dimensions(width, height, limit = MAX_DIMENSION) {
    const scale = Math.min(1, limit / Math.max(width, height));
    return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
  }

  async function decode(blob) {
    if (typeof createImageBitmap === 'function') {
      try { return await createImageBitmap(blob, { imageOrientation: 'from-image' }); }
      catch { return createImageBitmap(blob); }
    }
    const url = URL.createObjectURL(blob), image = new Image();
    try {
      image.src = url;
      await image.decode();
      return image;
    } finally { URL.revokeObjectURL(url); }
  }

  function canvasBlob(canvas) {
    return new Promise((resolve, reject) => canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('No se pudo optimizar la foto.')),
      'image/webp', WEBP_QUALITY
    ));
  }

  async function optimize(blob) {
    if (!ACCEPTED_TYPES.has(blob.type)) throw new Error('La foto debe ser JPG, PNG o WebP.');
    if (blob.size > MAX_SOURCE_BYTES) throw new Error('La foto original no puede superar 25 MB.');
    const image = await decode(blob);
    try {
      const sourceWidth = image.width || image.naturalWidth, sourceHeight = image.height || image.naturalHeight;
      if (!sourceWidth || !sourceHeight) throw new Error('No se pudo leer el tamaño de la foto.');
      const target = dimensions(sourceWidth, sourceHeight), canvas = document.createElement('canvas');
      canvas.width = target.width; canvas.height = target.height;
      const context = canvas.getContext('2d', { alpha: true });
      context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
      context.drawImage(image, 0, 0, target.width, target.height);
      const candidate = await canvasBlob(canvas);
      const resized = target.width !== sourceWidth || target.height !== sourceHeight;
      const useCandidate = resized || candidate.size < blob.size;
      return { blob: useCandidate ? candidate : blob, originalBytes: blob.size, optimizedBytes: useCandidate ? candidate.size : blob.size, width: target.width, height: target.height, changed: useCandidate };
    } finally { if (typeof image.close === 'function') image.close(); }
  }

  root.CatalogImageOptimizer = { MAX_DIMENSION, WEBP_QUALITY, MAX_SOURCE_BYTES, dimensions, optimize };
  if (typeof module !== 'undefined') module.exports = { MAX_DIMENSION, WEBP_QUALITY, MAX_SOURCE_BYTES, dimensions };
})(typeof window === 'undefined' ? {} : window);
